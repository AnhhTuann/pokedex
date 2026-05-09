import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Box, Card, CardContent, Typography, TextField, MenuItem, Button, Grid,
  Paper, List, ListItem, ListItemText, IconButton, Divider, Stack, Alert, Snackbar, CircularProgress
} from '@mui/material';
import { Edit, Delete, Save, AddCircle, FormatListNumbered } from '@mui/icons-material';
import EditorToolbar from './EditorToolbar';
import { VERSION_COLORS } from '../App';

const GET_WALKTHROUGHS = gql`
  query GetWalkthroughs($gameVersion: String!) {
    getWalkthroughs(gameVersion: $gameVersion) {
      id
      gameVersion
      chapterTitle
      content
      order
    }
  }
`;

const UPSERT_WALKTHROUGH = gql`
  mutation UpsertWalkthrough($id: Int, $gameVersion: String!, $chapterTitle: String!, $content: String!, $order: Int!) {
    upsertWalkthrough(id: $id, gameVersion: $gameVersion, chapterTitle: $chapterTitle, content: $content, order: $order) {
      id
      gameVersion
      chapterTitle
      content
      order
    }
  }
`;

const DELETE_WALKTHROUGH = gql`
  mutation DeleteWalkthrough($id: Int!) {
    deleteWalkthrough(id: $id)
  }
`;

