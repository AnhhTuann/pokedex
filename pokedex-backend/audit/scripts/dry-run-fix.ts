import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

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
  const reportPath = resolve(reportIndex >= 0 ? argv[reportIndex + 1] : 'audit/reports/audit.json');
  const findingFilter = argv.indexOf('--finding');
  const findingId = findingFilter >= 0 ? argv[findingFilter + 1] : undefined;

  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as {
    findings: Array<{ id: string; classification: string; recommendation?: string; message: string }>;
  };
  const selected = report.findings.filter(
    (f) => (!findingId || f.id === findingId) && !['CORRECT', 'UNVERIFIED'].includes(f.classification),
  );
  for (const finding of selected) {
    console.log(`[DRY-RUN] ${finding.id} (${finding.classification})`);
    console.log(`  action : ${finding.recommendation ?? finding.message}`);
    console.log('  steps  : backup -> dry-run -> validate -> operator approval -> rollback plan ready');
    console.log('  note   : no database connection opened; no rows read or written');
  }
  if (!selected.length) console.log('No actionable findings matched.');
}

main();
