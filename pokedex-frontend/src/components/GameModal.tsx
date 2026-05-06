import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Box, Typography, TextField, Button,
  IconButton, Stack, alpha, useTheme, CircularProgress
} from '@mui/material';
import { Close, Refresh, EmojiEvents, SentimentDissatisfied } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL } from './PokeDetail';
import { motion } from 'motion/react';

interface GameModalProps { onClose: () => void; }

export default function GameModal({ onClose }: GameModalProps) {
  const theme = useTheme();
  const [targetId, setTargetId] = useState<number | null>(null);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const { data, loading } = useQuery(GET_POKEMON_DETAIL, { variables: { id: targetId }, skip: !targetId });
  const pokemon = data?.pokemon;

  const newRound = () => {
    setTargetId(Math.floor(Math.random() * 151) + 1);
    setGuess(''); setRevealed(false); setStatus('playing');
  };

  useEffect(() => { newRound(); }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokemon) return;
    if (guess.toLowerCase().trim() === pokemon.name.toLowerCase()) {
      setRevealed(true); setStatus('won');
    } else {
      setStatus('lost');
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 5, overflow: 'hidden' } } }}
    >
      <Box sx={{ background: `linear-gradient(135deg, ${alpha('#6366f1', 0.15)} 0%, ${alpha('#ec4899', 0.08)} 100%)`, p: 3 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
            🎮 Who's That Pokémon?
          </Typography>
          <IconButton onClick={onClose} size="small"><Close /></IconButton>
        </Stack>
      </Box>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 4, gap: 3 }}>
        {/* Silhouette */}
        <Box sx={{ width: 200, height: 200, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {loading || !pokemon ? (
            <CircularProgress color="primary" />
          ) : (
            <Box
              component="img"
              src={pokemon.image}
              alt="???"
              sx={{
                width: 150, height: 150, objectFit: 'contain',
                filter: revealed ? 'drop-shadow(0 8px 24px rgba(99,102,241,0.4))' : 'brightness(0)',
                transition: 'filter 1s ease',
              }}
            />
          )}
          {revealed && pokemon && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 10 }}
              style={{
                position: 'absolute', top: 4, right: 4,
                background: '#6366f1', color: '#fff',
                fontWeight: 900, fontSize: 10, textTransform: 'uppercase' as const,
                letterSpacing: 1, padding: '4px 10px', borderRadius: 20,
              }}
            >
              {pokemon.name}!
            </motion.div>
          )}
        </Box>

        {/* Input or Result */}
        {!revealed ? (
          <Box component="form" onSubmit={handleGuess} sx={{ width: '100%', maxWidth: 360 }}>
            <Stack spacing={1.5}>
              <TextField
                value={guess}
                onChange={e => setGuess(e.target.value)}
                placeholder="Enter Pokémon name…"
                fullWidth autoFocus
                size="medium"
                error={status === 'lost'}
                helperText={status === 'lost' ? 'Wrong! Try again.' : ''}
                slotProps={{ input: { sx: { borderRadius: 3, fontWeight: 700 } } }}
              />
              <Stack direction="row" spacing={1}>
                <Button type="submit" variant="contained" fullWidth size="large" sx={{ borderRadius: 3, fontWeight: 800, fontSize: 14 }}>
                  Guess!
                </Button>
                <Button variant="outlined" color="inherit" onClick={() => { setRevealed(true); setStatus('lost'); }} sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}>
                  Give Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        ) : (
          <Stack sx={{ alignItems: 'center' }} spacing={2}>
            {status === 'won' ? (
              <Stack sx={{ alignItems: 'center' }} spacing={0.5}>
                <EmojiEvents sx={{ fontSize: 48, color: '#eab308' }} />
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#eab308' }}>You got it!</Typography>
              </Stack>
            ) : (
              <Stack sx={{ alignItems: 'center' }} spacing={0.5}>
                <SentimentDissatisfied sx={{ fontSize: 48, color: 'text.disabled' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }} color="text.secondary">Better luck next time!</Typography>
                <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 700 }} color="text.disabled">
                  It was: {pokemon?.name}
                </Typography>
              </Stack>
            )}
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={newRound}
              size="large"
              sx={{ borderRadius: 3, fontWeight: 800, mt: 1, px: 4 }}
            >
              Play Again
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
