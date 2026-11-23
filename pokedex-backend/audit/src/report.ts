import type { AuditOutput, Coverage, Finding, FixPlan } from './types.js';
import type { ReferenceSnapshot } from './referenceAudit.js';
import type { DbSnapshot } from './dbAudit.js';
import type { SourceSnapshot } from './sourceAudit.js';

const PRIORITY: Array<[RegExp, number, string]> = [
  [/FK-INCONSISTENT|ORPHAN|DB-QUALITY-ISSUES/, 1, 'Broken relationships'],
  [/INCORRECT-ID|GENERATION-RANGE|VERSION-GENERATION|POKEMON-ID/, 2, 'Incorrect Pokemon IDs'],
  [/MASTER|DESCRIPTION|CHART|SEED|UPDATER/, 3, 'Incorrect master data'],
  [/GAME|VERSION|DEX|LEARNSET|DAMAGE/, 4, 'Game-specific data'],
  [/MOVE|ABILITY|ITEM/, 5, 'Missing moves/abilities/items'],
  [/ENCOUNTER|LOCATION/, 6, 'Encounters and locations'],
  [/IMAGE/, 7, 'Missing or broken images'],
  [/WALKTHROUGH/, 8, 'Walkthrough completeness'],
];

export function buildFixPlan(findings: Finding[]): FixPlan[] {
  return findings
    .filter((f) => f.classification !== 'CORRECT' && f.classification !== 'UNVERIFIED')
    .map((finding) => {
      const match = PRIORITY.find(([pattern]) => pattern.test(finding.id + finding.area));
      const order = match?.[1] ?? 9;
      const area = match?.[2] ?? 'Other data quality work';
      return {
        order,
        area,
        findingId: finding.id,
        action: finding.recommendation ?? finding.message,
        dryRunCommand: 'npm run audit:dry-run -- --finding <ID> --report <REPORT_JSON>',
        validationCommand: 'npm run audit -- --offline --schema-only && npm test && npm run build',
        backupCommand: 'pg_dump "$AUDIT_DATABASE_URL" --schema-only -f backup-schema.sql && pg_dump "$AUDIT_DATABASE_URL" --data-only -f backup-data.sql',
        rollbackCommand: 'psql "$AUDIT_DATABASE_URL" -f backup-data.sql  # operator-reviewed only',
        runtimeRequired: Boolean(finding.runtimeRequired),
      };
    })
    .sort((a, b) => a.order - b.order || a.findingId.localeCompare(b.findingId));
}

export function buildCoverage(
  findings: Finding[],
  reference: ReferenceSnapshot | undefined,
  source: SourceSnapshot,
  db: DbSnapshot,
): Coverage {
  const detail: Record<string, number> = {};
  const byClassification: Record<string, number> = {};
  detail.findingsTotal = findings.length;
  for (const finding of findings) {
    byClassification[finding.classification] = (byClassification[finding.classification] ?? 0) + 1;
  }
  detail.supportedGames = source.supportedVersions.length;
  detail.gamesCheckedAgainstApi = reference?.versions.length ?? 0;
  detail.regionalDexesChecked = reference?.pokedexes.length ?? 0;
  detail.speciesSampled = reference?.speciesSample.length ?? 0;
  detail.speciesCatalogTotal = reference?.totals['pokemon-species'] ?? 0;
  detail.moveCatalogTotal = reference?.totals.move ?? 0;
  detail.abilityCatalogTotal = reference?.totals.ability ?? 0;
  detail.itemCatalogTotal = reference?.totals.item ?? 0;
  detail.locationCatalogTotal = reference?.totals.location ?? 0;
  detail.natureCatalogTotal = reference?.totals.nature ?? 0;
  detail.typeCatalogTotal = reference?.totals.type ?? 0;
  detail.encounterSpeciesSampled = reference?.encounterSample.length ?? 0;
  detail.learnsetSpeciesSampled = reference?.learnsetSample.length ?? 0;
  detail.masterRecordsCompared = reference?.pokemonDetails.length ?? 0;
  detail.availabilityGamesSampled = reference?.availabilitySample.length ?? 0;
  detail.dbTablesChecked = Object.keys(db.tableCounts).length;
  detail.assetFilesChecked = source.images.total;
  detail.walkthroughRecordsParsed = source.walkthrough.records;
  detail.walkthroughGamesCovered = source.walkthrough.versions.length;

  const unverified = findings.filter((f) => f.classification === 'UNVERIFIED').length;
  const checked =
    detail.gamesCheckedAgainstApi +
    detail.regionalDexesChecked +
    detail.speciesSampled +
    detail.encounterSpeciesSampled +
    detail.learnsetSpeciesSampled +
    detail.masterRecordsCompared +
    detail.availabilityGamesSampled +
    detail.dbTablesChecked +
    9; // generation checks
  const unchecked =
    Math.max(0, detail.speciesCatalogTotal - detail.speciesSampled) +
    Math.max(0, detail.supportedGames - detail.gamesCheckedAgainstApi) +
    (db.connected ? 0 : 15);
  return { checked, unchecked, unverified, detail, byClassification };
}

