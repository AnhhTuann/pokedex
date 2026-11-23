import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateActualHP,
  calculateActualOtherStat,
  calculateDamage,
  getNatureModifier,
  type CalculatorMove,
  type CalculatorPokemon,
  type FieldState,
} from '../src/utils/damageCalc.js';

const makePokemon = (overrides: Partial<CalculatorPokemon>): CalculatorPokemon => ({
  id: 1,
  name: 'test',
  types: ['normal'],
  level: 100,
  nature: 'Hardy',
  item: '',
  ability: '',
  status: 'Healthy',
  ivs: {},
  evs: {},
  baseStats: {
    hp: 50,
    attack: 50,
    defense: 50,
    'special-attack': 50,
    'special-defense': 50,
    speed: 50,
  },
  ...overrides,
});

const neutralField: FieldState = {
  weather: 'None',
  terrain: 'None',
  reflect: false,
  lightScreen: false,
  critical: false,
};

test('stat formulas respect level, IV, EV and nature', () => {
  assert.equal(calculateActualHP(50, 31, 252, 100), 304);
  assert.equal(calculateActualOtherStat(50, 31, 252, 100, 1), 199);
  assert.equal(calculateActualOtherStat(50, 31, 252, 100, 1.1), 218);
  assert.equal(getNatureModifier('Adamant', 'attack'), 1.1);
  assert.equal(getNatureModifier('Adamant', 'special-attack'), 0.9);
});

test('status moves deal no damage', () => {
  const pokemon = makePokemon({});
  const result = calculateDamage(
    pokemon,
    pokemon,
    { name: 'Protect', type: 'normal', power: null, damageClass: 'status' },
    neutralField
  );
  assert.equal(result.minDamage, 0);
  assert.equal(result.maxDamage, 0);
});

test('damage roll regression for STAB, partial resistance and Choice Band', () => {
  const attacker = makePokemon({
    name: 'Blaziken',
    types: ['fire'],
    nature: 'Adamant',
    item: 'Choice Band',
    baseStats: {
      hp: 80,
      attack: 100,
      defense: 60,
      'special-attack': 100,
      'special-defense': 60,
      speed: 80,
    },
  });
  const defender = makePokemon({
    name: 'Swampert',
    types: ['water', 'ground'],
    nature: 'Bold',
    baseStats: {
      hp: 100,
      attack: 85,
      defense: 90,
      'special-attack': 85,
      'special-defense': 90,
      speed: 60,
    },
  });
  const move: CalculatorMove = {
    name: 'Flare Blitz',
    type: 'fire',
    power: 120,
    damageClass: 'physical',
  };

  const result = calculateDamage(attacker, defender, move, neutralField);

  assert.equal(result.defHP, 341);
  assert.equal(result.effectiveness, 0.5);
  assert.equal(result.isStab, true);
  assert.equal(result.rolls.length, 16);
  assert.equal(result.minDamage, 106);
  assert.equal(result.maxDamage, 125);
  assert.equal(result.minDamage, result.rolls[0]);
  assert.equal(result.maxDamage, result.rolls[result.rolls.length - 1]);
  assert.ok(result.maxDamage > result.minDamage);
});

test('immune matchup produces zero damage', () => {
  const attacker = makePokemon({ types: ['ground'] });
  const defender = makePokemon({ types: ['flying'] });
  const result = calculateDamage(
    attacker,
    defender,
    { name: 'Earthquake', type: 'ground', power: 100, damageClass: 'physical' },
    neutralField
  );
  assert.equal(result.effectiveness, 0);
  assert.equal(result.maxDamage, 0);
});
