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
    ({ id, pokedexNumber, name, types: [], generation: 5, speciesId, isDefault: speciesId === null });
  let rows = [pokemon(3, 495, 'snivy'), pokemon(4, 493, 'arceus'),
    pokemon(2, 494, 'victini'), { ...pokemon(5, 10500, 'snivy-form', 495), generation: 8 }];
  const entries: Record<string, Array<{pokemonId: number; entryNumber: number}>> = {
    'original-unova': [{ pokemonId: 2, entryNumber: 0 }, { pokemonId: 3, entryNumber: 1 }],
    'updated-unova': [{ pokemonId: 2, entryNumber: 0 }, { pokemonId: 3, entryNumber: 4 }],
  };
  let capturedWhere: unknown;
  Object.defineProperties(prisma, {
    pokemon: { value: { findMany: async ({ where, select }: {
      where: {
        isDefault?: boolean;
        generation?: number | { lte: number };
        AND?: { OR: { generation?: number | { lte: number }; speciesId?: { in: number[] } }[] }[];
      };
      select?: { pokedexNumber: boolean };
    }) => {
      if (select) return rows.filter(row => row.isDefault &&
        (typeof where.generation === 'number' ? row.generation === where.generation :
          row.generation <= (where.generation?.lte ?? 9)));
      capturedWhere = where;
      const generationFilter = where.AND?.find(clause => clause.OR[0]?.generation !== undefined);
      const generation = generationFilter?.OR[0].generation;
      const baseIds = generationFilter?.OR[1].speciesId?.in ?? [];
      return rows.filter(row => (where.isDefault === undefined || where.isDefault === row.isDefault) &&
        (!generationFilter || (row.isDefault
          ? (typeof generation === 'number' ? row.generation === generation : row.generation <= (generation?.lte ?? 9))
          : row.speciesId !== null && baseIds.includes(row.speciesId))));
    } } },
    dexEntry: { value: { findMany: async (args: { where: { regionName: string | { in: string[] } } }) =>
      (typeof args.where.regionName === 'string' ? [args.where.regionName] : args.where.regionName.in)
        .flatMap(slug => entries[slug] ?? []).map(entry => ({ ...entry,
        pokemon: { pokedexNumber: rows.find(row => row.id === entry.pokemonId)!.pokedexNumber }
      })) } },
  });

  const args = { region: 'original-unova', game: 'black', limit: 1 };
  const first = await pokemonService.pokemonList(args);
  assert.deepEqual(first.results.map((row) => [row.id, row.regionalNumber]), [[494, 0]]);
  assert.equal(first.totalCount, 3);
  await pokemonService.pokemonList({ ...args, gen: 5, maxGen: 8 });
  assert.deepEqual(capturedWhere, {
    AND: [
      { OR: [{ isDefault: true }, { altFormAvailableIn: { has: 'black' } }] },
      { OR: [{ isDefault: true, generation: 5 }, { isDefault: false, speciesId: { in: [495, 493, 494] } }] },
    ],
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
  const broad = await pokemonService.pokemonList({ broadRegion: 'unova' });
  assert.deepEqual(broad.results.map(row => [row.id, row.regionalNumber]), [[494, null], [495, null], [10500, null]]);
  const intersection = await pokemonService.pokemonList({ region: 'updated-unova', broadRegion: 'unova' });
  assert.deepEqual(intersection.results.map(row => row.regionalNumber), [0, 4, 4]);
  const national = await pokemonService.pokemonList({});
  assert.deepEqual(national.results.map((row) => [row.id, row.regionalNumber]),
    [[493, null], [494, null], [495, null], [10500, null]]);

  for (let gen = 1; gen <= 9; gen++) {
    const alternate = await pokemonService.pokemonList({ gen, form: 'ALTERNATE' });
    assert.deepEqual(alternate.results.map(row => row.id), gen === 5 ? [10500] : []);
    assert.deepEqual(capturedWhere, {
      isDefault: false,
      AND: [{ OR: [
        { isDefault: true, generation: gen },
        { isDefault: false, speciesId: { in: gen === 5 ? [495, 493, 494] : [] } },
      ] }],
    });
  }
  await assert.rejects(pokemonService.pokemonList({ gen: 10 }), /integer from 1 to 9/);
  await assert.rejects(pokemonService.pokemonList({ broadRegion: 'updated-unova' }), /Unknown broad/);
  const nationalDex = await pokemonService.pokemonList({ region: 'national' });
  assert.deepEqual(nationalDex.results.map(row => row.regionalNumber), [493, 494, 495, 495]);

  rows = Array.from({ length: 1351 }, (_, index) =>
    pokemon(index + 1, index + 1, 'fixture'));
  const largePages = await Promise.all([0, 500, 1000, 1351].map(offset =>
    pokemonService.pokemonList({ offset, limit: 500 })));
  assert.deepEqual(largePages.map(page => page.results.length), [500, 500, 351, 0]);
  assert.ok(largePages.every(page => page.totalCount === 1351));
  assert.deepEqual(largePages.flatMap(page => page.results.map(row => row.id)), rows.map(row => row.id));
});
