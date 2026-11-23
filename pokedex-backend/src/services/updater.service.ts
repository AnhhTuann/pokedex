import { prisma } from '../db/prisma.js';
import { downloadAndOptimizeImage } from './image.service.js';

interface UpdateStatus {
  type: string;
  localCount: number;
  apiCount: number;
  hasUpdate: boolean;
}

interface CatalogEntry {
  id: number;
  name: string;
  url: string;
}

type CatalogResource = 'pokemon-species' | 'item' | 'ability';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 100;
const FETCH_TIMEOUT_MS = 10_000;
const CONCURRENCY = 4;
const CATALOG_TTL_MS = 60 * 60 * 1000;
const MAX_CATALOG_ENTRIES = 10_000;

const catalogCache = new Map<
  CatalogResource,
  { expiresAt: number; entries: CatalogEntry[] }
>();

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`PokéAPI request failed (${response.status}): ${url}`);
  return (await response.json()) as T;
}

const idFromUrl = (url: string): number | null => {
  const parts = url.split('/').filter(Boolean);
  const id = Number.parseInt(parts[parts.length - 1] ?? '', 10);
  return Number.isInteger(id) && id > 0 ? id : null;
};

async function fetchCatalog(resource: CatalogResource): Promise<CatalogEntry[]> {
  const cached = catalogCache.get(resource);
  if (cached && cached.expiresAt > Date.now()) return cached.entries;

  const entries: CatalogEntry[] = [];
  let next: string | null = `${POKEAPI_BASE}/${resource}?limit=${PAGE_SIZE}`;

  while (next && entries.length < MAX_CATALOG_ENTRIES) {
    type CatalogPage = {
      next: string | null;
      results: { name: string; url: string }[];
    };
    const page: CatalogPage = await fetchJson<CatalogPage>(next);

    for (const result of page.results ?? []) {
      const id = idFromUrl(result.url);
      if (id === null) continue;
      entries.push({ id, name: result.name, url: result.url });
    }
    next = page.next;
  }

  catalogCache.set(resource, {
    expiresAt: Date.now() + CATALOG_TTL_MS,
    entries,
  });
  return entries;
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  });

  await Promise.all(runners);
  return results;
}

async function localPokemonIds(): Promise<Set<number>> {
  const rows = await prisma.pokemon.findMany({
    select: { pokedexNumber: true },
  });
  return new Set(rows.map((row) => row.pokedexNumber));
}

async function localNames(model: 'item' | 'ability'): Promise<Set<string>> {
  const rows =
    model === 'item'
      ? await prisma.item.findMany({ select: { name: true } })
      : await prisma.ability.findMany({ select: { name: true } });
  return new Set(rows.map((row) => row.name));
}

async function findMissing(): Promise<{
  pokemon: CatalogEntry[];
  items: CatalogEntry[];
  abilities: CatalogEntry[];
}> {
  // All catalog requests must succeed before any write is attempted. A partial
  // failure therefore cannot leave the database half-synchronised.
  const [species, items, abilities, localPokemon, localItems, localAbilities] =
    await Promise.all([
      fetchCatalog('pokemon-species'),
      fetchCatalog('item'),
      fetchCatalog('ability'),
      localPokemonIds(),
      localNames('item'),
      localNames('ability'),
    ]);

  return {
    pokemon: species.filter((entry) => !localPokemon.has(entry.id)),
    items: items.filter((entry) => !localItems.has(entry.name)),
    abilities: abilities.filter((entry) => !localAbilities.has(entry.name)),
  };
}

function generationFromSpecies(species: any): number {
  const name = species?.generation?.name ?? '';
  const match = name.match(/generation-([ivx]+)/);
  const romanToNumber: Record<string, number> = {
    i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10,
  };
  return (match && romanToNumber[match[1]]) || 1;
}

function baseStatsFromApi(stats: { stat: { name: string }; base_stat: number }[]) {
  const find = (name: string) =>
    stats.find((stat) => stat.stat.name === name)?.base_stat ?? 0;
  return {
    hp: find('hp'),
    attack: find('attack'),
    defense: find('defense'),
    specialAttack: find('special-attack'),
    specialDefense: find('special-defense'),
    speed: find('speed'),
  };
}

