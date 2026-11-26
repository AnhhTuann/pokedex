import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const dir = 'audit/reports/phase9b3/';
const read = (name: string) => JSON.parse(readFileSync(dir + name, 'utf8'));
const csv = (name: string) => readFileSync(dir + name, 'utf8').trimEnd().split('\n').slice(1);

test('all 245 exact unresolved varieties have a disposition without inheriting game proof', () => {
  const baseline = JSON.parse(readFileSync('audit/reports/phase9b-coverage/varieties.json', 'utf8'));
  const pending = baseline.filter((row: any) => !row.is_default && !row.direct_game_indices.length &&
    !Object.keys(row.encounter_methods_by_game).length).map((row: any) => row.pokemon_id);
  const evidence = csv('alternate-form-evidence.csv');
  assert.deepEqual(evidence.map((row) => Number(row.split(',', 1)[0])), pending);
  assert.equal(pending.length, 245);
  assert.ok(evidence.every((row) => row.includes('INHERITED_BASE_SPECIES_REFERENCE')));
  assert.ok(evidence.every((row) => !row.includes('EXPLICIT_GAME_INDEX') && !row.includes('WILD_ENCOUNTER')));
  assert.deepEqual(read('summary.json').forms.disposition_counts, { UNVERIFIED: 193, PARTIALLY_VERIFIED: 52 });
});

test('learnsets remain separated by version group and possible gaps stay unverified', () => {
  const groups = csv('learnset-groups.csv').map((row) => row.split(',', 1)[0]);
  assert.equal(new Set(groups).size, 32);
  assert.ok(groups.includes('red-blue') && groups.includes('yellow'));
  assert.ok(csv('learnset-discrepancies.csv').every((row) => row.includes('SOURCE_NOT_PROVIDED')));
  assert.equal(read('summary.json').learnsets.supported_slots, 609074);
});

test('evolution audit preserves branches, item conditions and version-group details', () => {
  const edges = read('evolution-conditions.json');
  assert.equal(read('summary.json').evolutions.trees, 540);
  assert.equal(edges.length, 485);
  const eevee = edges.filter((edge: any) => edge.from_species_id === 133);
  assert.ok(eevee.length > 2);
  assert.ok(eevee.some((edge: any) => edge.conditions.some((d: any) => d.item?.name === 'water-stone')));
  assert.ok(edges.some((edge: any) => edge.conditions.some((d: any) =>
    d.min_level === 16 && d.version_group?.name === 'red-blue')));
  assert.ok(edges.some((edge: any) => edge.to_species_id === 490 && edge.conditions.length === 0));
});

test('asset hashes and database unknowns are not reported as verified discrepancies', () => {
  const assets = read('duplicate-assets.json');
  assert.equal(assets.length, 39);
  assert.ok(assets.every((group: any) => /^[a-f0-9]{64}$/.test(group.sha256) &&
    new Set(group.files.map((file: any) => file.mode)).size === 1));
  const missing = csv('missing-assets.csv');
  assert.equal(missing.filter((row) => row.startsWith('normal,')).length, 47);
  assert.equal(missing.filter((row) => row.startsWith('shiny,')).length, 49);
  assert.deepEqual(read('summary.json').database, {
    status: 'UNVERIFIED', target: null, queried_rows: 0, discrepancy_counts: null, expected_keys_listed: 10424,
  });
  assert.equal(csv('victini.csv').length, 2);
  assert.equal(csv('oras.csv').length, 413);
  assert.equal(csv('legends-za.csv').length, 364);
});
