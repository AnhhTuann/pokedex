import React, { useState } from 'react';
import {
  Container, Box, Typography, Card, CardContent, TextField,
  InputAdornment, Grid, alpha, useTheme, Chip, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import {
  Search, KeyboardDoubleArrowUp, KeyboardDoubleArrowDown,
  Thermostat, HelpOutlined, EmojiNature
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';

interface NatureItem {
  name: string;
  increasedStat: string | null;
  decreasedStat: string | null;
  likesFlavor: string | null;
  dislikesFlavor: string | null;
  bestFor: Array<{ id: number; name: string }>;  // Gợi ý Pokémon phổ biến dùng Nature này
  description: string;
}

const NATURES_DATA: NatureItem[] = [
  { name: 'Hardy',   increasedStat: null,          decreasedStat: null,          likesFlavor: null,    dislikesFlavor: null,    bestFor: [], description: 'Neutral nature. No stat changes.' },
  { name: 'Lonely',  increasedStat: 'Attack',       decreasedStat: 'Defense',     likesFlavor: 'Spicy', dislikesFlavor: 'Sour',   bestFor: [{ id: 448, name: 'Lucario' }, { id: 445, name: 'Garchomp' }], description: 'Boosts physical power at the cost of bulk.' },
  { name: 'Brave',   increasedStat: 'Attack',       decreasedStat: 'Speed',       likesFlavor: 'Spicy', dislikesFlavor: 'Sweet',  bestFor: [{ id: 445, name: 'Garchomp' }, { id: 376, name: 'Metagross' }], description: 'Best for Trick Room sweepers. Max power, ignores Speed.' },
  { name: 'Adamant', increasedStat: 'Attack',       decreasedStat: 'Sp. Attack',  likesFlavor: 'Spicy', dislikesFlavor: 'Dry',    bestFor: [{ id: 445, name: 'Garchomp' }, { id: 392, name: 'Infernape' }, { id: 448, name: 'Lucario' }], description: 'The best physical attacker nature. No wasted stats.' },
  { name: 'Naughty', increasedStat: 'Attack',       decreasedStat: 'Sp. Defense', likesFlavor: 'Spicy', dislikesFlavor: 'Bitter', bestFor: [{ id: 260, name: 'Swampert' }], description: 'Physical attacker with lower special bulk.' },
  { name: 'Bold',    increasedStat: 'Defense',      decreasedStat: 'Attack',      likesFlavor: 'Sour',  dislikesFlavor: 'Spicy',  bestFor: [{ id: 113, name: 'Chansey' }, { id: 242, name: 'Blissey' }, { id: 121, name: 'Starmie' }], description: 'Great for physical walls. Trades attack for bulk.' },
  { name: 'Docile',  increasedStat: null,          decreasedStat: null,           likesFlavor: null,    dislikesFlavor: null,    bestFor: [], description: 'Neutral nature. No stat changes.' },
  { name: 'Relaxed', increasedStat: 'Defense',      decreasedStat: 'Speed',       likesFlavor: 'Sour',  dislikesFlavor: 'Sweet',  bestFor: [{ id: 376, name: 'Metagross' }, { id: 91, name: 'Cloyster' }], description: 'Tank in Trick Room. Max defense, slow but sturdy.' },
  { name: 'Impish',  increasedStat: 'Defense',      decreasedStat: 'Sp. Attack',  likesFlavor: 'Sour',  dislikesFlavor: 'Dry',    bestFor: [{ id: 232, name: 'Donphan' }, { id: 212, name: 'Scizor' }], description: 'Physical wall that gives up special attacking power.' },
  { name: 'Lax',     increasedStat: 'Defense',      decreasedStat: 'Sp. Defense', likesFlavor: 'Sour',  dislikesFlavor: 'Bitter', bestFor: [], description: 'Situational. Higher physical bulk, lower special bulk.' },
  { name: 'Timid',   increasedStat: 'Speed',        decreasedStat: 'Attack',      likesFlavor: 'Sweet', dislikesFlavor: 'Spicy',  bestFor: [{ id: 6, name: 'Charizard' }, { id: 282, name: 'Gardevoir' }, { id: 25, name: 'Pikachu' }], description: 'Best for special attackers who need speed. Classic competitive choice.' },
  { name: 'Hasty',   increasedStat: 'Speed',        decreasedStat: 'Defense',     likesFlavor: 'Sweet', dislikesFlavor: 'Sour',   bestFor: [{ id: 392, name: 'Infernape' }, { id: 448, name: 'Lucario' }], description: 'Fast mixed attacker. Trades defense for speed.' },
  { name: 'Serious', increasedStat: null,           decreasedStat: null,          likesFlavor: null,    dislikesFlavor: null,    bestFor: [], description: 'Neutral nature. No stat changes.' },
  { name: 'Jolly',   increasedStat: 'Speed',        decreasedStat: 'Sp. Attack',  likesFlavor: 'Sweet', dislikesFlavor: 'Dry',    bestFor: [{ id: 445, name: 'Garchomp' }, { id: 149, name: 'Dragonite' }, { id: 143, name: 'Snorlax' }], description: 'Top-tier for physical sweepers who need speed. No special attack loss.' },
  { name: 'Naive',   increasedStat: 'Speed',        decreasedStat: 'Sp. Defense', likesFlavor: 'Sweet', dislikesFlavor: 'Bitter', bestFor: [{ id: 6, name: 'Charizard' }], description: 'Fast mixed sweeper, weaker to special hits.' },
  { name: 'Modest',  increasedStat: 'Sp. Attack',   decreasedStat: 'Attack',      likesFlavor: 'Dry',   dislikesFlavor: 'Spicy',  bestFor: [{ id: 6, name: 'Charizard' }, { id: 135, name: 'Jolteon' }, { id: 121, name: 'Starmie' }], description: 'Best special attacker nature. Maximizes SpAtk, no drawback on moves used.' },
  { name: 'Mild',    increasedStat: 'Sp. Attack',   decreasedStat: 'Defense',     likesFlavor: 'Dry',   dislikesFlavor: 'Sour',   bestFor: [{ id: 149, name: 'Dragonite' }], description: 'Mixed special attacker that sacrifices physical bulk.' },
  { name: 'Quiet',   increasedStat: 'Sp. Attack',   decreasedStat: 'Speed',       likesFlavor: 'Dry',   dislikesFlavor: 'Sweet',  bestFor: [{ id: 379, name: 'Registeel' }, { id: 483, name: 'Dialga' }], description: 'Special attacker for Trick Room teams. Slow but hits extremely hard.' },
  { name: 'Bashful', increasedStat: null,           decreasedStat: null,          likesFlavor: null,    dislikesFlavor: null,    bestFor: [], description: 'Neutral nature. No stat changes.' },
  { name: 'Rash',    increasedStat: 'Sp. Attack',   decreasedStat: 'Sp. Defense', likesFlavor: 'Dry',   dislikesFlavor: 'Bitter', bestFor: [{ id: 196, name: 'Espeon' }], description: 'High special attack, weaker to special moves.' },
  { name: 'Calm',    increasedStat: 'Sp. Defense',  decreasedStat: 'Attack',      likesFlavor: 'Bitter',dislikesFlavor: 'Spicy',  bestFor: [{ id: 113, name: 'Chansey' }, { id: 242, name: 'Blissey' }, { id: 245, name: 'Suicune' }], description: 'Classic special wall nature. Pairs perfectly with Blissey.' },
  { name: 'Gentle',  increasedStat: 'Sp. Defense',  decreasedStat: 'Defense',     likesFlavor: 'Bitter',dislikesFlavor: 'Sour',   bestFor: [{ id: 202, name: 'Wobbuffet' }], description: 'Higher special bulk, weaker to physical hits.' },
  { name: 'Sassy',   increasedStat: 'Sp. Defense',  decreasedStat: 'Speed',       likesFlavor: 'Bitter',dislikesFlavor: 'Sweet',  bestFor: [{ id: 292, name: 'Shedinja' }], description: 'Bulky special wall for Trick Room. Slow and tanky.' },
  { name: 'Careful', increasedStat: 'Sp. Defense',  decreasedStat: 'Sp. Attack',  likesFlavor: 'Bitter',dislikesFlavor: 'Dry',    bestFor: [{ id: 143, name: 'Snorlax' }, { id: 462, name: 'Magnezone' }], description: 'Top special wall that gives up special attacking power.' },
  { name: 'Quirky',  increasedStat: null,           decreasedStat: null,          likesFlavor: null,    dislikesFlavor: null,    bestFor: [], description: 'Neutral nature. No stat changes.' },
];

const STAT_FILTER_OPTIONS = ['All', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed', 'Neutral'];

const STAT_COLORS: Record<string, string> = {
  'Attack': '#ef4444',
  'Defense': '#3b82f6',
  'Sp. Attack': '#a855f7',
  'Sp. Defense': '#22c55e',
  'Speed': '#f59e0b',
};

export default function NatureDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [statFilter, setStatFilter] = useState('All');

  const filteredNatures = NATURES_DATA.filter((nature) => {
    const matchesSearch = nature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (nature.increasedStat?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    if (!matchesSearch) return false;
    if (statFilter === 'All') return true;
    if (statFilter === 'Neutral') return nature.increasedStat === null;
    return nature.increasedStat === statFilter;
  });

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 10, px: { xs: 2, sm: 3 } }}>

      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
          <EmojiNature sx={{ color: '#ec4899', fontSize: 38 }} />
          Nature Dex
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, maxWidth: 520, mx: 'auto', mb: 3 }}>
          All 25 Natures with stat multipliers, flavor preferences, and top Pokémon that benefit from each.
        </Typography>

        {/* Search */}
        <Box sx={{ maxWidth: 480, mx: 'auto', mb: 3 }}>
          <TextField
            fullWidth value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search nature or stat (e.g. Jolly, Speed)..."
            variant="outlined"
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.disabled' }} /></InputAdornment> } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '20px', bgcolor: isDark ? 'rgba(15,23,42,0.6)' : 'rgba(241,245,249,0.8)', backdropFilter: 'blur(10px)', '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }, '&.Mui-focused fieldset': { borderColor: '#ec4899' } }, '& .MuiOutlinedInput-input': { py: 1.5, fontWeight: 600, fontSize: '14px' } }}
          />
        </Box>

        {/* Stat Filter */}
        <ToggleButtonGroup
          value={statFilter} exclusive
          onChange={(_, v) => { if (v !== null) setStatFilter(v); }}
          size="small"
          sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, mb: 1, '& .MuiToggleButton-root': { border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)', borderRadius: '20px !important', px: 2, py: 0.5, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', '&.Mui-selected': { color: '#fff', borderColor: 'transparent' } } }}
        >
          {STAT_FILTER_OPTIONS.map((opt) => (
            <ToggleButton
              key={opt} value={opt}
              sx={{ '&.Mui-selected': { bgcolor: opt === 'Neutral' ? '#64748b' : (STAT_COLORS[opt] || '#ec4899') + ' !important' } }}
            >
              {opt}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700 }}>
          {filteredNatures.length} / {NATURES_DATA.length} natures
        </Typography>
      </Box>

      {/* Grid */}
      <Grid container spacing={2.5}>
        <AnimatePresence mode="popLayout">
          {filteredNatures.map((item, index) => {
            const isNeutral = item.increasedStat === null;
            const upColor = STAT_COLORS[item.increasedStat || ''] || '#64748b';
            const downColor = STAT_COLORS[item.decreasedStat || ''] || '#64748b';

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.name}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <Card elevation={0} sx={{
                    height: '100%', borderRadius: '20px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.6) 100%)'
                      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      borderColor: isNeutral ? alpha('#94a3b8', 0.4) : alpha(upColor, 0.5),
                      boxShadow: isNeutral ? 'none' : `0 8px 24px ${alpha(upColor, 0.12)}`
                    }
                  }}>
                    <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

                      {/* Name */}
                      <Typography variant="h6" align="center" sx={{ fontWeight: 900, letterSpacing: '-0.5px', color: 'text.primary' }}>
                        {item.name}
                      </Typography>

                      {/* Description */}
                      <Typography variant="caption" align="center" color="text.secondary" sx={{ fontWeight: 600, display: 'block', lineHeight: 1.4, minHeight: '2.8em' }}>
                        {item.description}
                      </Typography>

                      {/* Stat bars */}
                      <Box sx={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', gap: '2px' }}>
                        <Box sx={{
                          flex: 1, height: 36, borderRadius: '8px',
                          bgcolor: isNeutral ? (isDark ? '#334155' : '#e2e8f0') : alpha(upColor, 0.15),
                          border: `1.5px solid ${isNeutral ? 'transparent' : alpha(upColor, 0.4)}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5
                        }}>
                          {!isNeutral && <KeyboardDoubleArrowUp sx={{ fontSize: 14, color: upColor }} />}
                          <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3px', color: isNeutral ? 'text.disabled' : upColor }}>
                            {isNeutral ? '—' : item.increasedStat}
                          </Typography>
                        </Box>
                        <Box sx={{
                          flex: 1, height: 36, borderRadius: '8px',
                          bgcolor: isNeutral ? (isDark ? '#334155' : '#e2e8f0') : alpha(downColor, 0.08),
                          border: `1.5px solid ${isNeutral ? 'transparent' : alpha(downColor, 0.25)}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5
                        }}>
                          <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3px', color: isNeutral ? 'text.disabled' : downColor }}>
                            {isNeutral ? '—' : item.decreasedStat}
                          </Typography>
                          {!isNeutral && <KeyboardDoubleArrowDown sx={{ fontSize: 14, color: downColor }} />}
                        </Box>
                      </Box>

                      {/* Flavors */}
                      {!isNeutral && (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Chip label={`♥ ${item.likesFlavor}`} size="small" sx={{ fontSize: '10px', fontWeight: 800, bgcolor: alpha('#22c55e', 0.1), color: '#22c55e', border: '1px solid', borderColor: alpha('#22c55e', 0.3) }} />
                          <Chip label={`✕ ${item.dislikesFlavor}`} size="small" sx={{ fontSize: '10px', fontWeight: 800, bgcolor: alpha('#ef4444', 0.1), color: '#ef4444', border: '1px solid', borderColor: alpha('#ef4444', 0.3) }} />
                        </Box>
                      )}

                      {/* Best Pokémon */}
                      {item.bestFor.length > 0 && (
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', mb: 0.75, fontSize: '9px' }}>
                            Popular on
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                            {item.bestFor.map((pk) => (
                              <Box key={pk.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.25, borderRadius: '8px', bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }}>
                                <Box component="img"
                                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pk.id}.png`}
                                  alt={pk.name} sx={{ width: 24, height: 24, imageRendering: 'pixelated' }}
                                />
                                <Typography variant="caption" sx={{ fontSize: '10px', fontWeight: 800, textTransform: 'capitalize', color: 'text.secondary' }}>
                                  {pk.name}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </AnimatePresence>

        {filteredNatures.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ textAlign: 'center', py: 10, color: 'text.disabled' }}>
              <HelpOutlined sx={{ fontSize: 60, mb: 1.5, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>No natures found.</Typography>
              <Typography variant="body2">Try a different search or filter.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
