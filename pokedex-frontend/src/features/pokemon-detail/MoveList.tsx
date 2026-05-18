import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TYPE_COLORS } from '../../lib/utils';
import { Swords, Sparkles, ShieldAlert } from 'lucide-react';
import styles from './PokemonDetailDialog.module.scss';

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
    <div className={styles.movesSection}>
      <div className={styles.movesHeader}>
        <h4 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
          Move Sets
        </h4>
        <div className={styles.tabSelector}>
          {(['level', 'machine', 'tutor'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.movesTable}>
          <thead>
            <tr>
              <th>Move</th>
              <th>Type</th>
              <th>Cat</th>
              <th style={{ textAlign: 'right' }}>Pwr</th>
              <th style={{ textAlign: 'right' }}>Acc</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredMoves.map((move, i) => (
                <motion.tr
                  key={move.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                >
                  <td>
                    <div className={styles.moveCell}>
                      <span className={styles.moveName}>
                        {move.name.replace('-', ' ')}
                      </span>
                      {tab === 'level' && (
                        <span className={styles.moveMeta}>
                          Level {move.levelLearnedAt}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span 
                      className={styles.moveTypeBadge}
                      style={{ backgroundColor: TYPE_COLORS[move.type] }}
                    >
                      {move.type}
                    </span>
                  </td>
                  <td>
                    {move.damageClass === 'physical' && <Swords size={14} className="text-red-400" />}
                    {move.damageClass === 'special' && <Sparkles size={14} className="text-blue-400" />}
                    {move.damageClass === 'status' && <ShieldAlert size={14} className="text-slate-400" />}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    {move.power || '--'}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    {move.accuracy || '--'}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredMoves.length === 0 && (
          <div className={styles.emptyCell}>
            No moves found for this category.
          </div>
        )}
      </div>
    </div>
  );
};
