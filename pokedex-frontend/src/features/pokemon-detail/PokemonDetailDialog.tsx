import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { X, Heart, ShieldCheck, Zap, Scale, Ruler, Sparkles, Wand2 } from 'lucide-react';
import { usePokemonDetail } from '../../hooks/usePokemon';
import { useTeamStore } from '../../lib/teamStore';
import { formatSpeciesId, TYPE_COLORS, cn } from '../../lib/utils';
import { StatsSection } from './StatsSection';
import { EvolutionChain } from './EvolutionChain';
import { PokedexVoice } from './PokedexVoice';
import { MoveList } from './MoveList';
import { Button } from '../../components/common/Button';

interface PokemonDetailDialogProps {
  id: number | null;
  onClose: () => void;
  onSelect?: (id: number) => void;
}

export const PokemonDetailDialog: React.FC<PokemonDetailDialogProps> = ({ id, onClose, onSelect }) => {
  const { selectedVersion, team, addMember, removeMember, isShinyMode } = useTeamStore();
  const [showShiny, setShowShiny] = useState(isShinyMode);
  
  const { pokemon: p, loading, error } = usePokemonDetail(id, selectedVersion);

  useEffect(() => {
    setShowShiny(isShinyMode);
  }, [id, isShinyMode]);

  if (!id) return null;

  const inTeam = team.some(m => m.id === id);
  const accentColor = p ? (TYPE_COLORS[p.types[0]] || '#6366f1') : '#6366f1';
  const isMega = p?.name.toLowerCase().includes('mega') || p?.category?.toLowerCase().includes('mega');

  return (
    <Dialog
      open={!!id}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          className: "bg-transparent shadow-none overflow-visible max-h-[90vh] !overflow-visible",
        }
      }}
    >
      <AnimatePresence>
        {p && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex flex-col md:flex-row w-full h-full min-h-[500px] overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 shadow-2xl"
          >
            {/* Header / Image Section */}
            <div 
              className="relative w-full md:w-[40%] flex flex-col p-8 overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${accentColor}33 0%, ${accentColor}11 50%, transparent 100%)` 
              }}
            >
              {/* Decorative background circle */}
              <div 
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-20"
                style={{ backgroundColor: accentColor }}
              />

              <div className="flex items-center justify-between z-10">
                <span className="text-sm font-black tracking-[0.2em] text-white/30 uppercase">
                  {formatSpeciesId(p.speciesId || id)}
                </span>
                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => setShowShiny(!showShiny)}
                    className={cn(
                      "p-2 rounded-full transition-all",
                      showShiny ? "bg-yellow-500 text-slate-950" : "bg-white/5 text-slate-400 hover:text-white"
                    )}
                  >
                    <Sparkles size={16} />
                  </button>
                  <IconButton onClick={onClose} className="text-slate-400 hover:text-white bg-white/5">
                    <X size={20} />
                  </IconButton>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-6 z-10">
                <motion.div
                  key={showShiny ? 'shiny' : 'default'}
                  initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  className="relative group cursor-pointer"
                >
                  {isMega && (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-4 rounded-full border-2 border-dashed opacity-40"
                      style={{ borderColor: accentColor }}
                    />
                  )}
                  <img
                    src={showShiny && p.shinyImage ? p.shinyImage : p.image}
                    alt={p.name}
                    className="w-56 h-56 md:w-64 md:h-64 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>

                <div className="mt-8 text-center">
                  <h2 className="text-4xl font-black capitalize text-white tracking-tight leading-none mb-2">
                    {p.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    {p.types.map(t => (
                      <span 
                        key={t}
                        className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                        style={{ backgroundColor: TYPE_COLORS[t] }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.category && (
                    <p className="mt-4 text-xs font-bold italic text-slate-400 tracking-wide">
                      {p.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto z-10">
                <Button
                  className="w-full rounded-2xl py-6 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group"
                  variant={inTeam ? 'outline' : 'primary'}
                  onClick={() => inTeam ? removeMember(id) : addMember(p)}
                  style={!inTeam ? { backgroundColor: accentColor, boxShadow: `0 8px 24px ${accentColor}44` } : {}}
                >
                  <Heart size={16} className={cn(inTeam ? "fill-red-500 text-red-500" : "group-hover:scale-125 transition-transform")} />
                  {inTeam ? 'Remove from Team' : 'Add to Team'}
                </Button>
              </div>
            </div>

            {/* Scrollable Content Section */}
            <div className="flex-1 p-8 overflow-y-auto bg-slate-900/50 backdrop-blur-xl border-l border-white/5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="space-y-10">
                {/* Physical Traits */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center gap-1 group hover:bg-white/10 transition-colors">
                    <Ruler size={16} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Height</span>
                    <span className="text-sm font-black text-slate-200">{(p.height / 10).toFixed(1)} m</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center gap-1 group hover:bg-white/10 transition-colors">
                    <Scale size={16} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Weight</span>
                    <span className="text-sm font-black text-slate-200">{(p.weight / 10).toFixed(1)} kg</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center gap-1 group hover:bg-white/10 transition-colors">
                    <Zap size={16} className="text-slate-500 group-hover:text-yellow-400 transition-colors" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Abilities</span>
                    <div className="flex flex-wrap justify-center gap-1">
                      {p.abilities.map(a => (
                        <span key={a} className="text-[9px] font-bold text-slate-200 capitalize whitespace-nowrap">
                          {a.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <PokedexVoice description={p.description} accentColor={accentColor} cry={p.cry} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <StatsSection stats={p.stats} />
                  <div className="space-y-8">
                    {/* Type Matchups */}
                    <div className="space-y-3">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Matchups
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {p.matchups.filter(m => m.multiplier !== 1).map(m => (
                          <span 
                            key={m.type}
                            className={cn(
                              "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                              m.multiplier > 1 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            )}
                          >
                            {m.type} {m.multiplier}x
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <EvolutionChain evolutions={p.evolutions} currentId={p.id} onSelect={onSelect || (() => {})} />
                  </div>
                </div>

                {/* Varieties (Mega/Form) */}
                {(p.megaEvolutions?.length > 0 || p.alternativeForms?.length > 0) && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Forms & Megas
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {[...(p.megaEvolutions || []), ...(p.alternativeForms || [])].map(form => (
                        <motion.button
                          key={form.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelect?.(form.id)}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left group min-w-[180px]"
                        >
                          <div className="h-12 w-12 rounded-xl bg-slate-950 flex items-center justify-center p-1 group-hover:rotate-6 transition-transform">
                            <img src={form.image} alt={form.name} className="h-full w-full object-contain" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-indigo-400 tracking-tighter">
                              {form.isMega ? 'Mega Form' : 'Alt Form'}
                            </p>
                            <p className="text-[11px] font-bold text-slate-200 capitalize">
                              {form.name.replace('-', ' ')}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <MoveList moves={p.moves} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="flex items-center justify-center h-64 text-slate-400 font-black uppercase tracking-[0.3em] animate-pulse">
           Loading Database...
        </div>
      )}
    </Dialog>
  );
};
