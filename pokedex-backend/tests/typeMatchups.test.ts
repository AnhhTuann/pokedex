import test from 'node:test';
import assert from 'node:assert/strict';
import { defensiveMatchups } from '../src/lib/typeMatchups.js';

const multiplier = (types: string[], attack: string): number =>
  defensiveMatchups(types).find((matchup) => matchup.type === attack)?.multiplier ?? 1;

test('defensive matchups are computed from defending types, not hardcoded', () => {
  assert.equal(multiplier(['fire'], 'water'), 2);
  assert.equal(multiplier(['fire'], 'grass'), 0.5);
  assert.equal(multiplier(['normal'], 'ghost'), 0);
  assert.equal(multiplier(['rock', 'ground'], 'electric'), 0);
  assert.equal(multiplier(['grass', 'poison'], 'psychic'), 2);
  assert.equal(multiplier(['water', 'ground'], 'electric'), 0);
});

test('matchups omit neutral entries and de-duplicate types', () => {
  const single = defensiveMatchups(['normal']);
  assert.ok(single.every((matchup) => matchup.multiplier !== 1));
  assert.deepEqual(defensiveMatchups(['fire', 'fire']), defensiveMatchups(['fire']));
});
