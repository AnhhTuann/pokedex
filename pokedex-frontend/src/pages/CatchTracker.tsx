import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Sparkles,
  CheckCircle2,
  RotateCcw,
  CheckSquare,
  Search,
  HelpCircle,
  Eye,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PokemonListItem } from '../types';
import { useTeamStore } from '../lib/teamStore';
import { useCatchStore } from '../lib/catchStore';
import { VERSION_COLORS, GENERATION_VERSIONS, getRegionAndGame } from '../App';
import PokeDetail from '../components/PokeDetail';
import { formatSpeciesId, TYPE_COLORS } from '../lib/utils';
import { useColorMode } from '../main';
import styles from '../styles/pages/CatchTracker.module.scss';

const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $gen: Int, $ids: [Int!], $region: String, $game: String) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, gen: $gen, ids: $ids, region: $region, game: $game) {
      results { id name types image shinyImage category regionalNumber speciesId }
      totalCount
    }
  }
`;


// ── OPTIMIZED CHILD CARD COMPONENT (React.memo) ──
interface TrackerCardProps {
  pokemon: PokemonListItem;
  isCaught: boolean;
  isShiny: boolean;
  isShinyMode: boolean;
  onToggleCaught: (id: number) => void;
  onToggleShiny: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const TrackerCard = React.memo<TrackerCardProps>(({
  pokemon,
  isCaught,
  isShiny,
  isShinyMode,
  onToggleCaught,
  onToggleShiny,
  onViewDetails
}) => {
  const primaryColor = TYPE_COLORS[pokemon.types[0]] || '#9ca3af';
  const isMarked = isCaught || isShiny;

  return (
    <div
      className={`${styles.trackerCard} ${isShiny ? styles.shiny : isCaught ? styles.caught : ''}`}
      style={{
        borderColor: isShiny 
          ? '#fbbf24'
          : isCaught 
            ? '#10b981' 
            : undefined,
        cursor: 'pointer'
      }}
      onClick={() => {
        if (isCaught || isShiny) {
          onViewDetails(pokemon.id);
        } else {
          onToggleCaught(pokemon.id);
        }
      }}
    >
      {/* Action buttons (top-right corner) */}
      <div className={styles.cardActions}>
        {/* Shiny Toggler (Gold Star) */}
        <button
          className={`${styles.actionIconBtn} ${styles.shinyBtn} ${isShiny ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleShiny(pokemon.id);
          }}
          title={isShiny ? 'Remove Shiny status' : 'Mark as Shiny ✨'}
        >
          <Sparkles size={14} />
        </button>

        {/* Caught Toggler (Check icon) */}
        <button
          className={`${styles.actionIconBtn} ${styles.caughtBtn} ${isCaught ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleCaught(pokemon.id);
          }}
          title={isCaught ? 'Mark as Uncaught' : 'Mark as Caught'}
        >
          <CheckCircle2 size={14} />
        </button>
      </div>

      {/* Pokémon Circle container */}
      <div className={`${styles.spriteCircle} ${isShiny ? styles.shiny : isCaught ? styles.caught : ''}`}>
        <img
          src={(isShinyMode || isShiny) && pokemon.shinyImage ? pokemon.shinyImage : pokemon.image}
          alt={pokemon.name}
          loading="lazy"
          decoding="async"
          className={`${styles.sprite} ${isMarked ? styles.active : ''}`}
        />
      </div>

      {/* Dex ID */}
      <span className={`${styles.pkId} ${isShiny ? styles.shiny : isCaught ? styles.caught : ''}`}>
        {pokemon.regionalNumber !== undefined && pokemon.regionalNumber !== null
          ? pokemon.regionalNumber.toString().padStart(3, '0')
          : formatSpeciesId(pokemon.speciesId || pokemon.id)}
      </span>

      {/* Name */}
      <h3 className={`${styles.pkName} ${isMarked ? styles.active : ''}`}>
        {pokemon.name} {isShiny && '✨'}
      </h3>

      {/* Types Chips */}
      <div className={styles.typesRow}>
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={styles.typeChip}
            style={isMarked ? {
              backgroundColor: TYPE_COLORS[type] || '#9ca3af',
              color: '#ffffff',
              borderColor: 'transparent'
            } : {}}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Eye icon trigger */}
      <div
        className={styles.eyeIcon}
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(pokemon.id);
        }}
        title="View Stats & Details"
      >
        <Eye size={16} />
      </div>
    </div>
  );
}, (prev, next) => {
  return prev.isCaught === next.isCaught &&
         prev.isShiny === next.isShiny &&
         prev.isShinyMode === next.isShinyMode;
});

// ── MAIN CATCH TRACKER COMPONENT ──
export default function CatchTracker() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  // Zustand Store variables
  const caughtPokemonIds = useCatchStore(state => state.caughtPokemonIds);
  const shinyPokemonIds = useCatchStore(state => state.shinyPokemonIds);
  const toggleCaught = useCatchStore(state => state.toggleCaught);
  const toggleShiny = useCatchStore(state => state.toggleShiny);
  const markAllCaught = useCatchStore(state => state.markAllCaught);
  const resetAll = useCatchStore(state => state.resetAll);

  const selectedVersion = useTeamStore(state => state.selectedVersion);
  const setSelectedVersion = useTeamStore(state => state.setSelectedVersion);
  const isShinyMode = useTeamStore(state => state.isShinyMode);

  // Local filtering states
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [hideCaught, setHideCaught] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Dynamic chunk rendering limit to guarantee instant page load (infinite scrolling)
  const [visibleLimit, setVisibleLimit] = useState(40);

  // Confirmations
  const [confirmMarkAllOpen, setConfirmMarkAllOpen] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Caching sets for performance
  const caughtSet = useMemo(() => new Set(caughtPokemonIds), [caughtPokemonIds]);
  const shinySet = useMemo(() => new Set(shinyPokemonIds), [shinyPokemonIds]);

  const { region: rawRegion, game: rawGame } = getRegionAndGame(selectedVersion);
  const queryRegion = rawRegion !== 'ALL' ? rawRegion : undefined;
  const queryGame = rawGame !== 'ALL' ? rawGame : undefined;

  // GraphQL query fetching listing data (cached in apollo for efficiency)
  const { data, loading, error } = useQuery<{
    pokemonList: { results: PokemonListItem[]; totalCount: number };
  }>(GET_POKEMON_LIST, {
    variables: {
      limit: 1025,
      offset: 0,
      search,
      type: typeFilter,
      region: queryRegion,
      game: queryGame
    },
  });

  const pokemonList = data?.pokemonList?.results || [];
  const totalCount = data?.pokemonList?.totalCount || 0;

  // Reset rendering limit when filter options change
  useEffect(() => {
    setVisibleLimit(40);
  }, [search, typeFilter, hideCaught, selectedVersion]);

  // Infinite Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 300;
      if (scrollPos >= threshold) {
        setVisibleLimit((prev) => Math.min(prev + 40, pokemonList.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pokemonList.length]);

  const handleToggleCaught = useCallback((id: number) => {
    toggleCaught(id);
  }, [toggleCaught]);

  const handleToggleShiny = useCallback((id: number) => {
    toggleShiny(id);
  }, [toggleShiny]);

  const handleViewDetails = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  // Filter local logic
  const filteredList = useMemo(() => {
    return pokemonList.filter((p) => {
      if (hideCaught && caughtSet.has(p.id)) return false;
      return true;
    });
  }, [pokemonList, hideCaught, caughtSet]);

  // Compute visible subset
  const visibleList = useMemo(() => {
    return filteredList.slice(0, visibleLimit);
  }, [filteredList, visibleLimit]);

  // Progress Calculations
  const totalPokemon = 1025;
  const nationalProgress = Math.min(100, Math.round((caughtPokemonIds.length / totalPokemon) * 100)) || 0;
  const nationalShinyProgress = Math.min(100, Math.round((shinyPokemonIds.length / totalPokemon) * 100)) || 0;

  const visiblePokemonIds = useMemo(() => pokemonList.map(p => p.id), [pokemonList]);
  
  const caughtInActiveFilter = useMemo(() => {
    return visiblePokemonIds.filter(id => caughtSet.has(id)).length;
  }, [visiblePokemonIds, caughtSet]);

  const shinyInActiveFilter = useMemo(() => {
    return visiblePokemonIds.filter(id => shinySet.has(id)).length;
  }, [visiblePokemonIds, shinySet]);

  const localTotal = totalCount || 1;
  const localProgress = Math.min(100, Math.round((caughtInActiveFilter / localTotal) * 100)) || 0;
  const localShinyProgress = Math.min(100, Math.round((shinyInActiveFilter / localTotal) * 100)) || 0;

  const handleMarkAllConfirm = () => {
    markAllCaught(visiblePokemonIds);
    setConfirmMarkAllOpen(false);
  };

  const handleResetConfirm = () => {
    resetAll();
    setConfirmResetOpen(false);
  };

  return (
    <div className={styles.container}>
      
      {/* Progress Header Card */}
      <div className={`${styles.progressCard} ${isDark ? styles.dark : styles.light}`}>
        <div className={styles.trackerHeader}>
          <div>
            <h1 className={styles.title}>
              <CheckSquare className={styles.pokeballIcon} />
              Living Dex Shiny Tracker
            </h1>
            <p className={styles.desc}>
              Keep track of your normal and rare shiny catches. Click the card to mark Caught, click the star to mark Shiny!
            </p>
          </div>

          {/* Action buttons */}
          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${styles.primary}`}
              disabled={pokemonList.length === 0}
              onClick={() => setConfirmMarkAllOpen(true)}
            >
              <CheckSquare size={14} />
              Mark Current As Caught
            </button>
            
            <button
              className={`${styles.actionBtn} ${styles.danger}`}
              onClick={() => setConfirmResetOpen(true)}
            >
              <RotateCcw size={14} />
              Reset All Progress
            </button>
          </div>
        </div>

        {/* Dual Progress Bars */}
        <div className={`${styles.progressRow} ${selectedVersion !== 'ALL' ? styles.dual : ''}`}>
          
          {/* National Progress */}
          <div className={styles.progressGroup}>
            <span className={styles.sectionTitle}>🌐 National Living Dex Progress</span>

            {/* Regular */}
            <div className={styles.progressItem}>
              <div className={styles.labelRow}>
                <span className={styles.label}>
                  <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                  Regular Dex Progress
                </span>
                <span className={styles.value} style={{ color: 'var(--primary)' }}>
                  Caught: {caughtPokemonIds.length} / {totalPokemon} ({nationalProgress}%)
                </span>
              </div>
              <div className={styles.barBg}>
                <div className={`${styles.barFill} ${styles.caught}`} style={{ width: `${nationalProgress}%` }} />
              </div>
            </div>

            {/* Shiny */}
            <div className={styles.progressItem}>
              <div className={styles.labelRow}>
                <span className={styles.label}>
                  <Sparkles size={13} style={{ color: '#fbbf24' }} />
                  Shiny Dex Progress
                </span>
                <span className={styles.value} style={{ color: '#d97706' }}>
                  Shiny: {shinyPokemonIds.length} / {totalPokemon} ({nationalShinyProgress}%)
                </span>
              </div>
              <div className={styles.barBg}>
                <div className={`${styles.barFill} ${styles.shiny}`} style={{ width: `${nationalShinyProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Regional Progress */}
          {selectedVersion !== 'ALL' && (
            <div className={styles.progressGroup}>
              <span className={styles.sectionTitle}>⚡ {selectedVersion} Regional Progress</span>

              {/* Regional Regular */}
              <div className={styles.progressItem}>
                <div className={styles.labelRow}>
                  <span className={styles.label}>
                    <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                    Regional Regular Dex
                  </span>
                  <span className={styles.value} style={{ color: '#06b6d4' }}>
                    Caught: {caughtInActiveFilter} / {localTotal} ({localProgress}%)
                  </span>
                </div>
                <div className={styles.barBg}>
                  <div className={`${styles.barFill} ${styles.caught}`} style={{ width: `${localProgress}%` }} />
                </div>
              </div>

              {/* Regional Shiny */}
              <div className={styles.progressItem}>
                <div className={styles.labelRow}>
                  <span className={styles.label}>
                    <Sparkles size={13} style={{ color: '#fbbf24' }} />
                    Regional Shiny Dex
                  </span>
                  <span className={styles.value} style={{ color: '#d97706' }}>
                    Shiny: {shinyInActiveFilter} / {localTotal} ({localShinyProgress}%)
                  </span>
                </div>
                <div className={styles.barBg}>
                  <div className={`${styles.barFill} ${styles.shiny}`} style={{ width: `${localShinyProgress}%` }} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Filter Card */}
      <div className={styles.filterCard}>
        <div className={styles.filterRow}>
          
          {/* Game version dropdown */}
          <div className={styles.formGroup}>
            <span className={styles.inputLabel}>Game Version</span>
            <div className={styles.selectWrapper}>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className={styles.selectField}
              >
                <option value="ALL">ALL VERSIONS</option>
                {GENERATION_VERSIONS.map((gen) => [
                  <optgroup key={gen.gen} label={gen.gen.toUpperCase()}>
                    {gen.rows.flatMap((row) => row.games).map((game) => (
                      <option key={game.name} value={game.name}>
                        {game.label}
                      </option>
                    ))}
                  </optgroup>
                ])}
              </select>
            </div>
          </div>

          {/* Type Filter */}
          <div className={styles.formGroup}>
            <span className={styles.inputLabel}>Type</span>
            <div className={styles.selectWrapper}>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={styles.selectField}
              >
                <option value="">All Types</option>
                {Object.keys(TYPE_COLORS).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Search */}
          <div className={styles.formGroup}>
            <span className={styles.inputLabel}>Search</span>
            <Search className={styles.searchIcon} size={14} />
            <input
              type="text"
              placeholder="Search by name or number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Hide Caught Switch */}
          <div className={styles.switchContainer}>
            <label className={`${styles.switchLabel} ${hideCaught ? styles.active : ''}`}>
              <div
                className={`${styles.switchTrack} ${hideCaught ? styles.checked : ''}`}
                onClick={() => setHideCaught(!hideCaught)}
              />
              HIDE CAUGHT
            </label>
          </div>

        </div>
      </div>

      {/* Results Count Info Label */}
      {!loading && !error && (
        <span className={styles.infoLabel}>
          Showing {filteredList.length} of {totalCount} Pokémon matching filters
        </span>
      )}

      {/* Grid Container */}
      {loading ? (
        <div className={styles.grid}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                height: 260,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-main)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />
          ))}
        </div>
      ) : error ? (
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
          <AlertTriangle />
          Backend offline — please start the server on port 3000.
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {visibleList.map((p) => (
                <motion.div
                  key={p.id}
                  layoutId={`pokemon-tracker-card-${p.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  style={{ height: '100%' }}
                >
                  <TrackerCard
                    pokemon={p}
                    isCaught={caughtSet.has(p.id)}
                    isShiny={shinySet.has(p.id)}
                    isShinyMode={isShinyMode}
                    onToggleCaught={handleToggleCaught}
                    onToggleShiny={handleToggleShiny}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredList.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <HelpCircle size={48} style={{ opacity: 0.4, marginBottom: 12 }} />
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-secondary)' }}>No Pokémon match this catch filter.</h3>
                <p style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Try toggling "Hide Caught" off or using a different search query.</p>
              </div>
            )}
          </div>

          {/* Load More manual trigger (fallback if scroll doesn't fire) */}
          {visibleLimit < filteredList.length && (
            <div className={styles.loadMoreContainer}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => setVisibleLimit((prev) => Math.min(prev + 40, filteredList.length))}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Confirm Mark All Dialog Backdrop Overlay */}
      {confirmMarkAllOpen && (
        <div className={styles.modalOverlay} onClick={() => setConfirmMarkAllOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              <CheckSquare style={{ color: 'var(--primary)' }} />
              Mark All as Caught?
            </h2>
            <p className={styles.modalDesc}>
              This will mark all <strong>{pokemonList.length} Pokémon</strong> currently matching your filters as <strong>caught</strong>. Do you want to proceed?
            </p>
            <div className={styles.modalActions}>
              <button className={`${styles.modalBtn} ${styles.cancel}`} onClick={() => setConfirmMarkAllOpen(false)}>
                Cancel
              </button>
              <button className={`${styles.modalBtn} ${styles.confirm}`} onClick={handleMarkAllConfirm}>
                Yes, Mark All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Reset Dialog Backdrop Overlay */}
      {confirmResetOpen && (
        <div className={styles.modalOverlay} onClick={() => setConfirmResetOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              <RotateCcw style={{ color: '#ef4444' }} />
              Reset All Catching Progress?
            </h2>
            <p className={styles.modalDesc}>
              Are you absolutely sure you want to reset your catching progress? This will revert all <strong>{caughtPokemonIds.length} caught Pokémon</strong> and <strong>{shinyPokemonIds.length} shiny Pokémon</strong> back to uncaught. This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button className={`${styles.modalBtn} ${styles.cancel}`} onClick={() => setConfirmResetOpen(false)}>
                Cancel
              </button>
              <button className={`${styles.modalBtn} ${styles.confirm} ${styles.danger}`} onClick={handleResetConfirm}>
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Detail Modal drawer */}
      {selectedId !== null && (
        <PokeDetail
          pokemonId={selectedId}
          onClose={() => setSelectedId(null)}
          onSelectPokemonId={setSelectedId}
        />
      )}
    </div>
  );
}
