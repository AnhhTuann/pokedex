import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePrismaSchema } from '../src/schemaAudit.js';
import { parseRegionalDexMap, parseSupportedVersions } from '../src/sourceAudit.js';
import { parseGenerationMap, parseSeedGenerationRanges } from '../src/referenceAudit.js';
import { buildCoverage, buildFixPlan } from '../src/report.js';
import { PokeApiClient } from '../src/pokeApiClient.js';
import { auditDatabase } from '../src/dbAudit.js';
import type { Finding } from '../src/types.js';

const schema = `
model Pokemon {
  id            Int    @id @default(autoincrement())
  pokedexNumber Int    @unique
}
model TeamSlot {
  pokemonId Int
  pokemon   Pokemon @relation(fields: [pokemonId], references: [pokedexNumber])
}
model DexEntry {
  pokemonId Int
  pokemon   Pokemon @relation(fields: [pokemonId], references: [id])
}
`;

test('schema parser captures mixed Pokemon FK targets', () => {
  const map = parsePrismaSchema(schema);
  assert.equal(map.models.size, 3);
  const targets = map.relations.map((r) => r.references.join(','));
  assert.ok(targets.includes('pokedexNumber'));
  assert.ok(targets.includes('id'));
});

const gameVersions = `
export const GENERATION_VERSIONS = [
  { gen: "Generation I", rows: [{ type: 'pair', games: [{ name: "red", label: "Red" }, { name: "blue", label: "Blue" }] }] },
  { gen: "Generation IX", rows: [{ type: 'single', games: [{ name: "legends-za", label: "Z-A" }] }] },
];
export const GAME_TO_REGIONAL_DEX = { red: 'kanto', 'legends-za': 'kalos-central' };
export function getGameGeneration(versionName: string): number {
  const genMap: Record<string, number> = { red: 1, blue: 1, 'legends-za': 9 };
  return genMap[nameLower] || 9;
}
`;

test('source parsers extract versions, dex map and generation map', () => {
  assert.deepEqual(parseSupportedVersions(gameVersions), ['red', 'blue', 'legends-za']);
  assert.deepEqual(parseRegionalDexMap(gameVersions), {
    red: 'kanto',
    'legends-za': 'kalos-central',
  });
  assert.equal(parseGenerationMap(gameVersions)['legends-za'], 9);
});

test('seed generation ranges parse from guard clauses', () => {
  const ranges = parseSeedGenerationRanges('if (id <= 151) return 1;\nif (id <= 251) return 2;\nreturn 9;');
  assert.deepEqual(ranges, [
    { max: 151, gen: 1 },
    { max: 251, gen: 2 },
  ]);
});

const finding = (id: string, classification: Finding['classification']): Finding => ({
  id,
  phase: 'INVENTORY',
  area: 'relations',
  entity: 'x',
  classification,
  severity: 'medium',
  message: id,
  evidence: [],
  sources: [],
});

test('fix plan excludes non-actionable findings and orders broken relationships first', () => {
  const plan = buildFixPlan([
    finding('SRC-WALKTHROUGH-COVERAGE', 'MISSING'),
    finding('SCHEMA-FK-INCONSISTENT', 'INCORRECT'),
    finding('DB-QUALITY-CLEAN', 'CORRECT'),
    finding('DB-UNVERIFIED-RECORD-COUNTS', 'UNVERIFIED'),
  ]);
  assert.equal(plan[0].findingId, 'SCHEMA-FK-INCONSISTENT');
  assert.equal(plan[0].order, 1);
  assert.ok(plan.every((p) => p.findingId !== 'DB-QUALITY-CLEAN'));
  assert.ok(plan.every((p) => p.dryRunCommand.includes('dry-run')));
});

test('coverage reports checked, unchecked and unverified counts', () => {
  const coverage = buildCoverage(
    [finding('A', 'UNVERIFIED'), finding('B', 'CORRECT')],
    undefined,
    {
      supportedVersions: ['red'],
      regionalDexByVersion: {},
      walkthrough: { records: 1, versions: [], languages: [], duplicates: 0 },
      images: { total: 2, zeroByte: 0, byDir: {} },
      sourcePaths: [],
    },
    { connected: false, tableCounts: {}, checks: {}, notes: [] },
  );
  assert.equal(coverage.unverified, 1);
  assert.equal(coverage.detail.supportedGames, 1);
  assert.ok(coverage.unchecked >= 15);
});

test('disabled API client never performs network calls', async () => {
  const client = new PokeApiClient({ enabled: false, cacheDir: '/tmp/opencode/data-audit-test-cache' });
  const result = await client.get('/version');
  assert.equal(result.ok, false);
  assert.equal(result.data, null);
});

test('DB audit without connection reports unverified areas instead of guessing', async () => {
  const { findings, db } = await auditDatabase(undefined, {
    supportedVersions: [],
    regionalDexByVersion: {},
    walkthrough: { records: 0, versions: [], languages: [], duplicates: 0 },
    images: { total: 0, zeroByte: 0, byDir: {} },
    sourcePaths: [],
  });
  assert.equal(db.connected, false);
  assert.equal(findings.length, 7);
  assert.ok(findings.every((f) => f.classification === 'UNVERIFIED' && f.runtimeRequired));
});
