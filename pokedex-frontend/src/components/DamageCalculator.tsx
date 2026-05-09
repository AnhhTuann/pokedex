import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import {
  Container, Box, Grid, Card, CardContent, Typography, TextField, Autocomplete,
  Slider, Select, MenuItem, FormControl, InputLabel, Button, Divider, Stack,
  Switch, FormControlLabel, useTheme, alpha, Alert, Avatar, Chip
} from '@mui/material';
import {
  SportsKabaddi, Bolt, Thunderstorm, LightMode, BlurOn, Warning, Gavel, Favorite, ContentCopy, Check
} from '@mui/icons-material';
import { motion } from 'motion/react';
import {
  calculateDamage, calculateActualHP, calculateActualOtherStat,
  getNatureModifier, getFinalEffectiveness, CalculatorPokemon, CalculatorMove, FieldState
} from '../utils/damageCalc';

// GraphQL queries
const SEARCH_POKEMON_QUERY = gql`
  query SearchPokemonForCalc($search: String) {
    pokemonList(limit: 100, search: $search) {
      results {
        id
        name
        types
        image
      }
    }
  }
`;

const GET_POKEMON_CALC_DETAILS = gql`
  query GetPokemonCalcDetails($id: Int!) {
    pokemon(id: $id) {
      id
      name
      types
      image
      abilities
      stats {
        name
        value
      }
      moves {
        name
        type
        power
        accuracy
        damageClass
      }
    }
  }
`;

const NATURES = [
  'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
  'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
  'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
  'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
  'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
];

const ITEMS = [
  'None', 'Leftovers', 'Life Orb', 'Choice Band', 'Choice Specs', 'Choice Scarf',
  'Assault Vest', 'Eviolite', 'Light Ball', 'Thick Club', 'Expert Belt', 'Focus Sash'
];

const STATUSES = ['Healthy', 'Burned', 'Paralyzed'];

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'Spe'
};

const TYPE_COLORS: Record<string, string> = {
  normal: "#9ca3af", fire: "#f97316", water: "#3b82f6", electric: "#eab308",
  grass: "#22c55e", ice: "#06b6d4", fighting: "#ef4444", poison: "#a855f7",
  ground: "#d97706", flying: "#818cf8", psychic: "#ec4899", bug: "#84cc16",
  rock: "#78716c", ghost: "#7c3aed", dragon: "#1d4ed8", dark: "#374151",
  steel: "#6b7280", fairy: "#f472b6"
};

const DEFAULT_STATS = {
  hp: 80,
  attack: 80,
  defense: 80,
  'special-attack': 80,
  'special-defense': 80,
  speed: 80
};

// Helper to determine damage ranges colors dynamically
function getDamageColor(maxPercent: number) {
  if (maxPercent < 25) return '#10b981'; // Green
  if (maxPercent < 50) return '#eab308'; // Yellow
  if (maxPercent < 100) return '#f97316'; // Orange
  return '#ef4444'; // Red
}

// Helper to determine HP Bar color mapping
function calcTypeColor(pct: number) {
  if (pct > 50) return 'linear-gradient(90deg, #10b981 0%, #059669 100%)'; // Emerald Green
  if (pct > 20) return 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'; // Orange/Amber
  return 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'; // Crimson Red
}

/* ==========================================
   SUB-COMPONENT: StatRow
   ========================================== */
interface StatRowProps {
  statKey: string;
  label: string;
  base: number;
  ev: number;
  iv: number;
  level: number;
  nature: string;
  onEvChangeCommitted: (stat: string, val: number) => void;
  onIvChange: (stat: string, val: number) => void;
  color: string;
  remainingEvs: number;
}

