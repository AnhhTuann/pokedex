import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { cn } from '../lib/utils';
import {
  Menu as MenuIcon,
  Search,
  ListChecks,
  Flame,
  Brain,
  ShoppingBag,
  Map as MapIcon,
  Grid as GridIcon,
  Heart,
  Gamepad2,
  Swords,
  BookOpen,
  Sun,
  Moon,
  X,
  Sparkles
} from 'lucide-react';
import { useColorMode } from '../main';
import { useTeamStore } from '../lib/teamStore';
import GameModal from './GameModal';
import { VERSION_COLORS, GENERATION_VERSIONS, getVersionDisplayName, getVersionColorStyle } from '../App';
import styles from '../styles/components/MainLayout.module.scss';

// ─── Custom Pokeball SVG Icon ─────────────────────────────
const PokeballIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
  </svg>
);

const MENU_ITEMS = [
  { text: 'Pokédex', path: '/', icon: <PokeballIcon size={20} /> },
  { text: 'Catch Tracker', path: '/tracker', icon: <ListChecks size={20} /> },
  { text: 'Move Dex', path: '/moves', icon: <Flame size={20} /> },
  { text: 'Ability Dex', path: '/abilities', icon: <Brain size={20} /> },
  { text: 'Item Dex', path: '/items', icon: <ShoppingBag size={20} /> },
  { text: 'Location Dex', path: '/locations', icon: <MapIcon size={20} /> },
  { text: 'Type Dex', path: '/types', icon: <GridIcon size={20} /> },
  { text: 'Nature Dex', path: '/natures', icon: <Heart size={20} /> },
  { text: 'Team Builder', path: '/teambuilder', icon: <Gamepad2 size={20} /> },
  { text: 'Damage Calc', path: '/calculator', icon: <Swords size={20} /> },
  { text: 'Walkthroughs', path: '/walkthrough', icon: <BookOpen size={20} /> },
];

