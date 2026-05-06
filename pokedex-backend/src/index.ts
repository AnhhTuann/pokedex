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
  }

  type FlavorText {
    version: String!
    text: String!
  }

  type PokemonDetail {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    shinyImage: String
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

      const results = pokemons.map((p: any) => ({
        id: p.pokedexNumber,
        name: p.name,
        types: p.types.map((t: any) => t.name),
        image: p.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokedexNumber}.png`
      }));

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
          evolvesTo: {
            include: { toPokemon: { include: { types: true } } }
          },
          evolvesFrom: {
            include: { fromPokemon: { include: { types: true } } }
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

          const evolutions: any[] = [];
          if (baseP) {
            if (baseP.evolvesFrom.length > 0) {
              const fromP = baseP.evolvesFrom[0].fromPokemon;
              evolutions.push({
                id: fromP.pokedexNumber,
                name: fromP.name,
                types: fromP.types.map((t: any) => t.name),
                image: fromP.imageUrl
              });
            }
            evolutions.push({
              id: baseP.pokedexNumber,
              name: baseP.name,
              types: baseP.types.map((t: any) => t.name),
              image: baseP.imageUrl
            });
            baseP.evolvesTo.forEach((evo: any) => {
              evolutions.push({
                id: evo.toPokemon.pokedexNumber,
                name: evo.toPokemon.name,
                types: evo.toPokemon.types.map((t: any) => t.name),
                image: evo.toPokemon.imageUrl
              });
            });
          }

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
            moves: []
          };
        } catch (err) {
          console.error("Error fetching form from PokeAPI fallback:", err);
          return null;
        }
      }

      // Map Evolutions (from -> current -> to)
      const evolutions: any[] = [];
      
      // If it evolves from something, push that
      if (p.evolvesFrom.length > 0) {
        const fromP = p.evolvesFrom[0].fromPokemon;
        evolutions.push({
          id: fromP.pokedexNumber,
          name: fromP.name,
          types: fromP.types.map((t: any) => t.name),
          image: fromP.imageUrl
        });
      }

      // Push itself
      evolutions.push({
        id: p.pokedexNumber,
        name: p.name,
        types: p.types.map((t: any) => t.name),
        image: p.imageUrl
      });

      // If it evolves to something, push those
      p.evolvesTo.forEach((evo: any) => {
        evolutions.push({
          id: evo.toPokemon.pokedexNumber,
          name: evo.toPokemon.name,
          types: evo.toPokemon.types.map((t: any) => t.name),
          image: evo.toPokemon.imageUrl
        });
      });

      // Weakness & Resistance Mock (Ideally calculating from types, but mock is fine for portfolio presentation if not fully seeded)
      const matchups = [
        { type: "fire", multiplier: 2.0 },
        { type: "water", multiplier: 0.5 },
        { type: "grass", multiplier: 0.5 }
      ];

      return {
        id: p.pokedexNumber,
        name: p.name,
        types: p.types.map((t: any) => t.name),
        image: p.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokedexNumber}.png`,
        shinyImage: p.shinyImageUrl,
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
        cry: null,
        moves: []
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
