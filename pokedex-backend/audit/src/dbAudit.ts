import type { Finding } from './types.js';
import type { SourceSnapshot } from './sourceAudit.js';
import type { ReferenceSnapshot } from './referenceAudit.js';

const TABLES = [
  'Pokemon', 'Type', 'Ability', 'Evolution', 'User', 'UserPokemon', 'Team', 'TeamSlot',
  'Move', 'PokemonMove', 'PokemonVariety', 'Encounter', 'DexEntry', 'Item', 'Walkthrough',
] as const;

const STATEMENT_TIMEOUT_MS = 30_000;
const MAX_DISTINCT_ROWS = 1_001;
const MAX_MASTER_ROWS = 200;

export interface DbSnapshot {
  connected: boolean;
  readOnlyEnforced: boolean;
  statementTimeoutMs: number;
  tableCounts: Record<string, number>;
  checks: Record<string, number>;
  notes: string[];
}

const unverified = (area: string, entity: string, source: string): Finding => ({
  id: `DB-UNVERIFIED-${area.toUpperCase().replace(/\s+/g, '-')}`,
  phase: 'INVENTORY',
  area,
  entity,
  classification: 'UNVERIFIED',
  severity: 'medium',
  message: `No read-only database connection was provided; ${area} cannot be confirmed from real rows. Code and schema are not evidence of database contents.`,
  evidence: ['AUDIT_DATABASE_URL not available in this run'],
  sources: [source],
  runtimeRequired: true,
  recommendation: 'Re-run with --db and a read-only staging or restored backup connection string.',
});

export const AUDIT_CHECK_SQL: Record<string, string> = {
  duplicatePokedexNumber:
    'SELECT COUNT(*) AS count FROM (SELECT "pokedexNumber" FROM "Pokemon" GROUP BY "pokedexNumber" HAVING COUNT(*) > 1) d',
  duplicatePokemonName:
    'SELECT COUNT(*) AS count FROM (SELECT name FROM "Pokemon" GROUP BY name HAVING COUNT(*) > 1) d',
  duplicateWalkthroughNaturalKey:
    'SELECT COUNT(*) AS count FROM (SELECT "gameVersion", language, "order", "chapterTitle" FROM "Walkthrough" GROUP BY 1,2,3,4 HAVING COUNT(*) > 1) d',
  pokemonMissingImage:
    'SELECT COUNT(*) AS count FROM "Pokemon" WHERE "imageUrl" IS NULL OR "imageUrl" = \'\'',
  pokemonMissingShinyImage:
    'SELECT COUNT(*) AS count FROM "Pokemon" WHERE "shinyImageUrl" IS NULL OR "shinyImageUrl" = \'\'',
  pokemonMissingDescription:
    'SELECT COUNT(*) AS count FROM "Pokemon" WHERE description IS NULL OR description = \'\'',
  pokemonMissingSpeciesId:
    'SELECT COUNT(*) AS count FROM "Pokemon" WHERE "speciesId" IS NULL',
  pokemonMissingHeightWeight:
    'SELECT COUNT(*) AS count FROM "Pokemon" WHERE height IS NULL OR weight IS NULL',
  abilityMissingEffects:
    'SELECT COUNT(*) AS count FROM "Ability" WHERE effect IS NULL AND "shortEffect" IS NULL',
  itemMissingSprite:
    'SELECT COUNT(*) AS count FROM "Item" WHERE "spriteUrl" IS NULL OR "spriteUrl" = \'\'',
  moveMissingGeneration:
    'SELECT COUNT(*) AS count FROM "Move" WHERE generation IS NULL',
  orphanEvolution:
    'SELECT COUNT(*) AS count FROM "Evolution" e LEFT JOIN "Pokemon" p ON p."pokedexNumber" = e."fromPokemonId" WHERE p.id IS NULL',
  orphanTeamSlot:
    'SELECT COUNT(*) AS count FROM "TeamSlot" t LEFT JOIN "Pokemon" p ON p."pokedexNumber" = t."pokemonId" WHERE p.id IS NULL',
  orphanPokemonMove:
    'SELECT COUNT(*) AS count FROM "PokemonMove" m LEFT JOIN "Pokemon" p ON p."pokedexNumber" = m."pokemonId" WHERE p.id IS NULL',
  orphanVariety:
    'SELECT COUNT(*) AS count FROM "PokemonVariety" v LEFT JOIN "Pokemon" p ON p."pokedexNumber" = v."pokemonId" WHERE p.id IS NULL',
  orphanEncounter:
    'SELECT COUNT(*) AS count FROM "Encounter" e LEFT JOIN "Pokemon" p ON p."pokedexNumber" = e."pokemonId" WHERE p.id IS NULL',
  orphanDexEntry:
    'SELECT COUNT(*) AS count FROM "DexEntry" d LEFT JOIN "Pokemon" p ON p.id = d."pokemonId" WHERE p.id IS NULL',
  orphanUserPokemon:
    'SELECT COUNT(*) AS count FROM "UserPokemon" u LEFT JOIN "Pokemon" p ON p.id = u."pokemonId" WHERE p.id IS NULL',
};

