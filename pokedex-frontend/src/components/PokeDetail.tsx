import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useTeamStore } from '../lib/teamStore';
import { formatSpeciesId, TYPE_COLORS } from '../lib/utils';
import { X, ChevronRight, Sparkles, Volume2, Play, Pause, Square, Mic } from 'lucide-react';
import styles from '../styles/components/PokeDetail.module.scss';
import { useColorMode } from '../main';

function getPastelBackgroundColor(type: string): string {
  const typeLower = type.toLowerCase();
  switch (typeLower) {
    case "grass": return "#c3deb0";
    case "fire": return "#f2ad7c";
    case "water": return "#6cbce5";
    case "bug": return "#d2e59b";
    case "normal": return "#e2e2df";
    case "poison": return "#dbb5e7";
    case "electric": return "#fdf0a6";
    case "ground": return "#ecd0a1";
    case "fairy": return "#f6c4d7";
    case "fighting": return "#dfa1a1";
    case "psychic": return "#f8b8cc";
    case "rock": return "#dcd3bd";
    case "steel": return "#cfd8dc";
    case "ice": return "#b2ebf2";
    case "ghost": return "#c2b7e0";
    case "dragon": return "#9fa8da";
    case "dark": return "#bcaaa4";
    case "flying": return "#c5cae9";
    default: return "#f5f5f7";
  }
}

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!, $version: String) {
    pokemon(id: $id) {
      id name types image shinyImage height weight description cry category speciesId
      stats { name value }
      abilities
      evolutions { id name types image shinyImage minLevel trigger speciesId }
      matchups { type multiplier }
      gameVersions
      moves { name type power accuracy damageClass learnMethod levelLearnedAt }
      megaEvolutions { id name types image shinyImage isMega isAlternative speciesId }
      alternativeForms { id name types image shinyImage isMega isAlternative speciesId }
      locations(version: $version)
    }
  }
