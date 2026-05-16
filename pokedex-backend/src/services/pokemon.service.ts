import { prisma } from '../db/prisma.js';

const evolutionChainCache = new Map<number, any>();

async function getFullEvolutionChain(pokemonId: number) {
  if (evolutionChainCache.has(pokemonId)) {
    return evolutionChainCache.get(pokemonId);
  }

  try {
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    if (!speciesRes.ok) return null;
    const speciesData = await speciesRes.json();
    const chainUrl = speciesData.evolution_chain?.url;
    if (!chainUrl) return null;

    const chainRes = await fetch(chainUrl);
    if (!chainRes.ok) return null;
    const chainData = await chainRes.json();

    const chainList: { name: string; minLevel: number | null; trigger: string | null }[] = [];

    const traverse = (node: any) => {
      const details = node.evolution_details?.[0];
      chainList.push({
        name: node.species.name,
        minLevel: details?.min_level || null,
        trigger: details?.trigger?.name || null
      });
      for (const next of node.evolves_to) {
        traverse(next);
      }
    };

    traverse(chainData.chain);

     const result = [];
    for (const item of chainList) {
      let dbP = await prisma.pokemon.findFirst({
        where: { name: { equals: item.name, mode: 'insensitive' } },
        include: { types: true }
      });

      if (dbP) {
        result.push({
          id: dbP.pokedexNumber,
          name: dbP.name,
          types: dbP.types.map((t: any) => t.name),
          image: dbP.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dbP.pokedexNumber}.png`,
          shinyImage: dbP.shinyImageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${dbP.pokedexNumber}.png`,
          minLevel: item.minLevel,
          trigger: item.trigger
        });
      } else {
        try {
          const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name.toLowerCase()}`);
          if (pokeRes.ok) {
            const pokeData = await pokeRes.json();
            result.push({
              id: pokeData.id,
              name: item.name,
              types: pokeData.types.map((t: any) => t.type.name),
              image: pokeData.sprites?.other?.['official-artwork']?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`,
              shinyImage: pokeData.sprites?.other?.['official-artwork']?.front_shiny || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeData.id}.png`,
              minLevel: item.minLevel,
              trigger: item.trigger
            });
          }
        } catch (err) {
          console.error(`Error fetching fallback details for ${item.name}:`, err);
        }
      }
    }
    
    evolutionChainCache.set(pokemonId, result);
    return result;
  } catch (err) {
    console.error("Error getting full evolution chain:", err);
    return null;
  }
}

const alternativeFormsCache = new Map<number, any[]>();

async function getAlternativeForms(pokemonId: number): Promise<any[]> {
  if (alternativeFormsCache.has(pokemonId)) {
    return alternativeFormsCache.get(pokemonId) || [];
  }

  try {
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    if (!speciesRes.ok) return [];
    const speciesData = await speciesRes.json();
    const varieties = speciesData.varieties || [];
    const nonDefault = varieties.filter((v: any) => !v.is_default);

    const forms = [];
    for (const v of nonDefault) {
      try {
        const detailRes = await fetch(v.pokemon.url);
        if (!detailRes.ok) continue;
        const d = await detailRes.json();

        let parts = d.name.split('-');
        let base = parts[0];
        let form = parts.slice(1).join(' ');
        base = base.charAt(0).toUpperCase() + base.slice(1);

        let formattedName = d.name;
        if (form === 'alola') formattedName = `Alolan ${base}`;
        else if (form === 'galar') formattedName = `Galarian ${base}`;
        else if (form === 'hisui') formattedName = `Hisuian ${base}`;
        else if (form === 'paldea') formattedName = `Paldean ${base}`;
        else if (form === 'gmax') formattedName = `Gigantamax ${base}`;
        else if (form === 'mega') formattedName = `Mega ${base}`;
        else if (form === 'mega-x') formattedName = `Mega ${base} X`;
        else if (form === 'mega-y') formattedName = `Mega ${base} Y`;
        else {
          formattedName = parts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
        }

        let category: string | null = null;
        const genusObj = speciesData.genera?.find((g: any) => g.language?.name === "en");
        if (genusObj) {
          category = genusObj.genus;
        }

        forms.push({
          id: d.id,
          name: formattedName,
          types: d.types.map((t: any) => t.type.name),
          image: d.sprites?.other?.['official-artwork']?.front_default || d.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`,
          shinyImage: d.sprites?.other?.['official-artwork']?.front_shiny || d.sprites?.front_shiny || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${d.id}.png`,
          category: category,
          speciesId: pokemonId
        });
      } catch (err) {
        console.error(`Error fetching alternative form detail for ${v.pokemon.name}:`, err);
      }
    }

    alternativeFormsCache.set(pokemonId, forms);
    return forms;
  } catch (err) {
    console.error(`Error fetching alternative forms for species ${pokemonId}:`, err);
    return [];
  }
}

export const pokemonService = {
  getFullEvolutionChain,
  getAlternativeForms,
  
  pokemonList: async ({ limit = 20, offset = 0, search = '', type = '', gen = null, ids = null, region = null, game = null }: any) => {
    if (ids && Array.isArray(ids) && ids.length === 0) {
      return { results: [], totalCount: 0 };
    }

    const where: any = {};

    if (region && region !== 'ALL' && game && game !== 'ALL') {
      where.AND = [
        { regionalDexes: { has: region.toLowerCase() } },
        {
          OR: [
            { isDefault: true },
            { altFormAvailableIn: { has: game.toLowerCase() } }
          ]
        }
      ];
    }

    if (gen !== null) {
      where.generation = gen;
    }
    if (ids && Array.isArray(ids) && ids.length > 0) {
      where.pokedexNumber = { in: ids };
    }
    if (search) {
      const searchOR = [
        { name: { contains: search.toLowerCase() } },
        ...(isNaN(Number(search)) ? [] : [{ pokedexNumber: Number(search) }]),
        ...(isNaN(Number(search)) ? [] : [{ speciesId: Number(search) }])
      ];
      if (where.AND) {
        where.AND.push({ OR: searchOR });
      } else {
        where.OR = searchOR;
      }
    }
    if (type) {
      where.types = { some: { name: type.toLowerCase() } };
    }

    const pokemons = await prisma.pokemon.findMany({
      where,
      include: { types: true }
    });

    let results: any[] = [];

    if (region && region !== 'ALL') {
      const regionName = region.toLowerCase();

      const dexEntries = await prisma.dexEntry.findMany({
        where: { regionName }
      });
      const entryMap = new Map<number, number>();
      for (const entry of dexEntries) {
        entryMap.set(entry.pokemonId, entry.entryNumber);
      }

      for (const p of pokemons) {
        let baseDbId = p.id;
        if (!p.isDefault && p.speciesId) {
          const basePoke = await prisma.pokemon.findUnique({
            where: { pokedexNumber: p.speciesId },
            select: { id: true }
          });
          if (basePoke) baseDbId = basePoke.id;
        }

        const regNum = entryMap.get(baseDbId) || null;

        results.push({
          id: p.pokedexNumber,
          name: p.name,
          types: p.types.map((t: any) => t.name),
          image: p.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokedexNumber}.png`,
          shinyImage: p.shinyImageUrl,
          category: p.category,
          regionalNumber: regNum,
          speciesId: p.speciesId || p.pokedexNumber
        });
      }

      results = results.filter(r => r.regionalNumber !== null);

      results.sort((a, b) => {
        if (a.regionalNumber !== b.regionalNumber) {
          return (a.regionalNumber || 0) - (b.regionalNumber || 0);
        }
        return a.id - b.id;
      });

    } else {
      for (const p of pokemons) {
        results.push({
          id: p.pokedexNumber,
          name: p.name,
          types: p.types.map((t: any) => t.name),
          image: p.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokedexNumber}.png`,
          shinyImage: p.shinyImageUrl,
          category: p.category,
          regionalNumber: null,
          speciesId: p.speciesId || p.pokedexNumber
        });
      }

      results.sort((a, b) => {
        const aBase = a.speciesId || a.id;
        const bBase = b.speciesId || b.id;
        if (aBase !== bBase) {
          return aBase - bBase;
        }
        return a.id - b.id;
      });
    }

    const totalCount = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      totalCount
    };
  },

  pokemonDetail: async (id: number) => {
    const p = await prisma.pokemon.findUnique({
      where: { pokedexNumber: id },
      include: { 
        types: true, 
        abilities: true,
        varieties: true,
        evolvesTo: {
          include: { toPokemon: { include: { types: true } } }
        },
        evolvesFrom: {
          include: { fromPokemon: { include: { types: true } } }
        },
        moves: {
          include: { move: true }
        }
      }
    });

    if (!p) {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) return null;
        const d = await res.json();

        let speciesId = id;
        if (d.species && d.species.url) {
          const speciesUrlParts = d.species.url.split('/').filter(Boolean);
          speciesId = parseInt(speciesUrlParts[speciesUrlParts.length - 1], 10);
        }

        let category: string | null = null;
        let description: string | null = null;
        let megaEvolutions: any[] = [];
        let alternativeForms: any[] = [];

        try {
          const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesId}`);
          if (speciesRes.ok) {
            const speciesData = await speciesRes.json();
            const genusObj = speciesData.genera?.find((g: any) => g.language?.name === "en");
            if (genusObj) {
              category = genusObj.genus;
            }

            const englishEntries = speciesData.flavor_text_entries?.filter((entry: any) => entry.language?.name === "en") || [];
            if (englishEntries.length > 0) {
              const rawText = englishEntries[englishEntries.length - 1].flavor_text;
              description = rawText
                .replace(/[\n\f\r\t]/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            }

            const varieties = speciesData.varieties || [];
            const nonDefault = varieties.filter((v: any) => !v.is_default);

            for (const v of nonDefault) {
              try {
                const detailRes = await fetch(v.pokemon.url);
                if (!detailRes.ok) continue;
                const dVar = await detailRes.json();

                const isMega = v.pokemon.name.includes("-mega");
                const isAlternative = !isMega;

                let parts = dVar.name.split('-');
                let base = parts[0];
                let form = parts.slice(1).join(' ');
                base = base.charAt(0).toUpperCase() + base.slice(1);

                let formattedName = dVar.name;
                if (form === 'alola') formattedName = `Alolan ${base}`;
                else if (form === 'galar') formattedName = `Galarian ${base}`;
                else if (form === 'hisui') formattedName = `Hisuian ${base}`;
                else if (form === 'paldea') formattedName = `Paldean ${base}`;
                else if (form === 'gmax') formattedName = `Gigantamax ${base}`;
                else if (form === 'mega') formattedName = `Mega ${base}`;
                else if (form === 'mega-x') formattedName = `Mega ${base} X`;
                else if (form === 'mega-y') formattedName = `Mega ${base} Y`;
                else {
                  formattedName = parts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
                }

                const item = {
                  id: dVar.id,
                  name: formattedName,
                  types: dVar.types.map((t: any) => t.type.name),
                  image: dVar.sprites?.other?.['official-artwork']?.front_default || dVar.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dVar.id}.png`,
                  shinyImage: dVar.sprites?.other?.['official-artwork']?.front_shiny || dVar.sprites?.front_shiny || null,
                  isMega,
                  isAlternative
                };

                if (isMega) {
                  megaEvolutions.push(item);
                } else {
                  alternativeForms.push(item);
                }
              } catch (errVar) {
                console.error("Error fetching variety detail inside fallback:", errVar);
              }
            }
          }
        } catch (e) {
          console.error("Error fetching fallback species:", e);
        }

        const evolutions = (await getFullEvolutionChain(id)) || [];

        const matchups = [
          { type: "fire", multiplier: 2.0 },
          { type: "water", multiplier: 0.5 },
          { type: "grass", multiplier: 0.5 }
        ];

        let parts = d.name.split('-');
        let baseName = parts[0];
        let formName = parts.slice(1).join(' ');
        baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

        let formattedName = d.name;
        if (formName === 'alola') formattedName = `Alolan ${baseName}`;
        else if (formName === 'galar') formattedName = `Galarian ${baseName}`;
        else if (formName === 'hisui') formattedName = `Hisuian ${baseName}`;
        else if (formName === 'paldea') formattedName = `Paldean ${baseName}`;
        else if (formName === 'gmax') formattedName = `Gigantamax ${baseName}`;
        else if (formName === 'mega') formattedName = `Mega ${baseName}`;
        else if (formName === 'mega-x') formattedName = `Mega ${baseName} X`;
        else if (formName === 'mega-y') formattedName = `Mega ${baseName} Y`;
        else {
          formattedName = parts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
        }

        return {
          id: d.id,
          name: formattedName,
          types: d.types.map((t: any) => t.type.name),
          image: d.sprites?.other?.['official-artwork']?.front_default || d.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          shinyImage: d.sprites?.other?.['official-artwork']?.front_shiny || d.sprites?.front_shiny || null,
          category,
          height: d.height,
          weight: d.weight,
          stats: d.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat
          })),
          abilities: d.abilities.map((a: any) => a.ability.name),
          description: description || `An alternative form of ${baseName}.`,
          flavorTexts: [],
          gameVersions: d.game_indices ? d.game_indices.slice(0, 12).map((gi: any) => gi.version.name) : [],
          evolutions,
          matchups,
          cry: d.cries?.latest || null,
          moves: [],
          megaEvolutions,
          alternativeForms,
          speciesId
        };
      } catch (err) {
        console.error("Error fetching form from PokeAPI fallback:", err);
        return null;
      }
    }

    const evolutions = (await getFullEvolutionChain(p.pokedexNumber)) || [];

    const matchups = [
      { type: "fire", multiplier: 2.0 },
      { type: "water", multiplier: 0.5 },
      { type: "grass", multiplier: 0.5 }
    ];

    const megaEvolutions = (p.varieties || []).filter((v: any) => v.isMega).map((v: any) => ({
      id: v.id,
      name: v.name,
      types: v.types,
      image: v.imageUrl,
      shinyImage: v.shinyImageUrl,
      isMega: v.isMega,
      isAlternative: v.isAlternative,
      speciesId: p.pokedexNumber
    }));

    const alternativeForms = (p.varieties || []).filter((v: any) => v.isAlternative).map((v: any) => ({
      id: v.id,
      name: v.name,
      types: v.types,
      image: v.imageUrl,
      shinyImage: v.shinyImageUrl,
      isMega: v.isMega,
      isAlternative: v.isAlternative,
      speciesId: p.pokedexNumber
    }));

    return {
      id: p.pokedexNumber,
      name: p.name,
      types: p.types.map((t: any) => t.name),
      image: p.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokedexNumber}.png`,
      shinyImage: p.shinyImageUrl,
      category: p.category,
      height: p.height,
      weight: p.weight,
      stats: [
        { name: 'hp', value: p.hp },
        { name: 'attack', value: p.attack },
        { name: 'defense', value: p.defense },
        { name: 'special-attack', value: p.specialAttack },
        { name: 'special-defense', value: p.specialDefense },
        { name: 'speed', value: p.speed },
      ],
      abilities: p.abilities.map((a: any) => a.name),
      description: p.description || "A mysterious Pokémon from the Kanto region.",
      flavorTexts: [],
      gameVersions: p.gameVersions,
      evolutions,
      matchups,
      cry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${p.pokedexNumber}.ogg`,
      moves: p.moves.map((pm: any) => ({
        name: pm.move.name,
        type: pm.move.type,
        power: pm.move.power,
        accuracy: pm.move.accuracy,
        pp: pm.move.pp,
        generation: pm.move.generation,
        description: pm.move.description,
        effect: pm.move.effect,
        damageClass: pm.move.damageClass,
        learnMethod: pm.learnMethod,
        levelLearnedAt: pm.levelLearnedAt
      })),
      megaEvolutions,
      alternativeForms,
      speciesId: p.speciesId || p.pokedexNumber
    };
  }
};