export const UNVERIFIED_DB_AREAS = [
  'record counts',
  'duplicates',
  'missing fields',
  'orphan relations',
  'ID consistency',
  'game version coverage',
  'walkthrough coverage',
];

export async function auditDatabase(
  url: string | undefined,
  source: SourceSnapshot,
  reference?: ReferenceSnapshot,
): Promise<{ findings: Finding[]; db: DbSnapshot }> {
  if (!url) {
    return {
      findings: UNVERIFIED_DB_AREAS.map((area) =>
        unverified(area, 'database rows', 'pokedex-backend/prisma/schema.prisma'),
      ),
      db: {
        connected: false,
        readOnlyEnforced: false,
        statementTimeoutMs: STATEMENT_TIMEOUT_MS,
        tableCounts: {},
        checks: {},
        notes: [],
      },
    };
  }

  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  const findings: Finding[] = [];
  const db: DbSnapshot = {
    connected: true,
    readOnlyEnforced: false,
    statementTimeoutMs: STATEMENT_TIMEOUT_MS,
    tableCounts: {},
    checks: {},
    notes: [],
  };
  const push = (f: Omit<Finding, 'id' | 'phase'> & { id: string }) =>
    findings.push({ phase: 'INVENTORY', ...f });

  try {
    await prisma.$connect();
    await prisma.$transaction(
      async (tx) => {
        await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');
        await tx.$executeRawUnsafe(`SET LOCAL statement_timeout = '${STATEMENT_TIMEOUT_MS}ms'`);
        db.readOnlyEnforced = true;

        const scalar = async (sql: string): Promise<number> => {
          if (!/^\s*SELECT\b/i.test(sql) || /(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|MERGE)\b/i.test(sql)) {
            throw new Error('audit SQL guard rejected a non-read-only statement');
          }
          const rows = await tx.$queryRawUnsafe<Array<{ count: bigint | number }>>(sql);
          return Number(rows[0]?.count ?? 0);
        };

        const tableList = TABLES.map((table) => `'${table}'`).join(',');
        const existing = await tx.$queryRawUnsafe<Array<{ table_name: string }>>(
          `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN (${tableList})`,
        );
        const existingNames = new Set(existing.map((r) => r.table_name));
        for (const table of TABLES) {
          if (!existingNames.has(table)) {
            db.notes.push(`table ${table} absent`);
            continue;
          }
          db.tableCounts[table] = await scalar(`SELECT COUNT(*) AS count FROM "${table}"`);
        }

        for (const [key, sql] of Object.entries(AUDIT_CHECK_SQL)) {
          db.checks[key] = await scalar(sql);
        }

        db.checks.teamSlotIdVsDexNumber = await scalar(
          'SELECT COUNT(*) AS count FROM "TeamSlot" t JOIN "Pokemon" p ON p."pokedexNumber" = t."pokemonId" WHERE p.id <> p."pokedexNumber"',
        );
        db.checks.dexEntryIdVsDexNumber = await scalar(
          'SELECT COUNT(*) AS count FROM "DexEntry" d JOIN "Pokemon" p ON p.id = d."pokemonId" WHERE p.id <> p."pokedexNumber"',
        );

        const supported = new Set(source.supportedVersions);
        const encounterVersions = await tx.$queryRawUnsafe<Array<{ versionName: string }>>(
          `SELECT DISTINCT "versionName" FROM "Encounter" LIMIT ${MAX_DISTINCT_ROWS}`,
        );
        const walkthroughVersions = await tx.$queryRawUnsafe<Array<{ gameVersion: string }>>(
          `SELECT DISTINCT "gameVersion" FROM "Walkthrough" LIMIT ${MAX_DISTINCT_ROWS}`,
        );
        const unknownEncounterVersions = encounterVersions
          .map((r) => r.versionName)
          .filter((v) => !supported.has(v));
        const unknownWalkthroughVersions = walkthroughVersions
          .map((r) => r.gameVersion)
          .filter((v) => !supported.has(v));
        db.checks.encounterVersionsSeen = encounterVersions.length;
        db.checks.walkthroughVersionsSeen = walkthroughVersions.length;
        db.notes.push(
          `DISTINCT version queries capped at ${MAX_DISTINCT_ROWS} rows; counts may be truncated on very large datasets.`,
        );

        const details = (reference?.pokemonDetails ?? []).slice(0, MAX_MASTER_ROWS);
        if (details.length) {
          const ids = details.map((detail) => detail.id);
          const rows = await tx.pokemon.findMany({
            where: { pokedexNumber: { in: ids } },
            select: {
              pokedexNumber: true,
              name: true,
              height: true,
              weight: true,
              generation: true,
              speciesId: true,
              types: { select: { name: true } },
              abilities: { select: { name: true } },
            },
            take: MAX_MASTER_ROWS,
          });
          const byId = new Map(rows.map((row) => [row.pokedexNumber, row]));
          const mismatches: string[] = [];
          let compared = 0;
          for (const detail of details) {
            const row = byId.get(detail.id);
            if (!row) {
              mismatches.push(`id ${detail.id} ${detail.name}: row missing in DB`);
              continue;
            }
            compared += 1;
            const problems: string[] = [];
            if (row.name !== detail.name) problems.push(`name ${row.name} != ${detail.name}`);
            if (row.height !== detail.height) problems.push(`height ${row.height} != ${detail.height}`);
            if (row.weight !== detail.weight) problems.push(`weight ${row.weight} != ${detail.weight}`);
            if (row.generation !== detail.generation) problems.push(`gen ${row.generation} != ${detail.generation}`);
            if (row.speciesId !== detail.id) problems.push(`speciesId ${row.speciesId} != ${detail.id}`);
            const rowTypes = row.types.map((type) => type.name).sort().join(',');
            const refTypes = [...detail.types].sort().join(',');
            if (rowTypes !== refTypes) problems.push(`types [${rowTypes}] != [${refTypes}]`);
            const rowAbilities = row.abilities.map((ability) => ability.name).sort().join(',');
            const refAbilities = detail.abilities.map((ability) => ability.name).sort().join(',');
            if (rowAbilities !== refAbilities) problems.push(`abilities [${rowAbilities}] != [${refAbilities}]`);
            if (problems.length) mismatches.push(`id ${detail.id} ${detail.name}: ${problems.join('; ')}`);
          }
          db.checks.masterRecordsCompared = compared;
          if (mismatches.length) {
            push({
              id: 'DB-MASTER-VALUE-MISMATCH',
              area: 'master-data',
              entity: 'Pokemon master values',
              classification: 'INCORRECT',
              severity: 'high',
              message: 'Sampled Pokemon rows disagree with PokéAPI master values.',
              evidence: mismatches.slice(0, 12),
              sources: ['read-only Prisma queries', 'https://pokeapi.co/api/v2/pokemon'],
            });
          } else {
            push({
              id: 'DB-MASTER-VALUE-CORRECT',
              area: 'master-data',
              entity: 'Pokemon master values',
              classification: 'CORRECT',
              severity: 'info',
              message: 'Sampled Pokemon names, height, weight, generation, species ID, types and abilities match PokéAPI.',
              evidence: [`records compared: ${compared}`],
              sources: ['read-only Prisma queries', 'https://pokeapi.co/api/v2/pokemon'],
            });
          }
          push({
            id: 'DB-HIDDEN-ABILITY-UNVERIFIED',
            area: 'abilities',
            entity: 'hidden abilities',
            classification: 'UNVERIFIED',
            severity: 'medium',
            message: 'The Ability relation has no isHidden flag, so hidden abilities cannot be validated against the reference even when DB values exist.',
            evidence: [
              `reference hidden abilities in sample: ${details.reduce((sum, detail) => sum + detail.abilities.filter((ability) => ability.isHidden).length, 0)}`,
            ],
            sources: ['pokedex-backend/prisma/schema.prisma', 'https://pokeapi.co/api/v2/pokemon'],
          });
        }

        const problemChecks = Object.entries(db.checks).filter(
          ([key, value]) => value > 0 && !/(Seen|Compared)$/.test(key),
        );
        if (problemChecks.length) {
          push({
            id: 'DB-QUALITY-ISSUES',
            area: 'record quality',
            entity: 'database rows',
            classification: 'INCORRECT',
            severity: 'high',
            message: 'Read-only database checks found records requiring correction.',
            evidence: problemChecks.map(([key, value]) => `${key}=${value}`),
            sources: ['read-only information_schema and aggregate queries'],
          });
        } else {
          push({
            id: 'DB-QUALITY-CLEAN',
            area: 'record quality',
            entity: 'database rows',
            classification: 'CORRECT',
            severity: 'info',
            message: 'No duplicates, nulls or orphan relations detected by the executed read-only checks.',
            evidence: Object.entries(db.tableCounts).map(([k, v]) => `${k}=${v}`),
            sources: ['read-only information_schema and aggregate queries'],
          });
        }
        if (unknownEncounterVersions.length || unknownWalkthroughVersions.length) {
          push({
            id: 'DB-UNSUPPORTED-VERSION-ROWS',
            area: 'game-specific',
            entity: 'Encounter / Walkthrough',
            classification: 'INCORRECT',
            severity: 'medium',
            message: 'Database rows reference game slugs outside the supported version list.',
            evidence: [
              `encounters: ${unknownEncounterVersions.slice(0, 20).join(', ') || 'none'}`,
              `walkthroughs: ${unknownWalkthroughVersions.slice(0, 20).join(', ') || 'none'}`,
            ],
            sources: ['read-only DISTINCT queries', 'pokedex-frontend/src/lib/gameVersions.ts'],
          });
        }
      },
      { maxWait: 10_000, timeout: 120_000 },
    );
  } finally {
    await prisma.$disconnect();
  }
  return { findings, db };
}
