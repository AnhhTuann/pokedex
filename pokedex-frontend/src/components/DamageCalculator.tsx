import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { motion } from 'motion/react';
import {
  Swords, Zap, CloudRain, Sun, Tornado, Scale, Heart, Copy, Check, ShieldAlert, AlertTriangle, Wind
} from 'lucide-react';
import {
  calculateDamage, calculateActualHP, calculateActualOtherStat,
  getNatureModifier, getFinalEffectiveness, CalculatorPokemon, CalculatorMove, FieldState
} from '../utils/damageCalc';
import styles from './DamageCalculator.module.scss';

// GraphQL queries
const SEARCH_POKEMON_QUERY = gql`
  query SearchPokemonForCalc($search: String) {
    pokemonList(limit: 100, search: $search) {
      results { id name types image }
    }
  }
`;

const GET_POKEMON_CALC_DETAILS = gql`
  query GetPokemonCalcDetails($id: Int!) {
    pokemon(id: $id) {
      id name types image abilities
      stats { name value }
      moves { name type power accuracy damageClass }
    }
  }
`;

const NATURES = [
  'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
  'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
  'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
  'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
  'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
];

const ITEMS = [
  'None', 'Leftovers', 'Life Orb', 'Choice Band', 'Choice Specs', 'Choice Scarf',
  'Assault Vest', 'Eviolite', 'Light Ball', 'Thick Club', 'Expert Belt', 'Focus Sash'
];

const STATUSES = ['Healthy', 'Burned', 'Paralyzed'];

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'Spe'
};

const TYPE_COLORS: Record<string, string> = {
  normal: "#9ca3af", fire: "#f97316", water: "#3b82f6", electric: "#eab308",
  grass: "#22c55e", ice: "#06b6d4", fighting: "#ef4444", poison: "#a855f7",
  ground: "#d97706", flying: "#818cf8", psychic: "#ec4899", bug: "#84cc16",
  rock: "#78716c", ghost: "#7c3aed", dragon: "#1d4ed8", dark: "#374151",
  steel: "#6b7280", fairy: "#f472b6"
};

const DEFAULT_STATS = {
  hp: 80, attack: 80, defense: 80, 'special-attack': 80, 'special-defense': 80, speed: 80
};

function getDamageColor(maxPercent: number) {
  if (maxPercent < 25) return '#10b981'; // Green
  if (maxPercent < 50) return '#eab308'; // Yellow
  if (maxPercent < 100) return '#f97316'; // Orange
  return '#ef4444'; // Red
}

function calcTypeColor(pct: number) {
  if (pct > 50) return 'linear-gradient(90deg, #10b981 0%, #059669 100%)';
  if (pct > 20) return 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)';
  return 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)';
}

/* ==========================================
   SUB-COMPONENT: AutoSuggest
   ========================================== */
interface AutoSuggestProps {
  label: string;
  value: any;
  options: any[];
  onSearchChange: (query: string) => void;
  onSelect: (item: any) => void;
  placeholder: string;
}

