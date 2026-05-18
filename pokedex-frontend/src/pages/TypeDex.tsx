import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Shield, Zap } from 'lucide-react';
import {
  TYPE_LIST,
  calculateDamageTaken,
  calculateDamageDealt
} from '../utils/typeMatchups';
import styles from '../styles/pages/TypeDex.module.scss';

// Type Color Palette definition
export const TYPE_COLORS: Record<string, string> = {
  normal: '#9ca3af',
  fire: '#f97316',
  water: '#3b82f6',
  electric: '#eab308',
  grass: '#22c55e',
  ice: '#06b6d4',
  fighting: '#ef4444',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#818cf8',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#78716c',
  ghost: '#7c3aed',
  dragon: '#1d4ed8',
  dark: '#374151',
  steel: '#6b7280',
  fairy: '#f472b6',
};

// Custom Multiplier Chip component for displaying system modifiers
export function TypeMultiplierChip({ type, multiplier }: { type: string; multiplier: number }) {
  const typeLower = type.toLowerCase();
  const typeColor = TYPE_COLORS[typeLower] || '#9ca3af';

  const formatMultiplier = (val: number) => {
    if (val === 0.5) return 'x1/2';
    if (val === 0.25) return 'x1/4';
    return `x${val}`;
  };

  const getMultiplierBg = (val: number) => {
    if (val >= 2) return '#ef4444'; // Bright red for weakness
    if (val < 1 && val > 0) return '#10b981'; // Emerald green for resistance
    if (val === 0) return '#8b5cf6'; // Purple for immunity
    return 'rgba(255, 255, 255, 0.15)'; // Gray for neutral
  };

  return (
    <div
      className={styles.chip}
      style={{
        borderColor: `${typeColor}40`,
      }}
    >
      {/* Type Name (Left) */}
      <div 
        className={styles.typeName}
        style={{ color: typeColor }}
      >
        {type}
      </div>

      {/* Multiplier Value (Right) */}
      <div
        className={styles.multiplier}
        style={{ backgroundColor: getMultiplierBg(multiplier) }}
      >
        {formatMultiplier(multiplier)}
      </div>
    </div>
  );
}