// Helper to convert hex to rgb string for modern neon shadow variables
function hexToRgb(hex: string): string {
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const num = parseInt(c, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

const MENU_COLORS: Record<string, string> = {
  '/': '#E3350D',
  '/tracker': '#4CAF50',
  '/moves': '#FF9800',
  '/abilities': '#9C27B0',
  '/items': '#FFC107',
  '/locations': '#009688',
  '/types': '#3F51B5',
  '/natures': '#E91E63',
  '/teambuilder': '#2196F3',
  '/calculator': '#D32F2F',
  '/walkthrough': '#00BCD4',
};

function getRouteColor(pathname: string): string {
  if (pathname.startsWith('/tracker')) return '#4CAF50';
  if (pathname.startsWith('/moves')) return '#FF9800';
  if (pathname.startsWith('/abilities')) return '#9C27B0';
  if (pathname.startsWith('/items')) return '#FFC107';
  if (pathname.startsWith('/locations')) return '#009688';
  if (pathname.startsWith('/types')) return '#3F51B5';
  if (pathname.startsWith('/natures')) return '#E91E63';
  if (pathname.startsWith('/teambuilder')) return '#2196F3';
  if (pathname.startsWith('/calculator')) return '#D32F2F';
  if (pathname.startsWith('/walkthrough') || pathname.startsWith('/admin')) return '#00BCD4';
  return '#E3350D'; // Fallback to Pokédex (root / and /pokemon)
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';

  const { isShinyMode, toggleShinyMode, selectedVersion, setSelectedVersion } = useTeamStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getContrastColor = (color: string) => {
    const c = color.toLowerCase();
    if (
      c === '#eab308' || 
      c === '#fbbf24' || 
      c === '#a5f3fc' || 
      c === '#e5e7eb' || 
      c === '#f3f4f6' || 
      c === '#ffffff' || 
      c === '#facc15' || 
      c === '#a9b0b3'
    ) {
      return '#0f172a';
    }
    return '#ffffff';
  };

  const getLightModeInactiveColor = (gameName: string, vColor: string): string => {
    const nameLower = gameName.toLowerCase();
    if (nameLower === "yellow" || nameLower === "lets-go-pikachu") return "#a17a00";
    if (nameLower === "gold" || nameLower === "heartgold") return "#9a7d1c";
    if (nameLower === "silver" || nameLower === "platinum" || nameLower === "white" || nameLower === "white-2" || nameLower === "soulsilver") {
      return "#475569";
    }
    return vColor;
  };

  // Build the sidebar inner content
  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className={styles.brandHeader}>
        <div className={styles.brandLogo}>
          <PokeballIcon size={28} />
        </div>
        <span className={styles.brandText}>Pokédex Wiki</span>
      </div>
      
      <div className={styles.divider} />

      {/* Nav Menu */}
      <nav className={styles.navMenu}>
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const itemColor = MENU_COLORS[item.path] || '#6366f1';
          const itemRgb = hexToRgb(itemColor);

          return (
            <button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={cn(
                styles.navButton,
                isActive && styles.navButtonActive
              )}
              style={{
                '--primary': itemColor,
                '--primary-rgb': itemRgb,
              } as React.CSSProperties}
            >
              <span 
                className={styles.navIcon}
                style={{
                  color: isActive ? itemColor : `rgba(${itemRgb}, 0.55)`,
                  filter: isActive ? `drop-shadow(0 0 6px rgba(${itemRgb}, 0.4))` : 'none'
                }}
              >
                {item.icon}
              </span>
              <span 
                className={styles.navText}
                style={{
                  color: isActive ? itemColor : undefined
                }}
              >
                {item.text}
              </span>
            </button>
          );
        })}
      </nav>

      <div className={styles.divider} />

      {/* Footer Signature */}
      <div className={styles.footerSignature}>
        Console v3.2
      </div>
    </>
  );

  const currentVersionColor = VERSION_COLORS[selectedVersion] || '#6366f1';
  const currentVersionText = getContrastColor(currentVersionColor);
  const currentVersionShadow = `rgba(${hexToRgb(currentVersionColor)}, 0.35)`;

  const activeColor = getRouteColor(location.pathname);
  const activeRgb = hexToRgb(activeColor);

  return (
    <div 
      className={styles.appContainer}
      style={{
        '--primary': activeColor,
        '--primary-rgb': activeRgb,
        '--glow-primary': isDark 
          ? `0 0 25px rgba(${activeRgb}, 0.55), 0 0 10px rgba(189, 0, 255, 0.35)`
          : `0 0 18px rgba(${activeRgb}, 0.35)`
      } as React.CSSProperties}
    >
      
      {/* ── Mobile Sidebar Overlay ── */}
      <div 
        className={cn(styles.sidebarOverlay, mobileOpen && styles.mobileOpen)} 
        onClick={() => setMobileOpen(false)} 
      />

      {/* ── Fixed Sidebar ── */}
      <aside 
        className={cn(
          styles.sidebar,
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
          mobileOpen && styles.mobileOpen
        )}
      >
        {sidebarContent}
      </aside>

      {/* ── Header Top Navigation Bar ── */}
      <header 
        className={styles.header}
        style={{
          left: isSidebarOpen ? '260px' : '0',
          width: isSidebarOpen ? 'calc(100% - 260px)' : '100vw'
        } as React.CSSProperties}
      >
        <div className={styles.leftGroup}>
          {/* Hamburger Mobile */}
          <button 
            className={cn(styles.menuToggle, styles.mobileToggle)}
            onClick={handleDrawerToggle}
            title="Menu"
          >
            <MenuIcon size={20} />
          </button>

          {/* Sidebar Toggle Desktop */}
          <button 
            className={cn(styles.menuToggle, styles.desktopToggle)}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Toggle Sidebar"
          >
            <MenuIcon size={20} />
          </button>

          {/* Current Page Title */}
          <h1 className={styles.title}>
            {MENU_ITEMS.find((m) => m.path === location.pathname)?.text || 'Wiki'}
          </h1>
        </div>

        {/* Quick Global Switchers */}
        <div className={styles.rightGroup}>
          {isMainDex && (
            <>
              {/* Game Version Button */}
              {(() => {
                const styleInfo = getVersionColorStyle(selectedVersion);
                const isPair = styleInfo.bg.toLowerCase().includes('gradient');
                const displayName = getVersionDisplayName(selectedVersion);
                const [game1Label, game2Label] = isPair ? displayName.split(' / ') : ['', ''];

                // Light Mode header color override helper
                const getLightModeHeaderColor = (color: string): string => {
                  const c = color.toLowerCase();
                  const overrides: Record<string, string> = {
                    '#e3350d': '#B91C1C', // Deep Red
                    '#1b53ba': '#1D4ED8', // Rich Royal Blue
                    '#f5c518': '#B8860B', // Beautiful deep metallic Gold
                    '#d4af37': '#B8860B', // Beautiful deep metallic Gold
                    '#4fc1e9': '#0369A1', // Deep Cyan
                    '#c0392b': '#991B1B', // Rich Ruby
                    '#0f52ba': '#1E40AF', // Deep Royal Sapphire
                    '#00a86b': '#047857', // Deep Emerald
                    '#ff4500': '#B91C1C', // Dark Orange Red
                    '#32cd32': '#15803D', // Deep Green
                    '#5dade2': '#0369A1', // Deep Blue
                    '#ff8fa3': '#BE185D', // Deep Pink
                    '#8a9597': '#475569', // Deep Platinum
                    '#b8860b': '#B8860B', // Keep HeartGold as a rich gold!
                    '#708090': '#334155', // Deep Slate
                    '#1abfff': '#0369A1', // Deep Sky Blue
                    '#ff007f': '#BE185D', // Deep Rose
                    '#ea580c': '#C2410C', // Deep Orange
                    '#1e40af': '#1E3A8A', // Deep Blue
                  };
                  return overrides[c] || c;
                };

                const resolvedC1 = isDark ? (styleInfo.c1 || '#6366f1') : getLightModeHeaderColor(styleInfo.c1 || '#6366f1');
                const resolvedC2 = isDark ? (styleInfo.c2 || '#6366f1') : getLightModeHeaderColor(styleInfo.c2 || '#6366f1');
                const resolvedBg = isDark ? styleInfo.bg : getLightModeHeaderColor(styleInfo.bg);

                return (
                  <button
                    id="game-version-selector-btn"
                    className={styles.versionBtn}
                    onClick={() => setVersionDialogOpen(true)}
                    style={{
                      background: isPair ? 'transparent' : resolvedBg,
                      '--v-bg': isPair ? 'transparent' : resolvedBg,
                      '--v-text': getContrastColor(resolvedBg),
                      '--v-box-shadow': isDark ? `0 0 12px ${styleInfo.shadow}` : '0 4px 10px rgba(0, 0, 0, 0.15)',
                      '--v-box-shadow-hover': isDark ? `0 0 20px ${styleInfo.shadow}` : '0 6px 14px rgba(0, 0, 0, 0.2)',
                      borderRadius: '19px',
                      overflow: 'hidden',
                      isolation: 'isolate',
                      padding: isPair ? 0 : '0 18px',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    } as React.CSSProperties}
                  >
                    {isPair ? (
                      <div style={{ display: 'flex', width: '100%', alignItems: 'center', height: '100%', minWidth: '280px', position: 'relative' }}>
                        {/* Left Half */}
                        <div style={{
                          width: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          background: resolvedC1,
                          padding: '0 8px',
                          color: getContrastColor(resolvedC1)
                        }}>
                          <span style={{ fontWeight: 800, fontSize: '11px', letterSpacing: '0.5px', whiteSpace: 'nowrap', color: getContrastColor(resolvedC1) }}>{game1Label.toUpperCase()}</span>
                        </div>
                        {/* Right Half */}
                        <div style={{
                          width: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          background: resolvedC2,
                          padding: '0 8px',
                          color: getContrastColor(resolvedC2)
                        }}>
                          <span style={{ fontWeight: 800, fontSize: '11px', letterSpacing: '0.5px', whiteSpace: 'nowrap', color: getContrastColor(resolvedC2) }}>{game2Label.toUpperCase()}</span>
                        </div>
                        {/* Symmetrical Split Divider positioned at absolute center */}
                        <div style={{
                          position: 'absolute',
                          left: '50%',
                          top: 0,
                          bottom: 0,
                          transform: 'translateX(-50%)',
                          width: '2px',
                          backgroundColor: 'rgba(0, 0, 0, 0.25)',
                          pointerEvents: 'none',
                          zIndex: 10
                        }} />
                      </div>
                    ) : (
                      <span style={{ fontWeight: 800, fontSize: '11px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                        {selectedVersion === 'ALL'
                          ? 'ALL VERSIONS'
                          : getVersionDisplayName(selectedVersion).toUpperCase()}
                      </span>
                    )}
                  </button>
                );
              })()}

              {/* Shiny Mode switch */}
              <label id="global-shiny-toggle" className={styles.switchLabel}>
                <span className={cn(styles.switchText, isShinyMode && styles.active)}>
                  ✨ SHINY
                </span>
                <span className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={isShinyMode}
                    onChange={toggleShinyMode}
                  />
                  <span className={styles.slider} />
                </span>
              </label>
            </>
          )}

          {/* Minigame Button */}
          <button
            id="open-game-btn"
            className={styles.actionIconBtn}
            onClick={() => setGameOpen(true)}
            title="Who's That Pokémon? 🎮"
          >
            <Gamepad2 size={16} />
          </button>

          {/* Theme Toggle Button */}
          <button 
            className={styles.themeBtn}
            onClick={toggleColorMode}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* ── Main Routing Content Panel ── */}
      <main 
        className={styles.mainContent}
        style={{
          marginLeft: isSidebarOpen ? '260px' : '0',
          width: isSidebarOpen ? 'calc(100% - 260px)' : '100vw'
        } as React.CSSProperties}
      >
        <Outlet />
      </main>

      {/* ── Minigame Overlay ── */}
      {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}

      {/* ── Game Version Dialog Overlay (Custom Modal) ── */}
      {versionDialogOpen && (
        <div className={styles.modalOverlay} onClick={() => setVersionDialogOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <Gamepad2 size={26} />
                <span>SELECT GAME VERSION</span>
              </h2>
              <button className={styles.modalCloseBtn} onClick={() => setVersionDialogOpen(false)}>
                <X size={22} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className={styles.modalBody}>
              {/* All Versions button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <button
                  onClick={() => {
                    setSelectedVersion('ALL');
                    setVersionDialogOpen(false);
                  }}
                  className={cn(
                    styles.allVersionsBtn,
                    selectedVersion !== 'ALL' && styles.unselected
                  )}
                >
                  ALL VERSIONS
                </button>
              </div>

              {/* Generations list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {GENERATION_VERSIONS.map((g) => (
                  <div key={g.gen} className={styles.genSection}>
                    <div className={styles.genHeader}>
                      <span className={styles.genTitle}>{g.gen}</span>
                      <div className={styles.genDivider} />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {g.rows.map((row, rowIdx) => {
                        const isPair = row.type === 'pair' && row.games.length === 2;
                        return (
                          <div key={rowIdx} className={styles.gameGrid} style={!isPair ? { gridTemplateColumns: '1fr' } : undefined}>
                            {row.games.map((game) => {
                              const isActive = selectedVersion.toLowerCase() === game.name.toLowerCase();
                              let vColor = VERSION_COLORS[game.name] || '#6366f1';
                              
                              if (vColor.toLowerCase() === '#000000' || vColor === 'black' || vColor === '#000') {
                                vColor = '#555555';
                              }
                              
                              const contrastColor = getContrastColor(vColor);
                              
                              return (
                                <button
                                  key={game.name}
                                  onClick={() => {
                                    setSelectedVersion(game.name);
                                    setVersionDialogOpen(false);
                                  }}
                                  className={cn(
                                    styles.gameButton,
                                    isActive && styles.gameButtonActive
                                  )}
                                  style={
                                    {
                                      background: isActive 
                                        ? vColor 
                                        : isDark 
                                          ? '#13171F' 
                                          : `rgba(${hexToRgb(vColor)}, 0.08)`,
                                      borderColor: isActive 
                                        ? vColor 
                                        : isDark 
                                          ? vColor 
                                          : `rgba(${hexToRgb(vColor)}, 0.18)`,
                                      color: isActive 
                                        ? contrastColor 
                                        : isDark 
                                          ? '#F1F5F9' 
                                          : getLightModeInactiveColor(game.name, vColor),
                                      boxShadow: isActive 
                                        ? isDark 
                                          ? `0 0 16px rgba(${hexToRgb(vColor)}, 0.45)`
                                          : `0 8px 24px rgba(${hexToRgb(vColor)}, 0.35)`
                                        : 'none',
                                    } as React.CSSProperties
                                  }
                                >
                                  <span 
                                    className={styles.gameDot}
                                    style={
                                      {
                                        backgroundColor: isActive ? contrastColor : vColor,
                                        boxShadow: isDark 
                                          ? `0 0 10px ${vColor}, 0 0 20px ${vColor}`
                                          : `0 0 8px ${vColor}`,
                                      } as React.CSSProperties
                                    }
                                  />
                                  <span>{game.label.toUpperCase()}</span>
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <button 
                onClick={() => setVersionDialogOpen(false)} 
                className={styles.cancelBtn}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
