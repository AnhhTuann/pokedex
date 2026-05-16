import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Search, Scale } from 'lucide-react';
import PokeCard from './PokeCard';
import SearchBar from './SearchBar';
import { PokemonDetailDialog } from '../features/pokemon-detail/PokemonDetailDialog';
import CompareModal from './CompareModal';
import { useMyPokedex } from '../lib/MyPokedexContext';
import { useTeamStore } from '../lib/teamStore';
import { getRegionAndGame } from '../App';
import { usePokemonList } from '../hooks/usePokemon';
import { Button } from './common/Button';
import { cn } from '../lib/utils';

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
    queryRegion = zaTab === 'lumiose' ? 'kalos-central-lumiose' : 'kalos-central-hyperspace';
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

  const loadMore = () => {
    fetchMore({ variables: { offset: pokemonList.length } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Search & Filter Section */}
      <div className="mb-8 bg-white dark:bg-gray-800/40 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <SearchBar
          value={search}         onChange={setSearch}
          typeValue={typeFilter} onTypeChange={setTypeFilter}
          genValue={genFilter}   onGenChange={setGenFilter}
        />
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-center items-center mb-8">
        <div className="inline-flex rounded-xl p-1 bg-gray-100 dark:bg-gray-800/80 shadow-inner">
          <button
            onClick={() => { setViewMode('all'); setCompareIds([]); }}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
              viewMode === 'all' ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            )}
          >
            <Sparkles className="w-4 h-4" /> All
          </button>
          <button
            onClick={() => { setViewMode('favorites'); setCompareIds([]); }}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
              viewMode === 'favorites' ? "bg-white dark:bg-gray-700 text-red-500 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            )}
          >
            <Heart className="w-4 h-4" /> Favs ({favorites.length})
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
              viewMode === 'compare' ? "bg-white dark:bg-gray-700 text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            )}
          >
            <Scale className="w-4 h-4" /> {compareIds.length === 2 ? 'Compare (2)' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Legends: Z-A Regional Tabs */}
      {selectedVersion === 'legends-za' && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl p-1 bg-gray-100/50 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50">
            <button
              onClick={() => setZaTab('lumiose')}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                zaTab === 'lumiose' ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30" : "text-gray-500 dark:text-gray-400"
              )}
            >
              Lumiose City Dex
            </button>
            <button
              onClick={() => setZaTab('hyperspace')}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                zaTab === 'hyperspace' ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30" : "text-gray-500 dark:text-gray-400"
              )}
            >
              Hyperspace Dex
            </button>
          </div>
        </div>
      )}

      {/* Count */}
      {!loading && !error && (
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          {totalCount} Pokémon {search ? `matching "${search}"` : ''}{genFilter ? ` · Gen ${genFilter}` : ''}
        </p>
      )}

      {/* Compare banner */}
      {isCompareMode && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300 font-semibold text-center">
          {compareIds.length === 0 && 'Select 2 Pokémon to compare.'}
          {compareIds.length === 1 && 'Select 1 more Pokémon.'}
          {compareIds.length === 2 && 'Ready! Click a card to compare.'}
        </div>
      )}

      {/* Pokemon Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-center">
          Backend offline — start the server on port 3000.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
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

      {!loading && !error && pokemonList.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-bold text-lg">
          No Pokémon found.
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center mt-12 mb-20">
          <Button variant="outline" size="lg" onClick={loadMore} className="rounded-full px-8">
            Load More
          </Button>
        </div>
      )}

      {/* Modals */}
      <PokemonDetailDialog id={selectedId} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
      <CompareModal ids={compareIds} onClose={() => { setCompareIds([]); setViewMode('all'); }} />
    </div>
  );
}