export default function TypeDex() {
  // Selection states
  const [primaryType, setPrimaryType] = useState<string>('fire');
  const [secondaryType, setSecondaryType] = useState<string>('none');

  // Compute Defensive Matrix
  const damageTaken = calculateDamageTaken(primaryType, secondaryType);

  // Grouping Defensive Multipliers
  const defensiveGroups = {
    weak: [...damageTaken.x4.map(t => ({ type: t, mult: 4 })), ...damageTaken.x2.map(t => ({ type: t, mult: 2 }))],
    resistant: [...damageTaken.x05.map(t => ({ type: t, mult: 0.5 })), ...damageTaken.x025.map(t => ({ type: t, mult: 0.25 })), ...damageTaken.x0.map(t => ({ type: t, mult: 0 }))],
    normal: damageTaken.x1.map(t => ({ type: t, mult: 1 }))
  };

  // Compute Offensive Matrices
  const primaryDealt = calculateDamageDealt(primaryType);
  const secondaryDealt = secondaryType !== 'none' ? calculateDamageDealt(secondaryType) : null;

  const getOffensiveGroups = (dealt: any) => {
    return {
      strong: dealt.x2.map((t: string) => ({ type: t, mult: 2 })),
      ineffective: [...dealt.x05.map((t: string) => ({ type: t, mult: 0.5 })), ...dealt.x0.map((t: string) => ({ type: t, mult: 0 }))],
      normal: dealt.x1.map((t: string) => ({ type: t, mult: 1 }))
    };
  };

  const primaryOffense = getOffensiveGroups(primaryDealt);
  const secondaryOffense = secondaryDealt ? getOffensiveGroups(secondaryDealt) : null;

  return (
    <div className={styles.container}>
      
      {/* Header Info */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Layers className={styles.headerIcon} />
          Type Matchups Dex
        </h1>
        <p className={styles.subtitle}>
          Analyze standard dual-type defensive weaknesses or offensive single-type capabilities.
        </p>

        {/* Selector Dropdowns */}
        <div className={styles.selectorCard}>
          {/* Primary Type Selection */}
          <div className={styles.selectGroup}>
            <span className={styles.label}>Primary Type</span>
            <div className={styles.selectWrapper}>
              <select
                value={primaryType}
                onChange={(e) => {
                  const val = e.target.value;
                  setPrimaryType(val);
                  if (val === secondaryType) setSecondaryType('none'); // avoid dual-identical type
                }}
                style={{
                  borderColor: TYPE_COLORS[primaryType],
                  boxShadow: `0 0 12px ${TYPE_COLORS[primaryType]}25`
                }}
              >
                {TYPE_LIST.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Type Selection */}
          <div className={styles.selectGroup}>
            <span className={styles.label}>Secondary Type</span>
            <div className={styles.selectWrapper}>
              <select
                value={secondaryType}
                onChange={(e) => setSecondaryType(e.target.value)}
                style={secondaryType !== 'none' ? {
                  borderColor: TYPE_COLORS[secondaryType],
                  boxShadow: `0 0 12px ${TYPE_COLORS[secondaryType]}25`
                } : {}}
              >
                <option value="none">None</option>
                {TYPE_LIST.filter(t => t !== primaryType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className={styles.mainGrid}>
        
        {/* Section Defensive (Damage Taken) */}
        <div className={styles.column}>
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className={styles.columnTitle}>
              <Shield className={styles.cyan} size={20} />
              <span>Damage Taken (Defensive)</span>
            </div>

            <div className={styles.card}>
              
              {/* Weak Against */}
              <div className={styles.sectionBlock}>
                <span className={`${styles.sectionTitle} ${styles.red}`}>
                  Weak against... (Takes double/quadruple damage)
                </span>
                <div className={styles.chipsGrid}>
                  {defensiveGroups.weak.length > 0 ? (
                    defensiveGroups.weak.map(item => (
                      <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                    ))
                  ) : (
                    <span className={styles.noCoverage}>
                      No weaknesses! Amazing coverage.
                    </span>
                  )}
                </div>
              </div>

              <hr className={styles.divider} />

              {/* Resistant Against */}
              <div className={styles.sectionBlock}>
                <span className={`${styles.sectionTitle} ${styles.green}`}>
                  Resistant against... (Takes halved/no damage)
                </span>
                <div className={styles.chipsGrid}>
                  {defensiveGroups.resistant.length > 0 ? (
                    defensiveGroups.resistant.map(item => (
                      <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                    ))
                  ) : (
                    <span className={styles.noCoverage}>
                      No resistances. Glass-cannon setup.
                    </span>
                  )}
                </div>
              </div>

              <hr className={styles.divider} />

              {/* Normal Damage */}
              <div className={styles.sectionBlock}>
                <span className={`${styles.sectionTitle} ${styles.muted}`}>
                  Normal damage from... (Takes regular damage)
                </span>
                <div className={styles.chipsGrid}>
                  {defensiveGroups.normal.map(item => (
                    <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Section Offensive (Damage Dealt) */}
        <div className={styles.column}>
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className={styles.columnTitle}>
              <Zap className={styles.yellow} size={20} />
              <span>Damage Dealt (Offensive - Single Type)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Primary Type Offensive Block */}
              <div className={styles.card}>
                <div className={styles.offensiveHeader}>
                  <div className={styles.dot} style={{ backgroundColor: TYPE_COLORS[primaryType] }} />
                  <span>Damage Dealt: {primaryType}</span>
                </div>

                <hr className={styles.divider} />

                {/* Strong Against */}
                <div className={styles.sectionBlock}>
                  <span className={`${styles.sectionTitle} ${styles.green}`}>
                    Strong against... (Deals double damage)
                  </span>
                  <div className={styles.chipsGrid}>
                    {primaryOffense.strong.length > 0 ? (
                      primaryOffense.strong.map((item: any) => (
                        <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                      ))
                    ) : (
                      <span className={styles.noCoverage}>
                        None. Not very strong...
                      </span>
                    )}
                  </div>
                </div>

                {/* Ineffective Against */}
                <div className={styles.sectionBlock}>
                  <span className={`${styles.sectionTitle} ${styles.red}`}>
                    Ineffective against... (Deals halved/no damage)
                  </span>
                  <div className={styles.chipsGrid}>
                    {primaryOffense.ineffective.length > 0 ? (
                      primaryOffense.ineffective.map((item: any) => (
                        <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                      ))
                    ) : (
                      <span className={styles.noCoverage}>
                        None! Excellent broad coverage.
                      </span>
                    )}
                  </div>
                </div>

                {/* Normal Damage */}
                <div className={styles.sectionBlock}>
                  <span className={`${styles.sectionTitle} ${styles.muted}`}>
                    Normal damage to... (Deals regular damage)
                  </span>
                  <div className={styles.chipsGrid}>
                    {primaryOffense.normal.map((item: any) => (
                      <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Secondary Type Offensive Block (if selected) */}
              <AnimatePresence>
                {secondaryType !== 'none' && secondaryOffense && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.card}>
                      <div className={styles.offensiveHeader}>
                        <div className={styles.dot} style={{ backgroundColor: TYPE_COLORS[secondaryType] }} />
                        <span>Damage Dealt: {secondaryType}</span>
                      </div>

                      <hr className={styles.divider} />

                      {/* Strong Against */}
                      <div className={styles.sectionBlock}>
                        <span className={`${styles.sectionTitle} ${styles.green}`}>
                          Strong against... (Deals double damage)
                        </span>
                        <div className={styles.chipsGrid}>
                          {secondaryOffense.strong.length > 0 ? (
                            secondaryOffense.strong.map((item: any) => (
                              <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                            ))
                          ) : (
                            <span className={styles.noCoverage}>
                              None. Not very strong...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Ineffective Against */}
                      <div className={styles.sectionBlock}>
                        <span className={`${styles.sectionTitle} ${styles.red}`}>
                          Ineffective against... (Deals halved/no damage)
                        </span>
                        <div className={styles.chipsGrid}>
                          {secondaryOffense.ineffective.length > 0 ? (
                            secondaryOffense.ineffective.map((item: any) => (
                              <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                            ))
                          ) : (
                            <span className={styles.noCoverage}>
                              None! Excellent broad coverage.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Normal Damage */}
                      <div className={styles.sectionBlock}>
                        <span className={`${styles.sectionTitle} ${styles.muted}`}>
                          Normal damage to... (Deals regular damage)
                        </span>
                        <div className={styles.chipsGrid}>
                          {secondaryOffense.normal.map((item: any) => (
                            <TypeMultiplierChip key={item.type} type={item.type} multiplier={item.mult} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>

      </div>
      
    </div>
  );
}
