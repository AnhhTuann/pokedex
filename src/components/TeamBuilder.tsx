import React, { useState } from 'react';
import { useTeamStore } from '../lib/teamStore';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { X, ShieldAlert, Zap, Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MovesModal from './MovesModal';

export default function TeamBuilder() {
  const { team, removeMember, reorderTeam } = useTeamStore();
  const [selectedForMoves, setSelectedForMoves] = useState<number | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTeam(result.source.index, result.destination.index);
  };

  const getTeamWeaknesses = () => {
    // simplified: just collect distinct weaknesses from team types, normally requires full type matrix
    // PokeAPI has full matrix, but since we don't have it synchronized perfectly here, we can mock or do a simple list
    // We'll just list the types the team has to show coverage, and missing primary types
    const typesPresent = new Set(team.flatMap(p => p.types));
    const allBasicTypes = ['water', 'fire', 'grass', 'electric', 'flying', 'ground', 'rock', 'psychic', 'fighting', 'steel', 'fairy', 'dark', 'ghost', 'dragon', 'ice', 'poison', 'bug', 'normal'];
    
    const missing = allBasicTypes.filter(t => !typesPresent.has(t));
    return { present: Array.from(typesPresent), missing };
  };

  const coverage = team.length > 0 ? getTeamWeaknesses() : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-2xl safe-area-pb">
      <div className="max-w-[1400px] mx-auto p-4 flex flex-col xl:flex-row gap-6 items-center">
        
        {/* Team Slots */}
        <div className="flex-1 w-full overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="team-slots" direction="horizontal">
              {(provided) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-4 min-w-max px-2"
                >
                  {team.map((pokemon, index) => (
                    // @ts-ignore
                    <Draggable key={pokemon.id.toString()} draggableId={pokemon.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => setSelectedForMoves(pokemon.id)}
                          className={`w-24 h-24 sm:w-28 sm:h-28 relative group cursor-pointer rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 transition-all ${snapshot.isDragging ? 'border-indigo-500 shadow-xl scale-105 z-50' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'}`}
                        >
                          <img src={pokemon.image} alt={pokemon.name} className="w-full h-full object-contain p-3 relative z-10" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMember(pokemon.id);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          {/* Indicator for moves */}
                          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                            {[0, 1, 2, 3].map(i => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${pokemon.moves && pokemon.moves[i] ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                            ))}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  
                  {/* Empty Slots */}
                  {Array.from({ length: 6 - team.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-slate-400">
                      <Plus className="w-6 h-6 mb-1 opacity-50" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Empty</span>
                    </div>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Team Analysis */}
        {coverage && (
          <div className="w-full xl:w-80 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-yellow-500" />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Type Coverage</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Covered Types</p>
                 <div className="flex flex-wrap gap-1">
                   {coverage.present.map(t => (
                     <span key={t} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                       {t}
                     </span>
                   ))}
                 </div>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                   <ShieldAlert className="w-3 h-3 text-red-400" /> Missing Core Types
                 </p>
                 <div className="flex flex-wrap gap-1">
                   {coverage.missing.slice(0, 5).map(t => (
                     <span key={t} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                       {t}
                     </span>
                   ))}
                   {coverage.missing.length > 5 && <span className="text-[9px] font-bold text-slate-400">+{coverage.missing.length - 5}</span>}
                 </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <AnimatePresence>
        {selectedForMoves && (
          <MovesModal 
            pokemonId={selectedForMoves} 
            onClose={() => setSelectedForMoves(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
