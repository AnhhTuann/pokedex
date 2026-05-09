import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Tooltip, Stack, Switch, FormControlLabel,
  useTheme, Divider, alpha, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid
} from '@mui/material';
import {
  Menu, CatchingPokemon, FlashOn, Psychology, Backpack, Map, Category,
  SelfImprovement, VideogameAsset, WbSunny, DarkMode, SportsEsports, PlaylistAddCheck, SportsKabaddi, AutoStories
} from '@mui/icons-material';
import { useColorMode } from '../main';
import { useTeamStore } from '../lib/teamStore';
import GameModal from './GameModal';
import { VERSION_COLORS, GENERATION_VERSIONS } from '../App';

const DRAWER_WIDTH = 260;

const MENU_ITEMS = [
  { text: 'Pokédex', path: '/', icon: <CatchingPokemon /> },
  { text: 'Catch Tracker', path: '/tracker', icon: <PlaylistAddCheck /> },
  { text: 'Move Dex', path: '/moves', icon: <FlashOn /> },
  { text: 'Ability Dex', path: '/abilities', icon: <Psychology /> },
  { text: 'Item Dex', path: '/items', icon: <Backpack /> },
  { text: 'Location Dex', path: '/locations', icon: <Map /> },
  { text: 'Type Dex', path: '/types', icon: <Category /> },
  { text: 'Nature Dex', path: '/natures', icon: <SelfImprovement /> },
  { text: 'Team Builder', path: '/teambuilder', icon: <SportsEsports /> },
  { text: 'Damage Calc', path: '/calculator', icon: <SportsKabaddi /> },
  { text: 'Walkthroughs', path: '/walkthrough', icon: <AutoStories /> },
];

