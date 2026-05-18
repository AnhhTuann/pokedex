import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Scale } from 'lucide-react';
import PokeCard from '../components/PokeCard';
import SearchBar from '../components/SearchBar';
import { PokemonDetailDialog } from '../features/pokemon-detail/PokemonDetailDialog';
import CompareModal from '../components/CompareModal';
import { useMyPokedex } from '../lib/MyPokedexContext';
import { useTeamStore } from '../lib/teamStore';
import { getRegionAndGame } from '../App';
import { usePokemonList } from '../hooks/usePokemon';
import { Button } from '../components/common/Button';
import { cn } from '../lib/utils';
import styles from '../styles/pages/PokemonDex.module.scss';

type ViewMode = 'all' | 'favorites' | 'compare';

export default function PokemonDex() {
  const { selectedVersion } = useTeamStore();
  const { favorites } = useMyPokedex();

  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [genFilter, setGenFilter]     = useState<number | null>(null);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>('all');
  const [compareIds, setCompareIds]   = useState<number[]>([]);
  const [zaTab, setZaTab]             = useState<'lumiose' | 'hyperspace'>('lumiose');

  const isCompareMode = viewMode === 'compare';
  const showFavorites = viewMode === 'favorites';

  const handleCardClick = (id: number) => {
    if (isCompareMode) {
      setCompareIds(prev =>
        prev.includes(id) ? prev.filter(p => p !== id)
          : prev.length < 2 ? [...prev, id] : prev
      );
    } else {
      setSelectedId(id);
    }
  };

  const { region: rawRegion, game: rawGame } = getRegionAndGame(selectedVersion);
  let queryRegion = rawRegion !== 'ALL' ? rawRegion : undefined;
  const queryGame = rawGame !== 'ALL' ? rawGame : undefined;

  if (selectedVersion === 'legends-za') {
    queryRegion = zaTab === 'lumiose' ? 'lumiose-city' : 'hyperspace';
  }

  const { pokemonList, totalCount, loading, error, fetchMore } = usePokemonList({
    limit: 24, 
    offset: 0, 
    search, 
    type: typeFilter, 
    gen: genFilter, 
    ids: showFavorites ? favorites : null,
    region: queryRegion,
    game: queryGame
  });

  const hasMore = pokemonList.length > 0 && pokemonList.length < totalCount;
  const isInitialLoad = loading && pokemonList.length === 0;

  const loadMore = () => {
    fetchMore({ variables: { offset: pokemonList.length } });
  };

  return (
    <div className={styles.container}>
      
      {/* Search & Filter Section */}
      <div className={styles.searchWrapper}>
        <SearchBar
          value={search}         onChange={setSearch}
          typeValue={typeFilter} onTypeChange={setTypeFilter}
          genValue={genFilter}   onGenChange={setGenFilter}
        />
      </div>

      {/* View Mode Toggle */}
      <div className={styles.modeToggleWrapper}>
        <div className={styles.modeToggle}>
          <button
            onClick={() => { setViewMode('all'); setCompareIds([]); }}
            className={cn(
              styles.modeBtn,
              viewMode === 'all' && styles.activeBtnAll
            )}
          >
            <Sparkles size={16} />
            <span>All</span>
          </button>
          
          <button
            onClick={() => { setViewMode('favorites'); setCompareIds([]); }}
            className={cn(
              styles.modeBtn,
              viewMode === 'favorites' && styles.activeBtnFav
            )}
          >
            <Heart size={16} />
            <span>Favs ({favorites.length})</span>
          </button>
          
          <button
            onClick={() => setViewMode('compare')}
            className={cn(
              styles.modeBtn,
              viewMode === 'compare' && styles.activeBtnComp
            )}
          >
            <Scale size={16} />
            <span>{compareIds.length === 2 ? 'Compare (2)' : 'Compare'}</span>
          </button>
        </div>
      </div>

      {/* Legends: Z-A Regional Tabs */}
      {selectedVersion === 'legends-za' && (
        <div className={styles.zaTabWrapper}>
          <div className={styles.zaToggle}>
            <button
              onClick={() => setZaTab('lumiose')}
              className={cn(
                styles.zaTab,
                zaTab === 'lumiose' && styles.activeZaTab
              )}
            >
              Lumiose City Dex
            </button>
            <button
              onClick={() => setZaTab('hyperspace')}
              className={cn(
                styles.zaTab,
                zaTab === 'hyperspace' && styles.activeZaTab
              )}
            >
              Hyperspace Dex
            </button>
          </div>
        </div>
      )}

      {/* Count */}
      {!isInitialLoad && !error && (
        <p className={styles.infoText}>
          {totalCount} Pokémon {search ? `matching "${search}"` : ''}{genFilter ? ` · Gen ${genFilter}` : ''}
        </p>
      )}

      {/* Compare banner */}
      {isCompareMode && (
        <div className={styles.compareBanner}>
          {compareIds.length === 0 && 'Select 2 Pokémon to compare.'}
          {compareIds.length === 1 && 'Select 1 more Pokémon.'}
          {compareIds.length === 2 && 'Ready! Click a card to compare.'}
        </div>
      )}

      {/* Pokemon Grid */}
      {isInitialLoad ? (
        <div className={styles.pokemonGrid}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      ) : error ? (
        <div className={styles.offlineBanner}>
          Backend offline — start the server on port 3000.
        </div>
      ) : (
        <div className={styles.pokemonGrid}>
          <AnimatePresence mode="wait">
            {pokemonList.map((p: any, idx: number) => (
              <PokeCard
                key={p.id}
                pokemon={p}
                index={idx % 12}
                onClick={() => handleCardClick(p.id)}
                isCompareMode={isCompareMode}
                isSelectedForCompare={compareIds.includes(p.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isInitialLoad && !error && pokemonList.length === 0 && (
        <div className={styles.emptyText}>
          No Pokémon found.
        </div>
      )}

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button variant="outline" size="lg" onClick={loadMore} isLoading={loading} className="rounded-full px-8">
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* Modals */}
      <PokemonDetailDialog id={selectedId} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
      <CompareModal ids={compareIds} onClose={() => { setCompareIds([]); setViewMode('all'); }} />
    </div>
  );
}
