import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Ruler, Scale, Sparkles, ChevronRight } from 'lucide-react';
import { usePokemonDetail } from '../../hooks/usePokemon';
import { useTeamStore } from '../../lib/teamStore';
import { formatSpeciesId, cn, getTypeBadgeStyle } from '../../lib/utils';
import { StatsSection } from './StatsSection';
import { EvolutionChain } from './EvolutionChain';
import { PokedexVoice } from './PokedexVoice';
import { MoveList } from './MoveList';
import { Button } from '../../components/common/Button';
import { useColorMode } from '../../main';
import styles from '../../styles/features/PokemonDetailDialog.module.scss';

interface PokemonDetailDialogProps {
  id: number | null;
  onClose: () => void;
  onSelect?: (id: number) => void;
}

type SectionId = 'overview' | 'stats' | 'evolution' | 'abilities' | 'moves' | 'matchups' | 'locations' | 'forms';

export const PokemonDetailDialog: React.FC<PokemonDetailDialogProps> = ({ id, onClose, onSelect }) => {
  const { selectedVersion, team, addMember, removeMember, isShinyMode } = useTeamStore();
  const [showShiny, setShowShiny] = useState(isShinyMode);
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const { pokemon: p, loading, error } = usePokemonDetail(id, selectedVersion);

  useEffect(() => { setShowShiny(isShinyMode); }, [id, isShinyMode]);
  useEffect(() => { setActiveSection('overview'); }, [id]);

  useEffect(() => {
    if (!id) return;
    lastActiveRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(t);
      lastActiveRef.current?.focus?.();
    };
  }, [id, onClose]);

  const matchupGroups = useMemo(() => {
    const list = p?.matchups || [];
    return {
      weaknesses: list.filter((m: any) => m.multiplier > 1).sort((a: any, b: any) => b.multiplier - a.multiplier),
      resistances: list.filter((m: any) => m.multiplier > 0 && m.multiplier < 1).sort((a: any, b: any) => a.multiplier - b.multiplier),
      immunities: list.filter((m: any) => m.multiplier === 0),
    };
  }, [p]);

  if (!id) return null;
  const inTeam = team.some(m => m.id === id);
  const primaryType = p?.types?.[0] || 'normal';
  const displayImage = showShiny && p?.shinyImage ? p.shinyImage : p?.image;
  const hasForms = (p?.megaEvolutions?.length || 0) + (p?.alternativeForms?.length || 0) > 0;
  const hasLocations = (p?.locations?.length || 0) > 0 || (p?.gameVersions?.length || 0) > 0;

  const sections: { id: SectionId; label: string; show: boolean }[] = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'stats', label: 'Stats', show: !!p?.stats?.length },
    { id: 'evolution', label: 'Evolution', show: (p?.evolutions?.length || 0) > 0 },
    { id: 'abilities', label: 'Abilities', show: (p?.abilities?.length || 0) > 0 },
    { id: 'moves', label: 'Moves', show: (p?.moves?.length || 0) > 0 },
    { id: 'matchups', label: 'Matchups', show: (p?.matchups?.length || 0) > 0 },
    { id: 'locations', label: 'Locations', show: hasLocations },
    { id: 'forms', label: 'Forms', show: hasForms },
  ];
  const visibleSections = sections.filter(s => s.show);

  return (
    <AnimatePresence>
      {id && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div
            ref={dialogRef}
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={p ? `${p.name} details` : 'Pokemon details'}
          >
            {loading ? (
              <div className={styles.loadingState} aria-busy="true">
                <div className={styles.loader}>Loading Pokémon details...</div>
              </div>
            ) : error || !p ? (
              <div className={styles.loadingState} style={{ position: 'relative' }}>
                <button type="button" onClick={onClose} className={styles.iconBtn} aria-label="Close details" style={{ position: 'absolute', top: 16, right: 16 }}>
                  <X size={18} />
                </button>
                <div className={styles.loader}>{error ? 'Unable to load Pokémon details.' : 'Pokémon not found.'}</div>
              </div>
            ) : (
              <>
                <aside className={styles.leftPanel} data-type={primaryType.toLowerCase()}>
                  <div className={styles.leftTop}>
                    <span className={styles.speciesId}>{formatSpeciesId(p.speciesId || id)}</span>
                    <div className={styles.headerActions}>
                      <button
                        type="button"
                        onClick={() => setShowShiny(!showShiny)}
                        className={cn(styles.iconBtn, showShiny && styles.iconBtnActive)}
                        aria-label={showShiny ? 'Show normal artwork' : 'Show shiny artwork'}
                        aria-pressed={showShiny}
                        title={showShiny ? 'Show normal' : 'Show shiny'}
                      >
                        <Sparkles size={16} />
                      </button>
                      <button ref={closeBtnRef} type="button" onClick={onClose} className={styles.iconBtn} aria-label="Close details">
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.hero}>
                    <div className={styles.artStage}>
                      <div className={styles.artGlow} />
                      <img
                        src={displayImage}
                        alt={p.name}
                        className={styles.pokemonImage}
                        onError={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.style.opacity = '0'; }}
                      />
                    </div>
                    <div className={styles.identity}>
                      <p className={styles.categoryText}>{p.category || 'Pokémon'}</p>
                      <h2 className={styles.pokemonName}>{p.name}</h2>
                      <div className={styles.typeContainer}>
                        {p.types.map((t: string) => (
                          <span key={t} className={styles.typeBadge} style={getTypeBadgeStyle(t, isDark)}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.quickFacts}>
                    <div className={styles.factItem}><Ruler size={14} /><span>{(p.height / 10).toFixed(1)} m</span></div>
                    <div className={styles.factItem}><Scale size={14} /><span>{(p.weight / 10).toFixed(1)} kg</span></div>
                  </div>

                  <div className={styles.teamBtnWrapper}>
                    <Button variant={inTeam ? 'outline' : 'primary'} size="lg" onClick={() => inTeam ? removeMember(id) : addMember(p)} style={{ width: '100%' }}>
                      <Heart size={16} fill={inTeam ? 'currentColor' : 'none'} />
                      {inTeam ? 'Remove from Team' : 'Add to Team'}
                    </Button>
                  </div>
                </aside>

                <section className={styles.rightPanel}>
                  <nav className={styles.sectionNav} aria-label="Pokemon detail sections">
                    {visibleSections.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={cn(styles.sectionTab, activeSection === s.id && styles.sectionTabActive)}
                        onClick={() => setActiveSection(s.id)}
                        aria-current={activeSection === s.id ? 'true' : undefined}
                      >
                        {s.label}
                      </button>
                    ))}
                  </nav>

                  <div className={styles.sectionContent}>
                    {activeSection === 'overview' && (
                      <div className={styles.sectionStack}>
                        <PokedexVoice description={p.description} accentColor="var(--brand)" cry={p.cry} />
                        <div className={styles.infoGrid}>
                          <div className={styles.infoCard}><span className={styles.infoLabel}>Height</span><span className={styles.infoValue}>{(p.height / 10).toFixed(1)} m</span></div>
                          <div className={styles.infoCard}><span className={styles.infoLabel}>Weight</span><span className={styles.infoValue}>{(p.weight / 10).toFixed(1)} kg</span></div>
                          <div className={styles.infoCard}><span className={styles.infoLabel}>Base Stat Total</span><span className={styles.infoValue}>{p.stats?.reduce((a: number, s: any) => a + s.value, 0) || 0}</span></div>
                        </div>
                        <div className={styles.panelCard}>
                          <h3 className={styles.panelTitle}>Abilities</h3>
                          <div className={styles.abilitiesList}>
                            {(p.abilities || []).map((a: string) => (
                              <span key={a} className={styles.abilityChip}>{a.replace(/-/g, ' ')}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSection === 'stats' && <StatsSection stats={p.stats || []} />}

                    {activeSection === 'evolution' && (
                      <div className={styles.sectionStack}>
                        {(p.evolutions?.length || 0) <= 1 ? (
                          <div className={styles.panelCard}><p className={styles.mutedText}>This Pokémon does not evolve.</p></div>
                        ) : (
                          <EvolutionChain evolutions={p.evolutions} currentId={p.id} onSelect={onSelect || (() => {})} />
                        )}
                      </div>
                    )}

                    {activeSection === 'abilities' && (
                      <div className={styles.panelCard}>
                        <h3 className={styles.panelTitle}>Abilities</h3>
                        <div className={styles.abilityCards}>
                          {(p.abilities || []).map((a: string) => (
                            <div key={a} className={styles.abilityCard}>
                              <div className={styles.abilityName}>{a.replace(/-/g, ' ')}</div>
                              <p className={styles.mutedText}>Ability details are shown based on available game data.</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === 'moves' && <MoveList moves={p.moves || []} />}

                    {activeSection === 'matchups' && (
                      <div className={styles.sectionStack}>
                        <div className={styles.panelCard}>
                          <h3 className={styles.panelTitle}>Weaknesses</h3>
                          <div className={styles.matchupsList}>
                            {matchupGroups.weaknesses.length ? matchupGroups.weaknesses.map((m: any) => (
                              <span key={m.type} className={cn(styles.matchupBadge, styles.matchupWeak)}>{m.type} <strong>{m.multiplier}×</strong></span>
                            )) : <span className={styles.mutedText}>No weaknesses.</span>}
                          </div>
                        </div>
                        <div className={styles.panelCard}>
                          <h3 className={styles.panelTitle}>Resistances</h3>
                          <div className={styles.matchupsList}>
                            {matchupGroups.resistances.length ? matchupGroups.resistances.map((m: any) => (
                              <span key={m.type} className={cn(styles.matchupBadge, styles.matchupResist)}>{m.type} <strong>{m.multiplier}×</strong></span>
                            )) : <span className={styles.mutedText}>No resistances.</span>}
                          </div>
                        </div>
                        <div className={styles.panelCard}>
                          <h3 className={styles.panelTitle}>Immunities</h3>
                          <div className={styles.matchupsList}>
                            {matchupGroups.immunities.length ? matchupGroups.immunities.map((m: any) => (
                              <span key={m.type} className={cn(styles.matchupBadge, styles.matchupImmune)}>{m.type} <strong>0×</strong></span>
                            )) : <span className={styles.mutedText}>No immunities.</span>}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSection === 'locations' && (
                      <div className={styles.panelCard}>
                        <h3 className={styles.panelTitle}>Locations</h3>
                        {selectedVersion && <p className={styles.mutedText} style={{ marginBottom: 12 }}>Version context: <strong>{selectedVersion.replace(/-/g, ' ')}</strong></p>}
                        {p.locations?.length ? (
                          <div className={styles.locationList}>
                            {p.locations.map((loc: string) => (
                              <span key={loc} className={styles.locationChip}>{loc.replace(/-/g, ' ')}</span>
                            ))}
                          </div>
                        ) : (
                          <p className={styles.mutedText}>No location data available for this Pokémon in the selected version context.</p>
                        )}
                      </div>
                    )}

                    {activeSection === 'forms' && hasForms && (
                      <div className={styles.panelCard}>
                        <h3 className={styles.panelTitle}>Forms & Variants</h3>
                        <div className={styles.formsGrid}>
                          {[...(p.megaEvolutions || []), ...(p.alternativeForms || [])].map((form: any) => (
                            <button key={form.id} type="button" className={styles.formCard} onClick={() => onSelect?.(form.id)}>
                              <img src={form.image} alt={form.name} className={styles.formIcon} />
                              <div className={styles.formMeta}>
                                <span className={styles.formLabel}>{form.isMega ? 'Mega' : 'Form'}</span>
                                <span className={styles.formName}>{form.name.replace(/-/g, ' ')}</span>
                              </div>
                              <ChevronRight size={16} className={styles.formArrow} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