export default function MainLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMainDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === 'dark';

  const { isShinyMode, toggleShinyMode, selectedVersion, setSelectedVersion } = useTeamStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuList = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      {/* Brand Header */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 64 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 950,
            letterSpacing: '-1.5px',
            color: 'primary.main',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '1.4rem'
          }}
        >
          <CatchingPokemon sx={{ color: 'primary.main', fontSize: 28 }} />
          Pókédex Wiki
        </Typography>
      </Box>
      <Divider sx={{ opacity: 0.1 }} />

      {/* Nav Menu */}
      <List sx={{ px: 2, py: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  px: 2,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: isActive
                    ? alpha(theme.palette.primary.main, 0.12)
                    : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.16)
                      : alpha(theme.palette.action.hover, 0.04),
                    color: isActive ? 'primary.main' : 'text.primary',
                    transform: 'translateX(4px)',
                  },
                  // Border accent
                  ...(isActive && {
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      height: '60%',
                      width: '4px',
                      borderRadius: '4px',
                      backgroundColor: theme.palette.primary.main,
                    }
                  })
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'text.disabled',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: isActive ? 800 : 600, fontSize: '0.9rem', letterSpacing: '0.2px' }}>
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Signature */}
      <Box sx={{ p: 3, textAlign: 'center', opacity: 0.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
          Console v2.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      
      {/* ── AppBar Header ── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: isDark ? 'rgba(15,15,26,0.85)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.appBar
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {/* Hamburger Button for mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
            >
              <Menu />
            </IconButton>

            {/* Current Section Title */}
            <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', textTransform: 'uppercase', letterSpacing: -0.5 }}>
              {MENU_ITEMS.find((m) => m.path === location.pathname)?.text || 'Wiki'}
            </Typography>
          </Stack>

          {/* Quick Global Switchers */}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {isMainDex && (
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                {/* Game Version Dialog Trigger */}
                <Button
                  id="game-version-selector-btn"
                  variant="contained"
                  startIcon={<VideogameAsset />}
                  onClick={() => setVersionDialogOpen(true)}
                  sx={{
                    bgcolor: selectedVersion === 'ALL' ? 'grey.800' : VERSION_COLORS[selectedVersion] || 'primary.main',
                    color: (selectedVersion === 'white' || selectedVersion === 'white-2') ? '#000' : '#fff',
                    fontWeight: 800,
                    px: 2,
                    height: 38,
                    borderRadius: '19px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    boxShadow: selectedVersion !== 'ALL' ? `0 0 12px ${VERSION_COLORS[selectedVersion]}` : 'none',
                    '&:hover': {
                      bgcolor: selectedVersion === 'ALL' ? 'grey.900' : VERSION_COLORS[selectedVersion] || 'primary.dark',
                      filter: 'brightness(1.15)',
                      boxShadow: selectedVersion !== 'ALL' ? `0 0 20px ${VERSION_COLORS[selectedVersion]}` : 'none',
                    }
                  }}
                >
                  {selectedVersion === 'ALL' ? 'ALL VERSIONS' : `Version: ${selectedVersion}`}
                </Button>

                {/* Shiny Mode switch */}
                <FormControlLabel
                  id="global-shiny-toggle"
                  control={
                    <Switch
                      checked={isShinyMode}
                      onChange={toggleShinyMode}
                      color="secondary"
                      size="small"
                      sx={{
                        "& .MuiSwitch-thumb": {
                          bgcolor: isShinyMode ? "#f59e0b" : undefined,
                          boxShadow: isShinyMode ? "0 0 10px #f59e0b" : undefined,
                        }
                      }}
                    />
                  }
                  label={
                    <Typography variant="caption" sx={{ fontWeight: 800, color: isShinyMode ? 'secondary.main' : 'text.disabled', letterSpacing: 0.5 }}>
                      ✨ SHINY
                    </Typography>
                  }
                  sx={{ mr: 1, display: { xs: 'none', sm: 'flex' } }}
                />
              </Stack>
            )}

            {/* Game & Theme switches */}
            <Tooltip title="Who's That Pokémon? 🎮">
              <IconButton
                id="open-game-btn"
                onClick={() => setGameOpen(true)}
                sx={{
                  bgcolor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'primary.main', color: '#fff' },
                }}
                size="small"
              >
                <SportsEsports fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
              <IconButton onClick={toggleColorMode} sx={{ color: 'text.secondary' }} size="small">
                {isDark ? <WbSunny fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* ── Sidebar Drawers ── */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {/* Mobile Temporary Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: '4px 0 24px rgba(0,0,0,0.15)'
            }
          }}
        >
          {menuList}
        </Drawer>

        {/* Desktop Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
            }
          }}
          open
        >
          {menuList}
        </Drawer>
      </Box>

      {/* ── Main Routing View Body ── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          pt: 11 // Padding top to avoid header overlay
        }}
      >
        <Outlet />
      </Box>

      {/* Game Modals & Version selector overlay (Rendered universally over any page) */}
      {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}

      <Dialog
        open={versionDialogOpen}
        onClose={() => setVersionDialogOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              bgcolor: isDark ? "background.paper" : "#f8fafc",
              boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.25rem", pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideogameAsset color="primary" /> SELECT GAME VERSION
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            p: 3,
            maxHeight: '65vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
              borderRadius: '10px',
              '&:hover': {
                background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
              }
            }
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedVersion('ALL');
                setVersionDialogOpen(false);
              }}
              sx={{
                width: '280px',
                height: '48px',
                fontWeight: 900,
                fontSize: '0.95rem',
                borderRadius: '12px',
                letterSpacing: '0.1em',
                borderColor: selectedVersion === 'ALL' ? 'primary.main' : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
                color: selectedVersion === 'ALL' ? '#fff' : 'text.primary',
                background: selectedVersion === 'ALL' 
                  ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                  : 'transparent',
                boxShadow: selectedVersion === 'ALL' ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}` : 'none',
                border: selectedVersion === 'ALL' ? 'none' : `1.5px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: selectedVersion === 'ALL' 
                    ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                    : alpha(theme.palette.primary.main, 0.08),
                  borderColor: 'primary.main',
                  transform: 'scale(1.02) translateY(-1px)',
                  boxShadow: selectedVersion === 'ALL' ? `0 12px 28px ${alpha(theme.palette.primary.main, 0.45)}` : `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                }
              }}
            >
              ALL VERSIONS
            </Button>
          </Box>

          <Stack spacing={4}>
            {GENERATION_VERSIONS.map((g) => (
              <Box key={g.gen}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      color: 'text.secondary',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      whiteSpace: 'nowrap',
                      opacity: 0.8
                    }}
                  >
                    {g.gen}
                  </Typography>
                  <Divider sx={{ flex: 1, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />
                </Box>
                <Grid container spacing={1.5}>
                  {g.games.map((game) => {
                    const isActive = selectedVersion.toLowerCase() === game.name.toLowerCase();
                    let vColor = VERSION_COLORS[game.name] || '#6366f1';
                    
                    if (vColor.toLowerCase() === '#000000' || vColor === 'black' || vColor === '#000') {
                      vColor = '#555555';
                    }

                    return (
                      <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={game.name}>
                        <Button
                          fullWidth
                          onClick={() => {
                            setSelectedVersion(game.name);
                            setVersionDialogOpen(false);
                          }}
                          sx={{
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                            borderRadius: '10px',
                            border: isActive ? `2px solid ${vColor}` : `2px solid ${alpha(vColor, 0.5)}`,
                            color: '#ffffff',
                            bgcolor: isActive ? alpha(vColor, 0.45) : alpha(vColor, 0.15),
                            boxShadow: isActive ? `0 6px 20px ${alpha(vColor, 0.5)}` : 'none',
                            textTransform: 'capitalize',
                            height: '42px',
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                              bgcolor: alpha(vColor, 0.3),
                              borderColor: vColor,
                              borderStyle: 'solid',
                              borderWidth: '2px',
                              transform: 'scale(1.03) translateY(-1px)',
                              boxShadow: `0 4px 12px ${alpha(vColor, 0.35)}`,
                            }
                          }}
                        >
                          {game.label}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setVersionDialogOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
