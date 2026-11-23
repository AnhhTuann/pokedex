import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { Finding } from './types.js';

export interface SourceSnapshot {
  supportedVersions: string[];
  regionalDexByVersion: Record<string, string>;
  walkthrough: {
    records: number;
    versions: string[];
    languages: string[];
    duplicates: number;
  };
  images: { total: number; zeroByte: number; byDir: Record<string, number> };
  sourcePaths: string[];
}

const read = (root: string, relative: string) => readFileSync(join(root, relative), 'utf8');

function extractBlock(source: string, marker: string): string {
  const start = source.indexOf(marker);
  if (start < 0) return '';
  const assign = source.indexOf('=', start);
  const from = assign >= 0 ? assign : start;
  const openBrace = source.indexOf('{', from);
  const openBracket = source.indexOf('[', from);
  const useBracket = openBracket >= 0 && (openBrace < 0 || openBracket < openBrace);
  const open = useBracket ? openBracket : openBrace;
  const close = useBracket ? ']' : '}';
  if (open < 0) return '';
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === (useBracket ? '[' : '{')) depth += 1;
    if (source[i] === close) {
      depth -= 1;
      if (depth === 0) return source.slice(open, i + 1);
    }
  }
  return '';
}

export function parseSupportedVersions(gameVersionsSource: string): string[] {
  const block = extractBlock(gameVersionsSource, 'GENERATION_VERSIONS');
  const names = [...block.matchAll(/name:\s*["']([^"']+)["']/g)].map((m) => m[1]);
  return [...new Set(names)];
}

