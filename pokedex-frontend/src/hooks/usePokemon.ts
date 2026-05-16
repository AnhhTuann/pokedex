import { useQuery } from '@apollo/client';
import { GET_POKEMON_LIST, GET_POKEMON_DETAIL } from '../services/graphql/pokemon.queries';

export interface PokemonListParams {
  limit?: number;
  offset?: number;
  search?: string;
  type?: string;
  gen?: number | null;
  ids?: number[] | null;
  region?: string | null;
  game?: string | null;
}

export function usePokemonList(params: PokemonListParams) {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_POKEMON_LIST, {
    variables: params,
    notifyOnNetworkStatusChange: true, // Để loading state cập nhật mượt hơn khi fetchMore
  });

  return {
    pokemonList: data?.pokemonList?.results || [],
    totalCount: data?.pokemonList?.totalCount || 0,
    loading,
    error,
    refetch,
    fetchMore,
  };
}

export function usePokemonDetail(id: number | null, version?: string, skip: boolean = false) {
  const { data, loading, error, refetch } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id, version },
    skip: skip || !id, // Bỏ qua query nếu id không hợp lệ hoặc đang chờ
  });

  return {
    pokemon: data?.pokemon || null,
    loading,
    error,
    refetch,
  };
}
