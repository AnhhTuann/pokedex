import test, { type TestContext } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { GAME_VERSION_OPTIONS, getRegionalDexForQuery } from '../../../pokedex-frontend/src/lib/gameVersions.js';
import { PokeApiClient } from '../src/pokeApiClient.js';
import { auditReference } from '../src/referenceAudit.js';
import { auditSchema } from '../src/schemaAudit.js';
import { auditSource, hasLegacyDamageTypeSplit, resolveAdminVersions } from '../src/sourceAudit.js';

const root = resolve('..');
const read = (path: string) => readFileSync(join(root, path), 'utf8');
const tempDir = (t: TestContext) => {
  const dir = mkdtempSync(join(tmpdir(), 'pokedex-phase9-tests-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
};

test('auditSchema validates explicit Pokemon FK targets and keeps design gaps separate', (t) => {
  const path = 'pokedex-backend/prisma/schema.prisma';
  const result = auditSchema(join(root, path));
  const references = result.map.relations.filter((r) => r.target === 'Pokemon' && r.references.length);
  assert.equal(references.length, 8);
  assert.deepEqual(new Set(references.flatMap((r) => r.references)), new Set(['id', 'pokedexNumber']));
  assert.ok(result.findings.every((f) => f.classification !== 'INCORRECT'));
  for (const id of ['SCHEMA-LEARNSET-NO-VERSION', 'SCHEMA-EVOLUTION-NO-CONDITION']) {
    assert.equal(result.findings.find((f) => f.id === id)?.classification, 'DESIGN_GAP');
  }
  assert.equal(result.findings.find((f) => f.id === 'SCHEMA-MODEL-MISSING-NATURE')?.classification, 'ACCEPTABLE_DESIGN');

  const invalid = join(tempDir(t), 'schema.prisma');
  writeFileSync(invalid, read(path).replace('references: [pokedexNumber]', 'references: [generation]'));
  const defects = auditSchema(invalid).findings.filter((f) => f.classification === 'INCORRECT');
  assert.deepEqual(defects.map((f) => f.id), ['SCHEMA-FK-INVALID-TARGET']);
  assert.match(defects[0].evidence.join(' '), /Evolution\.fromPokemon/);
});

test('auditSource ignores updater counts and recognizes generation-aware damage and CMS options', () => {
  const updater = read('pokedex-backend/src/services/updater.service.ts');
  assert.match(updater, /prisma\.pokemon\.count\(\)/);
  assert.match(updater, /hasUpdate: missing\.pokemon\.length > 0/);
  assert.match(updater, /selectMissing\(species, localPokemon\)/);
  assert.match(updater, /selectMissing\(items, new Set<number>\(\), localItems\)/);

  const { findings } = auditSource(root);
  for (const id of ['SRC-UPDATER-COUNT-CURSOR', 'SRC-DAMAGE-GEN-RULES', 'SRC-ADMIN-WALKTHROUGH-VERSIONS']) {
    assert.ok(!findings.some((f) => f.id === id), id);
  }
  assert.deepEqual(findings.find((f) => f.id === 'SRC-WALKTHROUGH-COVERAGE')?.evidence,
    ['missing versions: ultra-sun, ultra-moon, sword, shield, scarlet, violet']);

  const damage = read('pokedex-frontend/src/utils/damageCalc.ts');
  assert.equal(hasLegacyDamageTypeSplit(damage), true);
  assert.equal(hasLegacyDamageTypeSplit(damage.replace('generation <= 3', 'generation <= 2')), false);
  assert.equal(hasLegacyDamageTypeSplit(damage.replace('!LEGACY_SPECIAL_TYPES.has(move.type.toLowerCase())', 'true')), false);
});

test('CMS selector resolves the 38 shared values and supports local literals', () => {
  const admin = read('pokedex-frontend/src/pages/AdminWalkthrough.tsx');
  const games = read('pokedex-frontend/src/lib/gameVersions.ts');
  assert.match(admin, /gameOptions\.map\(g\s*=>\s*\(\s*<option[^>]*value=\{g.value\}/);
  const values = GAME_VERSION_OPTIONS.map((option) => option.value);
  assert.equal(new Set(values).size, 38);
  assert.deepEqual(resolveAdminVersions(admin, games), values);
  assert.deepEqual(resolveAdminVersions("const GAME_OPTIONS = [{ value: 'red', label: 'Red' }];", games), ['red']);
  assert.equal(resolveAdminVersions('const GAME_OPTIONS = getOptions();', games), undefined);
});

test('reference audit compares effective Z-A dexes and preserves the ORAS compatibility exception', async (t) => {
  const cacheDir = tempDir(t);
  const client = new PokeApiClient({ enabled: false, cacheDir });
  const cache = (path: string, data: unknown) => {
    const key = createHash('sha1').update(path).digest('hex');
    writeFileSync(join(cacheDir, `${key}.json`), JSON.stringify(data));
  };
  const { snapshot } = auditSource(root);
  const supportedVersions = ['legends-za', 'omega-ruby', 'alpha-sapphire', 'ruby'];
  const group = (game: string) => /sapphire|omega/.test(game) ? 'omega-ruby-alpha-sapphire' : game;
  const dexGroups: Record<string, string> = {
    'lumiose-city': 'legends-za', hyperspace: 'legends-za',
    hoenn: 'ruby-sapphire', 'updated-hoenn': 'omega-ruby-alpha-sapphire',
  };
  const list = (endpoint: string, names: string[]) => cache(`/${endpoint}?limit=3000`, {
    count: names.length,
    results: names.map((name) => ({ name, url: `https://pokeapi.co/api/v2/${endpoint}/${name}/` })),
  });
  list('version', supportedVersions);
  list('pokedex', Object.keys(dexGroups));
  for (const game of supportedVersions) cache(`/version/${game}`, { version_group: { name: group(game) } });
  for (const [dex, versionGroup] of Object.entries(dexGroups)) {
    cache(`/pokedex/${dex}`, { pokemon_entries: [], version_groups: [{ name: versionGroup }] });
  }

  assert.equal(getRegionalDexForQuery('legends-za'), 'lumiose-city');
  assert.equal(getRegionalDexForQuery('legends-za', 'hyperspace'), 'hyperspace');
  assert.deepEqual(snapshot.effectiveRegionalDexesByVersion['legends-za'], ['lumiose-city', 'hyperspace']);
  for (const game of ['omega-ruby', 'alpha-sapphire']) {
    assert.equal(getRegionalDexForQuery(game), 'hoenn');
    assert.deepEqual(snapshot.effectiveRegionalDexesByVersion[game], ['hoenn']);
  }
  const source = {
    ...snapshot,
    supportedVersions,
    effectiveRegionalDexesByVersion: Object.fromEntries(supportedVersions.map((game) =>
      [game, snapshot.effectiveRegionalDexesByVersion[game]],
    )),
  };
  const result = await auditReference(client, source, root, 0, { speciesIds: [] });
  const gameRows = new Map(result.reference.gameAudit.map((row) => [row.game, row]));
  assert.equal(gameRows.get('legends-za')?.regionalDex, 'lumiose-city|hyperspace');
  assert.equal(gameRows.get('legends-za')?.dexVersionGroupOk, true);
  assert.equal(gameRows.get('omega-ruby')?.status, 'UNVERIFIED');
  assert.equal(gameRows.get('alpha-sapphire')?.status, 'UNVERIFIED');
  const mismatch = result.findings.find((f) => f.id === 'API-DEX-VERSION-MISMATCH');
  assert.equal(mismatch?.classification, 'INCORRECT');
  assert.deepEqual(mismatch?.evidence, ['ruby (vg=ruby) mapped=hoenn; apiCandidates=none']);
  assert.equal(result.findings.find((f) => f.id === 'API-DEX-ORAS-LEGACY-COMPATIBILITY')?.classification, 'ACCEPTABLE_DESIGN');
  assert.equal(result.findings.find((f) => f.id === 'API-DEX-ORAS-ROWS-UNVERIFIED')?.classification, 'UNVERIFIED');
});

test('CLI leaves DB disconnected without explicit opt-in and rejects the application URL fallback', (t) => {
  const out = tempDir(t);
  const run = (args: string[], env: NodeJS.ProcessEnv) => {
    const inherited = { ...process.env };
    delete inherited.DATABASE_URL;
    delete inherited.AUDIT_DATABASE_URL;
    return spawnSync(process.execPath, ['--import', 'tsx', 'audit/src/cli.ts', ...args], {
      env: { ...inherited, ...env },
      encoding: 'utf8',
      timeout: 15000,
    });
  };
  const offline = run(['--offline', '--out', out], { AUDIT_DATABASE_URL: 'postgresql://unused.invalid/unused' });
  assert.equal(offline.status, 0, offline.stderr);
  const report = JSON.parse(readFileSync(join(out, 'audit.json'), 'utf8'));
  assert.equal(report.db.connected, false);
  assert.equal(report.coverage.scopes.database.connection, 'BLOCKED');
  assert.equal(report.coverage.checked, 0);
  const markdown = readFileSync(join(out, 'report.md'), 'utf8');
  assert.match(markdown, /\| DESIGN_GAP \| ACCEPTABLE_DESIGN \|/);
  assert.match(markdown, /## 6. Đề xuất thiết kế cần xem xét[\s\S]*SCHEMA-LEARNSET-NO-VERSION/);
  const dryRun = spawnSync(process.execPath,
    ['--import', 'tsx', 'audit/scripts/dry-run-fix.ts', '--report', join(out, 'audit.json')],
    { encoding: 'utf8', timeout: 15000 });
  assert.equal(dryRun.status, 0, dryRun.stderr);
  assert.deepEqual(dryRun.stdout.match(/\[DRY-RUN\] .*/g), ['[DRY-RUN] SRC-WALKTHROUGH-COVERAGE (MISSING)']);

  const missing = run(['--db', '--out', out], { DATABASE_URL: 'postgresql://unused.invalid/unused' });
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /--db requires AUDIT_DATABASE_URL/);
  assert.doesNotMatch(missing.stderr, /postgresql:\/\//);
});
