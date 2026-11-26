import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import { collectPokemonPages, type PokemonPage } from '../lib/collectPokemonPages';
import { GET_POKEMON_LIST } from '../services/graphql/pokemon.queries';
import type { PokemonListItem } from '../types';

interface TrackerFilters {
  search?: string;
  type?: string;
  region?: string;
  game?: string;
}

export function useCompletePokemonList({ search, type, region, game }: TrackerFilters, enabled = true) {
  const client = useApolloClient();
  const key = JSON.stringify([search, type, region, game]);
  const [settled, setSettled] = useState<{
    key: string;
    rows?: PokemonListItem[];
    error?: unknown;
  }>();
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    void collectPokemonPages(async offset => {
      if (!active) throw new Error('Pokémon filters changed.');
      const { data } = await client.query<{ pokemonList: PokemonPage<PokemonListItem> }>({
        query: GET_POKEMON_LIST,
        variables: { search, type, region, game, offset, limit: 250 },
        fetchPolicy: 'no-cache',
      });
      return data.pokemonList;
    }).then(
      rows => { if (active) setSettled({ key, rows }); },
      error => { if (active) setSettled({ key, error }); },
    );

    return () => { active = false; };
  }, [client, key, search, type, region, game, attempt, enabled]);

  const current = settled?.key === key ? settled : undefined;
  return {
    rows: current?.rows,
    loading: !current,
    error: current?.error,
    retry: () => {
      setSettled(undefined);
      setAttempt(previous => previous + 1);
    },
  };
}
