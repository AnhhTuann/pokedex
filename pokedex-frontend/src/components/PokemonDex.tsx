import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Box, Grid, Button, ButtonGroup, Typography, Alert, Skeleton, useTheme, alpha
} from '@mui/material';
import { AutoAwesome, Favorite, Compare } from '@mui/icons-material';
import { AnimatePresence } from 'motion/react';
import PokeCard from './PokeCard';
import SearchBar from './SearchBar';
import PokeDetail from './PokeDetail';
import CompareModal from './CompareModal';
import { PokemonListItem } from '../types';
import { useMyPokedex } from '../lib/MyPokedexContext';
import { useTeamStore } from '../lib/teamStore';
import { VERSION_COLORS, getRegionAndGame } from '../App';

const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $gen: Int, $ids: [Int!], $region: String, $game: String) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, gen: $gen, ids: $ids, region: $region, game: $game) {
      results { id name types image shinyImage category regionalNumber speciesId }
      totalCount
    }
  }
`;

type ViewMode = 'all' | 'favorites' | 'compare';

export default function PokemonDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { selectedVersion } = useTeamStore();

  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [genFilter, setGenFilter]     = useState<number | null>(null);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>('all');
  const [compareIds, setCompareIds]   = useState<number[]>([]);

  const { favorites } = useMyPokedex();
  const isCompareMode = viewMode === 'compare';
  const showFavorites = viewMode === 'favorites';

  const handleCardClick = (id: number) => {
    if (isCompareMode) {
      setCompareIds(prev =>
        prev.includes(id) ? prev.filter(p => p !== id)
          : prev.length < 2 ? [...prev, id] : prev
      );
    } else {
      setSelectedId(id);
    }
  };

  const { region: rawRegion, game: rawGame } = getRegionAndGame(selectedVersion);
  const queryRegion = rawRegion !== 'ALL' ? rawRegion : undefined;
  const queryGame = rawGame !== 'ALL' ? rawGame : undefined;

  const { data, loading, error, fetchMore } = useQuery<{
    pokemonList: { results: PokemonListItem[]; totalCount: number };
  }>(GET_POKEMON_LIST, {
    variables: { 
      limit: 24, 
      offset: 0, 
      search, 
      type: typeFilter, 
      gen: genFilter, 
      ids: showFavorites ? favorites : null,
      region: queryRegion,
      game: queryGame
    },
  });

  const pokemonList  = data?.pokemonList?.results || [];
  const totalCount   = data?.pokemonList?.totalCount || 0;
  const hasMore      = pokemonList.length > 0 && pokemonList.length < totalCount;

  const loadMore = () => fetchMore({ variables: { offset: pokemonList.length } });

  return (
    <Container maxWidth="xl" sx={{ pt: 3, px: { xs: 2, sm: 3 } }}>
      
      {/* Search & Filter Section in body */}
      <Box sx={{ mb: 4 }}>
        <SearchBar
          value={search}         onChange={setSearch}
          typeValue={typeFilter} onTypeChange={setTypeFilter}
          genValue={genFilter}   onGenChange={setGenFilter}
        />
      </Box>

      {/* View Mode Toggle & Global Action bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4
        }}
      >
        <ButtonGroup variant="outlined" size="medium">
          {([
            { key: 'all',       label: 'All',                icon: <AutoAwesome sx={{ fontSize: 16 }} /> },
            { key: 'favorites', label: `Favs (${favorites.length})`, icon: <Favorite sx={{ fontSize: 16 }} /> },
            { key: 'compare',   label: compareIds.length === 2 ? 'Compare (2)' : 'Compare', icon: <Compare sx={{ fontSize: 16 }} /> },
          ] as const).map(({ key, label, icon }) => (
            <Button
              key={key}
              id={`view-mode-${key}`}
              startIcon={icon}
              onClick={() => { setViewMode(key); if (key !== 'compare') setCompareIds([]); }}
              variant={viewMode === key ? 'contained' : 'outlined'}
              color={key === 'favorites' && viewMode === key ? 'secondary' : 'primary'}
              sx={{ px: 3, fontWeight: viewMode === key ? 800 : 600, borderRadius: '12px' }}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Count */}
      {!loading && !error && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, textAlign: 'center', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>
          {totalCount} Pokémon {search ? `matching "${search}"` : ''}{genFilter ? ` · Gen ${genFilter}` : ''}
        </Typography>
      )}

      {/* Compare banner */}
      {isCompareMode && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 3, fontWeight: 700 }}>
          {compareIds.length === 0 && 'Select 2 Pokémon to compare.'}
          {compareIds.length === 1 && 'Select 1 more Pokémon.'}
          {compareIds.length === 2 && 'Ready! Click a card to compare.'}
        </Alert>
      )}

      {/* Grid */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(12)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton variant="rounded" height={280} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          Backend offline — start the server on port 3000.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {pokemonList.map((p: PokemonListItem, idx: number) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <PokeCard
                  pokemon={p}
                  index={idx % 12}
                  onClick={() => handleCardClick(p.id)}
                  isCompareMode={isCompareMode}
                  isSelectedForCompare={compareIds.includes(p.id)}
                />
              </Grid>
            ))}
          </AnimatePresence>

          {pokemonList.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 10, color: 'text.disabled' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>No Pokémon found.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {!loading && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 10 }}>
          <Button variant="outlined" size="large" onClick={loadMore} sx={{ px: 6, borderRadius: 50 }}>
            Load More
          </Button>
        </Box>
      )}

      <PokeDetail id={selectedId} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
      <CompareModal ids={compareIds} onClose={() => { setCompareIds([]); setViewMode('all'); }} />
    </Container>
  );
}
