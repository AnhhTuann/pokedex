import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import styles from '../styles/pages/NatureDex.module.scss';

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
    <div className={styles.container}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          🌸 Nature Dex
        </h1>
        <p className={styles.subtitle}>
          All 25 natures — stat multipliers, flavor preferences, and top Pokémon picks.
        </p>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        {/* Search */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search nature or stat..."
            className={styles.searchInput}
          />
        </div>

        {/* Stat filter pills */}
        <div className={styles.filterWrapper}>
          {STAT_FILTERS.map(f => {
            const style = f !== 'All' && f !== 'Neutral' ? STAT_STYLE[f] : null;
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={styles.filterBtn}
                style={isActive ? {
                  backgroundColor: style?.color ?? (f === 'Neutral' ? '#64748b' : 'var(--primary)'),
                  borderColor: 'transparent',
                  color: '#ffffff',
                  boxShadow: `0 4px 14px ${style?.color ?? 'var(--primary)'}44`,
                } : {}}
              >
                {f === 'Neutral' ? '— Neutral' : (style ? `${style.label} ↑` : f)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Count ── */}
      <p className={styles.countText}>
        {filtered.length} / {NATURES.length} natures
      </p>

      {/* ── Grid ── */}
      <div className={styles.grid}>
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
                <div 
                  className={styles.card}
                  style={!isNeutral && upStyle ? {
                    borderColor: `${upStyle.color}30`,
                  } : {}}
                  onMouseEnter={e => {
                    if (!isNeutral && upStyle) {
                      e.currentTarget.style.boxShadow = `0 8px 24px ${upStyle.color}20`;
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Name */}
                  <div className={styles.cardHeader}>
                    <h3 className={styles.natureName}>
                      {nature.name}
                    </h3>
                    <p className={styles.natureDesc}>
                      {nature.desc}
                    </p>
                  </div>

                  {/* Stat bars */}
                  {isNeutral ? (
                    <div className={styles.neutralBadge}>
                      <span className={styles.neutralText}>
                        — Neutral —
                      </span>
                    </div>
                  ) : (
                    <div className={styles.statBars}>
                      {/* UP */}
                      <div
                        className={styles.statBox}
                        style={{ backgroundColor: upStyle?.bg }}
                      >
                        <span className={styles.statLabel} style={{ color: upStyle?.color }}>
                          ▲ {upStyle?.label}
                        </span>
                        <span className={styles.statValue}>
                          {nature.up}
                        </span>
                      </div>
                      {/* DOWN */}
                      <div
                        className={styles.statBox}
                        style={{ backgroundColor: downStyle?.bg, opacity: 0.7 }}
                      >
                        <span className={styles.statLabel} style={{ color: downStyle?.color }}>
                          ▼ {downStyle?.label}
                        </span>
                        <span className={styles.statValue}>
                          {nature.down}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Flavor */}
                  {!isNeutral && nature.likes && (
                    <div className={styles.flavorWrapper}>
                      <div className={`${styles.flavorPill} ${styles.likes}`}>
                        <span className="text-xs">{FLAVOR_EMOJI[nature.likes]}</span>
                        <span className={styles.flavorText}>{nature.likes}</span>
                      </div>
                      <div className={`${styles.flavorPill} ${styles.hates}`}>
                        <span className="text-xs">{FLAVOR_EMOJI[nature.hates!]}</span>
                        <span className={styles.flavorText}>{nature.hates}</span>
                      </div>
                    </div>
                  )}

                  {/* Best for Pokémon */}
                  {nature.bestFor.length > 0 && (
                    <div className={styles.bestForSection}>
                      <p className={styles.bestForTitle}>
                        Popular on
                      </p>
                      <div className={styles.bestForGrid}>
                        {nature.bestFor.map(pk => (
                          <div key={pk.id} className={styles.pokemonPill}>
                            <img
                              src={`http://localhost:4000/images/pokemon/normal/${pk.name.toLowerCase()}.webp`}
                              alt={pk.name}
                              className={styles.sprite}
                            />
                            <span className={styles.name}>
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
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <p className={styles.emptyTitle}>No natures found</p>
          <p className={styles.emptyDesc}>Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
