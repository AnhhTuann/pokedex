import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Box, Grid, Card, CardActionArea, CardContent, Typography,
  Button, Switch, FormControlLabel, LinearProgress, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Chip, useTheme, alpha,
  Tooltip, Stack, Skeleton, Alert, InputAdornment, TextField, MenuItem, Select, FormControl, InputLabel, IconButton
} from '@mui/material';
import {
  CatchingPokemon, PlaylistAddCheck, RotateLeft, DoneAll, Search,
  FilterList, HelpOutlined, AutoAwesome, CheckCircle
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { PokemonListItem } from '../types';
import { useTeamStore } from '../lib/teamStore';
import { useCatchStore } from '../lib/catchStore';
import { VERSION_COLORS, GENERATION_VERSIONS, getRegionAndGame } from '../App';
import PokeDetail from './PokeDetail';
import { formatSpeciesId } from '../lib/utils';

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

export default function CatchTracker() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Stores
  const { selectedVersion, setSelectedVersion, isShinyMode } = useTeamStore();
  const { caughtPokemonIds, toggleCaught, markAllCaught, resetAll } = useCatchStore();

  // Local State
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [hideCaught, setHideCaught] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Modal Confirmations
  const [confirmMarkAllOpen, setConfirmMarkAllOpen] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Region & Version Variable mapping
  const { region: rawRegion, game: rawGame } = getRegionAndGame(selectedVersion);
  const queryRegion = rawRegion !== 'ALL' ? rawRegion : undefined;
  const queryGame = rawGame !== 'ALL' ? rawGame : undefined;

  // GraphQL Query (limit set to 1025 to fetch everything when loading so we can perform client-side paging or filters comfortably)
  // To keep it high performance, we query 1025 items directly for the Living Dex Tracker so the user can scroll/view the entire collection seamlessly!
  const { data, loading, error } = useQuery<{
    pokemonList: { results: PokemonListItem[]; totalCount: number };
  }>(GET_POKEMON_LIST, {
    variables: {
      limit: 1025,
      offset: 0,
      search,
      type: typeFilter,
      region: queryRegion,
      game: queryGame
    },
  });

  const pokemonList = data?.pokemonList?.results || [];
  const totalCount = data?.pokemonList?.totalCount || 0;

  // Filters logic
  const filteredList = pokemonList.filter((p) => {
    if (hideCaught && caughtPokemonIds.includes(p.id)) {
      return false;
    }
    return true;
  });

  // Progress Calculations
  const totalPokemon = 1025; // Standard living dex cap
  const nationalProgress = Math.min(100, Math.round((caughtPokemonIds.length / totalPokemon) * 100)) || 0;

  // Calculate local progress matching active filters
  const visiblePokemonIds = pokemonList.map(p => p.id);
  const caughtInActiveFilter = visiblePokemonIds.filter(id => caughtPokemonIds.includes(id)).length;
  const localTotal = totalCount || 1;
  const localProgress = Math.min(100, Math.round((caughtInActiveFilter / localTotal) * 100)) || 0;

  // Mass action handlers
  const handleMarkAllConfirm = () => {
    markAllCaught(visiblePokemonIds);
    setConfirmMarkAllOpen(false);
  };

  const handleResetConfirm = () => {
    resetAll();
    setConfirmResetOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 10 }}>
      {/* ── Progress Header Section ── */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: '16px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          background: `linear-gradient(135deg, ${isDark ? '#1e1b4b' : '#f0fdf4'} 0%, ${isDark ? '#0f172a' : '#f8fafc'} 100%)`,
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1, letterSpacing: -0.5 }}>
                <CatchingPokemon sx={{ color: 'primary.main', fontSize: 32 }} />
                LIVING DEX CATCH TRACKER
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 600 }}>
                Keep track of your catching progress. Click cards directly to toggle their caught status!
              </Typography>
            </Box>

            {/* Admin Action Buttons */}
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DoneAll />}
                onClick={() => setConfirmMarkAllOpen(true)}
                disabled={pokemonList.length === 0}
                sx={{
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: '0.5px',
                  borderWidth: '2px',
                  '&:hover': { borderWidth: '2px' }
                }}
              >
                MARK CURRENT AS CAUGHT
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<RotateLeft />}
                onClick={() => setConfirmResetOpen(true)}
                sx={{
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: '0.5px',
                  borderWidth: '2px',
                  '&:hover': { borderWidth: '2px' }
                }}
              >
                RESET ALL PROGRESS
              </Button>
            </Stack>
          </Box>

          {/* Progress Bars */}
          <Grid container spacing={3}>
            {/* National Living Dex Progress */}
            <Grid size={{ xs: 12, md: selectedVersion !== 'ALL' ? 6 : 12 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'baseline' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                    🌐 NATIONAL LIVING DEX PROGRESS
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 900, color: 'primary.main' }}>
                    Caught: {caughtPokemonIds.length} / {totalPokemon} ({nationalProgress}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={nationalProgress}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 6,
                      background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Filtered Dex Progress (Shows if version/generation filter is active) */}
            {selectedVersion !== 'ALL' && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'baseline' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                      ⚡ {selectedVersion} REGIONAL PROGRESS
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 900, color: 'secondary.main' }}>
                      Caught: {caughtInActiveFilter} / {localTotal} ({localProgress}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={localProgress}
                    color="secondary"
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 6,
                        background: 'linear-gradient(90deg, #f59e0b 0%, #ec4899 100%)',
                      }
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Stack>
      </Card>

      {/* ── Filter Toolbar Section ── */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          p: 2,
          borderRadius: '12px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
          bgcolor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          {/* Game version local/global synchronized dropdown */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="tracker-version-select-label" sx={{ fontWeight: 700 }}>GAME VERSION</InputLabel>
              <Select
                labelId="tracker-version-select-label"
                id="tracker-version-select"
                value={selectedVersion}
                label="GAME VERSION"
                onChange={(e) => setSelectedVersion(e.target.value)}
                sx={{
                  borderRadius: '10px',
                  fontWeight: 700,
                }}
              >
                <MenuItem value="ALL" sx={{ fontWeight: 800 }}>ALL VERSIONS</MenuItem>
                {GENERATION_VERSIONS.map((gen) => [
                  <MenuItem key={gen.gen} disabled sx={{ fontWeight: 900, opacity: 0.8, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1, textTransform: 'uppercase' }}>
                    {gen.gen}
                  </MenuItem>,
                  ...gen.games.map((game) => (
                    <MenuItem key={game.name} value={game.name} sx={{ pl: 4, fontWeight: 700 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: VERSION_COLORS[game.name] || '#ccc' }} />
                        {game.label}
                      </Box>
                    </MenuItem>
                  ))
                ])}
              </Select>
            </FormControl>
          </Grid>

          {/* Type Filter */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="tracker-type-select-label" sx={{ fontWeight: 700 }}>TYPE</InputLabel>
              <Select
                labelId="tracker-type-select-label"
                id="tracker-type-select"
                value={typeFilter}
                label="TYPE"
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ borderRadius: '10px', fontWeight: 700, textTransform: 'capitalize' }}
              >
                <MenuItem value="" sx={{ fontWeight: 700 }}>All Types</MenuItem>
                {Object.keys(TYPE_COLORS).map((type) => (
                  <MenuItem key={type} value={type} sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: TYPE_COLORS[type] }} />
                      {type}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Text Search */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '10px', fontWeight: 700 }
                }
              }}
            />
          </Grid>

          {/* Hide Caught Toggle */}
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={hideCaught}
                  onChange={(e) => setHideCaught(e.target.checked)}
                  color="success"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 800, color: hideCaught ? 'success.main' : 'text.secondary' }}>
                  HIDE CAUGHT
                </Typography>
              }
              sx={{ justifySelf: 'center' }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* ── Results Info Label ── */}
      {!loading && !error && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3, textAlign: 'center', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>
          Showing {filteredList.length} of {totalCount} Pokémon matching filters
        </Typography>
      )}

      {/* ── Grid Container ── */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(12)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton variant="rounded" height={260} sx={{ borderRadius: '16px' }} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: '12px' }}>
          Backend offline — please start the server on port 3000.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {filteredList.map((p, idx) => {
              const isCaught = caughtPokemonIds.includes(p.id);
              const primaryColor = TYPE_COLORS[p.types[0]] || '#9ca3af';

              return (
                <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <motion.div
                    layoutId={`pokemon-tracker-card-${p.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25, delay: (idx % 24) * 0.02 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ height: '100%' }}
                  >
                    <Card
                      elevation={isCaught ? 4 : 0}
                      sx={{
                        height: '100%',
                        borderRadius: '16px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'visible',
                        cursor: 'pointer',
                        border: isCaught 
                          ? `2px solid #10b981` 
                          : `1.5px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        background: isCaught
                          ? `linear-gradient(160deg, ${alpha('#10b981', isDark ? 0.15 : 0.06)} 0%, ${theme.palette.background.paper} 70%)`
                          : (isDark ? 'rgba(30, 41, 59, 0.15)' : '#f8fafc'),
                        boxShadow: isCaught ? `0 8px 24px ${alpha('#10b981', isDark ? 0.25 : 0.12)}` : 'none',
                      }}
                    >
                      {/* Interactive Catch Toggle Button in Card Corner */}
                      <Tooltip title={isCaught ? 'Mark as Uncaught' : 'Mark as Caught'}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCaught(p.id);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 3,
                            color: isCaught ? '#10b981' : 'text.disabled',
                            bgcolor: isCaught ? alpha('#10b981', 0.15) : 'action.hover',
                            border: `1.5px solid ${isCaught ? '#10b981' : 'transparent'}`,
                            boxShadow: isCaught ? `0 0 10px ${alpha('#10b981', 0.5)}` : 'none',
                            '&:hover': {
                              bgcolor: isCaught ? alpha('#10b981', 0.25) : alpha(theme.palette.primary.main, 0.1),
                              color: isCaught ? '#059669' : 'primary.main',
                            }
                          }}
                        >
                          <CheckCircle fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <CardActionArea
                        onClick={() => toggleCaught(p.id)}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          p: 3,
                          pt: 4,
                          borderRadius: '16px',
                        }}
                      >
                        {/* Pokémon Sprite Circle container */}
                        <Box
                          sx={{
                            width: 110,
                            height: 110,
                            borderRadius: '50%',
                            transition: 'all 0.3s ease',
                            background: isCaught
                              ? alpha(primaryColor, isDark ? 0.15 : 0.1)
                              : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            position: 'relative'
                          }}
                        >
                          <Box
                            component="img"
                            src={isShinyMode && p.shinyImage ? p.shinyImage : p.image}
                            alt={p.name}
                            loading="lazy"
                            sx={{
                              width: 84,
                              height: 84,
                              objectFit: 'contain',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              filter: isCaught
                                ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))'
                                : 'grayscale(100%) contrast(0.8) opacity(0.5)',
                              transform: isCaught ? 'scale(1)' : 'scale(0.9)',
                            }}
                          />
                        </Box>

                        <CardContent sx={{ p: 0, width: '100%', textAlign: 'center' }}>
                          {/* Dex ID */}
                          <Typography variant="caption" sx={{ fontWeight: 800, color: isCaught ? 'primary.main' : 'text.disabled', letterSpacing: 1.5 }}>
                            {p.regionalNumber !== undefined && p.regionalNumber !== null
                              ? p.regionalNumber.toString().padStart(3, '0')
                              : formatSpeciesId(p.speciesId || p.id)}
                          </Typography>

                          {/* Name */}
                          <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'capitalize', mt: 0.5, mb: 1, letterSpacing: -0.5, color: isCaught ? 'text.primary' : 'text.secondary' }}>
                            {p.name}
                          </Typography>

                          {/* Types Chips */}
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                            {p.types.map((type) => (
                              <Chip
                                key={type}
                                label={type}
                                size="small"
                                sx={{
                                  bgcolor: isCaught 
                                    ? alpha(TYPE_COLORS[type] || '#9ca3af', 0.85)
                                    : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                                  color: isCaught ? '#fff' : 'text.disabled',
                                  fontSize: 8,
                                  fontWeight: 800,
                                  letterSpacing: 1,
                                  textTransform: 'uppercase',
                                  height: 18,
                                }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </CardActionArea>

                      {/* Detail view trigger inside the card for stats viewers */}
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(p.id);
                        }}
                        sx={{
                          position: 'absolute',
                          bottom: 12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          color: 'text.disabled',
                          opacity: 0,
                          visibility: 'hidden',
                          transition: 'all 0.2s ease',
                          '.MuiCard-root:hover &': {
                            opacity: 1,
                            visibility: 'visible',
                            bottom: 14,
                            color: 'primary.main'
                          }
                        }}
                      >
                        VIEW DETAILS
                      </Button>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </AnimatePresence>

          {filteredList.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 12, color: 'text.disabled' }}>
                <HelpOutlined sx={{ fontSize: 60, opacity: 0.5, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>No Pokémon match this catch filter.</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                  Try toggling "Hide Caught" off or using a different search query.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* ── Confirm Mark All Dialog ── */}
      <Dialog
        open={confirmMarkAllOpen}
        onClose={() => setConfirmMarkAllOpen(false)}
        slotProps={{
          paper: {
            sx: { borderRadius: '16px', p: 1 }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          <DoneAll color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Mark All as Caught?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 600 }}>
            This will mark all <strong>{pokemonList.length} Pokémon</strong> currently matching your filters as <strong>caught</strong>. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmMarkAllOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>
            CANCEL
          </Button>
          <Button onClick={handleMarkAllConfirm} variant="contained" sx={{ fontWeight: 800, borderRadius: '8px' }}>
            YES, MARK ALL
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Confirm Reset Dialog ── */}
      <Dialog
        open={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        slotProps={{
          paper: {
            sx: { borderRadius: '16px', p: 1 }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: 'error.main' }}>
          <RotateLeft color="error" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Reset All catching progress?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 600 }}>
            Are you absolutely sure you want to reset your catching progress? This will revert all <strong>{caughtPokemonIds.length} caught Pokémon</strong> back to uncaught. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmResetOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>
            CANCEL
          </Button>
          <Button onClick={handleResetConfirm} variant="contained" color="error" sx={{ fontWeight: 800, borderRadius: '8px' }}>
            YES, RESET ALL
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Stats Detail Modal drawer ── */}
      <PokeDetail id={selectedId} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
    </Container>
  );
}
