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
  Autocomplete,
  Menu,
  Snackbar
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
  Construction,
  ContentCopy,
  Image as ImageIcon,
  Download,
  CloudUpload,
  Lightbulb
} from '@mui/icons-material';
import { gql, useQuery } from '@apollo/client';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
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
  'Sitrus Berry', 'Damp Rock', 'Heat Rock', 'Smooth Rock', 'Icy Rock', 'Light Ball', 'Thick Club'
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

// Helper function to get 3-5 recommended items based on rules & base stats
export function getRecommendedItems(member: TeamMember): string[] {
  const name = member.name.toLowerCase();

  // Rule 1: Signature Items
  if (name === 'pikachu') {
    return ['Light Ball', 'Life Orb', 'Focus Sash', 'Leftovers'];
  }
  if (name === 'cubone' || name === 'marowak') {
    return ['Thick Club', 'Leftovers', 'Assault Vest', 'Life Orb'];
  }
  if (name === 'ditto') {
    return ['Choice Scarf', 'Focus Sash', 'Leftovers'];
  }
  if (name === 'chansey' || name === 'porygon2' || name === 'scyther' || name === 'sneasel') {
    return ['Eviolite', 'Leftovers', 'Rocky Helmet', 'Sitrus Berry'];
  }

  // Parse stats
  const statsMap: Record<string, number> = {};
  if (member.stats) {
    member.stats.forEach((s: any) => {
      statsMap[s.name.toLowerCase()] = s.value;
    });
  }

  const hp = statsMap['hp'] || 70;
  const attack = statsMap['attack'] || 70;
  const defense = statsMap['defense'] || 70;
  const spAtk = statsMap['special-attack'] || 70;
  const spDef = statsMap['special-defense'] || 70;
  const speed = statsMap['speed'] || 70;

  // Rule 2: Base Stats Rules
  // Rule 2.1: Tank / Wall
  if (hp + defense + spDef > 250) {
    return ['Leftovers', 'Rocky Helmet', 'Sitrus Berry', 'Assault Vest', 'Heavy-Duty Boots'];
  }

  // Rule 2.2: Physical Sweeper
  if (speed > 100 && attack > 100) {
    return ['Choice Band', 'Life Orb', 'Choice Scarf', 'Expert Belt', 'Focus Sash'];
  }

  // Rule 2.3: Special Sweeper
  if (speed > 100 && spAtk > 100) {
    return ['Choice Specs', 'Life Orb', 'Focus Sash', 'Expert Belt', 'Choice Scarf'];
  }

  // Rule 2.4: Slow & Bulky Offense
  if (speed < 50 && (attack > 90 || spAtk > 90)) {
    return ['Assault Vest', 'Weakness Policy', 'Leftovers', 'Life Orb', 'Sitrus Berry'];
  }

  // Default Competitives
  return ['Leftovers', 'Life Orb', 'Focus Sash', 'Heavy-Duty Boots', 'Expert Belt'];
}

// Helper function to get recommended abilities based on competitive tier
export function getRecommendedAbilities(member: TeamMember): string[] {
  const abilities = member.allAbilities || [];
  if (abilities.length === 0) return [];

  const topTierAbilities = [
    // Offensive & Speed-boosting
    'swift-swim', 'chlorophyll', 'sand-rush', 'slush-rush', 'speed-boost', 'unburden',
    'huge-power', 'pure-power', 'guts', 'sheer-force', 'adaptability', 'sharpness',
    'tough-claws', 'moxie', 'beast-boost', 'libero', 'protean', 'no-guard', 'solar-power',
    'technician', 'tinted-lens', 'strong-jaw', 'iron-fist', 'reckless', 'hustle',
    'competitive', 'defiant', 'contrary', 'gale-wings', 'serene-grace', 'magic-guard',
    // Strong Utility / Defensive
    'intimidate', 'regenerator', 'magic-bounce', 'prankster', 'multiscale',
    'shadow-shield', 'fluffy', 'fur-coat', 'levitate', 'poison-heal', 'solid-rock',
    'filter', 'thick-fat', 'water-absorb', 'volt-absorb', 'flash-fire', 'sap-sipper',
    'unaware', 'sturdy', 'natural-cure', 'disguise', 'inner-focus', 'scrappy', 'mold-breaker'
  ];

  if (abilities.length === 1) {
    return [abilities[0]];
  }

  const recommended = abilities.filter(ab => topTierAbilities.includes(ab.toLowerCase()));

  if (recommended.length === 0 && abilities.length > 0) {
    return [abilities[0]];
  }

  return recommended;
}

