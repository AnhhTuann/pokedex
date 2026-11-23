import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { AuditOutput } from './types.js';
import { auditSchema } from './schemaAudit.js';
import { auditSource } from './sourceAudit.js';
import { PokeApiClient } from './pokeApiClient.js';
import { auditReference } from './referenceAudit.js';
import { auditDatabase } from './dbAudit.js';
import { buildCoverage, buildFixPlan, renderMarkdown, toCsv } from './report.js';

interface CliArgs {
  api: boolean;
  db: boolean;
  schemaOnly: boolean;
  sample: number;
  out: string;
}

export function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    api: !argv.includes('--offline') && !argv.includes('--schema-only'),
    db: argv.includes('--db'),
    schemaOnly: argv.includes('--schema-only'),
    sample: 38,
    out: 'audit/reports',
  };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--sample') args.sample = Number(argv[i + 1]) || 38;
    if (argv[i] === '--out') args.out = argv[i + 1] ?? args.out;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cwd = process.cwd();
  const root = existsSync(join(cwd, 'pokedex-frontend')) ? cwd : resolve(cwd, '..');
  const outDir = resolve(root, 'pokedex-backend', args.out);
  mkdirSync(outDir, { recursive: true });

  const schema = auditSchema(join(root, 'pokedex-backend/prisma/schema.prisma'));
  const sourceResult = args.schemaOnly ? null : auditSource(root);
  let source = sourceResult?.snapshot as ReturnType<typeof auditSource>['snapshot'] | null;
  if (!source) {
    source = {
      supportedVersions: [],
      regionalDexByVersion: {},
      walkthrough: { records: 0, versions: [], languages: [], duplicates: 0 },
      images: { total: 0, zeroByte: 0, byDir: {} },
      sourcePaths: [],
    };
  }

  const modes: string[] = ['schema', args.schemaOnly ? 'source:off' : 'source'];
  let reference = undefined as Awaited<ReturnType<typeof auditReference>>['reference'] | undefined;
  let referenceFindings: Awaited<ReturnType<typeof auditReference>>['findings'] = [];
  if (args.api && !args.schemaOnly) {
    const client = new PokeApiClient();
    const result = await auditReference(client, source, root, args.sample);
    reference = result.reference;
    referenceFindings = result.findings;
    modes.push('pokeapi');
  }

  const dbUrl = process.env.AUDIT_DATABASE_URL ?? (args.db ? process.env.DATABASE_URL : undefined);
  const dbResult = await auditDatabase(dbUrl, source, reference);
  modes.push(dbResult.db.connected ? 'db:read-only' : 'db:offline');

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
  };

  const fixPlan = buildFixPlan(findings);
  writeFileSync(join(outDir, 'audit.json'), `${JSON.stringify(output, null, 2)}\n`);
  writeFileSync(join(outDir, 'findings.csv'), `${toCsv(findings)}\n`);
  writeFileSync(join(outDir, 'fix-plan.json'), `${JSON.stringify(fixPlan, null, 2)}\n`);
  writeFileSync(join(outDir, 'report.md'), renderMarkdown(output, fixPlan));

  console.log(`base=${baseRef} modes=${modes.join(',')}`);
  console.log(
    `findings=${findings.length} checked=${coverage.checked} unchecked=${coverage.unchecked} unverified=${coverage.unverified}`,
  );
  console.log(`byClassification=${JSON.stringify(coverage.byClassification)}`);
  console.log(`report=${join(outDir, 'report.md')}`);
}

main().catch((error) => {
  console.error(`audit failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
