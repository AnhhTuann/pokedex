import type { AuditOutput, Coverage, Finding, FixPlan } from './types.js';
import type { GameAuditRow, ReferenceSnapshot, SpeciesCoverageRow } from './referenceAudit.js';
import type { DbSnapshot } from './dbAudit.js';
import type { SourceSnapshot } from './sourceAudit.js';

// Operator-approved correction order. Do not reorder without an explicit decision.
const CORRECTION_STEPS: Array<[RegExp, number, string]> = [
  [/MASTER|DESCRIPTION|CHART|SEED|UPDATER|DB-QUALITY|DUPLICATE|POKEMON-ID|INCORRECT-ID/, 1, 'Pokemon master data'],
  [/EVOLUTION|VARIETY|FORM|FK-INCONSISTENT|ORPHAN|RELATION/, 2, 'Forms and evolutions'],
  // Learnset is matched before Availability because IDs such as
  // API-LEARNSET-VERSION-DETAIL contain "VERSION". Sorting below still uses
  // the requested numeric order (Availability 3, Learnsets 4).
  [/LEARNSET|DAMAGE|GENERATION-RANGE/, 4, 'Learnsets and generation rules'],
  [/AVAILABILITY|REGIONAL|DEX|VERSION|GAME|SRC-GENERATION/, 3, 'Availability'],
  [/ENCOUNTER|LOCATION/, 5, 'Encounters and locations'],
  [/MOVE|ABILITY|ITEM|TYPE|NATURE/, 6, 'Moves, abilities and items'],
  [/IMAGE|SPRITE|ASSET/, 7, 'Images'],
  [/WALKTHROUGH|CMS/, 8, 'Walkthrough'],
];

export const SOURCE_RELIABILITY = [
  {
    source: 'PokéAPI /pokemon-species, /pokemon, /evolution-chain, /pokemon/{id}/encounters',
    reliability: 'Tham chiếu chính thức (cao)',
    use: 'Master data, forms, stats, abilities, evolution conditions, encounters, game indices, learnset version groups.',
    limit: 'Không phải bằng chứng về nội dung DB local; phiên bản tiếng Việt và nội dung biên tập không có ở PokéAPI.',
  },
  {
    source: 'PokéAPI /version, /version-group, /pokedex, /generation, /ability, /item',
    reliability: 'Tham chiếu chính thức (cao)',
    use: 'Game/version-group mapping, regional dex, generation membership, ability/item generation and version-group counts.',
    limit: 'Item version-group counts derive from flavor_text_entries; key items without localized text may be absent.',
  },
  {
    source: 'pokedex-backend/public/images/**',
    reliability: 'Tài sản local (cao cho sự tồn tại file)',
    use: 'Kiểm tra sự hiện diện của WebP Normal/Shiny theo species và variety.',
    limit: 'Không chứng minh DB imageUrl trỏ tới file local; cần runtime verification.',
  },
  {
    source: 'pokedex-frontend/src/lib/gameVersions.ts',
    reliability: 'Cấu hình ứng dụng (trung bình)',
    use: 'Danh sách 38 game được hỗ trợ, generation mapping, regional dex mapping.',
    limit: 'Là ý định của sản phẩm, không phải dữ liệu game authoritative; được đối chiếu với PokéAPI.',
  },
  {
    source: 'pokedex-backend/prisma/schema.prisma',
    reliability: 'Hợp đồng/schema (cao cho cấu trúc)',
    use: 'Đối chiếu model/quan hệ; xác định các trường không thể lưu dữ liệu per-version.',
    limit: 'Không phải bằng chứng về record hoặc giá trị trong DB.',
  },
  {
    source: 'pokedex-backend/prisma/seeds/walkthroughs.json',
    reliability: 'Nội dung biên tập (trung bình)',
    use: 'Đếm số game có walkthrough, ngôn ngữ và bản trùng.',
    limit: 'Thiếu nội dung không tự suy ra được; cần biên tập viên cung cấp.',
  },
  {
    source: 'AUDIT_DATABASE_URL (read-only)',
    reliability: 'Runtime truth (chỉ khi kết nối)',
    use: 'Đếm record, duplicates, orphan relations và so sánh mẫu master value.',
    limit: 'Không có trong lần chạy này → mọi khẳng định row-level bị BLOCKED.',
  },
] as const;

