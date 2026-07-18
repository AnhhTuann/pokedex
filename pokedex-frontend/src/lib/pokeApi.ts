import { PokemonListItem, Pokemon } from '../types';

const GQL_ENDPOINT = 'http://localhost:3000/graphql';
const API_BASE_URL = 'http://localhost:3000';

const LIST_QUERY = `
  query getPokemonList($limit: Int, $offset: Int) {
    pokemonList(limit: $limit, offset: $offset) {
      results {
        id
        name
        types
        image
        shinyImage
      }
    }
  }
`;

const DETAIL_QUERY = `
  query getPokemonDetail($id: Int!) {
    pokemon(id: $id) {
      id
      name
      types
      image
      shinyImage
      category
      height
      weight
      stats {
        name
        value
      }
      abilities
      description
      evolutions {
        id
        name
        types
        image
        shinyImage
      }
      moves {
        name
        type
        power
        accuracy
        pp
        generation
      }
    }
  }
`;

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListItem[]> {
  try {
    const response = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: LIST_QUERY,
        variables: { limit, offset },
      }),
    });

    const { data, errors } = await response.json();
    if (errors) {
      console.error("GraphQL Errors:", errors);
      return [];
    }
    
    return data.pokemonList.results.map((p: any) => ({
      ...p,
      image: p.image ? `${API_BASE_URL}${p.image}` : '',
      shinyImage: p.shinyImage ? `${API_BASE_URL}${p.shinyImage}` : '',
    }));
  } catch (err) {
    console.error("Failed to fetch pokemon list:", err);
    return [];
  }
}

export async function fetchPokemonDetail(id: number): Promise<Pokemon> {
  const response = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: DETAIL_QUERY,
      variables: { id },
    }),
  });

  const { data, errors } = await response.json();
  if (errors || !data?.pokemon) {
    throw new Error("Failed to fetch pokemon details");
  }

  const p = data.pokemon;

  return {
    id: p.id,
    name: p.name,
    types: p.types,
    image: p.image ? `${API_BASE_URL}${p.image}` : '',
    shinyImage: p.shinyImage ? `${API_BASE_URL}${p.shinyImage}` : '',
    stats: p.stats,
    abilities: p.abilities,
    description: p.description || '',
    category: p.category,
    height: p.height,
    weight: p.weight,
  };
}