`;


const STAT_COLORS = [
  '#ef4444', // HP - Red
  '#f97316', // ATK - Orange
  '#eab308', // DEF - Yellow
  '#3b82f6', // SP. ATK - Blue
  '#22c55e', // SP. DEF - Green
  '#ec4899', // SPD - Pink
];

interface PokeDetailProps {
  pokemonId: number;
  onClose: () => void;
  onSelectPokemonId?: (id: number) => void;
}

export default function PokeDetail({ pokemonId, onClose, onSelectPokemonId }: PokeDetailProps) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const { team, addMember, removeMember } = useTeamStore();
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [moveTab, setMoveTab] = useState<number>(0);

  // Audio / Speech State
  const [audio] = useState<HTMLAudioElement | null>(() => new Audio());
  const [isPlayingCry, setIsPlayingCry] = useState<boolean>(false);
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isSpeakingDescription, setIsSpeakingDescription] = useState<boolean>(false);
  const [isSpeechPaused, setIsSpeechPaused] = useState<boolean>(false);

  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: pokemonId, version: selectedVersion || undefined },
    fetchPolicy: 'cache-first',
  });

  const p = data?.pokemon;
  const inTeam = team.some(member => member.id === pokemonId);

  // Initialize Speech Synth & Game Version
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynth(window.speechSynthesis);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (p?.gameVersions && p.gameVersions.length > 0 && !selectedVersion) {
      setSelectedVersion(p.gameVersions[0]);
    }
  }, [p, selectedVersion]);

  // Handle Cry audio playback
  const playCry = () => {
    if (!p?.cry || !audio) return;
    try {
      audio.src = p.cry;
      audio.volume = 0.4;
      setIsPlayingCry(true);
      audio.play();
      audio.onended = () => setIsPlayingCry(false);
      audio.onerror = () => setIsPlayingCry(false);
    } catch (e) {
      setIsPlayingCry(false);
    }
  };

  // TTS Voice Description controllers
  const speakDescription = () => {
    if (!speechSynth || !p?.description) return;
    speechSynth.cancel();

    const cleanText = p.description.replace(/[\n\f]/g, ' ');
    const textToSpeak = `${p.name}. The ${p.category || 'unknown classification'} Pokémon. ${cleanText}`;
    const newUtterance = new SpeechSynthesisUtterance(textToSpeak);

    newUtterance.onend = () => {
      setIsSpeakingDescription(false);
      setIsSpeechPaused(false);
    };
    newUtterance.onerror = () => {
      setIsSpeakingDescription(false);
      setIsSpeechPaused(false);
    };

    setUtterance(newUtterance);
    setIsSpeakingDescription(true);
    setIsSpeechPaused(false);
    speechSynth.speak(newUtterance);
  };

  const pauseSpeech = () => {
    if (!speechSynth) return;
    speechSynth.pause();
    setIsSpeechPaused(true);
  };

  const resumeSpeech = () => {
    if (!speechSynth) return;
    speechSynth.resume();
    setIsSpeechPaused(false);
  };

  const stopSpeech = () => {
    if (!speechSynth) return;
    speechSynth.cancel();
    setIsSpeakingDescription(false);
    setIsSpeechPaused(false);
  };

  // Toggle Shiny View Mode
  const toggleShiny = () => {
    setIsShiny(prev => !prev);
  };

  // Add/Remove from active builder team
  const toggleTeam = () => {
    if (!p) return;
    if (inTeam) {
      removeMember(p.id);
    } else {
      addMember({
        id: p.id,
        name: p.name,
        types: p.types,
        image: p.image,
      });
    }
  };

  if (!pokemonId) return null;

  const primaryColor = p?.types && p.types.length > 0 ? (TYPE_COLORS[p.types[0]] || '#3f51b5') : '#3f51b5';
  const displayImage = isShiny ? (p?.shinyImage || p?.image) : p?.image;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.dialogPaper}
        onClick={e => e.stopPropagation()}
        style={
          !isDark && p?.types && p.types.length > 0
            ? {
                background: `linear-gradient(135deg, ${getPastelBackgroundColor(p.types[0])}99 0%, rgba(255, 255, 255, 0.98) 100%)`,
                border: `1px solid ${primaryColor}2e`,
                boxShadow: `0 20px 40px ${primaryColor}12`
              }
            : undefined
        }
      >
        {/* Header Block */}
        <div className={styles.headerPanel}>
          {/* Close button */}
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '40px 0' }}>
              <div className={styles.progressTrack} style={{ maxWidth: '200px' }}>
                <div className={styles.progressFill} style={{ width: '60%', background: 'var(--primary)' }}></div>
              </div>
            </div>
          ) : error ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#ef4444', width: '100%' }}>
              Failed to load details.
            </div>
          ) : (
            <>
              {/* Pokémon Sprite Container */}
              <div
                className={styles.pokemonImageWrapper}
                onClick={toggleShiny}
                style={{
                  background: isDark
                    ? `radial-gradient(circle, ${primaryColor}1a 0%, ${primaryColor}03 70%)`
                    : `radial-gradient(circle, ${primaryColor}26 0%, ${primaryColor}08 70%)`,
                  border: `2px solid ${isDark ? `${primaryColor}2b` : `${primaryColor}4f`}`
                }}
              >
                {displayImage && (
                  <img src={displayImage} alt={p.name} className={styles.pokemonImage} />
                )}
              </div>

              {/* Identity & Basic Attributes */}
              <div className={styles.infoCol}>
                <span className={styles.speciesIdText}>
                  {formatSpeciesId(p.speciesId || p.id)}
                </span>
                <h1 className={styles.nameText}>{p.name}</h1>
                <span className={styles.categoryText}>
                  {p.category || 'Unknown'} Pokémon
                </span>

                <div className={styles.badgeRow}>
                  {p.types.map((type: string) => (
                    <span
                      key={type}
                      className={styles.customBadge}
                      style={{ background: TYPE_COLORS[type] || '#9ca3af' }}
                    >
                      {type}
                    </span>
                  ))}
                  <span
                    onClick={toggleShiny}
                    className={`${styles.customBadge} ${styles.shiny}`}
                  >
                    <Sparkles size={10} /> {isShiny ? 'Shiny Mode' : 'Normal Mode'}
                  </span>
                  {p.cry && (
                    <span
                      onClick={playCry}
                      className={`${styles.customBadge} ${styles.cry}`}
                    >
                      <Volume2 size={10} /> {isPlayingCry ? 'Playing...' : 'Sound Cry'}
                    </span>
                  )}
                </div>

                {/* Team Builder Action Buttons */}
                <div className={styles.actionRow}>
                  <button
                    onClick={toggleTeam}
                    className={`${styles.teamBtn} ${inTeam ? styles.remove : styles.add}`}
                  >
                    {inTeam ? 'Remove From Team' : 'Add To Team'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scrollable Detail Body */}
        {!loading && !error && p && (
          <div className={styles.dialogContent}>
            {/* Height, Weight, Abilities Grid */}
            <div className={styles.physicalGrid}>
              <div className={styles.statBlock}>
                <span className={styles.statLabel}>Height</span>
                <span className={styles.statValue}>{(p.height / 10).toFixed(1)} m</span>
              </div>
              <div className={styles.statBlock}>
                <span className={styles.statLabel}>Weight</span>
                <span className={styles.statValue}>{(p.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className={styles.statBlock} style={{ gridColumn: 'span 2' }}>
                <span className={styles.statLabel}>Abilities</span>
                <div className={styles.abilitiesList}>
                  {p.abilities.map((ab: string) => (
                    <span key={ab} className={styles.abilityChip}>
                      {ab.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <hr className={styles.divider} />

            {/* Voice Soundwaves and Description */}
            <div
              className={styles.voicePaper}
              style={
                !isDark
                  ? {
                      background: `${primaryColor}0a`,
                      border: `1px solid ${primaryColor}1a`,
                      borderLeft: `5px solid ${primaryColor}`
                    }
                  : undefined
              }
            >
              {isSpeakingDescription && (
                <div className={styles.soundWave}>
                  <span style={{ width: 3, height: 16, background: 'var(--primary)', animation: 'soundBar 0.8s infinite alternate' }} />
                  <span style={{ width: 3, height: 24, background: 'var(--primary)', animation: 'soundBar 0.6s infinite alternate 0.1s' }} />
                  <span style={{ width: 3, height: 10, background: 'var(--primary)', animation: 'soundBar 0.7s infinite alternate 0.2s' }} />
                  <span style={{ width: 3, height: 20, background: 'var(--primary)', animation: 'soundBar 0.5s infinite alternate 0.3s' }} />
                </div>
              )}

              <div className={styles.voiceIconRow}>
                <Mic size={14} /> Voice Entry Guide
              </div>
              <p className={styles.descriptionText}>
                "{p.description || 'No database entry recorded yet.'}"
              </p>

              {speechSynth && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isSpeakingDescription ? (
                    <button
                      className={styles.readBtn}
                      style={{ background: primaryColor }}
                      onClick={speakDescription}
                    >
                      <Play size={12} /> Read Entry
                    </button>
                  ) : (
                    <>
                      {isSpeechPaused ? (
                        <button
                          className={styles.readBtn}
                          style={{ background: primaryColor }}
                          onClick={resumeSpeech}
                        >
                          <Play size={12} /> Resume
                        </button>
                      ) : (
                        <button
                          className={styles.stopBtn}
                          onClick={pauseSpeech}
                        >
                          <Pause size={12} /> Pause
                        </button>
                      )}
                      <button
                        className={styles.stopBtn}
                        onClick={stopSpeech}
                      >
                        <Square size={12} /> Stop
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <hr className={styles.divider} />

            {/* Stats EV/IV Grid */}
            <span className={styles.sectionTitle}>Base Stats</span>
            <div className={styles.statsSection}>
              {p.stats.map((stat: any, i: number) => (
                <div key={stat.name} className={styles.statBarRow}>
                  <div className={styles.statHeader}>
                    <span>{stat.name.replace('-', ' ')}</span>
                    <span>{stat.value}</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                        background: STAT_COLORS[i % STAT_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total Base Stat</span>
                <span className={styles.totalVal}>
                  {p.stats.reduce((acc: number, cur: any) => acc + cur.value, 0)}
                </span>
              </div>
            </div>

            <hr className={styles.divider} />

            {/* Element Effectiveness/Matchups */}
            <span className={styles.sectionTitle}>Defensive Matchups</span>
            <div className={styles.matchupsGrid}>
              {p.matchups.map((m: any) => {
                let bgColor = '#4b5563';
                let textColor = '#ffffff';
                if (m.multiplier > 1) {
                  bgColor = 'rgba(239, 68, 68, 0.15)';
                  textColor = '#ef4444';
                } else if (m.multiplier < 1) {
                  bgColor = 'rgba(34, 197, 94, 0.15)';
                  textColor = '#22c55e';
                } else if (m.multiplier === 0) {
                  bgColor = 'rgba(0, 0, 0, 0.3)';
                  textColor = '#9ca3af';
                }
                return (
                  <span
                    key={m.type}
                    className={styles.matchupChip}
                    style={{ background: bgColor, color: textColor, border: `1px solid ${textColor}2a` }}
                  >
                    {m.type}: {m.multiplier}x
                  </span>
                );
              })}
            </div>

            <hr className={styles.divider} />

            {/* Spawn Locations Section */}
            <span className={styles.sectionTitle}>Wild Spawn Habitats</span>
            {p.gameVersions && p.gameVersions.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Select Game Version
                </span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.gameVersions.map((v: string) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVersion(v)}
                      style={{
                        padding: '4px 10px',
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        borderRadius: 4,
                        cursor: 'pointer',
                        border: `1px solid ${v === selectedVersion ? primaryColor : 'var(--border-main)'}`,
                        background: v === selectedVersion ? `${primaryColor}20` : 'transparent',
                        color: v === selectedVersion ? primaryColor : 'var(--text-secondary)',
                      }}
                    >
                      {v.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedVersion && (
              <div style={{ marginTop: 12 }}>
                {(!p.locations || p.locations.length === 0) ? (
                  <div className={styles.habitatCard} style={{ borderColor: 'rgba(239, 68, 68, 0.25)', background: 'rgba(239, 68, 68, 0.03)' }}>
                    <span className={styles.habitatText} style={{ color: '#ef4444' }}>
                      Not Obtainable in Version: {selectedVersion.replace('-', ' ')}
                    </span>
                    <span className={styles.habitatSubtext}>
                      This Pokémon cannot be found wild in this game. Must be traded or evolved.
                    </span>
                  </div>
                ) : (
                  <div className={styles.habitatCard}>
                    <span className={styles.habitatText} style={{ color: primaryColor }}>
                      Obtainable Locations ({p.locations.length} Areas)
                    </span>
                    <div className={styles.habitatChips}>
                      {p.locations.slice(0, 8).map((loc: string) => (
                        <span
                          key={loc}
                          className={styles.matchupChip}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-main)',
                            textTransform: 'capitalize',
                          }}
                        >
                          {loc.replace(/-/g, ' ')}
                        </span>
                      ))}
                      {p.locations.length > 8 && (
                        <span
                          className={styles.matchupChip}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-main)',
                          }}
                        >
                          +{p.locations.length - 8} more areas
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <hr className={styles.divider} />

            {/* Evolutions Panel */}
            <span className={styles.sectionTitle}>Evolutionary Branching</span>
            {(!p.evolutions || p.evolutions.length <= 1) ? (
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                This Pokémon does not evolve.
              </p>
            ) : (
              <div className={styles.evoChain}>
                {p.evolutions.map((evo: any, index: number) => {
                  const isEvoShiny = isShiny;
                  const evoImg = isEvoShiny ? (evo.shinyImage || evo.image) : evo.image;

                  return (
                    <React.Fragment key={evo.id}>
                      {index > 0 && (
                        <div className={styles.evoConnector}>
                          <ChevronRight size={16} />
                          <span className={styles.evoMethod}>
                            Lvl {evo.minLevel || '??'}
                          </span>
                        </div>
                      )}
                      <div className={styles.evoBlock}>
                        <div
                          className={styles.evoImageWrapper}
                          onClick={() => onSelectPokemonId && onSelectPokemonId(evo.id)}
                          style={{
                            background: isDark
                              ? `radial-gradient(circle, ${primaryColor}14 0%, transparent 70%)`
                              : `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`,
                            border: `1px solid ${
                              evo.id === pokemonId
                                ? primaryColor
                                : isDark
                                ? 'var(--border-main)'
                                : 'rgba(0, 0, 0, 0.08)'
                            }`
                          }}
                        >
                          {evoImg && (
                            <img src={evoImg} alt={evo.name} className={styles.evoImage} />
                          )}
                        </div>
                        <span className={styles.evoName} style={{ color: evo.id === pokemonId ? primaryColor : 'var(--text-primary)' }}>
                          {evo.name}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            <hr className={styles.divider} />

            {/* Mega / Alternative Forms */}
            {p.megaEvolutions && p.megaEvolutions.length > 0 && (
              <>
                <span className={styles.sectionTitle}>Special / Mega Evolutions</span>
                <div className={styles.megaList}>
                  {p.megaEvolutions.map((m: any) => {
                    const mImg = isShiny ? (m.shinyImage || m.image) : m.image;
                    return (
                      <div
                        key={m.id}
                        className={styles.megaCard}
                        onClick={() => onSelectPokemonId && onSelectPokemonId(m.id)}
                        style={{ border: '1px solid var(--border-main)', background: 'rgba(255,255,255,0.01)' }}
                      >
                        <span className={`${styles.customBadge} ${styles.megaTag}`} style={{ background: primaryColor }}>
                          MEGA
                        </span>
                        {mImg && <img src={mImg} alt={m.name} className={styles.megaImage} />}
                        <span className={styles.megaName}>{m.name.replace('-', ' ')}</span>
                      </div>
                    );
                  })}
                </div>
                <hr className={styles.divider} />
              </>
            )}

            {p.alternativeForms && p.alternativeForms.length > 0 && (
              <>
                <span className={styles.sectionTitle}>Regional / Alternative Forms</span>
                <div className={styles.megaList}>
                  {p.alternativeForms.map((m: any) => {
                    const mImg = isShiny ? (m.shinyImage || m.image) : m.image;
                    return (
                      <div
                        key={m.id}
                        className={styles.megaCard}
                        onClick={() => onSelectPokemonId && onSelectPokemonId(m.id)}
                        style={{ border: '1px solid var(--border-main)', background: 'rgba(255,255,255,0.01)' }}
                      >
                        <span className={`${styles.customBadge} ${styles.megaTag}`} style={{ background: '#6b7280' }}>
                          FORM
                        </span>
                        {mImg && <img src={mImg} alt={m.name} className={styles.megaImage} />}
                        <span className={styles.megaName}>{m.name.replace('-', ' ')}</span>
                      </div>
                    );
                  })}
                </div>
                <hr className={styles.divider} />
              </>
            )}

            {/* Learnable Moves Database */}
            <div className={styles.movesSection}>
              <span className={styles.sectionTitle}>Learnable Moves Database</span>
              <div className={styles.tabsRow}>
                {['Level Up', 'TM / HM', 'Egg', 'Tutor'].map((label, index) => (
                  <button
                    key={label}
                    className={`${styles.tabBtn} ${moveTab === index ? styles.active : ''}`}
                    onClick={() => setMoveTab(index)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Moves grid list */}
              <div className={styles.movesGrid}>
                {p.moves
                  .filter((m: any) => {
                    if (moveTab === 0) return m.learnMethod === 'level-up';
                    if (moveTab === 1) return m.learnMethod === 'machine';
                    if (moveTab === 2) return m.learnMethod === 'egg';
                    return m.learnMethod === 'tutor';
                  })
                  .map((m: any) => {
                    const moveColor = TYPE_COLORS[m.type] || '#9ca3af';
                    return (
                      <div key={m.name} className={styles.moveCard}>
                        <div className={styles.moveHeader}>
                          <div className={styles.moveTitleBlock}>
                            {m.learnMethod === 'level-up' && (
                              <span className={styles.moveMethodLabel}>
                                Lvl {m.levelLearnedAt}
                              </span>
                            )}
                            <span className={styles.moveTitle}>
                              {m.name.replace('-', ' ')}
                            </span>
                          </div>
                          <div className={styles.moveMeta}>
                            <div className={styles.moveMetaBlock}>
                              <span className={styles.moveMetaLabel}>PWR</span>
                              <span className={styles.moveMetaVal}>{m.power || '--'}</span>
                            </div>
                            <div className={styles.moveMetaBlock}>
                              <span className={styles.moveMetaLabel}>ACC</span>
                              <span className={styles.moveMetaVal}>{m.accuracy || '--'}</span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.moveBadges}>
                          <span className={styles.moveTypeBadge} style={{ background: moveColor }}>
                            {m.type}
                          </span>
                          <span
                            className={styles.moveClassBadge}
                            style={{
                              background: m.damageClass === 'physical' ? '#ef4444' : m.damageClass === 'special' ? '#3b82f6' : '#9ca3af',
                              color: '#fff',
                            }}
                          >
                            {m.damageClass}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
