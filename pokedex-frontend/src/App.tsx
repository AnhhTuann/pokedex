import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  AppBar, Toolbar, Typography, Container, Box, Grid, Button,
  ButtonGroup, IconButton, Tooltip, Skeleton, Alert, useTheme,
  Stack, FormControlLabel, Switch, Dialog, DialogTitle, DialogContent, DialogActions, Divider
} from '@mui/material';
import {
  WbSunny, DarkMode, Favorite,
  AutoAwesome, Compare, SportsEsports, VideogameAsset
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
import { useTeamStore } from './lib/teamStore';

const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $gen: Int, $ids: [Int!], $region: String, $game: String) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, gen: $gen, ids: $ids, region: $region, game: $game) {
      results { id name types image shinyImage category regionalNumber speciesId }
      totalCount
    }
  }
`;

export const VERSION_COLORS: Record<string, string> = {
  ALL: '#6b7280',
  red: '#ef4444',
  blue: '#3b82f6',
  yellow: '#eab308',
  gold: '#fbbf24',
  silver: '#9ca3af',
  crystal: '#06b6d4',
  ruby: '#dc2626',
  sapphire: '#2563eb',
  emerald: '#10b981',
  firered: '#ea580c',
  leafgreen: '#16a34a',
  diamond: '#a5f3fc',
  pearl: '#f472b6',
  platinum: '#4b5563',
  heartgold: '#d97706',
  soulsilver: '#64748b',
  black: '#1f2937',
  white: '#9ca3af',
  'black-2': '#111827',
  'white-2': '#e5e7eb',
  x: '#2563eb',
  y: '#dc2626',
  'omega-ruby': '#ea580c',
  'alpha-sapphire': '#1e40af',
  sun: '#f59e0b',
  moon: '#4338ca',
  'ultra-sun': '#d97706',
  'ultra-moon': '#312e81',
  sword: '#06b6d4',
  shield: '#e11d48',
  scarlet: '#be123c',
  violet: '#6d28d9',
};

export const GENERATION_VERSIONS = [
  {
    gen: "Generation I",
    games: [
      { name: "red", label: "Red" },
      { name: "blue", label: "Blue" },
      { name: "yellow", label: "Yellow" }
    ]
  },
  {
    gen: "Generation II",
    games: [
      { name: "gold", label: "Gold" },
      { name: "silver", label: "Silver" },
      { name: "crystal", label: "Crystal" }
    ]
  },
  {
    gen: "Generation III",
    games: [
      { name: "ruby", label: "Ruby" },
      { name: "sapphire", label: "Sapphire" },
      { name: "emerald", label: "Emerald" },
      { name: "firered", label: "FireRed" },
      { name: "leafgreen", label: "LeafGreen" }
    ]
  },
  {
    gen: "Generation IV",
    games: [
      { name: "diamond", label: "Diamond" },
      { name: "pearl", label: "Pearl" },
      { name: "platinum", label: "Platinum" },
      { name: "heartgold", label: "HeartGold" },
      { name: "soulsilver", label: "SoulSilver" }
    ]
  },
  {
    gen: "Generation V",
    games: [
      { name: "black", label: "Black" },
      { name: "white", label: "White" },
      { name: "black-2", label: "Black 2" },
      { name: "white-2", label: "White 2" }
    ]
  },
  {
    gen: "Generation VI",
    games: [
      { name: "x", label: "X" },
      { name: "y", label: "Y" },
      { name: "omega-ruby", label: "Omega Ruby" },
      { name: "alpha-sapphire", label: "Alpha Sapphire" }
    ]
  },
  {
    gen: "Generation VII",
    games: [
      { name: "sun", label: "Sun" },
      { name: "moon", label: "Moon" },
      { name: "ultra-sun", label: "Ultra Sun" },
      { name: "ultra-moon", label: "Ultra Moon" }
    ]
  },
  {
    gen: "Generation VIII",
    games: [
      { name: "sword", label: "Sword" },
      { name: "shield", label: "Shield" }
    ]
  },
  {
    gen: "Generation IX",
    games: [
      { name: "scarlet", label: "Scarlet" },
      { name: "violet", label: "Violet" }
    ]
  }
];

export const GAME_TO_REGIONAL_DEX: Record<string, string> = {
  red: 'kanto',
  blue: 'kanto',
  yellow: 'kanto',
  gold: 'original-johto',
  silver: 'original-johto',
  crystal: 'original-johto',
  ruby: 'hoenn',
  sapphire: 'hoenn',
  emerald: 'hoenn',
  firered: 'kanto',
  leafgreen: 'kanto',
  diamond: 'original-sinnoh',
  pearl: 'original-sinnoh',
  platinum: 'extended-sinnoh',
  heartgold: 'updated-johto',
  soulsilver: 'updated-johto',
  black: 'original-unova',
  white: 'original-unova',
  'black-2': 'updated-unova',
  'white-2': 'updated-unova',
  x: 'kalos-central',
  y: 'kalos-central',
  'omega-ruby': 'hoenn',
  'alpha-sapphire': 'hoenn',
  sun: 'original-alola',
  moon: 'original-alola',
  'ultra-sun': 'updated-alola',
  'ultra-moon': 'updated-alola',
  sword: 'galar',
  shield: 'galar',
  scarlet: 'paldea',
  violet: 'paldea',
};

export function getRegionAndGame(versionName: string) {
  const game = versionName.toLowerCase();
  if (game === 'all') {
    return { region: 'ALL', game: 'ALL' };
  }
  const region = GAME_TO_REGIONAL_DEX[game] || game;
  return { region, game };
}

type ViewMode = 'all' | 'favorites' | 'compare';

export default function App() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === 'dark';
  const { isShinyMode, toggleShinyMode, selectedVersion, setSelectedVersion } = useTeamStore();

  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [genFilter, setGenFilter]     = useState<number | null>(null);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>('all');
  const [compareIds, setCompareIds]   = useState<number[]>([]);
  const [gameOpen, setGameOpen]       = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);

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

        {/* View Mode Toggle & Global Shiny Switch */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            mb: 3
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
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

            <Button
              id="game-version-selector-btn"
              variant="contained"
              startIcon={<VideogameAsset />}
              onClick={() => setVersionDialogOpen(true)}
              sx={{
                bgcolor: selectedVersion === 'ALL' ? 'grey.800' : VERSION_COLORS[selectedVersion] || 'primary.main',
                color: (selectedVersion === 'white' || selectedVersion === 'white-2') ? '#000' : '#fff',
                fontWeight: 800,
                px: 2.5,
                height: 40,
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                boxShadow: selectedVersion !== 'ALL' ? `0 0 12px ${VERSION_COLORS[selectedVersion]}` : 'none',
                '&:hover': {
                  bgcolor: selectedVersion === 'ALL' ? 'grey.900' : VERSION_COLORS[selectedVersion] || 'primary.dark',
                  filter: 'brightness(1.15)',
                  boxShadow: selectedVersion !== 'ALL' ? `0 0 20px ${VERSION_COLORS[selectedVersion]}` : 'none',
                }
              }}
            >
              {selectedVersion === 'ALL' ? 'ALL VERSIONS' : `Version: ${selectedVersion}`}
            </Button>
          </Box>

          {/* Premium Glowing Global Shiny Mode Toggle Switch */}
          <FormControlLabel
            id="global-shiny-toggle"
            control={
              <Switch
                checked={isShinyMode}
                onChange={toggleShinyMode}
                color="secondary"
                sx={{
                  "& .MuiSwitch-thumb": {
                    bgcolor: isShinyMode ? "#f59e0b" : undefined,
                    boxShadow: isShinyMode ? "0 0 10px #f59e0b" : undefined,
                  }
                }}
              />
            }
            label={
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                <AutoAwesome
                  sx={{
                    fontSize: 16,
                    color: isShinyMode ? "#f59e0b" : "text.disabled",
                    animation: isShinyMode ? "spin 3s linear infinite" : undefined,
                    "@keyframes spin": {
                      "100%": { transform: "rotate(360deg)" }
                    }
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: isShinyMode ? "secondary.main" : "text.secondary"
                  }}
                >
                  Shiny Mode
                </Typography>
              </Stack>
            }
            sx={{
              ml: 0,
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              bgcolor: isShinyMode ? (isDark ? "rgba(245, 158, 11, 0.1)" : "rgba(245, 158, 11, 0.05)") : "transparent",
              border: `1px solid ${isShinyMode ? "rgba(245, 158, 11, 0.3)" : "rgba(0, 0, 0, 0.08)"}`,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: isShinyMode ? (isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.08)") : "rgba(0, 0, 0, 0.03)",
              }
            }}
          />
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
      </Container>

      <PokeDetail id={selectedId} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
      <CompareModal ids={compareIds} onClose={() => { setCompareIds([]); setViewMode('all'); }} />
      {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}
      <TeamBuilder />

      {/* Game Version Selector Dialog */}
      <Dialog
        open={versionDialogOpen}
        onClose={() => setVersionDialogOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              bgcolor: isDark ? "background.paper" : "#f8fafc",
              boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.25rem", pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideogameAsset color="primary" /> SELECT GAME VERSION
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 3 }}>
          {/* ALL VERSIONS BUTTON */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant={selectedVersion === 'ALL' ? 'contained' : 'outlined'}
              onClick={() => {
                setSelectedVersion('ALL');
                setVersionDialogOpen(false);
              }}
              sx={{
                width: '240px',
                height: '44px',
                fontWeight: 800,
                fontSize: '0.95rem',
                borderRadius: '8px',
                borderColor: 'text.secondary',
                color: selectedVersion === 'ALL' ? '#fff' : 'text.primary',
                bgcolor: selectedVersion === 'ALL' ? '#6b7280' : 'transparent',
                '&:hover': {
                  bgcolor: selectedVersion === 'ALL' ? '#4b5563' : 'rgba(107, 114, 128, 0.08)',
                  borderColor: 'text.primary'
                }
              }}
            >
              ALL VERSIONS
            </Button>
          </Box>

          <Stack spacing={3.5}>
            {GENERATION_VERSIONS.map((g) => (
              <Box key={g.gen}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {g.gen}
                </Typography>
                <Grid container spacing={1.5}>
                  {g.games.map((game) => {
                    const isActive = selectedVersion.toLowerCase() === game.name.toLowerCase();
                    const vColor = VERSION_COLORS[game.name] || '#6366f1';
                    return (
                      <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={game.name}>
                        <Button
                          variant={isActive ? 'contained' : 'outlined'}
                          fullWidth
                          onClick={() => {
                            setSelectedVersion(game.name);
                            setVersionDialogOpen(false);
                          }}
                          sx={{
                            fontWeight: 700,
                            borderRadius: '8px',
                            borderColor: vColor,
                            color: isActive ? (game.name === 'white' || game.name === 'white-2' ? '#000' : '#fff') : 'text.primary',
                            bgcolor: isActive ? vColor : 'transparent',
                            boxShadow: isActive ? `0 4px 12px ${vColor}40` : 'none',
                            textTransform: 'capitalize',
                            height: '40px',
                            '&:hover': {
                              bgcolor: isActive ? vColor : `${vColor}15`,
                              borderColor: vColor,
                              filter: 'brightness(1.05)',
                              boxShadow: isActive ? `0 6px 16px ${vColor}60` : `0 2px 8px ${vColor}20`,
                            }
                          }}
                        >
                          {game.label}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setVersionDialogOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
