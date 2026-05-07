import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Grid,
  alpha,
  useTheme
} from '@mui/material';
import {
  Search,
  KeyboardDoubleArrowUp,
  KeyboardDoubleArrowDown,
  Thermostat,
  Favorite,
  HelpOutlined
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';

// Hardcoded Nature Data for all 25 Natures
interface NatureItem {
  name: string;
  increasedStat: string | null;
  decreasedStat: string | null;
  likesFlavor: string | null;
  dislikesFlavor: string | null;
}

const NATURES_DATA: NatureItem[] = [
  { name: 'Hardy', increasedStat: null, decreasedStat: null, likesFlavor: null, dislikesFlavor: null },
  { name: 'Lonely', increasedStat: 'Attack', decreasedStat: 'Defense', likesFlavor: 'Spicy', dislikesFlavor: 'Sour' },
  { name: 'Brave', increasedStat: 'Attack', decreasedStat: 'Speed', likesFlavor: 'Spicy', dislikesFlavor: 'Sweet' },
  { name: 'Adamant', increasedStat: 'Attack', decreasedStat: 'Sp. Attack', likesFlavor: 'Spicy', dislikesFlavor: 'Dry' },
  { name: 'Naughty', increasedStat: 'Attack', decreasedStat: 'Sp. Defense', likesFlavor: 'Spicy', dislikesFlavor: 'Bitter' },
  { name: 'Bold', increasedStat: 'Defense', decreasedStat: 'Attack', likesFlavor: 'Sour', dislikesFlavor: 'Spicy' },
  { name: 'Docile', increasedStat: null, decreasedStat: null, likesFlavor: null, dislikesFlavor: null },
  { name: 'Relaxed', increasedStat: 'Defense', decreasedStat: 'Speed', likesFlavor: 'Sour', dislikesFlavor: 'Sweet' },
  { name: 'Impish', increasedStat: 'Defense', decreasedStat: 'Sp. Attack', likesFlavor: 'Sour', dislikesFlavor: 'Dry' },
  { name: 'Lax', increasedStat: 'Defense', decreasedStat: 'Sp. Defense', likesFlavor: 'Sour', dislikesFlavor: 'Bitter' },
  { name: 'Timid', increasedStat: 'Speed', decreasedStat: 'Attack', likesFlavor: 'Sweet', dislikesFlavor: 'Spicy' },
  { name: 'Hasty', increasedStat: 'Speed', decreasedStat: 'Defense', likesFlavor: 'Sweet', dislikesFlavor: 'Sour' },
  { name: 'Serious', increasedStat: null, decreasedStat: null, likesFlavor: null, dislikesFlavor: null },
  { name: 'Jolly', increasedStat: 'Speed', decreasedStat: 'Sp. Attack', likesFlavor: 'Sweet', dislikesFlavor: 'Dry' },
  { name: 'Naive', increasedStat: 'Speed', decreasedStat: 'Sp. Defense', likesFlavor: 'Sweet', dislikesFlavor: 'Bitter' },
  { name: 'Modest', increasedStat: 'Sp. Attack', decreasedStat: 'Attack', likesFlavor: 'Dry', dislikesFlavor: 'Spicy' },
  { name: 'Mild', increasedStat: 'Sp. Attack', decreasedStat: 'Defense', likesFlavor: 'Dry', dislikesFlavor: 'Sour' },
  { name: 'Quiet', increasedStat: 'Sp. Attack', decreasedStat: 'Speed', likesFlavor: 'Dry', dislikesFlavor: 'Sweet' },
  { name: 'Bashful', increasedStat: null, decreasedStat: null, likesFlavor: null, dislikesFlavor: null },
  { name: 'Rash', increasedStat: 'Sp. Attack', decreasedStat: 'Sp. Defense', likesFlavor: 'Dry', dislikesFlavor: 'Bitter' },
  { name: 'Calm', increasedStat: 'Sp. Defense', decreasedStat: 'Attack', likesFlavor: 'Bitter', dislikesFlavor: 'Spicy' },
  { name: 'Gentle', increasedStat: 'Sp. Defense', decreasedStat: 'Defense', likesFlavor: 'Bitter', dislikesFlavor: 'Sour' },
  { name: 'Sassy', increasedStat: 'Sp. Defense', decreasedStat: 'Speed', likesFlavor: 'Bitter', dislikesFlavor: 'Sweet' },
  { name: 'Careful', increasedStat: 'Sp. Defense', decreasedStat: 'Sp. Attack', likesFlavor: 'Bitter', dislikesFlavor: 'Dry' },
  { name: 'Quirky', increasedStat: null, decreasedStat: null, likesFlavor: null, dislikesFlavor: null },
];

export default function NatureDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering function
  const filteredNatures = NATURES_DATA.filter((nature) =>
    nature.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 10, px: { xs: 2, sm: 3 } }}>
      
      {/* Header section */}
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
          <Thermostat sx={{ color: '#ec4899', fontSize: 38 }} />
          Nature Dex
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, maxWidth: 500, mx: 'auto', mb: 3 }}>
          Browse standard Natures to understand stat growth multipliers, flavor likes, and flavor dislikes.
        </Typography>

        {/* Search Input Box */}
        <Box sx={{ maxWidth: { xs: '100%', sm: '480px' }, mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter nature name..."
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
      </Box>

      {/* Grid List */}
      <Grid container spacing={2.5}>
        <AnimatePresence mode="popLayout">
          {filteredNatures.map((item, index) => {
            const isNeutral = item.increasedStat === null;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.name}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: '20px',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.35) 0%, rgba(15, 23, 42, 0.55) 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.02)',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        borderColor: isNeutral ? 'text.disabled' : '#ec4899',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      
                      {/* Dòng 1: Header (Căn giữa tên Nature) */}
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          fontWeight: 900,
                          color: 'text.primary',
                          letterSpacing: '-0.5px'
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Dòng 2: Flavors (Likes/Dislikes) */}
                      <Box
                        sx={{
                          display: 'flex',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
                        }}
                      >
                        {/* Likes Cột trái */}
                        <Box
                          sx={{
                            flex: 1,
                            p: 1.2,
                            textAlign: 'center',
                            borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`
                          }}
                        >
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.2 }}>
                            Likes
                          </Typography>
                          <Typography variant="subtitle2" sx={{ color: item.likesFlavor ? '#22c55e' : 'text.disabled', fontWeight: 800, textTransform: 'capitalize' }}>
                            {item.likesFlavor || '-'}
                          </Typography>
                        </Box>

                        {/* Dislikes Cột phải */}
                        <Box sx={{ flex: 1, p: 1.2, textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.2 }}>
                            Dislikes
                          </Typography>
                          <Typography variant="subtitle2" sx={{ color: item.dislikesFlavor ? '#ef4444' : 'text.disabled', fontWeight: 800, textTransform: 'capitalize' }}>
                            {item.dislikesFlavor || '-'}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Dòng 3: Stats (Increased / Decreased) */}
                      <Box sx={{ display: 'flex', borderRadius: '10px', overflow: 'hidden' }}>
                        
                        {/* Cột trái (Increased - Red) */}
                        <Box
                          sx={{
                            flex: 1,
                            height: '38px',
                            bgcolor: isNeutral ? (isDark ? '#334155' : '#e2e8f0') : '#f44336',
                            color: isNeutral ? (isDark ? '#94a3b8' : '#64748b') : '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            position: 'relative'
                          }}
                        >
                          {!isNeutral && (
                            <KeyboardDoubleArrowUp sx={{ fontSize: 16, position: 'absolute', left: 8 }} />
                          )}
                          <Typography variant="caption" sx={{ fontWeight: 850, width: '100%', textAlign: 'center', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                            {isNeutral ? '-' : item.increasedStat}
                          </Typography>
                        </Box>

                        {/* Split line */}
                        <Box sx={{ width: '1.5px', bgcolor: isDark ? '#0f172a' : '#f8fafc' }} />

                        {/* Cột phải (Decreased - Blue) */}
                        <Box
                          sx={{
                            flex: 1,
                            height: '38px',
                            bgcolor: isNeutral ? (isDark ? '#334155' : '#e2e8f0') : '#2196f3',
                            color: isNeutral ? (isDark ? '#94a3b8' : '#64748b') : '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            position: 'relative'
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 850, width: '100%', textAlign: 'center', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                            {isNeutral ? '-' : item.decreasedStat}
                          </Typography>
                          {!isNeutral && (
                            <KeyboardDoubleArrowDown sx={{ fontSize: 16, position: 'absolute', right: 8 }} />
                          )}
                        </Box>

                      </Box>

                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </AnimatePresence>

        {/* Empty state */}
        {filteredNatures.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ textAlign: 'center', py: 10, color: 'text.disabled' }}>
              <HelpOutlined sx={{ fontSize: 60, mb: 1.5, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>No Natures found.</Typography>
              <Typography variant="body2">Try refining your keyword search.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

    </Container>
  );
}
