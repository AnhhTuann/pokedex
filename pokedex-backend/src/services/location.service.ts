import { prisma } from '../db/prisma.js';

export const locationService = {
  getLocations: async (version: string) => {
    if (!version) return [];
    const result = await prisma.encounter.findMany({
      where: { versionName: { equals: version.toLowerCase(), mode: 'insensitive' } },
      select: { locationName: true },
      distinct: ['locationName'],
      orderBy: { locationName: 'asc' }
    });
    return result.map((r: any) => r.locationName);
  },

  getLocationEncounters: async (locationName: string, version: string) => {
    const encounters = await prisma.encounter.findMany({
      where: {
        locationName: { equals: locationName, mode: 'insensitive' },
        versionName: { equals: version.toLowerCase(), mode: 'insensitive' }
      },
      include: {
        pokemon: {
          include: {
            types: true
          }
        }
      }
    });

    return encounters.map((e: any) => ({
      id: e.id,
      pokemonId: e.pokemonId,
      locationName: e.locationName,
      versionName: e.versionName,
      method: e.method || 'walk',
      minLevel: e.minLevel || 1,
      maxLevel: e.maxLevel || 1,
      chance: e.chance || 0,
      pokemon: {
        id: e.pokemon.pokedexNumber,
        name: e.pokemon.name,
        types: e.pokemon.types.map((t: any) => t.name),
        image: e.pokemon.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.pokemon.pokedexNumber}.png`,
        shinyImage: e.pokemon.shinyImageUrl,
        category: e.pokemon.category,
        speciesId: e.pokemon.speciesId || e.pokemon.pokedexNumber
      }
    }));
  }
};
