import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, Typography, IconButton,
  Grid, Card, CardContent, Button, Stack, Chip, alpha, useTheme, LinearProgress
} from '@mui/material';
import {
  Close, AutoAwesome, Save, FlashOn, Radar, Shield, CheckCircle
} from '@mui/icons-material';
import { useQuery, gql } from '@apollo/client';
import { useTeamStore } from '../lib/teamStore';

const GET_POKEMON_MOVES = gql`
  query GetPokemonMoves($id: Int!) {
    pokemon(id: $id) {
      id
      name
      types
      image
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

const TYPE_COLORS: Record<string, string> = {
  normal:'#9ca3af', fire:'#f97316', water:'#3b82f6', electric:'#eab308',
  grass:'#22c55e', ice:'#06b6d4', fighting:'#ef4444', poison:'#a855f7',
  ground:'#d97706', flying:'#818cf8', psychic:'#ec4899', bug:'#84cc16',
  rock:'#78716c', ghost:'#7c3aed', dragon:'#1d4ed8', dark:'#374151',
  steel:'#6b7280', fairy:'#f472b6',
};

interface MovesModalProps {
  pokemonId: number;
  onClose: () => void;
}

export default function MovesModal({ pokemonId, onClose }: MovesModalProps) {
  const theme = useTheme();
  const { team, setMoves } = useTeamStore();
  const teamMember = team.find(p => p.id === pokemonId);
  
  const { data, loading } = useQuery(GET_POKEMON_MOVES, {
    variables: { id: pokemonId },
    fetchPolicy: 'cache-first'
  });

  const pokemon = data?.pokemon;
  const availableMoves = pokemon?.moves || [];

  // Local state for moves being drafted
  const [selectedMoves, setSelectedMoves] = useState<any[]>(teamMember?.moves || []);

  const handleToggleMove = (move: any) => {
    setSelectedMoves(prev => {
      const exists = prev.find(m => m.name === move.name);
      if (exists) {
        return prev.filter(m => m.name !== move.name);
      } else {
        if (prev.length >= 4) return prev; // max 4
        return [...prev, move];
      }
    });
  };

  const handleSave = () => {
    setMoves(pokemonId, selectedMoves);
    onClose();
  };

  const recommendMoves = () => {
    if (!pokemon) return;
    const types = pokemon.types;
    
    let validMoves = availableMoves.filter((m: any) => m.power && m.power > 0);
    
    const stabMoves = validMoves.filter((m: any) => types.includes(m.type));
    const nonStabMoves = validMoves.filter((m: any) => !types.includes(m.type));
    
    const sortByPower = (a: any, b: any) => {
      if (b.power !== a.power) return b.power - a.power;
      return (b.accuracy || 0) - (a.accuracy || 0);
    };

    stabMoves.sort(sortByPower);
    nonStabMoves.sort(sortByPower);

    const recommended = [];
    const usedTypes = new Set();
    for (const m of stabMoves) {
      if (!usedTypes.has(m.type) && recommended.length < 2) {
        recommended.push(m);
        usedTypes.add(m.type);
      }
    }
    
    const remainingPool = [...stabMoves, ...nonStabMoves].filter(m => !recommended.find(r => r.name === m.name));
    remainingPool.sort(sortByPower);
    
    while(recommended.length < 4 && remainingPool.length > 0) {
      recommended.push(remainingPool.shift());
    }

    setSelectedMoves(recommended);
  };

  return (
    <Dialog
      open={!!pokemonId}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          overflow: 'hidden',
          background: theme.palette.background.paper,
          maxHeight: '90vh',
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 56, height: 56,
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderRadius: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.5
              }}
            >
              {teamMember?.image && (
                <Box component="img" src={teamMember.image} alt="Pokemon" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: -0.5 }}>
                {teamMember?.name} Moveset
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
                Select up to 4 moves
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Selected Draft Row */}
      <Box
        sx={{
          p: 3,
          background: theme.palette.mode === 'dark' ? 'rgba(15,15,26,0.4)' : 'rgba(248,250,252,0.6)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          {/* 4 Draft Boxes */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {[0, 1, 2, 3].map(i => {
              const m = selectedMoves[i];
              const moveColor = m ? (TYPE_COLORS[m.type] || '#9ca3af') : 'transparent';
              return (
                <Box
                  key={i}
                  sx={{
                    width: 120, height: 56,
                    borderRadius: 2.5,
                    border: `2px ${m ? 'solid' : 'dashed'} ${m ? moveColor : theme.palette.divider}`,
                    background: m ? alpha(moveColor, 0.05) : 'transparent',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden'
                  }}
                >
                  {m ? (
                    <>
                      <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 10, px: 1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                        {m.name.replace('-', ' ')}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 8, fontWeight: 900, textTransform: 'uppercase', color: moveColor }}>
                        {m.type}
                      </Typography>
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, bgcolor: moveColor }} />
                    </>
                  ) : (
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Empty Slot
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AutoAwesome />}
              onClick={recommendMoves}
              disabled={loading || availableMoves.length === 0}
              sx={{ borderRadius: 3, fontWeight: 800, px: 2, flex: { xs: 1, sm: 'none' } }}
            >
              Auto-Build
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSave}
              sx={{ borderRadius: 3, fontWeight: 800, px: 3, flex: { xs: 1, sm: 'none' } }}
            >
              Save Team
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Available Moves Grid */}
      <DialogContent
        sx={{
          p: 3,
          overflowY: 'auto',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <LinearProgress sx={{ width: '50%', borderRadius: 2 }} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {availableMoves.map((m: any) => {
              const isSelected = selectedMoves.some(s => s.name === m.name);
              const isStab = pokemon?.types.includes(m.type);
              const moveColor = TYPE_COLORS[m.type] || '#9ca3af';

              return (
                <Grid key={m.name} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    onClick={() => handleToggleMove(m)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 3,
                      border: `2px solid ${isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5)}`,
                      background: isSelected ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
                      transition: 'transform 0.2s, border-color 0.2s',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.5),
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      {/* Move Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {m.name.replace('-', ' ')}
                            {isStab && (
                              <Chip
                                label="STAB"
                                size="small"
                                sx={{
                                  height: 14,
                                  fontSize: 7,
                                  fontWeight: 900,
                                  bgcolor: 'warning.main',
                                  color: 'warning.contrastText',
                                  borderRadius: 1,
                                }}
                              />
                            )}
                          </Typography>
                          <Chip
                            label={m.type}
                            size="small"
                            sx={{
                              height: 16,
                              fontSize: 8,
                              fontWeight: 900,
                              textTransform: 'uppercase',
                              bgcolor: moveColor,
                              color: '#fff',
                              mt: 0.5
                            }}
                          />
                        </Box>
                        {isSelected && (
                          <CheckCircle color="primary" sx={{ fontSize: 18 }} />
                        )}
                      </Box>

                      {/* Power and Accuracy */}
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <FlashOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            {m.power || '--'}
                          </Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ fontSize: 8, fontWeight: 800 }}>
                            PWR
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Radar sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            {m.accuracy || '--'}
                          </Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ fontSize: 8, fontWeight: 800 }}>
                            ACC
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Shield sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 8, fontWeight: 800, textTransform: 'uppercase' }}>
                            {m.damageClass}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
