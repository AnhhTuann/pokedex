import React, { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import {
  Box, IconButton, Tooltip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Button, Autocomplete, CircularProgress, Divider, Stack
} from '@mui/material';
import {
  FormatBold, FormatItalic, LooksOne, LooksTwo, FormatListBulleted,
  FormatListNumbered, TableChart, CatchingPokemon
} from '@mui/icons-material';
import { useQuery, gql } from '@apollo/client';

// Simple GraphQL query to fetch Pokemon suggestions
const GET_POKEMON_SUGGESTIONS = gql`
  query GetPokemonSuggestions($search: String) {
    pokemonList(limit: 10, search: $search) {
      results {
        id
        name
        image
      }
    }
  }
`;

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [spriteDialogOpen, setSpriteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<{ id: number; name: string; image: string } | null>(null);

  // Debounce search term to avoid hitting GraphQL server too fast
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 3000); // 300ms
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, loading } = useQuery(GET_POKEMON_SUGGESTIONS, {
    variables: { search: debouncedSearch },
    skip: !spriteDialogOpen
  });

  if (!editor) return null;

  const handleInsertSprite = () => {
    if (selectedPokemon) {
      // Use the official artwork or standard sprite as inline image
      // Standard sprite is usually better for small inline images, or official artwork
      // Let's use standard PokeAPI sprite because it is small and fits inline perfectly:
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`;
      
      editor
        .chain()
        .focus()
        .setImage({ src: spriteUrl, alt: selectedPokemon.name })
        .run();

      // Close dialog and reset state
      setSpriteDialogOpen(false);
      setSelectedPokemon(null);
      setSearchTerm('');
    }
  };

  const handleInsertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 0.5,
        p: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
      }}
    >
      <Tooltip title="Bold (Ctrl+B)">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
          sx={{
            bgcolor: editor.isActive('bold') ? 'action.selected' : 'transparent',
            borderRadius: '8px'
          }}
        >
          <FormatBold fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Italic (Ctrl+I)">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
          sx={{
            bgcolor: editor.isActive('italic') ? 'action.selected' : 'transparent',
            borderRadius: '8px'
          }}
        >
          <FormatItalic fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />

      <Tooltip title="Heading 1">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
          sx={{
            bgcolor: editor.isActive('heading', { level: 1 }) ? 'action.selected' : 'transparent',
            borderRadius: '8px'
          }}
        >
          <LooksOne fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 2">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
          sx={{
            bgcolor: editor.isActive('heading', { level: 2 }) ? 'action.selected' : 'transparent',
            borderRadius: '8px'
          }}
        >
          <LooksTwo fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />

      <Tooltip title="Bullet List">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
          sx={{
            bgcolor: editor.isActive('bulletList') ? 'action.selected' : 'transparent',
            borderRadius: '8px'
          }}
        >
          <FormatListBulleted fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Ordered List">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
          sx={{
            bgcolor: editor.isActive('orderedList') ? 'action.selected' : 'transparent',
            borderRadius: '8px'
          }}
        >
          <FormatListNumbered fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />

      <Tooltip title="Insert Gym Leader Table (3x3)">
        <IconButton
          size="small"
          onClick={handleInsertTable}
          sx={{ borderRadius: '8px' }}
        >
          <TableChart fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Insert Pokémon Sprite">
        <IconButton
          size="small"
          onClick={() => setSpriteDialogOpen(true)}
          sx={{
            borderRadius: '8px',
            color: 'secondary.main',
            '&:hover': { bgcolor: 'secondary.light', color: '#fff' }
          }}
        >
          <CatchingPokemon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Insert Sprite Dialog */}
      <Dialog
        open={spriteDialogOpen}
        onClose={() => setSpriteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '16px',
              bgcolor: 'background.paper',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.1rem', pb: 1 }}>
          INSERT POKÉMON SPRITE
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2, pb: 3 }}>
          <Autocomplete
            options={data?.pokemonList?.results || []}
            getOptionLabel={(option) => `#${option.id} - ${option.name.toUpperCase()}`}
            loading={loading}
            onInputChange={(event, value) => setSearchTerm(value)}
            onChange={(event, value) => setSelectedPokemon(value)}
            value={selectedPokemon}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Pokémon name or ID..."
                size="small"
                fullWidth
              />
            )}
            renderOption={(props, option) => {
              const { key, ...restProps } = props;
              return (
                <li key={option.id} {...restProps}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${option.id}.png`}
                      alt={option.name}
                      style={{ width: 36, height: 36 }}
                    />
                    <Box sx={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                      #{option.id} - {option.name}
                    </Box>
                  </Stack>
                </li>
              );
            }}
          />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSpriteDialogOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>
            CANCEL
          </Button>
          <Button
            onClick={handleInsertSprite}
            variant="contained"
            disabled={!selectedPokemon}
            sx={{ fontWeight: 800, borderRadius: '8px' }}
          >
            INSERT
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
