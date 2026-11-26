import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSchema, graphql } from 'graphql';
import { typeDefs } from '../src/graphql/typeDefs.js';

process.env.DATABASE_URL = 'postgresql://unused.invalid/audit_fixture';
process.env.JWT_SECRET = 'fixture-only-secret-with-at-least-32-characters';
const { resolvers } = await import('../src/graphql/resolvers.js');
const { prisma } = await import('../src/db/prisma.js');
const { pokemonService } = await import('../src/services/pokemon.service.js');

test('regional zero survives filtering, sorting and pagination; missing entries stay absent', async () => {
  const pokemon = (id: number, pokedexNumber: number, name: string, speciesId: number | null = null) =>
    ({ id, pokedexNumber, name, types: [], speciesId, isDefault: speciesId === null });
  const rows = [pokemon(3, 495, 'snivy'), pokemon(4, 493, 'arceus'),
    pokemon(2, 494, 'victini'), pokemon(5, 10500, 'snivy-form', 495)];
  const entries: Record<string, Array<{pokemonId: number; entryNumber: number}>> = {
    'original-unova': [{ pokemonId: 2, entryNumber: 0 }, { pokemonId: 3, entryNumber: 1 }],
    'updated-unova': [{ pokemonId: 2, entryNumber: 0 }, { pokemonId: 3, entryNumber: 4 }],
  };
  let capturedWhere: unknown;
  Object.defineProperties(prisma, {
    pokemon: { value: { findMany: async ({ where }: { where: unknown }) => {
      capturedWhere = where;
      return rows;
    }, findUnique: async () => ({ id: 3 }) } },
    dexEntry: { value: { findMany: async (args: { where: { regionName: string } }) =>
      entries[args.where.regionName] } },
  });

  const args = { region: 'original-unova', game: 'black', limit: 1 };
  const first = await pokemonService.pokemonList(args);
  assert.deepEqual(first.results.map((row) => [row.id, row.regionalNumber]), [[494, 0]]);
  assert.equal(first.totalCount, 3);
  await pokemonService.pokemonList({ ...args, gen: 5, maxGen: 8 });
  assert.deepEqual(capturedWhere, {
    AND: [{ regionalDexes: { has: 'original-unova' } },
      { OR: [{ isDefault: true }, { altFormAvailableIn: { has: 'black' } }] }],
    generation: 5,
  });
  const graphqlResult = await graphql({
    schema: buildSchema(typeDefs),
    source: '{ pokemonList(region:"original-unova", game:"black", limit:1) { totalCount results { id regionalNumber } } }',
    rootValue: { pokemonList: (args: unknown) => resolvers.Query.pokemonList(null, args) },
  });
  assert.equal(graphqlResult.errors, undefined);
  assert.deepEqual(JSON.parse(JSON.stringify(graphqlResult.data)),
    { pokemonList: { totalCount: 3, results: [{ id: 494, regionalNumber: 0 }] } });
  const pages = await Promise.all([1, 2, 3].map((offset) =>
    pokemonService.pokemonList({ ...args, offset })));
  assert.deepEqual(pages.map((page) => page.results.map((row) => [row.id, row.regionalNumber])),
    [[[495, 1]], [[10500, 1]], []]);
  assert.ok(pages.every((page) => page.totalCount === 3));
  assert.equal(new Set([first, ...pages].flatMap((page) => page.results.map((row) => row.id))).size, 3);
  assert.deepEqual(await pokemonService.pokemonList({ ...args, ids: [] }), { results: [], totalCount: 0 });
  const updated = await pokemonService.pokemonList({ region: 'updated-unova', game: 'black-2' });
  assert.deepEqual(updated.results.map((row) => row.regionalNumber), [0, 4, 4]);
  const national = await pokemonService.pokemonList({});
  assert.deepEqual(national.results.map((row) => [row.id, row.regionalNumber]),
    [[493, null], [494, null], [495, null], [10500, null]]);
});
