import { useDialogFocus } from '../hooks/useDialogFocus';
import React from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL } from './PokeDetail';
import { AnimatePresence, motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getTypeBadgeStyle } from '../lib/utils';
import { useColorMode } from '../main';
import styles from '../styles/components/CompareModal.module.scss';

interface CompareModalProps { ids: number[]; onClose: () => void; }

const STAT_LABELS: Record<string, string> = {
  hp: 'HP', attack: 'Atk', defense: 'Def', 'special-attack': 'SpA', 'special-defense': 'SpD', speed: 'Spe'
};

export default function CompareModal({ ids, onClose }: CompareModalProps) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const { data: d1, loading: l1 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[0] }, skip: !ids[0] });
  const { data: d2, loading: l2 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[1] }, skip: !ids[1] });

  const dialogRef = useDialogFocus(ids.length >= 2, onClose);

  if (ids.length < 2) return null;
  const p1 = d1?.pokemon;
  const p2 = d2?.pokemon;
  const loading = l1 || l2 || !p1 || !p2;

  const chartData = !loading ? p1.stats.map((s: any, i: number) => ({
    stat: STAT_LABELS[s.name] || s.name,
    [p1.name]: s.value,
    [p2.name]: p2.stats[i]?.value ?? 0,
    fullMark: 255,
  })) : [];

  const bst1 = !loading ? p1.stats.reduce((a: number, s: any) => a + s.value, 0) : 0;
  const bst2 = !loading ? p2.stats.reduce((a: number, s: any) => a + s.value, 0) : 0;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className={styles.overlay}>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
          className={styles.modalCard}
          ref={dialogRef} tabIndex={-1} role="dialog"
          aria-modal="true"
          aria-label="Pokemon comparison"
        >
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Compare Pokémon</h2>
              <p className={styles.subtitle}>Side-by-side stat comparison</p>
            </div>
            <button onClick={onClose} className={styles.closeBtn} aria-label="Close comparison"><X size={18} /></button>
          </div>

          {loading ? (
            <div className={styles.loadingState}>Loading comparison...</div>
          ) : (
            <div className={styles.body}>
              <div className={styles.identityRow}>
                {[p1, p2].map((p: any, idx: number) => (
                  <div key={p.id} className={styles.identityCard}>
                    <div className={styles.avatarWrap}>
                      <img src={p.image} alt={p.name} className={styles.pokemonImage} />
                    </div>
                    <div className={styles.identityMeta}>
                      <span className={styles.pokemonName}>{p.name}</span>
                      <div className={styles.typesRow}>
                        {p.types.map((t: string) => <span key={t} className={styles.typeBadge} style={getTypeBadgeStyle(t, isDark)}>{t}</span>)}
                      </div>
                    </div>
                    <span className={styles.sideLabel}>{idx === 0 ? 'P1' : 'P2'}</span>
                  </div>
                ))}
              </div>

              <div className={styles.compareGrid}>
                <div className={styles.statsPanel}>
                  <div className={styles.statHeaderRow}>
                    <span>{p1.name}</span><span>Stat</span><span>{p2.name}</span>
                  </div>
                  {p1.stats.map((s: any, i: number) => {
                    const v1 = s.value;
                    const v2 = p2.stats[i]?.value ?? 0;
                    const leftWins = v1 > v2;
                    const rightWins = v2 > v1;
                    return (
                      <div key={s.name} className={styles.statRow}>
                        <span className={`${styles.statVal} ${leftWins ? styles.win : ''}`}>{v1}</span>
                        <span className={styles.statLabel}>{STAT_LABELS[s.name] || s.name.replace('-', ' ')}</span>
                        <span className={`${styles.statVal} ${rightWins ? styles.win : ''}`}>{v2}</span>
                      </div>
                    );
                  })}
                  <div className={`${styles.statRow} ${styles.bstRow}`}>
                    <span className={`${styles.statVal} ${bst1 > bst2 ? styles.win : ''}`}>{bst1}</span>
                    <span className={styles.statLabel}>BST</span>
                    <span className={`${styles.statVal} ${bst2 > bst1 ? styles.win : ''}`}>{bst2}</span>
                  </div>
                </div>

                <div className={styles.chartPanel}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="72%">
                      <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} />
                      <PolarAngleAxis dataKey="stat" tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 255]} tick={false} axisLine={false} />
                      <Radar name={p1.name} dataKey={p1.name} stroke="var(--chart-compare-one)" fill="var(--chart-compare-one)" fillOpacity={0.28} strokeWidth={2} />
                      <Radar name={p2.name} dataKey={p2.name} stroke="var(--chart-compare-two)" fill="var(--chart-compare-two)" fillOpacity={0.22} strokeWidth={2} />
                      <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border-subtle)', background: 'var(--bg-paper)', color: 'var(--text-primary)' }} />
                      <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
