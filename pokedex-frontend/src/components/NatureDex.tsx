import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NatureItem {
  name: string;
  up: string | null;
  down: string | null;
  likes: string | null;
  hates: string | null;
  desc: string;
  bestFor: Array<{ id: number; name: string }>;
}

const STAT_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  'Attack':      { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',    label: 'ATK' },
  'Defense':     { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',   label: 'DEF' },
  'Sp. Attack':  { color: '#a855f7', bg: 'rgba(168,85,247,0.12)',   label: 'SPA' },
  'Sp. Defense': { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',    label: 'SPD' },
  'Speed':       { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',   label: 'SPE' },
};

const FLAVOR_EMOJI: Record<string, string> = {
  Spicy: '🌶️', Sour: '🍋', Sweet: '🍬', Dry: '☕', Bitter: '🍵',
};

const NATURES: NatureItem[] = [
  { name: 'Hardy',   up: null,          down: null,          likes: null,    hates: null,    desc: 'No stat change.',                             bestFor: [] },
  { name: 'Lonely',  up: 'Attack',      down: 'Defense',     likes: 'Spicy', hates: 'Sour',  desc: 'Physical power, less bulk.',                  bestFor: [{ id: 448, name: 'Lucario' }] },
  { name: 'Brave',   up: 'Attack',      down: 'Speed',       likes: 'Spicy', hates: 'Sweet', desc: 'Trick Room physical powerhouse.',              bestFor: [{ id: 376, name: 'Metagross' }] },
  { name: 'Adamant', up: 'Attack',      down: 'Sp. Attack',  likes: 'Spicy', hates: 'Dry',   desc: 'Best pure physical attacker.',                bestFor: [{ id: 445, name: 'Garchomp' }, { id: 392, name: 'Infernape' }] },
  { name: 'Naughty', up: 'Attack',      down: 'Sp. Defense', likes: 'Spicy', hates: 'Bitter',desc: 'Physical glass cannon.',                       bestFor: [{ id: 260, name: 'Swampert' }] },
  { name: 'Bold',    up: 'Defense',     down: 'Attack',      likes: 'Sour',  hates: 'Spicy', desc: 'Classic physical wall.',                      bestFor: [{ id: 242, name: 'Blissey' }, { id: 121, name: 'Starmie' }] },
  { name: 'Docile',  up: null,          down: null,          likes: null,    hates: null,    desc: 'No stat change.',                             bestFor: [] },
  { name: 'Relaxed', up: 'Defense',     down: 'Speed',       likes: 'Sour',  hates: 'Sweet', desc: 'Trick Room tank.',                            bestFor: [{ id: 376, name: 'Metagross' }, { id: 91, name: 'Cloyster' }] },
  { name: 'Impish',  up: 'Defense',     down: 'Sp. Attack',  likes: 'Sour',  hates: 'Dry',   desc: 'Physical wall, no special loss.',             bestFor: [{ id: 212, name: 'Scizor' }] },
  { name: 'Lax',     up: 'Defense',     down: 'Sp. Defense', likes: 'Sour',  hates: 'Bitter',desc: 'Physical bulk, weaker sp. def.',              bestFor: [] },
  { name: 'Timid',   up: 'Speed',       down: 'Attack',      likes: 'Sweet', hates: 'Spicy', desc: 'Best for special speedsters.',                bestFor: [{ id: 6, name: 'Charizard' }, { id: 282, name: 'Gardevoir' }] },
  { name: 'Hasty',   up: 'Speed',       down: 'Defense',     likes: 'Sweet', hates: 'Sour',  desc: 'Fast mixed attacker.',                        bestFor: [{ id: 392, name: 'Infernape' }] },
  { name: 'Serious', up: null,          down: null,          likes: null,    hates: null,    desc: 'No stat change.',                             bestFor: [] },
  { name: 'Jolly',   up: 'Speed',       down: 'Sp. Attack',  likes: 'Sweet', hates: 'Dry',   desc: 'Best physical speedster.',                    bestFor: [{ id: 445, name: 'Garchomp' }, { id: 149, name: 'Dragonite' }] },
  { name: 'Naive',   up: 'Speed',       down: 'Sp. Defense', likes: 'Sweet', hates: 'Bitter',desc: 'Fast mixed, lower sp. def.',                  bestFor: [{ id: 6, name: 'Charizard' }] },
  { name: 'Modest',  up: 'Sp. Attack',  down: 'Attack',      likes: 'Dry',   hates: 'Spicy', desc: 'Best pure special attacker.',                 bestFor: [{ id: 135, name: 'Jolteon' }, { id: 121, name: 'Starmie' }] },
  { name: 'Mild',    up: 'Sp. Attack',  down: 'Defense',     likes: 'Dry',   hates: 'Sour',  desc: 'Mixed special, less physical bulk.',          bestFor: [{ id: 149, name: 'Dragonite' }] },
  { name: 'Quiet',   up: 'Sp. Attack',  down: 'Speed',       likes: 'Dry',   hates: 'Sweet', desc: 'Trick Room special nuke.',                    bestFor: [{ id: 483, name: 'Dialga' }] },
  { name: 'Bashful', up: null,          down: null,          likes: null,    hates: null,    desc: 'No stat change.',                             bestFor: [] },
  { name: 'Rash',    up: 'Sp. Attack',  down: 'Sp. Defense', likes: 'Dry',   hates: 'Bitter',desc: 'Special glass cannon.',                       bestFor: [{ id: 196, name: 'Espeon' }] },
  { name: 'Calm',    up: 'Sp. Defense', down: 'Attack',      likes: 'Bitter',hates: 'Spicy', desc: 'Best special wall.',                          bestFor: [{ id: 242, name: 'Blissey' }, { id: 245, name: 'Suicune' }] },
  { name: 'Gentle',  up: 'Sp. Defense', down: 'Defense',     likes: 'Bitter',hates: 'Sour',  desc: 'Sp. bulk, weaker physical.',                  bestFor: [{ id: 202, name: 'Wobbuffet' }] },
  { name: 'Sassy',   up: 'Sp. Defense', down: 'Speed',       likes: 'Bitter',hates: 'Sweet', desc: 'Trick Room sp. wall.',                        bestFor: [] },
  { name: 'Careful', up: 'Sp. Defense', down: 'Sp. Attack',  likes: 'Bitter',hates: 'Dry',   desc: 'Top special wall, less sp. atk.',             bestFor: [{ id: 143, name: 'Snorlax' }] },
  { name: 'Quirky',  up: null,          down: null,          likes: null,    hates: null,    desc: 'No stat change.',                             bestFor: [] },
];

const STAT_FILTERS = ['All', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed', 'Neutral'] as const;
type StatFilter = typeof STAT_FILTERS[number];

export default function NatureDex() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<StatFilter>('All');

  const filtered = NATURES.filter(n => {
    const matchSearch = n.name.toLowerCase().includes(search.toLowerCase()) ||
      (n.up?.toLowerCase().includes(search.toLowerCase()) ?? false);
    if (!matchSearch) return false;
    if (filter === 'All') return true;
    if (filter === 'Neutral') return n.up === null;
    return n.up === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* ── Header ── */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-2">
          🌸 Nature Dex
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto">
          All 25 natures — stat multipliers, flavor preferences, and top Pokémon picks.
        </p>
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search nature or stat..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition backdrop-blur-sm"
          />
        </div>

        {/* Stat filter pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {STAT_FILTERS.map(f => {
            const style = f !== 'All' && f !== 'Neutral' ? STAT_STYLE[f] : null;
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border",
                  isActive
                    ? "text-white border-transparent shadow-lg"
                    : "text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-transparent"
                )}
                style={isActive ? {
                  backgroundColor: style?.color ?? (f === 'Neutral' ? '#64748b' : '#6366f1'),
                  boxShadow: `0 4px 14px ${style?.color ?? '#6366f1'}44`,
                } : {}}
              >
                {f === 'Neutral' ? '— Neutral' : (style ? `${style.label} ↑` : f)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Count ── */}
      <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
        {filtered.length} / {NATURES.length} natures
      </p>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((nature, i) => {
            const isNeutral = nature.up === null;
            const upStyle = nature.up ? STAT_STYLE[nature.up] : null;
            const downStyle = nature.down ? STAT_STYLE[nature.down] : null;

            return (
              <motion.div
                key={nature.name}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
                whileHover={{ y: -4 }}
              >
                <div className={cn(
                  "h-full flex flex-col gap-3 p-4 rounded-3xl border transition-all duration-300",
                  "bg-white dark:bg-slate-900/50 backdrop-blur-sm",
                  isNeutral
                    ? "border-slate-200 dark:border-white/5"
                    : "border-slate-200 dark:border-white/8 hover:border-opacity-50",
                  !isNeutral && upStyle && `hover:shadow-lg`
                )}
                style={!isNeutral && upStyle ? {
                  borderColor: `${upStyle.color}30`,
                  boxShadow: undefined,
                } : {}}
                onMouseEnter={e => {
                  if (!isNeutral && upStyle) {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${upStyle.color}20`;
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                }}
                >
                  {/* Name */}
                  <div className="text-center">
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                      {nature.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 leading-tight">
                      {nature.desc}
                    </p>
                  </div>

                  {/* Stat bars */}
                  {isNeutral ? (
                    <div className="py-2 rounded-2xl bg-slate-100 dark:bg-white/5 text-center">
                      <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        — Neutral —
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-1.5">
                      {/* UP */}
                      <div
                        className="flex-1 flex flex-col items-center justify-center py-2 rounded-2xl gap-0.5"
                        style={{ backgroundColor: upStyle?.bg }}
                      >
                        <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: upStyle?.color }}>
                          ▲ {upStyle?.label}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 truncate max-w-full px-1 text-center leading-tight">
                          {nature.up}
                        </span>
                      </div>
                      {/* DOWN */}
                      <div
                        className="flex-1 flex flex-col items-center justify-center py-2 rounded-2xl gap-0.5 opacity-70"
                        style={{ backgroundColor: downStyle?.bg }}
                      >
                        <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: downStyle?.color }}>
                          ▼ {downStyle?.label}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 truncate max-w-full px-1 text-center leading-tight">
                          {nature.down}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Flavor */}
                  {!isNeutral && nature.likes && (
                    <div className="flex gap-1.5">
                      <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                        <span className="text-xs">{FLAVOR_EMOJI[nature.likes]}</span>
                        <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400">{nature.likes}</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                        <span className="text-xs">{FLAVOR_EMOJI[nature.hates!]}</span>
                        <span className="text-[10px] font-black text-red-700 dark:text-red-400">{nature.hates}</span>
                      </div>
                    </div>
                  )}

                  {/* Best for Pokémon */}
                  {nature.bestFor.length > 0 && (
                    <div>
                      <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1.5 text-center">
                        Popular on
                      </p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {nature.bestFor.map(pk => (
                          <div key={pk.id} className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8">
                            <img
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pk.id}.png`}
                              alt={pk.name}
                              className="w-6 h-6 object-contain"
                              style={{ imageRendering: 'pixelated' }}
                            />
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 capitalize">
                              {pk.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400 dark:text-slate-600">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-black text-lg uppercase tracking-widest">No natures found</p>
          <p className="text-sm font-medium mt-1">Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
