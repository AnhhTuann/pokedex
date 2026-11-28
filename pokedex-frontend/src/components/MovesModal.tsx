import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTeamStore } from '../lib/teamStore';
import { X, Sparkles, Save, Search, Swords, Target, Shield } from 'lucide-react';
import { TYPE_COLORS, getTypeBadgeStyle } from '../lib/utils';
import { useColorMode } from '../main';
import styles from '../styles/components/MovesModal.module.scss';

const GET_POKEMON_MOVES = gql`
  query GetPokemonMoves($id: Int!) {
    pokemon(id: $id) {
      id name types image
      moves { name type power accuracy damageClass }
    }
  }
`;

interface MovesModalProps { pokemonId: number; onClose: () => void; }

export default function MovesModal({ pokemonId, onClose }: MovesModalProps) {
  const { team, setMoves } = useTeamStore();
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const teamMember = team.find(p => p.id === pokemonId);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!pokemonId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKeyDown); };
  }, [pokemonId, onClose]);

  const { data, loading } = useQuery(GET_POKEMON_MOVES, { variables: { id: pokemonId }, fetchPolicy: 'cache-first' });
  const pokemon = data?.pokemon;
  const availableMoves = pokemon?.moves || [];
  const [selectedMoves, setSelectedMoves] = useState<any[]>(teamMember?.moves || []);

  useEffect(() => { setSelectedMoves(teamMember?.moves || []); }, [teamMember?.id]); // eslint-disable-line

  const filteredMoves = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return availableMoves;
    return availableMoves.filter((m: any) => m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q) || m.damageClass?.toLowerCase().includes(q));
  }, [availableMoves, search]);

  const handleToggleMove = (move: any) => {
    setSelectedMoves(prev => {
      const exists = prev.find(m => m.name === move.name);
      if (exists) return prev.filter(m => m.name !== move.name);
      if (prev.length >= 4) return prev;
      return [...prev, move];
    });
  };

  const handleSave = () => { setMoves(pokemonId, selectedMoves); onClose(); };

  const recommendMoves = () => {
    if (!pokemon) return;
    const types = pokemon.types;
    let validMoves = availableMoves.filter((m: any) => m.power && m.power > 0);
    const stabMoves = validMoves.filter((m: any) => types.includes(m.type)).sort((a: any,b: any)=> (b.power-a.power) || ((b.accuracy||0)-(a.accuracy||0)));
    const nonStabMoves = validMoves.filter((m: any) => !types.includes(m.type)).sort((a: any,b: any)=> (b.power-a.power) || ((b.accuracy||0)-(a.accuracy||0)));
    const recommended: any[] = [];
    const usedTypes = new Set<string>();
    for (const m of stabMoves) { if (!usedTypes.has(m.type) && recommended.length < 2) { recommended.push(m); usedTypes.add(m.type); } }
    const remaining = [...stabMoves, ...nonStabMoves].filter(m => !recommended.find(r => r.name === m.name));
    while (recommended.length < 4 && remaining.length > 0) recommended.push(remaining.shift());
    setSelectedMoves(recommended);
  };

  if (!pokemonId) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.dialogPaper} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${teamMember?.name || 'Pokemon'} moveset`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarBox}>
              {teamMember?.image && <img src={teamMember.image} alt={teamMember.name} className={styles.avatarImage} />}
            </div>
            <div>
              <h2 className={styles.title}>{teamMember?.name || 'Pokémon'} Moveset</h2>
              <p className={styles.subtitle}>Select up to 4 moves · {selectedMoves.length}/4 selected</p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close moveset dialog"><X size={18} /></button>
        </div>

        <div className={styles.draftRow}>
          <div className={styles.draftBoxes}>
            {[0,1,2,3].map(i => {
              const m = selectedMoves[i];
              const color = m ? (TYPE_COLORS[m.type] || 'var(--text-muted)') : undefined;
              return (
                <button key={i} type="button" className={styles.draftBox} onClick={() => m && handleToggleMove(m)} aria-label={m ? `Remove ${m.name}` : `Empty move slot ${i+1}`}>
                  {m ? (
                    <>
                      <span className={styles.draftMoveName}>{m.name.replace(/-/g, ' ')}</span>
                      <span className={styles.draftMoveType} style={{ color }}>{m.type}</span>
                    </>
                  ) : <span className={styles.draftEmpty}>Empty slot</span>}
                </button>
              );
            })}
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.autoBtn} onClick={recommendMoves} disabled={loading || availableMoves.length === 0}><Sparkles size={14} /> Auto-pick</button>
            <button className={styles.saveBtn} onClick={handleSave}><Save size={14} /> Save moves</button>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <Search size={16} />
            <input className={styles.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search moves, type, or category..." aria-label="Search moves" />
          </div>
          <span className={styles.moveCount}>{filteredMoves.length} moves</span>
        </div>

        <div className={styles.dialogContent}>
          {loading ? (
            <div className={styles.loadingState}>Loading moves...</div>
          ) : (
            <div className={styles.movesGrid}>
              {filteredMoves.map((m: any) => {
                const isSelected = selectedMoves.some(s => s.name === m.name);
                const isStab = pokemon?.types.includes(m.type);
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => handleToggleMove(m)}
                    className={`${styles.moveCard} ${isSelected ? styles.selected : ''}`}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.moveHeader}>
                      <div className={styles.moveTitleCol}>
                        <span className={styles.moveName}>{m.name.replace(/-/g, ' ')}</span>
                        <div className={styles.badges}>
                          <span className={styles.typeChip} style={getTypeBadgeStyle(m.type, isDark)}>{m.type}</span>
                          {isStab && <span className={styles.stabChip}>STAB</span>}
                        </div>
                      </div>
                    </div>
                    <div className={styles.moveStats}>
                      <span className={styles.statItem}><Swords size={13} /> {m.power ?? '—'}</span>
                      <span className={styles.statItem}><Target size={13} /> {m.accuracy ?? '—'}</span>
                      <span className={styles.statItem}><Shield size={13} /> {m.damageClass || '—'}</span>
                    </div>
                  </button>
                );
              })}
              {filteredMoves.length === 0 && <div className={styles.emptyState}>No moves match your search.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
