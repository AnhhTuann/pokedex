import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Zap, Volume2, Sparkles } from 'lucide-react';
import { gql, useQuery } from '@apollo/client';
import { useMyPokedex } from '../lib/MyPokedexContext';
import { useTeamStore } from '../lib/teamStore';

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon(id: $id) {
      id
      name
      types
      image
      height
      weight
      description
      abilities
      stats {
        name
        value
      }
      evolutions {
        id
        name
        types
        image
      }
    }
  }
`;

interface PokeDetailProps {
  id: number | null;
  onClose: () => void;
}

export default function PokeDetail({ id, onClose }: PokeDetailProps) {
  const { addMember, team, removeMember } = useTeamStore();
  const [showShiny, setShowShiny] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  
  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id },
    skip: !id,
  });

  // reset states when pokemon changes
  useEffect(() => {
    setShowShiny(false);
    setSelectedVersion(null);
  }, [id]);

  if (!id) return null;

  const details = data?.pokemon;
  const inTeam = team.some(p => p.id === id);

  const flavorTextObj = null;
  const displayDescription = details?.description || "No description available.";

  const playCry = () => {
    if (details?.cry) {
      const audio = new Audio(details.cry);
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio playback failed", e));
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
        />
        
        <motion.div
          layoutId={`pokemon-card-${id}`}
          className="w-full max-w-4xl bg-white dark:bg-slate-900 shadow-2xl rounded-[32px] overflow-hidden relative z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm bg-white dark:bg-slate-800"
            id="close-modal"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          {/* Left Side: Artwork */}
          <div className="md:col-span-5 bg-slate-50 dark:bg-slate-950 p-12 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[10px] font-bold text-slate-300">
               <div className="w-2 h-2 rounded-full bg-indigo-500" />
               POKEMON SOURCE ASSET
            </div>
            
            <div className="absolute top-8 right-16">
               <button
                 onClick={() => inTeam ? removeMember(id!) : addMember(details)}
                 className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm ${inTeam ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
               >
                 {inTeam ? 'Remove from Team' : 'Add to Team'}
               </button>
            </div>
            
            <motion.div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-full shadow-inner flex items-center justify-center p-8 relative">
              <motion.img
                key={showShiny ? 'shiny' : 'default'}
                src={showShiny ? (details?.shinyImage || details?.image) : details?.image}
                alt={details?.name}
                loading="lazy"
                className="w-full h-full object-contain relative z-10 drop-shadow-xl"
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 20 }}
              />
              {details?.cry && (
                <button 
                  onClick={playCry}
                  className="absolute bottom-0 right-0 p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg transition-transform hover:scale-110 z-20"
                  title="Play Cry"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
              {details?.shinyImage && (
                <button
                  onClick={() => setShowShiny(!showShiny)}
                  className={`absolute top-0 left-0 p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-20 ${showShiny ? 'bg-yellow-400 text-yellow-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-yellow-500 dark:hover:text-yellow-400'}`}
                  title="Toggle Shiny"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              )}
            </motion.div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-20 dark:opacity-40">
               <div className="text-4xl font-black italic text-slate-900 dark:text-slate-100">#{id.toString().padStart(3, '0')}</div>
               <div className="text-right">
                 <p className="text-[8px] font-mono font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">AUTHENTICITY GUARANTEED</p>
                 <p className="text-[8px] font-mono font-black uppercase tracking-tighter text-indigo-600 dark:text-indigo-400">SOURCE: POKEAPI-GQL</p>
               </div>
            </div>
          </div>

          {/* Right Side: Data */}
          <div className="md:col-span-7 p-12 space-y-8 overflow-y-auto max-h-[90vh] bg-white dark:bg-slate-900">
            <div className="space-y-4">
               <div className="flex gap-2">
                 {details?.types?.map((t: string) => (
                   <span key={t} className="text-[10px] font-bold uppercase py-1 px-3 bg-indigo-600 text-white rounded-full">
                     {t}
                   </span>
                 ))}
               </div>
               <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
                 {details?.name || 'Loading...'}
               </h2>
            </div>

            {loading ? (
              <div className="space-y-4 pt-10">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full animate-pulse" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-4/6 animate-pulse" />
              </div>
            ) : error ? (
              <div className="text-red-500">
                Failed to load Pokemon details: {error.message}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <p className="text-sm font-medium leading-relaxed uppercase tracking-tight text-slate-500 dark:text-slate-400 italic border-l-4 border-indigo-500 pl-4 py-1">
                    {displayDescription}
                  </p>
                  
                  {details?.flavorTexts && details.flavorTexts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pl-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Pokedex Entry:</span>
                      <select 
                        className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded px-2 py-1 outline-none appearance-none cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                        value={selectedVersion || details.flavorTexts[0].version}
                        onChange={(e) => setSelectedVersion(e.target.value)}
                      >
                        {Array.from(new Set(details.flavorTexts.map((f: any) => f.version))).map((ver: any) => (
                          <option key={ver} value={ver}>{ver.replace('-', ' ')}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex gap-10">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">WEIGHT</div>
                    <div className="text-lg font-black text-slate-800 dark:text-white">{(details?.weight / 10).toFixed(1)} kg</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">HEIGHT</div>
                    <div className="text-lg font-black text-slate-800 dark:text-white">{(details?.height / 10).toFixed(1)} m</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4">
                  {details?.stats?.map((stat: any) => (
                    <div key={stat.name} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span>{stat.name.replace('-', ' ')}</span>
                        <span className="text-slate-900 dark:text-white">{stat.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
                          className="h-full bg-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 flex items-center justify-between">
                   <div className="space-y-1">
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ABILITIES</div>
                     <div className="flex gap-4 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                       {details?.abilities?.map((a: string) => <span key={a}>{a.replace('-', ' ')}</span>)}
                     </div>
                   </div>
                </div>

                 {details?.matchups && details.matchups.length > 0 && (
                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">MATCHUPS</div>
                     <div className="flex flex-wrap gap-2">
                       {details.matchups.map((m: any) => {
                         const bg = m.multiplier > 1 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : m.multiplier < 1 && m.multiplier > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
                         return (
                           <span key={m.type} className={`text-[10px] font-bold uppercase py-1 px-2 rounded-md flex items-center gap-1 ${bg}`}>
                             {m.type} <span className="opacity-75">x{m.multiplier}</span>
                           </span>
                         )
                       })}
                     </div>
                  </div>
                )}

                {details?.gameVersions && details.gameVersions.length > 0 && (
                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">VERSION HISTORY</div>
                     <div className="flex flex-wrap gap-2">
                       {details.gameVersions.map((version: string) => (
                         <span key={version} className="px-2 py-1 text-[8px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-sm">
                           {version.replace('-', ' ')}
                         </span>
                       ))}
                     </div>
                  </div>
                )}

                {details?.evolutions && details.evolutions.length > 0 && (
                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">EVOLUTION CHAIN</div>
                    <div className="flex items-center gap-4">
                      {details.evolutions.map((evo: any, idx: number) => (
                        <React.Fragment key={evo.id}>
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 border-2 ${evo.id === details.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-700'}`}>
                            <img src={evo.image} alt={evo.name} loading="lazy" className="w-12 h-12 object-contain" />
                          </div>
                          {idx < details.evolutions.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
