import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { cn } from '../lib/utils';
import {
  Menu as MenuIcon,
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
  User,
  Shield,
  Dna,
  Calculator,
} from 'lucide-react';
import { useColorMode } from '../main';
import { useAuthStore } from '../lib/authStore';
import { useTeamStore } from '../lib/teamStore';
import { useIsAdmin } from '../hooks/useIsAdmin';
import GameModal from './GameModal';
import UpdateNotifier from './UpdateNotifier';
import { VERSION_COLORS, GENERATION_VERSIONS, getVersionDisplayName, getVersionColorStyle } from '../App';
import styles from '../styles/components/MainLayout.module.scss';

const PokeballIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
  </svg>
);

type NavItem = { text: string; path: string; icon: React.ReactNode };

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: 'Encyclopedia',
    items: [
      { text: 'Pokédex', path: '/', icon: <PokeballIcon size={18} /> },
      { text: 'Moves', path: '/moves', icon: <Flame size={18} /> },
      { text: 'Abilities', path: '/abilities', icon: <Brain size={18} /> },
      { text: 'Items', path: '/items', icon: <ShoppingBag size={18} /> },
      { text: 'Locations', path: '/locations', icon: <MapIcon size={18} /> },
      { text: 'Types', path: '/types', icon: <GridIcon size={18} /> },
      { text: 'Natures', path: '/natures', icon: <Dna size={18} /> },
    ],
  },
  {
    label: 'Trainer Tools',
    items: [
      { text: 'Team Builder', path: '/teambuilder', icon: <Gamepad2 size={18} /> },
      { text: 'Damage Calc', path: '/calculator', icon: <Calculator size={18} /> },
      { text: 'Catch Tracker', path: '/tracker', icon: <ListChecks size={18} /> },
    ],
  },
  {
    label: 'Adventure',
    items: [
      { text: 'Walkthroughs', path: '/walkthrough', icon: <BookOpen size={18} /> },
    ],
  },
];

