import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Finding } from './types.js';
import type { PokeApiClient } from './pokeApiClient.js';
import type { SourceSnapshot } from './sourceAudit.js';

const idFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean);
  return Number.parseInt(parts[parts.length - 1], 10);
};

const generationFromUrl = (url: string): number => {
  const segment = url.split('/').filter(Boolean).pop()?.replace('generation-', '') ?? '';
  if (/^\d+$/.test(segment)) return Number(segment);
  const map: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9 };
  return map[segment] ?? 0;
};

export function parseGenerationMap(source: string): Record<string, number> {
  const start = source.indexOf('getGameGeneration');
  const block = source.slice(start, source.indexOf('\n}', start) + 2);
  const result: Record<string, number> = {};
  for (const m of block.matchAll(/["']?([\w-]+)["']?:\s*(\d)\s*[,}]/g)) {
    result[m[1]] = Number(m[2]);
  }
  return result;
}

export function parseSeedGenerationRanges(source: string): Array<{ max: number; gen: number }> {
  const ranges: Array<{ max: number; gen: number }> = [];
  for (const m of source.matchAll(/if\s*\(\s*id\s*<=\s*(\d+)\s*\)\s*return\s*(\d+)/g)) {
    ranges.push({ max: Number(m[1]), gen: Number(m[2]) });
  }
  return ranges;
}

export interface ReferenceSnapshot {
  totals: Record<string, number>;
  generations: Array<{
    generation: number;
    speciesIds: number[];
    versionGroups: string[];
    moveCount: number;
    typeNames: string[];
  }>;
  versions: Array<{ name: string; versionGroup: string; generation: number }>;
  pokedexes: Array<{ name: string; entryCount: number; versionGroups: string[]; speciesNames: string[] }>;
  speciesSample: Array<{
    id: number;
    name: string;
    generation: number;
    varieties: string[];
    hasEvolutionChain: boolean;
    flavorTextLanguages: number;
    localNormalImage: boolean;
    localShinyImage: boolean;
  }>;
  pokemonDetails: Array<{
    id: number;
    name: string;
    generation: number;
    height: number;
    weight: number;
    baseExperience: number | null;
    stats: Record<string, number>;
    types: string[];
    abilities: Array<{ name: string; isHidden: boolean }>;
  }>;
  availabilitySample: Array<{ game: string; dex: string; sampleSpeciesPresent: string[] }>;
  encounterSample: Array<{ id: number; versions: string[] }>;
  learnsetSample: Array<{ id: number; versionGroupCount: number }>;
  apiErrors: string[];
}

export interface ReferenceAuditResult {
  findings: Finding[];
  reference: ReferenceSnapshot;
}

const DEFAULT_SAMPLE = [
  1, 4, 25, 150, 151, 152, 197, 252, 386, 393, 413, 427, 479, 493, 495, 550,
  555, 641, 649, 650, 678, 721, 722, 741, 777, 778, 800, 809, 810, 818, 869,
  905, 906, 915, 1000, 1010, 1024, 1025,
];

export async function auditReference(
  client: PokeApiClient,
  source: SourceSnapshot,
  root: string,
  speciesLimit = DEFAULT_SAMPLE.length,
): Promise<ReferenceAuditResult> {
  const findings: Finding[] = [];
  const apiErrors: string[] = [];
  const push = (f: Omit<Finding, 'id' | 'phase'> & { id: string }) =>
    findings.push({ phase: 'CROSSREF', ...f });

  const totals: Record<string, number> = {};
  const catalogs: Record<string, Array<{ name: string; url: string }>> = {};
  for (const endpoint of [
    'pokemon-species',
    'pokemon',
    'move',
    'ability',
    'item',
    'location',
    'nature',
    'type',
    'version',
    'version-group',
    'pokedex',
    'generation',
  ]) {
    const result = await client.listAll<{ name: string; url: string }>(endpoint, 3000);
    if (!result.data) {
      apiErrors.push(`${endpoint}: ${result.error ?? 'unknown error'}`);
      totals[endpoint] = 0;
      catalogs[endpoint] = [];
      continue;
    }
    totals[endpoint] = result.ok ? result.data.length : 0;
    catalogs[endpoint] = result.data;
    if (!result.ok) apiErrors.push(`${endpoint}: ${result.error}`);
  }

  const speciesIds = (catalogs['pokemon-species'] ?? [])
    .map((entry) => idFromUrl(entry.url))
    .filter((id) => Number.isFinite(id))
    .sort((a, b) => a - b);
  const speciesGaps = speciesIds.filter((id, index) => id !== index + 1);
  if (speciesIds.length && !speciesGaps.length) {
    push({
      id: 'API-SPECIES-IDS-CORRECT',
      area: 'master-data',
      entity: 'National Dex IDs',
      classification: 'CORRECT',
      severity: 'info',
      message: 'PokéAPI species IDs form a continuous range; the catalog contains no gaps.',
      evidence: [`ids 1..${speciesIds.length} (${speciesIds.length} species)`],
      sources: ['https://pokeapi.co/api/v2/pokemon-species'],
    });
  } else if (speciesGaps.length) {
    push({
      id: 'API-SPECIES-IDS-GAPS',
      area: 'master-data',
      entity: 'National Dex IDs',
      classification: 'INCORRECT',
      severity: 'high',
      message: 'Reference species catalog has gaps or non-sequential IDs.',
      evidence: [`first gaps: ${speciesGaps.slice(0, 10).join(', ')}`],
      sources: ['https://pokeapi.co/api/v2/pokemon-species'],
    });
  }

  const generations: ReferenceSnapshot['generations'] = [];
  for (let gen = 1; gen <= 9; gen += 1) {
    const result = await client.get<any>(`/generation/${gen}`);
    if (!result.data) {
      apiErrors.push(`generation/${gen}: ${result.error}`);
      continue;
    }
    generations.push({
      generation: gen,
      speciesIds: (result.data.pokemon_species ?? []).map((p: any) => idFromUrl(p.url)),
      versionGroups: (result.data.version_groups ?? []).map((v: any) => v.name),
      moveCount: (result.data.moves ?? []).length,
      typeNames: (result.data.types ?? []).map((t: any) => t.name),
    });
  }

  const versionGroups = new Map<string, number>();
  for (const group of catalogs['version-group'] ?? []) {
    const detail = await client.get<any>(`/version-group/${idFromUrl(group.url)}`);
    if (detail.data) {
      versionGroups.set(detail.data.name, generationFromUrl(detail.data.generation?.url ?? ''));
    }
  }

  const versions: ReferenceSnapshot['versions'] = [];
  const apiVersionNames = new Set((catalogs.version ?? []).map((v) => v.name));
  const missingVersionSlugs: string[] = [];
  const versionGenerationMismatch: string[] = [];
  const gameVersionsSource = readFileSync(
    join(root, 'pokedex-frontend/src/lib/gameVersions.ts'),
    'utf8',
  );
  const frontendGenMap = parseGenerationMap(gameVersionsSource);

  for (const slug of source.supportedVersions) {
    if (!apiVersionNames.has(slug)) {
      missingVersionSlugs.push(slug);
      continue;
    }
    const result = await client.get<any>(`/version/${slug}`);
    if (!result.data) {
      apiErrors.push(`version/${slug}: ${result.error}`);
      continue;
    }
    const groupName = result.data.version_group?.name ?? '';
    const gen = versionGroups.get(groupName) ?? 0;
    versions.push({ name: slug, versionGroup: groupName, generation: gen });
    const expected = frontendGenMap[slug];
    if (expected && gen && expected !== gen) {
      versionGenerationMismatch.push(`${slug}: frontend=${expected} api=${gen}`);
    }
  }

  if (missingVersionSlugs.length) {
    push({
      id: 'API-VERSION-SLUG-MISSING',
      area: 'game-specific',
      entity: 'supported game versions',
      classification: 'UNVERIFIED',
      severity: 'high',
      message:
        'Supported game slugs were not found in the PokéAPI version catalog. They may be unsupported by this reference source or use a different slug; do not infer data for them.',
      evidence: [`missing slugs: ${missingVersionSlugs.join(', ')}`],
      sources: ['https://pokeapi.co/api/v2/version', 'pokedex-frontend/src/lib/gameVersions.ts'],
      runtimeRequired: true,
    });
  }
  if (versionGenerationMismatch.length) {
    push({
      id: 'API-VERSION-GENERATION-MISMATCH',
      area: 'game-specific',
      entity: 'getGameGeneration',
      classification: 'INCORRECT',
      severity: 'high',
      message: 'Frontend generation mapping disagrees with PokéAPI version-group generation.',
      evidence: versionGenerationMismatch,
      sources: ['https://pokeapi.co/api/v2/version', 'pokedex-frontend/src/lib/gameVersions.ts'],
    });
  }

  if (!missingVersionSlugs.length && !versionGenerationMismatch.length && versions.length) {
    push({
      id: 'API-VERSIONS-CORRECT',
      area: 'game-specific',
      entity: 'supported game versions',
      classification: 'CORRECT',
      severity: 'info',
      message: 'Every frontend-supported game slug exists in PokéAPI and its generation agrees with the frontend mapping.',
      evidence: [`versions checked: ${versions.length}`],
      sources: ['https://pokeapi.co/api/v2/version', 'pokedex-frontend/src/lib/gameVersions.ts'],
    });
  }

  const apiDexNames = new Set((catalogs.pokedex ?? []).map((d) => d.name));
  const pokedexes: ReferenceSnapshot['pokedexes'] = [];
  const invalidDexSlugs: string[] = [];
  const dexVersionGroupMismatch: string[] = [];
  for (const slug of apiDexNames) {
    const result = await client.get<any>(`/pokedex/${slug}`);
    if (!result.data) {
      apiErrors.push(`pokedex/${slug}: ${result.error}`);
      continue;
    }
    const entries = result.data.pokemon_entries ?? [];
    const entryCount = entries.length;
    const versionGroups = (result.data.version_groups ?? []).map((v: any) => v.name);
    const speciesNames = entries
      .map((entry: any) => entry.pokemon_species?.name)
      .filter(Boolean);
    pokedexes.push({ name: slug, entryCount, versionGroups, speciesNames });
  }
  const dexByName = new Map(pokedexes.map((dex) => [dex.name, dex]));
  for (const [game, dex] of Object.entries(source.regionalDexByVersion)) {
    if (!apiDexNames.has(dex)) {
      invalidDexSlugs.push(dex);
      continue;
    }
    const version = versions.find((v) => v.name === game);
    const mappedDex = dexByName.get(dex);
    if (!version || !mappedDex || mappedDex.versionGroups.includes(version.versionGroup)) continue;
    const candidates = pokedexes
      .filter((candidate) => candidate.name !== dex && candidate.versionGroups.includes(version.versionGroup))
      .map((candidate) => candidate.name);
    dexVersionGroupMismatch.push(
      `${game} (vg=${version.versionGroup}) mapped=${dex}; apiCandidates=${candidates.join('|') || 'none'}`,
    );
  }
  if (invalidDexSlugs.length) {
    push({
      id: 'API-DEX-SLUG-MISSING',
      area: 'game-specific',
      entity: 'GAME_TO_REGIONAL_DEX',
      classification: 'INCORRECT',
      severity: 'medium',
      message: 'Mapped regional dex slugs do not exist in the PokéAPI pokedex catalog.',
      evidence: [`invalid slugs: ${invalidDexSlugs.join(', ')}`],
      sources: ['https://pokeapi.co/api/v2/pokedex', 'pokedex-frontend/src/lib/gameVersions.ts'],
    });
  }
  if (dexVersionGroupMismatch.length) {
    push({
      id: 'API-DEX-VERSION-MISMATCH',
      area: 'game-specific',
      entity: 'regional dex / version group',
      classification: 'INCORRECT',
      severity: 'medium',
      message: 'A game maps to a regional dex whose version groups exclude that game.',
      evidence: dexVersionGroupMismatch,
      sources: ['https://pokeapi.co/api/v2/pokedex', 'pokedex-frontend/src/lib/gameVersions.ts'],
    });
  }

  if (!invalidDexSlugs.length) {
    push({
      id: 'API-DEX-SLUGS-CORRECT',
      area: 'game-specific',
      entity: 'GAME_TO_REGIONAL_DEX',
      classification: 'CORRECT',
      severity: 'info',
      message: 'All mapped regional dex slugs exist in the PokéAPI pokedex catalog.',
      evidence: [`mapped dexes checked: ${new Set(Object.values(source.regionalDexByVersion)).size}`],
      sources: ['https://pokeapi.co/api/v2/pokedex', 'pokedex-frontend/src/lib/gameVersions.ts'],
    });
  }

  const seedSource = readFileSync(join(root, 'pokedex-backend/scripts/seed.ts'), 'utf8');
  const seedRanges = parseSeedGenerationRanges(seedSource);
  const lastRange = seedRanges[seedRanges.length - 1];
  const generationRangeMismatch: string[] = [];
  for (const gen of generations) {
    const range = seedRanges.find((r) => r.gen === gen.generation);
    const expected = range
      ? gen.speciesIds.filter((id) => id <= range.max).length
      : lastRange
        ? gen.speciesIds.filter((id) => id > lastRange.max).length
        : 0;
    if (expected !== gen.speciesIds.length) {
      generationRangeMismatch.push(
        `gen ${gen.generation}: seed ${range ? `<=${range.max}` : `>${lastRange?.max ?? 'n/a'}`} covers ${expected}/${gen.speciesIds.length} species`,
      );
    }
  }
  if (generationRangeMismatch.length) {
    push({
      id: 'API-GENERATION-RANGE-MISMATCH',
      area: 'master-data',
      entity: 'seed getGeneration(id)',
      classification: 'INCORRECT',
      severity: 'high',
      message: 'ID ranges used to infer generation disagree with PokéAPI generation membership.',
      evidence: generationRangeMismatch,
      sources: ['https://pokeapi.co/api/v2/generation', 'pokedex-backend/scripts/seed.ts'],
    });
  } else if (generations.length) {
    push({
      id: 'API-GENERATION-COVERAGE-CORRECT',
      area: 'master-data',
      entity: 'seed getGeneration(id)',
      classification: 'CORRECT',
      severity: 'info',
      message: 'ID ranges used by the seed match PokéAPI species membership for all nine generations.',
      evidence: generations.map((g) => `gen ${g.generation}=${g.speciesIds.length}`),
      sources: ['https://pokeapi.co/api/v2/generation', 'pokedex-backend/scripts/seed.ts'],
    });
  }

  const sampleIds = DEFAULT_SAMPLE.slice(0, Math.max(1, speciesLimit)).filter(
    (id) => id <= (totals['pokemon-species'] || id),
  );
  const speciesSample: ReferenceSnapshot['speciesSample'] = [];
  const missingImages: string[] = [];
  const missingEvolutionChain: string[] = [];
  const missingFlavorText: string[] = [];
  for (const id of sampleIds) {
    const result = await client.get<any>(`/pokemon-species/${id}`);
    if (!result.data) {
      apiErrors.push(`pokemon-species/${id}: ${result.error}`);
      continue;
    }
    const data = result.data;
    const varieties = (data.varieties ?? []).map((v: any) => v.pokemon?.name).filter(Boolean);
    const imageNames = [...new Set([data.name, ...varieties])];
    const localNormalImage = imageNames.some((name) =>
      existsSync(join(root, `pokedex-backend/public/images/pokemon/normal/${name}.webp`)),
    );
    const localShinyImage = imageNames.some((name) =>
      existsSync(join(root, `pokedex-backend/public/images/pokemon/shiny/${name}.webp`)),
    );
    if (!localNormalImage || !localShinyImage) {
      missingImages.push(
        `${id} ${data.name}: normal=${localNormalImage} shiny=${localShinyImage}`,
      );
    }
    if (!data.evolution_chain?.url) missingEvolutionChain.push(`${id} ${data.name}`);
    const flavorLanguages = new Set(
      (data.flavor_text_entries ?? []).map((entry: any) => entry.language?.name),
    );
    if (!flavorLanguages.has('en') || !flavorLanguages.has('vi')) {
      missingFlavorText.push(`${id} ${data.name}: en=${flavorLanguages.has('en')} vi=${flavorLanguages.has('vi')}`);
    }
    speciesSample.push({
      id,
      name: data.name,
      generation: generationFromUrl(data.generation?.url ?? ''),
      varieties,
      hasEvolutionChain: Boolean(data.evolution_chain?.url),
      flavorTextLanguages: flavorLanguages.size,
      localNormalImage,
      localShinyImage,
    });
  }

  const pokemonDetails: ReferenceSnapshot['pokemonDetails'] = [];
  for (const { id } of speciesSample) {
    const result = await client.get<any>(`/pokemon/${id}`);
    if (!result.data) {
      apiErrors.push(`pokemon/${id}: ${result.error}`);
      continue;
    }
    const data = result.data;
    const stats: Record<string, number> = {};
    for (const stat of data.stats ?? []) {
      if (stat.stat?.name) stats[stat.stat.name] = stat.base_stat;
    }
    pokemonDetails.push({
      id,
      name: data.name,
      generation: speciesSample.find((species) => species.id === id)?.generation ?? 0,
      height: data.height,
      weight: data.weight,
      baseExperience: data.base_experience ?? null,
      stats,
      types: (data.types ?? [])
        .slice()
        .sort((a: any, b: any) => a.slot - b.slot)
        .map((entry: any) => entry.type?.name)
        .filter(Boolean),
      abilities: (data.abilities ?? [])
        .map((entry: any) => ({
          name: entry.ability?.name,
          isHidden: Boolean(entry.is_hidden),
        }))
        .filter((entry: any) => entry.name),
    });
  }

  const availabilitySample: ReferenceSnapshot['availabilitySample'] = [];
  const sampleNames = speciesSample.map((species) => species.name);
  for (const [game, dex] of Object.entries(source.regionalDexByVersion)) {
    const dexInfo = dexByName.get(dex);
    if (!dexInfo) continue;
    const present = new Set(dexInfo.speciesNames);
    availabilitySample.push({
      game,
      dex,
      sampleSpeciesPresent: sampleNames.filter((name) => present.has(name)),
    });
  }

  if (missingImages.length) {
    push({
      id: 'API-IMAGE-SAMPLE-MISSING',
      area: 'images',
      entity: 'local WebP assets',
      classification: 'MISSING',
      severity: 'medium',
      message: 'Sampled species lack local normal/shiny WebP assets. DB imageUrl may still point to remote PokeAPI URLs; runtime verification is required.',
      evidence: missingImages.slice(0, 12),
      sources: ['https://pokeapi.co/api/v2/pokemon-species', 'pokedex-backend/public/images'],
      runtimeRequired: true,
    });
  }
  if (!missingImages.length && speciesSample.length) {
    push({
      id: 'API-IMAGE-SAMPLE-CORRECT',
      area: 'images',
      entity: 'local WebP assets',
      classification: 'CORRECT',
      severity: 'info',
      message: 'Every sampled species has at least one local normal and shiny WebP asset under a species or variety name.',
      evidence: [`species sampled: ${speciesSample.length}`],
      sources: ['pokedex-backend/public/images', 'https://pokeapi.co/api/v2/pokemon-species'],
    });
  }
  if (missingEvolutionChain.length) {
    push({
      id: 'API-EVOLUTION-SAMPLE-MISSING',
      area: 'evolution',
      entity: 'evolution chains',
      classification: 'MISSING',
      severity: 'low',
      message: 'Sampled species have no evolution chain URL in the reference source.',
      evidence: missingEvolutionChain.slice(0, 12),
      sources: ['https://pokeapi.co/api/v2/pokemon-species'],
    });
  }
  if (missingFlavorText.length) {
    push({
      id: 'API-DESCRIPTION-LANGUAGE-COVERAGE',
      area: 'master-data',
      entity: 'descriptions',
      classification: 'UNVERIFIED',
      severity: 'low',
      message: 'Sampled species do not expose both en and vi flavor text from PokéAPI; curated descriptions cannot be sourced from this reference alone.',
      evidence: missingFlavorText.slice(0, 12),
      sources: ['https://pokeapi.co/api/v2/pokemon-species'],
      runtimeRequired: true,
    });
  }

  const encounterSample: ReferenceSnapshot['encounterSample'] = [];
  for (const id of sampleIds.slice(0, 8)) {
    const result = await client.get<any[]>(`/pokemon/${id}/encounters`);
    if (!result.data) {
      apiErrors.push(`pokemon/${id}/encounters: ${result.error}`);
      continue;
    }
    encounterSample.push({
      id,
      versions: [...new Set(result.data.map((e: any) => e.version?.name).filter(Boolean))].sort(),
    });
  }

  const learnsetSample: ReferenceSnapshot['learnsetSample'] = [];
  for (const id of sampleIds.slice(0, 4)) {
    const result = await client.get<any>(`/pokemon/${id}`);
    if (!result.data) {
      apiErrors.push(`pokemon/${id}: ${result.error}`);
      continue;
    }
    const groups = new Set<string>();
    for (const move of result.data.moves ?? []) {
      for (const detail of move.version_group_details ?? []) {
        if (detail.version_group?.name) groups.add(detail.version_group.name);
      }
    }
    learnsetSample.push({ id, versionGroupCount: groups.size });
  }
  if (learnsetSample.some((s) => s.versionGroupCount > 0)) {
    push({
      id: 'API-LEARNSET-VERSION-DETAIL',
      area: 'game-specific',
      entity: 'learnsets',
      classification: 'MISSING',
      severity: 'high',
      message:
        'Reference learnsets carry per-version-group detail, but the local PokemonMove model has no version dimension; imported learnsets cannot be validated per game.',
      evidence: learnsetSample.map((s) => `species ${s.id}: ${s.versionGroupCount} version groups`),
      sources: ['https://pokeapi.co/api/v2/pokemon/{id}', 'pokedex-backend/prisma/schema.prisma'],
    });
  }

  const reference: ReferenceSnapshot = {
    totals,
    generations,
    versions,
    pokedexes,
    speciesSample,
    pokemonDetails,
    availabilitySample,
    encounterSample,
    learnsetSample,
    apiErrors,
  };
  return { findings, reference };
}
