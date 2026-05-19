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
    if (c === '#eab308' || c === '#fbbf24' || c === '#a5f3fc' || c === '#e5e7eb' || c === '#ffffff' || c === '#facc15') {
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
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navText}>{item.text}</span>
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

  return (
    <div className={styles.appContainer}>
      
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

                return (
                  <button
                    id="game-version-selector-btn"
                    className={styles.versionBtn}
                    onClick={() => setVersionDialogOpen(true)}
                    style={{
                      background: isPair ? 'transparent' : styleInfo.bg,
                      '--v-bg': isPair ? 'transparent' : styleInfo.bg,
                      '--v-text': styleInfo.text,
                      '--v-shadow': styleInfo.shadow,
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
                          background: styleInfo.c1 || '#6366f1',
                          padding: '0 8px'
                        }}>
                          <span style={{ fontWeight: 800, fontSize: '11px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{game1Label.toUpperCase()}</span>
                        </div>
                        {/* Right Half */}
                        <div style={{
                          width: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          background: styleInfo.c2 || '#6366f1',
                          padding: '0 8px'
                        }}>
                          <span style={{ fontWeight: 800, fontSize: '11px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{game2Label.toUpperCase()}</span>
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