// Game options matching our standard version list
const GAME_OPTIONS = [
  { value: 'emerald', label: 'Emerald' },
  { value: 'firered', label: 'FireRed' },
  { value: 'leafgreen', label: 'LeafGreen' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
  { value: 'crystal', label: 'Crystal' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'sapphire', label: 'Sapphire' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'pearl', label: 'Pearl' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'heartgold', label: 'HeartGold' },
  { value: 'soulsilver', label: 'SoulSilver' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'black-2', label: 'Black 2' },
  { value: 'white-2', label: 'White 2' },
  { value: 'x', label: 'X' },
  { value: 'y', label: 'Y' },
  { value: 'omega-ruby', label: 'Omega Ruby' },
  { value: 'alpha-sapphire', label: 'Alpha Sapphire' },
  { value: 'sun', label: 'Sun' },
  { value: 'moon', label: 'Moon' },
  { value: 'ultra-sun', label: 'Ultra Sun' },
  { value: 'ultra-moon', label: 'Ultra Moon' },
  { value: 'sword', label: 'Sword' },
  { value: 'shield', label: 'Shield' },
  { value: 'scarlet', label: 'Scarlet' },
  { value: 'violet', label: 'Violet' }
];

export default function AdminWalkthrough() {
  const [gameVersion, setGameVersion] = useState('emerald');
  const [chapterTitle, setChapterTitle] = useState('');
  const [order, setOrder] = useState<number>(1);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Snackbar notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // GraphQL Query for selected game's walkthroughs
  const { data, loading, refetch } = useQuery(GET_WALKTHROUGHS, {
    variables: { gameVersion }
  });

  // Mutations
  const [upsertWalkthrough, { loading: saving }] = useMutation(UPSERT_WALKTHROUGH);
  const [deleteWalkthrough] = useMutation(DELETE_WALKTHROUGH);

  // Initialize TipTap
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor-inner-input focus:outline-none',
        style: 'min-height: 380px; padding: 18px; color: #e2e8f0; font-family: sans-serif; font-size: 0.95rem; line-height: 1.6;'
      }
    }
  });

  const handleResetForm = () => {
    setEditingId(null);
    setChapterTitle('');
    // Automatically set next order based on existing chapter counts
    const existing = data?.getWalkthroughs || [];
    const nextOrder = existing.length > 0 ? Math.max(...existing.map((c: any) => c.order)) + 1 : 1;
    setOrder(nextOrder);
    editor?.commands.setContent('');
  };

  const handleSave = async () => {
    if (!chapterTitle.trim()) {
      setSnackbar({ open: true, message: 'Please enter a chapter title!', severity: 'error' });
      return;
    }

    const htmlContent = editor?.getHTML() || '';
    if (!htmlContent.trim() || htmlContent === '<p></p>') {
      setSnackbar({ open: true, message: 'Please enter some guide content!', severity: 'error' });
      return;
    }

    try {
      await upsertWalkthrough({
        variables: {
          id: editingId,
          gameVersion,
          chapterTitle,
          content: htmlContent,
          order: Number(order)
        }
      });

      setSnackbar({ open: true, message: 'Chapter saved successfully! 🚀', severity: 'success' });
      refetch();
      handleResetForm();
    } catch (err: any) {
      console.error(err);
      setSnackbar({ open: true, message: `Error saving: ${err.message}`, severity: 'error' });
    }
  };

  const handleEditChapter = (chapter: any) => {
    setEditingId(chapter.id);
    setChapterTitle(chapter.chapterTitle);
    setOrder(chapter.order);
    editor?.commands.setContent(chapter.content);
  };

  const handleDeleteChapter = async (id: number) => {
    if (window.confirm('Are you absolutely sure you want to delete this chapter?')) {
      try {
        await deleteWalkthrough({ variables: { id } });
        setSnackbar({ open: true, message: 'Chapter deleted successfully!', severity: 'success' });
        refetch();
        if (editingId === id) {
          handleResetForm();
        }
      } catch (err: any) {
        setSnackbar({ open: true, message: `Error deleting: ${err.message}`, severity: 'error' });
      }
    }
  };

  const walkthroughs = data?.getWalkthroughs || [];

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', p: { xs: 1, md: 3 } }}>
      {/* Editor CSS styling injections */}
      <style>{`
        .tiptap-editor-inner-input table {
          border-collapse: collapse;
          width: 100%;
          margin: 16px 0;
        }
        .tiptap-editor-inner-input table th,
        .tiptap-editor-inner-input table td {
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 8px 12px;
          text-align: left;
          min-width: 100px;
        }
        .tiptap-editor-inner-input table th {
          background-color: rgba(255, 255, 255, 0.05);
          font-weight: bold;
        }
        .tiptap-editor-inner-input img {
          max-width: 64px;
          display: inline-block;
          vertical-align: middle;
          margin: 4px;
          transition: transform 0.2s;
        }
        .tiptap-editor-inner-input img:hover {
          transform: scale(1.15);
        }
        .tiptap-editor-inner-input blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 16px;
          margin-left: 0;
          color: #a0aec0;
          font-style: italic;
        }
      `}</style>

      {/* Header Banner */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 950, letterSpacing: '-1px', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <FormatListNumbered sx={{ fontSize: 36 }} /> WALKTHROUGH CMS ADMIN
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.5 }}>
            Quản trị và xây dựng các bài viết hướng dẫn game chuẩn chỉ, giàu tương tác.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => window.open('/walkthrough', '_blank')}
          sx={{ fontWeight: 800, borderRadius: '8px' }}
        >
          View Walkthroughs 📖
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {/* Left Side: Parameters Form and Chapter Management */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            {/* Form configuration Card */}
            <Card sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                  CHAPTER SETTINGS
                </Typography>
                <Divider />

                <TextField
                  select
                  label="Game Version"
                  value={gameVersion}
                  onChange={(e) => {
                    setGameVersion(e.target.value);
                    handleResetForm();
                  }}
                  fullWidth
                  size="small"
                >
                  {GAME_OPTIONS.map((g) => (
                    <MenuItem key={g.value} value={g.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: VERSION_COLORS[g.value] || '#fff' }} />
                        {g.label}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Chapter Title"
                  placeholder="e.g. 1. Rustboro City & First Gym"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  fullWidth
                  size="small"
                />

                <TextField
                  label="Order / Sequence"
                  type="number"
                  placeholder="e.g. 1"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  fullWidth
                  size="small"
                />

                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddCircle />}
                    onClick={handleResetForm}
                    sx={{ fontWeight: 800, borderRadius: '10px', height: 40 }}
                  >
                    RESET FORM
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                      fontWeight: 800,
                      borderRadius: '10px',
                      height: 40,
                      background: `linear-gradient(135deg, ${VERSION_COLORS[gameVersion] || '#6366f1'} 0%, #1e1b4b 100%)`,
                      color: '#ffffff',
                      boxShadow: `0 4px 14px rgba(0,0,0,0.25)`,
                    }}
                  >
                    {editingId ? 'UPDATE' : 'SAVE'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* List of existing chapters card */}
            <Card sx={{ flexGrow: 1, border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, letterSpacing: -0.5 }}>
                  CHAPTER LIST ({walkthroughs.length})
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2, display: 'block' }}>
                  Danh sách bài viết hiện tại của bản game này. Các chương sẽ hiển thị theo thứ tự Order.
                </Typography>
                <Divider />

                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={24} /></Box>
                ) : walkthroughs.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: 'center', opacity: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>No chapters found for this version</Typography>
                    <Typography variant="caption">Let's create the first guide chapter!</Typography>
                  </Box>
                ) : (
                  <List sx={{ overflowY: 'auto', maxHeight: '420px', flexGrow: 1, mt: 1 }}>
                    {walkthroughs.map((chapter: any) => (
                      <ListItem
                        key={chapter.id}
                        secondaryAction={
                          <Stack direction="row" spacing={0.5}>
                            <IconButton size="small" onClick={() => handleEditChapter(chapter)} color="primary">
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteChapter(chapter.id)} color="error">
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        }
                        sx={{
                          borderRadius: '8px',
                          mb: 1,
                          border: '1px solid transparent',
                          bgcolor: editingId === chapter.id ? 'action.selected' : 'action.hover',
                          borderColor: editingId === chapter.id ? 'primary.main' : 'transparent',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                              Order {chapter.order}: {chapter.chapterTitle}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Side: TipTap WYSIWYG Editor Canvas */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: '520px' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: -0.5 }}>
                CONTENT WYSIWYG EDITOR
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2, display: 'block' }}>
                Soạn thảo nội dung trực quan. Chèn Gym Leader Tables và Pokémon Sprites trực quan.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '12px',
                  bgcolor: 'rgba(10, 10, 15, 0.4)',
                  overflow: 'hidden'
                }}
              >
                {/* Custom Editor Toolbar */}
                <EditorToolbar editor={editor} />

                {/* Editor Content Box */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', minHeight: '380px' }}>
                  <EditorContent editor={editor} />
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%', fontWeight: 700, borderRadius: '8px' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
