import test from 'node:test';
import assert from 'node:assert/strict';
import {
  defensiveMatchups,
  GEN1_TYPE_CHART,
  GEN2_TO_5_TYPE_CHART,
  TYPE_CHART,
  TYPE_LIST,
  getTypeChart,
  getTypesForGeneration,
} from '../src/lib/typeMatchups.js';
import {
  GEN1_TYPE_CHART as FE_GEN1,
  GEN2_TO_5_TYPE_CHART as FE_GEN2_TO_5,
  TYPE_CHART as FE_MODERN,
  TYPE_LIST as FE_TYPE_LIST,
  getTypeChart as feGetTypeChart,
} from '../../pokedex-frontend/src/utils/typeMatchups.js';

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

test('generation argument selects historical charts without changing the default', () => {
  const multiplier = (types: string[], attack: string, generation?: number): number =>
    defensiveMatchups(types, generation).find((matchup) => matchup.type === attack)?.multiplier ?? 1;

  assert.equal(multiplier(['psychic'], 'ghost', 1), 0);
  assert.equal(multiplier(['steel'], 'ghost', 5), 0.5);
  assert.equal(multiplier(['steel'], 'ghost'), 1);
  assert.equal(getTypeChart(1), GEN1_TYPE_CHART);
  assert.equal(getTypeChart(5), GEN2_TO_5_TYPE_CHART);
  assert.equal(getTypeChart(), TYPE_CHART);
  assert.deepEqual(getTypesForGeneration(1).length, 15);
  assert.deepEqual(getTypesForGeneration(5).length, 17);
  assert.deepEqual(getTypesForGeneration(9).length, 18);
});

test('backend and frontend type charts are numerically identical for every generation', () => {
  assert.deepEqual(TYPE_LIST, FE_TYPE_LIST);
  assert.deepEqual(TYPE_CHART, FE_MODERN);
  assert.deepEqual(GEN2_TO_5_TYPE_CHART, FE_GEN2_TO_5);
  assert.deepEqual(GEN1_TYPE_CHART, FE_GEN1);
  for (const generation of [1, 5, 6, 9]) {
    assert.deepEqual(getTypeChart(generation), feGetTypeChart(generation));
  }
});
