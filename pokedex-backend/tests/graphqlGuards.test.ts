import test from 'node:test';
import assert from 'node:assert/strict';

process.env.DATABASE_URL ??= 'postgresql://user:pass@localhost:5432/pokedex_test';
process.env.JWT_SECRET ??= 'test-secret-with-at-least-32-characters';

const { resolvers } = await import('../src/graphql/resolvers.js');

test('checkUpdates requires an authenticated DB-role admin', async () => {
  await assert.rejects(
    resolvers.Query.checkUpdates(null, {}, { user: null }),
    /Authentication required/,
  );
  await assert.rejects(
    resolvers.Query.checkUpdates(null, {}, {}),
    /Authentication required/,
  );
});
