import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Box, Grid, Button, ButtonGroup, Typography, Alert, Skeleton, useTheme, alpha,
  Stack, Paper, Tooltip, Card, IconButton, Chip
} from '@mui/material';
import { AutoAwesome, Favorite, Compare, FavoriteBorder, Star, StarBorder, RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import { AnimatePresence, motion } from 'motion/react';
import PokeCard from './PokeCard';
import SearchBar from './SearchBar';
import PokeDetail from './PokeDetail';
import CompareModal from './CompareModal';
import { PokemonListItem } from '../types';
import { useMyPokedex } from '../lib/MyPokedexContext';
import { useTeamStore } from '../lib/teamStore';
import { VERSION_COLORS, getRegionAndGame } from '../App';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $gen: Int, $ids: [Int!], $region: String, $game: String) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, gen: $gen, ids: $ids, region: $region, game: $game) {
      results { id name types image shinyImage category regionalNumber speciesId }
      totalCount
    }
  }
`;

const TYPE_COLORS: Record<string, string> = {
  normal: "#9ca3af",
  fire: "#f97316",
  water: "#3b82f6",
  electric: "#eab308",
  grass: "#22c55e",
  ice: "#06b6d4",
  fighting: "#ef4444",
  poison: "#a855f7",
  ground: "#d97706",
  flying: "#818cf8",
  psychic: "#ec4899",
  bug: "#84cc16",
  rock: "#78716c",
  ghost: "#7c3aed",
  dragon: "#1d4ed8",
  dark: "#374151",
  steel: "#6b7280",
  fairy: "#f472b6",
};

const getPastelColor = (type: string): string => {
  const typeLower = type.toLowerCase();
  switch (typeLower) {
    case 'grass': return '#c3deb0';
    case 'fire': return '#f2ad7c';
    case 'water': return '#6cbce5';
    case 'electric': return '#f7df7e';
    case 'bug': return '#ced272';
    case 'normal': return '#d1d1cf';
    case 'poison': return '#cfafd3';
    case 'ground': return '#ebd39e';
    case 'flying': return '#cfc6e9';
    case 'fighting': return '#df9c95';
    case 'psychic': return '#e8a2af';
    case 'rock': return '#cabf95';
    case 'ghost': return '#b6a3cc';
    case 'dragon': return '#a3b5eb';
    case 'dark': return '#a8a8a8';
    case 'steel': return '#becad6';
    case 'fairy': return '#e9b6cd';
    default: return '#e2e8f0';
  }
};

const getDarkGradient = (type: string): string => {
  const typeLower = type.toLowerCase();
  switch (typeLower) {
    case 'grass': return 'linear-gradient(145deg, #143524 0%, #111827 100%)';
    case 'fire': return 'linear-gradient(145deg, #3f1a1a 0%, #111827 100%)';
    case 'water': return 'linear-gradient(145deg, #142e47 0%, #111827 100%)';
    case 'electric': return 'linear-gradient(145deg, #383015 0%, #111827 100%)';
    case 'bug': return 'linear-gradient(145deg, #272c11 0%, #111827 100%)';
    case 'normal': return 'linear-gradient(145deg, #2d2d30 0%, #111827 100%)';
    case 'poison': return 'linear-gradient(145deg, #2b1830 0%, #111827 100%)';
    case 'ground': return 'linear-gradient(145deg, #302616 0%, #111827 100%)';
    case 'flying': return 'linear-gradient(145deg, #1f1b30 0%, #111827 100%)';
    case 'fighting': return 'linear-gradient(145deg, #351918 0%, #111827 100%)';
    case 'psychic': return 'linear-gradient(145deg, #381525 0%, #111827 100%)';
    case 'rock': return 'linear-gradient(145deg, #2b251a 0%, #111827 100%)';
    case 'ghost': return 'linear-gradient(145deg, #1b162d 0%, #111827 100%)';
    case 'dragon': return 'linear-gradient(145deg, #121d42 0%, #111827 100%)';
    case 'dark': return 'linear-gradient(145deg, #1a1a1f 0%, #111827 100%)';
    case 'steel': return 'linear-gradient(145deg, #1d2228 0%, #111827 100%)';
    case 'fairy': return 'linear-gradient(145deg, #351c2a 0%, #111827 100%)';
    default: return 'linear-gradient(145deg, #1f2937 0%, #111827 100%)';
  }
};

type ViewMode = 'all' | 'favorites' | 'compare';

// Custom Regional Dex for Legends: Z-A containing the starter lines and key Pokémon
const ZA_REGIONAL_DEX = [
  'chikorita', 'bayleef', 'meganium',
  'tepig', 'pignite', 'emboar',
  'totodile', 'croconaw', 'feraligatr',
  'bulbasaur', 'ivysaur', 'venusaur',
  'charmander', 'charmeleon', 'charizard',
  'squirtle', 'wartortle', 'blastoise',
  'pikachu', 'raichu',
  'greninja', 'zygarde'
];

export default function PokemonDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { selectedVersion, isShinyMode } = useTeamStore();

  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [genFilter, setGenFilter]     = useState<number | null>(null);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>('all');
  const [compareIds, setCompareIds]   = useState<number[]>([]);
  const [zaTab, setZaTab]             = useState<'lumiose' | 'hyperspace'>('lumiose');

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
  let queryRegion = rawRegion !== 'ALL' ? rawRegion : undefined;
  const queryGame = rawGame !== 'ALL' ? rawGame : undefined;

  if (selectedVersion === 'legends-za') {
    queryRegion = zaTab === 'lumiose' ? 'kalos-central-lumiose' : 'kalos-central-hyperspace';
  }

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
    }
  });

  const pokemonList  = data?.pokemonList?.results || [];
  const totalCount   = data?.pokemonList?.totalCount || 0;
  const hasMore      = pokemonList.length > 0 && pokemonList.length < totalCount;

  const loadMore = () => {
    fetchMore({ variables: { offset: pokemonList.length } });
  };

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

      {/* Legends: Z-A Regional Tabs */}
      {selectedVersion === 'legends-za' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ToggleButtonGroup
            value={zaTab}
            exclusive
            onChange={(_, val) => { if (val) setZaTab(val); }}
            aria-label="Legends Z-A Pokédex Sections"
            sx={{
              background: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(243, 244, 246, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '4px',
              borderRadius: '16px',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: '12px',
                px: 4,
                py: 1,
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: 'uppercase',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                },
                '&:hover': {
                  background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  }
                }
              }
            }}
          >
            <ToggleButton value="lumiose" id="za-tab-lumiose">
              Lumiose City Dex
            </ToggleButton>
            <ToggleButton value="hyperspace" id="za-tab-hyperspace">
              Hyperspace Dex
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

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

      {/* Pokemon List / Grid */}
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
        <Grid container spacing={3} key={`${selectedVersion}-${zaTab}-${viewMode}`}>
          <AnimatePresence mode="wait">
            {pokemonList.map((p: any, idx: number) => (
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
