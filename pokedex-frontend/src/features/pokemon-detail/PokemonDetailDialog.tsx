import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Zap, Scale, Ruler, Sparkles } from 'lucide-react';
import { usePokemonDetail } from '../../hooks/usePokemon';
import { useTeamStore } from '../../lib/teamStore';
import { formatSpeciesId, TYPE_COLORS, cn } from '../../lib/utils';
import { StatsSection } from './StatsSection';
import { EvolutionChain } from './EvolutionChain';
import { PokedexVoice } from './PokedexVoice';
import { MoveList } from './MoveList';
import { Button } from '../../components/common/Button';
import styles from './PokemonDetailDialog.module.scss';

interface PokemonDetailDialogProps {
  id: number | null;
  onClose: () => void;
  onSelect?: (id: number) => void;
}

export const PokemonDetailDialog: React.FC<PokemonDetailDialogProps> = ({ id, onClose, onSelect }) => {
  const { selectedVersion, team, addMember, removeMember, isShinyMode } = useTeamStore();
  const [showShiny, setShowShiny] = useState(isShinyMode);
  
  const { pokemon: p, loading } = usePokemonDetail(id, selectedVersion);

  useEffect(() => {
    setShowShiny(isShinyMode);
  }, [id, isShinyMode]);

  useEffect(() => {
    // Disable body scroll when modal is open
    if (id) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [id]);

  if (!id) return null;

  const inTeam = team.some(m => m.id === id);
  const accentColor = p ? (TYPE_COLORS[p.types[0]] || '#6366f1') : '#6366f1';
  const isMega = p?.name.toLowerCase().includes('mega') || p?.category?.toLowerCase().includes('mega');

  return (
    <AnimatePresence>
      {id && (
        <div className={styles.overlay} onClick={onClose}>
          {loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={styles.dialog}
              onClick={(e) => e.stopPropagation()}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <div className={styles.loader}>
                Loading Database...
              </div>
            </motion.div>
          ) : (
            p && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={styles.dialog}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header / Image Section */}
                <div 
                  className={styles.leftPanel}
                  style={{ 
                    background: `linear-gradient(135deg, ${accentColor}25 0%, ${accentColor}08 50%, transparent 100%)` 
                  }}
                >
                  {/* Decorative background circle */}
                  <div 
                    className={styles.bgCircle}
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className={styles.headerActions}>
                    <span className={styles.speciesId}>
                      {formatSpeciesId(p.speciesId || id)}
                    </span>
                    <div className={styles.buttons}>
                      <button 
                        onClick={() => setShowShiny(!showShiny)}
                        className={`${styles.actionBtn} ${showShiny ? styles.shinyActive : ''}`}
                        title="Toggle Shiny View"
                      >
                        <Sparkles size={16} />
                      </button>
                      <button onClick={onClose} className={styles.actionBtn} title="Close Dialog">
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.heroContent}>
                    <motion.div
                      key={showShiny ? 'shiny' : 'default'}
                      initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      className={styles.imageWrapper}
                    >
                      {isMega && (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          className={styles.megaRing}
                          style={{ borderColor: accentColor }}
                        />
                      )}
                      <img
                        src={showShiny && p.shinyImage ? p.shinyImage : p.image}
                        alt={p.name}
                        className={styles.pokemonImage}
                      />
                    </motion.div>

                    <div className={styles.nameBlock}>
                      <h2 className={styles.pokemonName}>
                        {p.name}
                      </h2>
                      <div className={styles.typeContainer}>
                        {p.types.map(t => (
                          <span 
                            key={t}
                            className={styles.typeBadge}
                            style={{ backgroundColor: TYPE_COLORS[t] }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.category && (
                        <p className={styles.categoryText}>
                          {p.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.teamBtnWrapper}>
                    <Button
                      className="w-full rounded-2xl py-6 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group"
                      variant={inTeam ? 'outline' : 'primary'}
                      onClick={() => inTeam ? removeMember(id) : addMember(p)}
                      style={!inTeam ? { backgroundColor: accentColor, boxShadow: `0 8px 24px ${accentColor}33` } : {}}
                    >
                      <Heart size={16} className={cn(inTeam ? "fill-red-500 text-red-500" : "group-hover:scale-125 transition-transform")} />
                      {inTeam ? 'Remove from Team' : 'Add to Team'}
                    </Button>
                  </div>
                </div>

                {/* Scrollable Content Section */}
                <div className={styles.rightPanel}>
                  {/* Physical Traits */}
                  <div className={styles.traitsGrid}>
                    <div className={styles.traitCard}>
                      <Ruler size={16} className={`${styles.traitIcon} ${styles.heightIcon}`} />
                      <span className={styles.traitLabel}>Height</span>
                      <span className={styles.traitValue}>{(p.height / 10).toFixed(1)} m</span>
                    </div>
                    <div className={styles.traitCard}>
                      <Scale size={16} className={`${styles.traitIcon} ${styles.weightIcon}`} />
                      <span className={styles.traitLabel}>Weight</span>
                      <span className={styles.traitValue}>{(p.weight / 10).toFixed(1)} kg</span>
                    </div>
                    <div className={styles.traitCard}>
                      <Zap size={16} className={`${styles.traitIcon} ${styles.abilityIcon}`} />
                      <span className={styles.traitLabel}>Abilities</span>
                      <div className={styles.abilitiesList}>
                        {p.abilities.map(a => (
                          <span key={a} className={styles.abilityText}>
                            {a.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <PokedexVoice description={p.description} accentColor={accentColor} cry={p.cry} />

                  {/* Base Stats */}
                  <StatsSection stats={p.stats} />
                  
                  {/* Type Matchups */}
                  <div className={styles.matchupsSection}>
                    <h4 className={styles.sectionTitle}>
                      Matchups
                    </h4>
                    <div className={styles.matchupsList}>
                      {p.matchups.filter(m => m.multiplier !== 1).map(m => (
                        <span 
                          key={m.type}
                          className={`${styles.matchupBadge} ${m.multiplier > 1 ? styles.weak : styles.strong}`}
                        >
                          {m.type} {m.multiplier}x
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Evolution Chain */}
                  <EvolutionChain evolutions={p.evolutions} currentId={p.id} onSelect={onSelect || (() => {})} />

                  {/* Varieties (Mega/Form) */}
                  {(p.megaEvolutions?.length > 0 || p.alternativeForms?.length > 0) && (
                    <div className={styles.formsSection}>
                      <h4 className={styles.sectionTitle}>
                        Forms & Megas
                      </h4>
                      <div className={styles.formsGrid}>
                        {[...(p.megaEvolutions || []), ...(p.alternativeForms || [])].map(form => (
                          <motion.button
                            key={form.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelect?.(form.id)}
                            className={styles.formCard}
                          >
                            <div className={styles.formIconBg}>
                              <img src={form.image} alt={form.name} className={styles.formIcon} />
                            </div>
                            <div>
                              <p className={styles.formLabel}>
                                {form.isMega ? 'Mega Form' : 'Alt Form'}
                              </p>
                              <p className={styles.formName}>
                                {form.name.replace('-', ' ')}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <MoveList moves={p.moves} />
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
