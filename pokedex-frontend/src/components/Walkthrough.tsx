import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import DOMPurify from 'dompurify';
import {
  Box, Card, CardContent, Typography, MenuItem, TextField, Grid,
  List, ListItemButton, ListItemText, Divider, Stack, Button, CircularProgress, alpha, useTheme,
  ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { ImportContacts, NavigateNext, Settings, AutoStories } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { VERSION_COLORS } from '../App';

const GET_WALKTHROUGHS = gql`
  query GetWalkthroughs($gameVersion: String!, $language: String!) {
    getWalkthroughs(gameVersion: $gameVersion, language: $language) {
      id
      gameVersion
      chapterTitle
      content
      order
      language
    }
  }
`;

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

export default function Walkthrough() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [gameVersion, setGameVersion] = useState('emerald');
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

  const { data, loading } = useQuery(GET_WALKTHROUGHS, {
    variables: { gameVersion, language }
  });

  const chapters = data?.getWalkthroughs || [];

  // Automatically select first chapter when list loads
  useEffect(() => {
    if (chapters.length > 0) {
      setSelectedChapterId(chapters[0].id);
    } else {
      setSelectedChapterId(null);
    }
  }, [data]);

  const activeChapter = chapters.find((c: any) => c.id === selectedChapterId);
  const cleanHTML = activeChapter ? DOMPurify.sanitize(activeChapter.content) : '';
  const gameColor = VERSION_COLORS[gameVersion] || theme.palette.primary.main;

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', p: { xs: 1, md: 3 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 950,
              letterSpacing: '-1.5px',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textTransform: 'uppercase'
            }}
          >
            <AutoStories sx={{ fontSize: 36, color: 'primary.main' }} /> GAME WALKTHROUGHS
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.5 }}>
            Khám phá cẩm nang và hướng dẫn vượt ải Pokémon toàn diện chuẩn esports.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={(_, newLang) => {
              if (newLang !== null) setLanguage(newLang);
            }}
            size="small"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              p: '3px',
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: '8px',
                px: 2,
                py: 0.6,
                fontWeight: 800,
                fontSize: '0.78rem',
                letterSpacing: '0.5px',
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                  }
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'text.primary',
                }
              }
            }}
          >
            <ToggleButton value="vi">
              🇻🇳 VI
            </ToggleButton>
            <ToggleButton value="en">
              🇬🇧 EN
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Settings />}
            onClick={() => navigate('/admin/walkthrough')}
            sx={{ fontWeight: 800, borderRadius: '8px', border: '1.5px solid' }}
          >
            Go to CMS Editor 🛠️
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        {/* Left Panel: Game selector & Chapter index list */}
        <Grid size={{ xs: 12, md: 3.5 }}>
          <Card
            sx={{
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1, overflow: 'hidden' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 2, letterSpacing: -0.5, textTransform: 'uppercase' }}>
                Select Version
              </Typography>
              
              <TextField
                select
                value={gameVersion}
                onChange={(e) => setGameVersion(e.target.value)}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <Box
                        sx={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          bgcolor: gameColor,
                          mr: 1.5,
                          boxShadow: `0 0 10px ${alpha(gameColor, 0.8)}`
                        }}
                      />
                    ),
                    sx: { fontWeight: 800 }
                  }
                }}
                sx={{ mb: 3 }}
              >
                {GAME_OPTIONS.map((game) => (
                  <MenuItem key={game.value} value={game.value} sx={{ fontWeight: 800 }}>
                    {game.label}
                  </MenuItem>
                ))}
              </TextField>

              <Divider sx={{ mb: 3, opacity: 0.1 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Chapters List
              </Typography>

              {loading ? (
                <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={32} sx={{ color: gameColor }} />
                </Box>
              ) : chapters.length === 0 ? (
                <Box sx={{ py: 6, textAlign: 'center', opacity: 0.5 }}>
                  <ImportContacts sx={{ fontSize: 40, mb: 1, opacity: 0.6 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>No chapters found</Typography>
                  <Typography variant="caption">Trang hướng dẫn cho bản game này chưa được cập nhật.</Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden', // Tắt hoàn toàn thanh cuộn ngang
                    height: 0,
                    pr: 0.5,
                    scrollbarWidth: 'thin', // Chuẩn Firefox & modern Chrome
                    scrollbarColor: '#475569 transparent', // Solid slate-600 cho Windows
                    '&::-webkit-scrollbar': { width: '6px', height: '6px' },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { 
                      background: '#475569', 
                      borderRadius: '10px' 
                    },
                    '&::-webkit-scrollbar-thumb:hover': { background: '#64748b' },
                  }}
                >
                  <List sx={{ p: 0 }}>
                    {chapters.map((chapter: any) => {
                      const isActive = selectedChapterId === chapter.id;
                      return (
                        <ListItemButton
                          key={chapter.id}
                          onClick={() => setSelectedChapterId(chapter.id)}
                          sx={{
                            borderRadius: '12px',
                            mb: 1,
                            py: 1.2,
                            px: 2,
                            bgcolor: isActive ? alpha(gameColor, 0.12) : 'transparent',
                            color: isActive ? '#ffffff' : 'text.secondary',
                            border: '1px solid',
                            borderColor: isActive ? alpha(gameColor, 0.3) : 'transparent',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                              bgcolor: isActive ? alpha(gameColor, 0.16) : 'action.hover',
                              color: isActive ? '#ffffff' : 'text.primary',
                              transform: 'translateX(4px)'
                            },
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            ...(isActive && {
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: '20%',
                                height: '60%',
                                width: '4px',
                                borderRadius: '4px',
                                backgroundColor: gameColor,
                              }
                            })
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography sx={{ fontWeight: isActive ? 850 : 600, fontSize: '0.88rem', wordBreak: 'break-word' }}>
                                {chapter.chapterTitle}
                              </Typography>
                            }
                          />
                          <NavigateNext fontSize="small" sx={{ opacity: isActive ? 1 : 0.3, ml: 1, flexShrink: 0 }} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel: Content reading area */}
        <Grid size={{ xs: 12, md: 8.5 }}>
          <Card
            sx={{
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              bgcolor: 'rgba(13, 13, 21, 0.4)',
              minHeight: '520px'
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
              {activeChapter ? (
                <Box>
                  {/* Chapter Header */}
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: '6px', bgcolor: alpha(gameColor, 0.2), border: `1px solid ${alpha(gameColor, 0.4)}` }}>
                      <Typography variant="caption" sx={{ color: gameColor, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Chapter {activeChapter.order}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 950, letterSpacing: -0.5, fontFamily: '"Be Vietnam Pro", "Inter", sans-serif' }}>
                      {activeChapter.chapterTitle}
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 4, opacity: 0.1 }} />

                  {/* Sanitized HTML Output Canvas with Enhanced Typography & Scoped Styling */}
                  <Box
                    dangerouslySetInnerHTML={{ __html: cleanHTML }}
                    sx={{
                      fontFamily: '"Be Vietnam Pro", "Inter", sans-serif',
                      color: 'text.primary',
                      '& h1': { display: 'none !important' }, // Ẩn hoàn toàn H1 trùng lặp bằng !important
                      '& h2': { 
                        color: gameColor, 
                        fontSize: '1.5rem', 
                        fontWeight: 800, 
                        mt: 4, 
                        mb: 2,
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        pb: 1,
                        fontFamily: '"Be Vietnam Pro", "Inter", sans-serif'
                      },
                      '& h3': { 
                        fontSize: '1.2rem', 
                        fontWeight: 700, 
                        mt: 3, 
                        mb: 1.5,
                        fontFamily: '"Be Vietnam Pro", "Inter", sans-serif'
                      },
                      '& p': { 
                        fontSize: '1rem', 
                        lineHeight: 1.8, 
                        color: 'text.secondary', 
                        mb: 2.5 
                      },
                      '& strong': { color: 'text.primary', fontWeight: 700 },
                      '& ul, & ol': { mb: 2.5, paddingLeft: '1.5rem', color: 'text.secondary', lineHeight: 1.8 },
                      '& li': { mb: 0.5 },
                      '& table': { 
                        width: '100%', 
                        borderCollapse: 'collapse', 
                        my: 3,
                        fontSize: '0.95rem',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(15, 15, 25, 0.3)'
                      },
                      '& th': { 
                        background: alpha(gameColor, 0.08), 
                        color: 'text.primary', 
                        fontWeight: 800, 
                        p: 2, 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px',
                        borderBottom: `2px solid ${alpha(gameColor, 0.3)}`
                      },
                      '& td': { 
                        p: 2, 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        color: 'text.secondary',
                        verticalAlign: 'middle'
                      },
                      '& tbody tr:hover': { background: 'rgba(255,255,255,0.02)' },
                      '& img': {
                        maxWidth: '64px',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        margin: '0 4px',
                        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))'
                      },
                      '& img:hover': {
                        transform: 'scale(1.2) translateY(-2px)',
                        filter: `drop-shadow(0 8px 12px ${alpha(gameColor, 0.4)})`
                      },
                      '& blockquote': {
                        borderLeft: `4px solid ${gameColor}`,
                        padding: '12px 20px',
                        margin: '20px 0',
                        backgroundColor: alpha(gameColor, 0.05),
                        borderRadius: '0 8px 8px 0',
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        '& strong': { color: gameColor }
                      }
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ py: 12, textAlign: 'center', opacity: 0.5 }}>
                  <AutoStories sx={{ fontSize: 64, mb: 2, color: 'text.secondary' }} />
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>Vui lòng chọn chương</Typography>
                  <Typography variant="body2">Hãy chọn một chương hướng dẫn ở danh sách bên trái để đọc nội dung chi tiết.</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