export const updaterService = {
  async checkUpdates(): Promise<UpdateStatus[]> {
    const missing = await findMissing();

    const counts = await Promise.all([
      prisma.pokemon.count(),
      prisma.item.count(),
      prisma.ability.count(),
    ]);

    const apiCounts = await Promise.all([
      fetchCatalog('pokemon-species'),
      fetchCatalog('item'),
      fetchCatalog('ability'),
    ]);

    return [
      {
        type: 'pokemon',
        localCount: counts[0],
        apiCount: apiCounts[0].length,
        hasUpdate: missing.pokemon.length > 0,
      },
      {
        type: 'item',
        localCount: counts[1],
        apiCount: apiCounts[1].length,
        hasUpdate: missing.items.length > 0,
      },
      {
        type: 'ability',
        localCount: counts[2],
        apiCount: apiCounts[2].length,
        hasUpdate: missing.abilities.length > 0,
      },
    ];
  },

  async syncNewData(dryRun = false): Promise<boolean> {
    const missing = await findMissing();
    const summary = {
      pokemon: missing.pokemon.length,
      items: missing.items.length,
      abilities: missing.abilities.length,
    };

    console.log(
      `${dryRun ? 'Dry run' : 'Starting'} data synchronization:`,
      JSON.stringify(summary)
    );
    if (dryRun) return true;

    const results = await Promise.allSettled([
      mapWithConcurrency(missing.pokemon, CONCURRENCY, (entry) =>
        syncPokemon(entry)
      ),
      mapWithConcurrency(missing.items, CONCURRENCY, (entry) => syncItem(entry)),
      mapWithConcurrency(missing.abilities, CONCURRENCY, (entry) =>
        syncAbility(entry)
      ),
    ]);

    for (const result of results) {
      if (result.status === 'rejected') console.error('Sync batch failed:', result.reason);
    }

    console.log('Synchronization complete.');
    return results.every((result) => result.status === 'fulfilled');
  },

  syncPokemon,
  syncItem,
  syncAbility,
};

async function syncPokemon(entry: CatalogEntry): Promise<void> {
  try {
    const species = await fetchJson<any>(entry.url);
    const defaultVariety =
      species.varieties?.find((variety: any) => variety.is_default)?.pokemon ??
      species.varieties?.[0]?.pokemon;
    if (!defaultVariety?.url) return;

    const data = await fetchJson<any>(defaultVariety.url);
    const baseStats = baseStatsFromApi(data.stats ?? []);

    // Existing records are never touched. Only insert genuinely new species.
    if (await prisma.pokemon.findUnique({
      where: { pokedexNumber: entry.id },
      select: { id: true },
    })) {
      return;
    }

    const artwork = data.sprites?.other?.['official-artwork'];
    let imageUrl: string | null = null;
    let shinyImageUrl: string | null = null;

    if (artwork?.front_default) {
      imageUrl = await downloadAndOptimizeImage(
        artwork.front_default,
        `pokemon/normal/${data.name}.webp`
      );
    }
    if (artwork?.front_shiny) {
      shinyImageUrl = await downloadAndOptimizeImage(
        artwork.front_shiny,
        `pokemon/shiny/${data.name}.webp`
      );
    }

    const englishGenus = species.genera?.find(
      (genus: any) => genus.language?.name === 'en'
    )?.genus;

    await prisma.pokemon.create({
      data: {
        pokedexNumber: entry.id,
        speciesId: entry.id,
        name: data.name,
        generation: generationFromSpecies(species),
        height: data.height ?? null,
        weight: data.weight ?? null,
        imageUrl,
        shinyImageUrl,
        category: englishGenus ?? null,
        ...baseStats,
        types: {
          connectOrCreate: (data.types ?? []).map((type: any) => ({
            where: { name: type.type.name },
            create: { name: type.type.name },
          })),
        },
      },
    });
  } catch (error) {
    console.error(`Failed to sync pokemon ${entry.id}`, error);
  }
}

async function syncItem(entry: CatalogEntry): Promise<void> {
  try {
    if (await prisma.item.findUnique({
      where: { name: entry.name },
      select: { id: true },
    })) {
      return;
    }

    const data = await fetchJson<any>(entry.url);
    let spriteUrl: string | null = null;

    if (data.sprites?.default) {
      spriteUrl = await downloadAndOptimizeImage(
        data.sprites.default,
        `items/${data.name}.webp`
      );
    }

    await prisma.item.create({
      data: {
        name: data.name,
        cost: data.cost ?? null,
        spriteUrl,
      },
    });
  } catch (error) {
    console.error(`Failed to sync item ${entry.id}`, error);
  }
}

async function syncAbility(entry: CatalogEntry): Promise<void> {
  try {
    if (await prisma.ability.findUnique({
      where: { name: entry.name },
      select: { id: true },
    })) {
      return;
    }

    await prisma.ability.create({ data: { name: entry.name } });
  } catch (error) {
    console.error(`Failed to sync ability ${entry.id}`, error);
  }
}
