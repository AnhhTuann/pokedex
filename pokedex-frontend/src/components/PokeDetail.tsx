import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogContent, Box, Typography, Chip, Button, Stack,
  LinearProgress, IconButton, Divider, Tooltip, alpha, useTheme
} from '@mui/material';
import { Close, Sparkles, ChevronRight, AutoAwesome } from '@mui/icons-material';
import { gql, useQuery } from '@apollo/client';
import { useTeamStore } from '../lib/teamStore';

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon(id: $id) {
      id name types image shinyImage height weight description
      stats { name value }
      abilities
      evolutions { id name types image }
      matchups { type multiplier }
      gameVersions
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
  const { addMember, team, removeMember } = useTeamStore();
  const [showShiny, setShowShiny] = useState(false);

  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id }, skip: !id,
  });

  useEffect(() => { setShowShiny(false); }, [id]);

  if (!id) return null;

  const p = data?.pokemon;
  const inTeam = team.some(m => m.id === id);
  const primaryColor = TYPE_COLORS[p?.types?.[0]] || '#6366f1';

  return (
    <Dialog
      open={!!id}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
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
        <Box flex={1}>
          <Typography variant="caption" color="text.disabled" fontWeight={700} letterSpacing={3} sx={{ textTransform: 'uppercase' }}>
            #{id.toString().padStart(3, '0')}
          </Typography>
          <Typography variant="h4" fontWeight={900} sx={{ textTransform: 'capitalize', color: 'text.primary', letterSpacing: -1, lineHeight: 1.1, my: 0.5 }}>
            {p?.name || 'Loading…'}
          </Typography>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" mb={2}>
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
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <Button
              size="small"
              variant={inTeam ? 'outlined' : 'contained'}
              color={inTeam ? 'error' : 'primary'}
              onClick={() => inTeam ? removeMember(id) : addMember(p)}
              disabled={!p}
              sx={{ borderRadius: 6, fontWeight: 800, fontSize: 11 }}
            >
              {inTeam ? 'Remove from Team' : 'Add to Team'}
            </Button>
          </Stack>
        </Box>

        <IconButton onClick={onClose} id="close-modal" size="small" sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}>
          <Close />
        </IconButton>
      </Box>

      {/* ── Content ── */}
      <DialogContent sx={{ p: 3 }}>
        {loading && <LinearProgress sx={{ borderRadius: 2, mb: 2 }} />}
        {error && <Typography color="error">Failed to load: {error.message}</Typography>}

        {p && (
          <Stack spacing={3}>
            {/* Physical */}
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography variant="caption" color="text.disabled" fontWeight={700} letterSpacing={2} textTransform="uppercase">Height</Typography>
                <Typography variant="h6" fontWeight={800}>{((p.height || 0) / 10).toFixed(1)} m</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.disabled" fontWeight={700} letterSpacing={2} textTransform="uppercase">Weight</Typography>
                <Typography variant="h6" fontWeight={800}>{((p.weight || 0) / 10).toFixed(1)} kg</Typography>
              </Box>
              {p.abilities?.length > 0 && (
                <Box>
                  <Typography variant="caption" color="text.disabled" fontWeight={700} letterSpacing={2} textTransform="uppercase">Abilities</Typography>
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" mt={0.5}>
                    {p.abilities.map((a: string) => (
                      <Chip key={a} label={a.replace('-', ' ')} size="small" variant="outlined" sx={{ fontSize: 10, fontWeight: 700, textTransform: 'capitalize' }} />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>

            <Divider />

            {/* Base Stats */}
            <Box>
              <Typography variant="overline" fontWeight={800} color="text.disabled" letterSpacing={3} mb={1.5} display="block">
                Base Stats
              </Typography>
              <Stack spacing={1.5}>
                {p.stats?.map((stat: any, i: number) => (
                  <Box key={stat.name}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={1.5} color="text.secondary">
                        {stat.name.replace('-', ' ')}
                      </Typography>
                      <Typography variant="caption" fontWeight={900} color="text.primary">{stat.value}</Typography>
                    </Stack>
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
            </Box>

            {/* Type Matchups */}
            {p.matchups?.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="overline" fontWeight={800} color="text.disabled" letterSpacing={3} mb={1.5} display="block">
                    Type Matchups
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
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
                  <Typography variant="overline" fontWeight={800} color="text.disabled" letterSpacing={3} mb={1.5} display="block">
                    Appears In
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
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
                  <Typography variant="overline" fontWeight={800} color="text.disabled" letterSpacing={3} mb={1.5} display="block">
                    Evolution Chain
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
                    {p.evolutions.map((evo: any, idx: number) => (
                      <React.Fragment key={evo.id}>
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
                            <Box component="img" src={evo.image} alt={evo.name} sx={{ width: 46, height: 46, objectFit: 'contain' }} />
                          </Box>
                        </Tooltip>
                        {idx < p.evolutions.length - 1 && <ChevronRight sx={{ color: 'text.disabled' }} />}
                      </React.Fragment>
                    ))}
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
