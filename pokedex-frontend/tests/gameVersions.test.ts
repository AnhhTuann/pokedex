import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  GAME_VERSION_OPTIONS,
  GAME_TO_GENERATION,
  getGameGeneration,
  getGameGenerationStrict,
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
