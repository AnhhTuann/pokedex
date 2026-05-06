import { PokemonListItem, Pokemon } from '../types';

const GQL_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta';

const LIST_QUERY = `
  query getPokemonList($limit: Int, $offset: Int) {
    pokemon: pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: asc}) {
      id
      name
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

const DETAIL_QUERY = `
  query getPokemonDetail($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      stats: pokemon_v2_pokemonstats {
        value: base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }
      species: pokemon_v2_pokemonspecy {
        flavor_texts: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
          flavor_text
        }
      }
    }
  }
`;

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListItem[]> {
  const response = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      query: LIST_QUERY,
      variables: { limit, offset },
    }),
  });

  const { data } = await response.json();
  
  return data.pokemon.map((p: any) => ({
    id: p.id,
    name: p.name,
    types: p.types.map((t: any) => t.type.name),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
  }));
}

export async function fetchPokemonDetail(id: number): Promise<Pokemon> {
  const response = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      query: DETAIL_QUERY,
      variables: { id },
    }),
  });

  const { data } = await response.json();
  const p = data.pokemon;

  return {
    id: p.id,
    name: p.name,
    types: p.types.map((t: any) => t.type.name),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
    stats: p.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.value,
    })),
    abilities: p.abilities.map((a: any) => a.ability.name),
    description: p.species.flavor_texts[0]?.flavor_text?.replace(/\f/g, ' ') || '',
  };
}
