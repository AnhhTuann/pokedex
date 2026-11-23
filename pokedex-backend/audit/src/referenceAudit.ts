import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Finding } from './types.js';
import { mapWithConcurrency, type PokeApiClient } from './pokeApiClient.js';
import type { SourceSnapshot } from './sourceAudit.js';
import {
  catalogKey,
  checkpointPath,
  loadCheckpoint,
  saveCheckpoint,
  type CheckpointRecord,
  type CheckpointState,
} from './checkpoint.js';

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
  const mapStart = source.indexOf('export const GAME_TO_GENERATION');
  const start = mapStart >= 0 ? mapStart : source.indexOf('getGameGeneration');
  const endMarker = mapStart >= 0 ? '};' : '\n}';
  const end = source.indexOf(endMarker, start);
  const block = end >= 0 ? source.slice(start, end + endMarker.length) : source.slice(start);
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
  counts: {
    species: number;
    pokemonForms: number;
    varieties: number;
    versions: number;
    dexes: number;
    generations: number;
    speciesAudited: number;
  };
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
  formAudit: Array<{
    id: number;
    varieties: number;
    formsChecked: number;
    missingNormalImages: string[];
    missingShinyImages: string[];
  }>;
  evolutionSample: Array<{ id: number; requirementCount: number; conditions: string[] }>;
  availabilitySample: Array<{ game: string; dex: string; sampleSpeciesPresent: string[] }>;
  encounterSample: Array<{ id: number; versions: string[] }>;
  learnsetSample: Array<{ id: number; versionGroupCount: number }>;
  checkpoint: { key: string; resumedIds: number[]; failedIds: string[] };
  apiErrors: string[];
}

export interface ReferenceAuditResult {
  findings: Finding[];
  reference: ReferenceSnapshot;
}

export interface ReferenceAuditOptions {
  allSpecies?: boolean;
  speciesIds?: number[];
  resume?: boolean;
  checkpointPath?: string;
  concurrency?: number;
  batchSize?: number;
  onProgress?: (completed: number, total: number) => void;
}

const DEFAULT_SAMPLE = [
  1, 4, 25, 150, 151, 152, 197, 252, 386, 393, 413, 427, 479, 493, 495, 550,
  555, 641, 649, 650, 678, 721, 722, 741, 777, 778, 800, 809, 810, 818, 869,
  905, 906, 915, 1000, 1010, 1024, 1025,
];

const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const statsFrom = (data: any): Record<string, number> => {
  const stats: Record<string, number> = {};
  for (const stat of asArray<any>(data?.stats)) {
    if (stat.stat?.name) stats[stat.stat.name] = stat.base_stat;
  }
  return stats;
};

const typesFrom = (data: any): string[] =>
  asArray<any>(data?.types)
    .slice()
    .sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0))
    .map((entry) => entry.type?.name)
    .filter(Boolean);

const abilitiesFrom = (data: any): Array<{ name: string; isHidden: boolean }> =>
  asArray<any>(data?.abilities)
    .map((entry) => ({ name: entry.ability?.name, isHidden: Boolean(entry.is_hidden) }))
    .filter((entry) => Boolean(entry.name));

function evolutionConditions(chain: any): string[] {
  const result: string[] = [];
  const visit = (node: any) => {
    for (const next of asArray<any>(node?.evolves_to)) {
      for (const detail of asArray<any>(next.evolution_details)) {
        const parts: string[] = [];
        if (detail.trigger?.name) parts.push(`trigger=${detail.trigger.name}`);
        if (detail.min_level !== null && detail.min_level !== undefined) parts.push(`level=${detail.min_level}`);
        if (detail.item?.name) parts.push(`item=${detail.item.name}`);
        if (detail.held_item?.name) parts.push(`held=${detail.held_item.name}`);
        if (detail.is_trade) parts.push('trade=true');
        if (detail.min_happiness) parts.push(`friendship=${detail.min_happiness}`);
        if (detail.min_affection) parts.push(`affection=${detail.min_affection}`);
        if (detail.time_of_day) parts.push(`time=${detail.time_of_day}`);
        if (detail.known_move?.name) parts.push(`knownMove=${detail.known_move.name}`);
        if (detail.location?.name) parts.push(`location=${detail.location.name}`);
        if (detail.gender !== null && detail.gender !== undefined) parts.push(`gender=${detail.gender}`);
        if (detail.needs_overworld_rain) parts.push('rain=true');
        if (detail.turn_upside_down) parts.push('upsideDown=true');
        if (parts.length) result.push(parts.join(','));
      }
      visit(next);
    }
  };
  visit(chain);
  return [...new Set(result)].sort();
}

