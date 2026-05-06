import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogContent, Box, Typography, Chip, Button, Stack,
  LinearProgress, IconButton, Divider, Tooltip, alpha, useTheme,
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Close, ChevronRight, AutoAwesome, VolumeUp, PlayArrow, Pause, Stop, RecordVoiceOver } from '@mui/icons-material';
import { gql, useQuery } from '@apollo/client';
import { useTeamStore } from '../lib/teamStore';

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon(id: $id) {
      id name types image shinyImage height weight description cry category
      stats { name value }
      abilities
      evolutions { id name types image shinyImage minLevel trigger }
      matchups { type multiplier }
      gameVersions
      moves { name type power accuracy damageClass learnMethod levelLearnedAt }
      megaEvolutions { id name types image shinyImage isMega isAlternative }
      alternativeForms { id name types image shinyImage isMega isAlternative }
    }
  }
`;

const TYPE_COLORS: Record<string, string> = {
  normal: '#9ca3af',   fire: '#f97316',    water: '#3b82f6',
  electric: '#eab308', grass: '#22c55e',   ice: '#06b6d4',
  fighting: '#ef4444', poison: '#a855f7',  ground: '#d97706',
  flying: '#818cf8',   psychic: '#ec4899', bug: '#84cc16',
  rock: '#78716c',     ghost: '#7c3aed',   dragon: '#1d4ed8',
  dark: '#374151',     steel: '#6b7280',   fairy: '#f472b6',
};

const STAT_COLORS = ['#6366f1','#ef4444','#3b82f6','#8b5cf6','#06b6d4','#f59e0b'];

interface PokeDetailProps {
  id: number | null;
  onClose: () => void;
  onSelect?: (id: number) => void;
}

export default function PokeDetail({ id, onClose, onSelect }: PokeDetailProps) {
  const theme = useTheme();
  const { addMember, team, removeMember, isShinyMode } = useTeamStore();
  const [showShiny, setShowShiny] = useState(false);
  const [moveTab, setMoveTab] = useState(0);

  // Pokédex Voice states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        setVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id }, skip: !id,
  });

  useEffect(() => {
    setShowShiny(isShinyMode);
  }, [id, isShinyMode]);

  if (!id) return null;

  const p = data?.pokemon;
  const inTeam = team.some(m => m.id === id);
  const primaryColor = TYPE_COLORS[p?.types?.[0]] || '#6366f1';
  const totalStats = p?.stats?.reduce((acc: number, s: any) => acc + s.value, 0) || 0;

  const handleVoiceSpeak = () => {
    if (!p || !p.description) return;

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(p.description);
    
    // Choose the best English female automated voice
    const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    const pokedexVoice = 
      englishVoices.find(v => v.name.toLowerCase().includes('google uk english female')) ||
      englishVoices.find(v => v.name.toLowerCase().includes('google us english')) ||
      englishVoices.find(v => v.name.toLowerCase().includes('zira')) ||
      englishVoices.find(v => v.name.toLowerCase().includes('female')) ||
      englishVoices[0];

    if (pokedexVoice) {
      utterance.voice = pokedexVoice;
    }

    utterance.rate = 0.95; // Slower anime pace
    utterance.pitch = 1.05; // Metallic tone

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceStop = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const playCry = () => {
    if (!p?.cry) return;
    const audio = new Audio(p.cry);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  return (
    <Dialog
      open={!!id}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          overflow: 'hidden',
          background: theme.palette.background.paper,
          maxHeight: '90vh',
        }
      }}
    >
      {/* ── Header / Left panel gradient ── */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(primaryColor, 0.25)} 0%, ${alpha(primaryColor, 0.05)} 100%)`,
          p: 3,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Pokemon image */}
        <Box
          sx={{
            width: { xs: 120, sm: 160 }, height: { xs: 120, sm: 160 }, flexShrink: 0,
            borderRadius: '50%',
            background: alpha(primaryColor, 0.15),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: p?.shinyImage ? 'pointer' : 'default',
            border: showShiny ? `3px solid #eab308` : 'none',
            transition: 'border 0.3s',
          }}
          onClick={() => p?.shinyImage && setShowShiny(s => !s)}
        >
          {loading ? (
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'action.hover' }} />
          ) : (
            <Box
              component="img"
              src={showShiny ? p?.shinyImage : p?.image}
              alt={p?.name}
              sx={{ width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))' }}
            />
          )}
        </Box>

        {/* Name / Types / Actions */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box>
            <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
              #{id.toString().padStart(3, '0')}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'capitalize', color: 'text.primary', letterSpacing: -1, lineHeight: 1.1, mt: 0.5 }}>
              {p?.name || 'Loading…'}
            </Typography>
            {p?.category && (
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontStyle: 'italic', mt: 0.5, lineHeight: 1.2 }}>
                {p.category}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            {p?.types?.map((t: string) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{ bgcolor: alpha(TYPE_COLORS[t] || '#9ca3af', 0.85), color: '#fff', fontWeight: 800, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}
              />
            ))}
            {p?.shinyImage && (
              <Tooltip title="Toggle Shiny ✨">
                <Chip
                  icon={<AutoAwesome sx={{ fontSize: 12, color: showShiny ? '#eab308 !important' : undefined }} />}
                  label="Shiny"
                  size="small"
                  variant={showShiny ? 'filled' : 'outlined'}
                  onClick={() => setShowShiny(s => !s)}
                  sx={{ cursor: 'pointer', fontWeight: 700, ...(showShiny ? { bgcolor: '#eab308', color: '#000' } : {}) }}
                />
              </Tooltip>
            )}
            {p?.cry && (
              <Tooltip title="Play Cry 🔊">
                <Chip
                  icon={<VolumeUp sx={{ fontSize: 12 }} />}
                  label="Cry"
                  size="small"
                  variant="outlined"
                  onClick={playCry}
                  sx={{ cursor: 'pointer', fontWeight: 700 }}
                />
              </Tooltip>
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <Button
              size="small"
              variant={inTeam ? 'outlined' : 'contained'}
              color={inTeam ? 'error' : 'primary'}
              onClick={() => inTeam ? removeMember(id) : addMember(p)}
              disabled={!p}
              sx={{ borderRadius: 6, fontWeight: 800, fontSize: 11, px: 2, py: 0.75 }}
            >
              {inTeam ? 'Remove from Team' : 'Add to Team'}
            </Button>
          </Box>
        </Box>

        <IconButton onClick={onClose} id="close-modal" size="small" sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}>
          <Close />
        </IconButton>
      </Box>

      {/* ── Content ── */}
      <DialogContent
        sx={{
          p: 3,
          overflowY: 'auto',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
            '&:hover': {
              background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            }
          },
          scrollbarWidth: 'thin',
          scrollbarColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15) transparent' : 'rgba(0, 0, 0, 0.15) transparent',
        }}
      >
        {loading && <LinearProgress sx={{ borderRadius: 2, mb: 2 }} />}
        {error && <Typography color="error">Failed to load: {error.message}</Typography>}

        {p && (
          <Stack spacing={3}>
            {/* Physical */}
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Height</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{((p.height || 0) / 10).toFixed(1)} m</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Weight</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{((p.weight || 0) / 10).toFixed(1)} kg</Typography>
              </Box>
              {p.abilities?.length > 0 && (
                <Box>
                  <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Abilities</Typography>
                  <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', mt: 0.5 }}>
                    {p.abilities.map((a: string) => (
                      <Chip key={a} label={a.replace('-', ' ')} size="small" variant="outlined" sx={{ fontSize: 10, fontWeight: 700, textTransform: 'capitalize' }} />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>

            <Divider />

            {/* Pokédex Voice Entry Description */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '16px',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.015)',
                borderLeft: `5px solid ${primaryColor}`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative Subtle Glowing Background Soundwave Bars for UI visual excellence */}
              {isSpeaking && !isPaused && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    display: 'flex',
                    gap: '3px',
                    alignItems: 'flex-end',
                    height: '24px'
                  }}
                >
                  {[0.4, 0.8, 1.2, 0.6, 1.0, 0.5, 0.9].map((delay, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: '3px',
                        height: '100%',
                        bgcolor: primaryColor,
                        borderRadius: '2px',
                        animation: 'wave 1.2s ease-in-out infinite alternate',
                        animationDelay: `${delay}s`,
                        '@keyframes wave': {
                          '0%': { height: '4px' },
                          '100%': { height: '22px' }
                        }
                      }}
                    />
                  ))}
                </Box>
              )}

              <Typography
                variant="overline"
                color="text.disabled"
                sx={{ fontWeight: 800, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <RecordVoiceOver sx={{ fontSize: 16, color: primaryColor }} />
                Pokédex Voice Entry
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontStyle: 'italic',
                  fontFamily: 'serif',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: 'text.primary',
                  mb: 2,
                  pr: isSpeaking && !isPaused ? 4 : 0
                }}
              >
                "{p.description || "No official dex database description available."}"
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleVoiceSpeak}
                  startIcon={isSpeaking && !isPaused ? <Pause /> : <PlayArrow />}
                  sx={{
                    borderRadius: 8,
                    bgcolor: isSpeaking && !isPaused ? 'warning.main' : primaryColor,
                    '&:hover': {
                      bgcolor: isSpeaking && !isPaused ? 'warning.dark' : alpha(primaryColor, 0.85),
                    },
                    fontWeight: 800,
                    fontSize: 11,
                    px: 2.5,
                    py: 0.75,
                    boxShadow: isSpeaking && !isPaused ? `0 0 12px ${theme.palette.warning.main}` : `0 0 12px ${alpha(primaryColor, 0.4)}`,
                    transition: 'all 0.2s'
                  }}
                >
                  {isSpeaking ? (isPaused ? 'Resume' : 'Pause Voice') : 'Read Entry'}
                </Button>

                {isSpeaking && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={handleVoiceStop}
                    startIcon={<Stop />}
                    sx={{
                      borderRadius: 8,
                      fontWeight: 800,
                      fontSize: 11,
                      px: 2,
                      py: 0.75,
                    }}
                  >
                    Stop
                  </Button>
                )}
              </Stack>
            </Paper>

            <Divider />

            {/* Base Stats */}
            <Box>
              <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 3, mb: 1.5, display: 'block' }}>
                Base Stats
              </Typography>
              <Stack spacing={1.5}>
                {p.stats?.map((stat: any, i: number) => (
                  <Box key={stat.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                        {stat.name.replace('-', ' ')}
                      </Typography>
                      <Typography variant="caption" color="text.primary" sx={{ fontWeight: 900 }}>{stat.value}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(100, (stat.value / 255) * 100)}
                      sx={{
                        height: 6, borderRadius: 3,
                        bgcolor: alpha(STAT_COLORS[i % STAT_COLORS.length], 0.15),
                        '& .MuiLinearProgress-bar': { bgcolor: STAT_COLORS[i % STAT_COLORS.length], borderRadius: 3 },
                      }}
                    />
                  </Box>
                ))}
              </Stack>

              {/* Total Stats Row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 1.5, borderTop: `1px dashed ${alpha(theme.palette.divider, 0.4)}` }}>
                <Typography variant="caption" color="text.primary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                  Total
                </Typography>
                <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 900 }}>
                  {totalStats}
                </Typography>
              </Box>
            </Box>

            {/* Type Matchups */}
            {p.matchups?.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 3, mb: 1.5, display: 'block' }}>
                    Type Matchups
                  </Typography>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                    {p.matchups.map((m: any) => (
                      <Chip
                        key={m.type}
                        label={`${m.type} ${m.multiplier}×`}
                        size="small"
                        sx={{
                          fontWeight: 800, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
                          bgcolor: m.multiplier > 1 ? alpha('#ef4444', 0.15) : alpha('#22c55e', 0.15),
                          color: m.multiplier > 1 ? '#ef4444' : '#22c55e',
                          border: `1px solid ${m.multiplier > 1 ? alpha('#ef4444', 0.3) : alpha('#22c55e', 0.3)}`,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </>
            )}

            {/* Game Versions */}
            {p.gameVersions?.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 3, mb: 1.5, display: 'block' }}>
                    Appears In
                  </Typography>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                    {p.gameVersions.slice(0, 12).map((v: string) => (
                      <Chip key={v} label={v.replace(/-/g, ' ')} size="small" variant="outlined" sx={{ fontSize: 9, fontWeight: 700, textTransform: 'capitalize' }} />
                    ))}
                    {p.gameVersions.length > 12 && (
                      <Chip label={`+${p.gameVersions.length - 12} more`} size="small" sx={{ fontSize: 9, fontWeight: 700 }} />
                    )}
                  </Stack>
                </Box>
              </>
            )}

            {/* Evolutions */}
            {p.evolutions?.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 3, mb: 1.5, display: 'block' }}>
                    Evolution Chain
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    {p.evolutions.map((evo: any, idx: number) => (
                      <React.Fragment key={evo.id}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                          <Tooltip title={evo.name}>
                            <Box
                              onClick={() => { if (onSelect && evo.id !== p.id) onSelect(evo.id); }}
                              sx={{
                                width: 64, height: 64, borderRadius: '50%',
                                background: alpha(TYPE_COLORS[evo.types?.[0]] || '#6366f1', 0.15),
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: evo.id !== p.id ? 'pointer' : 'default',
                                border: `2px solid ${evo.id === p.id ? '#6366f1' : 'transparent'}`,
                                transition: 'transform 0.2s, border 0.2s',
                                '&:hover': evo.id !== p.id ? { transform: 'scale(1.15)', border: `2px solid ${alpha('#6366f1', 0.5)}` } : {},
                              }}
                            >
                              <Box component="img" src={showShiny && evo.shinyImage ? evo.shinyImage : evo.image} alt={evo.name} sx={{ width: 46, height: 46, objectFit: 'contain' }} />
                            </Box>
                          </Tooltip>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: 10,
                              fontWeight: 800,
                              color: evo.id === p.id ? 'primary.main' : 'text.secondary',
                              textTransform: 'capitalize',
                              textAlign: 'center',
                              maxWidth: 76,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {evo.name}
                          </Typography>
                        </Box>
                        {idx < p.evolutions.length - 1 && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48, mx: 0.5, mt: -2 }}>
                            <ChevronRight sx={{ color: 'text.disabled', fontSize: 20 }} />
                            {p.evolutions[idx + 1]?.minLevel ? (
                              <Typography variant="caption" sx={{ fontSize: 9, fontWeight: 800, color: 'text.secondary', mt: -0.25, whiteSpace: 'nowrap' }}>
                                Lv. {p.evolutions[idx + 1].minLevel}
                              </Typography>
                            ) : p.evolutions[idx + 1]?.trigger ? (
                              <Typography variant="caption" sx={{ fontSize: 8, fontWeight: 800, color: 'text.disabled', textTransform: 'capitalize', mt: -0.25, whiteSpace: 'nowrap' }}>
                                {p.evolutions[idx + 1].trigger.replace('-', ' ')}
                              </Typography>
                            ) : null}
                          </Box>
                        )}
                      </React.Fragment>
                    ))}
                  </Stack>
                </Box>
              </>
            )}

            {/* Mega Evolution Cards */}
            {p.megaEvolutions && p.megaEvolutions.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 3, mb: 2, display: 'block' }}>
                    Mega Evolution
                  </Typography>
                  <Stack direction="row" spacing={2.5} sx={{ alignItems: 'stretch', flexWrap: 'wrap', gap: 2 }}>
                    {p.megaEvolutions.map((form: any) => {
                      let bgGradient = `linear-gradient(135deg, ${alpha(TYPE_COLORS[form.types[0]] || '#6366f1', 0.08)} 0%, ${alpha(TYPE_COLORS[form.types[1] || form.types[0]] || '#6366f1', 0.15)} 100%)`;
                      let borderColor = alpha(TYPE_COLORS[form.types[0]] || '#6366f1', 0.3);
                      let glowShadow = `0 4px 12px ${alpha(TYPE_COLORS[form.types[0]] || '#6366f1', 0.15)}`;

                      if (form.name.toLowerCase().includes('charizard-mega-x') || form.name.toLowerCase().includes('mega charizard x')) {
                        bgGradient = 'linear-gradient(135deg, #101c2a 0%, #1a3c40 100%)';
                        borderColor = '#00e5ff';
                        glowShadow = '0 0 15px rgba(0, 229, 255, 0.4)';
                      } else if (form.name.toLowerCase().includes('charizard-mega-y') || form.name.toLowerCase().includes('mega charizard y')) {
                        bgGradient = 'linear-gradient(135deg, #2b1111 0%, #4a2111 100%)';
                        borderColor = '#ff3d00';
                        glowShadow = '0 0 15px rgba(255, 61, 0, 0.4)';
                      }

                      return (
                        <Box
                          key={form.id}
                          onClick={() => { if (onSelect) onSelect(form.id); }}
                          sx={{
                            flex: '1 1 200px',
                            minWidth: 200,
                            maxWidth: { xs: '100%', sm: 260 },
                            borderRadius: '16px',
                            background: bgGradient,
                            border: `2px solid ${borderColor}`,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: glowShadow,
                            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s, border-color 0.25s',
                            '&:hover': {
                              transform: 'translateY(-6px)',
                              boxShadow: form.name.toLowerCase().includes('mega-x') ? '0 8px 25px rgba(0, 229, 255, 0.7)' : form.name.toLowerCase().includes('mega-y') ? '0 8px 25px rgba(255, 61, 0, 0.7)' : `0 8px 25px ${alpha(TYPE_COLORS[form.types[0]] || '#6366f1', 0.5)}`,
                              borderColor: form.name.toLowerCase().includes('mega-x') ? '#00e5ff' : form.name.toLowerCase().includes('mega-y') ? '#ff3d00' : TYPE_COLORS[form.types[0]] || '#6366f1',
                            }
                          }}
                        >
                          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                            <Chip
                              label="MEGA"
                              size="small"
                              sx={{
                                height: 16,
                                fontSize: 8,
                                fontWeight: 900,
                                bgcolor: form.name.toLowerCase().includes('mega-x') ? '#00e5ff' : form.name.toLowerCase().includes('mega-y') ? '#ff3d00' : 'primary.main',
                                color: '#fff'
                              }}
                            />
                          </Box>

                          <Box
                            component="img"
                            src={showShiny && form.shinyImage ? form.shinyImage : form.image}
                            alt={form.name}
                            sx={{ width: 100, height: 100, objectFit: 'contain', my: 1, filter: 'drop-shadow(0px 6px 10px rgba(0,0,0,0.15))' }}
                          />

                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 900,
                              fontSize: 13,
                              color: 'text.primary',
                              textAlign: 'center',
                              textTransform: 'capitalize',
                              mb: 1
                            }}
                          >
                            {form.name.replace(/-/g, ' ')}
                          </Typography>

                          <Stack direction="row" spacing={0.5}>
                            {form.types.map((type: string) => (
                              <Chip
                                key={type}
                                label={type}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: 8,
                                  fontWeight: 900,
                                  textTransform: 'uppercase',
                                  bgcolor: TYPE_COLORS[type] || '#9ca3af',
                                  color: '#fff'
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </>
            )}

            {/* Alternative Forms Section */}
            {p.alternativeForms && p.alternativeForms.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 3, mb: 1.5, display: 'block' }}>
                    Alternative Forms
                  </Typography>
                  <Stack direction="row" spacing={2.5} sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {p.alternativeForms.map((form: any) => (
                      <Box key={form.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                        <Tooltip title={`${form.name} • ${form.types.map((t: string) => t.toUpperCase()).join(' / ')}`}>
                          <Box
                            onClick={() => { if (onSelect) onSelect(form.id); }}
                            sx={{
                              width: 64, height: 64, borderRadius: '50%',
                              background: alpha(TYPE_COLORS[form.types[0]] || '#6366f1', 0.15),
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              border: `2px solid ${alpha(TYPE_COLORS[form.types[0]] || '#6366f1', 0.4)}`,
                              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                              cursor: 'pointer',
                              '&:hover': {
                                transform: 'scale(1.15)',
                                borderColor: TYPE_COLORS[form.types[0]] || '#6366f1',
                                boxShadow: `0 4px 12px ${alpha(TYPE_COLORS[form.types[0]] || '#6366f1', 0.3)}`
                              }
                            }}
                          >
                            <Box component="img" src={showShiny && form.shinyImage ? form.shinyImage : form.image} alt={form.name} sx={{ width: 46, height: 46, objectFit: 'contain' }} />
                          </Box>
                        </Tooltip>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: 'text.secondary',
                            textTransform: 'capitalize',
                            textAlign: 'center',
                            maxWidth: 80,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {form.name.replace(/-/g, ' ').replace(new RegExp(p.name, 'i'), '').trim() || form.name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </>
            )}

            {/* Moveset Details */}
            {p.moves?.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 3, mb: 1.5, display: 'block' }}>
                    Moveset
                  </Typography>
                  <Tabs
                    value={moveTab}
                    onChange={(_, val) => setMoveTab(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      minHeight: 36, mb: 2,
                      '& .MuiTab-root': { minHeight: 36, py: 0.5, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
                    }}
                  >
                    <Tab label="Level Up" />
                    <Tab label="Machine" />
                    <Tab label="Egg" />
                    <Tab label="Tutor" />
                  </Tabs>

                  <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', overflow: 'hidden' }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 800, fontSize: 10, textTransform: 'uppercase' }}>Level</TableCell>
                          <TableCell sx={{ fontWeight: 800, fontSize: 10, textTransform: 'uppercase' }}>Move</TableCell>
                          <TableCell sx={{ fontWeight: 800, fontSize: 10, textTransform: 'uppercase' }}>Type</TableCell>
                          <TableCell sx={{ fontWeight: 800, fontSize: 10, textTransform: 'uppercase' }}>Cat.</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 800, fontSize: 10, textTransform: 'uppercase' }}>Pwr</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 800, fontSize: 10, textTransform: 'uppercase' }}>Acc</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {p.moves
                          .filter((m: any) => {
                            if (moveTab === 0) return m.learnMethod === 'level-up';
                            if (moveTab === 1) return m.learnMethod === 'machine';
                            if (moveTab === 2) return m.learnMethod === 'egg';
                            return m.learnMethod === 'tutor';
                          })
                          .sort((a: any, b: any) => (a.levelLearnedAt || 0) - (b.levelLearnedAt || 0))
                          .map((m: any, i: number) => {
                            const isPhysical = m.damageClass === 'physical';
                            const isSpecial = m.damageClass === 'special';
                            
                            return (
                              <TableRow key={`${m.name}-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'action.hover' } }}>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}>
                                  {m.learnMethod === 'level-up' && m.levelLearnedAt > 0 ? m.levelLearnedAt : '—'}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 800, textTransform: 'capitalize', fontSize: 13 }}>
                                  {m.name.replace('-', ' ')}
                                </TableCell>
                                <TableCell>
                                  <Chip label={m.type} size="small" sx={{ height: 20, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', bgcolor: TYPE_COLORS[m.type] || '#9ca3af', color: '#fff' }} />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={m.damageClass}
                                    size="small"
                                    sx={{
                                      height: 20, fontSize: 9, fontWeight: 900, textTransform: 'uppercase',
                                      bgcolor: isPhysical ? alpha('#ef4444', 0.15) : isSpecial ? alpha('#3b82f6', 0.15) : alpha('#9ca3af', 0.15),
                                      color: isPhysical ? '#ef4444' : isSpecial ? '#3b82f6' : 'text.secondary',
                                      border: `1px solid ${isPhysical ? alpha('#ef4444', 0.3) : isSpecial ? alpha('#3b82f6', 0.3) : alpha('#9ca3af', 0.3)}`,
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12 }}>{m.power || '—'}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12 }}>{m.accuracy || '—'}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
