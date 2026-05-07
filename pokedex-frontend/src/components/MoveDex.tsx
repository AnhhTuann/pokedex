import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SwipeableDrawer,
  IconButton,
  Button,
  Grid,
  Skeleton,
  Alert,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Paper
} from '@mui/material';
import { Close, FlashOn, HelpOutlined } from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { Move } from '../types';

// GraphQL query for all moves
const GET_ALL_MOVES = gql`
  query GetAllMoves($gen: Int, $type: String, $damageClass: String, $limit: Int, $offset: Int) {
    getAllMoves(gen: $gen, type: $type, damageClass: $damageClass, limit: $limit, offset: $offset) {
      results {
        name
        type
        power
        accuracy
        pp
        generation
        description
        effect
        damageClass
      }
      totalCount
    }
  }
`;

// Type to color mapping (from PokeCard)
const TYPE_COLORS: Record<string, string> = {
  normal: '#9ca3af',
  fire: '#f97316',
  water: '#3b82f6',
  electric: '#eab308',
  grass: '#22c55e',
  ice: '#06b6d4',
  fighting: '#ef4444',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#818cf8',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#78716c',
  ghost: '#7c3aed',
  dragon: '#1d4ed8',
  dark: '#374151',
  steel: '#6b7280',
  fairy: '#f472b6',
};

// Damage Class Colors
const DAMAGE_CLASS_COLORS: Record<string, string> = {
  physical: '#e11d48', // Red / Rose
  special: '#2563eb',  // Blue / Indigo
  status: '#6b7280',   // Gray
};

