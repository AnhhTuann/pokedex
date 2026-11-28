import React, { useState, useEffect, useLayoutEffect, useRef, Suspense } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
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
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useColorMode } from '../main';
import { useAuthStore } from '../lib/authStore';
import { useTeamStore } from '../lib/teamStore';
import { useIsAdmin } from '../hooks/useIsAdmin';
import GameModal from './GameModal';
import UpdateNotifier from './UpdateNotifier';
import { VERSION_COLORS, GENERATION_VERSIONS, getVersionDisplayName, getVersionColorStyle, getContrastTextColor } from '../App';
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

function getLightModeInactiveColor(gameName: string, vColor: string): string {
  const nameLower = gameName.toLowerCase();
  if (nameLower === 'yellow' || nameLower === 'lets-go-pikachu') return '#92700c';
  if (nameLower === 'gold' || nameLower === 'heartgold') return '#8a6d18';
  if (['silver', 'platinum', 'white', 'white-2', 'soulsilver', 'crystal', 'pearl'].includes(nameLower)) return '#475569';
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

  const versionDialog = useRef<HTMLDialogElement>(null);
  const navigationDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const closeOnDesktop = () => { if (!media.matches) setMobileOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  useLayoutEffect(() => {
    const dialog = mobileOpen ? navigationDialog.current : versionDialogOpen ? versionDialog.current : null;
    if (!dialog) return;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [mobileOpen, versionDialogOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setVersionDialogOpen(false);
    setGameOpen(false);
  }, [location.pathname]);

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
                <Link
                  key={item.text}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(styles.navButton, isActive && styles.navButtonActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.text}</span>
                </Link>
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

    </>
  );

  return (
    <div className={styles.appContainer}>
      {isAdmin && <UpdateNotifier />}

      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <aside
        id="desktop-navigation"
        className={cn(styles.sidebar, isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed)}
        aria-label="Sidebar"
        inert={!isSidebarOpen}
      >
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <dialog
          id="mobile-navigation"
          ref={navigationDialog}
          className={styles.navigationDialog}
          aria-label="Navigation menu"
          onCancel={() => setMobileOpen(false)}
          onClick={event => { if (event.target === event.currentTarget) setMobileOpen(false); }}
        >
          <div className={styles.navigationPanel}>
            <button type="button" className={styles.navigationClose} onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
              <X size={20} />
            </button>
            {sidebarContent}
          </div>
        </dialog>
      )}

      <header className={cn(styles.header, isSidebarOpen ? styles.headerWithSidebar : styles.headerFull)}>
        <div className={styles.leftGroup}>
          <button
            className={cn(styles.menuToggle, styles.mobileToggle)}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-haspopup="dialog"
            aria-controls={mobileOpen ? "mobile-navigation" : undefined}
          >
            <MenuIcon size={20} />
          </button>

          <button
            className={cn(styles.menuToggle, styles.desktopToggle)}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isSidebarOpen}
            aria-controls="desktop-navigation"
          >
            <MenuIcon size={20} />
          </button>

          <span className={styles.title}>{currentTitle}</span>
        </div>

        <div className={styles.rightGroup}>
          {isMainDex && (
            <>
              <button
                id="game-version-selector-btn"
                type="button"
                className={styles.versionTrigger}
                onClick={() => setVersionDialogOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={versionDialogOpen}
                aria-label={`Select game version. Current: ${getVersionDisplayName(selectedVersion)}`}
              >
                <span className={styles.versionSwatch} style={{ background: getVersionColorStyle(selectedVersion).bg }} />
                <span className={styles.versionLabel}>{getVersionDisplayName(selectedVersion)}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              <label id="global-shiny-toggle" className={styles.switchLabel}>
                <Sparkles size={16} aria-hidden="true" />
                <span className={cn(styles.switchText, isShinyMode && styles.active)}>Shiny</span>
                <span className={styles.switch}>
                  <input type="checkbox" checked={isShinyMode} onChange={toggleShinyMode} aria-label="Toggle shiny sprites" />
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

      <main id="main-content" tabIndex={-1} className={cn(styles.mainContent, isSidebarOpen ? styles.mainWithSidebar : styles.mainFull)}>
        <Suspense fallback={<p className={styles.routeLoading} role="status">Loading page…</p>}>
          <Outlet />
        </Suspense>
      </main>

      {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}

      {versionDialogOpen && (
        <dialog ref={versionDialog} className={styles.versionDialog} onClick={event => { if (event.target === event.currentTarget) setVersionDialogOpen(false); }} onCancel={() => setVersionDialogOpen(false)} aria-labelledby="version-dialog-title">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 id="version-dialog-title" className={styles.modalTitle}>
                  <Gamepad2 size={22} />
                  <span>Select Game Version</span>
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                  Current: <strong style={{ color: 'var(--text-primary)' }}>{getVersionDisplayName(selectedVersion)}</strong>
                </p>
              </div>
              <button className={styles.modalCloseBtn} onClick={() => setVersionDialogOpen(false)} aria-label="Close version selector">
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => { setSelectedVersion('ALL'); setVersionDialogOpen(false); }}
                  className={cn(styles.allVersionsBtn, selectedVersion !== 'ALL' && styles.unselected)}
                  aria-pressed={selectedVersion === 'ALL'}
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
                              const contrastColor = getContrastTextColor(vColor);
                              return (
                                <button
                                  key={game.name}
                                  onClick={() => { setSelectedVersion(game.name); setVersionDialogOpen(false); }}
                                  className={cn(styles.gameButton, isActive && styles.gameButtonActive)}
                                  aria-pressed={isActive}
                                  aria-label={`${game.label}${isActive ? ' (selected)' : ''}`}
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
        </dialog>
      )}
    </div>
  );
}
