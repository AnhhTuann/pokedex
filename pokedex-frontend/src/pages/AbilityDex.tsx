import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Search, X, ShieldAlert, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Ability } from '../types';
import { TYPE_COLORS, capitalizeSlug } from '../lib/utils';
import { useDebounce } from '../hooks/useDebounce';
import styles from '../styles/pages/AbilityDex.module.scss';

const GET_ALL_ABILITIES = gql`
  query GetAllAbilities($gen: Int, $limit: Int, $offset: Int, $search: String) {
    getAllAbilities(gen: $gen, limit: $limit, offset: $offset, search: $search) {
      results { id name generation flavorText shortEffect effect pokemons { id name types image speciesId } }
      totalCount
    }
  }
`;

const fmt = capitalizeSlug;
const GEN_OPTIONS = [{ value: 'ALL', label: 'All Generations' }, ...Array.from({ length: 9 }, (_, i) => ({ value: String(i + 1), label: `Generation ${i + 1}` }))];

export default function AbilityDex() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [genFilter, setGenFilter] = useState('ALL');
  const [selected, setSelected] = useState<Ability | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const limit = 30;

  const queryGen = genFilter === 'ALL' ? null : Number(genFilter);
  const { data, loading, error, fetchMore, refetch } = useQuery<{ getAllAbilities: { results: Ability[]; totalCount: number } }>(GET_ALL_ABILITIES, {
    variables: { gen: queryGen, limit, offset: 0, search: debouncedSearch },
    notifyOnNetworkStatusChange: true,
  });

  const list = data?.getAllAbilities?.results || [];
  const total = data?.getAllAbilities?.totalCount || 0;
  const hasMore = list.length > 0 && list.length < total;
  const hasFilters = genFilter !== 'ALL' || !!searchTerm;

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [drawerOpen]);

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { offset: list.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { getAllAbilities: { ...prev.getAllAbilities, results: [...prev.getAllAbilities.results, ...fetchMoreResult.getAllAbilities.results] } };
      },
    });
  };

  const clearAll = () => { setSearchTerm(''); setGenFilter('ALL'); };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Encyclopedia</p>
          <h1 className={styles.title}>Ability Dex</h1>
          <p className={styles.desc}>Explore Pokémon abilities, effects, and battle traits.</p>
        </div>
        {!loading && !error && <div className={styles.countBadge}><span className={styles.countNum}>{total}</span><span className={styles.countLabel}>Abilities</span></div>}
      </header>

      <section className={styles.toolbar} aria-label="Ability search and filters">
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} aria-hidden="true" />
          <input className={styles.searchInput} type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search abilities..." aria-label="Search abilities by name" />
          {searchTerm && <button type="button" className={styles.searchClear} onClick={() => setSearchTerm('')} aria-label="Clear search"><X size={14} /></button>}
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="ability-gen">Generation</label>
          <select id="ability-gen" className={styles.selectField} value={genFilter} onChange={e => setGenFilter(e.target.value)}>
            {GEN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </section>

      <div className={styles.resultsBar}>
        <div className={styles.resultsMeta}><SlidersHorizontal size={14} aria-hidden="true" /><span>{loading && list.length === 0 ? 'Loading abilities...' : `${total} result${total === 1 ? '' : 's'}`}</span></div>
        {hasFilters && <button type="button" className={styles.resetBtn} onClick={clearAll}>Clear all</button>}
      </div>

      {error ? (
        <div className={styles.stateCard} role="alert">
          <ShieldAlert size={20} />
          <div><div className={styles.stateTitle}>Unable to load abilities</div><div className={styles.stateDesc}>Check the backend connection and try again.</div></div>
          <button type="button" className={styles.retryBtn} onClick={() => refetch()}>Retry</button>
        </div>
      ) : loading && list.length === 0 ? (
        <div className={styles.list}>{Array.from({ length: 8 }).map((_, i) => <div key={i} className={styles.skeletonCard} />)}</div>
      ) : list.length === 0 ? (
        <div className={styles.stateCard}>
          <Search size={20} />
          <div><div className={styles.stateTitle}>No abilities found</div><div className={styles.stateDesc}>Try adjusting your search or filters.</div></div>
          {hasFilters && <button type="button" className={styles.retryBtn} onClick={clearAll}>Clear filters</button>}
        </div>
      ) : (
        <>
          <div className={styles.list}>
            <AnimatePresence mode="popLayout">
              {list.map((ab, i) => (
                <motion.button key={ab.id} type="button" className={styles.abilityCard} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: Math.min(i * 0.015, 0.2) }} onClick={() => { setSelected(ab); setDrawerOpen(true); }}>
                  <div className={styles.cardMain}>
                    <div className={styles.cardTop}>
                      <h3 className={styles.abilityName}>{fmt(ab.name)}</h3>
                      {ab.generation && <span className={styles.genPill}>Gen {ab.generation}</span>}
                    </div>
                    <p className={styles.abilityDesc}>{ab.shortEffect?.trim() || ab.flavorText?.trim() || 'No description available.'}</p>
                  </div>
                  <div className={styles.cardMeta}>
                    {ab.pokemons?.length > 0 && <span className={styles.pokemonCount}>{ab.pokemons.length} Pokémon</span>}
                    <ChevronRight size={16} className={styles.chevron} aria-hidden="true" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          {hasMore && <div className={styles.loadMoreWrap}><button type="button" className={styles.loadMoreBtn} onClick={loadMore} disabled={loading}>{loading ? 'Loading...' : 'Load more abilities'}</button></div>}
        </>
      )}

      <AnimatePresence>
        {drawerOpen && selected && (
          <>
            <motion.div className={styles.drawerOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} />
            <motion.aside className={styles.drawer} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} role="dialog" aria-modal="true" aria-label={fmt(selected.name)}>
              <div className={styles.drawerHeader}>
                <div>
                  <p className={styles.drawerEyebrow}>Ability</p>
                  <h2 className={styles.drawerTitle}>{fmt(selected.name)}</h2>
                  {selected.generation && <span className={styles.genPill}>Generation {selected.generation}</span>}
                </div>
                <button type="button" className={styles.drawerClose} onClick={() => setDrawerOpen(false)} aria-label="Close ability details"><X size={18} /></button>
              </div>
              <div className={styles.drawerBody}>
                {selected.flavorText?.trim() && <div className={styles.detailCard}><div className={styles.detailHead}>Game Description</div><p className={styles.detailText}>{selected.flavorText}</p></div>}
                {selected.shortEffect?.trim() && <div className={styles.detailCard}><div className={styles.detailHead}>Effect</div><p className={styles.detailText}>{selected.shortEffect}</p></div>}
                {selected.effect?.trim() && selected.effect.trim() !== selected.shortEffect?.trim() && <div className={styles.detailCard}><div className={styles.detailHead}>In-Depth Effect</div><p className={styles.detailText}>{selected.effect}</p></div>}
                {selected.pokemons?.length > 0 && (
                  <div className={styles.detailCard}>
                    <div className={styles.detailHead}>Pokémon with this Ability ({selected.pokemons.length})</div>
                    <div className={styles.pokemonGrid}>
                      {selected.pokemons.map(p => {
                        const tc = TYPE_COLORS[p.types[0]?.toLowerCase() || 'normal'] || '#9ca3af';
                        return (
                          <div key={p.id} className={styles.pokemonRow}>
                            <img src={p.image} alt={p.name} className={styles.pokemonSprite} loading="lazy" />
                            <div className={styles.pokemonInfo}>
                              <span className={styles.pokemonId}>#{String(p.id).padStart(3, '0')}</span>
                              <span className={styles.pokemonName}>{p.name}</span>
                              <div className={styles.typesRow}>{p.types.map(t => <span key={t} className={styles.typeDot} style={{ background: tc, opacity: t === p.types[0] ? 1 : 0.75 }} title={t} />)}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