const StatRowComponent: React.FC<StatRowProps> = ({
  statKey,
  label,
  base,
  ev,
  iv,
  level,
  nature,
  onEvChangeCommitted,
  onIvChange,
  color,
  remainingEvs
}) => {
  // Local state for the EV slider/input to avoid 12 Sliders lag
  const [localEv, setLocalEv] = useState<number>(ev);

  // Sync with global ev value if it changes externally
  useEffect(() => {
    setLocalEv(ev);
  }, [ev]);

  // Handle EV change locally for smooth sliding at 60fps
  const handleLocalEvChange = (val: number) => {
    const maxAllowed = remainingEvs + ev;
    const cappedVal = Math.max(0, Math.min(val, Math.min(252, maxAllowed)));
    setLocalEv(cappedVal);
  };

  // Commit the EV change globally on slider release or input change
  const commitEvChange = (val: number) => {
    const maxAllowed = remainingEvs + ev;
    const cappedVal = Math.max(0, Math.min(val, Math.min(252, maxAllowed)));
    onEvChangeCommitted(statKey, cappedVal);
  };

  const natureMod = statKey === 'hp' ? 1.0 : getNatureModifier(nature, statKey);
  
  // Real-time stat calculation during dragging
  const finalStat = statKey === 'hp'
    ? calculateActualHP(base, iv, localEv, level)
    : calculateActualOtherStat(base, iv, localEv, level, natureMod);

  // Nature color/indicator (▲ for increased, ▼ for decreased)
  let natureIndicator = '';
  let natureColor = 'text.primary';
  if (statKey !== 'hp') {
    if (natureMod === 1.1) {
      natureIndicator = ' ▲';
      natureColor = '#f43f5e'; // Light Rose Red
    } else if (natureMod === 0.9) {
      natureIndicator = ' ▼';
      natureColor = '#3b82f6'; // Bright Blue
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 0.25,
        minHeight: '30px',
        gap: 1.5,
        borderBottom: '1px solid rgba(255,255,255,0.03)',
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      {/* Stat Name */}
      <Typography
        variant="caption"
        sx={{
          width: 35,
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          color: natureColor
        }}
      >
        {label}
        <span style={{ fontSize: '0.65rem' }}>{natureIndicator}</span>
      </Typography>

      {/* Base Stat */}
      <Typography
        variant="caption"
        sx={{
          width: 25,
          fontWeight: 700,
          color: 'text.secondary',
          textAlign: 'center',
          fontSize: '0.75rem'
        }}
      >
        {base}
      </Typography>

      {/* EV Input */}
      <TextField
        size="small"
        type="number"
        value={localEv}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 0;
          handleLocalEvChange(val);
          commitEvChange(val);
        }}
        onBlur={() => {
          commitEvChange(localEv);
        }}
        slotProps={{
          input: {
            sx: {
              height: 22,
              width: 55,
              fontSize: '0.72rem',
              fontWeight: 800,
              borderRadius: '4px',
              p: 0,
              '& input': { textAlign: 'center', p: '2px 4px' }
            }
          }
        }}
      />

      {/* Thin Small EV Slider */}
      <Box sx={{ width: 100, display: 'flex', alignItems: 'center' }}>
        <Slider
          size="small"
          value={localEv}
          min={0}
          max={252}
          step={4}
          onChange={(_, val: any) => handleLocalEvChange(val)}
          onChangeCommitted={(_, val: any) => commitEvChange(val)}
          sx={{
            color: color,
            py: 1,
            '& .MuiSlider-thumb': {
              width: 10,
              height: 10,
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'none'
              }
            },
            '& .MuiSlider-track': { height: 2 },
            '& .MuiSlider-rail': { height: 2 }
          }}
        />
      </Box>

      {/* IV Input */}
      <TextField
        size="small"
        type="number"
        value={iv}
        onChange={(e) => onIvChange(statKey, parseInt(e.target.value) || 0)}
        slotProps={{
          input: {
            sx: {
              height: 22,
              width: 45,
              fontSize: '0.72rem',
              fontWeight: 800,
              borderRadius: '4px',
              p: 0,
              '& input': { textAlign: 'center', p: '2px 4px' }
            }
          }
        }}
      />

      {/* Actual Stat Result */}
      <Typography
        variant="caption"
        sx={{
          flexGrow: 1,
          fontWeight: 900,
          textAlign: 'right',
          fontSize: '0.78rem',
          color: natureColor
        }}
      >
        {finalStat}
      </Typography>
    </Box>
  );
};

const StatRow = React.memo(StatRowComponent);


/* ==========================================
   SUB-COMPONENT: PokemonConfigCard (Memoized)
   ========================================== */
