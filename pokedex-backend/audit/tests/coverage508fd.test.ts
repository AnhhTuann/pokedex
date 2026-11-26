import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { GAME_VERSION_OPTIONS } from '../../../pokedex-frontend/src/lib/gameVersions.js';

const out = 'audit/reports/phase9b-coverage/';
const read = (name: string) => readFileSync(out + name, 'utf8');
const summary = JSON.parse(read('summary.json'));
const species = JSON.parse(read('species.json')) as Array<{
  national_id: number;
  generation: number;
  regional_dexes: Array<{dex: string; number: number}>;
}>;
const forms = JSON.parse(read('varieties.json')) as Array<{
  pokemon_id: number;
  base_species_id: number;
  base_generation: number;
  is_default: boolean;
  direct_game_indices: string[];
  wild_encounter_versions: string[];
  documented_gift_or_trade_versions: string[];
}>;
const games = JSON.parse(read('game-membership.json')) as Array<{
  slug: string;
  regional_species_ids: number[];
  effective_regional_species_ids: number[];
  game_presence_pokemon_ids: number[];
  wild_pokemon_ids: number[];
  gift_or_trade_pokemon_ids: number[];
}>;

test('pinned coverage partitions every National Dex species into the nine generations', () => {
  assert.equal(summary.snapshot_commit, '508fd7c3a7d54ac175e00afe420b11a5af983bd6');
  assert.deepEqual(species.map((s) => s.national_id), Array.from({ length: 1025 }, (_, i) => i + 1));
  assert.deepEqual(Array.from({ length: 9 }, (_, i) => species.filter((s) => s.generation === i + 1).length),
    [151, 100, 135, 107, 156, 72, 88, 96, 120]);
  assert.equal(new Set(species.flatMap((s) => s.regional_dexes.map((entry) => entry.dex))).size, 35);
  assert.equal(summary.dex_entries, 8010);
  assert.deepEqual(species[493].regional_dexes.filter(({ dex }) => dex.includes('unova')),
    [{ dex: 'original-unova', number: 0 }, { dex: 'updated-unova', number: 0 }]);
});

test('all 38 games keep positive evidence distinct from Dex membership and wild methods', () => {
  assert.deepEqual(games.map((g) => g.slug), GAME_VERSION_OPTIONS.map((g) => g.value));
  const byGame = new Map(games.map((g) => [g.slug, g]));
  const yellow = byGame.get('yellow')!;
  assert.equal(yellow.regional_species_ids.includes(25), true);
  assert.equal(yellow.gift_or_trade_pokemon_ids.includes(25), true);
  assert.equal(yellow.wild_pokemon_ids.includes(25), false);
  for (const slug of ['omega-ruby', 'alpha-sapphire']) {
    assert.equal(byGame.get(slug)?.regional_species_ids.length, 211);
    assert.equal(byGame.get(slug)?.effective_regional_species_ids.length, 202);
  }
  assert.equal(byGame.get('legends-za')?.effective_regional_species_ids.length, 364);
});

test('alternate forms inherit origin generation and retain only their own game evidence', () => {
  assert.equal(new Set(forms.map((f) => f.pokemon_id)).size, 1351);
  assert.ok(forms.every((form) => species[form.base_species_id - 1].generation === form.base_generation));
  assert.equal(forms.filter((f) => !f.is_default && !f.direct_game_indices.length).length, 326);
  const alolanRaichu = forms.find((f) => f.pokemon_id === 10100)!;
  assert.deepEqual(alolanRaichu.direct_game_indices, []);
  assert.equal(alolanRaichu.documented_gift_or_trade_versions.includes('lets-go-eevee'), true);
  assert.equal(alolanRaichu.wild_encounter_versions.includes('lets-go-eevee'), false);
  assert.equal(games.find((g) => g.slug === 'red')?.game_presence_pokemon_ids.includes(10100), false);
});

test('local Normal and Shiny inventories track missing files independently', () => {
  const assetRows = read('assets.csv').trim().split('\n').slice(1);
  assert.equal(assetRows.filter((row) => row.startsWith('normal,')).length, 1388);
  assert.equal(assetRows.filter((row) => row.startsWith('shiny,')).length, 1388);
  assert.deepEqual(summary.missing_assets, { normal: 47, shiny: 49 });
  assert.equal(summary.invalid_assets, 0);
});
