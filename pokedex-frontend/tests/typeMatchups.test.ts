import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  GEN1_TYPE_CHART,
  GEN2_TO_5_TYPE_CHART,
  TYPE_CHART,
  calculateDamageDealt,
  calculateDamageTaken,
  getTypeChart,
  getTypeMultiplier,
  getTypesForGeneration,
} from '../src/utils/typeMatchups.js';

// Defense rows: TYPE_CHART[defender][attacker]. Modern (Gen 6+) chart.
const EXPECTED_CHART: Record<string, Record<string, number>> = {
  normal: { fighting: 2, ghost: 0 },
  fire: { fire: 0.5, water: 2, grass: 0.5, ice: 0.5, ground: 2, rock: 2, bug: 0.5, steel: 0.5, fairy: 0.5 },
  water: { fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, steel: 0.5 },
  electric: { electric: 0.5, ground: 2, flying: 0.5, steel: 0.5 },
  grass: { fire: 2, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, poison: 2, ground: 0.5, flying: 2, bug: 2 },
  ice: { fire: 2, ice: 0.5, fighting: 2, rock: 2, steel: 2 },
  fighting: { flying: 2, psychic: 2, bug: 0.5, rock: 0.5, dark: 0.5, fairy: 2 },
  poison: { grass: 0.5, fighting: 0.5, poison: 0.5, ground: 2, psychic: 2, bug: 0.5, fairy: 0.5 },
  ground: { water: 2, electric: 0, grass: 2, ice: 2, poison: 0.5, rock: 0.5 },
  flying: { electric: 2, grass: 0.5, ice: 2, fighting: 0.5, ground: 0, bug: 0.5, rock: 2 },
  psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2 },
  bug: { fire: 2, grass: 0.5, fighting: 0.5, ground: 0.5, flying: 2, rock: 2 },
  rock: { normal: 0.5, fire: 0.5, water: 2, grass: 2, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, steel: 2 },
  ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
  dragon: { fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, dragon: 2, fairy: 2 },
  dark: { fighting: 2, psychic: 0, bug: 2, ghost: 0.5, dark: 0.5, fairy: 2 },
  steel: { normal: 0.5, fire: 2, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5 },
  fairy: { fighting: 0.5, poison: 2, bug: 0.5, dragon: 0, dark: 0.5, steel: 2 },
};

test('defensive type chart matches the canonical modern matchups', () => {
  assert.deepEqual(TYPE_CHART, EXPECTED_CHART);
});

test('bug fixes keep reversed resistances out of the modern chart', () => {
  assert.equal(getTypeMultiplier('rock', 'normal'), 1);
  assert.equal(getTypeMultiplier('steel', 'normal'), 1);
  assert.equal(getTypeMultiplier('steel', 'ghost'), 1);
  assert.equal(getTypeMultiplier('ice', 'rock'), 1);
});

test('dual-type defense multiplies matchups and keeps immunities', () => {
  const rockGround = calculateDamageTaken('rock', 'ground');
  assert.ok(rockGround.x4.includes('water'));
  assert.ok(rockGround.x4.includes('grass'));
  assert.ok(rockGround.x0.includes('electric'));
  assert.ok(rockGround.x025.includes('poison'));

  const normalGhost = calculateDamageTaken('normal', 'ghost');
  assert.ok(normalGhost.x0.includes('normal'));
  assert.ok(normalGhost.x0.includes('fighting'));
  assert.ok(normalGhost.x0.includes('ghost'));
});

test('offense lookup covers single-type targets', () => {
  assert.ok(calculateDamageDealt('steel').x2.includes('fairy'));
  assert.ok(calculateDamageDealt('ice').x2.includes('dragon'));
  assert.ok(calculateDamageDealt('ground').x0.includes('flying'));
});

test('Gen 2-5 removes Fairy and restores Steel resistances', () => {
  assert.equal(getTypeChart(5), GEN2_TO_5_TYPE_CHART);
  assert.ok(!getTypesForGeneration(5).includes('fairy'));
  assert.equal(getTypeMultiplier('ghost', 'steel', 5), 0.5);
  assert.equal(getTypeMultiplier('dark', 'steel', 5), 0.5);
  assert.equal(getTypeMultiplier('ghost', 'psychic', 5), 2);
  assert.equal(getTypeMultiplier('bug', 'poison', 5), 0.5);
});

test('Gen 1 uses its 15 types and historical Ghost/Psychic and Bug/Poison behavior', () => {
  assert.equal(getTypeChart(1), GEN1_TYPE_CHART);
  assert.equal(getTypesForGeneration(1).length, 15);
  assert.equal(getTypeMultiplier('ghost', 'psychic', 1), 0);
  assert.equal(getTypeMultiplier('psychic', 'ghost', 1), 1);
  assert.equal(getTypeMultiplier('bug', 'poison', 1), 2);
  assert.equal(getTypeMultiplier('poison', 'bug', 1), 2);
  assert.equal(getTypeMultiplier('ice', 'fire', 1), 1);
  assert.ok(!getTypesForGeneration(1).includes('dark'));
  assert.ok(!getTypesForGeneration(1).includes('steel'));
  assert.ok(!getTypesForGeneration(1).includes('fairy'));
});

test('modern rules remain the default for unknown or later generations', () => {
  assert.equal(getTypeChart(), TYPE_CHART);
  assert.equal(getTypeChart(0), GEN1_TYPE_CHART);
  assert.equal(getTypeChart(6), TYPE_CHART);
  assert.equal(getTypeChart(9), TYPE_CHART);
  assert.equal(calculateDamageTaken('ghost', null).x0.includes('normal'), true);
});

test('single-type chart contains expected canonical matchups', () => {
  assert.equal(TYPE_CHART.grass.fire, 2);
  assert.equal(TYPE_CHART.water.fire, 0.5);
  assert.equal(TYPE_CHART.ground.electric, 0);
  assert.equal(TYPE_CHART.normal.ghost, 0);
  assert.equal(TYPE_CHART.flying.ground, 0);
});

test('dual-type defensive calculation multiplies both types', () => {
  const result = calculateDamageTaken('fire', 'flying');
  assert.ok(result.x4.includes('rock'));
  assert.ok(result.x2.includes('water'));
  assert.ok(result.x2.includes('electric'));
  assert.ok(result.x0.includes('ground'));
  assert.ok(result.x05.includes('fighting'));
  assert.ok(result.x1.includes('ice'));
});

test('offensive calculation groups defending types correctly', () => {
  const fire = calculateDamageDealt('fire');
  assert.ok(fire.x2.includes('grass'));
  assert.ok(fire.x2.includes('steel'));
  assert.ok(fire.x05.includes('water'));
  assert.ok(fire.x1.includes('normal'));
});
