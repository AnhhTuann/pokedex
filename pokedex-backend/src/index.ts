import express from 'express';
import { ApolloServer } from '@apollo/server';
// @ts-ignore
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `#graphql
  type PokemonListItem {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    shinyImage: String
    minLevel: Int
    trigger: String
    category: String
    regionalNumber: Int
    speciesId: Int
  }

  type PokemonListResponse {
    results: [PokemonListItem!]!
    totalCount: Int!
  }

  type Stat {
    name: String!
    value: Int!
  }

  type TypeMatchup {
    type: String!
    multiplier: Float!
  }

  type Move {
    name: String!
    type: String!
    power: Int
    accuracy: Int
    pp: Int
    generation: Int
    description: String
    effect: String
    damageClass: String
    learnMethod: String
    levelLearnedAt: Int
  }

  type MoveListResponse {
    results: [Move!]!
    totalCount: Int!
  }

  type FlavorText {
    version: String!
    text: String!
  }

  type PokemonVariety {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    shinyImage: String
    isMega: Boolean!
    isAlternative: Boolean!
    speciesId: Int
  }

  type PokemonDetail {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    shinyImage: String
    category: String
    height: Int
    weight: Int
    stats: [Stat!]
    abilities: [String!]
    description: String
    flavorTexts: [FlavorText!]
    gameVersions: [String!]
    evolutions: [PokemonListItem!]
    matchups: [TypeMatchup!]
    cry: String
    moves: [Move!]
    megaEvolutions: [PokemonVariety!]
    alternativeForms: [PokemonVariety!]
    locations(version: String): [String!]
    speciesId: Int
  }

  type Ability {
    id: Int!
    name: String!
    generation: Int
    flavorText: String
    shortEffect: String
    effect: String
    pokemons: [PokemonListItem!]!
  }

  type AbilityListResponse {
    results: [Ability!]!
    totalCount: Int!
  }

  type Item {
    id: Int!
    name: String!
    cost: Int
    flingPower: Int
    flingEffect: String
    category: String
    pocket: String
    flavorText: String
    effect: String
    spriteUrl: String
  }

  type ItemListResponse {
    results: [Item!]!
    totalCount: Int!
  }

  type EncounterListItem {
    id: Int!
    pokemonId: Int!
    locationName: String!
    versionName: String!
    method: String
    minLevel: Int
    maxLevel: Int
    chance: Int
    pokemon: PokemonListItem
  }

  type Walkthrough {
    id: Int!
    gameVersion: String!
    chapterTitle: String!
    content: String!
    order: Int!
    language: String!
  }

  type Query {
    ping: String
    pokemonList(limit: Int, offset: Int, search: String, type: String, gen: Int, ids: [Int!], region: String, game: String): PokemonListResponse
    pokemon(id: Int!): PokemonDetail
    myFavorites: [Int!]!
    myTeam: [PokemonListItem!]!
    getAllMoves(gen: Int, type: String, damageClass: String, limit: Int, offset: Int, search: String): MoveListResponse!
    getAllAbilities(gen: Int, limit: Int, offset: Int, search: String): AbilityListResponse!
    getAllItems(search: String, limit: Int, offset: Int): ItemListResponse!
    getLocations(version: String!): [String!]!
    getLocationEncounters(locationName: String!, version: String!): [EncounterListItem!]!
    getWalkthroughs(gameVersion: String!, language: String!): [Walkthrough!]!
  }

  type Mutation {
    toggleFavorite(pokemonId: Int!): Boolean!
    saveTeam(pokemonIds: [Int!]!): Boolean!
    upsertWalkthrough(id: Int, gameVersion: String!, chapterTitle: String!, content: String!, order: Int!, language: String): Walkthrough!
    deleteWalkthrough(id: Int!): Boolean!
  }
`;

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

