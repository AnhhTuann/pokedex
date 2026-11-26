import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { GraphQLError } from 'graphql';

interface Artwork { path: string | null; status: string }
interface Form {
  id: number;
  speciesId: number;
  speciesName: string;
  name: string;
  generation: number;
  category: string;
  types: string[];
  abilities: { name: string; hidden: boolean }[];
  stats: Record<string, number>;
  disposition: string | null;
  normal: Artwork;
  shiny: Artwork;
  index: string[];
  encounter: Record<string, string[]>;
  wild: string[];
  giftOrTrade: string[];
  learnsetCounts: Record<string, number>;
  learnsetReview: Record<string, string>;
}
interface Game {
  slug: string;
  display_name: string;
  generation: number;
  version_group: string;
  reference_dexes: string[];
  legacy_query_dexes: string[];
}
interface Evolution {
  species_id: number;
  conditions: { trigger?: { name: string }; version_group?: { name: string } }[];
  evolves_to: Evolution[];
}
interface Catalog {
  snapshot: string;
  schemaVersion: number;
  forms: Form[];
  games: Game[];
  dexes: { id: number; slug: string; region: string | null }[];
  dexEntries: Record<string, Record<number, number>>;
  species: Record<number, number>;
  trees: Record<number, Evolution>;
  versionGroups: string[];
}
type Facet = 'REGIONAL_DEX_MEMBER' | 'GAME_PRESENCE_EVIDENCE' | 'OBTAINABLE' | 'WILD_CATCHABLE' | 'TRANSFER_AVAILABLE' | 'EVENT_AVAILABLE';
const facets: Facet[] = ['REGIONAL_DEX_MEMBER', 'GAME_PRESENCE_EVIDENCE', 'OBTAINABLE', 'WILD_CATCHABLE', 'TRANSFER_AVAILABLE', 'EVENT_AVAILABLE'];
export interface Filters {
  limit?: number | null;
  offset?: number | null;
  gen?: number | null;
  maxGen?: number | null;
  broadRegion?: string | null;
  dex?: string | null;
  game?: string | null;
  availability?: Facet | null;
  availabilityState?: 'CONFIRMED' | 'UNKNOWN' | null;
  nationalNumber?: number | null;
  regionalNumber?: number | null;
  speciesId?: number | null;
  formId?: number | null;
  category?: string | null;
  search?: string | null;
  type?: string | null;
  ids?: number[] | null;
}
type Slot = [number, string, string, number, number | null];
const snapshot = '508fd7c3a7d54ac175e00afe420b11a5af983bd6';

function badInput(message: string): never {
  throw new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } });
}

