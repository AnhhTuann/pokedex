/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gql, useQuery } from '@apollo/client';
import { Info, ChevronRight, X, Globe, FlaskConical, Heart, Sparkles, Moon, Sun, Play } from 'lucide-react';
import PokeCard from './components/PokeCard';
import SearchBar from './components/SearchBar';
import SchemaViz from './components/SchemaViz';
import PokeDetail from './components/PokeDetail';
import CompareModal from './components/CompareModal';
import GameModal from './components/GameModal';
import TeamBuilder from './components/TeamBuilder';
import { PokemonListItem } from './types';
import { useMyPokedex } from './lib/MyPokedexContext';
import { useTheme } from './lib/ThemeContext';

const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $ids: [Int!]) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, ids: $ids) {
      results {
        id
        name
        types
        image
      }
      totalCount
    }
  }
`;

export default function App() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [isGameMode, setIsGameMode] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const { favorites } = useMyPokedex();
  const { isDark, toggleTheme } = useTheme();

  const handleCardClick = (id: number) => {
    if (isCompareMode) {
      if (compareIds.includes(id)) {
        setCompareIds(prev => prev.filter(p => p !== id));
      } else {
        if (compareIds.length < 2) {
          setCompareIds(prev => [...prev, id]);
        }
      }
    } else {
      setSelectedId(id);
    }
  };

  const { data, loading, error, fetchMore } = useQuery<{ pokemonList: { results: PokemonListItem[], totalCount: number } }>(GET_POKEMON_LIST, {
    variables: {
      limit: 24,
      offset: 0,
      search,
      type: typeFilter,
      ids: showFavorites ? favorites : null,
    }
  });

  const pokemonList = data?.pokemonList?.results || [];
  const totalCount = data?.pokemonList?.totalCount || 0;
  const hasMore = pokemonList.length > 0 && pokemonList.length < totalCount;

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: pokemonList.length
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 transition-colors pb-32 xl:pb-0">
      <main className="flex-1 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-0 overflow-hidden min-h-screen shadow-2xl bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 transition-colors xl:mb-36">
        
        {/* Left Column: Explorer Content */}
        <div className="flex-1 p-10 space-y-10 overflow-y-auto relative">
          {/* Header Section */}
          <header className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-slate-100 leading-none">
                MODERN POKEDEX PROJECT
              </h1>
              <p className="text-sm font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 mt-2 uppercase">
                ReactJS Frontend <span className="text-slate-300 dark:text-slate-700 mx-2">|</span> GraphQL Backend
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={toggleTheme} className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center transition-colors">
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
          </header>

          <div className="space-y-8">
            <div className="flex flex-col xl:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <SearchBar value={search} onChange={setSearch} typeValue={typeFilter} onTypeChange={setTypeFilter} />
              </div>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-full xl:w-auto self-stretch">
                <button 
                  onClick={() => setShowFavorites(false)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-all text-xs ${!showFavorites ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  <Sparkles className="w-4 h-4" /> All
                </button>
                <button 
                  onClick={() => setShowFavorites(true)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-all text-xs ${showFavorites ? 'bg-white dark:bg-slate-700 shadow-sm text-pink-600 dark:text-pink-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  <Heart className={`w-4 h-4 ${showFavorites ? 'fill-pink-600 dark:fill-pink-400' : ''}`} /> Favorites
                </button>
                <button 
                  onClick={() => {
                    setIsCompareMode(p => !p);
                    if (isCompareMode) setCompareIds([]);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-all text-xs ${isCompareMode ? 'bg-indigo-600 shadow-sm text-white dark:bg-indigo-600 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  Compare
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 rounded-3xl animate-pulse bg-slate-100 dark:bg-slate-800 border-b-8 border-slate-200 dark:border-slate-700" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-10 font-bold uppercase">
                Chờ xíu, Backend đang kết nối (đợi vài giây)...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {pokemonList.map((p: PokemonListItem, idx: number) => (
                    <PokeCard 
                      key={p.id} 
                      pokemon={p} 
                      index={idx % 6}
                      onClick={() => handleCardClick(p.id)} 
                      isSelectedForCompare={compareIds.includes(p.id)}
                      isCompareMode={isCompareMode}
                    />
                  ))}
                </AnimatePresence>
                {pokemonList.length === 0 && (
                  <div className="col-span-full text-center text-slate-400 font-bold py-10 uppercase">
                    Không tìm thấy Pokemon nào.
                  </div>
                )}
              </div>
            )}

            {!loading && hasMore && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={loadMore}
                  className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-full font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-slate-900 transition-colors shadow-sm"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Meta Info & Visuals (Sidebar) */}
        <aside className="w-full lg:w-[380px] bg-slate-50/50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-10 flex flex-col h-screen lg:sticky lg:top-0">
          <div className="space-y-10 flex-1 overflow-y-auto">
            {/* Schema Visualization */}
            <div className="h-fit">
              <SchemaViz />
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
               <MetaBox 
                icon={Globe}
                label="Region"
                value="Bảo Lộc"
                sub="LAM DONG, VN"
               />
               <MetaBox 
                icon={FlaskConical}
                label="Protocol"
                value="GQL_V2"
                sub="ENDPOINT SECURE"
               />
            </div>

            {/* Game Button */}
            <div className="relative group cursor-pointer" onClick={() => setIsGameMode(true)}>
              <div className="absolute inset-0 bg-yellow-400 rounded-3xl translate-y-2 group-hover:translate-y-3 transition-transform" />
              <div className="relative bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 p-6 rounded-3xl group-hover:translate-y-1 transition-transform flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white tracking-tighter">Mini Game</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Who's That Pokemon?</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-yellow-600 dark:text-yellow-400 ml-1" />
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500">
                   <Info className="w-20 h-20 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-3 tracking-widest">Project Archive Notes</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                  Direct connection to PokeAPI GraphQL federated schema established. Rendering React nodes with concurrent-ready components.
                </p>
              </div>
              <div className="flex gap-4">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 <div className="w-2 h-2 rounded-full bg-indigo-500" />
                 <div className="w-2 h-2 rounded-full bg-pink-500" />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Detail Modal */}
      <PokeDetail id={selectedId} onClose={() => setSelectedId(null)} onSelect={(id) => setSelectedId(id)} />

      {/* Compare Modal */}
      <CompareModal 
        ids={compareIds} 
        onClose={() => {
          setCompareIds([]);
          setIsCompareMode(false);
        }} 
      />

      {isGameMode && <GameModal onClose={() => setIsGameMode(false)} />}

      {/* Team Builder Bar */}
      <TeamBuilder />
    </div>
  );
}

function NavItem({ children, active }: { children: React.ReactNode, active?: boolean }) {
  return (
    <button className={`px-4 h-10 flex items-center text-[10px] font-bold tracking-widest border border-transparent transition-all duration-300 rounded-lg uppercase ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}>
      {children}
    </button>
  );
}

function MetaBox({ icon: Icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="space-y-0.5">
        <div className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase leading-none">{value}</div>
        <div className="text-[9px] font-bold text-slate-400 tracking-tight uppercase">{sub}</div>
      </div>
    </div>
  );
}

