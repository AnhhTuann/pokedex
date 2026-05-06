import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { X, Wand2, Crosshair, Zap, Shield } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { useTeamStore } from '../lib/teamStore';

const GET_POKEMON_MOVES = gql`
  query GetPokemonMoves($id: Int!) {
    pokemon(id: $id) {
      id
      name
      types
      image
      moves {
        name
        type
        power
        accuracy
        damageClass
      }
    }
  }
`;

interface MovesModalProps {
  pokemonId: number;
  onClose: () => void;
}

export default function MovesModal({ pokemonId, onClose }: MovesModalProps) {
  const { team, setMoves } = useTeamStore();
  const teamMember = team.find(p => p.id === pokemonId);
  
  const { data, loading } = useQuery(GET_POKEMON_MOVES, {
    variables: { id: pokemonId },
    fetchPolicy: 'cache-first'
  });

  const pokemon = data?.pokemon;
  const availableMoves = pokemon?.moves || [];

  // Local state for moves being drafted
  const [selectedMoves, setSelectedMoves] = useState<any[]>(teamMember?.moves || []);

  const handleToggleMove = (move: any) => {
    setSelectedMoves(prev => {
      const exists = prev.find(m => m.name === move.name);
      if (exists) {
        return prev.filter(m => m.name !== move.name);
      } else {
        if (prev.length >= 4) return prev; // max 4
        return [...prev, move];
      }
    });
  };

  const handleSave = () => {
    setMoves(pokemonId, selectedMoves);
    onClose();
  };

  const recommendMoves = () => {
    if (!pokemon) return;
    const types = pokemon.types;
    
    // Auto-Recommend: Recommend 4 moves using STAB (Same Type Attack Bonus) and highest Power.
    // 1. Separate moves into STAB and Non-STAB
    // 2. Sort by Power (descending), then Accuracy (descending)
    // 3. Take up to 2 STAB moves (different types if possible) and 2 coverage moves, or just top 4.
    
    let validMoves = availableMoves.filter((m: any) => m.power && m.power > 0);
    
    const stabMoves = validMoves.filter((m: any) => types.includes(m.type));
    const nonStabMoves = validMoves.filter((m: any) => !types.includes(m.type));
    
    const sortByPower = (a: any, b: any) => {
      if (b.power !== a.power) return b.power - a.power;
      return (b.accuracy || 0) - (a.accuracy || 0);
    };

    stabMoves.sort(sortByPower);
    nonStabMoves.sort(sortByPower);

    const recommended = [];
    // Try to get 1 best move per STAB type
    const usedTypes = new Set();
    for (const m of stabMoves) {
      if (!usedTypes.has(m.type) && recommended.length < 2) {
        recommended.push(m);
        usedTypes.add(m.type);
      }
    }
    
    // Fill the rest with best overall remaining moves (STAB or non-STAB)
    const remainingPool = [...stabMoves, ...nonStabMoves].filter(m => !recommended.find(r => r.name === m.name));
    remainingPool.sort(sortByPower);
    
    while(recommended.length < 4 && remainingPool.length > 0) {
      recommended.push(remainingPool.shift());
    }

    setSelectedMoves(recommended);
  };

  const typeConfig: Record<string, { bg: string, text: string }> = {
    normal: { bg: 'bg-stone-200 dark:bg-stone-800', text: 'text-stone-700 dark:text-stone-300' },
    fire: { bg: 'bg-red-500', text: 'text-white' },
    water: { bg: 'bg-blue-500', text: 'text-white' },
    electric: { bg: 'bg-yellow-400', text: 'text-slate-900' },
    grass: { bg: 'bg-emerald-500', text: 'text-white' },
    ice: { bg: 'bg-cyan-300', text: 'text-slate-900' },
    fighting: { bg: 'bg-orange-700', text: 'text-white' },
    poison: { bg: 'bg-purple-500', text: 'text-white' },
    ground: { bg: 'bg-amber-600', text: 'text-white' },
    flying: { bg: 'bg-indigo-300', text: 'text-slate-900' },
    psychic: { bg: 'bg-pink-500', text: 'text-white' },
    bug: { bg: 'bg-lime-500', text: 'text-slate-900' },
    rock: { bg: 'bg-yellow-700', text: 'text-white' },
    ghost: { bg: 'bg-violet-700', text: 'text-white' },
    dragon: { bg: 'bg-indigo-700', text: 'text-white' },
    dark: { bg: 'bg-slate-800', text: 'text-white' },
    steel: { bg: 'bg-slate-400', text: 'text-slate-900' },
    fairy: { bg: 'bg-pink-300', text: 'text-slate-900' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl bg-white dark:bg-slate-900 shadow-2xl rounded-[32px] overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center p-2">
              {teamMember?.image && <img src={teamMember.image} alt="Pokemon" className="w-full h-full object-contain" />}
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
                {teamMember?.name} Moveset
              </h2>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mt-1">
                Select up to 4 moves
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(i => {
              const m = selectedMoves[i];
              return (
                <div key={i} className={`w-32 h-16 rounded-xl border-2 flex flex-col items-center justify-center relative overflow-hidden ${m ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-dashed border-slate-300 dark:border-slate-600'}`}>
                  {m ? (
                    <>
                      <span className="text-xs font-black uppercase tracking-tighter text-indigo-700 dark:text-indigo-400 truncate w-full px-2 text-center z-10 relative">{m.name.replace('-', ' ')}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500 z-10 relative">{m.type}</span>
                      {typeConfig[m.type] && (
                        <div className={`absolute bottom-0 inset-x-0 h-1 ${typeConfig[m.type].bg}`} />
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Empty Slot</span>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={recommendMoves}
              disabled={loading || availableMoves.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors disabled:opacity-50"
            >
              <Wand2 className="w-4 h-4" /> Auto-Build
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-colors shadow-md"
            >
              Save Team
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white dark:bg-slate-900">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableMoves.map((m: any) => {
                const isSelected = selectedMoves.find(s => s.name === m.name);
                const isStab = pokemon?.types.includes(m.type);
                const colors = typeConfig[m.type] || typeConfig.normal;
                
                return (
                  <div 
                    key={m.name}
                    onClick={() => handleToggleMove(m)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 shadow-sm' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                          {m.name.replace('-', ' ')}
                          {isStab && <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 text-[8px] font-bold rounded uppercase tracking-widest">STAB</span>}
                        </h4>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${colors.bg} ${colors.text}`}>
                          {m.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.damageClass}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{m.power || '--'}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">PWR</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Crosshair className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{m.accuracy || '--'}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ACC</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
