import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import { collectPokemonPages, type PokemonPage } from '../lib/collectPokemonPages';
import { REFERENCE_LIST } from '../services/graphql/reference.queries';
import { resolveReferenceArtwork } from './useReferencePokemon';
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
      const { data } = await client.query<{ referencePokemonList: PokemonPage<PokemonListItem> }>({
        query: REFERENCE_LIST,
        variables: { filters: { search, type, dex: region, game, offset, limit: 250,
          availability: game && region ? 'REGIONAL_DEX_MEMBER' : undefined } },
        fetchPolicy: 'no-cache',
      });
      return { ...data.referencePokemonList, results: data.referencePokemonList.results.map(resolveReferenceArtwork) };
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
