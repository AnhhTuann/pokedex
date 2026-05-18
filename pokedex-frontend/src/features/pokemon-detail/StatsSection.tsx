import React from 'react';
import { motion } from 'motion/react';
import { STAT_COLORS } from '../../lib/utils';
import styles from './PokemonDetailDialog.module.scss';

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
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <h4 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
          Base Stats
        </h4>
        <div className={styles.bstBadge}>
          <span className={styles.bstLabel}>BST</span>
          <span className={styles.bstValue}>{total}</span>
        </div>
      </div>

      <div className={styles.statsList}>
        {stats.map((stat, i) => {
          const percentage = Math.min(100, (stat.value / 255) * 100);
          const color = STAT_COLORS[i % STAT_COLORS.length];
          const label = STAT_LABELS[stat.name] || stat.name;

          return (
            <div key={stat.name} className={styles.statRow}>
              <div className={styles.statLabel}>
                {label}
              </div>
              <div className={styles.statValue}>
                {stat.value}
              </div>
              <div className={styles.statBarBg}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                  className={styles.statBarFill}
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
