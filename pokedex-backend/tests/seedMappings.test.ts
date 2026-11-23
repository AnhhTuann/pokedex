import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const seedSource = readFileSync(new URL('../scripts/seed.ts', import.meta.url), 'utf8');

test('seed keeps ORAS legacy alias and adds updated-hoenn', () => {
  assert.match(seedSource, /hoenn:\s*\[[^\]]*"omega-ruby",\s*"alpha-sapphire"\]/);
  assert.match(seedSource, /"updated-hoenn":\s*\["omega-ruby",\s*"alpha-sapphire"\]/);
});

test('seed Z-A Dex entries use a dedicated region and do not overwrite kalos-central', () => {
  assert.match(seedSource, /"lumiose-city":\s*\["legends-za"\]/);
  assert.match(seedSource, /"hyperspace":\s*\["legends-za"\]/);
  assert.match(seedSource, /"kalos-central":\s*\["x",\s*"y"\]/);
  const zaBlock = seedSource.slice(seedSource.indexOf('zaRegionalIndexes'));
  assert.match(zaBlock, /regionName:\s*"legends-za"/);
  assert.doesNotMatch(zaBlock, /regionName:\s*"kalos-central"/);
  assert.doesNotMatch(seedSource, /regionalDexes:\s*\["kalos-central"\],\s*\n\s*altFormAvailableIn:\s*\["legends-za"\]/);
});
