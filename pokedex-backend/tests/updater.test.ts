import test from 'node:test';
import assert from 'node:assert/strict';
import {
  baseStatsFromApi,
  generationFromSpecies,
  idFromUrl,
  selectMissing,
} from '../src/services/updater.service.js';

test('idFromUrl reads stable PokeAPI resource ids', () => {
  assert.equal(idFromUrl('https://pokeapi.co/api/v2/pokemon-species/25/'), 25);
  assert.equal(idFromUrl('https://pokeapi.co/api/v2/item/1234'), 1234);
  assert.equal(idFromUrl('not-a-url'), null);
});

test('generationFromSpecies uses the API generation field', () => {
  assert.equal(generationFromSpecies({ generation: { name: 'generation-iii' } }), 3);
  assert.equal(generationFromSpecies({ generation: { name: 'generation-ix' } }), 9);
  assert.equal(generationFromSpecies({}), 1);
});

test('baseStatsFromApi maps hyphenated stat names', () => {
  const stats = [
    { stat: { name: 'hp' }, base_stat: 45 },
    { stat: { name: 'attack' }, base_stat: 49 },
    { stat: { name: 'special-attack' }, base_stat: 65 },
  ];
  assert.deepEqual(baseStatsFromApi(stats), {
    hp: 45,
    attack: 49,
    defense: 0,
    specialAttack: 65,
    specialDefense: 0,
    speed: 0,
  });
});

test('selectMissing detects gaps and reruns without duplicating rows', () => {
  const remote = [
    { id: 1, name: 'one', url: 'u1' },
    { id: 2, name: 'two', url: 'u2' },
    { id: 4, name: 'four', url: 'u4' },
  ];
  assert.deepEqual(
    selectMissing(remote, new Set([1, 4])),
    [{ id: 2, name: 'two', url: 'u2' }]
  );
  assert.deepEqual(selectMissing(remote, new Set([1, 2, 4])), []);
});
