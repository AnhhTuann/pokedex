import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  SwipeableDrawer,
  IconButton,
  Button,
  Grid,
  Skeleton,
  Alert,
  Paper,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import { Close, Backpack, Search } from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { Item } from '../types';

// GraphQL query for all items
const GET_ALL_ITEMS = gql`
  query GetAllItems($search: String, $limit: Int, $offset: Int) {
    getAllItems(search: $search, limit: $limit, offset: $offset) {
      results {
        id
        name
        cost
        flingPower
        flingEffect
        category
        pocket
        flavorText
        effect
        spriteUrl
      }
      totalCount
    }
  }
`;

// Helper to format item names (e.g. master-ball -> Master Ball)
const formatItemName = (name: string): string => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const displayStat = (val: any) => {
  if (val === null || val === undefined || val === 0 || val === '0' || val === '') {
    return '-';
  }
  return val;
};

export default function ItemDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Drawer Detail State
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pagination limit
  const limit = 30;
  const [offset, setOffset] = useState(0);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Apollo Query
  const { data, loading, error, fetchMore } = useQuery<{
    getAllItems: { results: Item[]; totalCount: number };
  }>(GET_ALL_ITEMS, {
    variables: {
      search: debouncedSearch,
      limit,
      offset: 0
    },
    onCompleted: () => {
      setOffset(0);
    }
  });

  const itemsList = data?.getAllItems?.results || [];
  const totalCount = data?.getAllItems?.totalCount || 0;
  const hasMore = itemsList.length > 0 && itemsList.length < totalCount;

  const loadMore = () => {
    const nextOffset = itemsList.length;
    setOffset(nextOffset);
    fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          getAllItems: {
            ...prev.getAllItems,
            results: [...prev.getAllItems.results, ...fetchMoreResult.getAllItems.results]
          }
        };
      }
    });
  };

  const handleOpenDetail = (item: Item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleCloseDetail = () => {
    setDrawerOpen(false);
  };

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
          <Backpack sx={{ color: '#ec4899', fontSize: 38 }} />
          Item Dex
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, maxStyle: 500, mx: 'auto' }}>
          Explore key objects, healing potions, held battle equipment, and bag categories.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ maxWidth: { xs: '100%', sm: '480px' }, mx: 'auto', mb: 4 }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items..."
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)' }} />
                </InputAdornment>
              ),
            }
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
                borderColor: '#ec4899',
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
          {totalCount} Items found
        </Typography>
      )}

      {/* Content Area */}
      {error ? (
        <Alert severity="error" sx={{ borderRadius: '16px' }}>
          Backend offline — start the server on port 3000 to fetch items.
        </Alert>
      ) : loading && itemsList.length === 0 ? (
        /* Skeletons */
        <Grid container spacing={2}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Skeleton
                variant="rectangular"
                height={100}
                sx={{ borderRadius: '16px', bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* Grid List of Items */
        <Grid container spacing={2}>
          {itemsList.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Card
                onClick={() => handleOpenDetail(item)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '16px',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)',
                  boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDark ? '0 12px 30px rgba(236,72,153,0.1)' : '0 12px 30px rgba(0,0,0,0.08)',
                    borderColor: alpha('#ec4899', 0.3)
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                  {/* Block Text (Bên trái): Chiếm không gian còn lại */}
                  <Box sx={{ flex: 1, minWidth: 0, pr: 1 }}>
                    {/* Tên Item (Tên): Typography in đậm, dùng thuộc tính noWrap để tự biến thành dấu ... */}
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{
                        fontWeight: 800,
                        textTransform: 'capitalize',
                        color: 'text.primary',
                        fontSize: '0.95rem'
                      }}
                    >
                      {formatItemName(item.name)}
                    </Typography>

                    {/* Mô tả (Description): Dùng CSS WebkitLineClamp để giới hạn đúng 2 dòng */}
                    <Typography
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        mt: 0.5,
                        lineHeight: 1.4,
                        fontWeight: 500
                      }}
                    >
                      {item.flavorText?.trim() ? item.flavorText : "Data unavailable for this game version"}
                    </Typography>
                  </Box>

                  {/* Block Image (Bên phải): Box chứa ảnh cố định */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {item.spriteUrl ? (
                      <Box
                        component="img"
                        src={item.spriteUrl}
                        alt={item.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'scale(1.2) rotate(5deg)'
                          }
                        }}
                      />
                    ) : (
                      /* Xử lý ảnh rỗng: Giữ nguyên Box 40x40 chứa Icon mặc định mờ */
                      <Backpack sx={{ fontSize: 24, color: 'text.disabled', opacity: 0.3 }} />
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}

          {/* Empty State */}
          {!loading && itemsList.length === 0 && (
            <Grid size={12}>
              <Box sx={{ textAlign: 'center', py: 8, opacity: 0.8 }}>
                <Backpack sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>No Items found.</Typography>
                <Typography variant="body2" color="text.secondary">Try typing a different item name.</Typography>
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
              borderColor: '#ec4899',
              color: '#ec4899',
              '&:hover': {
                borderWidth: '2px',
                borderColor: '#ec4899',
                bgcolor: alpha('#ec4899', 0.05)
              }
            }}
          >
            Load More Items
          </Button>
        </Box>
      )}

      {/* Details Swipeable Drawer */}
      <SwipeableDrawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={drawerOpen}
        onClose={handleCloseDetail}
        onOpen={() => {}}
        id="item-detail-drawer"
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
        {selectedItem && (
          <>
            {/* Header / Top Title Bar */}
            <Box
              sx={{
                p: 3,
                pb: 2.5,
                bgcolor: '#475569', // Blue-gray slate background
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Box sx={{ flex: 1, textAlign: 'center' }}>
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
                  {formatItemName(selectedItem.name)}
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
                  Item
                </Typography>
              </Box>
              
              {/* Top-Right Item Sprite & Close button */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', right: 16 }}>
                {selectedItem.spriteUrl && (
                  <Box
                    component="img"
                    src={selectedItem.spriteUrl}
                    alt={selectedItem.name}
                    sx={{
                      width: 44,
                      height: 44,
                      p: 0.5,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  />
                )}
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
              {/* Specifications Stats Section */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                    letterSpacing: 1.5,
                    mb: 1.5,
                    display: 'block'
                  }}
                >
                  Specifications
                </Typography>
                
                {/* Row 1: 2 columns */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Category
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 0.5, textTransform: 'capitalize' }}>
                        {displayStat(selectedItem.category?.replace(/-/g, ' '))}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Bag Pocket
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 0.5, textTransform: 'capitalize' }}>
                        {displayStat(selectedItem.pocket?.replace(/-/g, ' '))}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Row 2: 3 columns */}
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Cost
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 0.5 }}>
                        {selectedItem.cost ? `${selectedItem.cost} ¥` : '-'}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={4}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Fling Power
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 0.5 }}>
                        {displayStat(selectedItem.flingPower)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={4}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Fling Effect
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 0.5, textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {displayStat(selectedItem.flingEffect?.replace(/-/g, ' '))}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Game Description Block */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  bgcolor: isDark ? '#1e293b' : '#f8fafc',
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#10b981', display: 'block', mb: 1 }}>
                    Game Description
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}>
                    {selectedItem.flavorText?.trim() ? selectedItem.flavorText : "Data unavailable for this game version"}
                  </Typography>
                </CardContent>
              </Card>

              {/* Effect Block (Conditional Rendering) */}
              {selectedItem.effect?.trim() && (
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: '16px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    bgcolor: isDark ? '#1e293b' : '#f8fafc',
                    overflow: 'hidden'
                  }}
                >
                  <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#3b82f6', display: 'block', mb: 1 }}>
                      Effect
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}>
                      {selectedItem.effect}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </>
        )}
      </SwipeableDrawer>
    </Container>
  );
}
