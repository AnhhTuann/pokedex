import assert from 'node:assert/strict';
import test from 'node:test';
import { collectPokemonPages } from '../src/lib/collectPokemonPages';

test('collects first, middle and short final pages beyond 1,025 forms', async () => {
  const rows = Array.from({ length: 1351 }, (_, index) => ({ id: index + 1 }));
  const offsets: number[] = [];
  assert.deepEqual(await collectPokemonPages(async offset => {
    offsets.push(offset);
    return { results: rows.slice(offset, offset + 250), totalCount: rows.length };
  }), rows);
  assert.deepEqual(offsets, [0, 250, 500, 750, 1000, 1250]);
});

test('terminates at an exact final-page boundary and handles zero results', async () => {
  let calls = 0;
  assert.deepEqual(await collectPokemonPages(async () => {
    calls++;
    return { results: [{ id: 1 }], totalCount: 1 };
  }), [{ id: 1 }]);
  assert.equal(calls, 1);
  assert.deepEqual(await collectPokemonPages(async () => ({ results: [], totalCount: 0 })), []);
});

test('rejects partial, duplicated or inconsistent data before publishing results', async () => {
  await assert.rejects(collectPokemonPages(async offset => ({
    results: offset === 0 ? [{ id: 1 }] : [], totalCount: 2,
  })), /incomplete/);
  await assert.rejects(collectPokemonPages(async () => ({
    results: [{ id: 1 }], totalCount: 2,
  })), /duplicate/);
  await assert.rejects(collectPokemonPages(async offset => ({
    results: [{ id: offset + 1 }], totalCount: offset === 0 ? 2 : 3,
  })), /changed/);
  await assert.rejects(collectPokemonPages(async offset => {
    if (offset) throw new Error('network failed');
    return { results: [{ id: 1 }], totalCount: 2 };
  }), /network failed/);
});
