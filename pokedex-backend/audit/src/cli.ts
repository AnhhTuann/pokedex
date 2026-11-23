import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AuditOutput } from './types.js';
import { auditSchema } from './schemaAudit.js';
import { auditSource } from './sourceAudit.js';
import { PokeApiClient } from './pokeApiClient.js';
import { auditReference } from './referenceAudit.js';
import { auditDatabase, UNVERIFIED_DB_AREAS } from './dbAudit.js';
import {
  SOURCE_RELIABILITY,
  buildCoverage,
  buildFixPlan,
  renderMarkdown,
  toCsv,
  toEvidenceCsv,
  toGameCoverageCsv,
  toManualReviewCsv,
  toSpeciesCoverageCsv,
  toUnverifiedCsv,
} from './report.js';

export interface CliArgs {
  api: boolean;
  db: boolean;
  offline: boolean;
  schemaOnly: boolean;
  full: boolean;
  resume: boolean;
  limit?: number;
  concurrency: number;
  out: string;
}

export function parseArgs(argv: string[]): CliArgs {
  const has = (flag: string) => argv.includes(flag);
  const valueAfter = (flag: string): string | undefined => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : undefined;
  };
  const offline = has('--offline');
  const schemaOnly = has('--schema-only');
  const limitRaw = valueAfter('--limit') ?? valueAfter('--sample');
  const limit = limitRaw === undefined ? undefined : Math.max(1, Math.min(1025, Number(limitRaw) || 38));
  return {
    api: !offline && !schemaOnly,
    db: has('--db'),
    offline,
    schemaOnly,
    full: has('--full'),
    resume: has('--resume'),
    limit,
    concurrency: Math.max(1, Math.min(12, Number(valueAfter('--concurrency')) || 6)),
    out: valueAfter('--out') ?? 'audit/reports/current',
  };
}

export function resolveAuditDbUrl(
  args: Pick<CliArgs, 'db' | 'offline' | 'schemaOnly'>,
  env: NodeJS.ProcessEnv,
): string | undefined {
  if (!args.db) return undefined;
  if (args.offline || args.schemaOnly) {
    throw new Error('--db cannot be combined with --offline or --schema-only');
  }
  const url = env.AUDIT_DATABASE_URL;
  if (!url) {
    throw new Error('--db requires AUDIT_DATABASE_URL; refusing DATABASE_URL fallback');
  }
  return url;
}

