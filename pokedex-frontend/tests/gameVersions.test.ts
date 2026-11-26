import assert from 'node:assert/strict';
import { readFileSync } from "node:fs";
import { test } from 'node:test';
import {
  GAME_VERSION_OPTIONS,
  GAME_TO_GENERATION,
  getGameGeneration,
  getGameGenerationStrict,
  getRegionalPokemonListFilters,
} from '../src/lib/gameVersions.js';

test('shared game option list covers every supported game exactly once', () => {
  const values = GAME_VERSION_OPTIONS.map((option) => option.value);
  assert.equal(values.length, 38);
  assert.equal(new Set(values).size, 38);
  assert.deepEqual(new Set(values), new Set(Object.keys(GAME_TO_GENERATION)));
  assert.ok(values.includes('lets-go-eevee'));
  assert.ok(values.includes('legends-za'));
});

test('strict generation lookup distinguishes all from unknown slugs', () => {
  assert.equal(getGameGenerationStrict('all'), 9);
  assert.equal(getGameGenerationStrict('red'), 1);
  assert.equal(getGameGenerationStrict('omega-ruby'), 6);
  assert.equal(getGameGenerationStrict('legends-za'), 9);
  assert.equal(getGameGenerationStrict('totally-unknown-game'), null);

  // Backward-compatible wrapper keeps existing callers working.
  assert.equal(getGameGeneration('totally-unknown-game'), 9);
});

test('regional list mapping preserves both Legends Z-A dexes and legacy ORAS', () => {
  assert.deepEqual(getRegionalPokemonListFilters('LEGENDS-ZA'), { region: 'lumiose-city', game: 'legends-za' });
  assert.deepEqual(getRegionalPokemonListFilters('legends-za', 'hyperspace'), { region: 'hyperspace', game: 'legends-za' });
  assert.deepEqual(getRegionalPokemonListFilters('omega-ruby'), { region: 'hoenn', game: 'omega-ruby' });
  assert.deepEqual(getRegionalPokemonListFilters('alpha-sapphire'), { region: 'hoenn', game: 'alpha-sapphire' });
});

test('all 38 frontend game mappings match the shared catalog contract', () => {
  const catalog = JSON.parse(readFileSync(new URL('../../docs/data-readiness/phase9b4/catalog-contract.json', import.meta.url), 'utf8')) as {
    games: { slug: string; generation: number; legacy_query_dexes: string[] }[];
  };
  assert.deepEqual(new Set(catalog.games.map(game => game.slug)),
    new Set(GAME_VERSION_OPTIONS.map(game => game.value)));
  for (const game of catalog.games) {
    assert.equal(getGameGenerationStrict(game.slug), game.generation);
    const regional = getRegionalPokemonListFilters(game.slug);
    assert.equal(regional.game, game.slug);
    assert.equal(regional.region, game.legacy_query_dexes[0]);
  }
});
