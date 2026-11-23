import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parsePrismaSchema } from '../src/schemaAudit.js';
import { parseRegionalDexMap, parseSupportedVersions } from '../src/sourceAudit.js';
import { parseGenerationMap, parseSeedGenerationRanges } from '../src/referenceAudit.js';
import { buildCoverage, buildFixPlan } from '../src/report.js';
import { mapWithConcurrency, PokeApiClient } from '../src/pokeApiClient.js';
import { auditDatabase, AUDIT_CHECK_SQL, UNVERIFIED_DB_AREAS } from '../src/dbAudit.js';
import { catalogKey, loadCheckpoint, saveCheckpoint } from '../src/checkpoint.js';
import { parseArgs, redactSecrets, resolveAuditDbUrl } from '../src/cli.js';
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

test('schema parser captures mixed Pokemon FK targets without calling them invalid', () => {
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
  assert.deepEqual(parseRegionalDexMap(gameVersions), { red: 'kanto', 'legends-za': 'kalos-central' });
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

test('fix plan excludes non-actionable findings and uses safe rollback templates', () => {
  const plan = buildFixPlan([
    finding('SRC-WALKTHROUGH-COVERAGE', 'MISSING'),
    finding('SCHEMA-FK-INCONSISTENT', 'INCORRECT'),
    finding('DB-QUALITY-ISSUES', 'INCORRECT'),
    finding('DB-QUALITY-CLEAN', 'CORRECT'),
    finding('DB-UNVERIFIED-DUPLICATES', 'UNVERIFIED'),
  ]);
  assert.ok(plan.some((p) => p.findingId === 'SCHEMA-FK-INCONSISTENT' && p.order === 1));
  assert.ok(plan.some((p) => p.findingId === 'DB-QUALITY-ISSUES' && p.order === 1));
  assert.ok(plan.every((p) => p.findingId !== 'DB-QUALITY-CLEAN'));
  assert.ok(plan.every((p) => p.dryRunCommand.includes(p.findingId)));
  assert.ok(plan.every((p) => !p.rollbackCommand.includes('psql')));
  assert.ok(plan.every((p) => p.rollbackCommand.includes('KHÔNG replay data-only') || p.rollbackCommand.includes('git revert')));
  assert.ok(plan.every((p) => !p.backupCommand.includes('--data-only')));
  const dbFix = plan.find((p) => p.findingId === 'DB-QUALITY-ISSUES');
  assert.match(dbFix?.rollbackCommand ?? '', /DB MỚI/);
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
    {
      connected: false,
      readOnlyEnforced: false,
      statementTimeoutMs: 30_000,
      tableCounts: {},
      checks: {},
      notes: [],
    },
  );
  assert.equal(coverage.unverified, 1);
  assert.equal(coverage.detail.supportedGames, 1);
  assert.ok(coverage.unchecked >= 15);
});

test('parseArgs separates offline, schema-only, db and full modes', () => {
  const offline = parseArgs(['--offline']);
  assert.equal(offline.api, false);
  assert.equal(offline.db, false);
  assert.equal(offline.offline, true);

  const schemaOnly = parseArgs(['--schema-only']);
  assert.equal(schemaOnly.api, false);
  assert.equal(schemaOnly.schemaOnly, true);

  const full = parseArgs(['--full', '--resume', '--limit', '3', '--concurrency', '4', '--out', 'x']);
  assert.equal(full.full, true);
  assert.equal(full.resume, true);
  assert.equal(full.limit, 3);
  assert.equal(full.concurrency, 4);
  assert.equal(full.out, 'x');
  assert.equal(parseArgs(['--sample', '38']).limit, 38);
});

test('DB URL resolver never connects without --db and never falls back to DATABASE_URL', () => {
  assert.equal(resolveAuditDbUrl({ db: false, offline: false, schemaOnly: false }, {
    AUDIT_DATABASE_URL: 'postgresql://should-not-be-used',
  }), undefined);

  assert.throws(
    () => resolveAuditDbUrl({ db: true, offline: false, schemaOnly: false }, {
      DATABASE_URL: 'postgresql://production',
    }),
    /AUDIT_DATABASE_URL/,
  );
  assert.throws(
    () => resolveAuditDbUrl({ db: true, offline: true, schemaOnly: false }, {
      AUDIT_DATABASE_URL: 'postgresql://staging',
    }),
    /--offline/,
  );
  assert.equal(
    resolveAuditDbUrl({ db: true, offline: false, schemaOnly: false }, {
      AUDIT_DATABASE_URL: 'postgresql://staging',
    }),
    'postgresql://staging',
  );
});

test('secret redaction removes DB URLs and env assignments', () => {
  const message = 'connect postgresql://user:secret@host:5432/db failed; DATABASE_URL=postgresql://x:y@z AUDIT_DATABASE_URL=abc';
  const redacted = redactSecrets(message);
  assert.ok(!redacted.includes('secret'));
  assert.ok(!redacted.includes('postgresql://'));
  assert.ok(redacted.includes('[REDACTED_DB_URL]'));
  assert.ok(redacted.includes('DATABASE_URL=[REDACTED]'));
});

test('disabled API client reads cache but never calls fetch', async () => {
  const cacheDir = '/tmp/opencode/phase8-audit-test-cache';
  mkdirSync(cacheDir, { recursive: true });
  const key = createHash('sha1').update('/version').digest('hex');
  writeFileSync(join(cacheDir, `${key}.json`), JSON.stringify([{ name: 'red' }]));

  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    throw new Error('network must not be used');
  }) as typeof fetch;
  try {
    const client = new PokeApiClient({ enabled: false, cacheDir });
    const cached = await client.get('/version');
    assert.equal(cached.ok, true);
    assert.equal(cached.fromCache, true);
    const missing = await client.get('/never-cached');
    assert.equal(missing.ok, false);
    assert.match(missing.error ?? '', /API mode disabled/);
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('mapWithConcurrency respects the limit and preserves order', async () => {
  let active = 0;
  let maxActive = 0;
  const result = await mapWithConcurrency([1, 2, 3, 4, 5], 2, async (item) => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await Promise.resolve();
    active -= 1;
    return item * 2;
  });
  assert.deepEqual(result, [2, 4, 6, 8, 10]);
  assert.equal(maxActive, 2);
});

test('checkpoint load/save is resume-aware and key-scoped', () => {
  const path = '/tmp/opencode/phase8-checkpoint-test.json';
  const key = catalogKey([1, 2, 3]);
  const state = loadCheckpoint(path, key, false);
  state.completedIds = [1];
  state.records['1'] = {} as never;
  saveCheckpoint(path, state);
  const resumed = loadCheckpoint(path, key, true);
  assert.deepEqual(resumed.completedIds, [1]);
  assert.ok(resumed.records['1']);
  assert.deepEqual(loadCheckpoint(path, catalogKey([1, 2, 4]), true).completedIds, []);
  assert.deepEqual(loadCheckpoint(path, key, false).completedIds, []);
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
  assert.equal(db.readOnlyEnforced, false);
  assert.equal(findings.length, UNVERIFIED_DB_AREAS.length);
  assert.ok(findings.every((f) => f.classification === 'UNVERIFIED' && f.runtimeRequired));
  assert.ok(findings.every((f) => !f.evidence.join(' ').includes('DATABASE_URL /')));
  assert.ok(findings.every((f) => f.evidence.join(' ').includes('AUDIT_DATABASE_URL')));
});

test('all DB aggregate SQL is SELECT-only and bounded where rows are returned', () => {
  for (const sql of Object.values(AUDIT_CHECK_SQL)) {
    assert.match(sql, /^\s*SELECT\b/i);
    assert.doesNotMatch(sql, /\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|MERGE)\b/i);
  }
  const dbAuditSource = readFileSync(join(process.cwd(), 'audit/src/dbAudit.ts'), 'utf8');
  assert.equal(dbAuditSource.includes('SET TRANSACTION READ ONLY'), true);
  assert.equal(dbAuditSource.includes('statement_timeout'), true);
});
