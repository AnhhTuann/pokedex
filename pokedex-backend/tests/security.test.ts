import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';

process.env.DATABASE_URL ??= 'postgresql://user:pass@localhost:5432/pokedex_test';
process.env.JWT_SECRET ??= 'test-secret-with-at-least-32-characters';

const security = await import('../src/lib/security.js');

test('readBearerToken only accepts the Bearer scheme', () => {
  assert.equal(security.readBearerToken('Bearer abc.def.ghi'), 'abc.def.ghi');
  assert.equal(security.readBearerToken('bearer  token123'), 'token123');
  assert.equal(security.readBearerToken('token123'), null);
  assert.equal(security.readBearerToken(undefined), null);
});

test('verifyAccessToken rejects forged, expired and malformed tokens', () => {
  const secret = security.getJwtSecret();
  const valid = jwt.sign({ userId: 7 }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  const expired = jwt.sign({ userId: 7 }, secret, {
    algorithm: 'HS256',
    expiresIn: '-1s',
  });

  assert.deepEqual(security.verifyAccessToken(valid, secret), { userId: 7 });
  assert.equal(security.verifyAccessToken(expired, secret), null);
  assert.equal(security.verifyAccessToken(valid, 'another-secret-with-32-characters'), null);
  assert.equal(security.verifyAccessToken('not-a-token', secret), null);
});

test('requireUser fails closed for anonymous callers', () => {
  assert.throws(() => security.requireUser({ user: null }), /Authentication required/);
  assert.throws(() => security.requireUser(undefined), /Authentication required/);
  assert.equal(security.requireUser({ user: { userId: 3 } }), 3);
  assert.equal(security.isAdminRole('ADMIN'), true);
  assert.equal(security.isAdminRole('USER'), false);
});

test('getAllowedCorsOrigins defaults to local dev and deduplicates configured origins', () => {
  assert.deepEqual(security.getAllowedCorsOrigins(''), ['http://localhost:5173']);
  assert.deepEqual(
    security.getAllowedCorsOrigins('https://a.example/,https://a.example/ , https://b.example'),
    ['https://a.example', 'https://b.example']
  );
});
