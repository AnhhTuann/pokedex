import React from 'react';
import { motion } from 'motion/react';
import { STAT_COLORS } from '../../lib/utils';

interface Stat {
  name: string;
  value: number;
}

interface StatsSectionProps {
  stats: Stat[];
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SPA',
  'special-defense': 'SPD',
  speed: 'SPE',
};

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const total = stats.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Base Stats
        </h4>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400">BST</span>
          <span className="text-sm font-black text-indigo-500">{total}</span>
        </div>
      </div>

      <div className="space-y-2">
        {stats.map((stat, i) => {
          const percentage = Math.min(100, (stat.value / 255) * 100);
          const color = STAT_COLORS[i % STAT_COLORS.length];
          const label = STAT_LABELS[stat.name] || stat.name;

          return (
            <div key={stat.name} className="group flex items-center gap-3">
              <div className="w-8 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 group-hover:text-slate-200 transition-colors">
                {label}
              </div>
              <div className="w-8 text-right text-xs font-bold dark:text-slate-200">
                {stat.value}
              </div>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}44` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
