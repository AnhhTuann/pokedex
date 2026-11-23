import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  calculateActualHP,
  calculateActualOtherStat,
  calculateDamage,
  getKoChanceText,
  getNatureModifier,
  type CalculatorMove,
  type CalculatorPokemon,
  type FieldState,
} from '../src/utils/damageCalc.js';

const makePokemon = (overrides: Partial<CalculatorPokemon> = {}): CalculatorPokemon => ({
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

const rolls = (damage: number, count = 16): number[] => Array(count).fill(damage);

test('stat formulas respect level, IV, EV and nature', () => {
  assert.equal(calculateActualHP(50, 31, 252, 100), 304);
  assert.equal(calculateActualOtherStat(50, 31, 252, 100, 1), 199);
  assert.equal(calculateActualOtherStat(50, 31, 252, 100, 1.1), 218);
  assert.equal(getNatureModifier('Adamant', 'attack'), 1.1);
  assert.equal(getNatureModifier('Adamant', 'special-attack'), 0.9);
});

test('status moves deal no damage', () => {
  const pokemon = makePokemon();
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
  assert.equal(result.koChanceText, 'No damage dealt');
});

test('KO chances use exact roll damage, not rounded percentages', () => {
  assert.equal(getKoChanceText(rolls(1999), 2000), 'guaranteed 2HKO');
  assert.equal(getKoChanceText([1999, ...rolls(2000, 15)], 2000), '93.8% chance to OHKO');
  assert.equal(getKoChanceText(rolls(100), 100), 'guaranteed OHKO');
  assert.equal(getKoChanceText(rolls(60), 100), 'guaranteed 2HKO');
  assert.equal(getKoChanceText(rolls(40), 100), 'guaranteed 3HKO');
  assert.equal(getKoChanceText(rolls(30), 100), 'possible multi-turn KO');
  assert.equal(getKoChanceText([50, ...rolls(40, 15)], 100), '6.3% chance to 2HKO');
  assert.equal(getKoChanceText([35, ...rolls(33, 15)], 100), '6.3% chance to 3HKO');
  assert.equal(getKoChanceText(rolls(0), 100), 'No damage dealt');
});

test('damage calculation keeps 16 consistent rolls and applies weather/type modifiers', () => {
  const result = calculateDamage(
    makePokemon({ types: ['water'], baseStats: { hp: 100, 'special-attack': 150 } }),
    makePokemon({ name: 'target', types: ['water'], baseStats: { hp: 60, 'special-defense': 60 } }),
    { name: 'Hydro Pump', type: 'water', power: 120, damageClass: 'special' },
    { ...neutralField, weather: 'Rain' },
  );

  assert.equal(result.rolls.length, 16);
  assert.equal(result.effectiveness, 0.5);
  assert.equal(result.minDamage, result.rolls[0]);
  assert.equal(result.maxDamage, result.rolls[15]);
  assert.equal(result.koChanceText, getKoChanceText(result.rolls, result.defHP));
});

test('damage calculation honors the supplied type-chart generation', () => {
  const move: CalculatorMove = { name: 'Shadow Ball', type: 'ghost', power: 80, damageClass: 'special' };
  const psychic = makePokemon({
    name: 'psychic',
    types: ['psychic'],
    baseStats: { hp: 100, 'special-defense': 60 },
  });

  const modern = calculateDamage(makePokemon(), psychic, move, neutralField);
  const gen1 = calculateDamage(makePokemon(), { ...psychic, generation: 1 }, move, neutralField);

  assert.equal(modern.effectiveness, 2);
  assert.equal(gen1.effectiveness, 0);
  assert.equal(gen1.minDamage, 0);
  assert.equal(gen1.maxDamage, 0);
  assert.equal(gen1.koChanceText, 'No damage dealt');
});

test('Gen I-III physical/special split uses move type, not modern damageClass', () => {
  const flamethrower: CalculatorMove = {
    name: 'Flamethrower',
    type: 'fire',
    power: 80,
    // PokeAPI reports the modern category even for legacy battles.
    damageClass: 'physical',
  };
  const attacker = makePokemon({
    name: 'legacy-attacker',
    baseStats: { hp: 50, attack: 140, 'special-attack': 20, defense: 50, 'special-defense': 50, speed: 50 },
    generation: 3,
  });
  const defender = makePokemon({
    name: 'legacy-defender',
    baseStats: { hp: 100, attack: 50, 'special-attack': 50, defense: 200, 'special-defense': 20, speed: 50 },
    generation: 3,
  });

  const legacy = calculateDamage(attacker, defender, flamethrower, neutralField);
  const modern = calculateDamage(
    { ...attacker, generation: 4 },
    { ...defender, generation: 4 },
    flamethrower,
    neutralField,
  );

  assert.ok(legacy.maxDamage > modern.maxDamage);
  assert.equal(modern.maxDamage > 0, true);

  // Callers that do not supply a generation still use modern rules.
  const legacyCaller = calculateDamage(
    { ...attacker, generation: undefined },
    { ...defender, generation: undefined },
    flamethrower,
    neutralField,
  );
  assert.equal(legacyCaller.maxDamage, modern.maxDamage);
});