export function redactSecrets(message: string): string {
  return message
    .replace(/(postgres(?:ql)?:\/\/[^\s'"<>]+)/gi, '[REDACTED_DB_URL]')
    .replace(/(AUDIT_DATABASE_URL\s*=\s*)[^\s'"]+/gi, '$1[REDACTED]')
    .replace(/(DATABASE_URL\s*=\s*)[^\s'"]+/gi, '$1[REDACTED]');
}

const stableStringify = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => item !== undefined)
      .sort(([a], [b]) => a.localeCompare(b));
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
};

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const dbUrl = resolveAuditDbUrl(args, process.env); // before any network or DB work
  const cwd = process.cwd();
  const root = existsSync(join(cwd, 'pokedex-frontend')) ? cwd : resolve(cwd, '..');
  const outDir = resolve(root, 'pokedex-backend', args.out);
  mkdirSync(outDir, { recursive: true });

  const schema = auditSchema(join(root, 'pokedex-backend/prisma/schema.prisma'));
  const sourceResult = args.schemaOnly ? null : auditSource(root);
  const source = sourceResult?.snapshot ?? {
    supportedVersions: [],
    regionalDexByVersion: {},
    walkthrough: { records: 0, versions: [], languages: [], duplicates: 0 },
    images: { total: 0, zeroByte: 0, byDir: {} },
    sourcePaths: [],
  };

  const modes: string[] = ['schema', args.schemaOnly ? 'source:off' : 'source'];
  let reference = undefined as Awaited<ReturnType<typeof auditReference>>['reference'] | undefined;
  let referenceFindings: Awaited<ReturnType<typeof auditReference>>['findings'] = [];
  if (args.api || (args.offline && args.full)) {
    const client = new PokeApiClient({ enabled: args.api, concurrency: args.concurrency });
    const result = await auditReference(client, source, root, args.limit ?? 38, {
      allSpecies: args.full && args.limit === undefined,
      resume: args.resume,
      concurrency: args.concurrency,
      onProgress: (done, total) => {
        if (done % 25 === 0 || done === total) {
          process.stderr.write(`audit progress ${done}/${total}\n`);
        }
      },
    });
    reference = result.reference;
    referenceFindings = result.findings;
    modes.push(args.api ? 'pokeapi' : 'pokeapi:cache-only');
    if (args.full) modes.push(args.resume ? 'full:resume' : 'full');
  }

  let dbResult;
  try {
    dbResult = await auditDatabase(dbUrl, source, reference);
  } catch (error) {
    throw new Error(redactSecrets(error instanceof Error ? error.message : String(error)));
  }
  modes.push(dbResult.db.readOnlyEnforced ? 'db:read-only' : 'db:offline');

  const findings = [
    ...schema.findings,
    ...(sourceResult?.findings ?? []),
    ...referenceFindings,
    ...dbResult.findings,
  ];
  const coverage = buildCoverage(findings, reference, source, dbResult.db);
  const baseRef = `${execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()}@${execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()}`;

  const output: AuditOutput = {
    generatedAt: new Date().toISOString(),
    baseRef,
    modes,
    findings,
    coverage,
    reference,
    schema: {
      models: [...schema.map.models.keys()],
      relations: schema.map.relations.map((r) => ({
        model: r.model,
        field: r.field,
        target: r.target,
        references: r.references,
        line: r.line,
      })),
    },
    source,
    db: dbResult.db,
    sourceReliability: SOURCE_RELIABILITY.map((item) => ({ ...item })),
  };

  const fixPlan = buildFixPlan(findings);
  writeFileSync(join(outDir, 'audit.json'), `${JSON.stringify(output, null, 2)}\n`);
  writeFileSync(join(outDir, 'coverage.json'), `${stableStringify({ scopes: coverage.scopes, detail: coverage.detail, byClassification: coverage.byClassification })}\n`);
  writeFileSync(join(outDir, 'findings.csv'), `${toCsv(findings)}\n`);
  writeFileSync(join(outDir, 'species-coverage.csv'), `${toSpeciesCoverageCsv(reference?.speciesCoverage ?? [])}\n`);
  writeFileSync(join(outDir, 'game-coverage.csv'), `${toGameCoverageCsv(reference?.gameAudit ?? [])}\n`);
  writeFileSync(join(outDir, 'evidence.csv'), `${toEvidenceCsv(findings)}\n`);
  writeFileSync(join(outDir, 'manual-review.csv'), `${toManualReviewCsv(findings)}\n`);
  writeFileSync(join(outDir, 'unverified.csv'), `${toUnverifiedCsv(findings)}\n`);
  writeFileSync(join(outDir, 'fix-plan.json'), `${stableStringify(fixPlan)}\n`);
  writeFileSync(join(outDir, 'report.md'), renderMarkdown(output, fixPlan));

  if (args.full && reference) {
    const fullCatalog = {
      schemaVersion: 1,
      catalogKey: reference.checkpoint.key,
      counts: reference.counts,
      species: reference.speciesSample,
      speciesCoverage: reference.speciesCoverage,
      forms: reference.formAudit,
      evolution: reference.evolutionSample,
      games: reference.versions,
      gameAudit: reference.gameAudit,
      catalogDetails: reference.catalogDetails,
      dexes: reference.pokedexes.map(({ name, entryCount, versionGroups }) => ({ name, entryCount, versionGroups })),
      findings,
      sourceReliability: SOURCE_RELIABILITY.map((item) => ({ ...item })),
      checkpoint: reference.checkpoint,
      apiErrors: reference.apiErrors,
    };
    writeFileSync(join(outDir, 'full-catalog.json'), `${stableStringify(fullCatalog)}\n`);
  }

  console.log(`base=${baseRef} modes=${modes.join(',')}`);
  console.log(
    `findings=${findings.length} checked=${coverage.checked} unchecked=${coverage.unchecked} unverified=${coverage.unverified}`,
  );
  console.log(`byClassification=${JSON.stringify(coverage.byClassification)}`);
  console.log(`unverifiedDbAreas=${UNVERIFIED_DB_AREAS.length}`);
  console.log(`report=${join(outDir, 'report.md')}`);
}

const invokedDirectly = process.argv[1]
  ? resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (invokedDirectly) {
  main().catch((error) => {
    console.error(`audit failed: ${redactSecrets(error instanceof Error ? error.message : String(error))}`);
    process.exitCode = 1;
  });
}
