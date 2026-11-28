import { useState, useMemo, useEffect, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Search, X, ChevronDown, Swords, Sparkles, Shield, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Move } from '../types';
import { getTypeBadgeStyle, capitalizeSlug, cn } from '../lib/utils';
import { useDebounce } from '../hooks/useDebounce';
import { useColorMode } from '../main';
import styles from '../styles/pages/MoveDex.module.scss';

const GET_ALL_MOVES = gql`
  query GetAllMoves($gen: Int, $type: String, $damageClass: String, $limit: Int, $offset: Int, $search: String) {
    getAllMoves(gen: $gen, type: $type, damageClass: $damageClass, limit: $limit, offset: $offset, search: $search) {
      results { name type power accuracy pp generation description effect damageClass }
      totalCount
    }
  }
`;

const fmt = capitalizeSlug;
const TYPE_OPTIONS = ['ALL','normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
const CAT_OPTIONS = [{ value: 'ALL', label: 'All Categories' }, { value: 'physical', label: 'Physical' }, { value: 'special', label: 'Special' }, { value: 'status', label: 'Status' }];
const GEN_OPTIONS = [{ value: 'ALL', label: 'All Generations' }, ...Array.from({ length: 9 }, (_, i) => ({ value: String(i + 1), label: `Generation ${i + 1}` }))];

function DamageIcon({ cls }: { cls: string }) {
  const c = (cls || '').toLowerCase();
  if (c === 'physical') return <Swords size={14} aria-hidden="true" />;
  if (c === 'special') return <Sparkles size={14} aria-hidden="true" />;
  return <Shield size={14} aria-hidden="true" />;
}

function val(v: number | null | undefined, suffix = '') {
  if (v === null || v === undefined) return <span className={styles.na}>—</span>;
  return <>{v}{suffix}</>;
}

export default function MoveDex() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [genFilter, setGenFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [catFilter, setCatFilter] = useState('ALL');
  const [openDrop, setOpenDrop] = useState<'gen' | 'type' | 'cat' | null>(null);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const refs = { gen: useRef<HTMLDivElement>(null), type: useRef<HTMLDivElement>(null), cat: useRef<HTMLDivElement>(null) };
  const limit = 40;

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (openDrop && refs[openDrop].current && !refs[openDrop].current.contains(t)) setOpenDrop(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [openDrop]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [drawerOpen]);

  const queryGen = genFilter === 'ALL' ? null : Number(genFilter);
  const queryType = typeFilter === 'ALL' ? '' : typeFilter;
  const queryCat = catFilter === 'ALL' ? '' : catFilter;

  const { data, loading, error, fetchMore, refetch } = useQuery<{ getAllMoves: { results: Move[]; totalCount: number } }>(GET_ALL_MOVES, {
    variables: { gen: queryGen, type: queryType, damageClass: queryCat, limit, offset: 0, search: debouncedSearch },
    notifyOnNetworkStatusChange: true,
  });

  const movesList = data?.getAllMoves?.results || [];
  const totalCount = data?.getAllMoves?.totalCount || 0;
  const hasMore = movesList.length > 0 && movesList.length < totalCount;
  const activeFilters = [
    genFilter !== 'ALL' ? { key: 'gen', label: `Gen ${genFilter}`, clear: () => setGenFilter('ALL') } : null,
    typeFilter !== 'ALL' ? { key: 'type', label: typeFilter, clear: () => setTypeFilter('ALL') } : null,
    catFilter !== 'ALL' ? { key: 'cat', label: catFilter, clear: () => setCatFilter('ALL') } : null,
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { offset: movesList.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { getAllMoves: { ...prev.getAllMoves, results: [...prev.getAllMoves.results, ...fetchMoreResult.getAllMoves.results] } };
      },
    });
  };

  const clearAll = () => { setSearchTerm(''); setGenFilter('ALL'); setTypeFilter('ALL'); setCatFilter('ALL'); };

  const renderSelect = (
    key: 'gen' | 'type' | 'cat', label: string, value: string, options: { value: string; label: string }[],
    onSelect: (v: string) => void
  ) => (
    <div className={styles.filterGroup} ref={refs[key]}>
      <span className={styles.filterLabel}>{label}</span>
      <div className={styles.selectWrap}>
        <button type="button" className={cn(styles.selectTrigger, openDrop === key && styles.open, value !== 'ALL' && styles.active)} onClick={() => setOpenDrop(openDrop === key ? null : key)} aria-haspopup="listbox" aria-expanded={openDrop === key} aria-label={`Filter by ${label}`}>
          <span className={styles.selectText}>{options.find(o => o.value === value)?.label || value}</span>
          <span className={styles.selectActions}>
            {value !== 'ALL' && <span role="button" tabIndex={0} className={styles.clearBtn} aria-label={`Clear ${label}`} onClick={(e) => { e.stopPropagation(); onSelect('ALL'); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onSelect('ALL'); } }}><X size={14} /></span>}
            <ChevronDown size={16} className={cn(styles.chevron, openDrop === key && styles.rotated)} />
          </span>
        </button>
        {openDrop === key && (
          <div className={styles.dropdown} role="listbox">
            {options.map(o => (
              <button type="button" key={o.value} role="option" aria-selected={value === o.value} className={cn(styles.option, value === o.value && styles.selected)} onClick={() => { onSelect(o.value); setOpenDrop(null); }}>
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Encyclopedia</p>
          <h1 className={styles.title}>Move Dex</h1>
          <p className={styles.desc}>Browse Pokémon moves, damage classes, and battle data.</p>
        </div>
        {!loading && !error && <div className={styles.countBadge}><span className={styles.countNum}>{totalCount}</span><span className={styles.countLabel}>Moves</span></div>}
      </header>

      <section className={styles.toolbar} aria-label="Move search and filters">
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} aria-hidden="true" />
          <input className={styles.searchInput} type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search moves..." aria-label="Search moves by name" />
          {searchTerm && <button type="button" className={styles.searchClear} onClick={() => setSearchTerm('')} aria-label="Clear search"><X size={14} /></button>}
        </div>
        <div className={styles.filtersRow}>
          {renderSelect('gen', 'Generation', genFilter, GEN_OPTIONS, setGenFilter)}
          {renderSelect('type', 'Type', typeFilter, TYPE_OPTIONS.map(t => ({ value: t, label: t === 'ALL' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1) })), setTypeFilter)}
          {renderSelect('cat', 'Category', catFilter, CAT_OPTIONS, setCatFilter)}
        </div>
      </section>

      <div className={styles.resultsBar}>
        <div className={styles.resultsMeta}>
          <SlidersHorizontal size={14} aria-hidden="true" />
          <span>{loading && movesList.length === 0 ? 'Loading moves...' : `${totalCount} result${totalCount === 1 ? '' : 's'}`}</span>
          {activeFilters.length > 0 && <span className={styles.activeCount}>{activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''}</span>}
        </div>
        {(activeFilters.length > 0 || searchTerm) && <button type="button" className={styles.resetBtn} onClick={clearAll}>Clear all</button>}
      </div>
      {activeFilters.length > 0 && (
        <div className={styles.activeFilters}>
          {activeFilters.map(f => (
            <button key={f.key} type="button" className={styles.filterChip} onClick={f.clear} aria-label={`Remove ${f.label} filter`}>
              <span className={styles.chipLabel}>{f.label}</span><X size={12} />
            </button>
          ))}
        </div>
      )}

      {error ? (
        <div className={styles.stateCard} role="alert">
          <ShieldAlert size={20} />
          <div><div className={styles.stateTitle}>Unable to load moves</div><div className={styles.stateDesc}>Check the backend connection and try again.</div></div>
          <button type="button" className={styles.retryBtn} onClick={() => refetch()}>Retry</button>
        </div>
      ) : loading && movesList.length === 0 ? (
        <div className={styles.tableWrap}>
          <div className={styles.skeletonTable}>{Array.from({ length: 10 }).map((_, i) => <div key={i} className={styles.skeletonRow} />)}</div>
        </div>
      ) : movesList.length === 0 ? (
        <div className={styles.stateCard}>
          <Search size={20} />
          <div><div className={styles.stateTitle}>No moves found</div><div className={styles.stateDesc}>Try adjusting your search or filters.</div></div>
          {(activeFilters.length > 0 || searchTerm) && <button type="button" className={styles.retryBtn} onClick={clearAll}>Clear filters</button>}
        </div>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thName}>Move</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th className={styles.thNum}>Power</th>
                  <th className={styles.thNum}>Acc</th>
                  <th className={styles.thNum}>PP</th>
                  <th className={styles.thNum}>Gen</th>
                </tr>
              </thead>
              <tbody>
                {movesList.map((move, i) => {
                  const cat = (move.damageClass || 'status').toLowerCase();
                  return (
                    <motion.tr key={`${move.name}-${i}`} className={styles.row} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15, delay: Math.min(i * 0.01, 0.2) }} onClick={() => { setSelectedMove(move); setDrawerOpen(true); }} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedMove(move); setDrawerOpen(true); } }} aria-label={`View details for ${fmt(move.name)}`}>
                      <td className={styles.nameCell}><span className={styles.moveName}>{fmt(move.name)}</span></td>
                      <td><span className={styles.typeBadge} style={getTypeBadgeStyle(move.type, isDark)}>{move.type}</span></td>
                      <td>
                        <span className={cn(styles.catBadge, styles[`cat_${cat}`])}>
                          <DamageIcon cls={cat} /><span>{cat}</span>
                        </span>
                      </td>
                      <td className={styles.numCell}>{val(move.power)}</td>
                      <td className={styles.numCell}>{val(move.accuracy, '%')}</td>
                      <td className={styles.numCell}>{val(move.pp)}</td>
                      <td className={styles.numCell}>{move.generation ? <span className={styles.genPill}>{move.generation}</span> : <span className={styles.na}>—</span>}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.mobileList}>
              {movesList.map((move, i) => {
                const cat = (move.damageClass || 'status').toLowerCase();
                return (
                  <button key={`${move.name}-m-${i}`} type="button" className={styles.mobileCard} onClick={() => { setSelectedMove(move); setDrawerOpen(true); }}>
                    <div className={styles.mobileTop}>
                      <span className={styles.moveName}>{fmt(move.name)}</span>
                      <span className={styles.typeBadge} style={getTypeBadgeStyle(move.type, isDark)}>{move.type}</span>
                    </div>
                    <div className={styles.mobileMeta}>
                      <span className={cn(styles.catBadge, styles[`cat_${cat}`])}><DamageIcon cls={cat} /><span>{cat}</span></span>
                      {move.generation && <span className={styles.genPill}>Gen {move.generation}</span>}
                    </div>
                    <div className={styles.mobileStats}>
                      <div className={styles.mobileStat}><span className={styles.mobileStatLabel}>Power</span><span className={styles.mobileStatValue}>{move.power ?? '—'}</span></div>
                      <div className={styles.mobileStat}><span className={styles.mobileStatLabel}>Acc</span><span className={styles.mobileStatValue}>{move.accuracy != null ? `${move.accuracy}%` : '—'}</span></div>
                      <div className={styles.mobileStat}><span className={styles.mobileStatLabel}>PP</span><span className={styles.mobileStatValue}>{move.pp ?? '—'}</span></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button type="button" className={styles.loadMoreBtn} onClick={loadMore} disabled={loading}>{loading ? 'Loading...' : 'Load more moves'}</button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {drawerOpen && selectedMove && (
          <>
            <motion.div className={styles.drawerOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} />
            <motion.aside className={styles.drawer} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} role="dialog" aria-modal="true" aria-label={fmt(selectedMove.name)}>
              <div className={styles.drawerHeader}>
                <div>
                  <p className={styles.drawerEyebrow}>Move Detail</p>
                  <h2 className={styles.drawerTitle}>{fmt(selectedMove.name)}</h2>
                  <div className={styles.drawerBadges}>
                    <span className={styles.typeBadge} style={getTypeBadgeStyle(selectedMove.type, isDark)}>{selectedMove.type}</span>
                    <span className={cn(styles.catBadge, styles[`cat_${(selectedMove.damageClass || 'status').toLowerCase()}`])}><DamageIcon cls={selectedMove.damageClass || 'status'} /><span>{selectedMove.damageClass || 'status'}</span></span>
                    {selectedMove.generation && <span className={styles.genPill}>Gen {selectedMove.generation}</span>}
                  </div>
                </div>
                <button type="button" className={styles.drawerClose} onClick={() => setDrawerOpen(false)} aria-label="Close move details"><X size={18} /></button>
              </div>
              <div className={styles.drawerBody}>
                <div className={styles.drawerStats}>
                  <div className={styles.drawerStat}><span className={styles.drawerStatValue}>{selectedMove.power ?? '—'}</span><span className={styles.drawerStatLabel}>Power</span></div>
                  <div className={styles.drawerStat}><span className={styles.drawerStatValue}>{selectedMove.accuracy != null ? `${selectedMove.accuracy}%` : '—'}</span><span className={styles.drawerStatLabel}>Accuracy</span></div>
                  <div className={styles.drawerStat}><span className={styles.drawerStatValue}>{selectedMove.pp ?? '—'}</span><span className={styles.drawerStatLabel}>PP</span></div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailHead}>Game Description</div>
                  <p className={styles.detailText}>{selectedMove.description?.trim() || 'No game description available for this move.'}</p>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailHead}>Effect</div>
                  <p className={styles.detailText}>{selectedMove.effect?.trim() || 'No effect description available.'}</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