// Helper function to get recommended natures based on stat distribution
export function getRecommendedNatures(member: TeamMember): string[] {
  const statsMap: Record<string, number> = {};
  if (member.stats) {
    member.stats.forEach((s: any) => {
      statsMap[s.name.toLowerCase()] = s.value;
    });
  }

  const hp = statsMap['hp'] || 70;
  const attack = statsMap['attack'] || 70;
  const defense = statsMap['defense'] || 70;
  const spAtk = statsMap['special-attack'] || 70;
  const spDef = statsMap['special-defense'] || 70;
  const speed = statsMap['speed'] || 70;

  const isTanker = (hp + defense + spDef > 220) || (defense > 80 && spDef > 80);
  const isPhysical = attack > spAtk;
  const isSpecial = spAtk > attack;
  const isFast = speed >= 75;

  if (isTanker && !isFast) {
    return ['Bold', 'Impish', 'Calm', 'Careful'];
  }

  if (isPhysical && isFast) {
    return ['Jolly', 'Adamant'];
  }

  if (isSpecial && isFast) {
    return ['Timid', 'Modest'];
  }

  if (attack > spAtk) {
    return ['Adamant', 'Jolly', 'Impish', 'Careful'];
  } else if (spAtk > attack) {
    return ['Modest', 'Timid', 'Bold', 'Calm'];
  }

  return ['Jolly', 'Timid', 'Adamant', 'Modest'];
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
          allMoves: res.pokemon.moves,
          stats: res.pokemon.stats
        });
      }
    }
  });

  const allAbilities = member.allAbilities || data?.pokemon?.abilities || [];
  const allMoves = member.allMoves || data?.pokemon?.moves || [];

  const handleAutoFill = () => {
    const recommendedMoves = getOptimalMoves(allMoves, member.types);
    setMoves(member.id, recommendedMoves);

    // Auto-equip top recommended item based on stats/rules
    const recItems = getRecommendedItems(member);
    if (recItems.length > 0) {
      setItem(member.id, recItems[0]);
    }

    // Auto-select top recommended Ability
    const recAbilities = getRecommendedAbilities(member);
    if (recAbilities.length > 0) {
      setAbility(member.id, recAbilities[0]);
    }

    // Auto-select top recommended Nature
    const recNatures = getRecommendedNatures(member);
    if (recNatures.length > 0) {
      setNature(member.id, recNatures[0]);
    }
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
        height: '100%',
        minHeight: '420px'
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
        {/* Ability Selection with AI Recommendations */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title="AI Recommended Ability">
            <Lightbulb sx={{ color: '#eab308', fontSize: 20, flexShrink: 0 }} />
          </Tooltip>
          <Autocomplete
            fullWidth
            size="small"
            options={[
              ...getRecommendedAbilities(member).map(ab => ({ name: ab, group: '🌟 Recommended' })),
              ...allAbilities.filter((ab: string) => !getRecommendedAbilities(member).includes(ab)).map((ab: string) => ({ name: ab, group: 'All Abilities' }))
            ]}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name.replace(/-/g, ' ')}
            value={member.selectedAbility ? { name: member.selectedAbility, group: '' } : null}
            onChange={(e, newValue) => {
              setAbility(member.id, newValue ? newValue.name : null);
            }}
            isOptionEqualToValue={(option, val) => option.name === val.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ability"
                placeholder="Search or select..."
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '12px', fontWeight: 600 },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '13px', fontWeight: 600 }
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ textTransform: 'capitalize', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                {option.group === '🌟 Recommended' && (
                  <Lightbulb sx={{ color: '#eab308', fontSize: 16 }} />
                )}
                {option.name.replace(/-/g, ' ')}
              </Box>
            )}
          />
        </Stack>

        {/* Item Selection with AI Recommendations */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title="AI Recommended Item">
            <Lightbulb sx={{ color: '#eab308', fontSize: 20, flexShrink: 0 }} />
          </Tooltip>
          <Autocomplete
            fullWidth
            size="small"
            options={[
              ...getRecommendedItems(member).map(it => ({ name: it, group: `🌟 Recommended for ${member.name}` })),
              ...COMPETITIVE_ITEMS.filter(it => !getRecommendedItems(member).includes(it)).map(it => ({ name: it, group: 'All Items' }))
            ]}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            value={member.selectedItem ? { name: member.selectedItem, group: '' } : null}
            onChange={(e, newValue) => {
              setItem(member.id, newValue ? newValue.name : null);
            }}
            isOptionEqualToValue={(option, val) => option.name === val.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Held Item"
                placeholder="Search or select..."
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '12px', fontWeight: 600 },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '13px', fontWeight: 600 }
                }}
              />
            )}
          />
        </Stack>

        {/* Nature Selection with AI Recommendations */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title="AI Recommended Nature">
            <Lightbulb sx={{ color: '#eab308', fontSize: 20, flexShrink: 0 }} />
          </Tooltip>
          <Autocomplete
            fullWidth
            size="small"
            options={[
              ...getRecommendedNatures(member).map(nat => ({ name: nat, group: '🌟 Recommended' })),
              ...NATURE_NAMES.filter(nat => !getRecommendedNatures(member).includes(nat)).map(nat => ({ name: nat, group: 'All Natures' }))
            ]}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            value={member.selectedNature ? { name: member.selectedNature, group: '' } : null}
            onChange={(e, newValue) => {
              setNature(member.id, newValue ? newValue.name : null);
            }}
            isOptionEqualToValue={(option, val) => option.name === val.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nature"
                placeholder="Search or select..."
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '12px', fontWeight: 600 },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '13px', fontWeight: 600 }
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                {option.group === '🌟 Recommended' && (
                  <Lightbulb sx={{ color: '#eab308', fontSize: 16 }} />
                )}
                {option.name}
              </Box>
            )}
          />
        </Stack>

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
          Auto-Build (Moves, Item, Ability, Nature)
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

  // Export/Import states
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const exportMenuOpen = Boolean(exportAnchorEl);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  // 1. Export to Showdown Text Format
  const exportToShowdown = (teamMembers: TeamMember[]): string => {
    return teamMembers.map((member) => {
      let text = `${member.name}`;
      if (member.selectedItem) {
        text += ` @ ${member.selectedItem}`;
      }
      text += '\n';
      if (member.selectedAbility) {
        text += `Ability: ${member.selectedAbility.replace('-', ' ')}\n`;
      }
      if (member.selectedNature) {
        text += `${member.selectedNature} Nature\n`;
      }
      member.moves.forEach((move) => {
        if (move && move.name) {
          text += `- ${move.name.replace('-', ' ')}\n`;
        }
      });
      return text;
    }).join('\n');
  };

  const handleCopyShowdown = () => {
    handleExportClose();
    if (team.length === 0) {
      showSnackbar('Your team is currently empty!', 'error');
      return;
    }
    const showdownText = exportToShowdown(team);
    navigator.clipboard.writeText(showdownText)
      .then(() => {
        showSnackbar('Copied Showdown text to clipboard!', 'success');
      })
      .catch(() => {
        showSnackbar('Failed to copy text to clipboard.', 'error');
      });
  };

  // Reusable Helper to trigger file downloads correctly on all browsers
  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // Use setAttribute to force download naming convention
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Export to Image (Infographic)
  const handleDownloadImage = () => {
    handleExportClose();
    if (team.length === 0) {
      showSnackbar('Your team is currently empty!', 'error');
      return;
    }
    
    const element = document.getElementById('team-infographic');
    if (!element) {
      showSnackbar('Infographic element not found in DOM.', 'error');
      return;
    }

    showSnackbar('Generating infographic image... Please wait.', 'info');

    html2canvas(element, {
      useCORS: true,
      scale: 2,
      logging: false,
      backgroundColor: isDark ? '#0f172a' : '#f8fafc'
    }).then(async (canvas) => {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const base64Content = dataUrl.split(',')[1];
        
        const response = await fetch('/api/download-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename: 'my-pokemon-team.png',
            mimeType: 'image/png',
            content: base64Content,
            isBase64: true
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create download session');
        }

        const { token } = await response.json();
        window.location.href = `/api/download?token=${token}`;
        showSnackbar('Infographic downloaded successfully!', 'success');
      } catch (err) {
        showSnackbar('Failed to download team infographic.', 'error');
        console.error(err);
      }
    }).catch((err) => {
      showSnackbar('Failed to render team infographic.', 'error');
      console.error(err);
    });
  };

  // 3. Export to JSON
  const handleSaveJSON = async () => {
    handleExportClose();
    if (team.length === 0) {
      showSnackbar('Your team is currently empty!', 'error');
      return;
    }
    try {
      const jsonStr = JSON.stringify(team, null, 2);
      const response = await fetch('/api/download-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: 'my-pokemon-team.json',
          mimeType: 'application/json',
          content: jsonStr,
          isBase64: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create download session');
      }

      const { token } = await response.json();
      window.location.href = `/api/download?token=${token}`;
      showSnackbar('Team saved as my-pokemon-team.json!', 'success');
    } catch (err) {
      showSnackbar('Failed to export team as JSON.', 'error');
      console.error(err);
    }
  };

  // 4. Import from JSON
  const handleJSONImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { setTeam } = useTeamStore.getState();

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) {
          const validatedTeam = data.map((item: any) => ({
            id: Number(item.id) || Math.floor(Math.random() * 1000) + 1,
            name: item.name || 'Unknown',
            image: item.image || '',
            types: Array.isArray(item.types) ? item.types : ['normal'],
            selectedAbility: item.selectedAbility || null,
            selectedItem: item.selectedItem || null,
            selectedNature: item.selectedNature || null,
            allAbilities: item.allAbilities || [],
            allMoves: item.allMoves || [],
            moves: Array.isArray(item.moves) ? item.moves : []
          }));
          
          setTeam(validatedTeam.slice(0, 6));
          showSnackbar('Team imported successfully!', 'success');
        } else {
          showSnackbar('Invalid JSON structure. Must be an array.', 'error');
        }
      } catch (err) {
        showSnackbar('Failed to parse team JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be selected again
    event.target.value = '';
  };

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
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, maxW: 600, mx: 'auto', mb: 3 }}>
          Assemble your dream competitive squad of 6. Auto-recommend optimal competitive movesets, perform real-time math analyses on weaknesses, and receive advice from our AI Coach.
        </Typography>

        {/* Global Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            sx={{
              borderRadius: '12px',
              fontWeight: 800,
              px: 3.5,
              py: 1.25,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                transform: 'translateY(-2px)'
              }
            }}
          >
            Import Team JSON
            <input type="file" accept=".json" hidden onChange={handleJSONImport} />
          </Button>

          <Button
            variant="contained"
            onClick={handleExportClick}
            startIcon={<AutoAwesome />}
            sx={{
              borderRadius: '12px',
              fontWeight: 900,
              px: 4,
              py: 1.25,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
              color: '#ffffff',
              boxShadow: `0 4px 15px ${alpha(theme.palette.secondary.main, 0.25)}`,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha(theme.palette.secondary.main, 0.45)}`,
                filter: 'brightness(1.1)'
              }
            }}
          >
            Export Team
          </Button>

          {/* Export Choices Dropdown Menu */}
          <Menu
            anchorEl={exportAnchorEl}
            open={exportMenuOpen}
            onClose={handleExportClose}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: '16px',
                  mt: 1,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                  p: 0.5
                }
              }
            }}
          >
            <MenuItem onClick={handleCopyShowdown} sx={{ fontWeight: 700, fontSize: '13px', py: 1.25, px: 2, borderRadius: '8px', display: 'flex', gap: 1.5 }}>
              <ContentCopy fontSize="small" color="action" /> Copy Showdown Text
            </MenuItem>
            <MenuItem onClick={handleDownloadImage} sx={{ fontWeight: 700, fontSize: '13px', py: 1.25, px: 2, borderRadius: '8px', display: 'flex', gap: 1.5 }}>
              <ImageIcon fontSize="small" color="action" /> Download Infographic Image
            </MenuItem>
            <MenuItem onClick={handleSaveJSON} sx={{ fontWeight: 700, fontSize: '13px', py: 1.25, px: 2, borderRadius: '8px', display: 'flex', gap: 1.5 }}>
              <Download fontSize="small" color="action" /> Save as Team JSON
            </MenuItem>
          </Menu>
        </Stack>
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
                        height: '100%',
                        minHeight: '420px',
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
      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        {/* Left Column: Synergy Analyzer */}
        <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '24px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              bgcolor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%'
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
              <Box sx={{ mb: 3 }}>
                <Stack spacing={1}>
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
              </Box>
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
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: 'flex-start'
              }}
            >
              {TYPE_LIST.map((type) => {
                const count = coverage[type] || { weak: 0, resist: 0 };
                return (
                  <Box
                    key={type}
                    sx={{
                      flex: {
                        xs: '1 1 calc(50% - 12px)',
                        sm: '1 1 calc(33.33% - 12px)',
                        md: '1 1 calc(25% - 12px)'
                      },
                      minWidth: '100px',
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
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column: AI Coach Recommendations */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '24px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              bgcolor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%'
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
          <Stack
            spacing={1}
            sx={{
              maxHeight: '350px',
              overflowY: 'auto',
              pr: 0.5,
              '&::-webkit-scrollbar': {
                width: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: isDark ? '#1e293b' : '#ffffff'
              },
              '&::-webkit-scrollbar-thumb': {
                background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                borderRadius: '4px',
                '&:hover': {
                  background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                }
              },
              scrollbarWidth: 'thin',
              scrollbarColor: isDark ? 'rgba(255, 255, 255, 0.15) transparent' : 'rgba(0, 0, 0, 0.15) transparent',
            }}
          >
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
      
      {/* 5. Snackbar Feedback Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontWeight: 800,
            borderRadius: '12px',
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* 6. High-Fidelity Offscreen Infographic Card for Image Rendering */}
      <Box sx={{ position: 'absolute', left: '-9999px', top: '-9999px', overflow: 'hidden' }}>
        <div
          id="team-infographic"
          style={{
            width: '900px',
            height: '520px',
            background: isDark
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            color: isDark ? '#ffffff' : '#0f172a',
            padding: '30px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '24px',
            border: isDark ? '3px solid rgba(255, 255, 255, 0.1)' : '3px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid rgba(128,128,128,0.2)', paddingBottom: '15px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, letterSpacing: '-1.5px', textTransform: 'uppercase', color: '#ec4899', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🏆 ELITE SQUAD INFOGRAPHIC
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.7, fontWeight: 600 }}>
                Generated by Pókédex Wiki AI Smart Coach
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', opacity: 0.5, fontWeight: 700, letterSpacing: '1px' }}>VERSION 2.0</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>{team.length}/6 Active Members</div>
            </div>
          </div>

          {/* Slots Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '20px 0', flex: 1 }}>
            {Array.from({ length: 6 }).map((_, idx) => {
              const member = team[idx];
              if (!member) {
                return (
                  <div key={idx} style={{
                    borderRadius: '16px',
                    border: '2px dashed rgba(128,128,128,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(128,128,128,0.03)'
                  }}>
                    <span style={{ fontSize: '12px', opacity: 0.4, fontWeight: 700, textTransform: 'uppercase' }}>Empty Slot #{idx+1}</span>
                  </div>
                );
              }

              const primaryColor = TYPE_COLORS[member.types[0]] || '#9ca3af';

              return (
                <div key={idx} style={{
                  borderRadius: '16px',
                  padding: '15px',
                  background: isDark 
                    ? `linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)`
                    : `linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)`,
                  borderLeft: `5px solid ${primaryColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  position: 'relative',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: `${primaryColor}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <img src={member.image} alt={member.name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 900, textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {member.name}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                        {member.types.map(t => (
                          <span key={t} style={{
                            fontSize: '7px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            background: TYPE_COLORS[t] || '#6b7280',
                            color: '#ffffff'
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '10px', fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>
                      <strong style={{ opacity: 0.5 }}>Ability:</strong> <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>{member.selectedAbility?.replace('-', ' ') || '-'}</span>
                    </div>
                    <div>
                      <strong style={{ opacity: 0.5 }}>Item:</strong> <span style={{ fontWeight: 700 }}>{member.selectedItem || '-'}</span>
                    </div>
                    <div>
                      <strong style={{ opacity: 0.5 }}>Nature:</strong> <span style={{ fontWeight: 700 }}>{member.selectedNature || '-'}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '10px', borderTop: '1px solid rgba(128,128,128,0.15)', paddingTop: '6px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                      {Array.from({ length: 4 }).map((_, mIdx) => {
                        const m = member.moves[mIdx];
                        return (
                          <div key={mIdx} style={{
                            fontSize: '9px',
                            fontWeight: 700,
                            color: m ? (isDark ? '#e2e8f0' : '#1e293b') : 'rgba(128,128,128,0.4)',
                            textTransform: 'capitalize',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            • {m ? m.name.replace('-', ' ') : 'None'}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid rgba(128,128,128,0.15)', paddingTop: '12px', fontSize: '11px', opacity: 0.6, fontWeight: 700 }}>
            <div>🛡️ Pókédex Wiki - Professional Battle Analytics</div>
            <div>Designed for Elite Competitors</div>
          </div>
        </div>
      </Box>

    </Container>
  );
}
