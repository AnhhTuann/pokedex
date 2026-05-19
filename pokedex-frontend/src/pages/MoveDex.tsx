import { useState, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Zap,
  Search,
  HelpCircle,
  X,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Move } from '../types';
import { TYPE_COLORS, capitalizeSlug } from '../lib/utils';
import { useDebounce } from '../hooks/useDebounce';
import styles from '../styles/pages/MoveDex.module.scss';

// GraphQL query for all moves
const GET_ALL_MOVES = gql`
  query GetAllMoves($gen: Int, $type: String, $damageClass: String, $limit: Int, $offset: Int, $search: String) {
    getAllMoves(gen: $gen, type: $type, damageClass: $damageClass, limit: $limit, offset: $offset, search: $search) {
      results {
        name
        type
        power
        accuracy
        pp
        generation
        description
        effect
        damageClass
      }
      totalCount
    }
  }
`;

// Damage Class Colors
const DAMAGE_CLASS_COLORS: Record<string, string> = {
  physical: '#e11d48', // Red / Rose
  special: '#2563eb',  // Blue / Indigo
  status: '#6b7280',   // Gray
};

// Helper to format move names (e.g. swords-dance -> Swords Dance)
const formatMoveName = capitalizeSlug;

export default function MoveDex() {
  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [genFilter, setGenFilter] = useState<number | string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [catFilter, setCatFilter] = useState<string>('ALL');

  // Drawer Detail State
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pagination limit
  const limit = 30;
  const [offset, setOffset] = useState(0);

  // Parse filters for GQL Variables
  const queryGen = genFilter === 'ALL' ? null : Number(genFilter);
  const queryType = typeFilter === 'ALL' ? '' : typeFilter;
  const queryCat = catFilter === 'ALL' ? '' : catFilter;

  // Apollo Query
  const { data, loading, error, fetchMore } = useQuery<{
    getAllMoves: { results: Move[]; totalCount: number };
  }>(GET_ALL_MOVES, {
    variables: {
      gen: queryGen,
      type: queryType,
      damageClass: queryCat,
      limit,
      offset: 0,
      search: debouncedSearch
    },
    onCompleted: () => {
      setOffset(0);
    }
  });

  const movesList = data?.getAllMoves?.results || [];
  const totalCount = data?.getAllMoves?.totalCount || 0;
  const hasMore = movesList.length > 0 && movesList.length < totalCount;

  // Infinite Scroll or Manual Trigger
  const loadMore = () => {
    const nextOffset = movesList.length;
    setOffset(nextOffset);
    fetchMore({
      variables: { offset: nextOffset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          getAllMoves: {
            ...prev.getAllMoves,
            results: [...prev.getAllMoves.results, ...fetchMoreResult.getAllMoves.results]
          }
        };
      }
    });
  };

  // Scroll listener to automatically load more moves when near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMore && !loading) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, movesList.length]);

  const handleOpenDetail = (move: Move) => {
    setSelectedMove(move);
    setDrawerOpen(true);
  };

  const handleCloseDetail = () => {
    setDrawerOpen(false);
  };

  // Lists of options
  const generationOptions = useMemo(() => [
    { value: 'ALL', label: 'All Gens' },
    ...Array.from({ length: 9 }, (_, i) => ({
      value: i + 1,
      label: `Gen ${i + 1}`
    }))
  ], []);

  const typeOptions = useMemo(() => [
    'ALL',
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ], []);

  const categoryOptions = useMemo(() => [
    { value: 'ALL', label: 'All Cat.' },
    { value: 'physical', label: 'Physical' },
    { value: 'special', label: 'Special' },
    { value: 'status', label: 'Status' }
  ], []);

  return (
    <div className={styles.container}>
      
      {/* Page Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Zap className={styles.icon} />
          Move Dex
        </h1>
        <p className={styles.desc}>
          Explore and analyze Pokemon physical, special, or status movesets.
        </p>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={16} />
        <input
          type="text"
          placeholder="Search moves..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Modern Filter Bar */}
      <div className={styles.filterCard}>
        <div className={styles.filterRow}>
          
          {/* Generation filter */}
          <div className={styles.formGroup}>
            <span className={styles.inputLabel}>Generation</span>
            <div className={styles.selectWrapper}>
              <select
                value={genFilter}
                onChange={(e) => setGenFilter(e.target.value)}
                className={styles.selectField}
              >
                {generationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type filter */}
          <div className={styles.formGroup}>
            <span className={styles.inputLabel}>Type</span>
            <div className={styles.selectWrapper}>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={styles.selectField}
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t === 'ALL' ? 'All Types' : t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category filter */}
          <div className={styles.formGroup}>
            <span className={styles.inputLabel}>Category</span>
            <div className={styles.selectWrapper}>
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className={styles.selectField}
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Count Indicator */}
      {!loading && !error && (
        <span className={styles.infoLabel}>
          {totalCount} Moves {genFilter !== 'ALL' ? `· Gen ${genFilter}` : ''}{typeFilter !== 'ALL' ? ` · ${typeFilter.toUpperCase()}` : ''}{catFilter !== 'ALL' ? ` · ${catFilter.toUpperCase()}` : ''}
        </span>
      )}

      {/* Content Area */}
      {error ? (
        <div style={{
          padding: 20,
          borderRadius: 12,
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontWeight: 700
        }}>
          <ShieldAlert />
          Backend offline — start the server on port 3000 to fetch real Moves.
        </div>
      ) : loading && movesList.length === 0 ? (
        /* Loading skeletons */
        <div className={styles.grid}>
          {[...Array(12)].map((_, idx) => (
            <div
              key={idx}
              style={{
                height: 110,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-main)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />
          ))}
        </div>
      ) : (
        /* Moves Grid */
        <>
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {movesList.map((move: Move, index: number) => {
                const moveTypeColor = TYPE_COLORS[move.type.toLowerCase()] || '#9ca3af';
                const moveCatColor = DAMAGE_CLASS_COLORS[move.damageClass.toLowerCase()] || '#6b7280';

                return (
                  <motion.div
                    key={`${move.name}-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
                    className={styles.moveCard}
                    onClick={() => handleOpenDetail(move)}
                    style={{
                      borderColor: 'var(--border-main)',
                      background: `linear-gradient(150deg, rgba(${parseInt(moveTypeColor.slice(1,3), 16) || 150}, ${parseInt(moveTypeColor.slice(3,5), 16) || 150}, ${parseInt(moveTypeColor.slice(5,7), 16) || 150}, 0.08) 0%, var(--bg-paper-glow) 80%)`
                    }}
                  >
                    {/* Top Row: Name and Stats */}
                    <div className={styles.topRow}>
                      <h3 className={styles.moveName}>
                        {formatMoveName(move.name)}
                      </h3>

                      {/* Stat parameters */}
                      <div className={styles.statsRow}>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>PWR</span>
                          <span className={`${styles.statValue} ${move.power ? styles.active : ''}`}>
                            {move.power || '-'}
                          </span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>ACC</span>
                          <span className={`${styles.statValue} ${move.accuracy ? styles.active : ''}`}>
                            {move.accuracy ? `${move.accuracy}%` : '-'}
                          </span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>PP</span>
                          <span className={`${styles.statValue} ${move.pp ? styles.active : ''}`}>
                            {move.pp || '-'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badge chips row */}
                    <div className={styles.chipsRow}>
                      <span
                        className={styles.badge}
                        style={{ backgroundColor: moveTypeColor }}
                      >
                        {move.type}
                      </span>
                      <span
                        className={styles.badge}
                        style={{ backgroundColor: moveCatColor }}
                      >
                        {move.damageClass}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {movesList.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <HelpCircle size={48} style={{ opacity: 0.4, marginBottom: 12 }} />
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-secondary)' }}>No Moves found.</h3>
                <p style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Try adjusting your filters or search keywords.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className={styles.loadMoreContainer}>
              <button className={styles.loadMoreBtn} onClick={loadMore}>
                Load More Moves
              </button>
            </div>
          )}
        </>
      )}

      {/* Slide Drawer detail overlays */}
      <AnimatePresence>
        {drawerOpen && selectedMove && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.drawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetail}
            />

            {/* Slider Sheet */}
            <motion.div
              className={styles.drawerSheet}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            >
              {/* Header */}
              <div className={styles.drawerHeader}>
                <h2 className={styles.drawerTitle}>
                  <Zap size={22} style={{ color: TYPE_COLORS[selectedMove.type.toLowerCase()] || '#eab308', marginRight: 4 }} />
                  {formatMoveName(selectedMove.name)}
                </h2>
                <button className={styles.closeBtn} onClick={handleCloseDetail}>
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body Scroll */}
              <div className={styles.drawerBody}>
                
                {/* Badges */}
                <div className={styles.badgeRow}>
                  <span
                    className={styles.drawerBadge}
                    style={{
                      backgroundColor: TYPE_COLORS[selectedMove.type.toLowerCase()] || '#9ca3af',
                      boxShadow: `0 4px 12px rgba(0,0,0,0.15)`
                    }}
                  >
                    {selectedMove.type}
                  </span>
                  <span
                    className={styles.drawerBadge}
                    style={{
                      backgroundColor: DAMAGE_CLASS_COLORS[selectedMove.damageClass.toLowerCase()] || '#6b7280',
                      boxShadow: `0 4px 12px rgba(0,0,0,0.15)`
                    }}
                  >
                    {selectedMove.damageClass}
                  </span>
                </div>

                {/* Big Stats Row */}
                <div className={styles.statsGrid}>
                  <div className={styles.statCol}>
                    <span className={`${styles.statNum} ${!selectedMove.power ? styles.disabled : ''}`}>
                      {selectedMove.power || '-'}
                    </span>
                    <span className={styles.statName}>Power</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statCol}>
                    <span className={`${styles.statNum} ${!selectedMove.accuracy ? styles.disabled : ''}`}>
                      {selectedMove.accuracy ? `${selectedMove.accuracy}%` : '-'}
                    </span>
                    <span className={styles.statName}>Accuracy</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statCol}>
                    <span className={`${styles.statNum} ${!selectedMove.pp ? styles.disabled : ''}`}>
                      {selectedMove.pp || '-'}
                    </span>
                    <span className={styles.statName}>PP</span>
                  </div>
                </div>

                {/* Game description panel */}
                <div className={styles.detailCard}>
                  <div className={styles.cardHead}>Game Description</div>
                  <div className={styles.cardContent}>
                    {selectedMove.description || 'No game description available for this move.'}
                  </div>
                </div>

                {/* Battle effect panel */}
                <div className={styles.detailCard}>
                  <div className={styles.cardHead}>Effect Description</div>
                  <div className={styles.cardContent}>
                    {selectedMove.effect || 'No special battle effect description available.'}
                  </div>
                </div>

                {/* Introduced gen stamp */}
                {selectedMove.generation && (
                  <span className={styles.genLabel}>
                    Introduced in Generation {selectedMove.generation}
                  </span>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
