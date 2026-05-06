import React from 'react';
import {
  Box, TextField, InputAdornment, MenuItem, Select,
  FormControl, InputLabel, SelectChangeEvent, Stack, useTheme
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  typeValue: string;
  onTypeChange: (v: string) => void;
  genValue?: number | null;
  onGenChange?: (v: number | null) => void;
}

const POKEMON_TYPES = [
  'Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison',
  'Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'
];

const GENERATIONS = [
  { value: 'all', label: 'All Gens' },
  { value: 1, label: 'Gen 1 · Kanto' },
  { value: 2, label: 'Gen 2 · Johto' },
  { value: 3, label: 'Gen 3 · Hoenn' },
  { value: 4, label: 'Gen 4 · Sinnoh' },
  { value: 5, label: 'Gen 5 · Unova' },
  { value: 6, label: 'Gen 6 · Kalos' },
  { value: 7, label: 'Gen 7 · Alola' },
  { value: 8, label: 'Gen 8 · Galar' },
  { value: 9, label: 'Gen 9 · Paldea' },
];

export default function SearchBar({ value, onChange, typeValue, onTypeChange, genValue, onGenChange }: SearchBarProps) {
  const theme = useTheme();

  const selectSx = {
    borderRadius: 3,
    '& .MuiOutlinedInput-root': { borderRadius: 3 },
  };

  const handleGenChange = (e: SelectChangeEvent<number | string>) => {
    const val = e.target.value;
    onGenChange?.(val === 'all' ? null : Number(val));
  };

  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      {/* Search text */}
      <TextField
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by name or #..."
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment>,
            sx: { borderRadius: 3 },
          }
        }}
        sx={{ minWidth: 140 }}
      />

      {/* Type filter */}
      <FormControl size="small" sx={{ ...selectSx, minWidth: 130 }}>
        <InputLabel>Type</InputLabel>
        <Select value={typeValue} onChange={e => onTypeChange(e.target.value)} label="Type" sx={{ borderRadius: 3 }}>
          <MenuItem value=""><em>All Types</em></MenuItem>
          {POKEMON_TYPES.map(t => <MenuItem key={t} value={t.toLowerCase()}>{t}</MenuItem>)}
        </Select>
      </FormControl>

      {/* Generation filter */}
      <FormControl size="small" sx={{ ...selectSx, minWidth: 145 }}>
        <InputLabel>Generation</InputLabel>
        <Select
          value={genValue ?? 'all'}
          onChange={handleGenChange}
          label="Generation"
          sx={{ borderRadius: 3 }}
        >
          {GENERATIONS.map(g => <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Stack>
  );
}