export async function auditReference(
  client: PokeApiClient,
  source: SourceSnapshot,
  root: string,
  speciesLimit = DEFAULT_SAMPLE.length,
  options: ReferenceAuditOptions = {},
): Promise<ReferenceAuditResult> {
  const findings: Finding[] = [];
  const apiErrors: string[] = [];
  const push = (f: Omit<Finding, 'id' | 'phase'> & { id: string }) =>
    findings.push({ phase: 'CROSSREF', ...f });

  const totals: Record<string, number> = {};
  const catalogs: Record<string, Array<{ name: string; url: string }>> = {};
  for (const endpoint of [
    'pokemon-species', 'pokemon', 'move', 'ability', 'item', 'location',
    'nature', 'type', 'version', 'version-group', 'pokedex', 'generation',
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

  const allSpeciesIds = (catalogs['pokemon-species'] ?? [])
    .map((entry) => idFromUrl(entry.url))
    .filter((id) => Number.isFinite(id) && id > 0)
    .sort((a, b) => a - b);
  const speciesGaps = allSpeciesIds.filter((id, index) => id !== index + 1);
  if (allSpeciesIds.length && !speciesGaps.length) {
    push({
      id: 'API-SPECIES-IDS-CORRECT',
      area: 'master-data',
      entity: 'National Dex IDs',
      classification: 'CORRECT',
      severity: 'info',
      message: 'PokéAPI species IDs form a continuous range; the catalog contains no gaps.',
      evidence: [`ids 1..${allSpeciesIds.length} (${allSpeciesIds.length} species)`],
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
      speciesIds: asArray<any>(result.data.pokemon_species).map((p) => idFromUrl(p.url)).sort((a, b) => a - b),
      versionGroups: asArray<any>(result.data.version_groups).map((v) => v.name),
      moveCount: asArray<any>(result.data.moves).length,
      typeNames: asArray<any>(result.data.types).map((t) => t.name),
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
  const gameVersionsSource = readFileSync(join(root, 'pokedex-frontend/src/lib/gameVersions.ts'), 'utf8');
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
      message: 'Supported game slugs were not found in the PokéAPI version catalog. They may be unsupported by this reference source or use a different slug; do not infer data for them.',
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
  for (const slug of [...apiDexNames].sort()) {
    const result = await client.get<any>(`/pokedex/${slug}`);
    if (!result.data) {
      apiErrors.push(`pokedex/${slug}: ${result.error}`);
      continue;
    }
    const entries = asArray<any>(result.data.pokemon_entries);
    const versionGroupsForDex = asArray<any>(result.data.version_groups).map((v) => v.name);
    pokedexes.push({
      name: slug,
      entryCount: entries.length,
      versionGroups: versionGroupsForDex,
      speciesNames: entries.map((entry) => entry.pokemon_species?.name).filter(Boolean).sort(),
    });
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

  const key = catalogKey(allSpeciesIds.length ? allSpeciesIds : (options.speciesIds ?? DEFAULT_SAMPLE));
  const checkpointFile = options.checkpointPath ?? join('audit', '.cache', 'pokeapi', 'checkpoints', `${key}.json`);
  const checkpoint: CheckpointState = loadCheckpoint(checkpointFile, key, Boolean(options.resume));
  const requestedIds = options.speciesIds
    ? [...options.speciesIds]
    : options.allSpecies || speciesLimit <= 0
      ? allSpeciesIds
      : DEFAULT_SAMPLE.slice(0, speciesLimit);
  const targetIds = [...new Set(requestedIds)]
    .filter((id) => Number.isFinite(id) && id > 0 && (!allSpeciesIds.length || allSpeciesIds.includes(id)))
    .sort((a, b) => a - b);
  const resumedIds = targetIds.filter((id) => checkpoint.completedIds.includes(id)).sort((a, b) => a - b);
  const pendingIds = targetIds.filter((id) => !checkpoint.completedIds.includes(id));
  const concurrency = Math.max(1, options.concurrency ?? 6);
  const batchSize = Math.max(1, options.batchSize ?? 20);

  const auditOne = async (id: number): Promise<{ id: number; record?: CheckpointRecord; error?: string }> => {
    const errors: string[] = [];
    const speciesResult = await client.get<any>(`/pokemon-species/${id}`);
    if (!speciesResult.data) return { id, error: `pokemon-species/${id}: ${speciesResult.error}` };
    const species = speciesResult.data;
    const detailResult = await client.get<any>(`/pokemon/${id}`);
    if (!detailResult.data) errors.push(`pokemon/${id}: ${detailResult.error}`);
    const detail = detailResult.data ?? {};

    const varietyNames: string[] = [];
    const varietyForms: CheckpointRecord['varietyForms'] = [];
    for (const variety of asArray<any>(species.varieties)) {
      const name = variety.pokemon?.name;
      if (!name) continue;
      varietyNames.push(name);
      const formResult = await client.get<any>(variety.pokemon.url ?? `/pokemon/${name}`);
      if (!formResult.data) {
        errors.push(`pokemon variety ${name}: ${formResult.error}`);
        continue;
      }
      const formId = idFromUrl(variety.pokemon.url ?? '') || 0;
      varietyForms.push({
        name,
        apiId: formId,
        stats: statsFrom(formResult.data),
        types: typesFrom(formResult.data),
      });
    }
    varietyNames.sort();

    let conditions: string[] = [];
    if (species.evolution_chain?.url) {
      const chainResult = await client.get<any>(species.evolution_chain.url);
      if (!chainResult.data) errors.push(`evolution-chain: ${chainResult.error}`);
      else conditions = evolutionConditions(chainResult.data.chain ?? chainResult.data);
    }

    const encounterResult = await client.get<any[]>(`/pokemon/${id}/encounters`);
    const encounterVersions = encounterResult.data
      ? [...new Set(asArray<any>(encounterResult.data).map((e) => e.version?.name).filter(Boolean))].sort()
      : [];
    if (!encounterResult.data) errors.push(`pokemon/${id}/encounters: ${encounterResult.error}`);

    const learnsetVersionGroups = [
      ...new Set(
        asArray<any>(detail.moves).flatMap((move) =>
          asArray<any>(move.version_group_details)
            .map((entry) => entry.version_group?.name)
            .filter(Boolean),
        ),
      ),
    ].sort();

    const imageNames = [...new Set([species.name, ...varietyNames])].sort();
    const normalDir = join(root, 'pokedex-backend/public/images/pokemon/normal');
    const shinyDir = join(root, 'pokedex-backend/public/images/pokemon/shiny');
    const missingNormalImages = imageNames.filter((name) => !existsSync(join(normalDir, `${name}.webp`)));
    const missingShinyImages = imageNames.filter((name) => !existsSync(join(shinyDir, `${name}.webp`)));
    const flavorTextLanguages = [
      ...new Set(asArray<any>(species.flavor_text_entries).map((entry) => entry.language?.name).filter(Boolean)),
    ].sort();

    if (errors.length) return { id, error: errors.join('; ') };
    return {
      id,
      record: {
        id,
        name: species.name,
        generation: generationFromUrl(species.generation?.url ?? ''),
        varieties: varietyNames,
        hasEvolutionChain: Boolean(species.evolution_chain?.url),
        evolutionConditions: conditions,
        flavorTextLanguages,
        localNormalImages: imageNames.filter((name) => !missingNormalImages.includes(name)),
        localShinyImages: imageNames.filter((name) => !missingShinyImages.includes(name)),
        missingNormalImages,
        missingShinyImages,
        height: detail.height ?? 0,
        weight: detail.weight ?? 0,
        baseExperience: detail.base_experience ?? null,
        stats: statsFrom(detail),
        types: typesFrom(detail),
        abilities: abilitiesFrom(detail),
        varietyForms: varietyForms.sort((a, b) => a.name.localeCompare(b.name)),
        encounterVersions,
        learnsetVersionGroups,
        errors: [],
      },
    };
  };

  let completed = resumedIds.length;
  for (let offset = 0; offset < pendingIds.length; offset += batchSize) {
    const batch = pendingIds.slice(offset, offset + batchSize);
    const results = await mapWithConcurrency(batch, concurrency, auditOne);
    for (const result of results) {
      if (result.record) {
        checkpoint.records[String(result.id)] = result.record;
        if (!checkpoint.completedIds.includes(result.id)) checkpoint.completedIds.push(result.id);
        delete checkpoint.failed[String(result.id)];
        completed += 1;
      } else {
        checkpoint.failed[String(result.id)] = result.error ?? 'unknown error';
        apiErrors.push(`species ${result.id}: ${result.error}`);
      }
    }
    checkpoint.completedIds.sort((a, b) => a - b);
    saveCheckpoint(checkpointFile, checkpoint);
    options.onProgress?.(completed, targetIds.length);
  }

  const records = targetIds
    .map((id) => checkpoint.records[String(id)])
    .filter((record): record is CheckpointRecord => Boolean(record));

  const speciesSample: ReferenceSnapshot['speciesSample'] = records.map((record) => ({
    id: record.id,
    name: record.name,
    generation: record.generation,
    varieties: record.varieties,
    hasEvolutionChain: record.hasEvolutionChain,
    flavorTextLanguages: record.flavorTextLanguages.length,
    localNormalImage: record.missingNormalImages.length === 0,
    localShinyImage: record.missingShinyImages.length === 0,
  }));
  const pokemonDetails: ReferenceSnapshot['pokemonDetails'] = records.map((record) => ({
    id: record.id,
    name: record.name,
    generation: record.generation,
    height: record.height,
    weight: record.weight,
    baseExperience: record.baseExperience,
    stats: record.stats,
    types: record.types,
    abilities: record.abilities,
  }));
  const formAudit: ReferenceSnapshot['formAudit'] = records.map((record) => ({
    id: record.id,
    varieties: record.varieties.length,
    formsChecked: record.varietyForms.length,
    missingNormalImages: record.missingNormalImages,
    missingShinyImages: record.missingShinyImages,
  }));
  const evolutionSample: ReferenceSnapshot['evolutionSample'] = records.map((record) => ({
    id: record.id,
    requirementCount: record.evolutionConditions.length,
    conditions: record.evolutionConditions,
  }));
  const encounterSample: ReferenceSnapshot['encounterSample'] = records.map((record) => ({
    id: record.id,
    versions: record.encounterVersions,
  }));
  const learnsetSample: ReferenceSnapshot['learnsetSample'] = records.map((record) => ({
    id: record.id,
    versionGroupCount: record.learnsetVersionGroups.length,
  }));

  const missingImages = formAudit.flatMap((record) => [
    ...record.missingNormalImages.map((name) => `${record.id} ${name}: normal missing`),
    ...record.missingShinyImages.map((name) => `${record.id} ${name}: shiny missing`),
  ]);
  if (missingImages.length) {
    push({
      id: 'API-IMAGE-SAMPLE-MISSING',
      area: 'images',
      entity: 'local WebP assets',
      classification: 'MISSING',
      severity: 'medium',
      message: 'Audited species or variety names lack local normal/shiny WebP assets. DB imageUrl may still point to remote PokeAPI URLs; runtime verification is required.',
      evidence: missingImages.slice(0, 12),
      sources: ['https://pokeapi.co/api/v2/pokemon-species', 'pokedex-backend/public/images'],
      runtimeRequired: true,
    });
  } else if (records.length) {
    push({
      id: 'API-IMAGE-SAMPLE-CORRECT',
      area: 'images',
      entity: 'local WebP assets',
      classification: 'CORRECT',
      severity: 'info',
      message: 'Every audited species and variety has local normal and shiny WebP assets.',
      evidence: [`species audited: ${records.length}`],
      sources: ['pokedex-backend/public/images', 'https://pokeapi.co/api/v2/pokemon-species'],
    });
  }

  const missingEvolutionChain = speciesSample.filter((species) => !species.hasEvolutionChain);
  if (missingEvolutionChain.length) {
    push({
      id: 'API-EVOLUTION-SAMPLE-MISSING',
      area: 'evolution',
      entity: 'evolution chains',
      classification: 'UNVERIFIED',
      severity: 'low',
      message: 'Audited species have no evolution chain URL in the reference source; evolution requirements cannot be asserted for them.',
      evidence: missingEvolutionChain.slice(0, 12).map((s) => `${s.id} ${s.name}`),
      sources: ['https://pokeapi.co/api/v2/pokemon-species'],
      runtimeRequired: true,
    });
  }

  const missingFlavorText = records.filter(
    (record) => !record.flavorTextLanguages.includes('en') || !record.flavorTextLanguages.includes('vi'),
  );
  if (missingFlavorText.length) {
    push({
      id: 'API-DESCRIPTION-LANGUAGE-COVERAGE',
      area: 'master-data',
      entity: 'descriptions',
      classification: 'UNVERIFIED',
      severity: 'low',
      message: 'Audited species do not expose both en and vi flavor text from PokéAPI; curated descriptions cannot be sourced from this reference alone.',
      evidence: missingFlavorText.slice(0, 12).map((r) => `${r.id} ${r.name}: ${r.flavorTextLanguages.join('/') || 'none'}`),
      sources: ['https://pokeapi.co/api/v2/pokemon-species'],
      runtimeRequired: true,
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

  if (learnsetSample.some((s) => s.versionGroupCount > 0)) {
    push({
      id: 'API-LEARNSET-VERSION-DETAIL',
      area: 'game-specific',
      entity: 'learnsets',
      classification: 'MISSING',
      severity: 'high',
      message: 'Reference learnsets carry per-version-group detail, but the local PokemonMove model has no version dimension; imported learnsets cannot be validated per game.',
      evidence: learnsetSample.slice(0, 12).map((s) => `species ${s.id}: ${s.versionGroupCount} version groups`),
      sources: ['https://pokeapi.co/api/v2/pokemon/{id}', 'pokedex-backend/prisma/schema.prisma'],
    });
  }

  const varietyRecords = records.reduce((sum, record) => sum + record.varieties.length, 0);
  const formsChecked = records.reduce((sum, record) => sum + record.varietyForms.length, 0);
  const reference: ReferenceSnapshot = {
    totals,
    counts: {
      species: totals['pokemon-species'] ?? allSpeciesIds.length,
      pokemonForms: totals.pokemon ?? 0,
      varieties: varietyRecords,
      versions: versions.length,
      dexes: pokedexes.length,
      generations: generations.length,
      speciesAudited: records.length,
    },
    generations,
    versions,
    pokedexes,
    speciesSample,
    pokemonDetails,
    formAudit,
    evolutionSample,
    availabilitySample,
    encounterSample,
    learnsetSample,
    checkpoint: {
      key,
      resumedIds,
      failedIds: Object.keys(checkpoint.failed).sort(),
    },
    apiErrors,
  };
  return { findings, reference };
}
