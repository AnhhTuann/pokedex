import React from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL } from './PokeDetail';
import { AnimatePresence, motion } from 'motion/react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import styles from '../styles/components/CompareModal.module.scss';

interface CompareModalProps { ids: number[]; onClose: () => void; }

export default function CompareModal({ ids, onClose }: CompareModalProps) {
  const { data: d1 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[0] }, skip: !ids[0] });
  const { data: d2 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[1] }, skip: !ids[1] });

  if (ids.length < 2) return null;
  const p1 = d1?.pokemon;
  const p2 = d2?.pokemon;
  if (!p1 || !p2) return null;

  const chartData = p1.stats.map((s: any, i: number) => ({
    stat: s.name.replace('-', ' ').toUpperCase(),
    [p1.name]: s.value,
    [p2.name]: p2.stats[i]?.value || 0,
    fullMark: 255,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className={styles.overlay}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 200 }}
          onClick={e => e.stopPropagation()}
          className={styles.modalCard}
        >
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.title}>⚔️ Head-to-Head Comparison</span>
            <button onClick={onClose} className={styles.closeBtn}>
              <X size={16}/>
            </button>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {/* P1 */}
            <div className={styles.pokemonColumn}>
              <div className={`${styles.avatarCircle} ${styles.p1}`}>
                <img src={p1.image} alt={p1.name} className={styles.pokemonImage} style={{ filter: 'drop-shadow(0 6px 20px rgba(99,102,241,0.4))' }}/>
              </div>
              <span className={`${styles.pokemonName} ${styles.p1}`}>{p1.name}</span>
              <div className={styles.typesRow}>
                {p1.types.map((t: string) => (
                  <span key={t} className={`${styles.typeBadge} ${styles.p1}`}>{t}</span>
                ))}
              </div>
              {/* Stats */}
              <div className={styles.statsRow}>
                {p1.stats.map((s: any, i: number) => {
                  const p2val = p2.stats[i]?.value || 0;
                  const wins = s.value > p2val;
                  return (
                    <div key={s.name} className={`${styles.statItem} ${wins ? styles.win : styles.lose}`}>
                      <span className={styles.statLabel}>{s.name.replace('-', ' ')}</span>
                      <span>{s.value}{wins ? ' ✓' : ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Radar Chart */}
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid strokeOpacity={0.2}/>
                  <PolarAngleAxis dataKey="stat" tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}/>
                  <PolarRadiusAxis angle={30} domain={[0, 255]} tick={false} axisLine={false}/>
                  <Radar name={p1.name} dataKey={p1.name} stroke="#6366f1" fill="#6366f1" fillOpacity={0.45}/>
                  <Radar name={p2.name} dataKey={p2.name} stroke="#ec4899" fill="#ec4899" fillOpacity={0.45}/>
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', background: 'var(--bg-paper)', color: 'var(--text-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}/>
                  <Legend wrapperStyle={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginTop: 10 }}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* P2 */}
            <div className={styles.pokemonColumn}>
              <div className={`${styles.avatarCircle} ${styles.p2}`}>
                <img src={p2.image} alt={p2.name} className={styles.pokemonImage} style={{ filter: 'drop-shadow(0 6px 20px rgba(236,72,153,0.4))' }}/>
              </div>
              <span className={`${styles.pokemonName} ${styles.p2}`}>{p2.name}</span>
              <div className={styles.typesRow}>
                {p2.types.map((t: string) => (
                  <span key={t} className={`${styles.typeBadge} ${styles.p2}`}>{t}</span>
                ))}
              </div>
              {/* Stats */}
              <div className={styles.statsRow}>
                {p2.stats.map((s: any, i: number) => {
                  const p1val = p1.stats[i]?.value || 0;
                  const wins = s.value > p1val;
                  return (
                    <div key={s.name} className={`${styles.statItem} ${wins ? styles.win : styles.lose}`}>
                      <span className={styles.statLabel}>{s.name.replace('-', ' ')}</span>
                      <span>{s.value}{wins ? ' ✓' : ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
