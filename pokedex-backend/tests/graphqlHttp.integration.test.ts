import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import test from 'node:test';
import jwt from 'jsonwebtoken';

test('production Express GraphQL contract with mocked Prisma delegates', async (t) => {
  const secret = randomBytes(32).toString('hex');
  const allowed = 'https://fixture.example.invalid';
  process.env.DATABASE_URL = 'postgresql://unused.invalid/http_fixture';
  process.env.JWT_SECRET = secret;
  process.env.CORS_ORIGIN = allowed;
  process.env.NODE_ENV = 'production';

  const { prisma } = await import('../src/db/prisma.js');
  const { startServer } = await import('../src/index.js');
  let reads = 0;
  let writes = 0;
  Object.defineProperties(prisma, {
    user: { value: { findUnique: async ({ where }: { where: { id: number } }) => {
      reads++;
      assert.ok([2, 3].includes(where.id));
      return { id: where.id, username: 'fixture', email: 'user@example.invalid', role: where.id === 3 ? 'ADMIN' : 'USER' };
    } } },
    walkthrough: { value: { delete: async ({ where }: { where: { id: number } }) => {
      assert.equal(where.id, 42);
      writes++;
    } } },
  });

  const { httpServer, apolloServer } = await startServer(0, '127.0.0.1');
  t.after(() => apolloServer.stop());
  const address = httpServer.address();
  assert.ok(address && typeof address === 'object');
  const origin = 'http://127.0.0.1:' + address.port;
  const endpoint = origin + '/graphql';
  const request = (query: string, token?: string, requestOrigin = allowed, variables?: object) => fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: requestOrigin,
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const anonymous = await request('{ ping me { id } }');
  assert.equal(anonymous.status, 200);
  assert.equal(anonymous.headers.get('access-control-allow-origin'), allowed);
  assert.equal(anonymous.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(anonymous.headers.get('x-powered-by'), null);
  assert.deepEqual((await anonymous.json()).data, { ping: 'pong from Prisma backend!', me: null });
  for (const token of ['invalid', jwt.sign({ userId: 3 }, secret, { expiresIn: -60 })]) {
    assert.deepEqual((await (await request('{ me { id } }', token)).json()).data, { me: null });
  }
  assert.equal(reads, 0);

  const user = jwt.sign({ userId: 2, role: 'ADMIN' }, secret);
  const admin = jwt.sign({ userId: 3 }, secret);
  assert.deepEqual((await (await request('{ me { id isAdmin } }', user)).json()).data,
    { me: { id: 2, isAdmin: false } });
  const mutation = 'mutation { deleteWalkthrough(id: 42) }';
  for (const [token, message] of [[undefined, 'Authentication required'], [user, 'Admin access required']] as const) {
    const denied = await request(mutation, token);
    assert.equal(denied.status, 200);
    const result = await denied.json();
    assert.equal(result.data, null);
    assert.equal(result.errors[0].message, message);
    assert.equal(result.errors[0].extensions.stacktrace, undefined);
  }
  assert.equal(writes, 0);
  assert.deepEqual((await (await request(mutation, admin)).json()).data, { deleteWalkthrough: true });
  assert.equal(writes, 1);

  for (const query of ['{ __schema { queryType { name } } }', '{ nonexistentField }']) {
    const invalid = await request(query);
    assert.equal(invalid.status, 400);
    assert.equal((await invalid.json()).errors[0].extensions.code, 'GRAPHQL_VALIDATION_FAILED');
  }
  const badVariables = await request(
    'mutation ($id: Int!) { deleteWalkthrough(id: $id) }', admin, allowed, { id: 'invalid' },
  );
  assert.equal(badVariables.status, 200);
  assert.equal((await badVariables.json()).errors[0].extensions.code, 'BAD_USER_INPUT');
  assert.equal(writes, 1);

  const foreign = await request('{ ping }', undefined, 'https://other.example.invalid');
  assert.equal(foreign.headers.get('access-control-allow-origin'), null);
  await foreign.text();
  const preflight = await fetch(endpoint, {
    method: 'OPTIONS',
    headers: { Origin: allowed, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'authorization,content-type' },
  });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), allowed);
  assert.match(preflight.headers.get('access-control-allow-headers') ?? '', /authorization/i);
  assert.equal(await (await fetch(origin + '/api/ping')).text(), 'pong from Prisma backend!');
  await apolloServer.stop();
  assert.equal(httpServer.listening, false);
});
