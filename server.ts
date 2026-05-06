import express from 'express';
import { ApolloServer } from '@apollo/server';
// @ts-ignore
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import url from 'url';

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

  type PokemonDetail {
    id: Int!
    name: String!
    types: [String!]!
    image: String!
    height: Int
    weight: Int
    stats: [Stat!]
    abilities: [String!]
    description: String
    evolutions: [PokemonListItem!]
  }

  type Query {
    pokemonList(limit: Int, offset: Int, search: String, type: String, ids: [Int!]): PokemonListResponse
    pokemon(id: Int!): PokemonDetail
  }
`;

// Simple memory cache for basic pokeapi data to support search & filter easily
let cachedAllPokemon: any[] = [];
let isCacheLoaded = false;

async function loadCache() {
  if (isCacheLoaded) return;
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
    const data = await res.json();
    cachedAllPokemon = data.results.map((p: any) => {
      const parts = p.url.split('/').filter(Boolean);
      return {
        name: p.name,
        id: parseInt(parts[parts.length - 1], 10)
      };
    });
    isCacheLoaded = true;
  } catch (e) {
    console.error("Failed to load pokemon cache", e);
  }
}

const resolvers = {
  Query: {
    pokemonList: async (_: any, { limit = 20, offset = 0, search = '', type = '', ids = null }: any) => {
      await loadCache();
      
      let filtered = cachedAllPokemon;

      if (ids && Array.isArray(ids) && ids.length > 0) {
        const idSet = new Set(ids);
        filtered = filtered.filter(p => idSet.has(p.id));
      } else if (ids && Array.isArray(ids) && ids.length === 0) {
        // Return early if requesting empty list of IDs
        return { results: [], totalCount: 0 };
      }

      if (type) {
        try {
          const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
          const typeData = await typeRes.json();
          const typePokemonIds = new Set(typeData.pokemon.map((p: any) => {
            const parts = p.pokemon.url.split('/').filter(Boolean);
            return parseInt(parts[parts.length - 1], 10);
          }));
          filtered = filtered.filter(p => typePokemonIds.has(p.id));
        } catch (e) {
          console.error("Failed to fetch type", e);
        }
      }

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => p.name.includes(s) || p.id.toString() === s);
      }

      const totalCount = filtered.length;
      const paginated = filtered.slice(offset, offset + limit);

      // Fetch details for the paginated slice to get types and images
      const results = await Promise.all(
        paginated.map(async (p) => {
          try {
            const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
            const detail = await detailRes.json();
            return {
              id: p.id,
              name: p.name,
              types: detail.types.map((t: any) => t.type.name),
              image: detail.sprites.other['official-artwork'].front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
            };
          } catch(e) {
            return {
              id: p.id,
              name: p.name,
              types: [],
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
            };
          }
        })
      );

      return {
        results,
        totalCount
      };
    },
    pokemon: async (_: any, { id }: { id: number }) => {
      try {
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).catch(() => null)
        ]);

        if (!pokemonRes.ok) return null;
        
        const data = await pokemonRes.json();
        const speciesData = speciesRes && speciesRes.ok ? await speciesRes.json() : null;

        let description = '';
        if (speciesData) {
          const flavorEntry = speciesData.flavor_text_entries?.find((entry: any) => entry.language.name === 'en');
          description = flavorEntry ? flavorEntry.flavor_text.replace(/[\n\f\r]/g, ' ') : '';
        }

        // Fetch evolutions
        let evolutions: any[] = [];
        if (speciesData && speciesData.evolution_chain?.url) {
          try {
            const evoRes = await fetch(speciesData.evolution_chain.url);
            const evoData = await evoRes.json();
            
            // Flatten evolution chain
            const getEvolutions = (chainData: any) => {
              const evos = [];
              let current = chainData;
              while (current) {
                if (current.species?.url) {
                  const parts = current.species.url.split('/').filter(Boolean);
                  const evoId = parseInt(parts[parts.length - 1], 10);
                
                  evos.push({
                    id: evoId,
                    name: current.species.name,
                    types: [], // Will load async if needed, but keeping empty for now or loading them
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoId}.png`
                  });
                }
                current = current.evolves_to?.[0]; // just taking the first branch for simplicity
              }
              return evos;
            };
            evolutions = getEvolutions(evoData.chain);
          } catch (e) {
            console.error("Evolution parsing error", e);
          }
        }

        return {
          id: data.id,
          name: data.name,
          types: data.types.map((t: any) => t.type.name),
          image: data.sprites.other['official-artwork'].front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          height: data.height,
          weight: data.weight,
          stats: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
          abilities: data.abilities.map((a: any) => a.ability.name),
          description,
          evolutions
        };
      } catch (e) {
        console.error("Failed to fetch pokemon", e);
        return null;
      }
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

  app.use(express.json());
  app.use(cors());

  app.use('/graphql', expressMiddleware(apolloServer));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Support ESM __dirname in production
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer();