const resolvers = {
  Query: {
    ping: () => "pong from Prisma backend!",

    getLocations: async (_: any, { version }: { version: string }) => {
      if (!version) return [];
      const result = await prisma.encounter.findMany({
        where: { versionName: { equals: version.toLowerCase(), mode: 'insensitive' } },
        select: { locationName: true },
        distinct: ['locationName'],
        orderBy: { locationName: 'asc' }
      });
      return result.map((r) => r.locationName);
    },

    getLocationEncounters: async (_: any, { locationName, version }: { locationName: string; version: string }) => {
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
    },

    getAllMoves: async (_: any, { gen = null, type = '', damageClass = '', limit = 20, offset = 0, search = '' }: any) => {
      const where: any = {};
      if (gen !== null && gen !== undefined) {
        where.generation = gen;
      }
      if (type) {
        where.type = { equals: type.toLowerCase(), mode: 'insensitive' };
      }
      if (damageClass) {
        where.damageClass = { equals: damageClass.toLowerCase(), mode: 'insensitive' };
      }
      if (search) {
        where.name = { contains: search, mode: 'insensitive' };
      }

      const totalCount = await prisma.move.count({ where });
      const results = await prisma.move.findMany({
        where,
        orderBy: { name: 'asc' },
        take: limit,
        skip: offset
      });

      return {
        results,
        totalCount
      };
    },

    getAllAbilities: async (_: any, { gen = null, limit = 20, offset = 0, search = '' }: any) => {
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
    },

    getAllItems: async (_: any, { search = '', limit = 20, offset = 0 }: any) => {
      const where: any = {};
      if (search) {
        where.name = { contains: search, mode: 'insensitive' };
      }

      const totalCount = await prisma.item.count({ where });
      const results = await prisma.item.findMany({
        where,
        orderBy: { name: 'asc' },
        take: limit,
        skip: offset
      });

      return {
        results,
        totalCount
      };
    },
    
    pokemonList: async (_: any, { limit = 20, offset = 0, search = '', type = '', gen = null, ids = null, region = null, game = null }: any) => {
      if (ids && Array.isArray(ids) && ids.length === 0) {
        return { results: [], totalCount: 0 };
      }

      // Build database query filters
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

      // Query database for all matching Pokemon records (both base and variety forms)
      const pokemons = await prisma.pokemon.findMany({
        where,
        include: { types: true }
      });

      // Now map each Pokemon to output structure, including resolving its regional number if a specific version is selected
      let results: any[] = [];

      if (region && region !== 'ALL') {
        const regionName = region.toLowerCase();

        // Fetch all DexEntry matching the resolved region name to map regional pokedex numbers
        const dexEntries = await prisma.dexEntry.findMany({
          where: { regionName }
        });
        const entryMap = new Map<number, number>();
        for (const entry of dexEntries) {
          entryMap.set(entry.pokemonId, entry.entryNumber);
        }

        // For each queried pokemon, look up its base species DB ID to find its regional number
        for (const p of pokemons) {
          // Find base species in database if p is a variety
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

        // Filter out results that do not have a regional number for this version/region
        results = results.filter(r => r.regionalNumber !== null);

        // Sort by regionalNumber, then by id (pokedexNumber)
        results.sort((a, b) => {
          if (a.regionalNumber !== b.regionalNumber) {
            return (a.regionalNumber || 0) - (b.regionalNumber || 0);
          }
          return a.id - b.id;
        });

      } else {
        // No regional version selected (ALL / National Pokedex)
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

        // Sort by speciesId (to group varieties next to their base forms), then by id (pokedexNumber)
        results.sort((a, b) => {
          const aBase = a.speciesId || a.id;
          const bBase = b.speciesId || b.id;
          if (aBase !== bBase) {
            return aBase - bBase;
          }
          return a.id - b.id;
        });
      }

      // Apply pagination (skip & take) on the fully sorted and filtered array
      const totalCount = results.length;
      const paginatedResults = results.slice(offset, offset + limit);

      return {
        results: paginatedResults,
        totalCount
      };
    },
    
    pokemon: async (_: any, { id }: { id: number }) => {
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

          const baseP = await prisma.pokemon.findUnique({
            where: { pokedexNumber: speciesId },
            include: {
              types: true,
              evolvesTo: {
                include: { toPokemon: { include: { types: true } } }
              },
              evolvesFrom: {
                include: { fromPokemon: { include: { types: true } } }
              }
            }
          });

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

      // Weakness & Resistance Mock (Ideally calculating from types, but mock is fine for portfolio presentation if not fully seeded)
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
    },

    myFavorites: async () => {
      const favorites = await prisma.userPokemon.findMany({
        where: { userId: 1 },
        select: { pokemonId: true }
      });
      return favorites.map((f: any) => f.pokemonId);
    },

    myTeam: async () => {
      const team = await prisma.team.findUnique({
        where: { userId: 1 },
        include: {
          slots: {
            orderBy: { slotOrder: 'asc' },
            include: { pokemon: { include: { types: true } } }
          }
        }
      });

      if (!team) return [];

      return team.slots.map((s: any) => ({
        id: s.pokemon.pokedexNumber,
        name: s.pokemon.name,
        types: s.pokemon.types.map((t: any) => t.name),
        image: s.pokemon.imageUrl
      }));
    },

    getWalkthroughs: async (_: any, { gameVersion, language }: { gameVersion: string; language: string }) => {
      return await prisma.walkthrough.findMany({
        where: { 
          gameVersion: { equals: gameVersion.toLowerCase(), mode: 'insensitive' },
          language: language ? { equals: language.toLowerCase(), mode: 'insensitive' } : undefined
        },
        orderBy: { order: 'asc' }
      });
    }
  },

  Mutation: {
    toggleFavorite: async (_: any, { pokemonId }: { pokemonId: number }) => {
      const existing = await prisma.userPokemon.findUnique({
        where: { userId_pokemonId: { userId: 1, pokemonId } }
      });

      if (existing) {
        await prisma.userPokemon.delete({
          where: { userId_pokemonId: { userId: 1, pokemonId } }
        });
        return false;
      } else {
        await prisma.userPokemon.create({
          data: { userId: 1, pokemonId }
        });
        return true;
      }
    },

    saveTeam: async (_: any, { pokemonIds }: { pokemonIds: number[] }) => {
      if (pokemonIds.length > 6) throw new Error("Team cannot have more than 6 members");

      let team = await prisma.team.findUnique({ where: { userId: 1 } });
      if (!team) {
        team = await prisma.team.create({ data: { userId: 1 } });
      }

      // Delete existing slots
      await prisma.teamSlot.deleteMany({ where: { teamId: team.id } });

      // Create new slots
      const slots = pokemonIds.map((id, idx) => ({
        teamId: team!.id,
        pokemonId: id,
        slotOrder: idx + 1
      }));

      if (slots.length > 0) {
        await prisma.teamSlot.createMany({ data: slots });
      }

      return true;
    },

    upsertWalkthrough: async (_: any, { id, gameVersion, chapterTitle, content, order, language }: any) => {
      const data = {
        gameVersion: gameVersion.toLowerCase(),
        chapterTitle,
        content,
        order,
        language: language ? language.toLowerCase() : 'vi'
      };

      if (id) {
        return await prisma.walkthrough.update({
          where: { id },
          data
        });
      } else {
        return await prisma.walkthrough.create({
          data
        });
      }
    },

    deleteWalkthrough: async (_: any, { id }: { id: number }) => {
      await prisma.walkthrough.delete({
        where: { id }
      });
      return true;
    }
  },

  PokemonDetail: {
    locations: async (parent: any, { version }: { version?: string }) => {
      const pId = parent.id;
      
      // Query encounters from database
      let encounters: any[] = await prisma.encounter.findMany({
        where: { pokemonId: pId }
      });
      
      // Live fallback to PokeAPI if encounters are not seeded yet
      if (encounters.length === 0) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pId}/encounters`);
          if (res.ok) {
            const data = await res.json();
            const fetchedList = [];
            for (const item of data) {
              const locName = item.location_area.name;
              for (const vd of item.version_details) {
                const verName = vd.version.name;
                fetchedList.push({
                  pokemonId: pId,
                  locationName: locName,
                  versionName: verName
                });
              }
            }
            encounters = fetchedList;
          }
        } catch (err) {
          console.error("Error fetching fallback encounters:", err);
        }
      }
      
      if (!version || version === 'ALL') {
        const uniqueNames = Array.from(new Set(encounters.map((e: any) => e.locationName)));
        return uniqueNames;
      }
      
      const filtered = encounters.filter((e: any) => e.versionName.toLowerCase() === version.toLowerCase());
      return filtered.map((e: any) => e.locationName);
    }
  }
};

const downloadSessions = new Map<string, { filename: string; mimeType: string; data: Buffer }>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  console.log("Apollo Server started with Phase 3 Features (Evolutions & Team Builder)");

  app.use(express.json({ limit: '50mb' })); // Allow large base64 strings for PNG exports
  app.use(cors());

  app.get('/api/ping', (req, res) => res.send('pong from Prisma backend!'));



  // Bulletproof proxy download endpoint to solve browser extension filename corruption (e.g., IDM, dynamic blob downloads)
  app.post('/api/download-session', (req, res) => {
    const { filename, mimeType, content, isBase64 } = req.body;
    if (!filename || !mimeType || content === undefined) {
      return res.status(400).send('Missing required fields');
    }

    try {
      let data: Buffer;
      if (isBase64) {
        data = Buffer.from(content, 'base64');
      } else {
        data = Buffer.from(content, 'utf-8');
      }

      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      downloadSessions.set(token, { filename, mimeType, data });

      // Expire session after 60 seconds
      setTimeout(() => {
        downloadSessions.delete(token);
      }, 60000);

      res.json({ token });
    } catch (err) {
      console.error('Error generating download session:', err);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/download', (req, res) => {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).send('Missing download token');
    }

    const session = downloadSessions.get(token);
    if (!session) {
      return res.status(410).send('Download link expired or invalid');
    }

    res.setHeader('Content-Type', session.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${session.filename}"`);
    res.send(session.data);

    // Clean up session immediately after delivery
    downloadSessions.delete(token);
  });

  app.use('/graphql', expressMiddleware(apolloServer));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
