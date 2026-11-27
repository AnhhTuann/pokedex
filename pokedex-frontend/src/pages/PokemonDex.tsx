import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Scale } from 'lucide-react';
import PokeCard from '../components/PokeCard';
import SearchBar from '../components/SearchBar';
import { PokemonDetailDialog } from '../features/pokemon-detail/PokemonDetailDialog';
import CompareModal from '../components/CompareModal';
import { useMyPokedex } from '../lib/MyPokedexContext';
import { useTeamStore } from '../lib/teamStore';
import { getGameGenerationStrict, getRegionalPokemonListFilters } from '../lib/gameVersions';
import { useReferenceCatalog, useReferenceList } from '../hooks/useReferencePokemon';
import { useColorMode } from '../main';
import { assetUrl } from '../lib/apiConfig';
import { Button } from '../components/common/Button';
import { cn } from '../lib/utils';
import styles from '../styles/pages/PokemonDex.module.scss';

type ViewMode = 'all' | 'favorites' | 'compare';

export default function PokemonDex() {
  const { selectedVersion } = useTeamStore();
  const darkHome = useColorMode().mode === 'dark';
  const { favorites } = useMyPokedex();

  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [genFilter, setGenFilter]     = useState<number | null>(null);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>('all');
  const [compareIds, setCompareIds]   = useState<number[]>([]);
  const [dexMode, setDexMode]         = useState<'regional' | 'national'>('regional');
  const [zaTab, setZaTab]             = useState<'lumiose' | 'hyperspace'>('lumiose');

  useEffect(() => {
    setDexMode('regional');
  }, [selectedVersion]);

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

  const regionalFilters = getRegionalPokemonListFilters(selectedVersion, zaTab);
  const gameGen = getGameGenerationStrict(selectedVersion);

  const [exactDex, setExactDex] = useState('');
  const [broadRegion, setBroadRegion] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [evidence, setEvidence] = useState('');
  const catalog = useReferenceCatalog();
  const activeGame = catalog?.games.find(game => game.slug === selectedVersion);
  const preferredDex = selectedVersion === 'legends-za'
    ? regionalFilters.region
    : activeGame?.referenceDexes[0];
  const queryDex = exactDex || (dexMode === 'regional' ? preferredDex : undefined);
  const game = regionalFilters.game;
  const { pokemonList, totalCount, loading, error, loadMore } = useReferenceList({
    limit: 24, offset: 0, search, type: typeFilter, gen: genFilter,
    ids: showFavorites ? favorites : null, dex: queryDex, game,
    broadRegion: broadRegion || undefined, category: formCategory || undefined,
    availability: game ? (evidence === 'UNKNOWN' ? 'GAME_PRESENCE_EVIDENCE'
      : evidence || (queryDex ? 'REGIONAL_DEX_MEMBER' : 'GAME_PRESENCE_EVIDENCE')) : undefined,
    availabilityState: game && evidence === 'UNKNOWN' ? 'UNKNOWN' : undefined,
  });

  const hasMore = pokemonList.length > 0 && pokemonList.length < totalCount;
  const isInitialLoad = loading && pokemonList.length === 0;

  return (
    <div className={cn(styles.container, darkHome && styles.darkHome)}>
      
      {darkHome ? (
        <section className={styles.hero} aria-labelledby="discovery-title">
          <div className={styles.heroCopy}>
            <h2 id="discovery-title">Discover <span>Pokémon</span></h2>
            <p>Explore every region and find your next favorite.</p>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <Sparkles className={styles.heroSpark} size={26} />
            <img src={assetUrl('/images/pokemon/normal/pikachu.webp')} alt="" />
          </div>
        </section>
      ) : <h2 className={styles.heading}>Pokédex</h2>}
      {/* Search & Filter Section */}
      <div className={styles.searchWrapper}>
        <SearchBar discovery={darkHome}
          value={search}         onChange={setSearch}
          typeValue={typeFilter} onTypeChange={setTypeFilter}
          genValue={genFilter}   onGenChange={setGenFilter}
        />
        <div className={styles.filterGrid}>
          <label>Region <select aria-label="Region" value={broadRegion} onChange={event => setBroadRegion(event.target.value)}>
            <option value="">All regions</option>
            {[...new Set(catalog?.dexes.flatMap(dex => dex.region ? [dex.region] : []))].sort().map(region =>
              <option key={region} value={region}>{region}</option>)}
          </select></label>
          <label>Exact Dex <select aria-label="Exact Dex" value={exactDex} onChange={event => setExactDex(event.target.value)}>
            <option value="">{darkHome ? 'Game scope' : 'Use game scope'}</option>
            {catalog?.dexes.map(dex => <option key={dex.slug} value={dex.slug}>{dex.slug}</option>)}
          </select></label>
          <label>Form <select aria-label="Form" value={formCategory} onChange={event => setFormCategory(event.target.value)}>
            <option value="">All forms</option>
            {['DEFAULT', 'ALTERNATE', 'REGIONAL', 'MEGA', 'GIGANTAMAX', 'BATTLE', 'COSMETIC', 'OTHER', 'UNKNOWN'].map(category =>
              <option key={category} value={category}>{category.toLowerCase()}</option>)}
          </select></label>
          {game && <label>Game evidence <select aria-label="Game evidence" value={evidence} onChange={event => setEvidence(event.target.value)}>
            <option value="">Use game scope</option>
            {['REGIONAL_DEX_MEMBER', 'GAME_PRESENCE_EVIDENCE', 'OBTAINABLE', 'WILD_CATCHABLE', 'TRANSFER_AVAILABLE', 'EVENT_AVAILABLE', 'UNKNOWN'].map(facet =>
              <option key={facet} value={facet}>{facet.toLowerCase().replaceAll('_', ' ')}</option>)}
          </select></label>}
        </div>
      </div>

      <div className={styles.collectionToolbar}>
        {/* View Mode Toggle */}
        <div className={styles.modeToggleWrapper}>
          <div className={styles.modeToggle}>
            <button
              onClick={() => { setViewMode('all'); setCompareIds([]); }}
              aria-pressed={viewMode === 'all'}
              className={cn(
                styles.modeBtn,
                viewMode === 'all' && styles.activeBtnAll
              )}
            >
              <Sparkles size={16} />
              <span>{darkHome ? 'All Pokémon' : 'All'}</span>
            </button>

            <button
              onClick={() => { setViewMode('favorites'); setCompareIds([]); }}
              aria-pressed={viewMode === 'favorites'}
              className={cn(
                styles.modeBtn,
                viewMode === 'favorites' && styles.activeBtnFav
              )}
            >
              <Heart size={16} />
              <span>Favorites ({favorites.length})</span>
            </button>

            <button
              onClick={() => setViewMode('compare')}
              aria-pressed={viewMode === 'compare'}
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

        {/* Regional vs National Dex Switcher */}
        {gameGen !== null && selectedVersion !== 'ALL' && (
          <div className={styles.dexTabWrapper}>
            <div className={styles.dexToggle}>
              <button
                onClick={() => { setExactDex(''); setDexMode('regional'); }}
                className={cn(
                  styles.dexTab,
                  dexMode === 'regional' && styles.activeDexTab
                )}
              >
                {(() => {
                  if (!preferredDex) return 'Regional Dex';
                  const parts = preferredDex.split('-');
                  const capitalized = parts
                    .map(p => {
                      if (p === 'original' || p === 'extended' || p === 'updated' || p === 'letsgo') return '';
                      return p.charAt(0).toUpperCase() + p.slice(1);
                    })
                    .filter(Boolean)
                    .join(' ');
                  return `${capitalized || 'Regional'} Dex`;
                })()}
              </button>
              <button
                onClick={() => { setExactDex(''); setDexMode('national'); }}
                className={cn(
                  styles.dexTab,
                  dexMode === 'national' && styles.activeDexTab
                )}
              >
                National Dex
              </button>
            </div>
          </div>
        )}

        {/* Legends: Z-A Regional Tabs */}
        {selectedVersion === 'legends-za' && dexMode === 'regional' && (
          <div className={styles.zaTabWrapper}>
            <div className={styles.zaToggle}>
              <button
                onClick={() => { setExactDex(''); setZaTab('lumiose'); }}
                className={cn(
                  styles.zaTab,
                  zaTab === 'lumiose' && styles.activeZaTab
                )}
              >
                Lumiose City Dex
              </button>
              <button
                onClick={() => { setExactDex(''); setZaTab('hyperspace'); }}
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

      </div>

      {/* Compare banner */}
      {isCompareMode && (
        <div className={styles.compareBanner}>
          {compareIds.length === 0 && 'Select 2 Pokémon to compare.'}
          {compareIds.length === 1 && 'Select 1 more Pokémon.'}
          {compareIds.length === 2 && 'Comparing the selected Pokémon.'}
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
          Unable to load Pokémon for these filters.
        </div>
      ) : (
        <div className={styles.pokemonGrid}>
            {pokemonList.map((p, index) => (
              <PokeCard
                key={p.id}
                pokemon={p}
                discoveryIndex={darkHome ? index : undefined}
                onClick={() => handleCardClick(p.id)}
                isCompareMode={isCompareMode}
                isSelectedForCompare={compareIds.includes(p.id)}
              />
            ))}
        </div>
      )}

      {!isInitialLoad && !error && pokemonList.length === 0 && (
        <div className={styles.emptyText}>
          No Pokémon found.
        </div>
      )}

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          {darkHome && <span className={styles.pageProgress} role="status">
            Showing {pokemonList.length.toLocaleString('en-US')} of {totalCount.toLocaleString('en-US')} forms
          </span>}
          <Button variant="outline" size="lg" onClick={() => { if (!loading) void loadMore(); }} isLoading={loading} className="rounded-full px-8">
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
