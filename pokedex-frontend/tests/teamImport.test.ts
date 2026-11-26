import assert from 'node:assert/strict';
import test from 'node:test';
import { parseTeamImport } from '../src/lib/teamImport';

const form = {
  id: 10033, name: 'venusaur-mega', image: '/images/venusaur-mega.webp', types: ['grass'],
  moves: [{ name: 'tackle' }], selectedAbility: 'thick-fat', selectedItem: 'Life Orb', selectedNature: 'Modest',
};

test('team JSON round-trips exact form ID and selected build', () => {
  assert.deepEqual(parseTeamImport(JSON.stringify([form])), [form]);
});

test('team JSON rejects malformed, duplicate and oversized imports before applying them', () => {
  for (const value of [[null], [{ ...form, moves: [null] }], [form, form],
    Array.from({ length: 7 }, (_, i) => ({ ...form, id: i + 1 }))]) {
    assert.throws(() => parseTeamImport(JSON.stringify(value)));
  }
});
