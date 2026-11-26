import test from 'node:test';
import assert from 'node:assert/strict';

process.env.DATABASE_URL = 'postgresql://unused.invalid/runtime_fixture';
process.env.JWT_SECRET = 'fixture-only-secret-with-at-least-32-characters';
const { prisma } = await import('../src/db/prisma.js');
const { resolvers } = await import('../src/graphql/resolvers.js');

test('Move Dex passes one filtered scope to count and sorted pagination', async () => {
  const queries: any[] = [];
  const move = { name: 'tackle', type: 'normal', damageClass: 'physical', power: null, accuracy: null, pp: null };
  Object.defineProperty(prisma, 'move', { value: {
    count: async (args: unknown) => { queries.push(args); return 71; },
    findMany: async (args: unknown) => { queries.push(args); return [move]; },
  } });
  const result = await resolvers.Query.getAllMoves(null, { gen: 1, type: 'NORMAL', damageClass: 'Physical', search: 'tack', limit: 30, offset: 30 });
  assert.deepEqual(result, { results: [move], totalCount: 71 });
  assert.deepEqual(queries[0].where, {
    generation: 1, type: { equals: 'normal', mode: 'insensitive' },
    damageClass: { equals: 'physical', mode: 'insensitive' },
    name: { contains: 'tack', mode: 'insensitive' },
  });
  assert.deepEqual(queries[1], { where: queries[0].where, orderBy: { name: 'asc' }, take: 30, skip: 30 });
});

test('CMS writes require a server-side admin and never reach storage for denied users', async () => {
  const args = { id: 42, gameVersion: 'emerald', chapterTitle: 'Fixture chapter', content: '<p>Fixture body</p>', order: 1 };
  const writes: any[] = [];
  Object.defineProperty(prisma, 'user', { value: { findUnique: async ({ where }: any) =>
    ({ role: where.id === 2 ? 'ADMIN' : 'USER' }) } });
  Object.defineProperty(prisma, 'walkthrough', { value: {
    update: async (query: any) => { writes.push(query); return { id: query.where.id, ...query.data }; },
  } });
  await assert.rejects(resolvers.Mutation.upsertWalkthrough(null, args, {}), /Authentication required/);
  await assert.rejects(resolvers.Mutation.deleteWalkthrough(null, { id: 42 }, { user: { userId: 1 } }), /Admin access required/);
  await assert.rejects(resolvers.Mutation.upsertWalkthrough(null, args, { user: { userId: 1 } }), /Admin access required/);
  await assert.rejects(resolvers.Mutation.upsertWalkthrough(null, { ...args, content: '' }, { user: { userId: 2 } }), /Invalid/);
  assert.equal(writes.length, 0);
  assert.equal((await resolvers.Mutation.upsertWalkthrough(null, args, { user: { userId: 2 } })).id, 42);
  assert.equal(writes.length, 1);
  assert.equal(writes[0].data.content, args.content);
});

test('team retrieval is scoped to server identity and preserves database form IDs and order', async () => {
  let lookup: any;
  const rows = [
    { pokedexNumber: 1, name: 'bulbasaur', types: [{ name: 'grass' }], imageUrl: '' },
    { pokedexNumber: 10033, name: 'venusaur-mega', types: [{ name: 'grass' }], imageUrl: '' },
  ];
  let slots = [{ teamId: 5, pokemonId: 10033, slotOrder: 1 }];
  const calls: string[] = [];
  Object.defineProperties(prisma, {
    team: { value: {
      findUnique: async (query: any) => {
        lookup = query;
        return { slots: slots.map(slot => ({ pokemon: rows.find(row => row.pokedexNumber === slot.pokemonId) })) };
      },
      upsert: async (query: any) => {
        assert.equal(query.where.userId, 3);
        return { id: 5 };
      },
    } },
    pokemon: { value: { findMany: async ({ where }: any) => rows.filter(row => where.pokedexNumber.in.includes(row.pokedexNumber)) } },
    teamSlot: { value: {
      deleteMany: ({ where }: any) => () => {
        assert.equal(where.teamId, 5);
        calls.push('delete');
        slots = [];
      },
      createMany: ({ data }: any) => () => {
        calls.push('create');
        slots = data;
      },
    } },
    $transaction: { value: async (operations: Array<() => void>) => operations.forEach(operation => operation()) },
  });
  await assert.rejects(resolvers.Query.myTeam(null, {}, {}), /Authentication required/);
  const [member] = await resolvers.Query.myTeam(null, { userId: 99 }, { user: { userId: 3 } });
  assert.equal(lookup.where.userId, 3);
  assert.equal(lookup.include.slots.orderBy.slotOrder, 'asc');
  assert.equal(member.id, 10033);
  const context = { user: { userId: 3 } };
  await assert.rejects(resolvers.Mutation.saveTeam(null, { pokemonIds: [99999] }, context), /Unknown Pokémon/);
  assert.deepEqual(calls, []);
  assert.equal(await resolvers.Mutation.saveTeam(null, { pokemonIds: [10033, 1] }, context), true);
  assert.deepEqual(calls, ['delete', 'create']);
  assert.deepEqual((await resolvers.Query.myTeam(null, {}, context)).map(member => member.id), [10033, 1]);
  await assert.rejects(resolvers.Mutation.saveTeam(null, { pokemonIds: [1, 2, 3, 4, 5, 6, 7] }, { user: { userId: 3 } }), /more than 6/);
});
