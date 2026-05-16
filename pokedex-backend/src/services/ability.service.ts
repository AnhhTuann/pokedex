import { prisma } from '../db/prisma.js';

export const abilityService = {
  getAllAbilities: async ({ gen = null, limit = 20, offset = 0, search = '' }: any) => {
    const where: any = {};
    if (gen !== null && gen !== undefined) {
      where.generation = gen;
    }
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const totalCount = await prisma.ability.count({ where });
    const results = await prisma.ability.findMany({
      where,
      orderBy: { name: 'asc' },
      take: limit,
      skip: offset,
      include: {
        pokemons: {
          include: {
            types: true
          }
        }
      }
    });

    const mappedResults = results.map((ability: any) => ({
      id: ability.id,
      name: ability.name,
      generation: ability.generation,
      flavorText: ability.flavorText,
      shortEffect: ability.shortEffect,
      effect: ability.effect,
      pokemons: ability.pokemons.map((p: any) => ({
        id: p.pokedexNumber,
        name: p.name,
        types: p.types.map((t: any) => t.name),
        image: p.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokedexNumber}.png`,
        shinyImage: p.shinyImageUrl,
        category: p.category,
        speciesId: p.speciesId || p.pokedexNumber
      }))
    }));

    return {
      results: mappedResults,
      totalCount
    };
  }
};