// Helper to format move names (e.g. swords-dance -> Swords Dance)
const formatMoveName = (name: string): string => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function MoveDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Filters State
  const [genFilter, setGenFilter] = useState<number | string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [catFilter, setCatFilter] = useState<string>('ALL');

  // Drawer Detail State
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pagination limit
  const limit = 30;
  const [offset, setOffset] = useState(0);

  // Parse filters for GQL Variables
  const queryGen = genFilter === 'ALL' ? null : Number(genFilter);
  const queryType = typeFilter === 'ALL' ? '' : typeFilter;
  const queryCat = catFilter === 'ALL' ? '' : catFilter;

  // Apollo Query
  const { data, loading, error, fetchMore } = useQuery<{
    getAllMoves: { results: Move[]; totalCount: number };
  }>(GET_ALL_MOVES, {
    variables: {
      gen: queryGen,
      type: queryType,
      damageClass: queryCat,
      limit,
      offset: 0
    },
    onCompleted: () => {
      // Reset offset when filters change
      setOffset(0);
    }
  });

  const movesList = data?.getAllMoves?.results || [];
  const totalCount = data?.getAllMoves?.totalCount || 0;
  const hasMore = movesList.length > 0 && movesList.length < totalCount;

  const loadMore = () => {
    const nextOffset = movesList.length;
    setOffset(nextOffset);
    fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          getAllMoves: {
            ...prev.getAllMoves,
            results: [...prev.getAllMoves.results, ...fetchMoreResult.getAllMoves.results]
          }
        };
      }
    });
  };

  const handleOpenDetail = (move: Move) => {
    setSelectedMove(move);
    setDrawerOpen(true);
  };

  const handleCloseDetail = () => {
    setDrawerOpen(false);
  };

  // Lists of options
  const generationOptions = [
    { value: 'ALL', label: 'All Gens' },
    ...Array.from({ length: 9 }, (_, i) => ({
      value: i + 1,
      label: `Gen ${i + 1}`
    }))
  ];

  const typeOptions = [
    'ALL',
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  const categoryOptions = [
    { value: 'ALL', label: 'All Cat.' },
    { value: 'physical', label: 'Physical' },
    { value: 'special', label: 'Special' },
    { value: 'status', label: 'Status' }
  ];

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 10, px: { xs: 2, sm: 3 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 1
          }}
        >
          <FlashOn sx={{ color: '#eab308', fontSize: 36 }} />
          Move Dex
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, maxStyle: 500, mx: 'auto' }}>
          Explore and analyze Pokemon physical, special, or status movesets.
        </Typography>
      </Box>

      {/* Modern Premium Filter Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: '20px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          background: isDark
            ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.2) 0%, rgba(15, 15, 26, 0.4) 100%)'
            : 'linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          zIndex: 1
        }}
      >
        {/* Gen Filter */}
        <FormControl fullWidth size="medium">
          <InputLabel id="gen-filter-label" sx={{ fontWeight: 600 }}>Generation</InputLabel>
          <Select
            labelId="gen-filter-label"
            id="gen-filter"
            value={genFilter}
            label="Generation"
            onChange={(e) => {
              setGenFilter(e.target.value);
            }}
            sx={{
              borderRadius: '12px',
              fontWeight: 700,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)',
              }
            }}
          >
            {generationOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontWeight: 600 }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Type Filter */}
        <FormControl fullWidth size="medium">
          <InputLabel id="type-filter-label" sx={{ fontWeight: 600 }}>Type</InputLabel>
          <Select
            labelId="type-filter-label"
            id="type-filter"
            value={typeFilter}
            label="Type"
            onChange={(e) => {
              setTypeFilter(e.target.value);
            }}
            sx={{
              borderRadius: '12px',
              fontWeight: 700,
              textTransform: 'capitalize',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)',
              }
            }}
          >
            {typeOptions.map((t) => (
              <MenuItem key={t} value={t} sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                {t === 'ALL' ? 'All Types' : t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Category Filter */}
        <FormControl fullWidth size="medium">
          <InputLabel id="cat-filter-label" sx={{ fontWeight: 600 }}>Category</InputLabel>
          <Select
            labelId="cat-filter-label"
            id="cat-filter"
            value={catFilter}
            label="Category"
            onChange={(e) => {
              setCatFilter(e.target.value);
            }}
            sx={{
              borderRadius: '12px',
              fontWeight: 700,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)',
              }
            }}
          >
            {categoryOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontWeight: 600 }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Count Indicator */}
      {!loading && !error && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mb: 3,
            textAlign: 'center',
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 800
          }}
        >
          {totalCount} Moves {genFilter !== 'ALL' ? `· Gen ${genFilter}` : ''}{typeFilter !== 'ALL' ? ` · ${typeFilter.toUpperCase()}` : ''}{catFilter !== 'ALL' ? ` · ${catFilter.toUpperCase()}` : ''}
        </Typography>
      )}

      {/* Error or Listing */}
      {error ? (
        <Alert severity="error" sx={{ borderRadius: '16px' }}>
          Backend offline — start the server on port 3000 to fetch real Moves.
        </Alert>
      ) : loading && movesList.length === 0 ? (
        /* Loading Skeletons */
        <Grid container spacing={3}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height={130} sx={{ borderRadius: '16px' }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* Moves List Grid */
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {movesList.map((move: Move, index: number) => {
              const moveTypeColor = TYPE_COLORS[move.type.toLowerCase()] || '#9ca3af';
              const moveCatColor = DAMAGE_CLASS_COLORS[move.damageClass.toLowerCase()] || '#6b7280';

              return (
                <Grid key={`${move.name}-${index}`} size={{ xs: 12, sm: 6, md: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
                    whileHover={{ y: -4 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: '16px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                        background: `linear-gradient(150deg, ${alpha(moveTypeColor, isDark ? 0.08 : 0.04)} 0%, ${theme.palette.background.paper} 80%)`,
                        position: 'relative',
                        transition: 'box-shadow 0.25s ease',
                        '&:hover': {
                          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                          border: `1px solid ${alpha(moveTypeColor, 0.35)}`
                        }
                      }}
                    >
                      <CardActionArea onClick={() => handleOpenDetail(move)} sx={{ p: 2.5 }}>
                        {/* Row 1: Title and Stats */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          {/* Name */}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              textTransform: 'capitalize',
                              letterSpacing: '-0.3px',
                              lineHeight: 1.2,
                              pr: 1
                            }}
                          >
                            {formatMoveName(move.name)}
                          </Typography>

                          {/* Stats group */}
                          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexShrink: 0 }}>
                            {/* Power */}
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' }}>PWR</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 800, color: move.power ? 'text.primary' : 'text.disabled' }}>{move.power || '-'}</Typography>
                            </Box>
                            {/* Accuracy */}
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' }}>ACC</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 800, color: move.accuracy ? 'text.primary' : 'text.disabled' }}>{move.accuracy ? `${move.accuracy}%` : '-'}</Typography>
                            </Box>
                            {/* PP */}
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' }}>PP</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 800, color: move.pp ? 'text.primary' : 'text.disabled' }}>{move.pp || '-'}</Typography>
                            </Box>
                          </Box>
                        </Box>

                        {/* Row 2: Type and Category Chips */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {/* Type Chip */}
                          <Chip
                            label={move.type}
                            size="small"
                            sx={{
                              bgcolor: alpha(moveTypeColor, 0.85),
                              color: '#fff',
                              fontSize: 9,
                              fontWeight: 800,
                              letterSpacing: 1,
                              textTransform: 'uppercase',
                              height: 20,
                              px: 0.5
                            }}
                          />
                          {/* Category Chip */}
                          <Chip
                            label={move.damageClass}
                            size="small"
                            sx={{
                              bgcolor: alpha(moveCatColor, 0.85),
                              color: '#fff',
                              fontSize: 9,
                              fontWeight: 800,
                              letterSpacing: 1,
                              textTransform: 'uppercase',
                              height: 20,
                              px: 0.5
                            }}
                          />
                        </Box>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </AnimatePresence>

          {movesList.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 10, color: 'text.disabled' }}>
                <HelpOutlined sx={{ fontSize: 60, mb: 1, opacity: 0.5 }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>No Moves found.</Typography>
                <Typography variant="body2">Try adjusting your filters.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Load More Button */}
      {!loading && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            onClick={loadMore}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: '50px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              borderWidth: '2px',
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderWidth: '2px',
                bgcolor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
          >
            Load More Moves
          </Button>
        </Box>
      )}

      {/* Swipeable Drawer for details */}
      <SwipeableDrawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={drawerOpen}
        onClose={handleCloseDetail}
        onOpen={() => {}}
        id="move-detail-drawer"
        slotProps={{
          paper: {
            sx: {
              width: isMobile ? '100%' : '480px',
              height: isMobile ? '82%' : '100%',
              borderTopLeftRadius: isMobile ? '24px' : '0px',
              borderTopRightRadius: isMobile ? '24px' : '0px',
              background: isDark ? '#0f172a' : '#ffffff', // Slate/White
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
            }
          }
        }}
      >
        {selectedMove && (
          <>
            {/* Header / Top Bar */}
            <Box
              sx={{
                p: 3,
                pb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  textTransform: 'capitalize',
                  letterSpacing: '-0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <FlashOn sx={{ color: TYPE_COLORS[selectedMove.type.toLowerCase()] || '#eab308' }} />
                {formatMoveName(selectedMove.name)}
              </Typography>
              <IconButton onClick={handleCloseDetail} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                <Close />
              </IconButton>
            </Box>

            {/* Scrollable Content */}
            <Box sx={{ p: 3.5, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              
              {/* Type and Category Chips side-by-side */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip
                  label={selectedMove.type}
                  sx={{
                    bgcolor: TYPE_COLORS[selectedMove.type.toLowerCase()] || '#9ca3af',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    height: 36,
                    px: 1.5,
                    flex: 1,
                    borderRadius: '10px',
                    boxShadow: `0 4px 12px ${alpha(TYPE_COLORS[selectedMove.type.toLowerCase()] || '#9ca3af', 0.4)}`
                  }}
                />
                <Chip
                  label={selectedMove.damageClass}
                  sx={{
                    bgcolor: DAMAGE_CLASS_COLORS[selectedMove.damageClass.toLowerCase()] || '#6b7280',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    height: 36,
                    px: 1.5,
                    flex: 1,
                    borderRadius: '10px',
                    boxShadow: `0 4px 12px ${alpha(DAMAGE_CLASS_COLORS[selectedMove.damageClass.toLowerCase()] || '#6b7280', 0.4)}`
                  }}
                />
              </Box>

              {/* 3 Stats Columns Grid */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  p: 2.5,
                  borderRadius: '16px',
                  bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                }}
              >
                {/* Power */}
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: selectedMove.power ? 'text.primary' : 'text.disabled' }}>
                    {selectedMove.power || '-'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, fontSize: '10px' }}>
                    Power
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

                {/* Accuracy */}
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: selectedMove.accuracy ? 'text.primary' : 'text.disabled' }}>
                    {selectedMove.accuracy ? `${selectedMove.accuracy}%` : '-'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, fontSize: '10px' }}>
                    Accuracy
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

                {/* PP */}
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: selectedMove.pp ? 'text.primary' : 'text.disabled' }}>
                    {selectedMove.pp || '-'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, fontSize: '10px' }}>
                    PP
                  </Typography>
                </Box>
              </Box>

              {/* Game Description Card */}
              <Box
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                  bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : '#f8fafc' // Slate background
                }}
              >
                <Box sx={{ px: 2.5, py: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: isDark ? '#94a3b8' : '#475569', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '11px' }}>
                    GAME DESCRIPTION
                  </Typography>
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                    {selectedMove.description || 'No game description available for this move.'}
                  </Typography>
                </Box>
              </Box>

              {/* Effect Card */}
              <Box
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                  bgcolor: isDark ? 'rgba(30, 41, 59, 0.4)' : '#f8fafc' // Slate background
                }}
              >
                <Box sx={{ px: 2.5, py: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: isDark ? '#94a3b8' : '#475569', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '11px' }}>
                    EFFECT
                  </Typography>
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                    {selectedMove.effect || 'No special battle effect description available.'}
                  </Typography>
                </Box>
              </Box>

              {/* Optional generation display */}
              {selectedMove.generation && (
                <Typography variant="caption" color="text.disabled" sx={{ textAlign: 'center', fontWeight: 700, mt: 'auto', pt: 2 }}>
                  Introduced in Generation {selectedMove.generation}
                </Typography>
              )}
            </Box>
          </>
        )}
      </SwipeableDrawer>
    </Container>
  );
}
