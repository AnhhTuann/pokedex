/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Info, ChevronRight, X, Cpu, Globe, FlaskConical } from 'lucide-react';
import { fetchPokemonList, fetchPokemonDetail } from './lib/pokeApi';
import { PokemonListItem, Pokemon } from './types';
import PokeCard from './components/PokeCard';
import SearchBar from './components/SearchBar';
import SchemaViz from './components/SchemaViz';

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [details, setDetails] = useState<Pokemon | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchPokemonList(40).then(list => {
      setPokemonList(list);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedId) {
      setDetailLoading(true);
      fetchPokemonDetail(selectedId).then(data => {
        setDetails(data);
        setDetailLoading(false);
      });
    } else {
      setDetails(null);
    }
  }, [selectedId]);

  const filtered = useMemo(() => {
    return pokemonList.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString() === search
    );
  }, [pokemonList, search]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <main className="flex-1 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-0 overflow-hidden min-h-screen shadow-2xl bg-white border-x border-slate-200">
        
        {/* Left Column: Explorer Content */}
        <div className="flex-1 p-10 space-y-10 overflow-y-auto">
          {/* Header Section */}
          <header className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
                MODERN POKEDEX PROJECT
              </h1>
              <p className="text-sm font-semibold tracking-widest text-indigo-600 mt-2 uppercase">
                ReactJS Frontend <span className="text-slate-300 mx-2">|</span> GraphQL Backend
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </header>

          <div className="space-y-8">
            <SearchBar value={search} onChange={setSearch} />
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 rounded-3xl animate-pulse bg-slate-100 border-b-8 border-slate-200" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((p, idx) => (
                    <PokeCard 
                      key={p.id} 
                      pokemon={p} 
                      index={idx % 6}
                      onClick={() => setSelectedId(p.id)} 
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Meta Info & Visuals (Sidebar) */}
        <aside className="w-full lg:w-[380px] bg-slate-50/50 border-l border-slate-200 p-10 flex flex-col h-screen lg:sticky lg:top-0">
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

            {/* Status Footer */}
            <div className="pt-10 border-t border-slate-200 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                   <Info className="w-20 h-20 text-indigo-600" />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-3 tracking-widest">Project Archive Notes</p>
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
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
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-white shadow-2xl rounded-[32px] overflow-hidden relative z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm bg-white"
                id="close-modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {/* Left Side: Artwork */}
              <div className="md:col-span-5 bg-slate-50 p-12 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[10px] font-bold text-slate-300">
                   <div className="w-2 h-2 rounded-full bg-indigo-500" />
                   POKEMON SOURCE ASSET
                </div>
                
                <motion.div className="w-full aspect-square bg-white rounded-full shadow-inner flex items-center justify-center p-8">
                  <motion.img
                    src={details?.image}
                    alt={details?.name}
                    className="w-full h-full object-contain relative z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                </motion.div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-20">
                   <div className="text-4xl font-black italic text-slate-900">#{selectedId.toString().padStart(3, '0')}</div>
                   <div className="text-right">
                     <p className="text-[8px] font-mono font-black uppercase tracking-tighter">AUTHENTICITY GUARANTEED</p>
                     <p className="text-[8px] font-mono font-black uppercase tracking-tighter text-indigo-600">SOURCE: POKEAPI-GQL</p>
                   </div>
                </div>
              </div>

              {/* Right Side: Data */}
              <div className="md:col-span-7 p-12 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                   <div className="flex gap-2">
                     {details?.types.map(t => (
                       <span key={t} className="text-[10px] font-bold uppercase py-1 px-3 bg-indigo-600 text-white rounded-full">
                         {t}
                       </span>
                     ))}
                   </div>
                   <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">
                     {details?.name || 'Loading...'}
                   </h2>
                </div>

                {detailLoading ? (
                  <div className="space-y-4 pt-10">
                    <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
                    <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-slate-100 rounded w-4/6 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium leading-relaxed uppercase tracking-tight text-slate-500 italic border-l-4 border-indigo-500 pl-4 py-1">
                      {details?.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4">
                      {details?.stats?.map(stat => (
                        <div key={stat.name} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <span>{stat.name}</span>
                            <span className="text-slate-900">{stat.value}</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(stat.value / 255) * 100}%` }}
                              className="h-full bg-indigo-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                       <div className="space-y-1">
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ABILITIES</div>
                         <div className="flex gap-4 text-xs font-bold uppercase text-slate-700">
                           {details?.abilities?.map(a => <span key={a}>{a}</span>)}
                         </div>
                       </div>
                       <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-pink-600"
                       >
                         SCHEMA DATA <ChevronRight className="w-3 h-3" />
                       </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-indigo-600" />
        </div>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="space-y-0.5">
        <div className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">{value}</div>
        <div className="text-[9px] font-bold text-slate-400 tracking-tight uppercase">{sub}</div>
      </div>
    </div>
  );
}