export function renderMarkdown(output: AuditOutput, fixPlan: FixPlan[]): string {
  const { coverage, findings, reference, schema, source, db } = output;
  const referenceData = reference as ReferenceSnapshot | undefined;
  const sourceSnapshot = source as SourceSnapshot | undefined;
  const apiErrors = referenceData?.apiErrors ?? [];
  const sourcePaths = sourceSnapshot?.sourcePaths ?? [];
  const lines: string[] = [];
  lines.push('# Elite PokéDex — Báo cáo kiểm toán dữ liệu');
  lines.push('');
  lines.push(`- Sinh lúc: ${output.generatedAt}`);
  lines.push(`- Base ref: \`${output.baseRef}\``);
  lines.push(`- Chế độ: ${output.modes.join(', ') || 'offline'}`);
  lines.push(
    `- Phạm vi: **đã kiểm tra ${coverage.checked}**, **chưa kiểm tra ${coverage.unchecked}**, **chưa xác minh ${coverage.unverified}**.`,
  );
  lines.push('');
  lines.push('> Dữ liệu trong code/schema **không** phải bằng chứng về nội dung database thật. Mọi mục `UNVERIFIED` cần chạy lại với DB staging/backup an toàn.');
  lines.push('');
  lines.push('## 1. Tổng quan database');
  lines.push('');
  lines.push('| Model | Số record (nếu có DB) |');
  lines.push('|---|---:|');
  const tableCounts = (db?.tableCounts ?? {}) as Record<string, number>;
  for (const [table, count] of Object.entries(tableCounts)) lines.push(`| ${table} | ${count} |`);
  if (!Object.keys(tableCounts).length) lines.push('| _không có kết nối DB_ | — |');
  lines.push('');
  lines.push('## 2. Coverage theo Generation');
  lines.push('');
  lines.push('| Gen | Loài (PokéAPI) | Move | Version groups |');
  lines.push('|---:|---:|---:|---:|');
  for (const gen of (reference as ReferenceSnapshot | undefined)?.generations ?? []) {
    lines.push(`| ${gen.generation} | ${gen.speciesIds.length} | ${gen.moveCount} | ${gen.versionGroups.length} |`);
  }
  lines.push('');
  lines.push('## 3. Coverage theo Game');
  lines.push('');
  lines.push(`- Game frontend hỗ trợ: **${coverage.detail.supportedGames}**`);
  lines.push(`- Game đối chiếu được với PokéAPI: **${coverage.detail.gamesCheckedAgainstApi}**`);
  lines.push(`- Regional dex đã kiểm tra: **${coverage.detail.regionalDexesChecked}**`);
  lines.push(`- Game có walkthrough: **${coverage.detail.walkthroughGamesCovered}** / ${coverage.detail.supportedGames}`);
  lines.push('');
  if (referenceData?.versions?.length) {
    lines.push('| Game | Gen (API) | Regional dex | Dex version-group | Walkthrough |');
    lines.push('|---|---:|---|---|---|');
    for (const version of referenceData.versions) {
      const dex = sourceSnapshot?.regionalDexByVersion[version.name] ?? '—';
      const dexInfo = referenceData.pokedexes.find((d) => d.name === dex);
      const dexOk = dexInfo ? (dexInfo.versionGroups.includes(version.versionGroup) ? 'OK' : '⚠ mismatch') : '⚠ unverified';
      const hasWalkthrough = sourceSnapshot?.walkthrough.versions.includes(version.name) ? 'có' : '**thiếu**';
      lines.push(`| ${version.name} | ${version.generation || '?'} | ${dex} | ${dexOk} | ${hasWalkthrough} |`);
    }
    lines.push('');
  }
  lines.push('## 4. Data quality theo model');
  lines.push('');
  lines.push('| Area | CORRECT | MISSING | INCORRECT | DUPLICATE | UNSUPPORTED | UNVERIFIED |');
  lines.push('|---|---:|---:|---:|---:|---:|---:|');
  const areas = [...new Set(findings.map((f) => f.area))].sort();
  for (const area of areas) {
    const cells = ['CORRECT', 'MISSING', 'INCORRECT', 'DUPLICATE', 'UNSUPPORTED', 'UNVERIFIED'].map(
      (cls) => findings.filter((f) => f.area === area && f.classification === cls).length,
    );
    lines.push(`| ${area} | ${cells.join(' | ')} |`);
  }
  lines.push('');
  lines.push('## 5. Danh sách phát hiện có bằng chứng');
  lines.push('');
  for (const finding of findings) {
    lines.push(`### ${finding.id} — ${finding.classification} (${finding.severity})`);
    lines.push('');
    lines.push(`- Khu vực: ${finding.area} / ${finding.entity}`);
    lines.push(`- ${finding.message}`);
    for (const evidence of finding.evidence.slice(0, 15)) lines.push(`  - \`${evidence}\``);
    if (finding.evidence.length > 15) lines.push(`  - _(+${finding.evidence.length - 15} mục)_`);
    lines.push(`- Nguồn: ${finding.sources.join(', ')}`);
    if (finding.runtimeRequired) lines.push('- ⚠ Cần runtime verification trên DB/staging.');
    lines.push('');
  }
  lines.push('## 6. Quan hệ/schema cần thay đổi');
  lines.push('');
  const schemaFindings = findings.filter((f) => f.id.startsWith('SCHEMA-'));
  for (const finding of schemaFindings) lines.push(`- **${finding.id}**: ${finding.message}`);
  if (!schemaFindings.length) lines.push('- Không phát hiện thay đổi bắt buộc.');
  lines.push('');
  lines.push('## 7. Kế hoạch sửa dữ liệu an toàn');
  lines.push('');
  lines.push('Không apply trực tiếp. Mỗi bước có dry-run, backup và rollback; xem `fix-plan.json`.');
  lines.push('');
  lines.push('| Thứ tự | Nhóm | Finding | Runtime? |');
  lines.push('|---:|---|---|---|');
  for (const fix of fixPlan) {
    lines.push(`| ${fix.order} | ${fix.area} | ${fix.findingId} | ${fix.runtimeRequired ? 'có' : 'không'} |`);
  }
  lines.push('');
  lines.push('## 8. Giới hạn');
  lines.push('');
  lines.push(
    `- Schema models: ${Object.keys((schema as { models?: string[] } | undefined)?.models ?? []).length}; source files: ${sourcePaths.length}.`,
  );
  lines.push('- Chưa browser smoke test, chưa chạy migration/sync/seed, chưa ghi vào bất kỳ database nào.');
  if (apiErrors.length) {
    lines.push(`- PokéAPI lỗi/partial: ${apiErrors.length} mục (xem JSON).`);
  }
  return lines.join('\n');
}

export function toCsv(findings: Finding[]): string {
  const escape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
  const header = ['id', 'phase', 'area', 'entity', 'classification', 'severity', 'message', 'evidence', 'sources', 'runtimeRequired', 'recommendation'];
  return [
    header.join(','),
    ...findings.map((f) =>
      [
        f.id, f.phase, f.area, f.entity, f.classification, f.severity, f.message,
        f.evidence.join(' | '), f.sources.join(' | '), f.runtimeRequired ?? false,
        f.recommendation ?? '',
      ]
        .map(escape)
        .join(','),
    ),
  ].join('\n');
}