export function parseRegionalDexMap(gameVersionsSource: string): Record<string, string> {
  const block = extractBlock(gameVersionsSource, 'GAME_TO_REGIONAL_DEX');
  const result: Record<string, string> = {};
  for (const m of block.matchAll(/["']?([\w-]+)["']?:\s*["']([^"']+)["']/g)) {
    result[m[1]] = m[2];
  }
  return result;
}

function countImages(root: string): SourceSnapshot['images'] {
  const base = join(root, 'pokedex-backend/public/images');
  const byDir: Record<string, number> = {};
  let zeroByte = 0;
  let total = 0;
  if (!existsSync(base)) return { total: 0, zeroByte: 0, byDir };
  for (const entry of readdirSync(base, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const relativePath = join(entry.parentPath, entry.name).slice(base.length + 1);
    const group = relativePath.split(/[\\/]/)[0];
    byDir[group] = (byDir[group] ?? 0) + 1;
    total += 1;
    try {
      if (statSync(join(entry.parentPath, entry.name)).size === 0) zeroByte += 1;
    } catch {
      /* unreadable asset reported as unverified rather than failing the audit */
    }
  }
  return { total, zeroByte, byDir };
}

export function auditSource(root: string): { findings: Finding[]; snapshot: SourceSnapshot } {
  const findings: Finding[] = [];
  const push = (f: Omit<Finding, 'id' | 'phase'> & { id: string }) =>
    findings.push({ phase: 'MASTER', ...f });

  const gameVersionsPath = 'pokedex-frontend/src/lib/gameVersions.ts';
  const gameVersions = read(root, gameVersionsPath);
  const supportedVersions = parseSupportedVersions(gameVersions);
  const regionalDexByVersion = parseRegionalDexMap(gameVersions);

  const walkthroughPath = 'pokedex-backend/prisma/seeds/walkthroughs.json';
  const walkthroughRaw = JSON.parse(read(root, walkthroughPath)) as Array<{
    gameVersion: string;
    language: string;
  }>;
  const versionKeys = walkthroughRaw.map((item) => item.gameVersion);
  const duplicates = versionKeys.length - new Set(versionKeys).size;
  const walkthrough = {
    records: walkthroughRaw.length,
    versions: [...new Set(versionKeys)].sort(),
    languages: [...new Set(walkthroughRaw.map((item) => item.language))].sort(),
    duplicates,
  };

  const images = countImages(root);

  const unsupportedWalkthroughVersions = walkthrough.versions.filter(
    (v) => !supportedVersions.includes(v),
  );
  if (unsupportedWalkthroughVersions.length) {
    push({
      id: 'SRC-WALKTHROUGH-UNSUPPORTED-VERSION',
      area: 'walkthrough',
      entity: 'walkthroughs.json',
      classification: 'INCORRECT',
      severity: 'medium',
      message: 'Curated walkthroughs reference game slugs absent from the frontend supported-version list.',
      evidence: [`unsupported slugs: ${unsupportedWalkthroughVersions.join(', ')}`],
      sources: [walkthroughPath, gameVersionsPath],
    });
  }

  const unmappedVersions = supportedVersions.filter((v) => !regionalDexByVersion[v]);
  if (unmappedVersions.length) {
    push({
      id: 'SRC-VERSION-NO-REGIONAL-DEX',
      area: 'game-specific',
      entity: 'GAME_TO_REGIONAL_DEX',
      classification: 'MISSING',
      severity: 'medium',
      message: 'Supported games have no regional dex mapping, so availability/regional numbers cannot be resolved.',
      evidence: [`unmapped: ${unmappedVersions.join(', ')}`],
      sources: [gameVersionsPath],
    });
  }

  if (/return\s+genMap\[nameLower\]\s*\|\|\s*9/.test(gameVersions)) {
    push({
      id: 'SRC-GENERATION-FALLBACK-9',
      area: 'game-specific',
      entity: 'getGameGeneration',
      classification: 'INCORRECT',
      severity: 'medium',
      message:
        'Unknown game slugs silently default to Generation IX, which can apply Gen IX rules and filtering to unsupported games.',
      evidence: ['getGameGeneration returns genMap[nameLower] || 9'],
      sources: [gameVersionsPath],
      recommendation: 'Return null/unknown for unrecognized slugs and reject them at API/UI boundaries.',
    });
  }

  const seedPath = 'pokedex-backend/scripts/seed.ts';
  const seed = read(root, seedPath);
  const countMatch = seed.match(/POKEMON_COUNT\s*=\s*(\d+)/);
  if (countMatch) {
    push({
      id: 'SRC-SEED-HARDCODED-COUNT',
      area: 'master-data',
      entity: 'seed.ts POKEMON_COUNT',
      classification: 'UNVERIFIED',
      severity: 'medium',
      message:
        'Seed uses a hardcoded species count as its sync range. Counts are not stable identifiers and become stale when new species are added.',
      evidence: [`POKEMON_COUNT = ${countMatch[1]}`],
      sources: [seedPath],
      runtimeRequired: true,
      recommendation: 'Derive IDs from PokéAPI pagination/next URLs or a maintained explicit ID list.',
    });
  }

  const updaterPath = 'pokedex-backend/src/services/updater.service.ts';
  const updater = read(root, updaterPath);
  if (/prisma\.pokemon\.count\(\)/.test(updater) && /hasUpdate/.test(updater)) {
    push({
      id: 'SRC-UPDATER-COUNT-CURSOR',
      area: 'sync',
      entity: 'updaterService.checkUpdates',
      classification: 'INCORRECT',
      severity: 'medium',
      message:
        'Update detection compares local row counts to API counts; gaps in IDs and renames cannot be detected and equal counts hide drift.',
      evidence: ['Promise.all([prisma.pokemon.count(), prisma.item.count(), prisma.ability.count()])'],
      sources: [updaterPath],
    });
  }

  const backendChartPath = 'pokedex-backend/src/lib/typeMatchups.ts';
  if (existsSync(join(root, backendChartPath))) {
    const chart = read(root, backendChartPath);
    if (!/generation/i.test(chart)) {
      push({
        id: 'SRC-BACKEND-CHART-MODERN-ONLY',
        area: 'game-specific',
        entity: 'GraphQL matchups',
        classification: 'INCORRECT',
        severity: 'high',
        message:
          'Backend defensive matchups always use the modern (Gen VI+) chart; the frontend already has generation-specific charts. GraphQL clients get wrong Gen I–V effectiveness.',
        evidence: [
          'pokedex-backend/src/lib/typeMatchups.ts has no generation parameter',
          'pokedex-frontend/src/utils/typeMatchups.ts getTypeChart(generation) supports Gen1 and Gen2-5',
        ],
        sources: [backendChartPath, 'pokedex-frontend/src/utils/typeMatchups.ts'],
        recommendation: 'Extend the backend chart with generation rules and expose generation in the GraphQL contract.',
      });
    }
  }

  const damagePath = 'pokedex-frontend/src/utils/damageCalc.ts';
  const damage = read(root, damagePath);
  if (/move\.damageClass/.test(damage) && !/gen\s*<=?\s*3/.test(damage)) {
    push({
      id: 'SRC-DAMAGE-GEN-RULES',
      area: 'game-specific',
      entity: 'damage calculator',
      classification: 'UNSUPPORTED',
      severity: 'high',
      message:
        'Damage calculation uses move.damageClass unconditionally and has no Gen I special-stat or pre-Gen IV physical/special-by-type rules.',
      evidence: [
        'const isPhysical = move.damageClass === "physical"',
        'no special-case branch for generation <= 3 in damageCalc.ts',
      ],
      sources: [damagePath],
      recommendation: 'Add explicit per-generation battle rule adapters before claiming Gen I–IX support.',
    });
  }

  if (images.zeroByte > 0) {
    push({
      id: 'SRC-IMAGE-ZERO-BYTE',
      area: 'images',
      entity: 'public/images',
      classification: 'INCORRECT',
      severity: 'medium',
      message: 'Zero-byte image files cannot be served as valid assets.',
      evidence: [`zero-byte files: ${images.zeroByte}`],
      sources: ['pokedex-backend/public/images'],
    });
  }

  if (duplicates === 0) {
    findings.push({
      id: 'SRC-WALKTHROUGH-NO-DUPLICATE',
      phase: 'MODULES',
      area: 'walkthrough',
      entity: 'walkthroughs.json',
      classification: 'CORRECT',
      severity: 'info',
      message: 'No duplicate (gameVersion, language, order, chapterTitle) natural keys in the curated seed file.',
      evidence: [`records parsed: ${walkthroughRaw.length}`],
      sources: [walkthroughPath],
    });
  }

  const missingWalkthroughVersions = supportedVersions.filter(
    (v) => !walkthrough.versions.includes(v),
  );
  if (missingWalkthroughVersions.length) {
    push({
      id: 'SRC-WALKTHROUGH-COVERAGE',
      area: 'walkthrough',
      entity: 'walkthroughs.json',
      classification: 'MISSING',
      severity: 'medium',
      message: 'Curated walkthrough content does not cover every supported game version.',
      evidence: [`missing versions: ${missingWalkthroughVersions.join(', ')}`],
      sources: [walkthroughPath, gameVersionsPath],
    });
  }

  const adminPath = 'pokedex-frontend/src/pages/AdminWalkthrough.tsx';
  if (existsSync(join(root, adminPath))) {
    const adminSource = read(root, adminPath);
    const options = extractBlock(adminSource, 'GAME_OPTIONS');
    const adminVersions = [...options.matchAll(/value:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    const adminMissing = supportedVersions.filter((v) => !adminVersions.includes(v));
    if (adminMissing.length) {
      push({
        id: 'SRC-ADMIN-WALKTHROUGH-VERSIONS',
        area: 'walkthrough',
        entity: 'AdminWalkthrough GAME_OPTIONS',
        classification: 'MISSING',
        severity: 'medium',
        message: 'CMS cannot create or edit walkthroughs for several supported games.',
        evidence: [`missing from admin options: ${adminMissing.join(', ')}`],
        sources: [adminPath, gameVersionsPath],
      });
    }
  }

  const naturePath = 'pokedex-frontend/src/pages/NatureDex.tsx';
  if (existsSync(join(root, naturePath))) {
    const natureSource = read(root, naturePath);
    const natures = [...extractBlock(natureSource, 'NATURES').matchAll(/\{\s*name:\s*['"]([^'"]+)['"]/g)];
    const typeDefs = read(root, 'pokedex-backend/src/graphql/typeDefs.ts');
    if (!/\bnature\s*\(/i.test(typeDefs) && !/type\s+Nature\b/i.test(typeDefs)) {
      push({
        id: 'SRC-NATUREDEX-STATIC',
        area: 'natures',
        entity: 'NatureDex',
        classification: 'UNSUPPORTED',
        severity: 'medium',
        message:
          'Nature data is hardcoded in the frontend and absent from Prisma/GraphQL; it cannot be audited, curated or versioned as data.',
        evidence: [`hardcoded natures: ${natures.length}`],
        sources: [naturePath, 'pokedex-backend/prisma/schema.prisma', 'pokedex-backend/src/graphql/typeDefs.ts'],
      });
    }
  }

  const frontendSources = ['src/pages/TeamBuilder.tsx', 'src/lib/teamStore.ts', 'src/lib/MyPokedexContext.tsx']
    .map((p) => `pokedex-frontend/${p}`)
    .filter((p) => existsSync(join(root, p)))
    .map((p) => read(root, p))
    .join('\n');
  if (/saveTeam/.test(read(root, 'pokedex-backend/src/graphql/typeDefs.ts')) && !/saveTeam/.test(frontendSources)) {
    push({
      id: 'SRC-SAVE-TEAM-UNUSED',
      area: 'user data',
      entity: 'saveTeam mutation',
      classification: 'UNVERIFIED',
      severity: 'low',
      message:
        'The server-side saveTeam mutation has no frontend caller; team builder state appears local-only, so DB team rows cannot be assumed complete.',
      evidence: ['no saveTeam reference in TeamBuilder/teamStore/MyPokedexContext'],
      sources: ['pokedex-backend/src/graphql/typeDefs.ts', 'pokedex-frontend/src/lib/teamStore.ts'],
      runtimeRequired: true,
    });
  }

  if (/data\.sprites\?\.other\?\.\["official-artwork"\]/.test(seed)) {
    push({
      id: 'SRC-SEED-REMOTE-IMAGE-URLS',
      area: 'images',
      entity: 'seed.ts imageUrl',
      classification: 'UNVERIFIED',
      severity: 'medium',
      message:
        'Seed writes remote PokéAPI artwork URLs into DB image fields while local WebP assets are produced by the updater. Actual DB image URLs require runtime verification.',
      evidence: ['imageUrl: data.sprites?.other?.["official-artwork"]?.front_default || null'],
      sources: [seedPath, 'pokedex-backend/src/services/image.service.ts'],
      runtimeRequired: true,
    });
  }

  const sourcePaths = [
    gameVersionsPath,
    walkthroughPath,
    seedPath,
    updaterPath,
    backendChartPath,
    damagePath,
    adminPath,
    naturePath,
  ];
  return {
    findings,
    snapshot: { supportedVersions, regionalDexByVersion, walkthrough, images, sourcePaths },
  };
}
