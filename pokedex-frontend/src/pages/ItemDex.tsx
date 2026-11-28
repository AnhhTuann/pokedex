import { useState, useEffect, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Search, X, ShoppingBag, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Item } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { capitalizeSlug } from '../lib/utils';
import styles from '../styles/pages/ItemDex.module.scss';

const GET_ALL_ITEMS = gql`
  query GetAllItems($search: String, $limit: Int, $offset: Int) {
    getAllItems(search: $search, limit: $limit, offset: $offset) {
      results { id name cost flingPower flingEffect category pocket flavorText effect spriteUrl }
      totalCount
    }
  }
`;

const fmt = capitalizeSlug;
const fmtCat = (v?: string | null) => v ? v.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Unknown';
const disp = (v: any) => (v === null || v === undefined || v === '' || v === 0) ? '—' : v;

export default function ItemDex() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const limit = 40;

  const { data, loading, error, fetchMore, refetch } = useQuery<{ getAllItems: { results: Item[]; totalCount: number } }>(GET_ALL_ITEMS, {
    variables: { search: debouncedSearch, limit, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const rawList = data?.getAllItems?.results || [];
  const total = data?.getAllItems?.totalCount || 0;
  const hasMore = rawList.length > 0 && rawList.length < total;

  const categories = useMemo(() => {
    const set = new Set<string>();
    rawList.forEach(i => { if (i.category) set.add(i.category); });
    return ['ALL', ...Array.from(set).sort()];
  }, [rawList]);

  useEffect(() => {
    if (categoryFilter !== 'ALL' && !categories.includes(categoryFilter)) setCategoryFilter('ALL');
  }, [categories, categoryFilter]);

  const list = useMemo(() => categoryFilter === 'ALL' ? rawList : rawList.filter(i => i.category === categoryFilter), [rawList, categoryFilter]);
  const hasFilters = !!searchTerm || categoryFilter !== 'ALL';

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
      variables: { offset: rawList.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { getAllItems: { ...prev.getAllItems, results: [...prev.getAllItems.results, ...fetchMoreResult.getAllItems.results] } };
      },
    });
  };

  const clearAll = () => { setSearchTerm(''); setCategoryFilter('ALL'); };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Encyclopedia</p>
          <h1 className={styles.title}>Item Dex</h1>
          <p className={styles.desc}>Browse items, categories, and in-game effects.</p>
        </div>
        {!loading && !error && <div className={styles.countBadge}><span className={styles.countNum}>{total}</span><span className={styles.countLabel}>Items</span></div>}
      </header>

      <section className={styles.toolbar} aria-label="Item search and filters">
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} aria-hidden="true" />
          <input className={styles.searchInput} type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search items..." aria-label="Search items by name" />
          {searchTerm && <button type="button" className={styles.searchClear} onClick={() => setSearchTerm('')} aria-label="Clear search"><X size={14} /></button>}
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="item-category">Category</label>
          <select id="item-category" className={styles.selectField} value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c === 'ALL' ? 'All Categories (loaded)' : fmtCat(c)}</option>)}
          </select>
        </div>
      </section>

      <div className={styles.resultsBar}>
        <div className={styles.resultsMeta}>
          <SlidersHorizontal size={14} aria-hidden="true" />
          <span>{loading && rawList.length === 0 ? 'Loading items...' : categoryFilter !== 'ALL' ? `Showing ${list.length} of ${rawList.length} loaded` : `${total} result${total === 1 ? '' : 's'}`}</span>
        </div>
        {hasFilters && <button type="button" className={styles.resetBtn} onClick={clearAll}>Clear all</button>}
      </div>
      {categoryFilter !== 'ALL' && hasMore && <p className={styles.filterNote}>Category filter applies to loaded items. Load more to include additional items.</p>}

      {error ? (
        <div className={styles.stateCard} role="alert">
          <ShieldAlert size={20} />
          <div><div className={styles.stateTitle}>Unable to load items</div><div className={styles.stateDesc}>Check the backend connection and try again.</div></div>
          <button type="button" className={styles.retryBtn} onClick={() => refetch()}>Retry</button>
        </div>
      ) : loading && rawList.length === 0 ? (
        <div className={styles.grid}>{Array.from({ length: 12 }).map((_, i) => <div key={i} className={styles.skeletonCard} />)}</div>
      ) : list.length === 0 ? (
        <div className={styles.stateCard}>
          <ShoppingBag size={20} />
          <div><div className={styles.stateTitle}>No items found</div><div className={styles.stateDesc}>{hasFilters ? 'Try adjusting your search or category filter.' : 'No item data available.'}</div></div>
          {hasFilters && <button type="button" className={styles.retryBtn} onClick={clearAll}>Clear filters</button>}
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {list.map((item, i) => (
                <motion.button key={item.id} type="button" className={styles.itemCard} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: Math.min(i * 0.01, 0.2) }} onClick={() => { setSelectedItem(item); setDrawerOpen(true); }}>
                  <div className={styles.spriteWrap}>
                    {item.spriteUrl ? <img className={styles.sprite} src={item.spriteUrl} alt="" loading="lazy" width={48} height={48} /> : <ShoppingBag size={20} className={styles.spriteFallback} aria-hidden="true" />}
                  </div>
                  <div className={styles.itemBody}>
                    <div className={styles.itemTop}>
                      <h3 className={styles.itemName}>{fmt(item.name)}</h3>
                      {item.category && <span className={styles.categoryBadge}>{fmtCat(item.category)}</span>}
                    </div>
                    <p className={styles.itemDesc}>{item.flavorText?.trim() || item.effect?.trim() || 'No description available.'}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          {hasMore && <div className={styles.loadMoreWrap}><button type="button" className={styles.loadMoreBtn} onClick={loadMore} disabled={loading}>{loading ? 'Loading...' : 'Load more items'}</button></div>}
        </>
      )}

      <AnimatePresence>
        {drawerOpen && selectedItem && (
          <>
            <motion.div className={styles.drawerOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} />
            <motion.aside className={styles.drawer} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} role="dialog" aria-modal="true" aria-label={fmt(selectedItem.name)}>
              <div className={styles.drawerHeader}>
                <div className={styles.drawerHeadMain}>
                  <div className={styles.drawerSprite}>
                    {selectedItem.spriteUrl ? <img src={selectedItem.spriteUrl} alt="" width={56} height={56} /> : <ShoppingBag size={24} aria-hidden="true" />}
                  </div>
                  <div>
                    <p className={styles.drawerEyebrow}>Item</p>
                    <h2 className={styles.drawerTitle}>{fmt(selectedItem.name)}</h2>
                    {selectedItem.category && <span className={styles.categoryBadge}>{fmtCat(selectedItem.category)}</span>}
                  </div>
                </div>
                <button type="button" className={styles.drawerClose} onClick={() => setDrawerOpen(false)} aria-label="Close item details"><X size={18} /></button>
              </div>
              <div className={styles.drawerBody}>
                <div className={styles.specsGrid}>
                  <div className={styles.specTile}><span className={styles.specLabel}>Category</span><span className={styles.specValue}>{disp(selectedItem.category ? fmtCat(selectedItem.category) : null)}</span></div>
                  <div className={styles.specTile}><span className={styles.specLabel}>Pocket</span><span className={styles.specValue}>{disp(selectedItem.pocket ? fmtCat(selectedItem.pocket) : null)}</span></div>
                  <div className={styles.specTile}><span className={styles.specLabel}>Cost</span><span className={styles.specValue}>{selectedItem.cost ? `₽${selectedItem.cost.toLocaleString()}` : '—'}</span></div>
                  <div className={styles.specTile}><span className={styles.specLabel}>Fling Power</span><span className={styles.specValue}>{disp(selectedItem.flingPower)}</span></div>
                </div>
                {selectedItem.flingEffect && <div className={styles.specTileWide}><span className={styles.specLabel}>Fling Effect</span><span className={styles.specValue}>{fmtCat(selectedItem.flingEffect)}</span></div>}
                {selectedItem.flavorText?.trim() && <div className={styles.detailCard}><div className={styles.detailHead}>Game Description</div><p className={styles.detailText}>{selectedItem.flavorText}</p></div>}
                {selectedItem.effect?.trim() && <div className={styles.detailCard}><div className={styles.detailHead}>Effect</div><p className={styles.detailText}>{selectedItem.effect}</p></div>}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
