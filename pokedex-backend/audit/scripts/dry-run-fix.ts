import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildFixPlan } from '../src/report.js';
import type { AuditOutput } from '../src/types.js';

/**
 * Prints proposed remediation steps for operator review.
 * This script never opens a database connection and never executes SQL.
 * Passing --apply deliberately fails: production correction is out of scope.
 */
function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--apply')) {
    console.error('Refusing to apply fixes: this audit phase is read-only.');
    process.exitCode = 2;
    return;
  }
  const reportIndex = argv.indexOf('--report');
  const reportPath = resolve(reportIndex >= 0 ? argv[reportIndex + 1] : 'audit/reports/current/audit.json');
  const findingFilter = argv.indexOf('--finding');
  const findingId = findingFilter >= 0 ? argv[findingFilter + 1] : undefined;

  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as AuditOutput;
  const selected = buildFixPlan(report.findings.filter((finding) => !findingId || finding.id === findingId));
  const classifications = new Map(report.findings.map((finding) => [finding.id, finding.classification]));
  for (const fix of selected) {
    console.log(`[DRY-RUN] ${fix.findingId} (${classifications.get(fix.findingId)})`);
    console.log(`  action : ${fix.action}`);
    console.log('  steps  : backup -> dry-run -> validate -> operator approval -> rollback plan ready');
    console.log('  note   : no database connection opened; no rows read or written');
  }
  if (!selected.length) console.log('No actionable findings matched.');
}

main();
