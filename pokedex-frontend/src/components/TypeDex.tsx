import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Paper,
  alpha,
  useTheme
} from '@mui/material';
import { Category, Shield, FlashOn, HelpOutlined } from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import {
  TYPE_LIST,
  calculateDamageTaken,
  calculateDamageDealt
} from '../utils/typeMatchups';

// Type Color Palette definition
export const TYPE_COLORS: Record<string, string> = {
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

// Custom Multiplier Chip component for displaying system modifiers
export function TypeMultiplierChip({ type, multiplier }: { type: string; multiplier: number }) {
  const typeLower = type.toLowerCase();
  const typeColor = TYPE_COLORS[typeLower] || '#9ca3af';

  const formatMultiplier = (val: number) => {
    if (val === 0.5) return 'x1/2';
    if (val === 0.25) return 'x1/4';
    return `x${val}`;
  };

  const getMultiplierColor = (val: number) => {
    if (val >= 2) return '#fca5a5'; // Light red for weakness
    if (val < 1 && val > 0) return '#86efac'; // Light green for resistance
    if (val === 0) return '#c084fc'; // Light purple for immunity
    return '#f1f5f9';
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '30px',
        border: `1px solid ${alpha(typeColor, 0.4)}`,
        bgcolor: typeColor,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        m: 0.5
      }}
    >
      {/* Type Name (Left) */}
      <Box sx={{ px: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="caption"
          sx={{
            color: '#ffffff',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            fontSize: '10px'
          }}
        >
          {type}
        </Typography>
      </Box>

      {/* Multiplier Value (Right) */}
      <Box
        sx={{
          height: '100%',
          px: 1.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.22)'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: getMultiplierColor(multiplier),
            fontWeight: 900,
            fontSize: '11px',
            fontFamily: 'monospace'
          }}
        >
          {formatMultiplier(multiplier)}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TypeDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Selection states
  const [primaryType, setPrimaryType] = useState<string>('fire');
  const [secondaryType, setSecondaryType] = useState<string>('none');

  // Compute Defensive Matrix
  const damageTaken = calculateDamageTaken(primaryType, secondaryType);

  // Grouping Defensive Multipliers
  const defensiveGroups = {
    weak: [...damageTaken.x4.map(t => ({ type: t, mult: 4 })), ...damageTaken.x2.map(t => ({ type: t, mult: 2 }))],
    resistant: [...damageTaken.x05.map(t => ({ type: t, mult: 0.5 })), ...damageTaken.x025.map(t => ({ type: t, mult: 0.25 })), ...damageTaken.x0.map(t => ({ type: t, mult: 0 }))],
    normal: damageTaken.x1.map(t => ({ type: t, mult: 1 }))
  };

  // Compute Offensive Matrices
  const primaryDealt = calculateDamageDealt(primaryType);
  const secondaryDealt = secondaryType !== 'none' ? calculateDamageDealt(secondaryType) : null;

  const getOffensiveGroups = (dealt: any) => {
    return {
      strong: dealt.x2.map((t: string) => ({ type: t, mult: 2 })),
      ineffective: [...dealt.x05.map((t: string) => ({ type: t, mult: 0.5 })), ...dealt.x0.map((t: string) => ({ type: t, mult: 0 }))],
      normal: dealt.x1.map((t: string) => ({ type: t, mult: 1 }))
    };
  };

  const primaryOffense = getOffensiveGroups(primaryDealt);
  const secondaryOffense = secondaryDealt ? getOffensiveGroups(secondaryDealt) : null;

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 10, px: { xs: 2, sm: 3 } }}>
      
      {/* Header Info */}
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
          <Category sx={{ color: '#8b5cf6', fontSize: 38 }} />
          Type Matchups Dex
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, maxWidth: 500, mx: 'auto', mb: 4 }}>
          Analyze standard dual-type defensive weaknesses or offensive single-type capabilities.
        </Typography>

        {/* Selector Dropdowns */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            maxWidth: 550,
            mx: 'auto',
            p: 2,
            borderRadius: '24px',
            bgcolor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.5)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Primary Type Selection */}
          <FormControl fullWidth size="small">
            <InputLabel id="primary-type-label" sx={{ fontWeight: 700 }}>Primary Type</InputLabel>
            <Select
              labelId="primary-type-label"
              value={primaryType}
              label="Primary Type"
              onChange={(e) => {
                const val = e.target.value;
                setPrimaryType(val);
                if (val === secondaryType) setSecondaryType('none'); // avoid dual-identical type
              }}
              sx={{
                borderRadius: '14px',
                fontWeight: 700,
                textTransform: 'capitalize',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8b5cf6'
                }
              }}
            >
              {TYPE_LIST.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: TYPE_COLORS[type] }} />
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Secondary Type Selection */}
          <FormControl fullWidth size="small">
            <InputLabel id="secondary-type-label" sx={{ fontWeight: 700 }}>Secondary Type</InputLabel>
            <Select
              labelId="secondary-type-label"
              value={secondaryType}
              label="Secondary Type"
              onChange={(e) => setSecondaryType(e.target.value)}
              sx={{
                borderRadius: '14px',
                fontWeight: 700,
                textTransform: 'capitalize',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8b5cf6'
                }
              }}
            >
              <MenuItem value="none" sx={{ fontWeight: 700, fontStyle: 'italic', color: 'text.secondary' }}>
                None
              </MenuItem>
              {TYPE_LIST.filter(t => t !== primaryType).map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: TYPE_COLORS[type] }} />
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Grid Content */}
      <Grid container spacing={3}>
        
        {/* Section Defensive (Damage Taken) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
              <Shield sx={{ color: '#06b6d4' }} />
              <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '15px' }}>
                Damage Taken (Defensive)
              </Typography>
            </Box>

            <Card
              elevation={0}
              sx={{
                borderRadius: '24px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                background: isDark ? '#0f172a' : '#ffffff',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                
                {/* Weak Against */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 900,
                      color: '#ef4444',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    Weak against... (Takes double/quadruple damage)
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {defensiveGroups.weak.length > 0 ? (
                      defensiveGroups.weak.map(item => (
                        <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontWeight: 600 }}>
                        No weaknesses! Amazing coverage.
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />

                {/* Resistant Against */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 900,
                      color: '#22c55e',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    Resistant against... (Takes halved/no damage)
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {defensiveGroups.resistant.length > 0 ? (
                      defensiveGroups.resistant.map(item => (
                        <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontWeight: 600 }}>
                        No resistances. Glass-cannon setup.
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />

                {/* Normal Damage */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 900,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    Normal damage from... (Takes regular damage)
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {defensiveGroups.normal.map(item => (
                      <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                    ))}
                  </Box>
                </Box>

              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Section Offensive (Damage Dealt) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
              <FlashOn sx={{ color: '#eab308' }} />
              <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '15px' }}>
                Damage Dealt (Offensive - Single Type)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Primary Type Offensive Block */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: '24px',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  background: isDark ? '#0f172a' : '#ffffff',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: TYPE_COLORS[primaryType] }} />
                    Damage Dealt: {primaryType}
                  </Typography>

                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />

                  {/* Strong Against */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', mb: 1 }}>
                      Strong against... (Deals double damage)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {primaryOffense.strong.length > 0 ? (
                        primaryOffense.strong.map((item: any) => (
                          <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontWeight: 600 }}>
                          None. Not very strong...
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Ineffective Against */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', mb: 1 }}>
                      Ineffective against... (Deals halved/no damage)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {primaryOffense.ineffective.length > 0 ? (
                        primaryOffense.ineffective.map((item: any) => (
                          <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontWeight: 600 }}>
                          None! Excellent broad coverage.
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Normal Damage */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', mb: 1 }}>
                      Normal damage to... (Deals regular damage)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {primaryOffense.normal.map((item: any) => (
                        <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Secondary Type Offensive Block (if selected) */}
              {secondaryType !== 'none' && secondaryOffense && (
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: '24px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    background: isDark ? '#0f172a' : '#ffffff',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                    overflow: 'hidden'
                  }}
                >
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900, textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: TYPE_COLORS[secondaryType] }} />
                      Damage Dealt: {secondaryType}
                    </Typography>

                    <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />

                    {/* Strong Against */}
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 900, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', mb: 1 }}>
                        Strong against... (Deals double damage)
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {secondaryOffense.strong.length > 0 ? (
                          secondaryOffense.strong.map((item: any) => (
                            <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontWeight: 600 }}>
                            None. Not very strong...
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Ineffective Against */}
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', mb: 1 }}>
                        Ineffective against... (Deals halved/no damage)
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {secondaryOffense.ineffective.length > 0 ? (
                          secondaryOffense.ineffective.map((item: any) => (
                            <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', fontWeight: 600 }}>
                            None! Excellent broad coverage.
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Normal Damage */}
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', mb: 1 }}>
                        Normal damage to... (Deals regular damage)
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {secondaryOffense.normal.map((item: any) => (
                          <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}

            </Box>
          </motion.div>
        </Grid>

      </Grid>
      
    </Container>
  );
}
