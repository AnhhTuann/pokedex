import { GraphQLError } from 'graphql';
import { prisma } from '../db/prisma.js';
import { downloadAndOptimizeImage } from './image.service.js';
import { cleanText, fetchPokeApi, idFromResourceUrl, parseGeneration } from '../lib/pokeApi.js';

interface UpdateStatus {
  type: string;
  localCount: number;
  apiCount: number;
  hasUpdate: boolean;
}

interface NamedResource {
  name: string;
  url: string;
}

const LIST_LIMIT = 100000;
const english = (entries: any[] | undefined) => entries?.find((e: any) => e.language?.name === 'en');

let syncInProgress = false;

async function fetchCount(resource: string): Promise<number> {
  const data = await fetchPokeApi<{ count: number }>(`https://pokeapi.co/api/v2/${resource}?limit=1`);
  if (!data) throw new GraphQLError(`Could not reach PokéAPI (${resource}).`);
  return data.count;
}

async function fetchAll(resource: string): Promise<NamedResource[]> {
  const data = await fetchPokeApi<{ results: NamedResource[] }>(`https://pokeapi.co/api/v2/${resource}?limit=${LIST_LIMIT}`);
  if (!data) throw new GraphQLError(`Could not reach PokéAPI (${resource}).`);
  return data.results;
}

export const updaterService = {
  async checkUpdates(): Promise<UpdateStatus[]> {
    const [localPokemon, localItems, localAbilities, apiPokemon, apiItems, apiAbilities] = await Promise.all([
      prisma.pokemon.count({ where: { isDefault: true } }),
      prisma.item.count(),
      prisma.ability.count(),
      fetchCount('pokemon-species'),
      fetchCount('item'),
      fetchCount('ability'),
    ]);

    return [
      { type: 'pokemon', localCount: localPokemon, apiCount: apiPokemon, hasUpdate: apiPokemon > localPokemon },
      { type: 'item', localCount: localItems, apiCount: apiItems, hasUpdate: apiItems > localItems },
      { type: 'ability', localCount: localAbilities, apiCount: apiAbilities, hasUpdate: apiAbilities > localAbilities },
    ];
  },

  async syncNewData(): Promise<boolean> {
    if (syncInProgress) {
      throw new GraphQLError('A synchronization is already running.');
    }
    syncInProgress = true;
    try {
      const [species, items, abilities] = await Promise.all([
        fetchAll('pokemon-species'),
        fetchAll('item'),
        fetchAll('ability'),
      ]);

      const localPokemon = new Set(
        (await prisma.pokemon.findMany({ select: { pokedexNumber: true } })).map((p) => p.pokedexNumber)
      );
      for (const s of species) {
        const id = idFromResourceUrl(s.url);
        if (!localPokemon.has(id)) await this.syncPokemon(id);
      }

      const localAbilities = new Set((await prisma.ability.findMany({ select: { name: true } })).map((a) => a.name));
      for (const a of abilities) {
        if (!localAbilities.has(a.name)) await this.syncAbility(a.url);
      }

      const localItems = new Set((await prisma.item.findMany({ select: { name: true } })).map((i) => i.name));
      for (const i of items) {
        if (!localItems.has(i.name)) await this.syncItem(i.url);
      }

      console.log('Synchronization complete.');
      return true;
    } finally {
      syncInProgress = false;
    }
  },

  async syncPokemon(id: number) {
    const [data, speciesData] = await Promise.all([
      fetchPokeApi(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetchPokeApi(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
    if (!data) return;

    try {
      const artwork = data.sprites?.other?.['official-artwork'] || {};
      const imageUrl = artwork.front_default
        ? await downloadAndOptimizeImage(artwork.front_default, `pokemon/normal/${data.name}.webp`)
        : null;
      const shinyImageUrl = artwork.front_shiny
        ? await downloadAndOptimizeImage(artwork.front_shiny, `pokemon/shiny/${data.name}.webp`)
        : null;

      const stat = (name: string) => data.stats.find((s: any) => s.stat.name === name)?.base_stat || 0;
      const englishFlavors = speciesData?.flavor_text_entries?.filter((e: any) => e.language?.name === 'en') || [];
      const types = data.types.map((t: any) => t.type.name as string);
      const abilities = data.abilities.map((a: any) => a.ability.name as string);

      const fields = {
        name: data.name,
        speciesId: speciesData?.id ?? id,
        generation: parseGeneration(speciesData?.generation?.name) ?? 1,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        imageUrl,
        shinyImageUrl,
        category: english(speciesData?.genera)?.genus ?? null,
        description: cleanText(englishFlavors[englishFlavors.length - 1]?.flavor_text),
        hp: stat('hp'),
        attack: stat('attack'),
        defense: stat('defense'),
        specialAttack: stat('special-attack'),
        specialDefense: stat('special-defense'),
        speed: stat('speed'),
        isDefault: data.is_default ?? true,
        gameVersions: (data.game_indices || []).map((gi: any) => gi.version.name),
        regionalDexes: (speciesData?.pokedex_numbers || []).map((p: any) => p.pokedex.name),
        types: { connectOrCreate: types.map((name: string) => ({ where: { name }, create: { name } })) },
        abilities: { connectOrCreate: abilities.map((name: string) => ({ where: { name }, create: { name } })) },
      };

      await prisma.pokemon.upsert({
        where: { pokedexNumber: id },
        update: fields,
        create: { pokedexNumber: id, ...fields },
      });
    } catch (e) {
      console.error(`Failed to sync pokemon ${id}`, e);
    }
  },

  async syncItem(url: string) {
    const data = await fetchPokeApi(url);
    if (!data) return;

    try {
      const spriteUrl = data.sprites?.default
        ? await downloadAndOptimizeImage(data.sprites.default, `items/${data.name}.webp`)
        : null;
      const englishEffect = english(data.effect_entries);
      const fields = {
        cost: data.cost ?? null,
        flingPower: data.fling_power ?? null,
        flingEffect: data.fling_effect?.name ?? null,
        category: data.category?.name ?? null,
        pocket: data.pocket?.name ?? null,
        flavorText: cleanText(english(data.flavor_text_entries)?.text),
        effect: cleanText(englishEffect?.short_effect || englishEffect?.effect),
        spriteUrl,
      };

      await prisma.item.upsert({
        where: { name: data.name },
        update: fields,
        create: { name: data.name, ...fields },
      });
    } catch (e) {
      console.error(`Failed to sync item ${url}`, e);
    }
  },

  async syncAbility(url: string) {
    const data = await fetchPokeApi(url);
    if (!data) return;

    try {
      const englishEffect = english(data.effect_entries);
      const fields = {
        generation: parseGeneration(data.generation?.name),
        flavorText: english(data.flavor_text_entries)?.flavor_text ?? null,
        shortEffect: englishEffect?.short_effect ?? null,
        effect: englishEffect?.effect ?? null,
      };

      await prisma.ability.upsert({
        where: { name: data.name },
        update: fields,
        create: { name: data.name, ...fields },
      });
    } catch (e) {
      console.error(`Failed to sync ability ${url}`, e);
    }
  },
};
