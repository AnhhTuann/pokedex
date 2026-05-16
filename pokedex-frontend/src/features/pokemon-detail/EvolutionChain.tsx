import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { TYPE_COLORS } from '../../lib/utils';

interface Evolution {
  id: number;
  name: string;
  types: string[];
  image: string;
  minLevel?: number | null;
  trigger?: string | null;
}

interface EvolutionChainProps {
  evolutions: Evolution[];
  currentId: number;
  onSelect: (id: number) => void;
}

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolutions, currentId, onSelect }) => {
  if (evolutions.length <= 1) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Evolution Chain
      </h4>

      <div className="flex flex-wrap items-center gap-2">
        {evolutions.map((evo, index) => (
          <React.Fragment key={evo.id}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(evo.id)}
              className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
                evo.id === currentId 
                  ? 'bg-indigo-500/10 ring-2 ring-indigo-500/50' 
                  : 'hover:bg-white/5'
              }`}
            >
              <div 
                className="relative flex items-center justify-center h-16 w-16 rounded-full transition-transform group-hover:rotate-12"
                style={{ backgroundColor: `${TYPE_COLORS[evo.types[0]]}22` }}
              >
                <img 
                  src={evo.image} 
                  alt={evo.name}
                  className="h-12 w-12 object-contain drop-shadow-lg"
                />
              </div>
              <span className={`text-[10px] font-black capitalize ${
                evo.id === currentId ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
              }`}>
                {evo.name}
              </span>
            </motion.button>

            {index < evolutions.length - 1 && (
              <div className="flex flex-col items-center text-slate-500">
                <ChevronRight size={16} />
                {(evolutions[index + 1].minLevel || evolutions[index + 1].trigger) && (
                  <span className="text-[8px] font-bold uppercase whitespace-nowrap">
                    {evolutions[index + 1].minLevel 
                      ? `Lv. ${evolutions[index + 1].minLevel}` 
                      : evolutions[index + 1].trigger?.replace('-', ' ')}
                  </span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
