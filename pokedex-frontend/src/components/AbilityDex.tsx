import React, { useState, useEffect } from 'react';
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
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import { Close, Psychology, HelpOutlined, Search } from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { Ability } from '../types';

// GraphQL query for all abilities
const GET_ALL_ABILITIES = gql`
  query GetAllAbilities($gen: Int, $limit: Int, $offset: Int, $search: String) {
    getAllAbilities(gen: $gen, limit: $limit, offset: $offset, search: $search) {
      results {
        id
        name
        generation
        flavorText
        shortEffect
        effect
        pokemons {
          id
          name
          types
          image
          category
          speciesId
        }
      }
      totalCount
    }
  }
`;

// Type to color mapping (matching PokeCard)
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

// Helper to format names (e.g., compound-eyes -> Compound Eyes)
const formatAbilityName = (name: string): string => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function AbilityDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [genFilter, setGenFilter] = useState<number | string>('ALL');

  // Drawer Detail State
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Pagination limits
  const limit = 24;
  const [offset, setOffset] = useState(0);

  // Query variables
  const queryGen = genFilter === 'ALL' ? null : Number(genFilter);

  // Apollo Query
  const { data, loading, error, fetchMore } = useQuery<{
    getAllAbilities: { results: Ability[]; totalCount: number };
  }>(GET_ALL_ABILITIES, {
    variables: {
      gen: queryGen,
      limit,
      offset: 0,
      search: debouncedSearch
    },
    onCompleted: () => {
      setOffset(0);
    }
  });

  const abilitiesList = data?.getAllAbilities?.results || [];
  const totalCount = data?.getAllAbilities?.totalCount || 0;
  const hasMore = abilitiesList.length > 0 && abilitiesList.length < totalCount;

  const loadMore = () => {
    const nextOffset = abilitiesList.length;
    setOffset(nextOffset);
    fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          getAllAbilities: {
            ...prev.getAllAbilities,
            results: [...prev.getAllAbilities.results, ...fetchMoreResult.getAllAbilities.results]
          }
        };
      }
    });
  };

  const handleOpenDetail = (ability: Ability) => {
    setSelectedAbility(ability);
    setDrawerOpen(true);
  };

  const handleCloseDetail = () => {
    setDrawerOpen(false);
  };

  // Generation options 3-9
  const generationOptions = [
    { value: 'ALL', label: 'All Generations' },
    ...Array.from({ length: 7 }, (_, i) => ({
      value: i + 3,
      label: `Generation ${i + 3}`
    }))
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
            gap: 1.5,
            mb: 1
          }}
        >
          <Psychology sx={{ color: '#3b82f6', fontSize: 38 }} />
          Ability Dex
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, maxStyle: 500, mx: 'auto' }}>
          Explore unique battle passive traits, hidden capabilities, and strategic benefits.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ maxWidth: { xs: '100%', sm: '480px' }, mx: 'auto', mb: 2 }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search abilities..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              bgcolor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
              backdropFilter: 'blur(10px)',
              '& fieldset': {
                borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
              },
              '&:hover fieldset': {
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              }
            },
            '& .MuiOutlinedInput-input': {
              py: 1.5,
              fontWeight: 600,
              fontSize: '14px',
              color: 'text.primary'
            }
          }}
        />
      </Box>

      {/* Filter Selector */}
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
          justifyContent: 'center',
          maxWidth: { xs: '100%', sm: '480px' },
          mx: 'auto'
        }}
      >
        <FormControl fullWidth size="medium">
          <InputLabel id="gen-filter-label" sx={{ fontWeight: 600 }}>Generation</InputLabel>
          <Select
            labelId="gen-filter-label"
            id="gen-filter"
            value={genFilter}
            label="Generation"
            onChange={(e) => setGenFilter(e.target.value)}
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
          {totalCount} Abilities {genFilter !== 'ALL' ? `· Gen ${genFilter}` : ''}
        </Typography>
      )}

      {/* Content Area */}
      {error ? (
        <Alert severity="error" sx={{ borderRadius: '16px' }}>
          Backend offline — start the server on port 3000 to fetch abilities.
        </Alert>
      ) : loading && abilitiesList.length === 0 ? (
        /* Skeletons */
        <Grid container spacing={3}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height={110} sx={{ borderRadius: '16px' }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* Listing Grid */
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {abilitiesList.map((ability: Ability, index: number) => (
              <Grid key={ability.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                      background: isDark ? 'rgba(30, 41, 59, 0.2)' : '#ffffff',
                      position: 'relative',
                      transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                        borderColor: alpha(theme.palette.primary.main, 0.3)
                      }
                    }}
                  >
                    <CardActionArea onClick={() => handleOpenDetail(ability)} sx={{ p: 2.5, minHeight: '110px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          textTransform: 'capitalize',
                          letterSpacing: '-0.3px',
                          lineHeight: 1.2,
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        {formatAbilityName(ability.name)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '13px',
                          fontWeight: 500,
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {ability.shortEffect || 'No effect description available.'}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>

          {abilitiesList.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 10, color: 'text.disabled' }}>
                <HelpOutlined sx={{ fontSize: 60, mb: 1, opacity: 0.5 }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>No Abilities found.</Typography>
                <Typography variant="body2">Try adjusting your generation filter.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Pagination Load More */}
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
            Load More Abilities
          </Button>
        </Box>
      )}

      {/* Details Swipeable Drawer */}
      <SwipeableDrawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={drawerOpen}
        onClose={handleCloseDetail}
        onOpen={() => {}}
        id="ability-detail-drawer"
        slotProps={{
          paper: {
            sx: {
              width: isMobile ? '100%' : '520px',
              height: isMobile ? '82%' : '100%',
              borderTopLeftRadius: isMobile ? '24px' : '0px',
              borderTopRightRadius: isMobile ? '24px' : '0px',
              background: isDark ? '#0f172a' : '#ffffff',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
            }
          }
        }}
      >
        {selectedAbility && (
          <>
            {/* Header / Top Title Bar */}
            <Box
              sx={{
                p: 3,
                pb: 2.5,
                bgcolor: isDark ? '#1e1b4b' : '#1e3a8a', // Dark deep blue background
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    textTransform: 'capitalize',
                    letterSpacing: '-0.5px',
                    lineHeight: 1.1,
                    mb: 0.5
                  }}
                >
                  {formatAbilityName(selectedAbility.name)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontWeight: 800,
                    fontSize: '10px'
                  }}
                >
                  Ability
                </Typography>
              </Box>
              <IconButton
                onClick={handleCloseDetail}
                sx={{
                  color: '#ffffff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Scrollable Drawer Content */}
            <Box
              sx={{
                p: 3.5,
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 3.5,
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  background: isDark ? '#0f172a' : '#ffffff'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)',
                  borderRadius: '4px',
                  '&:hover': {
                    background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                  }
                }
              }}
            >
              
              {/* Optional intro generation banner */}
              {selectedAbility.generation && (
                <Chip
                  label={`Introduced in Generation ${selectedAbility.generation}`}
                  variant="outlined"
                  size="small"
                  sx={{
                    alignSelf: 'flex-start',
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    px: 1,
                    py: 1.5,
                    borderRadius: '10px'
                  }}
                />
              )}

              {/* Card 1: Game Description */}
              {selectedAbility.flavorText?.trim() ? (
                <Box
                  sx={{
                    borderRadius: '16px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    bgcolor: isDark ? '#1e293b' : '#f8fafc',
                    height: 'auto',
                    display: 'block'
                  }}
                >
                  <Box sx={{ px: 2.5, py: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: isDark ? '#cbd5e1' : '#475569', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '11px', display: 'block' }}>
                      GAME DESCRIPTION
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2.5, pb: 3.5 }}>
                    <Typography variant="body2" sx={{ color: isDark ? '#f1f5f9' : '#334155', fontWeight: 500, lineHeight: 1.6, display: 'block' }}>
                      {selectedAbility.flavorText}
                    </Typography>
                  </Box>
                </Box>
              ) : null}

              {/* Card 2: Effect */}
              {selectedAbility.shortEffect?.trim() ? (
                <Box
                  sx={{
                    borderRadius: '16px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    bgcolor: isDark ? '#1e293b' : '#f8fafc',
                    height: 'auto',
                    display: 'block'
                  }}
                >
                  <Box sx={{ px: 2.5, py: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: isDark ? '#cbd5e1' : '#475569', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '11px', display: 'block' }}>
                      EFFECT
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2.5, pb: 3.5 }}>
                    <Typography variant="body2" sx={{ color: isDark ? '#f1f5f9' : '#334155', fontWeight: 500, lineHeight: 1.6, display: 'block' }}>
                      {selectedAbility.shortEffect}
                    </Typography>
                  </Box>
                </Box>
              ) : null}

              {/* Card 3: In-Depth Effect */}
              {selectedAbility.effect?.trim() ? (
                <Box
                  sx={{
                    borderRadius: '16px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    bgcolor: isDark ? '#1e293b' : '#f8fafc',
                    height: 'auto',
                    display: 'block'
                  }}
                >
                  <Box sx={{ px: 2.5, py: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: isDark ? '#cbd5e1' : '#475569', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '11px', display: 'block' }}>
                      IN-DEPTH EFFECT
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2.5, pb: 3.5 }}>
                    <Typography variant="body2" sx={{ color: isDark ? '#f1f5f9' : '#334155', fontWeight: 500, lineHeight: 1.6, display: 'block' }}>
                      {selectedAbility.effect}
                    </Typography>
                  </Box>
                </Box>
              ) : null}

              {/* Section: Pokémon with this ability */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.3px', textTransform: 'uppercase', fontSize: '14px', color: 'text.primary' }}>
                  Pokémon with this Ability ({selectedAbility.pokemons.length})
                </Typography>
                <Grid container spacing={2}>
                  {selectedAbility.pokemons.map((pokemon) => {
                    const primaryType = pokemon.types[0]?.toLowerCase() || 'normal';
                    const typeColor = TYPE_COLORS[primaryType] || '#9ca3af';
                    const bgColor = alpha(typeColor, isDark ? 0.12 : 0.08);

                    return (
                      <Grid key={pokemon.id} size={{ xs: 12 }}>
                        <Paper
                          elevation={0}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2.5,
                            borderRadius: '16px',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                            bgcolor: bgColor,
                            position: 'relative',
                            overflow: 'hidden',
                            height: '100px',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                            }
                          }}
                        >
                          {/* Left Side: ID, Name, and Types */}
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, zIndex: 1 }}>
                            <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 1, fontSize: '10px' }}>
                              #{pokemon.id.toString().padStart(3, '0')}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 900, textTransform: 'capitalize', letterSpacing: '-0.3px', mb: 0.5 }}>
                              {pokemon.name}
                            </Typography>
                            
                            {/* Type Chips */}
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {pokemon.types.map((type) => (
                                <Chip
                                  key={type}
                                  label={type}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha(TYPE_COLORS[type.toLowerCase()] || '#9ca3af', 0.85),
                                    color: '#fff',
                                    fontSize: 8,
                                    fontWeight: 800,
                                    letterSpacing: 1,
                                    textTransform: 'uppercase',
                                    height: 18,
                                    px: 0.5
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          {/* Right Side Image slightly overlapping the container */}
                          <Box
                            component="img"
                            src={pokemon.image}
                            alt={pokemon.name}
                            sx={{
                              width: 90,
                              height: 90,
                              objectFit: 'contain',
                              position: 'absolute',
                              right: 16,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
                              transition: 'transform 0.2s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-50%) scale(1.15) rotate(3deg)'
                              }
                            }}
                          />
                        </Paper>
                      </Grid>
                    );
                  })}
                  
                  {selectedAbility.pokemons.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 2 }}>
                        No Pokémon are currently recorded with this ability.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>

            </Box>
          </>
        )}
      </SwipeableDrawer>
    </Container>
  );
}
