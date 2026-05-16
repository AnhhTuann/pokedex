import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TYPE_COLORS } from '../../lib/utils';
import { Swords, Sparkles, ShieldAlert } from 'lucide-react';

interface Move {
  name: string;
  type: string;
  power?: number | null;
  accuracy?: number | null;
  pp?: number | null;
  damageClass: string;
  learnMethod: string;
  levelLearnedAt: number;
}

interface MoveListProps {
  moves: Move[];
}

export const MoveList: React.FC<MoveListProps> = ({ moves }) => {
  const [tab, setTab] = useState<'level' | 'machine' | 'tutor'>('level');

  const filteredMoves = moves.filter(m => {
    if (tab === 'level') return m.learnMethod === 'level-up';
    if (tab === 'machine') return m.learnMethod === 'machine';
    return m.learnMethod === 'tutor' || m.learnMethod === 'egg';
  }).sort((a, b) => a.levelLearnedAt - b.levelLearnedAt);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Move Sets
        </h4>
        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl text-[10px] font-black uppercase">
          {(['level', 'machine', 'tutor'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tab === t ? 'bg-white dark:bg-white/10 shadow-sm text-indigo-500' : 'text-slate-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/20">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="bg-white/5 text-slate-500 font-black uppercase tracking-wider">
              <th className="px-4 py-3">Move</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Cat</th>
              <th className="px-4 py-3 text-right">Pwr</th>
              <th className="px-4 py-3 text-right">Acc</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {filteredMoves.map((move, i) => (
                <motion.tr
                  key={move.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-black capitalize text-slate-200 group-hover:text-indigo-400">
                        {move.name.replace('-', ' ')}
                      </span>
                      {tab === 'level' && (
                        <span className="text-[9px] font-bold text-slate-500">
                          Level {move.levelLearnedAt}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span 
                      className="px-2 py-0.5 rounded text-[9px] font-black uppercase text-white"
                      style={{ backgroundColor: TYPE_COLORS[move.type] }}
                    >
                      {move.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {move.damageClass === 'physical' && <Swords size={14} className="text-red-400" />}
                    {move.damageClass === 'special' && <Sparkles size={14} className="text-blue-400" />}
                    {move.damageClass === 'status' && <ShieldAlert size={14} className="text-slate-400" />}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-300">
                    {move.power || '--'}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-300">
                    {move.accuracy || '--'}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredMoves.length === 0 && (
          <div className="py-10 text-center text-slate-500 font-bold italic">
            No moves found for this category.
          </div>
        )}
      </div>
    </div>
  );
};