interface PokemonConfigCardProps {
  side: 'atk' | 'def';
  isDark: boolean;
  theme: any;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  pokemonList: any[];
  currentPoke: any;
  onPokemonSelect: (id: number) => void;
  level: number;
  onLevelChange: (lvl: number) => void;
  nature: string;
  onNatureChange: (nature: string) => void;
  item: string;
  onItemChange: (item: string) => void;
  ability: string;
  onAbilityChange: (ability: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  evs: Record<string, number>;
  onEvChangeCommitted: (stat: string, val: number) => void;
  ivs: Record<string, number>;
  onIvChange: (stat: string, val: number) => void;
  selectedMove?: any;
  onMoveSelect?: (move: any) => void;
}

const PokemonConfigCardComponent: React.FC<PokemonConfigCardProps> = ({
  side,
  isDark,
  theme,
  searchQuery,
  onSearchChange,
  pokemonList,
  currentPoke,
  onPokemonSelect,
  level,
  onLevelChange,
  nature,
  onNatureChange,
  item,
  onItemChange,
  ability,
  onAbilityChange,
  status,
  onStatusChange,
  evs,
  onEvChangeCommitted,
  ivs,
  onIvChange,
  selectedMove,
  onMoveSelect
}) => {
  const isAtk = side === 'atk';
  const themeColor = isAtk ? theme.palette.primary.main : theme.palette.secondary.main;
  
  // High fidelity distinct backgrounds
  const cardBg = isAtk
    ? (isDark ? 'rgba(239, 68, 68, 0.02)' : 'rgba(254, 242, 242, 0.5)')
    : (isDark ? 'rgba(59, 130, 246, 0.02)' : 'rgba(240, 249, 255, 0.5)');

  const borderColor = isAtk
    ? (isDark ? 'rgba(239, 68, 68, 0.18)' : 'rgba(252, 165, 165, 0.4)')
    : (isDark ? 'rgba(59, 130, 246, 0.18)' : 'rgba(147, 197, 253, 0.4)');

  const totalEvs = Object.values(evs).reduce((a, b) => a + b, 0);
  const remainingEvs = 508 - totalEvs;

  return (
    <Card
      elevation={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: `2px solid ${borderColor}`,
        bgcolor: cardBg,
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      {/* Header band */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: isAtk ? 'rgba(239, 68, 68, 0.05)' : 'rgba(59, 130, 246, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${borderColor}`
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 900,
            letterSpacing: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.82rem'
          }}
        >
          <Avatar sx={{ width: 20, height: 20, bgcolor: themeColor, fontSize: 10, fontWeight: 900 }}>
            {isAtk ? 'A' : 'D'}
          </Avatar>
          {isAtk ? 'ATTACKER CONFIG' : 'DEFENDER CONFIG'}
        </Typography>
        {currentPoke && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {currentPoke.types.map((type: string) => (
              <Chip
                key={type}
                label={type}
                size="small"
                sx={{
                  bgcolor: TYPE_COLORS[type] || '#ccc',
                  color: '#fff',
                  fontWeight: 900,
                  height: 16,
                  fontSize: '0.55rem',
                  textTransform: 'uppercase'
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.8, flexGrow: 1 }}>
        {/* Search & Autocomplete */}
        <Autocomplete
          id={`${side}-poke-search`}
          options={pokemonList}
          getOptionLabel={(option: any) => (typeof option === 'string' ? option : option?.name || '')}
          value={currentPoke ? { id: currentPoke.id, name: currentPoke.name, image: currentPoke.image } : null}
          isOptionEqualToValue={(option, val) => option?.id === val?.id}
          onInputChange={(_, val) => onSearchChange(val)}
          onChange={(_, val: any) => {
            if (val) onPokemonSelect(val.id);
          }}
          renderOption={(props, option: any) => {
            const { key, ...otherProps } = props as any;
            return (
              <Box component="li" {...otherProps} key={option.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
                <Avatar src={option.image} sx={{ width: 28, height: 28, bgcolor: 'background.default' }} />
                <Typography sx={{ textTransform: 'capitalize', fontWeight: 700, fontSize: '0.85rem' }}>{option.name}</Typography>
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label={isAtk ? "SEARCH ATTACKER" : "SEARCH DEFENDER"} size="small" />
          )}
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
            '& .MuiInputLabel-root': { fontWeight: 800, fontSize: '0.75rem' }
          }}
        />

        {/* Compact Avatar Box */}
        {currentPoke && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1,
              borderRadius: '10px',
              bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.4)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
            }}
          >
            <Box component="img" src={currentPoke.image} sx={{ width: 56, height: 56, objectFit: 'contain' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 900, fontSize: '0.92rem', lineHeight: 1.2 }}>
                {currentPoke.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block' }}>
                Base Stats Total: {currentPoke.stats.reduce((acc: number, curr: any) => acc + curr.value, 0)}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Level / Nature / Status / Ability / Item Options Row - Compact Grid (2 rows) */}
        <Grid container spacing={1.2}>
          {/* Row 1: Level (xs: 3), Nature (xs: 5), Status (xs: 4) */}
          <Grid size={{ xs: 3 }}>
            <TextField
              fullWidth
              label="LV"
              type="number"
              size="small"
              value={level}
              onChange={(e) => onLevelChange(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              slotProps={{
                inputLabel: { sx: { fontWeight: 800, fontSize: '0.75rem' } },
                input: { sx: { borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', height: '32px' } }
              }}
            />
          </Grid>

          <Grid size={{ xs: 5 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontWeight: 800, fontSize: '0.75rem' }}>NATURE</InputLabel>
              <Select
                value={nature}
                label="NATURE"
                onChange={(e) => onNatureChange(e.target.value)}
                sx={{ borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', height: '32px' }}
              >
                {NATURES.map((nat) => (
                  <MenuItem key={nat} value={nat} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                    {nat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontWeight: 800, fontSize: '0.75rem' }}>STATUS</InputLabel>
              <Select
                value={status}
                label="STATUS"
                onChange={(e) => onStatusChange(e.target.value)}
                sx={{ borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', height: '32px' }}
              >
                {STATUSES.map((stat) => (
                  <MenuItem key={stat} value={stat} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                    {stat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Row 2: Ability (xs: 6), Item (xs: 6) */}
          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontWeight: 800, fontSize: '0.75rem' }}>ABILITY</InputLabel>
              <Select
                value={ability}
                label="ABILITY"
                onChange={(e) => onAbilityChange(e.target.value)}
                sx={{ borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', height: '32px' }}
              >
                {currentPoke?.abilities?.map((ab: string) => (
                  <MenuItem key={ab} value={ab} sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'capitalize' }}>
                    {ab}
                  </MenuItem>
                )) || <MenuItem value="" sx={{ fontSize: '0.75rem' }}>None</MenuItem>}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontWeight: 800, fontSize: '0.75rem' }}>HELD ITEM</InputLabel>
              <Select
                value={item}
                label="HELD ITEM"
                onChange={(e) => onItemChange(e.target.value)}
                sx={{ borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', height: '32px' }}
              >
                {ITEMS.map((it) => (
                  <MenuItem key={it} value={it} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                    {it}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Only for Attacker: Select Move Selection / Defender: Spacer to balance height */}
        {isAtk && currentPoke && onMoveSelect ? (
          <FormControl fullWidth size="small">
            <InputLabel id="calc-move-select-label" sx={{ fontWeight: 800, fontSize: '0.75rem' }}>SELECT ATTACK MOVE</InputLabel>
            <Select
              labelId="calc-move-select-label"
              id="calc-move-select"
              value={selectedMove?.name || ''}
              label="SELECT ATTACK MOVE"
              onChange={(e) => {
                const m = currentPoke.moves.find((mv: any) => mv.name === e.target.value);
                if (m) onMoveSelect(m);
              }}
              sx={{ borderRadius: '8px', fontWeight: 800, fontSize: '0.75rem', height: '32px' }}
            >
              {currentPoke.moves.map((m: any) => (
                <MenuItem key={m.name} value={m.name} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: TYPE_COLORS[m.type] || '#ccc' }} />
                      <span style={{ textTransform: 'capitalize' }}>{m.name}</span>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Chip label={m.damageClass} size="small" variant="outlined" sx={{ height: 14, fontSize: '0.5rem', textTransform: 'uppercase', fontWeight: 800 }} />
                      {m.power && <Chip label={`BP: ${m.power}`} size="small" sx={{ height: 14, fontSize: '0.5rem', fontWeight: 800 }} />}
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          /* Spacer for Defender to align with Attacker's Move selection height */
          <Box sx={{ height: '32px' }} />
        )}

        <Divider sx={{ borderStyle: 'dashed', my: 0.25 }} />

        {/* Stats Table / Compact Layout */}
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 0.5, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.7rem' }}>
              📈 STATS EVS
            </Typography>
            <Chip
              label={`EV Left: ${remainingEvs}`}
              size="small"
              sx={{
                fontWeight: 900,
                fontSize: '0.62rem',
                height: 16,
                bgcolor: remainingEvs > 0 ? 'success.main' : 'error.main',
                color: '#fff'
              }}
            />
          </Box>

          {/* Table Header Row */}
          <Box
            sx={{
              display: 'flex',
              pb: 0.25,
              mb: 0.25,
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              gap: 1.5
            }}
          >
            <Typography variant="caption" sx={{ width: 35, fontWeight: 900, color: 'text.secondary', fontSize: '0.62rem' }}>STAT</Typography>
            <Typography variant="caption" sx={{ width: 25, fontWeight: 900, color: 'text.secondary', fontSize: '0.62rem', textAlign: 'center' }}>BASE</Typography>
            <Typography variant="caption" sx={{ width: 55, fontWeight: 900, color: 'text.secondary', fontSize: '0.62rem', textAlign: 'center' }}>EV</Typography>
            <Typography variant="caption" sx={{ width: 100, fontWeight: 900, color: 'text.secondary', fontSize: '0.62rem', pl: 1 }}>SLIDER</Typography>
            <Typography variant="caption" sx={{ width: 45, fontWeight: 900, color: 'text.secondary', fontSize: '0.62rem', textAlign: 'center' }}>IV</Typography>
            <Typography variant="caption" sx={{ flexGrow: 1, fontWeight: 900, color: 'text.secondary', fontSize: '0.62rem', textAlign: 'right' }}>ACTUAL</Typography>
          </Box>

          <Stack spacing={0.25}>
            {Object.keys(STAT_LABELS).map((stat) => {
              const base = currentPoke?.baseStatsMap?.[stat] || 50;
              const iv = ivs[stat];
              const ev = evs[stat];
              const rowColor = stat === 'hp' ? 'error.main' : isAtk ? 'primary.main' : 'secondary.main';

              return (
                <StatRow
                  key={stat}
                  statKey={stat}
                  label={STAT_LABELS[stat]}
                  base={base}
                  ev={ev}
                  iv={iv}
                  level={level}
                  nature={nature}
                  onEvChangeCommitted={onEvChangeCommitted}
                  onIvChange={onIvChange}
                  color={rowColor}
                  remainingEvs={remainingEvs}
                />
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

const PokemonConfigCard = React.memo(PokemonConfigCardComponent);


/* ==========================================
   MAIN COMPONENT: DamageCalculator
   ========================================== */
export default function DamageCalculator() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const apolloClient = useApolloClient();

  // Search input state
  const [atkSearch, setAtkSearch] = useState('');
  const [defSearch, setDefSearch] = useState('');

  // Autocomplete search data
  const { data: atkListData } = useQuery(SEARCH_POKEMON_QUERY, { variables: { search: atkSearch } });
  const { data: defListData } = useQuery(SEARCH_POKEMON_QUERY, { variables: { search: defSearch } });

  const attackerList = atkListData?.pokemonList?.results || [];
  const defenderList = defListData?.pokemonList?.results || [];

  // Attacker Selection Stats
  const [attackerPoke, setAttackerPoke] = useState<any>(null);
  const [attackerLevel, setAttackerLevel] = useState<number>(50);
  const [attackerNature, setAttackerNature] = useState<string>('Adamant');
  const [attackerItem, setAttackerItem] = useState<string>('None');
  const [attackerAbility, setAttackerAbility] = useState<string>('');
  const [attackerStatus, setAttackerStatus] = useState<string>('Healthy');
  const [attackerEvs, setAttackerEvs] = useState<Record<string, number>>({
    hp: 0, attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0
  });
  const [attackerIvs, setAttackerIvs] = useState<Record<string, number>>({
    hp: 31, attack: 31, defense: 31, 'special-attack': 31, 'special-defense': 31, speed: 31
  });
  const [selectedMove, setSelectedMove] = useState<any>(null);

  // Defender Selection Stats
  const [defenderPoke, setDefenderPoke] = useState<any>(null);
  const [defenderLevel, setDefenderLevel] = useState<number>(50);
  const [defenderNature, setDefenderNature] = useState<string>('Adamant');
  const [defenderItem, setDefenderItem] = useState<string>('None');
  const [defenderAbility, setDefenderAbility] = useState<string>('');
  const [defenderStatus, setDefenderStatus] = useState<string>('Healthy');
  const [defenderEvs, setDefenderEvs] = useState<Record<string, number>>({
    hp: 0, attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0
  });
  const [defenderIvs, setDefenderIvs] = useState<Record<string, number>>({
    hp: 31, attack: 31, defense: 31, 'special-attack': 31, 'special-defense': 31, speed: 31
  });

  // Global Field Settings
  const [weather, setWeather] = useState<'None' | 'Rain' | 'Sun' | 'Sandstorm' | 'Hail'>('None');
  const [terrain, setTerrain] = useState<'None' | 'Electric' | 'Grassy' | 'Misty' | 'Psychic'>('None');
  const [reflect, setReflect] = useState<boolean>(false);
  const [lightScreen, setLightScreen] = useState<boolean>(false);
  const [critical, setCritical] = useState<boolean>(false);

  // Showdown output string copy state
  const [copied, setCopied] = useState(false);

  // Auto-fetch Attacker Full Details
  const loadAttackerDetails = useCallback(async (id: number) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_POKEMON_CALC_DETAILS,
        variables: { id }
      });
      const p = data.pokemon;
      
      const statsMap: Record<string, number> = { ...DEFAULT_STATS };
      p.stats.forEach((s: any) => {
        statsMap[s.name] = s.value;
      });

      const pokeCopy = { ...p, baseStatsMap: statsMap };
      setAttackerPoke(pokeCopy);
      
      if (p.abilities && p.abilities.length > 0) {
        setAttackerAbility(p.abilities[0]);
      } else {
        setAttackerAbility('');
      }

      const dmgMoves = p.moves.filter((m: any) => m.damageClass !== 'status' && (m.power || 0) > 0);
      if (dmgMoves.length > 0) {
        setSelectedMove(dmgMoves[0]);
      } else if (p.moves.length > 0) {
        setSelectedMove(p.moves[0]);
      } else {
        setSelectedMove(null);
      }
    } catch (e) {
      console.error(e);
    }
  }, [apolloClient]);

  // Auto-fetch Defender Full Details
  const loadDefenderDetails = useCallback(async (id: number) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_POKEMON_CALC_DETAILS,
        variables: { id }
      });
      const p = data.pokemon;
      
      const statsMap: Record<string, number> = { ...DEFAULT_STATS };
      p.stats.forEach((s: any) => {
        statsMap[s.name] = s.value;
      });

      const pokeCopy = { ...p, baseStatsMap: statsMap };
      setDefenderPoke(pokeCopy);

      if (p.abilities && p.abilities.length > 0) {
        setDefenderAbility(p.abilities[0]);
      } else {
        setDefenderAbility('');
      }
    } catch (e) {
      console.error(e);
    }
  }, [apolloClient]);

  // Trigger loads on select
  useEffect(() => {
    loadAttackerDetails(1); // Default Bulbasaur
    loadDefenderDetails(9); // Default Blastoise
  }, [loadAttackerDetails, loadDefenderDetails]);

  // Highly optimized stable EV change commit callback using functional updater
  const handleAtkEvChangeCommitted = useCallback((stat: string, val: number) => {
    setAttackerEvs(prev => {
      const currentTotal = Object.keys(prev).reduce((sum, key) => sum + (key === stat ? 0 : prev[key]), 0);
      const remaining = 508 - currentTotal;
      const cappedVal = Math.max(0, Math.min(val, Math.min(252, remaining)));
      return { ...prev, [stat]: cappedVal };
    });
  }, []);

  const handleDefEvChangeCommitted = useCallback((stat: string, val: number) => {
    setDefenderEvs(prev => {
      const currentTotal = Object.keys(prev).reduce((sum, key) => sum + (key === stat ? 0 : prev[key]), 0);
      const remaining = 508 - currentTotal;
      const cappedVal = Math.max(0, Math.min(val, Math.min(252, remaining)));
      return { ...prev, [stat]: cappedVal };
    });
  }, []);

  // Highly optimized stable IV change callback
  const handleAtkIvChange = useCallback((stat: string, val: number) => {
    setAttackerIvs(prev => ({ ...prev, [stat]: Math.min(31, Math.max(0, val)) }));
  }, []);

  const handleDefIvChange = useCallback((stat: string, val: number) => {
    setDefenderIvs(prev => ({ ...prev, [stat]: Math.min(31, Math.max(0, val)) }));
  }, []);

  // Attacker model assembler
  const attackerModel = useMemo<CalculatorPokemon | null>(() => {
    if (!attackerPoke) return null;
    return {
      id: attackerPoke.id,
      name: attackerPoke.name,
      types: attackerPoke.types,
      level: attackerLevel,
      nature: attackerNature,
      item: attackerItem,
      ability: attackerAbility,
      status: attackerStatus,
      evs: attackerEvs,
      ivs: attackerIvs,
      baseStats: attackerPoke.baseStatsMap || DEFAULT_STATS
    };
  }, [attackerPoke, attackerLevel, attackerNature, attackerItem, attackerAbility, attackerStatus, attackerEvs, attackerIvs]);

  // Defender model assembler
  const defenderModel = useMemo<CalculatorPokemon | null>(() => {
    if (!defenderPoke) return null;
    return {
      id: defenderPoke.id,
      name: defenderPoke.name,
      types: defenderPoke.types,
      level: defenderLevel,
      nature: defenderNature,
      item: defenderItem,
      ability: defenderAbility,
      status: defenderStatus,
      evs: defenderEvs,
      ivs: defenderIvs,
      baseStats: defenderPoke.baseStatsMap || DEFAULT_STATS
    };
  }, [defenderPoke, defenderLevel, defenderNature, defenderItem, defenderAbility, defenderStatus, defenderEvs, defenderIvs]);

  // Move assembler
  const moveModel = useMemo<CalculatorMove | null>(() => {
    if (!selectedMove) return null;
    return {
      name: selectedMove.name,
      type: selectedMove.type,
      power: selectedMove.power,
      damageClass: selectedMove.damageClass
    };
  }, [selectedMove]);

  // Field assembler
  const fieldModel = useMemo<FieldState>(() => {
    return { weather, terrain, reflect, lightScreen, critical };
  }, [weather, terrain, reflect, lightScreen, critical]);

  // Calculate damage results
  const calcResult = useMemo(() => {
    if (!attackerModel || !defenderModel || !moveModel) return null;
    return calculateDamage(attackerModel, defenderModel, moveModel, fieldModel);
  }, [attackerModel, defenderModel, moveModel, fieldModel]);

  // Showdown result string generator
  const showdownOutput = useMemo(() => {
    if (!attackerModel || !defenderModel || !selectedMove || !calcResult) return '';

    const isPhysical = selectedMove.damageClass === 'physical';
    const activeStatName = isPhysical ? 'attack' : 'special-attack';
    const statLabel = isPhysical ? 'Atk' : 'SpA';
    const evVal = attackerEvs[activeStatName] || 0;
    const natureMod = getNatureModifier(attackerNature, activeStatName);
    const natureSign = natureMod === 1.1 ? '+' : natureMod === 0.9 ? '-' : '';
    const itemString = attackerItem !== 'None' ? `${attackerItem} ` : '';

    const defStatName = isPhysical ? 'defense' : 'special-defense';
    const hpEvs = defenderEvs['hp'] || 0;
    const defEvs = defenderEvs[defStatName] || 0;

    const weatherString = weather !== 'None' ? `under ${weather} ` : '';
    const critString = critical ? ' on critical hit' : '';

    return `${evVal}${natureSign} ${statLabel} ${itemString}${attackerModel.name} ${selectedMove.name} ${weatherString}vs. ${hpEvs} HP / ${defEvs} Def ${defenderModel.name}${critString}: ${calcResult.minDamage}-${calcResult.maxDamage} (${calcResult.minPercent}% - ${calcResult.maxPercent}%) -- ${calcResult.koChanceText}`;
  }, [attackerModel, defenderModel, selectedMove, calcResult, attackerEvs, attackerNature, attackerItem, defenderEvs, weather, critical]);

  // Clipboard copy handle
  const handleCopy = useCallback(() => {
    if (!showdownOutput) return;
    navigator.clipboard.writeText(showdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [showdownOutput]);

  const damageColor = calcResult ? getDamageColor(calcResult.maxPercent) : '#fbbf24';

  return (
    <Container maxWidth="xl" sx={{ pb: 10 }}>
      {/* Page Title */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <SportsKabaddi sx={{ color: 'primary.main', fontSize: 32 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 950, letterSpacing: -0.5, lineHeight: 1.1 }}>
            BATTLE DAMAGE CALCULATOR
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
            Simulate competitive damage rolls, stats distributions, items, screens, and weather multipliers!
          </Typography>
        </Box>
      </Box>

      {/* ── Global Field Effects Card (Top Center) ── */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          p: 2,
          borderRadius: '16px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          bgcolor: isDark ? 'rgba(30, 27, 75, 0.2)' : 'rgba(240, 253, 250, 0.35)',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5, letterSpacing: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}>
          <Bolt sx={{ color: 'warning.main', fontSize: 16 }} /> FIELD WEATHER & TERRAINS
        </Typography>

        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          {/* Weather Option */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="calc-weather-label" sx={{ fontWeight: 800, fontSize: '0.75rem' }}>WEATHER</InputLabel>
              <Select
                labelId="calc-weather-label"
                id="calc-weather"
                value={weather}
                label="WEATHER"
                onChange={(e: any) => setWeather(e.target.value)}
                sx={{ borderRadius: '8px', fontWeight: 700, fontSize: '0.75rem', height: '32px' }}
              >
                <MenuItem value="None" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>None (Clear)</MenuItem>
                <MenuItem value="Rain" sx={{ fontWeight: 700, fontSize: '0.75rem' }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pointerEvents: 'none' }}><Thunderstorm fontSize="small" color="primary" /> Rain</Box></MenuItem>
                <MenuItem value="Sun" sx={{ fontWeight: 700, fontSize: '0.75rem' }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pointerEvents: 'none' }}><LightMode fontSize="small" sx={{ color: '#eab308' }} /> Sun</Box></MenuItem>
                <MenuItem value="Sandstorm" sx={{ fontWeight: 700, fontSize: '0.75rem' }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pointerEvents: 'none' }}><BlurOn fontSize="small" sx={{ color: '#d97706' }} /> Sandstorm</Box></MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Terrain Option */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="calc-terrain-label" sx={{ fontWeight: 800, fontSize: '0.75rem' }}>TERRAIN</InputLabel>
              <Select
                labelId="calc-terrain-label"
                id="calc-terrain"
                value={terrain}
                label="TERRAIN"
                onChange={(e: any) => setTerrain(e.target.value)}
                sx={{ borderRadius: '8px', fontWeight: 700, fontSize: '0.75rem', height: '32px' }}
              >
                <MenuItem value="None" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>None</MenuItem>
                <MenuItem value="Electric" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Electric</MenuItem>
                <MenuItem value="Grassy" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Grassy</MenuItem>
                <MenuItem value="Misty" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Misty</MenuItem>
                <MenuItem value="Psychic" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Psychic</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Reflect Screen Toggle */}
          <Grid size={{ xs: 6, md: 2 }}>
            <FormControlLabel
              control={<Switch size="small" checked={reflect} onChange={(e) => setReflect(e.target.checked)} color="info" />}
              label={<Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.7rem' }}>REFLECT (DEF)</Typography>}
            />
          </Grid>

          {/* Light Screen Toggle */}
          <Grid size={{ xs: 6, md: 2 }}>
            <FormControlLabel
              control={<Switch size="small" checked={lightScreen} onChange={(e) => setLightScreen(e.target.checked)} color="info" />}
              label={<Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.7rem' }}>LIGHT SCREEN</Typography>}
            />
          </Grid>

          {/* Critical hit toggle */}
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControlLabel
              control={<Switch size="small" checked={critical} onChange={(e) => setCritical(e.target.checked)} color="warning" />}
              label={
                <Typography variant="caption" sx={{ fontWeight: 800, color: critical ? 'warning.main' : 'text.primary', fontSize: '0.7rem' }}>
                  FORCE CRIT ✨
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Card>

      {/* ── Main Two-Column Panel ── */}
      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {/* LEFT COLUMN: Attacker panel */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PokemonConfigCard
            side="atk"
            isDark={isDark}
            theme={theme}
            searchQuery={atkSearch}
            onSearchChange={setAtkSearch}
            pokemonList={attackerList}
            currentPoke={attackerPoke}
            onPokemonSelect={loadAttackerDetails}
            level={attackerLevel}
            onLevelChange={setAttackerLevel}
            nature={attackerNature}
            onNatureChange={setAttackerNature}
            item={attackerItem}
            onItemChange={setAttackerItem}
            ability={attackerAbility}
            onAbilityChange={setAttackerAbility}
            status={attackerStatus}
            onStatusChange={setAttackerStatus}
            evs={attackerEvs}
            onEvChangeCommitted={handleAtkEvChangeCommitted}
            ivs={attackerIvs}
            onIvChange={handleAtkIvChange}
            selectedMove={selectedMove}
            onMoveSelect={setSelectedMove}
          />
        </Grid>

        {/* RIGHT COLUMN: Defender panel */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PokemonConfigCard
            side="def"
            isDark={isDark}
            theme={theme}
            searchQuery={defSearch}
            onSearchChange={setDefSearch}
            pokemonList={defenderList}
            currentPoke={defenderPoke}
            onPokemonSelect={loadDefenderDetails}
            level={defenderLevel}
            onLevelChange={setDefenderLevel}
            nature={defenderNature}
            onNatureChange={setDefenderNature}
            item={defenderItem}
            onItemChange={setDefenderItem}
            ability={defenderAbility}
            onAbilityChange={setDefenderAbility}
            status={defenderStatus}
            onStatusChange={setDefenderStatus}
            evs={defenderEvs}
            onEvChangeCommitted={handleDefEvChangeCommitted}
            ivs={defenderIvs}
            onIvChange={handleDefIvChange}
          />
        </Grid>
      </Grid>

      {/* ── CENTRAL OUTPUT SECTION (PROMINENT RESULT CARD) ── */}
      {calcResult && attackerPoke && defenderPoke && selectedMove && (
        <Card
          elevation={3}
          sx={{
            mt: 3,
            borderRadius: '20px',
            border: `2px solid ${alpha(damageColor, isDark ? 0.35 : 0.18)}`,
            overflow: 'hidden',
            background: isDark
              ? `linear-gradient(135deg, ${alpha(damageColor, 0.04)} 0%, rgba(3, 7, 18, 0.92) 100%)`
              : `linear-gradient(135deg, ${alpha(damageColor, 0.04)} 0%, #fff 100%)`,
            boxShadow: `0 8px 32px ${alpha(damageColor, isDark ? 0.12 : 0.06)}`,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {/* Header Bar */}
          <Box
            sx={{
              p: 1.8,
              bgcolor: alpha(damageColor, isDark ? 0.12 : 0.05),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${alpha(damageColor, 0.15)}`
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 950,
                letterSpacing: 1.2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: damageColor,
                textTransform: 'uppercase',
                fontSize: '0.8rem'
              }}
            >
              <Gavel /> BATTLE CALCULATION OUTCOME (SHOWDOWN FORMAT)
            </Typography>
            <Chip
              label={calcResult.koChanceText}
              sx={{
                fontWeight: 900,
                fontSize: '0.75rem',
                bgcolor: damageColor,
                color: '#fff',
                px: 1,
                boxShadow: `0 2px 8px ${alpha(damageColor, 0.35)}`
              }}
            />
          </Box>

          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: '100%' }}>
              
              {/* Giant Percentage Result */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 950,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    color: damageColor,
                    letterSpacing: -1.5,
                    lineHeight: 1,
                    mb: 0.5,
                    textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.08)'
                  }}
                >
                  {calcResult.minPercent}% - {calcResult.maxPercent}%
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: 'text.secondary',
                    fontSize: '0.88rem',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase'
                  }}
                >
                  Damage Roll: {calcResult.minDamage} - {calcResult.maxDamage} HP
                </Typography>
              </Box>

              {/* Defender Simulated HP Bar (Loss Visualizer) */}
              <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem' }}>
                    <Favorite sx={{ color: 'error.main', fontSize: 16 }} /> Defender Remaining HP
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: 'text.secondary', fontSize: '0.8rem' }}>
                    Max HP: {calcResult.defHP}
                  </Typography>
                </Box>

                {/* Simulated Grid HP Bar */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 28,
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                  }}
                >
                  {/* Leftovers health overlay */}
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${Math.max(0, 100 - calcResult.maxPercent)}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    style={{
                      height: '100%',
                      borderRadius: '14px',
                      background: calcTypeColor(100 - calcResult.maxPercent)
                    }}
                  />
                  {/* Text Overlay */}
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontWeight: 900,
                      color: '#fff',
                      fontSize: '0.8rem',
                      textShadow: '0 2px 4px rgba(0,0,0,0.85)'
                    }}
                  >
                    Remaining: {Math.max(0, 100 - calcResult.maxPercent).toFixed(1)}% - {Math.max(0, 100 - calcResult.minPercent).toFixed(1)}%
                  </Typography>
                </Box>

                {calcResult.maxPercent >= 100 && (
                  <Alert
                    severity="error"
                    icon={<Warning />}
                    sx={{
                      mt: 2,
                      borderRadius: '10px',
                      '& .MuiAlert-message': { fontWeight: 700, fontSize: '0.8rem' },
                      border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    Danger! This attack has a high probability to trigger a <strong>One-Hit Knockout (OHKO)</strong> on the defender under standard conditions.
                  </Alert>
                )}
              </Box>

              {/* Massive Showdown Copyable Box */}
              <Box
                sx={{
                  p: 1.8,
                  borderRadius: '10px',
                  bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                  width: '100%',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'}`,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  gap: 1.8,
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.5,
                    letterSpacing: -0.1,
                    textTransform: 'capitalize',
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    flex: 1,
                    color: isDark ? '#d1d5db' : '#4b5563'
                  }}
                >
                  {showdownOutput}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCopy}
                  startIcon={copied ? <Check /> : <ContentCopy />}
                  sx={{
                    bgcolor: copied ? 'success.main' : 'primary.main',
                    fontWeight: 900,
                    fontSize: '0.72rem',
                    borderRadius: '8px',
                    px: 2,
                    py: 0.6,
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: copied ? 'success.dark' : 'primary.dark',
                      boxShadow: 'none'
                    }
                  }}
                >
                  {copied ? 'Copied!' : 'Copy Showdown'}
                </Button>
              </Box>

            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