export function loadReferenceCatalog(directory = resolve('data/reference')) {
  const manifest = JSON.parse(readFileSync(resolve(directory, 'manifest.json'), 'utf8')) as {
    snapshot: string; files: Record<string, string>;
  };
  function readVerified(file: string) {
    const bytes = readFileSync(resolve(directory, file));
    if (createHash('sha256').update(bytes).digest('hex') !== manifest.files[file]) {
      throw new Error(`Reference checksum mismatch for ${file}`);
    }
    return bytes;
  }
  const catalog: Catalog = JSON.parse(readVerified('catalog.json').toString());
  const details = Object.hasOwn(manifest.files, 'detail.json')
    ? JSON.parse(readVerified('detail.json').toString()) as {
      forms: Record<number, { height?: number; weight?: number; cries?: { latest?: string } }>;
      descriptions: Record<number, string | null>;
    } : undefined;
  const forms = new Map(catalog.forms.map(form => [form.id, form]));
  const games = new Map(catalog.games.map(game => [game.slug, game]));
  const dexes = new Map(catalog.dexes.map(dex => [dex.slug, dex]));
  const groups = new Set(catalog.versionGroups);
  const regions = new Map<string, Set<number>>();
  if (manifest.snapshot !== snapshot || catalog.snapshot !== snapshot || catalog.schemaVersion !== 1 ||
      forms.size !== 1351 || forms.size !== catalog.forms.length || games.size !== 38 || dexes.size !== 35 ||
      Object.keys(catalog.species).length !== 1025 || Object.keys(catalog.trees).length !== 540 ||
      groups.size !== 32 || new Set(catalog.forms.map(form => form.generation)).size !== 9 ||
      catalog.forms.some(form => !catalog.species[form.speciesId] ||
        !catalog.trees[catalog.species[form.speciesId]] || form.generation < 1 || form.generation > 9) ||
      catalog.games.some(game => !groups.has(game.version_group) ||
        [...game.reference_dexes, ...game.legacy_query_dexes].some(dex => !dexes.has(dex)))) {
    throw new Error('Invalid reference catalog revision or cardinality');
  }
  const expectedShards = new Set(catalog.forms.flatMap(form => Object.keys(form.learnsetCounts)));
  for (const group of expectedShards) {
    if (!groups.has(group)) throw new Error(`Unknown reference learnset group ${group}`);
    readVerified(`learnsets-${group}.json.gz`);
  }
  for (const dex of catalog.dexes) {
    const entries = catalog.dexEntries[dex.slug];
    if (!entries || Object.entries(entries).some(([id, number]) =>
      !catalog.species[Number(id)] || !Number.isInteger(number) || number < 0)) {
      throw new Error(`Invalid reference Dex ${dex.slug}`);
    }
    if (!dex.region) continue;
    const ids = regions.get(dex.region) ?? new Set<number>();
    for (const id of Object.keys(entries)) ids.add(Number(id));
    regions.set(dex.region, ids);
  }

  const ordered = [...forms.values()].sort((a, b) => a.speciesId - b.speciesId || a.id - b.id);
  const dexOrder = new Map(catalog.dexes.map(dex => {
    const entries = catalog.dexEntries[dex.slug];
    return [dex.slug, ordered.filter(form => entries[form.speciesId] !== undefined)
      .sort((a, b) => entries[a.speciesId] - entries[b.speciesId] || a.id - b.id)];
  }));
  const artwork = new Map<Artwork, Artwork>();
  for (const form of ordered) {
    for (const asset of [form.normal, form.shiny]) {
      artwork.set(asset, asset.path && !existsSync(resolve('public', '.' + asset.path))
        ? { path: null, status: 'MISSING' } : asset);
    }
  }

  function gameFor(slug: string) {
    return games.get(slug.toLowerCase()) ?? badInput('Unknown supported game.');
  }
  function availability(form: Form, game: Game, facet: Facet) {
    const slug = game.slug;
    const record = `data/api/v2/pokemon/${form.id}`;
    const methods = form.encounter[slug] ?? [];
    const sources: string[] = [];
    if (facet === 'REGIONAL_DEX_MEMBER') {
      for (const dex of game.reference_dexes) {
        if (catalog.dexEntries[dex][form.speciesId] !== undefined) {
          sources.push(`data/api/v2/pokedex/${dexes.get(dex)!.id}/index.json`);
        }
      }
    }
    if (facet === 'GAME_PRESENCE_EVIDENCE') {
      if (form.index.includes(slug)) sources.push(`${record}/index.json`);
      if (methods.length) sources.push(`${record}/encounters/index.json`);
    }
    if ((facet === 'WILD_CATCHABLE' && form.wild.includes(slug)) ||
        (facet === 'OBTAINABLE' && (form.wild.includes(slug) || form.giftOrTrade.includes(slug)))) {
      sources.push(`${record}/encounters/index.json`);
    }
    return { facet, state: sources.length ? 'CONFIRMED' : 'UNKNOWN', sources, methods: sources.some(
      source => source.endsWith('/encounters/index.json')) ? methods : [] };
  }

  function project(form: Form, regionalNumber?: number) {
    const normal = artwork.get(form.normal)!;
    const shiny = artwork.get(form.shiny)!;
    return {
      id: form.id, speciesId: form.speciesId, nationalNumber: form.speciesId, name: form.name,
      category: form.category, generation: form.generation, types: form.types,
      regionalNumber: regionalNumber ?? null, image: normal.path ?? '', shinyImage: shiny.path,
      normalArtwork: normal, shinyArtwork: shiny, disposition: form.disposition,
    };
  }

  function list(filters: Filters = {}, maximumPageSize = 250) {
    const { limit = 24, offset = 0, gen, maxGen, broadRegion, dex, game, availability: facet,
      availabilityState, nationalNumber, regionalNumber, speciesId, formId, category, search, type, ids } = filters;
    if ([gen, maxGen].some(value => value != null && (!Number.isInteger(value) || value < 1 || value > 9))) {
      badInput('Generation must be 1 through 9.');
    }
    if ((offset ?? 0) < 0 || (limit ?? 24) < 0 || (ids && ids.length > 1351) ||
        (search && search.length > 100)) badInput('Invalid pagination or filter size.');
    if ((facet || availabilityState) && !game) badInput('Availability filters require a game.');
    if (regionalNumber != null && !dex) badInput('Regional number requires an exact Dex.');
    const gameRow = game != null ? gameFor(game) : undefined;
    const dexSlug = dex?.toLowerCase();
    const entries = dexSlug ? catalog.dexEntries[dexSlug] : undefined;
    const region = broadRegion ? regions.get(broadRegion.toLowerCase()) : undefined;
    if (dex != null && (!dexSlug || !dexes.has(dexSlug))) badInput('Unknown exact Dex.');
    if (broadRegion != null && !region) badInput('Unknown broad region.');
    const wanted = ids ? new Set(ids) : undefined;
    const query = search?.trim().toLowerCase();
    const numericQuery = query && /^#?\d+$/.test(query) ? Number(query.replace(/^#/, '')) : null;
    const filterFacet = facet ?? 'GAME_PRESENCE_EVIDENCE';
    const state = availabilityState ?? 'CONFIRMED';
    const results = (dexSlug ? dexOrder.get(dexSlug)! : ordered).filter(form =>
      (gen != null ? form.generation === gen : maxGen == null || form.generation <= maxGen) &&
      (nationalNumber == null || form.speciesId === nationalNumber) &&
      (speciesId == null || form.speciesId === speciesId) &&
      (formId == null || form.id === formId) &&
      (regionalNumber == null || entries?.[form.speciesId] === regionalNumber) &&
      (!region || region.has(form.speciesId)) &&
      (!category || category === 'ALL' || (category === 'ALTERNATE' ? form.category !== 'DEFAULT' : form.category === category)) &&
      (!wanted || wanted.has(form.id)) &&
      (!type || form.types.includes(type.toLowerCase())) &&
      (!query || form.name.includes(query) || form.speciesName.includes(query) ||
        ([form.id, form.speciesId, entries?.[form.speciesId]].some(number => number === numericQuery))) &&
      (!gameRow || availability(form, gameRow, filterFacet).state === state));
    const start = offset ?? 0;
    return { totalCount: results.length, results: results.slice(start, start + Math.min(limit ?? 24, maximumPageSize))
      .map(form => project(form, entries?.[form.speciesId])) };
  }

  // Bound memory to one decompressed version group. Release the previous group on change.
  let loaded: { group: string; slots: Record<number, Slot[]> } | undefined;
  function learnset(form: Form, group: string) {
    if (!groups.has(group)) badInput('Unknown version group.');
    const source = `data/api/v2/pokemon/${form.id}/index.json`;
    const count = form.learnsetCounts[group] ?? 0;
    const file = `learnsets-${group}.json.gz`;
    if (!count) {
      return { state: 'UNKNOWN', source, entries: [],
        reviewReason: form.learnsetReview[group] ?? 'NO_PINNED_ROWS' };
    }
    if (loaded?.group !== group) {
      loaded = { group, slots: JSON.parse(gunzipSync(readVerified(file)).toString()) };
    }
    const slots = loaded.slots[form.id];
    if (slots?.length !== count) throw new Error('Reference learnset count mismatch');
    return { state: 'CONFIRMED', source, reviewReason: null, entries: slots.map(([moveId, name, method, level, enhancementLevel]) =>
      ({ formId: form.id, moveId, name, method, level, enhancementLevel, versionGroup: group, source })) };
  }

  function detail(id: number, slug?: string | null, versionGroup?: string | null) {
    const game = slug != null ? gameFor(slug) : undefined;
    if (game && versionGroup && versionGroup !== game.version_group) badInput('Game and version group disagree.');
    if (versionGroup != null && !groups.has(versionGroup)) badInput('Unknown version group.');
    const form = forms.get(id);
    if (!form) return null;
    const chain = catalog.species[form.speciesId];
    const evolution: { fromSpeciesId: number; toSpeciesId: number; versionGroup?: string; trigger?: string;
      conditionsJson: string; source: string }[] = [];
    const group = versionGroup ?? game?.version_group;
    function visit(node: Evolution) {
      for (const child of node.evolves_to) {
        if (chain === 250 && node.species_id === 489 && child.species_id === 490) continue;
        for (const conditions of child.conditions) {
          if (group && conditions.version_group?.name !== group) continue;
          evolution.push({ fromSpeciesId: node.species_id, toSpeciesId: child.species_id,
            versionGroup: conditions.version_group?.name, trigger: conditions.trigger?.name,
            conditionsJson: JSON.stringify(conditions), source: `data/api/v2/evolution-chain/${chain}/index.json` });
        }
        visit(child);
      }
    }
    visit(catalog.trees[chain]);
    const info = details?.forms[id];
    return { ...project(form), height: info?.height, weight: info?.weight, cry: info?.cries?.latest,
      description: details?.descriptions[form.speciesId],
      stats: Object.entries(form.stats).map(([name, value]) => ({ name, value })),
      abilitySlots: form.abilities, abilities: form.abilities.map(ability => ability.name),
      learnset: group ? learnset(form, group) : null, evolution,
      availability: game ? facets.map(facet => availability(form, game, facet)) : [],
      forms: ordered.filter(row => row.speciesId === form.speciesId).map(row => project(row)) };
  }

  return {
    list, detail,
    metadata: {
      snapshot, schemaVersion: catalog.schemaVersion, speciesCount: Object.keys(catalog.species).length,
      formCount: forms.size, versionGroups: catalog.versionGroups,
      games: catalog.games.map(game => ({ slug: game.slug, displayName: game.display_name, generation: game.generation,
        versionGroup: game.version_group, referenceDexes: game.reference_dexes, legacyDexes: game.legacy_query_dexes })),
      dexes: catalog.dexes.map(dex => ({ ...dex, entryCount: Object.keys(catalog.dexEntries[dex.slug]).length })),
    },
  };
}