function hexToRgb(hex: string): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const num = parseInt(c, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

function getContrastColor(color: string) {
  const c = color.toLowerCase();
  if (['#eab308', '#fbbf24', '#a5f3fc', '#e5e7eb', '#f3f4f6', '#ffffff', '#facc15', '#a9b0b3', '#f5c518', '#d4af37'].includes(c)) {
    return '#0f172a';
  }
  return '#ffffff';
}

function getLightModeInactiveColor(gameName: string, vColor: string): string {
  const nameLower = gameName.toLowerCase();
  if (nameLower === 'yellow' || nameLower === 'lets-go-pikachu') return '#92700c';
  if (nameLower === 'gold' || nameLower === 'heartgold') return '#8a6d18';
  if (['silver', 'platinum', 'white', 'white-2', 'soulsilver'].includes(nameLower)) return '#475569';
  return vColor;
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';
  const { user } = useAuthStore();
  const { isAdmin } = useIsAdmin();
  const { isShinyMode, toggleShinyMode, selectedVersion, setSelectedVersion } = useTeamStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  const allNavItems = NAV_GROUPS.flatMap((g) => g.items);
  if (isAdmin) {
    allNavItems.push({ text: 'Admin Walkthrough', path: '/admin/walkthrough', icon: <Shield size={18} /> });
  }
  const currentTitle = allNavItems.find((m) => location.pathname === m.path)?.text
    || (location.pathname === '/dashboard' ? 'Dashboard' : location.pathname === '/login' ? 'Login' : location.pathname === '/register' ? 'Register' : 'Elite Pokédex');

  const sidebarContent = (
    <>
      <div className={styles.brandHeader}>
        <div className={styles.brandLogo}>
          <PokeballIcon size={20} />
        </div>
        <span className={styles.brandText}>Elite Pokédex</span>
      </div>

      <div className={styles.divider} />

      <nav className={styles.navMenu} aria-label="Primary navigation">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className={styles.navGroup}>
            <div className={styles.navGroupLabel}>{group.label}</div>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.text}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  className={cn(styles.navButton, isActive && styles.navButtonActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.text}</span>
                </button>
              );
            })}
          </div>
        ))}

        <div className={styles.navGroup}>
          <div className={styles.navGroupLabel}>Account</div>
          <button
            onClick={() => { navigate(user ? '/dashboard' : '/login'); setMobileOpen(false); }}
            className={cn(styles.navButton, (location.pathname === '/dashboard' || location.pathname === '/login' || location.pathname === '/register') && styles.navButtonActive)}
            aria-current={(location.pathname === '/dashboard' || location.pathname === '/login' || location.pathname === '/register') ? 'page' : undefined}
          >
            <span className={styles.navIcon}><User size={18} /></span>
            <span className={styles.navText}>{user ? 'Dashboard' : 'Sign In'}</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => { navigate('/admin/walkthrough'); setMobileOpen(false); }}
              className={cn(styles.navButton, location.pathname === '/admin/walkthrough' && styles.navButtonActive)}
              aria-current={location.pathname === '/admin/walkthrough' ? 'page' : undefined}
            >
              <span className={styles.navIcon}><Shield size={18} /></span>
              <span className={styles.navText}>Admin</span>
            </button>
          )}
        </div>
      </nav>

      <div className={styles.divider} />
      <div className={styles.footerSignature}>V2 Redesign</div>
    </>
  );

  return (
    <div className={styles.appContainer}>
      <UpdateNotifier />

      <div
        className={cn(styles.sidebarOverlay, mobileOpen && styles.mobileOpen)}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={cn(
          styles.sidebar,
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
          mobileOpen && styles.mobileOpen
        )}
        aria-label="Sidebar"
      >
        {sidebarContent}
      </aside>

      <header className={cn(styles.header, isSidebarOpen ? styles.headerWithSidebar : styles.headerFull)}>
        <div className={styles.leftGroup}>
          <button
            className={cn(styles.menuToggle, styles.mobileToggle)}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <MenuIcon size={20} />
          </button>

          <button
            className={cn(styles.menuToggle, styles.desktopToggle)}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isSidebarOpen}
          >
            <MenuIcon size={20} />
          </button>

          <h1 className={styles.title}>{currentTitle}</h1>
        </div>

        <div className={styles.rightGroup}>
          {isMainDex && (
            <>
              {(() => {
                const styleInfo = getVersionColorStyle(selectedVersion);
                const isPair = String(styleInfo.bg).toLowerCase().includes('gradient');
                const displayName = getVersionDisplayName(selectedVersion);
                const [game1Label, game2Label] = isPair ? displayName.split(' / ') : ['', ''];
                const getLightModeHeaderColor = (color: string): string => {
                  const c = color.toLowerCase();
                  const overrides: Record<string, string> = {
                    '#e3350d': '#B91C1C', '#1b53ba': '#1D4ED8', '#f5c518': '#B8860B', '#d4af37': '#B8860B',
                    '#4fc1e9': '#0369A1', '#c0392b': '#991B1B', '#0f52ba': '#1E40AF', '#00a86b': '#047857',
                    '#ff4500': '#C2410C', '#32cd32': '#15803D', '#5dade2': '#0369A1', '#ff8fa3': '#BE185D',
                    '#8a9597': '#475569', '#b8860b': '#92400E', '#708090': '#334155', '#1abfff': '#0369A1',
                    '#ff007f': '#BE185D', '#ea580c': '#C2410C', '#1e40af': '#1E3A8A',
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
                    aria-haspopup="dialog"
                    aria-expanded={versionDialogOpen}
                    style={{
                      background: isPair ? 'transparent' : resolvedBg,
                      color: getContrastColor(resolvedBg),
                      boxShadow: isDark ? 'none' : '0 1px 2px rgba(0,0,0,0.08)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      padding: isPair ? 0 : '0 14px',
                      border: '1px solid rgba(255,255,255,0.14)',
                    } as React.CSSProperties}
                  >
                    {isPair ? (
                      <div style={{ display: 'flex', width: '100%', alignItems: 'stretch', minWidth: 220, position: 'relative' }}>
                        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: resolvedC1, padding: '0 8px', color: getContrastColor(resolvedC1) }}>
                          <span style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{game1Label.toUpperCase()}</span>
                        </div>
                        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: resolvedC2, padding: '0 8px', color: getContrastColor(resolvedC2) }}>
                          <span style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{game2Label.toUpperCase()}</span>
                        </div>
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.25)', transform: 'translateX(-50%)' }} />
                      </div>
                    ) : (
                      <span style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {selectedVersion === 'ALL' ? 'ALL VERSIONS' : getVersionDisplayName(selectedVersion).toUpperCase()}
                      </span>
                    )}
                  </button>
                );
              })()}

              <label id="global-shiny-toggle" className={styles.switchLabel}>
                <span className={cn(styles.switchText, isShinyMode && styles.active)}>Shiny</span>
                <span className={styles.switch}>
                  <input type="checkbox" checked={isShinyMode} onChange={toggleShinyMode} aria-label="Toggle shiny sprites" />
                  <span className={styles.slider} />
                </span>
              </label>
            </>
          )}

          <button
            id="open-game-btn"
            className={styles.actionIconBtn}
            onClick={() => setGameOpen(true)}
            title="Who's That Pokémon?"
            aria-label="Open Who's That Pokémon game"
          >
            <Gamepad2 size={18} />
          </button>

          <button
            className={styles.actionIconBtn}
            onClick={() => navigate(user ? '/dashboard' : '/login')}
            title={user ? 'Dashboard' : 'Login'}
            aria-label={user ? 'Open dashboard' : 'Open login'}
          >
            <User size={18} />
          </button>

          <button
            className={styles.themeBtn}
            onClick={toggleColorMode}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className={cn(styles.mainContent, isSidebarOpen ? styles.mainWithSidebar : styles.mainFull)}>
        <Outlet />
      </main>

      {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}

      {versionDialogOpen && (
        <div className={styles.modalOverlay} onClick={() => setVersionDialogOpen(false)} role="dialog" aria-modal="true" aria-label="Select game version">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <Gamepad2 size={22} />
                <span>Select Game Version</span>
              </h2>
              <button className={styles.modalCloseBtn} onClick={() => setVersionDialogOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => { setSelectedVersion('ALL'); setVersionDialogOpen(false); }}
                  className={cn(styles.allVersionsBtn, selectedVersion !== 'ALL' && styles.unselected)}
                >
                  All Versions
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {GENERATION_VERSIONS.map((g) => (
                  <div key={g.gen} className={styles.genSection}>
                    <div className={styles.genHeader}>
                      <span className={styles.genTitle}>{g.gen}</span>
                      <div className={styles.genDivider} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {g.rows.map((row, rowIdx) => {
                        const isPair = row.type === 'pair' && row.games.length === 2;
                        return (
                          <div key={rowIdx} className={styles.gameGrid} style={!isPair ? { gridTemplateColumns: '1fr' } : undefined}>
                            {row.games.map((game) => {
                              const isActive = selectedVersion.toLowerCase() === game.name.toLowerCase();
                              let vColor = VERSION_COLORS[game.name] || '#6366f1';
                              if (vColor.toLowerCase() === '#000000' || vColor === 'black' || vColor === '#000') vColor = '#555555';
                              const contrastColor = getContrastColor(vColor);
                              return (
                                <button
                                  key={game.name}
                                  onClick={() => { setSelectedVersion(game.name); setVersionDialogOpen(false); }}
                                  className={cn(styles.gameButton, isActive && styles.gameButtonActive)}
                                  style={{
                                    background: isActive ? vColor : (isDark ? 'var(--bg-elevated)' : `rgba(${hexToRgb(vColor)}, 0.08)`),
                                    borderColor: isActive ? vColor : (isDark ? 'var(--border-main)' : `rgba(${hexToRgb(vColor)}, 0.22)`),
                                    color: isActive ? contrastColor : (isDark ? 'var(--text-primary)' : getLightModeInactiveColor(game.name, vColor)),
                                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                                  } as React.CSSProperties}
                                >
                                  <span
                                    className={styles.gameDot}
                                    style={{ backgroundColor: isActive ? contrastColor : vColor }}
                                  />
                                  <span>{game.label}</span>
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

            <div className={styles.modalFooter}>
              <button onClick={() => setVersionDialogOpen(false)} className={styles.cancelBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
