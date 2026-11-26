import { useQuery } from '@apollo/client';
import { assetUrl } from '../lib/apiConfig';
import type { PokemonListItem } from '../types';
import { REFERENCE_CATALOG, REFERENCE_DETAIL, REFERENCE_LIST } from '../services/graphql/reference.queries';

export interface ReferenceFilters {
  limit?: number;
  offset?: number;
  game?: string;
  dex?: string;
  gen?: number | null;
  broadRegion?: string;
  category?: string;
  availability?: string;
  availabilityState?: 'CONFIRMED' | 'UNKNOWN';
  search?: string;
  type?: string;
  ids?: number[] | null;
}

export function resolveReferenceArtwork<T extends { image: string; shinyImage?: string | null }>(row: T) {
  return { ...row, image: assetUrl(row.image), shinyImage: assetUrl(row.shinyImage) || undefined };
}

export function useReferenceList(filters: ReferenceFilters, { skip = false } = {}) {
  const { data, loading, error, fetchMore } = useQuery<{ referencePokemonList: {
    results: PokemonListItem[]; totalCount: number;
  } }>(REFERENCE_LIST, { variables: { filters }, notifyOnNetworkStatusChange: true, skip });
  const page = data?.referencePokemonList;
  return {
    pokemonList: page?.results.map(resolveReferenceArtwork) ?? [],
    totalCount: page?.totalCount ?? 0,
    loading,
    error,
    loadMore: () => fetchMore({ variables: { filters: { ...filters, offset: page?.results.length ?? 0 } } }),
  };
}

export function useReferenceCatalog() {
  const { data } = useQuery<{ referenceCatalog: {
    games: { slug: string; displayName: string; referenceDexes: string[] }[];
    dexes: { slug: string; region: string | null }[];
  } }>(REFERENCE_CATALOG);
  return data?.referenceCatalog;
}

interface ReferenceDetail extends Omit<PokemonListItem, 'shinyImage'> {
  shinyImage: string | null;
  height: number | null;
  weight: number | null;
  description: string | null;
  cry: string | null;
  stats: { name: string; value: number }[];
  abilities: string[];
  abilitySlots: { name: string; hidden: boolean }[];
  matchups: { type: string; multiplier: number }[];
  availability: { facet: string; state: string }[];
  learnset: { state: string; entries: {
    moveId: number; name: string; method: string; level: number; enhancementLevel: number | null; versionGroup: string;
  }[] } | null;
  evolution: { fromSpeciesId: number; toSpeciesId: number; trigger: string | null; versionGroup: string | null; conditionsJson: string; source: string }[];
  forms: { id: number; name: string; category: string; image: string; shinyImage: string | null }[];
}

export function useReferenceDetail(id: number | null, game?: string, generation?: number) {
  const { data, loading, error } = useQuery<{ referencePokemon: ReferenceDetail | null }>(
    REFERENCE_DETAIL, { variables: { id, game, generation }, skip: id == null });
  const row = data?.referencePokemon;
  return { pokemon: row ? resolveReferenceArtwork(row) : null, loading, error };
}
