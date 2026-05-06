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
    damageClass: String
    learnMethod: String
    levelLearnedAt: Int
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
  }

  type Query {
    ping: String
    pokemonList(limit: Int, offset: Int, search: String, type: String, gen: Int, ids: [Int!]): PokemonListResponse
    pokemon(id: Int!): PokemonDetail
    myFavorites: [Int!]!
    myTeam: [PokemonListItem!]!
  }

  type Mutation {
    toggleFavorite(pokemonId: Int!): Boolean!
    saveTeam(pokemonIds: [Int!]!): Boolean!
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
          category: category
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
    
    pokemonList: async (_: any, { limit = 20, offset = 0, search = '', type = '', gen = null, ids = null }: any) => {
      const where: any = {};
      
      if (gen !== null) {
        where.generation = gen;
      }

      if (ids && Array.isArray(ids) && ids.length > 0) {
        where.pokedexNumber = { in: ids };
      } else if (ids && Array.isArray(ids) && ids.length === 0) {
        return { results: [], totalCount: 0 };
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          ...(isNaN(Number(search)) ? [] : [{ pokedexNumber: Number(search) }])
        ];
      }

      if (type) {
        where.types = {
          some: {
            name: type.toLowerCase()
          }
        };
      }

      const [totalCount, pokemons] = await Promise.all([
        prisma.pokemon.count({ where }),
        prisma.pokemon.findMany({
          where,
          skip: offset,
          take: limit,
          include: { types: true },
          orderBy: { pokedexNumber: 'asc' }
        })
      ]);

      const results: any[] = [];
      for (const p of pokemons) {
        results.push({
          id: p.pokedexNumber,
          name: p.name,
          types: p.types.map((t: any) => t.name),
          image: p.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokedexNumber}.png`,
          category: p.category
        });

        const altForms = (await getAlternativeForms(p.pokedexNumber)) || [];
        for (const alt of altForms) {
          results.push(alt);
        }
      }

      return {
        results,
        totalCount
      };
    },
    
    pokemon: async (_: any, { id }: { id: number }) => {
      const p = await prisma.pokemon.findUnique({
        where: { pokedexNumber: id },
        include: { 
          types: true, 
          abilities: true,
          gameVersions: true,
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
            description: `An alternative form of ${baseName}.`,
            flavorTexts: [],
            gameVersions: d.game_indices ? d.game_indices.slice(0, 12).map((gi: any) => gi.version.name) : [],
            evolutions,
            matchups,
            cry: d.cries?.latest || null,
            moves: [],
            megaEvolutions,
            alternativeForms
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
        isAlternative: v.isAlternative
      }));

      const alternativeForms = (p.varieties || []).filter((v: any) => v.isAlternative).map((v: any) => ({
        id: v.id,
        name: v.name,
        types: v.types,
        image: v.imageUrl,
        shinyImage: v.shinyImageUrl,
        isMega: v.isMega,
        isAlternative: v.isAlternative
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
        description: "A mysterious Pokémon from the Kanto region.",
        flavorTexts: [],
        gameVersions: p.gameVersions.map((gv: any) => gv.name),
        evolutions,
        matchups,
        cry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${p.pokedexNumber}.ogg`,
        moves: p.moves.map((pm: any) => ({
          name: pm.move.name,
          type: pm.move.type,
          power: pm.move.power,
          accuracy: pm.move.accuracy,
          damageClass: pm.move.damageClass,
          learnMethod: pm.learnMethod,
          levelLearnedAt: pm.levelLearnedAt
        })),
        megaEvolutions,
        alternativeForms
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
    }
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  console.log("Apollo Server started with Phase 3 Features (Evolutions & Team Builder)");

  app.use(express.json());
  app.use(cors());

  app.get('/api/ping', (req, res) => res.send('pong from Prisma backend!'));

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
