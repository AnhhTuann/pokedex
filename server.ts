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

const detailCache = new Map<number, any>();

const resolvers = {
  Query: {
    ping: () => "pong!",
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
      if (detailCache.has(id)) {
        return detailCache.get(id);
      }
      try {
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).catch(() => null)
        ]);

        if (!pokemonRes.ok) return null;
        
        const data = await pokemonRes.json();
        const speciesData = speciesRes && speciesRes.ok ? await speciesRes.json() : null;

        let description = '';
        let flavorTexts: any[] = [];
        if (speciesData) {
          const flavorEntry = speciesData.flavor_text_entries?.find((entry: any) => entry.language.name === 'en');
          description = flavorEntry ? flavorEntry.flavor_text.replace(/[\n\f\r]/g, ' ') : '';
          
          if (speciesData.flavor_text_entries) {
            flavorTexts = speciesData.flavor_text_entries
              .filter((e: any) => e.language.name === 'en')
              .map((e: any) => ({
                version: e.version.name,
                text: e.flavor_text.replace(/[\n\f\r]/g, ' ')
              }));
          }
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

        // Fetch matchups
        const typeUrls = data.types.map((t: any) => t.type.url);
        const typeDefRes = await Promise.all(typeUrls.map((url: string) => fetch(url).then(r => r.json())));
        
        const multiplierMap = new Map<string, number>();
        // initialize standard types to 1
        const allTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
        allTypes.forEach(t => multiplierMap.set(t, 1));

        typeDefRes.forEach((typeData: any) => {
          const relation = typeData.damage_relations;
          relation.double_damage_from.forEach((t: any) => multiplierMap.set(t.name, (multiplierMap.get(t.name) || 1) * 2));
          relation.half_damage_from.forEach((t: any) => multiplierMap.set(t.name, (multiplierMap.get(t.name) || 1) * 0.5));
          relation.no_damage_from.forEach((t: any) => multiplierMap.set(t.name, (multiplierMap.get(t.name) || 1) * 0));
        });

        const matchups = [];
        for (const [type, multiplier] of Array.from(multiplierMap.entries())) {
          if (multiplier !== 1) {
            matchups.push({ type, multiplier });
          }
        }

        const cry = data.cries?.latest || null;

        const gameVersions = data.game_indices ? data.game_indices.map((g: any) => g.version.name) : [];
        const shinyImage = data.sprites?.other?.['official-artwork']?.front_shiny || null;

        const result = {
          id: data.id,
          name: data.name,
          types: data.types.map((t: any) => t.type.name),
          image: data.sprites.other['official-artwork'].front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          shinyImage,
          height: data.height,
          weight: data.weight,
          stats: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
          abilities: data.abilities.map((a: any) => a.ability.name),
          description,
          flavorTexts,
          gameVersions,
          evolutions,
          matchups,
          cry,
          rawMoves: data.moves // Added rawMoves
        };
        
        detailCache.set(id, result);
        return result;
      } catch (e) {
        console.error("Failed to fetch pokemon", e);
        return null;
      }
    }
  },
  PokemonDetail: {
    moves: async (parent: any) => {
      if (!parent.rawMoves || parent.rawMoves.length === 0) return [];
      
      // Limit to 40 moves to respect API limits and performance
      const topMoves = parent.rawMoves.slice(0, 40);
      
      try {
        const movesData = await Promise.all(topMoves.map(async (m: any) => {
          const res = await fetch(m.move.url);
          if (!res.ok) return null;
          const detail = await res.json();
          return {
            name: detail.name,
            type: detail.type.name,
            power: detail.power,
            accuracy: detail.accuracy,
            damageClass: detail.damage_class?.name
          };
        }));
        
        return movesData.filter(Boolean);
      } catch (e) {
        console.error("Failed to fetch moves", e);
        return [];
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

  console.log("Starting Apollo Server with schema containing shinyImage:", typeDefs.includes('shinyImage'));

  await apolloServer.start();
  console.log("SERVER BOOTSTRAP V2: MATCHUPS PRESENT");

  app.use(express.json());
  app.use(cors());

  app.get('/api/ping', (req, res) => res.send('pong from edited server!'));

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
