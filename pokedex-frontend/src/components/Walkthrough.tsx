import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import DOMPurify from 'dompurify';
import {
  Box, Card, CardContent, Typography, MenuItem, TextField, Grid,
  List, ListItemButton, ListItemText, Divider, Stack, Button, CircularProgress, alpha, useTheme
} from '@mui/material';
import { ImportContacts, NavigateNext, Settings, AutoStories } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

  const { data, loading } = useQuery(GET_WALKTHROUGHS, {
    variables: { gameVersion }
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
      {/* Global CSS Inject for Dark Mode Stylings of TipTap HTML Elements */}
      <style>{`
        .walkthrough-html-render {
          color: #cbd5e1;
          font-size: 1rem;
          line-height: 1.7;
          font-family: 'Inter', sans-serif;
        }
        .walkthrough-html-render h1, 
        .walkthrough-html-render h2 {
          color: #f1f5f9;
          font-weight: 850;
          letter-spacing: -0.5px;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        .walkthrough-html-render h1 {
          font-size: 1.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
        }
        .walkthrough-html-render h2 {
          font-size: 1.3rem;
        }
        .walkthrough-html-render p {
          margin-bottom: 16px;
        }
        .walkthrough-html-render table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          margin: 24px 0;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          overflow: hidden;
          background-color: rgba(15, 15, 25, 0.5);
          backdrop-filter: blur(8px);
        }
        .walkthrough-html-render table th,
        .walkthrough-html-render table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .walkthrough-html-render table th {
          background-color: ${alpha(gameColor, 0.12)};
          color: #fff;
          font-weight: 800;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid ${alpha(gameColor, 0.4)};
        }
        .walkthrough-html-render table tr:last-child td {
          border-bottom: none;
        }
        .walkthrough-html-render table tr:hover td {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .walkthrough-html-render img {
          max-width: 64px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));
        }
        .walkthrough-html-render img:hover {
          transform: scale(1.2) translateY(-2px);
          filter: drop-shadow(0 8px 12px ${alpha(gameColor, 0.4)});
        }
        .walkthrough-html-render blockquote {
          border-left: 4px solid ${gameColor};
          padding: 12px 20px;
          margin: 20px 0;
          background-color: ${alpha(gameColor, 0.05)};
          border-radius: 0 8px 8px 0;
          color: #94a3b8;
          font-style: italic;
        }
        .walkthrough-html-render ul,
        .walkthrough-html-render ol {
          margin-bottom: 16px;
          padding-left: 24px;
        }
        .walkthrough-html-render li {
          margin-bottom: 6px;
        }
      `}</style>

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

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Settings />}
          onClick={() => navigate('/admin/walkthrough')}
          sx={{ fontWeight: 800, borderRadius: '8px', border: '1.5px solid' }}
        >
          Go to CMS Editor 🛠️
        </Button>
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
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, letterSpacing: -0.5 }}>
                SELECT VERSION
              </Typography>

              <TextField
                select
                label="Game Version"
                value={gameVersion}
                onChange={(e) => {
                  setGameVersion(e.target.value);
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

              <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 4, mb: 1.5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Chapters list
              </Typography>
              <Divider sx={{ mb: 1 }} />

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={24} /></Box>
              ) : chapters.length === 0 ? (
                <Box sx={{ py: 6, textAlign: 'center', opacity: 0.5 }}>
                  <ImportContacts sx={{ fontSize: 40, mb: 1, opacity: 0.6 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>No chapters found</Typography>
                  <Typography variant="caption">Trang hướng dẫn cho bản game này chưa được cập nhật.</Typography>
                </Box>
              ) : (
                <List sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '480px' }}>
                  {chapters.map((chapter: any) => {
                    const isActive = selectedChapterId === chapter.id;
                    return (
                      <ListItemButton
                        key={chapter.id}
                        onClick={() => setSelectedChapterId(chapter.id)}
                        sx={{
                          borderRadius: '12px',
                          mb: 1,
                          py: 1.5,
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
                            <Typography sx={{ fontWeight: isActive ? 800 : 600, fontSize: '0.88rem' }}>
                              {chapter.chapterTitle}
                            </Typography>
                          }
                        />
                        <NavigateNext fontSize="small" sx={{ opacity: isActive ? 1 : 0.3 }} />
                      </ListItemButton>
                    );
                  })}
                </List>
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
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: '6px', bgcolor: alpha(gameColor, 0.2), border: `1px solid ${alpha(gameColor, 0.4)}` }}>
                      <Typography variant="caption" sx={{ color: gameColor, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Chapter {activeChapter.order}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 950, letterSpacing: -0.5 }}>
                      {activeChapter.chapterTitle}
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 4, opacity: 0.1 }} />

                  {/* Sanitized HTML Output Canvas */}
                  <div
                    dangerouslySetInnerHTML={{ __html: cleanHTML }}
                    className="walkthrough-html-render"
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
