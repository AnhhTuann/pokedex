import { useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { useReferenceDetail } from '../hooks/useReferencePokemon';
import { useTeamStore } from '../lib/teamStore';
import { TYPE_COLORS } from '../lib/utils';
import { PokemonArtwork } from './PokemonArtwork';
import styles from '../styles/components/CompareModal.module.scss';

interface CompareModalProps { ids: number[]; onClose: () => void; }

const STAT_LABELS: Record<string, string> = {
  hp: 'HP', attack: 'ATK', defense: 'DEF', 'special-attack': 'Sp. Atk', 'special-defense': 'Sp. Def', speed: 'SPE',
};
const COMPARE_COLORS = ['var(--brand)', 'var(--secondary)'];

export default function CompareModal({ ids, onClose }: CompareModalProps) {
  const isOpen = ids.length === 2;
  const shiny = useTeamStore(state => state.isShinyMode);
  const { pokemon: first, loading: loadingFirst } = useReferenceDetail(isOpen ? ids[0] : null);
  const { pokemon: second, loading: loadingSecond } = useReferenceDetail(isOpen ? ids[1] : null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const chartData = first?.stats.map(stat => ({
    stat: STAT_LABELS[stat.name] ?? stat.name,
    first: stat.value,
    second: second?.stats.find(other => stat.name === other.name)?.value,
  }));

  return (
    <div onClick={onClose} className={styles.overlay}>
      <section onClick={event => event.stopPropagation()} className={styles.modalCard}
        role="dialog" aria-modal="true" aria-labelledby="comparison-heading">
        <header className={styles.header}>
          <h2 className={styles.title} id="comparison-heading">Head-to-head comparison</h2>
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close comparison" autoFocus>
            <X size={18} />
          </button>
        </header>
        {first && second ? (
          <div className={styles.body}>
            {[first, second].map((pokemon, index) => {
              const opponent = index === 0 ? second : first;
              return (
                <div className={styles.pokemonColumn} key={pokemon.id}>
                  <div className={styles.avatarCircle} style={{ backgroundColor: `${TYPE_COLORS[pokemon.types[0]]}25` }}>
                    <PokemonArtwork src={shiny ? pokemon.shinyImage : pokemon.image} shiny={shiny}
                      name={pokemon.name} className={styles.pokemonImage} />
                  </div>
                  <h3 className={styles.pokemonName} style={{ color: COMPARE_COLORS[index] }}>
                    {pokemon.name.replaceAll('-', ' ')}
                  </h3>
                  <div className={styles.typesRow}>
                    {pokemon.types.map(type => (
                      <span key={type} className={styles.typeBadge} style={{
                        background: `color-mix(in srgb, ${TYPE_COLORS[type]} 76%, white)`,
                      }}>{type}</span>
                    ))}
                  </div>
                  <dl className={styles.statsRow}>
                    {pokemon.stats.map(stat => {
                      const opponentValue = opponent.stats.find(other => other.name === stat.name)?.value;
                      const wins = opponentValue != null && stat.value > opponentValue;
                      return (
                        <div key={stat.name} className={`${styles.statItem} ${wins ? styles.win : ''}`}>
                          <dt>{STAT_LABELS[stat.name] ?? stat.name}</dt>
                          <dd>{stat.value}{wins && <span aria-label="Winning stat"> ✓</span>}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              );
            })}
            <div className={styles.chartContainer} aria-label="Base stats radar chart">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="var(--border-hover)" />
                  <PolarAngleAxis dataKey="stat" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 255]} tick={false} axisLine={false} />
                  <Radar name={first.name} dataKey="first" stroke={COMPARE_COLORS[0]} fill={COMPARE_COLORS[0]} fillOpacity={0.24} />
                  <Radar name={second.name} dataKey="second" stroke={COMPARE_COLORS[1]} fill={COMPARE_COLORS[1]} fillOpacity={0.24} />
                  <Tooltip contentStyle={{ borderRadius: 8, background: 'var(--bg-paper)', color: 'var(--text-primary)' }} />
                  <Legend wrapperStyle={{ fontSize: 12, textTransform: 'capitalize' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : <p className={styles.status} role="status">{loadingFirst || loadingSecond
          ? 'Loading Pokémon…' : 'Unable to load the selected Pokémon.'}</p>}
      </section>
    </div>
  );
}
