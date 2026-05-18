import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTeamStore } from '../lib/teamStore';
import { X, Sparkles, Save, Flame, Target, Shield, CheckCircle } from 'lucide-react';
import styles from '../styles/components/MovesModal.module.scss';

const GET_POKEMON_MOVES = gql`
  query GetPokemonMoves($id: Int!) {
    pokemon(id: $id) {
      id name types image
      moves { name type power accuracy damageClass }
    }
  }
`;

const TYPE_COLORS: Record<string, string> = {
  normal:'#9ca3af', fire:'#f97316', water:'#3b82f6', electric:'#eab308',
  grass:'#22c55e', ice:'#06b6d4', fighting:'#ef4444', poison:'#a855f7',
  ground:'#d97706', flying:'#818cf8', psychic:'#ec4899', bug:'#84cc16',
  rock:'#78716c', ghost:'#7c3aed', dragon:'#1d4ed8', dark:'#374151',
  steel:'#6b7280', fairy:'#f472b6',
};

interface MovesModalProps {
  pokemonId: number;
  onClose: () => void;
}

export default function MovesModal({ pokemonId, onClose }: MovesModalProps) {
  const { team, setMoves } = useTeamStore();
  const teamMember = team.find(p => p.id === pokemonId);
  
  const { data, loading } = useQuery(GET_POKEMON_MOVES, {
    variables: { id: pokemonId },
    fetchPolicy: 'cache-first'
  });

  const pokemon = data?.pokemon;
  const availableMoves = pokemon?.moves || [];

  const [selectedMoves, setSelectedMoves] = useState<any[]>(teamMember?.moves || []);

  const handleToggleMove = (move: any) => {
    setSelectedMoves(prev => {
      const exists = prev.find(m => m.name === move.name);
      if (exists) {
        return prev.filter(m => m.name !== move.name);
      } else {
        if (prev.length >= 4) return prev;
        return [...prev, move];
      }
    });
  };

  const handleSave = () => {
    setMoves(pokemonId, selectedMoves);
    onClose();
  };

  const recommendMoves = () => {
    if (!pokemon) return;
    const types = pokemon.types;
    
    let validMoves = availableMoves.filter((m: any) => m.power && m.power > 0);
    
    const stabMoves = validMoves.filter((m: any) => types.includes(m.type));
    const nonStabMoves = validMoves.filter((m: any) => !types.includes(m.type));
    
    const sortByPower = (a: any, b: any) => {
      if (b.power !== a.power) return b.power - a.power;
      return (b.accuracy || 0) - (a.accuracy || 0);
    };

    stabMoves.sort(sortByPower);
    nonStabMoves.sort(sortByPower);

    const recommended = [];
    const usedTypes = new Set();
    for (const m of stabMoves) {
      if (!usedTypes.has(m.type) && recommended.length < 2) {
        recommended.push(m);
        usedTypes.add(m.type);
      }
    }
    
    const remainingPool = [...stabMoves, ...nonStabMoves].filter(m => !recommended.find(r => r.name === m.name));
    remainingPool.sort(sortByPower);
    
    while(recommended.length < 4 && remainingPool.length > 0) {
      recommended.push(remainingPool.shift());
    }

    setSelectedMoves(recommended);
  };

  if (!pokemonId) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.dialogPaper} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.avatarBox}>
              {teamMember?.image && (
                <img src={teamMember.image} alt="Pokemon" className={styles.avatarImage} />
              )}
            </div>
            <div className={styles.titleCol}>
              <h2 className={styles.title}>
                {teamMember?.name} Moveset
              </h2>
              <span className={styles.subtitle}>Select up to 4 moves</span>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={18} />
          </button>
        </div>

        {/* Selected Draft Row */}
        <div className={styles.draftRow}>
          <div className={styles.draftBoxes}>
            {[0, 1, 2, 3].map(i => {
              const m = selectedMoves[i];
              const moveColor = m ? (TYPE_COLORS[m.type] || '#9ca3af') : 'transparent';
              return (
                <div
                  key={i}
                  className={styles.draftBox}
                  style={{
                    border: `2px ${m ? 'solid' : 'dashed'} ${m ? moveColor : 'var(--border-main)'}`,
                    background: m ? `${moveColor}0a` : 'transparent',
                  }}
                >
                  {m ? (
                    <>
                      <span className={styles.draftMoveName}>{m.name.replace('-', ' ')}</span>
                      <span className={styles.draftMoveType} style={{ color: moveColor }}>{m.type}</span>
                      <div className={styles.draftUnderline} style={{ background: moveColor }} />
                    </>
                  ) : (
                    <span className={styles.draftEmpty}>Empty Slot</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              className={styles.autoBtn}
              onClick={recommendMoves}
              disabled={loading || availableMoves.length === 0}
            >
              <Sparkles size={14} /> Auto-Build
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
            >
              <Save size={14} /> Save Team
            </button>
          </div>
        </div>

        {/* Available Moves Grid */}
        <div className={styles.dialogContent}>
          {loading ? (
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          ) : (
            <div className={styles.movesGrid}>
              {availableMoves.map((m: any) => {
                const isSelected = selectedMoves.some(s => s.name === m.name);
                const isStab = pokemon?.types.includes(m.type);
                const moveColor = TYPE_COLORS[m.type] || '#9ca3af';

                return (
                  <div
                    key={m.name}
                    onClick={() => handleToggleMove(m)}
                    className={`${styles.moveCard} ${isSelected ? styles.selected : ''}`}
                    style={{
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border-main)',
                    }}
                  >
                    {/* Move Header */}
                    <div className={styles.moveHeader}>
                      <div className={styles.moveTitleCol}>
                        <span className={styles.moveName}>
                          {m.name.replace('-', ' ')}
                          {isStab && <span className={styles.stabChip}>STAB</span>}
                        </span>
                        <span className={styles.typeChip} style={{ background: moveColor }}>{m.type}</span>
                      </div>
                      {isSelected && <CheckCircle size={18} color="var(--primary)" />}
                    </div>

                    {/* Power and Accuracy */}
                    <div className={styles.moveStats}>
                      <div className={styles.statItem}>
                        <Flame size={14} color="var(--text-muted)" />
                        <span className={styles.statValue}>{m.power || '--'}</span>
                        <span className={styles.statLabel}>PWR</span>
                      </div>
                      <div className={styles.statItem}>
                        <Target size={14} color="var(--text-muted)" />
                        <span className={styles.statValue}>{m.accuracy || '--'}</span>
                        <span className={styles.statLabel}>ACC</span>
                      </div>
                      <div className={styles.statItem}>
                        <Shield size={14} color="var(--text-muted)" />
                        <span className={styles.statLabel}>{m.damageClass}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
