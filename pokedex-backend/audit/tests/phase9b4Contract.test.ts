import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { broadRegionDexes } from '../../src/lib/regionalDexes.js';

const docs = '../docs/data-readiness/phase9b4/';
const coverage = 'audit/reports/phase9b-coverage/';
const prior = 'audit/reports/phase9b3/';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const rows = (path: string) => readFileSync(path, 'utf8').trimEnd().split('\n').slice(1);

test('all 35 Dex references and 38 games match the pinned evidence catalog', () => {
  const contract = read(docs + 'catalog-contract.json');
  assert.equal(contract.database_status, 'UNVERIFIED');
  assert.equal(contract.dexes.length, 35);
  assert.equal(new Set(contract.dexes.map((dex: any) => dex.slug)).size, 35);
  assert.equal(contract.games.length, 38);
  assert.equal(new Set(contract.games.map((game: any) => game.slug)).size, 38);
  assert.deepEqual(new Set(contract.games.map((game: any) => game.generation)), new Set(contract.generation_ids));
  const dexEntries = rows(coverage + 'regional-entries.csv');
  for (const dex of contract.dexes) {
    if (dex.region) assert.ok(broadRegionDexes.get(dex.region)?.includes(dex.slug));
    assert.ok(dexEntries.some(row => row.split(',')[1] === dex.slug));
  }
  const evidence = read(coverage + 'game-membership.json');
  for (const game of contract.games) {
    const record = evidence.find((row: any) => row.slug === game.slug);
    assert.equal(game.version_group, record.version_group);
    assert.ok(game.reference_dexes.every((slug: string) => contract.dexes.some((dex: any) => dex.slug === slug)));
    assert.ok(record.wild_pokemon_ids.every((id: number) => record.game_presence_pokemon_ids.includes(id)));
  }
  const black = evidence.find((row: any) => row.slug === 'black');
  assert.ok(black.regional_species_ids.includes(494));
  assert.ok(!black.wild_pokemon_ids.includes(494));
  assert.ok(contract.availability_facets.includes('UNVERIFIED'));
});

test('form and learnset queues retain the same per-record keys as Phase 9B-3', () => {
  const forms = rows(docs + 'form-backlog.csv');
  assert.equal(forms.length, 245);
  assert.deepEqual(forms.map(row => row.split(',')[0]),
    rows(prior + 'alternate-form-evidence.csv').map(row => row.split(',')[0]));
  assert.ok(forms.some(row => row.includes('REGIONAL_FORM')));
  assert.ok(forms.some(row => row.includes('MEGA_FORM')));
  assert.ok(forms.some(row => row.includes('GIGANTAMAX_FORM')));

  const pairs = rows(docs + 'learnset-backlog.csv');
  assert.equal(pairs.length, 2010);
  const keys = pairs.map(row => row.split(',').slice(0, 2).join(','));
  assert.equal(new Set(keys).size, pairs.length);
  assert.deepEqual(keys, rows(prior + 'learnset-discrepancies.csv').map(row => {
    const [pokemonId, , group] = row.split(',');
    return [pokemonId, group].join(',');
  }));
});

test('all 540 trees retain the same edges and conditions as the flattened inventory', () => {
  interface Node {
    species_id: number;
    conditions: unknown[];
    evolves_to: Node[];
  }
  const trees: { chain_id: number; relationship: Node }[] = read(coverage + 'evolution-chains.json');
  const edges = read(prior + 'evolution-conditions.json');
  const byKey = new Map<string, unknown[]>(edges.map((row: any) =>
    [`${row.chain_id}/${row.from_species_id}/${row.to_species_id}`, row.conditions]));
  assert.equal(trees.length, 540);
  assert.equal(new Set(trees.map(tree => tree.chain_id)).size, 540);
  let count = 0;
  let conditions = 0;
  function check(chain: number, node: Node, parents: number[]) {
    assert.ok(!parents.includes(node.species_id));
    for (const child of node.evolves_to) {
      assert.deepEqual(byKey.get(`${chain}/${node.species_id}/${child.species_id}`), child.conditions);
      count++;
      conditions += child.conditions.length;
      check(chain, child, [...parents, node.species_id]);
    }
  }
  for (const tree of trees) check(tree.chain_id, tree.relationship, []);
  assert.equal(count, 485);
  assert.equal(conditions, 702);
  assert.deepEqual(byKey.get('250/489/490'), []);
});
