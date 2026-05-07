import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  Chip,
  Tooltip,
  Paper,
  alpha,
  useTheme,
  Alert,
  Autocomplete
} from '@mui/material';
import {
  Add,
  Close,
  AutoAwesome,
  Shield,
  Psychology,
  HelpOutlined,
  Warning,
  KeyboardDoubleArrowUp,
  KeyboardDoubleArrowDown,
  InfoOutlined,
  CheckCircle,
  Construction
} from '@mui/icons-material';
import { gql, useQuery } from '@apollo/client';
import { motion, AnimatePresence } from 'motion/react';
import { useTeamStore, TeamMember } from '../lib/teamStore';
import { TYPE_LIST, calculateDamageTaken } from '../utils/typeMatchups';

// Queries
const GET_POKEMON_FOR_TEAM = gql`
  query GetPokemonForTeam($search: String) {
    pokemonList(limit: 50, search: $search) {
      results {
        id
        name
        types
        image
        shinyImage
      }
    }
  }
`;

const GET_POKEMON_BUILDER_DETAILS = gql`
  query GetPokemonBuilderDetails($id: Int!) {
    pokemon(id: $id) {
      id
      name
      types
      image
      abilities
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

// Constants
const TYPE_COLORS: Record<string, string> = {
  normal: '#9ca3af', fire: '#f97316', water: '#3b82f6', electric: '#eab308',
  grass: '#22c55e', ice: '#06b6d4', fighting: '#ef4444', poison: '#a855f7',
  ground: '#d97706', flying: '#818cf8', psychic: '#ec4899', bug: '#84cc16',
  rock: '#78716c', ghost: '#7c3aed', dragon: '#1d4ed8', dark: '#374151',
  steel: '#6b7280', fairy: '#f472b6',
};

const COMPETITIVE_ITEMS = [
  'Leftovers', 'Life Orb', 'Choice Band', 'Choice Specs', 'Choice Scarf',
  'Focus Sash', 'Assault Vest', 'Heavy-Duty Boots', 'Rocky Helmet', 'Eviolite',
  'Black Sludge', 'Air Balloon', 'Weakness Policy', 'Expert Belt', 'Lum Berry',
  'Sitrus Berry', 'Damp Rock', 'Heat Rock', 'Smooth Rock', 'Icy Rock'
];

const NATURE_NAMES = [
  'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
  'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
  'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
  'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
  'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
];

// Optimal moves recommendation engine
function getOptimalMoves(allMoves: any[], types: string[]): any[] {
  if (!allMoves || allMoves.length === 0) return [];

  // Filter damage dealing moves
  const damageMoves = allMoves.filter(
    (m) => m.damageClass === 'physical' || m.damageClass === 'special'
  );

  // Find STAB moves
  const stabMoves = damageMoves.filter((m) =>
    types.map((t) => t.toLowerCase()).includes(m.type.toLowerCase())
  );

  // Sort STAB moves by power, accuracy filter >= 90
  const sortedStab = [...stabMoves]
    .filter((m) => m.power !== null && (m.accuracy === null || m.accuracy >= 90))
    .sort((a, b) => (b.power || 0) - (a.power || 0));

  const selectedMoves: any[] = [];

  // Take top 2 STAB moves
  if (sortedStab.length > 0) selectedMoves.push(sortedStab[0]);
  if (sortedStab.length > 1) selectedMoves.push(sortedStab[1]);

  // Find Coverage moves (damage-dealing, non-STAB)
  const coverageMoves = damageMoves.filter(
    (m) => !types.map((t) => t.toLowerCase()).includes(m.type.toLowerCase())
  );
  const sortedCoverage = [...coverageMoves]
    .filter((m) => m.power !== null && (m.accuracy === null || m.accuracy >= 90))
    .sort((a, b) => (b.power || 0) - (a.power || 0));

  // Take top 1 or 2 coverage moves
  for (const m of sortedCoverage) {
    if (selectedMoves.length >= 3) break;
    if (!selectedMoves.some((sm) => sm.name === m.name)) {
      selectedMoves.push(m);
    }
  }

  // Find Support/Status moves
  const statusMoves = allMoves.filter((m) => m.damageClass === 'status');
  const popularStatus = [
    'protect', 'swords-dance', 'will-o-wisp', 'toxic', 'thunder-wave',
    'substitute', 'nasty-plot', 'calm-mind', 'roost', 'recover', 'dragon-dance', 'trick-room'
  ];
  const sortedStatus = [...statusMoves].sort((a, b) => {
    const aPop = popularStatus.includes(a.name.toLowerCase()) ? 1 : 0;
    const bPop = popularStatus.includes(b.name.toLowerCase()) ? 1 : 0;
    return bPop - aPop;
  });

  // Take top 1 status move
  if (sortedStatus.length > 0 && selectedMoves.length < 4) {
    selectedMoves.push(sortedStatus[0]);
  }

  // Fallback if needed
  if (selectedMoves.length < 4) {
    const remaining = [...allMoves].sort((a, b) => (b.power || 0) - (a.power || 0));
    for (const m of remaining) {
      if (selectedMoves.length >= 4) break;
      if (!selectedMoves.some((sm) => sm.name === m.name)) {
        selectedMoves.push(m);
      }
    }
  }

  return selectedMoves;
}

// Slot Component - handles background loading of moves & abilities
function TeamMemberSlot({ member, index }: { member: TeamMember; index: number }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { removeMember, setMoves, setAbility, setItem, setNature, updateMemberDetails } = useTeamStore();

  const { data } = useQuery(GET_POKEMON_BUILDER_DETAILS, {
    variables: { id: member.id },
    skip: !!member.allMoves,
    onCompleted: (res) => {
      if (res?.pokemon) {
        updateMemberDetails(member.id, {
          allAbilities: res.pokemon.abilities,
          allMoves: res.pokemon.moves
        });
      }
    }
  });

  const allAbilities = member.allAbilities || data?.pokemon?.abilities || [];
  const allMoves = member.allMoves || data?.pokemon?.moves || [];

  const handleAutoFill = () => {
    const recommended = getOptimalMoves(allMoves, member.types);
    setMoves(member.id, recommended);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '20px',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        background: isDark
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.65) 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        height: '100%'
      }}
    >
      {/* Remove Button */}
      <Tooltip title="Remove Pokémon">
        <IconButton
          size="small"
          onClick={() => removeMember(member.id)}
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            bgcolor: 'error.main',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            zIndex: 10,
            '&:hover': { bgcolor: 'error.dark', transform: 'scale(1.1)' }
          }}
        >
          <Close sx={{ fontSize: 14 }} />
        </IconButton>
      </Tooltip>

      {/* Main Stats Summary Block */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: alpha(TYPE_COLORS[member.types[0]] || '#6366f1', 0.12),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Box
            component="img"
            src={member.image}
            alt={member.name}
            sx={{ width: '85%', height: '85%', objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 800, fontSize: '9px', letterSpacing: '0.5px' }}>
            SLOT #{index + 1}
          </Typography>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 900, textTransform: 'capitalize', color: 'text.primary', lineHeight: 1.2 }}>
            {member.name}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
            {member.types.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  height: 16,
                  fontSize: '8px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  bgcolor: alpha(TYPE_COLORS[t] || '#6b7280', 0.85),
                  color: '#fff'
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Build Slots Form */}
      <Stack spacing={1.5} sx={{ flex: 1 }}>
        {/* Ability Selection */}
        <FormControl fullWidth size="small">
          <InputLabel id={`ability-label-${member.id}`} sx={{ fontSize: '12px', fontWeight: 600 }}>Ability</InputLabel>
          <Select
            labelId={`ability-label-${member.id}`}
            label="Ability"
            value={member.selectedAbility || ''}
            onChange={(e) => setAbility(member.id, e.target.value)}
            sx={{ borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}
          >
            {allAbilities.map((ab: string) => (
              <MenuItem key={ab} value={ab} sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                {ab.replace('-', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Item Selection */}
        <FormControl fullWidth size="small">
          <InputLabel id={`item-label-${member.id}`} sx={{ fontSize: '12px', fontWeight: 600 }}>Held Item</InputLabel>
          <Select
            labelId={`item-label-${member.id}`}
            label="Held Item"
            value={member.selectedItem || ''}
            onChange={(e) => setItem(member.id, e.target.value)}
            sx={{ borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}
          >
            {COMPETITIVE_ITEMS.map((it) => (
              <MenuItem key={it} value={it} sx={{ fontWeight: 600 }}>
                {it}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Nature Selection */}
        <FormControl fullWidth size="small">
          <InputLabel id={`nature-label-${member.id}`} sx={{ fontSize: '12px', fontWeight: 600 }}>Nature</InputLabel>
          <Select
            labelId={`nature-label-${member.id}`}
            label="Nature"
            value={member.selectedNature || ''}
            onChange={(e) => setNature(member.id, e.target.value)}
            sx={{ borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}
          >
            {NATURE_NAMES.map((nat) => (
              <MenuItem key={nat} value={nat} sx={{ fontWeight: 600 }}>
                {nat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selected Moves */}
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, display: 'block', mb: 0.5, letterSpacing: '0.5px' }}>
            SELECTED MOVES ({member.moves.length}/4)
          </Typography>
          <Grid container spacing={1}>
            {Array.from({ length: 4 }).map((_, moveIdx) => {
              const selectedMove = member.moves[moveIdx];
              return (
                <Grid size={{ xs: 6 }} key={moveIdx}>
                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedMove ? selectedMove.name : ''}
                      onChange={(e) => {
                        const moveObj = allMoves.find((m: any) => m.name === e.target.value);
                        if (moveObj) {
                          const currentMoves = [...member.moves];
                          currentMoves[moveIdx] = moveObj;
                          setMoves(member.id, currentMoves.filter(Boolean));
                        }
                      }}
                      displayEmpty
                      sx={{
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        '& .MuiSelect-select': { py: 1 }
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ color: theme.palette.text.disabled }}>None</em>
                      </MenuItem>
                      {allMoves.map((m: any) => (
                        <MenuItem key={m.name} value={m.name} sx={{ fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                          {m.name.replace('-', ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Auto Fill Recommendation */}
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<AutoAwesome />}
          onClick={handleAutoFill}
          disabled={allMoves.length === 0}
          sx={{
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '11px',
            textTransform: 'uppercase',
            borderColor: alpha('#ec4899', 0.4),
            color: '#ec4899',
            '&:hover': {
              borderColor: '#ec4899',
              bgcolor: alpha('#ec4899', 0.05)
            }
          }}
        >
          Auto-Recommend Moves
        </Button>
      </Stack>
    </Card>
  );
}

export default function TeamBuilder() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { team, addMember } = useTeamStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);

  // Fetch selection list
  const { data: listData } = useQuery(GET_POKEMON_FOR_TEAM, {
    variables: { search: searchQuery }
  });

  const availablePokemon = listData?.pokemonList?.results || [];

  const handleOpenAdd = (idx: number) => {
    setActiveSlotIndex(idx);
    setSearchQuery('');
    setSelectOpen(true);
  };

  const handleSelectPokemon = (p: any) => {
    addMember({
      id: p.id,
      name: p.name,
      types: p.types,
      image: p.image
    });
    setSelectOpen(false);
  };

  // Real-Time synergy analysis calculation
  const getSynergy = () => {
    const coverage: Record<string, { weak: number; resist: number }> = {};
    for (const t of TYPE_LIST) {
      coverage[t] = { weak: 0, resist: 0 };
    }

    for (const p of team) {
      const primary = p.types[0];
      const secondary = p.types[1] || null;
      const matchups = calculateDamageTaken(primary, secondary);

      for (const t of [...matchups.x4, ...matchups.x2]) {
        if (coverage[t]) coverage[t].weak += 1;
      }
      for (const t of [...matchups.x05, ...matchups.x025, ...matchups.x0]) {
        if (coverage[t]) coverage[t].resist += 1;
      }
    }

    const warnings: string[] = [];
    for (const t of TYPE_LIST) {
      if (coverage[t].weak >= 3) {
        warnings.push(`Team is highly vulnerable to ${t.toUpperCase()}-type attacks! (${coverage[t].weak} Pokémon vulnerable)`);
      }
    }

    return { coverage, warnings };
  };

  const { coverage, warnings } = getSynergy();

  // Rules Engine for AI Combo Recommendations
  const getAIRecommendations = () => {
    const recs: Array<{ title: string; desc: string; icon: string }> = [];

    const hasAbility = (abilityName: string) =>
      team.some((p) => p.selectedAbility?.toLowerCase() === abilityName.toLowerCase());
    
    const hasName = (pName: string) =>
      team.some((p) => p.name.toLowerCase() === pName.toLowerCase());

    const hasMove = (moveName: string) =>
      team.some((p) => p.moves?.some((m) => m.name.toLowerCase() === moveName.toLowerCase()));

    // Rain Team Rule
    if (hasAbility('drizzle') || hasName('kyogre') || hasName('pelipper')) {
      recs.push({
        title: '🌧️ Rain Core Archetype',
        desc: 'Rain Core detected! Consider adding Water-type Pokémon with the Swift Swim ability (e.g., Kingdra, Ludicolo) or Hurricane / Thunder users which bypass accuracy checks under rain.',
        icon: 'rain'
      });
    }

    // Sun Team Rule
    if (hasAbility('drought') || hasName('groudon') || hasName('torkoal')) {
      recs.push({
        title: '☀️ Sun Core Archetype',
        desc: 'Sun Core detected! Consider adding Grass-type Pokémon with the Chlorophyll ability (e.g., Venusaur) to double their speed, or Fire-types carrying solar beam.',
        icon: 'sun'
      });
    }

    // Sandstorm Rule
    if (hasAbility('sand-stream') || hasName('tyranitar') || hasName('hippowdon')) {
      recs.push({
        title: '⏳ Sandstorm Core Archetype',
        desc: 'Sandstorm Core detected! Ground, Rock, and Steel Pokémon are immune to Sandstorm damage. Rock-type Pokémon also get a massive 1.5x Sp. Defense boost. Consider adding Excadrill with Sand Rush.',
        icon: 'sand'
      });
    }

    // Trick Room Rule
    const psychicOrGhostCount = team.filter((p) =>
      p.types.some((t) => t === 'psychic' || t === 'ghost')
    ).length;
    if (hasMove('trick-room') || psychicOrGhostCount >= 2) {
      recs.push({
        title: '🔮 Trick Room Strategy',
        desc: 'Trick Room synergy detected! Slow, bulky sweepers can completely dominate when the Speed dimensions are inverted. Consider adding slow giants like Melmetal or Hatterene.',
        icon: 'trickroom'
      });
    }

    // Default suggestions
    if (recs.length === 0) {
      if (team.length > 0) {
        recs.push({
          title: '⚔️ Balanced Offensive suggestions',
          desc: 'Your team currently doesn\'t lean into weather or speed control cores. Focus on creating a solid Fire-Water-Grass cores or physical/special attacker balance with Leftovers held items.',
          icon: 'balance'
        });
      } else {
        recs.push({
          title: '🎮 Build Your Squad!',
          desc: 'Add Pokémon to your empty slots above. Our AI Coach will automatically run simulations to analyze type coverage, recommend ideal movesets, and suggest synergy archetypes.',
          icon: 'empty'
        });
      }
    }

    return recs;
  };

  const recommendations = getAIRecommendations();

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 8, px: { xs: 2, sm: 3 } }}>
      
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 950,
            letterSpacing: '-1.5px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            mb: 1
          }}
        >
          <Psychology sx={{ color: '#ec4899', fontSize: 38 }} />
          Smart Team Builder
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, maxW: 600, mx: 'auto' }}>
          Assemble your dream competitive squad of 6. Auto-recommend optimal competitive movesets, perform real-time math analyses on weaknesses, and receive advice from our AI Coach.
        </Typography>
      </Box>

      {/* 6-Slot Grid */}
      <Grid container spacing={2.5} sx={{ mb: 5 }}>
        {Array.from({ length: 6 }).map((_, idx) => {
          const member = team[idx];

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={idx}>
              <AnimatePresence mode="wait">
                {member ? (
                  <motion.div
                    key="filled"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{ height: '100%' }}
                  >
                    <TeamMemberSlot member={member} index={idx} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ height: '100%' }}
                  >
                    <Card
                      onClick={() => handleOpenAdd(idx)}
                      elevation={0}
                      sx={{
                        borderRadius: '20px',
                        border: `2px dashed ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        '&:hover': {
                          borderColor: '#ec4899',
                          bgcolor: isDark ? 'rgba(236, 72, 153, 0.04)' : 'rgba(236, 72, 153, 0.02)',
                          transform: 'scale(1.01)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Add sx={{ fontSize: 24, color: 'text.secondary' }} />
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Add Pokémon #{idx + 1}
                      </Typography>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </Grid>
          );
        })}
      </Grid>

      {/* Analytics Dividers */}
      <Grid container spacing={4}>
        {/* Left Column: Synergy Analyzer */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '24px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              bgcolor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Shield sx={{ color: '#10b981' }} />
              Team Synergy (Defensive Coverage)
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 3, display: 'block' }}>
              Summary of defensive counters. Try to avoid having too many Pokémon weak to the same type to maintain balanced coverage.
            </Typography>

            {/* Warning Boxes */}
            {team.length > 0 && warnings.length > 0 && (
              <Stack spacing={1} sx={{ mb: 3 }}>
                {warnings.map((warn, i) => (
                  <Alert
                    key={i}
                    severity="error"
                    icon={<Warning fontSize="small" />}
                    sx={{
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '12px',
                      bgcolor: isDark ? 'rgba(239, 68, 68, 0.1)' : undefined,
                      border: `1px solid ${alpha('#ef4444', 0.25)}`
                    }}
                  >
                    {warn}
                  </Alert>
                ))}
              </Stack>
            )}

            {team.length > 0 && warnings.length === 0 && (
              <Alert
                severity="success"
                icon={<CheckCircle fontSize="small" />}
                sx={{
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '12px',
                  mb: 3,
                  bgcolor: isDark ? 'rgba(34, 197, 94, 0.1)' : undefined,
                  border: `1px solid ${alpha('#22c55e', 0.25)}`
                }}
              >
                Excellent Defensive Balance! Your team has no major type weaknesses (no systems vulnerable to the same type ×3 or more).
              </Alert>
            )}

            {/* 18-Type Grid Counters */}
            <Grid container spacing={1.5}>
              {TYPE_LIST.map((type) => {
                const count = coverage[type] || { weak: 0, resist: 0 };
                return (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={type}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: '12px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      {/* Type Badge */}
                      <Chip
                        label={type}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '8px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          bgcolor: alpha(TYPE_COLORS[type] || '#6b7280', 0.85),
                          color: '#fff',
                          width: '100%',
                          textAlign: 'center'
                        }}
                      />

                      {/* Weaks/Resists tags */}
                      <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'space-around' }}>
                        <Tooltip title="Pokémon weak to this type">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                            <KeyboardDoubleArrowDown sx={{ fontSize: 12, color: count.weak > 0 ? '#ef4444' : 'text.disabled' }} />
                            <Typography variant="caption" sx={{ fontWeight: 800, color: count.weak > 0 ? '#ef4444' : 'text.disabled' }}>
                              {count.weak}
                            </Typography>
                          </Box>
                        </Tooltip>

                        <Tooltip title="Pokémon resistant or immune to this type">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                            <KeyboardDoubleArrowUp sx={{ fontSize: 12, color: count.resist > 0 ? '#22c55e' : 'text.disabled' }} />
                            <Typography variant="caption" sx={{ fontWeight: 800, color: count.resist > 0 ? '#22c55e' : 'text.disabled' }}>
                              {count.resist}
                            </Typography>
                          </Box>
                        </Tooltip>
                      </Stack>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column: AI Coach Recommendations */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '24px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              bgcolor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              height: '100%'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Psychology sx={{ color: '#ec4899' }} />
              AI Coach Recommendations
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 3, display: 'block' }}>
              Strategic insights, weather synergetic recommendations, speed-tiers guidelines, and team combos advised by our simulated coach.
            </Typography>

            <Stack spacing={2}>
              {recommendations.map((rec, i) => (
                <Card
                  key={i}
                  elevation={0}
                  sx={{
                    borderRadius: '16px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                    p: 2
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: 'primary.main', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    {rec.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '12.5px', lineHeight: 1.5 }}>
                    {rec.desc}
                  </Typography>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Pokemon Dialog selection */}
      <Dialog
        open={selectOpen}
        onClose={() => setSelectOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '20px',
              bgcolor: isDark ? '#1e293b' : '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
          Select Pokémon for Slot #{activeSlotIndex !== null ? activeSlotIndex + 1 : ''}
        </DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search Pokémon name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px'
              }
            }}
          />
          <Stack spacing={1} sx={{ maxHeight: '350px', overflowY: 'auto' }}>
            {availablePokemon.map((p: any) => (
              <Box
                key={p.id}
                onClick={() => handleSelectPokemon(p)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Box
                  component="img"
                  src={p.image}
                  alt={p.name}
                  sx={{ width: 42, height: 42, objectFit: 'contain' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, textTransform: 'capitalize' }}>
                    {p.name}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.25 }}>
                    {p.types.map((t: string) => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        sx={{
                          height: 14,
                          fontSize: '7px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          bgcolor: alpha(TYPE_COLORS[t] || '#6b7280', 0.8),
                          color: '#fff'
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            ))}
            {availablePokemon.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.disabled' }}>
                <HelpOutlined sx={{ fontSize: 32, opacity: 0.5, mb: 1 }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>No Pokémon found matching query.</Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button onClick={() => setSelectOpen(false)} color="inherit" sx={{ fontWeight: 700, fontSize: '13px' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