const dbScope = (finding: Finding): boolean =>
  finding.id.startsWith('DB-') || finding.id.startsWith('SCHEMA-') || finding.id === 'SRC-WALKTHROUGH-COVERAGE';

export function buildFixPlan(findings: Finding[]): FixPlan[] {
  return findings
    .filter((f) => f.classification !== 'CORRECT' && f.classification !== 'UNVERIFIED')
    .map((finding) => {
      const match = CORRECTION_STEPS.find(([pattern]) => pattern.test(finding.id + finding.area));
      const order = match?.[1] ?? 9;
      const area = match?.[2] ?? 'Other data quality work';
      const needsDb = dbScope(finding);
      return {
        order,
        area,
        findingId: finding.id,
        action: finding.recommendation ?? finding.message,
        dryRunCommand: `npm run audit:dry-run -- --finding ${finding.id} --report audit/reports/current/audit.json`,
        validationCommand: needsDb
          ? 'npm run audit -- --db --out audit/reports/verify-db && npm run audit -- --offline --schema-only --out audit/reports/verify-schema'
          : 'npm run audit:typecheck && npm run test:audit && npm test && npm run build',
        backupCommand: needsDb
          ? 'pg_dump -Fc --file="$BACKUP_PATH" "$AUDIT_DATABASE_URL"  # full logical backup, operator-approved staging/backup only'
          : 'git rev-parse HEAD > pre-fix-commit.txt && git diff --binary > pre-fix.patch  # reviewed source checkpoint',
        rollbackCommand: needsDb
          ? 'KHÔNG replay data-only SQL vào DB đã populate. Phục hồi full backup vào DB MỚI, verify counts/relations, rồi operator mới đổi connection; mọi thao tác cần phê duyệt.'
          : 'git revert <COMMIT_SHA> sau khi operator review; không force-push, không overwrite lịch sử.',
        runtimeRequired: Boolean(finding.runtimeRequired) || needsDb,
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
  detail.speciesCatalogTotal = reference?.counts?.species ?? reference?.totals['pokemon-species'] ?? 0;
  detail.pokemonFormCatalogTotal = reference?.counts?.pokemonForms ?? 0;
  detail.varietyRecordsChecked = reference?.formAudit.reduce((sum, item) => sum + item.varieties, 0) ?? 0;
  detail.varietyFormsChecked = reference?.formAudit.reduce((sum, item) => sum + item.formsChecked, 0) ?? 0;
  detail.evolutionChainsAudited = reference?.evolutionSample.filter((item) => item.requirementCount > 0).length ?? 0;
  detail.resumedSpecies = reference?.checkpoint.resumedIds.length ?? 0;
  detail.failedSpecies = reference?.checkpoint.failedIds.length ?? 0;
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
  detail.speciesCoverageRows = reference?.speciesCoverage.length ?? 0;
  detail.gameCoverageRows = reference?.gameAudit.length ?? 0;
  detail.speciesReferenceAccurate = reference?.speciesCoverage.filter((row) => row.referenceStatus === 'ACCURATE').length ?? 0;
  detail.speciesReferenceMissing = reference?.speciesCoverage.filter((row) => row.referenceStatus === 'MISSING').length ?? 0;
  detail.speciesReferenceUnverified = reference?.speciesCoverage.filter((row) => row.referenceStatus === 'UNVERIFIED').length ?? 0;
  detail.gamesAccurate = reference?.gameAudit.filter((row) => row.status === 'ACCURATE').length ?? 0;
  detail.gamesMissing = reference?.gameAudit.filter((row) => row.status === 'MISSING').length ?? 0;
  detail.gamesIncorrect = reference?.gameAudit.filter((row) => row.status === 'INCORRECT').length ?? 0;
  detail.gamesUnverified = reference?.gameAudit.filter((row) => row.status === 'UNVERIFIED').length ?? 0;
  detail.learnsetMoveSlots = reference?.speciesCoverage.reduce((sum, row) => sum + row.learnsetMoveSlots, 0) ?? 0;
  detail.abilityDetailsResolved = reference?.catalogDetails.abilitiesDetailed ?? 0;
  detail.itemDetailsResolved = reference?.catalogDetails.itemsDetailed ?? 0;
  detail.itemVersionGroupsResolved = Object.keys(reference?.catalogDetails.itemCountByVersionGroup ?? {}).length;
  detail.dbConnectionBlocked = db.connected ? 0 : 1;

  const scopes = {
    sourceReference: {
      speciesCatalog: reference?.counts?.species ?? reference?.totals['pokemon-species'] ?? 0,
      speciesAudited: reference?.counts?.speciesAudited ?? 0,
      pokemonFormCatalog: reference?.counts?.pokemonForms ?? 0,
      formsChecked: detail.varietyFormsChecked,
      gamesSupported: source.supportedVersions.length,
      gamesAudited: reference?.gameAudit.length ?? 0,
      regionalDexes: reference?.pokedexes.length ?? 0,
      learnsetMoveSlots: detail.learnsetMoveSlots,
      abilitiesResolved: detail.abilityDetailsResolved,
      itemsResolved: detail.itemDetailsResolved,
      dbRows: 'NOT_IN_SCOPE',
    },
    database: {
      connection: db.connected ? 'read-only' : 'BLOCKED',
      tablesWithCounts: Object.keys(db.tableCounts).length,
      checksExecuted: Object.keys(db.checks).length,
      rowLevelCoverage: db.connected ? 'PARTIAL_SAMPLE_ONLY' : 'BLOCKED',
      note: db.connected
        ? 'Read-only sample checks only; schema/source/reference results are not DB evidence.'
        : 'No AUDIT_DATABASE_URL: no row-level claim is made anywhere in this report.',
    },
  };

  const unverified = findings.filter((f) => f.classification === 'UNVERIFIED').length;
  const checked =
    detail.gamesCheckedAgainstApi +
    detail.regionalDexesChecked +
    detail.speciesSampled +
    detail.varietyFormsChecked +
    detail.evolutionChainsAudited +
    detail.encounterSpeciesSampled +
    detail.learnsetSpeciesSampled +
    detail.masterRecordsCompared +
    detail.availabilityGamesSampled +
    detail.dbTablesChecked +
    9; // generation checks
  const unchecked =
    Math.max(0, detail.speciesCatalogTotal - detail.speciesSampled) +
    Math.max(0, detail.pokemonFormCatalogTotal - detail.varietyFormsChecked) +
    Math.max(0, detail.supportedGames - detail.gamesCheckedAgainstApi) +
    (db.connected ? 0 : 15);
  return { checked, unchecked, unverified, detail, byClassification, scopes };
}

export function renderMarkdown(output: AuditOutput, fixPlan: FixPlan[]): string {
  const { coverage, findings, reference, schema, source, db } = output;
  const referenceData = reference as ReferenceSnapshot | undefined;
  const sourceSnapshot = source as SourceSnapshot | undefined;
  const apiErrors = referenceData?.apiErrors ?? [];
  const sourcePaths = sourceSnapshot?.sourcePaths ?? [];
  const mdCell = (value: unknown): string => String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
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
  if (referenceData?.counts) {
    lines.push('## 0. Phân biệt species / form / DB rows');
    lines.push('');
    lines.push(`- Species PokéAPI: **${referenceData.counts.species}**`);
    lines.push(`- Pokemon/form PokéAPI: **${referenceData.counts.pokemonForms}**`);
    lines.push(`- Variety records đã kiểm tra: **${referenceData.counts.varieties}**`);
    lines.push(`- Species đã kiểm tra: **${referenceData.counts.speciesAudited}** (resume: ${referenceData.checkpoint.resumedIds.length}, lỗi: ${referenceData.checkpoint.failedIds.length})`);
    lines.push(`- DB rows: ${db?.connected ? 'xem bảng bên dưới' : '**BLOCKED — chưa có AUDIT_DATABASE_URL**'}`);
    lines.push('');
  }
  lines.push('## 0b. Nguồn tham chiếu và độ tin cậy');
  lines.push('');
  lines.push('| Nguồn | Độ tin cậy | Dùng để | Giới hạn |');
  lines.push('|---|---|---|---|');
  for (const item of SOURCE_RELIABILITY) {
    lines.push(`| ${item.source} | ${item.reliability} | ${item.use} | ${item.limit} |`);
  }
  lines.push('');
  if (coverage.scopes) {
    lines.push('### Phạm vi tách biệt');
    lines.push('');
    lines.push('- **Source/reference coverage**: ' + JSON.stringify(coverage.scopes.sourceReference));
    lines.push('- **DB coverage**: ' + JSON.stringify(coverage.scopes.database));
    lines.push('');
  }
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
  lines.push('## 3. Coverage theo Game (38 game)');
  lines.push('');
  lines.push(`- Game frontend hỗ trợ: **${coverage.detail.supportedGames}**`);
  lines.push(`- Game đối chiếu được với PokéAPI: **${coverage.detail.gamesCheckedAgainstApi}**`);
  lines.push(`- Regional dex đã kiểm tra: **${coverage.detail.regionalDexesChecked}**`);
  lines.push(`- Game có walkthrough: **${coverage.detail.walkthroughGamesCovered}** / ${coverage.detail.supportedGames}`);
  lines.push(
    `- Trạng thái reference: ACCURATE=${coverage.detail.gamesAccurate ?? 0}, MISSING=${coverage.detail.gamesMissing ?? 0}, INCORRECT=${coverage.detail.gamesIncorrect ?? 0}, UNVERIFIED=${coverage.detail.gamesUnverified ?? 0}.`,
  );
  lines.push('');
  if (referenceData?.gameAudit?.length) {
    lines.push('| Game | Gen | Version group | Regional dex | Dex entries | Species in dex | Form game-index | Encounter species | Learnset species | Move slots | Abilities | Items gen/vg | Walkthrough | Status |');
    lines.push('|---:|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|');
    for (const row of referenceData.gameAudit as GameAuditRow[]) {
      lines.push(
        [
          row.game, row.generation || '?', row.versionGroup || '?', row.regionalDex || '—',
          row.dexEntryCount, row.dexSpeciesChecked, row.formGameIndexSpecies, row.encounterSpecies,
          row.learnsetSpecies, row.learnsetMoveSlots, row.abilityGenerationCount,
          `${row.itemGenerationCount}/${row.itemVersionGroupCount}`,
          row.walkthrough ? 'có' : '**thiếu**', row.status,
        ].map(mdCell).join(' | '),
      );
    }
    lines.push('');
    lines.push('> `Form game-index` = số species có ít nhất một variety xuất hiện trong game đó theo PokéAPI `game_indices`. `Encounter species` = số species có dữ liệu bắt ngoài tự nhiên; giá trị 0 có thể hợp lệ (game không có dữ liệu encounter trong reference).');
    lines.push('');
  } else if (referenceData?.versions?.length) {
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
  lines.push('## 3b. Thống kê theo Pokémon');
  lines.push('');
  lines.push(`- Hàng coverage: **${coverage.detail.speciesCoverageRows ?? 0}**`);
  lines.push(`- Reference ACCURATE=${coverage.detail.speciesReferenceAccurate ?? 0}, MISSING=${coverage.detail.speciesReferenceMissing ?? 0}, UNVERIFIED=${coverage.detail.speciesReferenceUnverified ?? 0}`);
  lines.push(`- Tổng move-slot theo version-group: **${coverage.detail.learnsetMoveSlots ?? 0}**`);
  lines.push('');
  if (referenceData?.speciesCoverage?.length) {
    lines.push('| ID | Name | Gen | Forms | Types | Abilities (hidden) | Evolution conditions | Learnset VG / slots | Encounter versions | Game indices | Dexes | WebP N/S | VI text | Ref status |');
    lines.push('|---:|---|---:|---:|---|---:|---:|---:|---:|---:|---:|---|---|---|');
    for (const row of referenceData.speciesCoverage as SpeciesCoverageRow[]) {
      lines.push(
        [
          row.id, row.name, row.generation, `${row.formsChecked}/${row.varieties}`,
          row.types.join('/') || '—', `${row.abilities} (${row.hiddenAbilities})`,
          row.evolutionConditions.length, `${row.learnsetVersionGroups}/${row.learnsetMoveSlots}`,
          row.encounterVersions, row.formGameIndexGames, row.regionalDexCount,
          `${row.localNormalImage ? '✓' : '✗'}/${row.localShinyImage ? '✓' : '✗'}`,
          row.hasVietnameseDescription ? 'có' : '—',
          row.referenceStatus,
        ].map(mdCell).join(' | '),
      );
    }
    lines.push('');
    lines.push('> Bảng đầy đủ kèm bằng chứng nằm ở `species-coverage.csv`; ma trận game nằm ở `game-coverage.csv`.');
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
  lines.push('## 8. Dữ liệu cần biên tập tay / chưa xác minh');
  lines.push('');
  lines.push('Không tự bịa nội dung. Các mục dưới đây cần người duyệt hoặc DB staging/backup; chi tiết nằm ở `manual-review.csv` và `unverified.csv`.');
  lines.push('');
  const manualFindings = findings.filter(
    (f) => f.classification === 'MISSING' || f.classification === 'UNVERIFIED' || f.runtimeRequired,
  );
  if (manualFindings.length) {
    lines.push('| Finding | Phân loại | Entity | Việc cần làm | Bằng chứng mẫu |');
    lines.push('|---|---|---|---|---|');
    for (const finding of manualFindings) {
      lines.push(
        [
          finding.id,
          finding.classification,
          finding.entity,
          finding.recommendation ?? finding.message,
          finding.evidence[0] ?? '—',
        ].map(mdCell).join(' | '),
      );
    }
    lines.push('');
  } else {
    lines.push('- Không có mục nào cần biên tập tay trong lần chạy này.');
    lines.push('');
  }
  lines.push('## 9. Giới hạn');
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

const escapeCsv = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;

export function csvFromRows(header: string[], rows: Array<Array<unknown>>): string {
  return [header, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
}

export function toCsv(findings: Finding[]): string {
  return csvFromRows(
    ['id', 'phase', 'area', 'entity', 'classification', 'severity', 'message', 'evidence', 'sources', 'runtimeRequired', 'recommendation'],
    findings.map((f) => [
      f.id, f.phase, f.area, f.entity, f.classification, f.severity, f.message,
      f.evidence.join(' | '), f.sources.join(' | '), f.runtimeRequired ?? false,
      f.recommendation ?? '',
    ]),
  );
}

export function toSpeciesCoverageCsv(rows: SpeciesCoverageRow[]): string {
  return csvFromRows(
    [
      'id', 'name', 'generation', 'varieties', 'formsChecked', 'types', 'statsComplete',
      'abilities', 'hiddenAbilities', 'hasEvolutionChain', 'evolutionConditions',
      'learnsetVersionGroups', 'learnsetMoveSlots', 'encounterVersions', 'gameIndexGames',
      'formGameIndexGames', 'regionalDexCount', 'localNormalImage', 'localShinyImage',
      'missingNormalImages', 'missingShinyImages', 'descriptionLanguages',
      'hasVietnameseDescription', 'referenceStatus', 'sources',
    ],
    rows.map((row) => [
      row.id, row.name, row.generation, row.varieties, row.formsChecked, row.types.join('|'),
      row.statsComplete, row.abilities, row.hiddenAbilities, row.hasEvolutionChain,
      row.evolutionConditions.join(' | '), row.learnsetVersionGroups, row.learnsetMoveSlots,
      row.encounterVersions, row.gameIndexGames, row.formGameIndexGames, row.regionalDexCount,
      row.localNormalImage, row.localShinyImage, row.missingNormalImages.join('|'),
      row.missingShinyImages.join('|'), row.descriptionLanguages.join('|'),
      row.hasVietnameseDescription, row.referenceStatus, row.sources.join(' | '),
    ]),
  );
}

export function toGameCoverageCsv(rows: GameAuditRow[]): string {
  return csvFromRows(
    [
      'game', 'versionGroup', 'generation', 'regionalDex', 'dexEntryCount',
      'dexVersionGroupOk', 'dexSpeciesChecked', 'formGameIndexSpecies', 'encounterSpecies',
      'learnsetSpecies', 'learnsetMoveSlots', 'abilityGenerationCount',
      'itemGenerationCount', 'itemVersionGroupCount', 'walkthrough', 'status',
      'evidence', 'sources',
    ],
    rows.map((row) => [
      row.game, row.versionGroup, row.generation, row.regionalDex, row.dexEntryCount,
      row.dexVersionGroupOk, row.dexSpeciesChecked, row.formGameIndexSpecies,
      row.encounterSpecies, row.learnsetSpecies, row.learnsetMoveSlots,
      row.abilityGenerationCount, row.itemGenerationCount, row.itemVersionGroupCount,
      row.walkthrough, row.status, row.evidence.join(' | '), row.sources.join(' | '),
    ]),
  );
}

const reliabilityForSource = (source: string): string => {
  if (/^https?:\/\//.test(source)) return SOURCE_RELIABILITY[0].reliability;
  if (source.includes('public/images')) return SOURCE_RELIABILITY[2].reliability;
  if (source.includes('gameVersions.ts')) return SOURCE_RELIABILITY[3].reliability;
  if (source.includes('schema.prisma')) return SOURCE_RELIABILITY[4].reliability;
  if (source.includes('walkthroughs.json')) return SOURCE_RELIABILITY[5].reliability;
  if (source.includes('AUDIT_DATABASE_URL')) return SOURCE_RELIABILITY[6].reliability;
  return 'Nguồn nội bộ (trung bình)';
};

export function toEvidenceCsv(findings: Finding[]): string {
  const rows = findings.flatMap((finding) =>
    finding.evidence.map((evidence, index) => [
      finding.id,
      index + 1,
      finding.classification,
      finding.area,
      finding.entity,
      evidence,
      finding.sources.join(' | '),
      finding.sources.map(reliabilityForSource).join(' | ') || 'không có nguồn',
    ]),
  );
  return csvFromRows(
    ['findingId', 'evidenceIndex', 'classification', 'area', 'entity', 'evidence', 'sources', 'sourceReliability'],
    rows,
  );
}

export function toManualReviewCsv(findings: Finding[]): string {
  const rows = findings
    .filter((f) => f.classification === 'MISSING' || f.classification === 'UNVERIFIED' || f.runtimeRequired)
    .map((finding) => [
      finding.id,
      finding.classification,
      finding.area,
      finding.entity,
      finding.runtimeRequired ? 'Cần DB/staging' : finding.classification === 'MISSING' ? 'Thiếu dữ liệu/nội dung' : 'Chưa xác minh',
      finding.recommendation ?? finding.message,
      finding.evidence.slice(0, 5).join(' | '),
      finding.sources.join(' | '),
      finding.runtimeRequired ? 'operator' : 'data-editor',
      'KHÔNG tự sinh nội dung; cần reviewer phê duyệt',
    ]);
  return csvFromRows(
    ['findingId', 'classification', 'area', 'entity', 'reason', 'requiredAction', 'evidence', 'sources', 'owner', 'guardrail'],
    rows,
  );
}

export function toUnverifiedCsv(findings: Finding[]): string {
  return csvFromRows(
    ['findingId', 'classification', 'area', 'entity', 'message', 'runtimeRequired', 'evidence', 'sources'],
    findings
      .filter((f) => f.classification === 'UNVERIFIED' || f.runtimeRequired)
      .map((f) => [
        f.id, f.classification, f.area, f.entity, f.message, f.runtimeRequired ?? false,
        f.evidence.slice(0, 8).join(' | '), f.sources.join(' | '),
      ]),
  );
}
