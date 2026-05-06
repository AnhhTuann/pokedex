import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  AppBar, Toolbar, Typography, Container, Box, Grid, Button,
  ButtonGroup, IconButton, Tooltip, Skeleton, Alert, useTheme,
  Stack
} from '@mui/material';
import {
  WbSunny, DarkMode, Favorite,
  AutoAwesome, Compare, SportsEsports
} from '@mui/icons-material';
import { AnimatePresence } from 'motion/react';
import PokeCard from './components/PokeCard';
import SearchBar from './components/SearchBar';
import PokeDetail from './components/PokeDetail';
import CompareModal from './components/CompareModal';
import GameModal from './components/GameModal';
import TeamBuilder from './components/TeamBuilder';
import { PokemonListItem } from './types';
import { useMyPokedex } from './lib/MyPokedexContext';
import { useColorMode } from './main';

const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $gen: Int, $ids: [Int!]) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, gen: $gen, ids: $ids) {
      results { id name types image category }
      totalCount
    }
  }
`;

type ViewMode = 'all' | 'favorites' | 'compare';

export default function App() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === 'dark';

  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [genFilter, setGenFilter]     = useState<number | null>(null);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>('all');
  const [compareIds, setCompareIds]   = useState<number[]>([]);
  const [gameOpen, setGameOpen]       = useState(false);

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

  const { data, loading, error, fetchMore } = useQuery<{
    pokemonList: { results: PokemonListItem[]; totalCount: number };
  }>(GET_POKEMON_LIST, {
    variables: { limit: 24, offset: 0, search, type: typeFilter, gen: genFilter, ids: showFavorites ? favorites : null },
  });

  const pokemonList  = data?.pokemonList?.results || [];
  const totalCount   = data?.pokemonList?.totalCount || 0;
  const hasMore      = pokemonList.length > 0 && pokemonList.length < totalCount;

  const loadMore = () => fetchMore({ variables: { offset: pokemonList.length } });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 20 }}>

      {/* ── AppBar ── */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: isDark ? 'rgba(15,15,26,0.88)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1.5,
            py: { xs: 1.5, md: 1 },
            alignItems: { xs: 'stretch', md: 'center' }
          }}
        >
          {/* Top row: Title and mobile action buttons on narrow viewports */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: '100%', md: 'auto' } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, letterSpacing: -0.5, color: 'text.primary', whiteSpace: 'nowrap', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              🔴 POKÉDEX
            </Typography>

            {/* Buttons (Show on mobile next to Title) */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Tooltip title="Who's That Pokémon? 🎮">
                  <IconButton
                    id="open-game-btn-mobile"
                    onClick={() => setGameOpen(true)}
                    sx={{
                      bgcolor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.main', color: '#fff' },
                    }}
                  >
                    <SportsEsports fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
                  <IconButton onClick={toggleColorMode} sx={{ color: 'text.secondary' }} size="small">
                    {isDark ? <WbSunny fontSize="small" /> : <DarkMode fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Box>

          {/* SearchBar wrapper (full width on mobile, flexible on desktop) */}
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 200 } }}>
            <SearchBar
              value={search}         onChange={setSearch}
              typeValue={typeFilter} onTypeChange={setTypeFilter}
              genValue={genFilter}   onGenChange={setGenFilter}
            />
          </Box>

          {/* Buttons (Show on desktop next to searchbar) */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Tooltip title="Who's That Pokémon? 🎮">
                <IconButton
                  id="open-game-btn"
                  onClick={() => setGameOpen(true)}
                  sx={{
                    bgcolor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'primary.main', color: '#fff' },
                  }}
                >
                  <SportsEsports />
                </IconButton>
              </Tooltip>
              <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
                <IconButton onClick={toggleColorMode} sx={{ color: 'text.secondary' }}>
                  {isDark ? <WbSunny /> : <DarkMode />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Main ── */}
      <Container maxWidth="xl" sx={{ pt: 4, px: { xs: 2, sm: 3 } }}>

        {/* View Mode Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
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
                sx={{ px: 3, fontWeight: viewMode === key ? 800 : 600 }}
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Button variant="outlined" size="large" onClick={loadMore} sx={{ px: 6, borderRadius: 50 }}>
              Load More
            </Button>
          </Box>
        )}
      </Container>

      <PokeDetail id={selectedId} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
      <CompareModal ids={compareIds} onClose={() => { setCompareIds([]); setViewMode('all'); }} />
      {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}
      <TeamBuilder />
    </Box>
  );
}
