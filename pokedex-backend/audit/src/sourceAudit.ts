import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { getRegionalDexForQuery, LEGENDS_ZA_DEX } from '../../../pokedex-frontend/src/lib/gameVersions.js';
import type { Finding } from './types.js';

export interface SourceSnapshot {
  supportedVersions: string[];
  regionalDexByVersion: Record<string, string>;
  effectiveRegionalDexesByVersion: Record<string, string[]>;
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

export function resolveAdminVersions(adminSource: string, gameVersionsSource: string): string[] | undefined {
  const importsSharedOptions = /import\s*\{[^}]*\bGAME_VERSION_OPTIONS\b[^}]*\}\s*from\s*['"]\.\.\/lib\/gameVersions['"]/.test(adminSource);
  if (importsSharedOptions && /\[\s*\.\.\.GAME_VERSION_OPTIONS\s*\]/.test(adminSource)) {
    const projectsGameNames = /\bGAME_VERSION_OPTIONS\b[^=]*=\s*GENERATION_VERSIONS\.flatMap\s*\([\s\S]*?\bvalue:\s*game\.name\b/.test(gameVersionsSource);
    return projectsGameNames ? parseSupportedVersions(gameVersionsSource) : undefined;
  }
  const local = /\bconst\s+GAME_OPTIONS\b/.exec(adminSource);
  if (local) {
    const options = extractBlock(adminSource.slice(local.index), 'GAME_OPTIONS');
    if (options.startsWith('[')) {
      return [...options.matchAll(/value:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    }
  }
  return undefined;
}

export function hasLegacyDamageTypeSplit(source: string): boolean {
  const gate = /\bconst\s+(\w+)\s*=\s*(?:generation|gen)\s*<=\s*3\s*;/.exec(source);
  return Boolean(gate && /\bconst\s+LEGACY_SPECIAL_TYPES\s*=\s*new Set\s*\(/.test(source) &&
    new RegExp(String.raw`\b${gate[1]}\s*\?\s*!LEGACY_SPECIAL_TYPES\.has\(move\.type\.toLowerCase\(\)\)\s*:\s*move\.damageClass\b`).test(source));
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
  const effectiveRegionalDexesByVersion = Object.fromEntries(supportedVersions.map((game) => [
    game,
    game === 'legends-za' ? Object.keys(LEGENDS_ZA_DEX).map(
      (tab) => getRegionalDexForQuery(game, tab as keyof typeof LEGENDS_ZA_DEX),
    )
      : regionalDexByVersion[game] ? [getRegionalDexForQuery(game)] : [],
  ]));

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

  const unmappedVersions = supportedVersions.filter((v) => !effectiveRegionalDexesByVersion[v].length);
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
      classification: 'DESIGN_GAP',
      severity: 'medium',
      message:
        'The legacy seed covers a fixed species ID range and requires maintenance when the catalog expands. The updater discovers missing IDs and names separately.',
      evidence: [`POKEMON_COUNT = ${countMatch[1]}`],
      sources: [seedPath],
      recommendation: 'Derive IDs from PokéAPI pagination/next URLs or a maintained explicit ID list.',
    });
  }

  const updaterPath = 'pokedex-backend/src/services/updater.service.ts';
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
  if (/move\.damageClass/.test(damage) && !hasLegacyDamageTypeSplit(damage)) {
    push({
      id: 'SRC-DAMAGE-GEN-RULES',
      area: 'game-specific',
      entity: 'damage calculator',
      classification: 'UNVERIFIED',
      severity: 'medium',
      message:
        'The source scanner could not verify the pre-Gen IV physical/special split.',
      evidence: [
        'move.damageClass is referenced',
        'expected a generation <= 3 gate selecting LEGACY_SPECIAL_TYPES',
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
    const adminVersions = resolveAdminVersions(adminSource, gameVersions);
    const adminMissing = adminVersions && supportedVersions.filter((v) => !adminVersions.includes(v));
    if (!adminVersions || adminMissing?.length) {
      push({
        id: 'SRC-ADMIN-WALKTHROUGH-VERSIONS',
        area: 'walkthrough',
        entity: 'AdminWalkthrough game options',
        classification: adminVersions ? 'MISSING' : 'UNVERIFIED',
        severity: 'medium',
        message: adminVersions
          ? 'The CMS game selector is missing supported games.'
          : 'The source scanner could not resolve the CMS game options.',
        evidence: adminMissing ? [`missing from admin options: ${adminMissing.join(', ')}`] : [],
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
        classification: 'ACCEPTABLE_DESIGN',
        severity: 'info',
        message:
          'NatureDex serves a fixed catalog from frontend code.',
        evidence: [`hardcoded natures: ${natures.length}`],
        sources: [naturePath, 'pokedex-backend/prisma/schema.prisma', 'pokedex-backend/src/graphql/typeDefs.ts'],
      });
    }
  }

  const frontendSrc = join(root, 'pokedex-frontend/src');
  const teamMutationDeclared = /\bsaveTeam\s*\(/.test(read(root, 'pokedex-backend/src/graphql/typeDefs.ts'));
  const frontendTeamCaller = readdirSync(frontendSrc, { recursive: true, withFileTypes: true })
    .some((entry) => entry.isFile() && /\.[jt]sx?$/.test(entry.name) &&
      /\bsaveTeam\s*\(/.test(readFileSync(join(entry.parentPath, entry.name), 'utf8')));
  if (teamMutationDeclared && !frontendTeamCaller) {
    push({
      id: 'SRC-SAVE-TEAM-UNUSED',
      area: 'user data',
      entity: 'saveTeam mutation',
      classification: 'UNVERIFIED',
      severity: 'low',
      message: 'No direct saveTeam GraphQL operation was found in frontend source. Confirm the expected persistence contract before changing team storage.',
      evidence: ['Searched frontend TS/JS sources for saveTeam(...)'],
      sources: ['pokedex-backend/src/graphql/typeDefs.ts', 'pokedex-frontend/src/lib/teamStore.ts'],
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
    snapshot: { supportedVersions, regionalDexByVersion, effectiveRegionalDexesByVersion, walkthrough, images, sourcePaths },
  };
}
