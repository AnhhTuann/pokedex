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

  const { favorites } = useMyPokedex();
  const isCompareMode = viewMode === 'compare';
  const showFavorites = viewMode === 'favorites';
  const isZA = selectedVersion === 'legends-za';

  // State for Legends: Z-A custom regional datasets
  const [zaRegion, setZaRegion] = useState<'lumiose' | 'hyperspace'>('lumiose');
  const [zaPokemonList, setZaPokemonList] = useState<any[]>([]);
  const [zaLoading, setZaLoading] = useState<boolean>(false);
  const [zaError, setZaError] = useState<string | null>(null);

  useEffect(() => {
    if (!isZA) return;

    const fetchZAPokedex = async () => {
      setZaLoading(true);
      setZaError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/pokedex/za/${zaRegion}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch Legends: Z-A Pokédex data for: ${zaRegion}`);
        }
        const data = await response.json();
        setZaPokemonList(data);
      } catch (err: any) {
        console.error("Error fetching Z-A Pokédex:", err);
        setZaError(err.message || "An error occurred while fetching Z-A Pokédex.");
      } finally {
        setZaLoading(false);
      }
    };

    fetchZAPokedex();
  }, [isZA, zaRegion]);

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
    skip: isZA // Skip GraphQL query completely for Legends: Z-A custom regional dex
  });

  // Client-side search and type filtering for Legends: Z-A Custom Dex
  const filteredZaList = isZA 
    ? zaPokemonList
        .filter(p => {
          const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
          const matchesType = typeFilter ? p.types.map(t => t.toLowerCase()).includes(typeFilter.toLowerCase()) : true;
          return matchesSearch && matchesType;
        })
        .map(p => {
          const baseForm = zaPokemonList.find(b => b.regionalId === p.regionalId && !b.isMega && b.id < 10000);
          const speciesId = baseForm ? baseForm.id : p.id;
          return {
            ...p,
            image: p.spriteUrl || p.sprite,
            shinyImage: p.shinySprite || p.spriteUrl || p.sprite,
            regionalNumber: parseInt(p.regionalId.replace('#', ''), 10) || p.id,
            speciesId: speciesId
          };
        })
    : [];

  const pokemonList  = isZA ? filteredZaList : (data?.pokemonList?.results || []);
  const totalCount   = isZA ? filteredZaList.length : (data?.pokemonList?.totalCount || 0);
  const hasMore      = !isZA && pokemonList.length > 0 && pokemonList.length < totalCount;

  const isZALoading  = isZA ? zaLoading : loading;
  const isZAError    = isZA ? zaError : error;

  const loadMore = () => {
    if (isZA) return;
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

      {/* Legends: Z-A Regional Tabs */}
      {isZA && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ToggleButtonGroup
            value={zaRegion}
            exclusive
            onChange={(_, value) => value && setZaRegion(value)}
            sx={{
              bgcolor: 'background.paper',
              p: 0.5,
              borderRadius: '16px',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <ToggleButton
              value="lumiose"
              sx={{
                px: 4,
                py: 1,
                borderRadius: '12px !important',
                fontWeight: 800,
                textTransform: 'none',
                color: 'text.secondary',
                border: 'none !important',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  bgcolor: alpha('#22c55e', 0.15),
                  color: '#22c55e',
                  textShadow: '0 0 10px rgba(34, 197, 94, 0.4)',
                  boxShadow: '0 0 12px rgba(34, 197, 94, 0.15)',
                  '&:hover': {
                    bgcolor: alpha('#22c55e', 0.25),
                  }
                }
              }}
            >
              Lumiose City Dex
            </ToggleButton>
            <ToggleButton
              value="hyperspace"
              sx={{
                px: 4,
                py: 1,
                borderRadius: '12px !important',
                fontWeight: 800,
                textTransform: 'none',
                color: 'text.secondary',
                border: 'none !important',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  bgcolor: alpha('#06b6d4', 0.15),
                  color: '#06b6d4',
                  textShadow: '0 0 10px rgba(6, 182, 212, 0.4)',
                  boxShadow: '0 0 12px rgba(6, 182, 212, 0.15)',
                  '&:hover': {
                    bgcolor: alpha('#06b6d4', 0.25),
                  }
                }
              }}
            >
              Hyperspace Dex
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

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
      {!isZALoading && !isZAError && (
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
      {isZALoading ? (
        <Grid container spacing={3}>
          {[...Array(12)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton variant="rounded" height={280} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      ) : isZAError ? (
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          Backend offline — start the server on port 3000.
        </Alert>
      ) : (
        // Standard Grid View Layout (Unified across all pokedex versions!)
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
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

      {!isZALoading && hasMore && (
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
