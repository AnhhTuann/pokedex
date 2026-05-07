import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, Typography, IconButton, Stack, Chip, alpha, useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL } from './PokeDetail';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CompareModalProps { ids: number[]; onClose: () => void; }

export default function CompareModal({ ids, onClose }: CompareModalProps) {
  const theme = useTheme();
  const { data: d1 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[0] }, skip: !ids[0] });
  const { data: d2 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[1] }, skip: !ids[1] });

  if (ids.length < 2) return null;
  const p1 = d1?.pokemon;
  const p2 = d2?.pokemon;
  if (!p1 || !p2) return null;

  const chartData = p1.stats.map((s: any, i: number) => ({
    stat: s.name.replace('-', ' ').toUpperCase(),
    [p1.name]: s.value,
    [p2.name]: p2.stats[i]?.value || 0,
    fullMark: 255,
  }));

  return (
    <Dialog
      open={ids.length === 2}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
          }
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 900, letterSpacing: -0.5 }}>
        ⚔️ Head-to-Head
        <IconButton onClick={onClose} sx={{ ml: 'auto', color: 'text.secondary' }}><Close /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ alignItems: 'center' }}>

          {/* P1 */}
          <Stack sx={{ alignItems: 'center', minWidth: 140 }} spacing={1}>
            <Box sx={{ width: 120, height: 120, borderRadius: '50%', bgcolor: alpha('#6366f1', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box component="img" src={p1.image} alt={p1.name} sx={{ width: 90, height: 90, objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(99,102,241,0.4))' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'capitalize' }} color="primary">{p1.name}</Typography>
            <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
              {p1.types.map((t: string) => <Chip key={t} label={t} size="small" sx={{ fontSize: 9, fontWeight: 800, bgcolor: alpha('#6366f1', 0.15), textTransform: 'uppercase' }} />)}
            </Stack>
          </Stack>

          {/* Radar Chart */}
          <Box sx={{ flex: 1, height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="stat" tick={{ fill: theme.palette.text.secondary, fontSize: 9, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 255]} tick={false} axisLine={false} />
                <Radar name={p1.name} dataKey={p1.name} stroke="#6366f1" fill="#6366f1" fillOpacity={0.45} />
                <Radar name={p2.name} dataKey={p2.name} stroke="#ec4899" fill="#ec4899" fillOpacity={0.45} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }} />
                <Legend wrapperStyle={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }} />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          {/* P2 */}
          <Stack sx={{ alignItems: 'center', minWidth: 140 }} spacing={1}>
            <Box sx={{ width: 120, height: 120, borderRadius: '50%', bgcolor: alpha('#ec4899', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box component="img" src={p2.image} alt={p2.name} sx={{ width: 90, height: 90, objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(236,72,153,0.4))' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'capitalize' }} color="secondary">{p2.name}</Typography>
            <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
              {p2.types.map((t: string) => <Chip key={t} label={t} size="small" sx={{ fontSize: 9, fontWeight: 800, bgcolor: alpha('#ec4899', 0.15), textTransform: 'uppercase' }} />)}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
