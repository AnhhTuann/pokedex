import test from 'node:test';
import assert from 'node:assert/strict';

process.env.DATABASE_URL = 'postgresql://unused.invalid/audit_fixture';
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
  Object.defineProperties(prisma, {
    pokemon: { value: { findMany: async () => rows, findUnique: async () => ({ id: 3 }) } },
    dexEntry: { value: { findMany: async (args: { where: { regionName: string } }) =>
      entries[args.where.regionName] } },
  });

  const args = { region: 'original-unova', game: 'black', limit: 1 };
  const first = await pokemonService.pokemonList(args);
  assert.deepEqual(first.results.map((row) => [row.id, row.regionalNumber]), [[494, 0]]);
  assert.equal(first.totalCount, 2);
  const second = await pokemonService.pokemonList({ ...args, offset: 1, limit: 4 });
  assert.deepEqual(second.results.map((row) => [row.id, row.regionalNumber]), [[495, 1], [10500, 1]]);
  const updated = await pokemonService.pokemonList({ region: 'updated-unova', game: 'black-2' });
  assert.deepEqual(updated.results.map((row) => row.regionalNumber), [0, 4, 4]);
  const national = await pokemonService.pokemonList({});
  assert.deepEqual(national.results.map((row) => [row.id, row.regionalNumber]),
    [[493, null], [494, null], [495, null], [10500, null]]);
});
