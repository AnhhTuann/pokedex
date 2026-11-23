import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDamageDealt,
  calculateDamageTaken,
  TYPE_CHART,
} from '../src/utils/typeMatchups.js';

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
