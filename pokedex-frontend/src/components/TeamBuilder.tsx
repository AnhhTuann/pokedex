import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, Typography, LinearProgress,
  Stack, Chip, IconButton, Divider, Button, alpha, useTheme, Paper, Tooltip
} from '@mui/material';
import { Close, Save, DragIndicator, Shield, FlashOn } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useTeamStore, TeamMember } from '../lib/teamStore';
import MovesModal from './MovesModal';

const SAVE_TEAM = gql`
  mutation SaveTeam($pokemonIds: [Int!]!) { saveTeam(pokemonIds: $pokemonIds) }
`;
const GET_MY_TEAM = gql`
  query GetMyTeam { myTeam { id name types image } }
`;

const TYPE_COLORS: Record<string, string> = {
  normal:'#9ca3af', fire:'#f97316', water:'#3b82f6', electric:'#eab308',
  grass:'#22c55e', ice:'#06b6d4', fighting:'#ef4444', poison:'#a855f7',
  ground:'#d97706', flying:'#818cf8', psychic:'#ec4899', bug:'#84cc16',
  rock:'#78716c', ghost:'#7c3aed', dragon:'#1d4ed8', dark:'#374151',
  steel:'#6b7280', fairy:'#f472b6',
};

const ALL_TYPES = Object.keys(TYPE_COLORS);

export default function TeamBuilder() {
  const theme = useTheme();
  const { team, removeMember, reorderTeam, setTeam } = useTeamStore();
  const [selectedForMoves, setSelectedForMoves] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useQuery(GET_MY_TEAM, {
    onCompleted: (data) => {
      if (data.myTeam?.length > 0 && team.length === 0) {
        setTeam(data.myTeam.map((p: any) => ({ ...p, moves: [] })));
      }
    },
    fetchPolicy: 'network-only',
  });

  const [saveTeamMutation, { loading: saving }] = useMutation(SAVE_TEAM);

  const handleSave = async () => {
    await saveTeamMutation({ variables: { pokemonIds: team.map(p => p.id) } });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTeam(result.source.index, result.destination.index);
  };

  // Type coverage
  const teamTypes = new Set(team.flatMap(p => p.types));
  const missing = ALL_TYPES.filter(t => !teamTypes.has(t));

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200,
          borderRadius: '20px 20px 0 0',
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === 'dark' ? alpha('#0f0f1a', 0.95) : alpha('#fff', 0.97),
          backdropFilter: 'blur(20px)',
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, py: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', md: 'center' }}>

            {/* Slots */}
            <Box flex={1} overflow="auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="team" direction="horizontal">
                  {(provided) => (
                    <Stack
                      direction="row"
                      spacing={1.5}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ minWidth: 'max-content' }}
                    >
                      {team.map((p, idx) => (
                        // @ts-ignore
                        <Draggable key={p.id.toString()} draggableId={p.id.toString()} index={idx}>
                          {(prov, snap) => (
                            <Box
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              sx={{
                                width: 72, height: 72, position: 'relative',
                                borderRadius: 3,
                                border: `2px solid ${snap.isDragging ? theme.palette.primary.main : alpha(TYPE_COLORS[p.types[0]] || '#6366f1', 0.4)}`,
                                background: alpha(TYPE_COLORS[p.types[0]] || '#6366f1', 0.08),
                                cursor: 'grab',
                                transition: 'transform 0.2s',
                                transform: snap.isDragging ? 'scale(1.08)' : 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                              onClick={() => setSelectedForMoves(p.id)}
                            >
                              <Box component="img" src={p.image} alt={p.name} sx={{ width: 52, height: 52, objectFit: 'contain' }} />
                              <Tooltip title="Remove">
                                <IconButton
                                  size="small"
                                  onClick={e => { e.stopPropagation(); removeMember(p.id); }}
                                  sx={{
                                    position: 'absolute', top: -8, right: -8, width: 20, height: 20,
                                    bgcolor: 'error.main', color: '#fff', fontSize: 12, opacity: 0,
                                    '&:hover': { bgcolor: 'error.dark' },
                                    '.MuiBox-root:hover &': { opacity: 1 },
                                  }}
                                >
                                  ×
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Empty slots */}
                      {Array.from({ length: 6 - team.length }).map((_, i) => (
                        <Box
                          key={`empty-${i}`}
                          sx={{
                            width: 72, height: 72, borderRadius: 3,
                            border: `2px dashed ${theme.palette.divider}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <Typography fontSize={10} fontWeight={700} color="text.disabled" textTransform="uppercase" letterSpacing={1}>
                            #{team.length + i + 1}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>

            {/* Coverage + Save */}
            <Stack spacing={1.5} sx={{ minWidth: 240, flexShrink: 0 }}>
              {team.length > 0 && (
                <Box>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" mb={0.5}>
                    {[...teamTypes].map(t => (
                      <Chip key={t} label={t} size="small"
                        sx={{ height: 18, fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase',
                          bgcolor: alpha(TYPE_COLORS[t] || '#9ca3af', 0.8), color: '#fff' }}
                      />
                    ))}
                  </Stack>
                  {missing.length > 0 && (
                    <Typography variant="caption" color="text.disabled" fontWeight={700}>
                      Missing: {missing.slice(0, 4).join(', ')}{missing.length > 4 ? ` +${missing.length - 4}` : ''}
                    </Typography>
                  )}
                </Box>
              )}
              <Button
                variant="contained"
                color={saveSuccess ? 'success' : 'primary'}
                disabled={saving || team.length === 0}
                onClick={handleSave}
                startIcon={<Save />}
                size="small"
                id="save-team-btn"
                sx={{ borderRadius: 3, fontWeight: 800 }}
              >
                {saveSuccess ? 'Saved! ✓' : saving ? 'Saving…' : 'Save Team'}
              </Button>
            </Stack>

          </Stack>
        </Box>
      </Paper>

      {selectedForMoves && (
        <MovesModal pokemonId={selectedForMoves} onClose={() => setSelectedForMoves(null)} />
      )}
    </>
  );
}
