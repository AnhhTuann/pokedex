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
    pokemonList(limit: Int, offset: Int, search: String, type: String, ids: [Int!]): PokemonListResponse
    pokemon(id: Int!): PokemonDetail
  }
`;

const resolvers = {
  Query: {
    ping: () => "pong from Prisma backend!",
    
    pokemonList: async (_: any, { limit = 20, offset = 0, search = '', type = '', ids = null }: any) => {
      const where: any = {};
      
      if (ids && Array.isArray(ids) && ids.length > 0) {
        where.pokedexNumber = { in: ids };
      } else if (ids && Array.isArray(ids) && ids.length === 0) {
        return { results: [], totalCount: 0 };
      }

      if (search) {
        where.OR = [
          { name: { contains: search.toLowerCase() } },
          // Simple search by ID if it's a number
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

      const results = pokemons.map(p => ({
        id: p.pokedexNumber,
        name: p.name,
        types: p.types.map(t => t.name),
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
        include: { types: true, abilities: true }
      });

      if (!p) return null;

      return {
        id: p.pokedexNumber,
        name: p.name,
        types: p.types.map(t => t.name),
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
        abilities: p.abilities.map(a => a.name),
        
        // Phase 3 placeholders
        description: "Data will be seeded in Phase 3",
        flavorTexts: [],
        gameVersions: [],
        evolutions: [],
        matchups: [],
        cry: null,
        moves: []
      };
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
  console.log("Apollo Server started.");

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