function AutoSuggest({ label, value, options, onSearchChange, onSelect, placeholder }: AutoSuggestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(value?.name || '');

  useEffect(() => {
    setSearchVal(value?.name || '');
  }, [value]);

  return (
    <div className={styles.suggestWrapper}>
      <label className={styles.suggestLabel}>{label}</label>
      <input
        type="text"
        className={styles.suggestInput}
        value={searchVal}
        placeholder={placeholder}
        onChange={e => {
          setSearchVal(e.target.value);
          onSearchChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 250)}
      />
      {isOpen && options.length > 0 && (
        <ul className={styles.suggestDropdown}>
          {options.map(opt => (
            <li
              key={opt.id}
              className={styles.suggestItem}
              onMouseDown={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
            >
              <img src={opt.image} className={styles.suggestAvatar} alt="" />
              <span>{opt.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ==========================================
   SUB-COMPONENT: StatRow
   ========================================== */
interface StatRowProps {
  statKey: string;
  label: string;
  base: number;
  ev: number;
  iv: number;
  level: number;
  nature: string;
  onEvChangeCommitted: (stat: string, val: number) => void;
  onIvChange: (stat: string, val: number) => void;
  color: string;
  remainingEvs: number;
}

const StatRowComponent: React.FC<StatRowProps> = ({
  statKey, label, base, ev, iv, level, nature, onEvChangeCommitted, onIvChange, color, remainingEvs
}) => {
  const [localEv, setLocalEv] = useState<number>(ev);

  useEffect(() => { setLocalEv(ev); }, [ev]);

  const handleLocalEvChange = (val: number) => {
    const maxAllowed = remainingEvs + ev;
    const cappedVal = Math.max(0, Math.min(val, Math.min(252, maxAllowed)));
    setLocalEv(cappedVal);
  };

  const commitEvChange = (val: number) => {
    const maxAllowed = remainingEvs + ev;
    const cappedVal = Math.max(0, Math.min(val, Math.min(252, maxAllowed)));
    onEvChangeCommitted(statKey, cappedVal);
  };

  const natureMod = statKey === 'hp' ? 1.0 : getNatureModifier(nature, statKey);
  const finalStat = statKey === 'hp'
    ? calculateActualHP(base, iv, localEv, level)
    : calculateActualOtherStat(base, iv, localEv, level, natureMod);

  let natureIndicator = '';
  let natureColor = 'var(--text-primary)';
  if (statKey !== 'hp') {
    if (natureMod === 1.1) {
      natureIndicator = ' ▲';
      natureColor = '#f43f5e';
    } else if (natureMod === 0.9) {
      natureIndicator = ' ▼';
      natureColor = '#3b82f6';
    }
  }

  return (
    <div className={styles.statRow}>
      <span className={styles.statName} style={{ color: natureColor }}>
        {label}<span style={{ fontSize: '0.65rem' }}>{natureIndicator}</span>
      </span>

      <span className={styles.statBase}>{base}</span>

      <div className={styles.statEvInput}>
        <input
          type="number"
          value={localEv}
          onChange={e => {
            const val = parseInt(e.target.value) || 0;
            handleLocalEvChange(val);
            commitEvChange(val);
          }}
          onBlur={() => commitEvChange(localEv)}
        />
      </div>

      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={0}
          max={252}
          step={4}
          value={localEv}
          onChange={e => {
            const val = parseInt(e.target.value) || 0;
            handleLocalEvChange(val);
            commitEvChange(val);
          }}
          className={styles.nativeSlider}
          style={{ '--slider-color': color } as React.CSSProperties}
        />
      </div>

      <div className={styles.statIvInput}>
        <input
          type="number"
          value={iv}
          onChange={e => onIvChange(statKey, parseInt(e.target.value) || 0)}
        />
      </div>

      <span className={styles.statActual} style={{ color: natureColor }}>
        {finalStat}
      </span>
    </div>
  );
};
const StatRow = React.memo(StatRowComponent);

/* ==========================================
   SUB-COMPONENT: PokemonConfigCard
   ========================================== */
interface PokemonConfigCardProps {
  side: 'atk' | 'def';
  searchQuery: string;
  onSearchChange: (query: string) => void;
  pokemonList: any[];
  currentPoke: any;
  onPokemonSelect: (id: number) => void;
  level: number;
  onLevelChange: (lvl: number) => void;
  nature: string;
  onNatureChange: (nature: string) => void;
  item: string;
  onItemChange: (item: string) => void;
  ability: string;
  onAbilityChange: (ability: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  evs: Record<string, number>;
  onEvChangeCommitted: (stat: string, val: number) => void;
  ivs: Record<string, number>;
  onIvChange: (stat: string, val: number) => void;
  selectedMove?: any;
  onMoveSelect?: (move: any) => void;
}

const PokemonConfigCardComponent: React.FC<PokemonConfigCardProps> = ({
  side, searchQuery, onSearchChange, pokemonList, currentPoke, onPokemonSelect,
  level, onLevelChange, nature, onNatureChange, item, onItemChange, ability, onAbilityChange, status, onStatusChange,
  evs, onEvChangeCommitted, ivs, onIvChange, selectedMove, onMoveSelect
}) => {
  const isAtk = side === 'atk';
  const totalEvs = Object.values(evs).reduce((a, b) => a + b, 0);
  const remainingEvs = 508 - totalEvs;

  return (
    <div className={`${styles.configCard} ${isAtk ? styles.atk : styles.def}`}>
      {/* Header Band */}
      <div className={`${styles.cardHeaderBand} ${isAtk ? styles.atk : styles.def}`}>
        <span className={styles.cardTitle}>
          <span className={`${styles.avatarIndicator} ${isAtk ? styles.atk : styles.def}`}>
            {isAtk ? 'A' : 'D'}
          </span>
          {isAtk ? 'ATTACKER CONFIG' : 'DEFENDER CONFIG'}
        </span>
        {currentPoke && (
          <div className={styles.typeChips}>
            {currentPoke.types.map((type: string) => (
              <span
                key={type}
                className={styles.typeChip}
                style={{ background: TYPE_COLORS[type] || '#ccc' }}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        {/* Search */}
        <AutoSuggest
          label={isAtk ? "SEARCH ATTACKER" : "SEARCH DEFENDER"}
          value={currentPoke}
          options={pokemonList}
          onSearchChange={onSearchChange}
          onSelect={val => onPokemonSelect(val.id)}
          placeholder="Type Pokemon name..."
        />

        {/* Compact Avatar Box */}
        {currentPoke && (
          <div className={styles.avatarBox}>
            <img src={currentPoke.image} className={styles.avatarImage} alt={currentPoke.name}/>
            <div className={styles.avatarInfo}>
              <span className={styles.avatarName}>{currentPoke.name}</span>
              <span className={styles.avatarTotal}>
                Base Stats Total: {currentPoke.stats.reduce((acc: number, curr: any) => acc + curr.value, 0)}
              </span>
            </div>
          </div>
        )}

        {/* Options Row Grid */}
        <div className={styles.compactGrid}>
          <div className={styles.formGroup} style={{ gridColumn: 'span 3' }}>
            <label className={styles.fieldLabel}>LV</label>
            <input
              className={styles.inputField}
              type="number"
              value={level}
              onChange={e => onLevelChange(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: 'span 5' }}>
            <label className={styles.fieldLabel}>NATURE</label>
            <select
              className={styles.selectField}
              value={nature}
              onChange={e => onNatureChange(e.target.value)}
            >
              {NATURES.map(nat => (
                <option key={nat} value={nat}>{nat}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup} style={{ gridColumn: 'span 4' }}>
            <label className={styles.fieldLabel}>STATUS</label>
            <select
              className={styles.selectField}
              value={status}
              onChange={e => onStatusChange(e.target.value)}
            >
              {STATUSES.map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup} style={{ gridColumn: 'span 6', marginTop: 8 }}>
            <label className={styles.fieldLabel}>ABILITY</label>
            <select
              className={styles.selectField}
              value={ability}
              onChange={e => onAbilityChange(e.target.value)}
            >
              {currentPoke?.abilities?.map((ab: string) => (
                <option key={ab} value={ab}>{ab}</option>
              )) || <option value="">None</option>}
            </select>
          </div>

          <div className={styles.formGroup} style={{ gridColumn: 'span 6', marginTop: 8 }}>
            <label className={styles.fieldLabel}>HELD ITEM</label>
            <select
              className={styles.selectField}
              value={item}
              onChange={e => onItemChange(e.target.value)}
            >
              {ITEMS.map(it => (
                <option key={it} value={it}>{it}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Moves selection only for Attacker */}
        {isAtk && currentPoke && onMoveSelect ? (
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>SELECT ATTACK MOVE</label>
            <select
              className={styles.selectField}
              value={selectedMove?.name || ''}
              onChange={e => {
                const m = currentPoke.moves.find((mv: any) => mv.name === e.target.value);
                if (m) onMoveSelect(m);
              }}
            >
              {currentPoke.moves.map((m: any) => (
                <option key={m.name} value={m.name}>
                  {m.name.toUpperCase()} (BP: {m.power || '--'}, {m.damageClass})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div style={{ height: '32px' }} />
        )}

        <hr style={{ border: 'none', borderTop: '1px dashed var(--border-main)', margin: '8px 0' }} />

        {/* Stats Table */}
        <div className={styles.statTable}>
          <div className={styles.tableHeaderRow}>
            <span className={styles.tableTitle}>📈 STATS EVS</span>
            <span
              className={styles.evLeftBadge}
              style={{ background: remainingEvs > 0 ? '#10b981' : '#ef4444' }}
            >
              EV Left: {remainingEvs}
            </span>
          </div>

          {/* Table Labels Row */}
          <div className={styles.tableLabels}>
            <span className={`${styles.tableHeaderCol} ${styles.stat}`}>STAT</span>
            <span className={`${styles.tableHeaderCol} ${styles.base}`}>BASE</span>
            <span className={`${styles.tableHeaderCol} ${styles.ev}`}>EV</span>
            <span className={`${styles.tableHeaderCol} ${styles.slider}`}>SLIDER</span>
            <span className={`${styles.tableHeaderCol} ${styles.iv}`}>IV</span>
            <span className={`${styles.tableHeaderCol} ${styles.actual}`}>ACTUAL</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {Object.keys(STAT_LABELS).map(stat => {
              const base = currentPoke?.baseStatsMap?.[stat] || 50;
              const iv = ivs[stat]; const ev = evs[stat];
              const rowColor = stat === 'hp' ? '#ef4444' : isAtk ? 'var(--primary)' : '#14b8a6';

              return (
                <StatRow
                  key={stat} statKey={stat} label={STAT_LABELS[stat]} base={base} ev={ev} iv={iv}
                  level={level} nature={nature} onEvChangeCommitted={onEvChangeCommitted}
                  onIvChange={onIvChange} color={rowColor} remainingEvs={remainingEvs}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const PokemonConfigCard = React.memo(PokemonConfigCardComponent);

/* ==========================================
   MAIN COMPONENT: DamageCalculator
   ========================================== */
export default function DamageCalculator() {
  const apolloClient = useApolloClient();

  const [atkSearch, setAtkSearch] = useState('');
  const [defSearch, setDefSearch] = useState('');

  const { data: atkListData } = useQuery(SEARCH_POKEMON_QUERY, { variables: { search: atkSearch } });
  const { data: defListData } = useQuery(SEARCH_POKEMON_QUERY, { variables: { search: defSearch } });

  const attackerList = atkListData?.pokemonList?.results || [];
  const defenderList = defListData?.pokemonList?.results || [];

  const [attackerPoke, setAttackerPoke] = useState<any>(null);
  const [attackerLevel, setAttackerLevel] = useState<number>(50);
  const [attackerNature, setAttackerNature] = useState<string>('Adamant');
  const [attackerItem, setAttackerItem] = useState<string>('None');
  const [attackerAbility, setAttackerAbility] = useState<string>('');
  const [attackerStatus, setAttackerStatus] = useState<string>('Healthy');
  const [attackerEvs, setAttackerEvs] = useState<Record<string, number>>({
    hp: 0, attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0
  });
  const [attackerIvs, setAttackerIvs] = useState<Record<string, number>>({
    hp: 31, attack: 31, defense: 31, 'special-attack': 31, 'special-defense': 31, speed: 31
  });
  const [selectedMove, setSelectedMove] = useState<any>(null);

  const [defenderPoke, setDefenderPoke] = useState<any>(null);
  const [defenderLevel, setDefenderLevel] = useState<number>(50);
  const [defenderNature, setDefenderNature] = useState<string>('Adamant');
  const [defenderItem, setDefenderItem] = useState<string>('None');
  const [defenderAbility, setDefenderAbility] = useState<string>('');
  const [defenderStatus, setDefenderStatus] = useState<string>('Healthy');
  const [defenderEvs, setDefenderEvs] = useState<Record<string, number>>({
    hp: 0, attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0
  });
  const [defenderIvs, setDefenderIvs] = useState<Record<string, number>>({
    hp: 31, attack: 31, defense: 31, 'special-attack': 31, 'special-defense': 31, speed: 31
  });

  const [weather, setWeather] = useState<'None' | 'Rain' | 'Sun' | 'Sandstorm' | 'Hail'>('None');
  const [terrain, setTerrain] = useState<'None' | 'Electric' | 'Grassy' | 'Misty' | 'Psychic'>('None');
  const [reflect, setReflect] = useState<boolean>(false);
  const [lightScreen, setLightScreen] = useState<boolean>(false);
  const [critical, setCritical] = useState<boolean>(false);

  const [copied, setCopied] = useState(false);

  const loadAttackerDetails = useCallback(async (id: number) => {
    try {
      const { data } = await apolloClient.query({ query: GET_POKEMON_CALC_DETAILS, variables: { id } });
      const p = data.pokemon;
      const statsMap: Record<string, number> = { ...DEFAULT_STATS };
      p.stats.forEach((s: any) => { statsMap[s.name] = s.value; });

      const pokeCopy = { ...p, baseStatsMap: statsMap };
      setAttackerPoke(pokeCopy);
      setAttackerAbility(p.abilities && p.abilities.length > 0 ? p.abilities[0] : '');

      const dmgMoves = p.moves.filter((m: any) => m.damageClass !== 'status' && (m.power || 0) > 0);
      setSelectedMove(dmgMoves.length > 0 ? dmgMoves[0] : p.moves.length > 0 ? p.moves[0] : null);
    } catch (e) { console.error(e); }
  }, [apolloClient]);

  const loadDefenderDetails = useCallback(async (id: number) => {
    try {
      const { data } = await apolloClient.query({ query: GET_POKEMON_CALC_DETAILS, variables: { id } });
      const p = data.pokemon;
      const statsMap: Record<string, number> = { ...DEFAULT_STATS };
      p.stats.forEach((s: any) => { statsMap[s.name] = s.value; });

      const pokeCopy = { ...p, baseStatsMap: statsMap };
      setDefenderPoke(pokeCopy);
      setDefenderAbility(p.abilities && p.abilities.length > 0 ? p.abilities[0] : '');
    } catch (e) { console.error(e); }
  }, [apolloClient]);

  useEffect(() => {
    loadAttackerDetails(1); loadDefenderDetails(9);
  }, [loadAttackerDetails, loadDefenderDetails]);

  const handleAtkEvChangeCommitted = useCallback((stat: string, val: number) => {
    setAttackerEvs(prev => {
      const currentTotal = Object.keys(prev).reduce((sum, key) => sum + (key === stat ? 0 : prev[key]), 0);
      const remaining = 508 - currentTotal;
      return { ...prev, [stat]: Math.max(0, Math.min(val, Math.min(252, remaining))) };
    });
  }, []);

  const handleDefEvChangeCommitted = useCallback((stat: string, val: number) => {
    setDefenderEvs(prev => {
      const currentTotal = Object.keys(prev).reduce((sum, key) => sum + (key === stat ? 0 : prev[key]), 0);
      const remaining = 508 - currentTotal;
      return { ...prev, [stat]: Math.max(0, Math.min(val, Math.min(252, remaining))) };
    });
  }, []);

  const handleAtkIvChange = useCallback((stat: string, val: number) => {
    setAttackerIvs(prev => ({ ...prev, [stat]: Math.min(31, Math.max(0, val)) }));
  }, []);

  const handleDefIvChange = useCallback((stat: string, val: number) => {
    setDefenderIvs(prev => ({ ...prev, [stat]: Math.min(31, Math.max(0, val)) }));
  }, []);

  const attackerModel = useMemo<CalculatorPokemon | null>(() => {
    if (!attackerPoke) return null;
    return {
      id: attackerPoke.id, name: attackerPoke.name, types: attackerPoke.types, level: attackerLevel,
      nature: attackerNature, item: attackerItem, ability: attackerAbility, status: attackerStatus,
      evs: attackerEvs, ivs: attackerIvs, baseStats: attackerPoke.baseStatsMap || DEFAULT_STATS
    };
  }, [attackerPoke, attackerLevel, attackerNature, attackerItem, attackerAbility, attackerStatus, attackerEvs, attackerIvs]);

  const defenderModel = useMemo<CalculatorPokemon | null>(() => {
    if (!defenderPoke) return null;
    return {
      id: defenderPoke.id, name: defenderPoke.name, types: defenderPoke.types, level: defenderLevel,
      nature: defenderNature, item: defenderItem, ability: defenderAbility, status: defenderStatus,
      evs: defenderEvs, ivs: defenderIvs, baseStats: defenderPoke.baseStatsMap || DEFAULT_STATS
    };
  }, [defenderPoke, defenderLevel, defenderNature, defenderItem, defenderAbility, defenderStatus, defenderEvs, defenderIvs]);

  const moveModel = useMemo<CalculatorMove | null>(() => {
    if (!selectedMove) return null;
    return {
      name: selectedMove.name, type: selectedMove.type, power: selectedMove.power, damageClass: selectedMove.damageClass
    };
  }, [selectedMove]);

  const fieldModel = useMemo<FieldState>(() => {
    return { weather, terrain, reflect, lightScreen, critical };
  }, [weather, terrain, reflect, lightScreen, critical]);

  const calcResult = useMemo(() => {
    if (!attackerModel || !defenderModel || !moveModel) return null;
    return calculateDamage(attackerModel, defenderModel, moveModel, fieldModel);
  }, [attackerModel, defenderModel, moveModel, fieldModel]);

  const showdownOutput = useMemo(() => {
    if (!attackerModel || !defenderModel || !selectedMove || !calcResult) return '';

    const isPhysical = selectedMove.damageClass === 'physical';
    const activeStatName = isPhysical ? 'attack' : 'special-attack';
    const statLabel = isPhysical ? 'Atk' : 'SpA';
    const evVal = attackerEvs[activeStatName] || 0;
    const natureMod = getNatureModifier(attackerNature, activeStatName);
    const natureSign = natureMod === 1.1 ? '+' : natureMod === 0.9 ? '-' : '';
    const itemString = attackerItem !== 'None' ? `${attackerItem} ` : '';

    const defStatName = isPhysical ? 'defense' : 'special-defense';
    const hpEvs = defenderEvs['hp'] || 0;
    const defEvs = defenderEvs[defStatName] || 0;

    const weatherString = weather !== 'None' ? `under ${weather} ` : '';
    const critString = critical ? ' on critical hit' : '';

    return `${evVal}${natureSign} ${statLabel} ${itemString}${attackerModel.name} ${selectedMove.name} ${weatherString}vs. ${hpEvs} HP / ${defEvs} Def ${defenderModel.name}${critString}: ${calcResult.minDamage}-${calcResult.maxDamage} (${calcResult.minPercent}% - ${calcResult.maxPercent}%) -- ${calcResult.koChanceText}`;
  }, [attackerModel, defenderModel, selectedMove, calcResult, attackerEvs, attackerNature, attackerItem, defenderEvs, weather, critical]);

  const handleCopy = useCallback(() => {
    if (!showdownOutput) return;
    navigator.clipboard.writeText(showdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [showdownOutput]);

  const damageColor = calcResult ? getDamageColor(calcResult.maxPercent) : '#fbbf24';

  return (
    <div className={styles.container}>
      {/* Page Title */}
      <div className={styles.headerRow}>
        <Swords className={styles.headerIcon} />
        <div>
          <h1 className={styles.headerTitle}>BATTLE DAMAGE CALCULATOR</h1>
          <p className={styles.headerSub}>
            Simulate competitive damage rolls, stats distributions, items, screens, and weather multipliers!
          </p>
        </div>
      </div>

      {/* Weather & Terrains Card */}
      <div className={styles.fieldCard}>
        <span className={styles.fieldCardTitle}>
          <Zap size={14} color="#f59e0b" /> FIELD WEATHER & TERRAINS
        </span>

        <div className={styles.fieldGrid}>
          {/* Weather Option */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>WEATHER</label>
            <select
              className={styles.selectField}
              value={weather}
              onChange={e => setWeather(e.target.value as any)}
            >
              <option value="None">None (Clear)</option>
              <option value="Rain">⛈️ Rain</option>
              <option value="Sun">☀️ Sun</option>
              <option value="Sandstorm">🌪️ Sandstorm</option>
            </select>
          </div>

          {/* Terrain Option */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>TERRAIN</label>
            <select
              className={styles.selectField}
              value={terrain}
              onChange={e => setTerrain(e.target.value as any)}
            >
              <option value="None">None</option>
              <option value="Electric">Electric</option>
              <option value="Grassy">Grassy</option>
              <option value="Misty">Misty</option>
              <option value="Psychic">Psychic</option>
            </select>
          </div>

          {/* Reflect Toggle */}
          <div>
            <label className={styles.switchLabel}>
              <input
                type="checkbox"
                className={styles.nativeSwitch}
                checked={reflect}
                onChange={e => setReflect(e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
              <span className={styles.labelText}>REFLECT (DEF)</span>
            </label>
          </div>

          {/* Light Screen Toggle */}
          <div>
            <label className={styles.switchLabel}>
              <input
                type="checkbox"
                className={styles.nativeSwitch}
                checked={lightScreen}
                onChange={e => setLightScreen(e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
              <span className={styles.labelText}>LIGHT SCREEN</span>
            </label>
          </div>

          {/* Critical toggle */}
          <div>
            <label className={styles.switchLabel}>
              <input
                type="checkbox"
                className={styles.nativeSwitch}
                checked={critical}
                onChange={e => setCritical(e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
              <span className={styles.labelText} style={{ color: critical ? '#f59e0b' : 'inherit' }}>
                FORCE CRIT ✨
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Two-Column Panel */}
      <div className={styles.grid}>
        <div className={styles.configCard} style={{ gridColumn: 'span 6' }}>
          <PokemonConfigCard
            side="atk" searchQuery={atkSearch}
            onSearchChange={setAtkSearch} pokemonList={attackerList} currentPoke={attackerPoke}
            onPokemonSelect={loadAttackerDetails} level={attackerLevel} onLevelChange={setAttackerLevel}
            nature={attackerNature} onNatureChange={setAttackerNature} item={attackerItem}
            onItemChange={setAttackerItem} ability={attackerAbility} onAbilityChange={setAttackerAbility}
            status={attackerStatus} onStatusChange={setAttackerStatus} evs={attackerEvs}
            onEvChangeCommitted={handleAtkEvChangeCommitted} ivs={attackerIvs} onIvChange={handleAtkIvChange}
            selectedMove={selectedMove} onMoveSelect={setSelectedMove}
          />
        </div>

        <div className={styles.configCard} style={{ gridColumn: 'span 6' }}>
          <PokemonConfigCard
            side="def" searchQuery={defSearch}
            onSearchChange={setDefSearch} pokemonList={defenderList} currentPoke={defenderPoke}
            onPokemonSelect={loadDefenderDetails} level={defenderLevel} onLevelChange={setDefenderLevel}
            nature={defenderNature} onNatureChange={setDefenderNature} item={defenderItem}
            onItemChange={setDefenderItem} ability={defenderAbility} onAbilityChange={setDefenderAbility}
            status={defenderStatus} onStatusChange={setDefenderStatus} evs={defenderEvs}
            onEvChangeCommitted={handleDefEvChangeCommitted} ivs={defenderIvs} onIvChange={handleDefIvChange}
          />
        </div>
      </div>

      {/* Prominent Outcome Card */}
      {calcResult && attackerPoke && defenderPoke && selectedMove && (
        <div className={styles.outcomeCard} style={{ border: `1px solid ${damageColor}35`, boxShadow: `0 8px 32px ${damageColor}0f` }}>
          <div className={styles.outcomeHeader} style={{ background: `${damageColor}0f`, borderBottom: `1px solid ${damageColor}22` }}>
            <span className={styles.outcomeTitle} style={{ color: damageColor }}>
              <Scale size={16} /> BATTLE CALCULATION OUTCOME (SHOWDOWN FORMAT)
            </span>
            <div className={styles.outcomeChip} style={{ background: damageColor }}>
              {calcResult.koChanceText}
            </div>
          </div>

          <div className={styles.outcomeBody}>
            {/* Giant Percentage Result */}
            <div>
              <h2 className={styles.giantPercent} style={{ color: damageColor }}>
                {calcResult.minPercent}% - {calcResult.maxPercent}%
              </h2>
              <p className={styles.giantSub}>
                Damage Roll: {calcResult.minDamage} - {calcResult.maxDamage} HP
              </p>
            </div>

            {/* Defender HP Bar Loss */}
            <div className={styles.hpBarWrapper}>
              <div className={styles.hpBarHeader}>
                <span className={styles.hpBarTitle}>
                  <Heart size={14} color="#ef4444" style={{ fill: '#ef4444' }} /> Defender Remaining HP
                </span>
                <span className={styles.hpBarMax}>Max HP: {calcResult.defHP}</span>
              </div>

              <div className={styles.hpBar}>
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${Math.max(0, 100 - calcResult.maxPercent)}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                  className={styles.hpBarProgress}
                  style={{
                    background: calcTypeColor(100 - calcResult.maxPercent)
                  }}
                />
                <span className={styles.hpBarText}>
                  Remaining: {Math.max(0, 100 - calcResult.maxPercent).toFixed(1)}% - {Math.max(0, 100 - calcResult.minPercent).toFixed(1)}%
                </span>
              </div>

              {calcResult.maxPercent >= 100 && (
                <div className={styles.alertDanger}>
                  <AlertTriangle size={16} className={styles.alertIcon} />
                  <span>
                    Danger! This attack has a high probability to trigger a <strong>One-Hit Knockout (OHKO)</strong> on the defender under standard conditions.
                  </span>
                </div>
              )}
            </div>

            {/* Copyable Showdown Output */}
            <div className={styles.showdownWrapper}>
              <span className={styles.showdownText}>{showdownOutput}</span>
              <button
                className={styles.showdownCopyBtn} onClick={handleCopy}
                style={{ background: copied ? '#22c55e' : 'var(--primary)' }}
              >
                {copied ? 'Copied!' : 'Copy Showdown'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
