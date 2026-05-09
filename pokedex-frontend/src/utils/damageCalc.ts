import { TYPE_CHART } from './typeMatchups';

export interface NatureEffect {
  increased: string | null;
  decreased: string | null;
}

export const NATURE_EFFECTS: Record<string, NatureEffect> = {
  Hardy: { increased: null, decreased: null },
  Lonely: { increased: 'attack', decreased: 'defense' },
  Brave: { increased: 'attack', decreased: 'speed' },
  Adamant: { increased: 'attack', decreased: 'special-attack' },
  Naughty: { increased: 'attack', decreased: 'special-defense' },
  Bold: { increased: 'defense', decreased: 'attack' },
  Docile: { increased: null, decreased: null },
  Relaxed: { increased: 'defense', decreased: 'speed' },
  Impish: { increased: 'defense', decreased: 'special-attack' },
  Lax: { increased: 'defense', decreased: 'special-defense' },
  Timid: { increased: 'speed', decreased: 'attack' },
  Hasty: { increased: 'speed', decreased: 'defense' },
  Serious: { increased: null, decreased: null },
  Jolly: { increased: 'speed', decreased: 'special-attack' },
  Naive: { increased: 'speed', decreased: 'special-defense' },
  Modest: { increased: 'special-attack', decreased: 'attack' },
  Mild: { increased: 'special-attack', decreased: 'defense' },
  Quiet: { increased: 'special-attack', decreased: 'speed' },
  Rash: { increased: 'special-attack', decreased: 'special-defense' },
  Bashful: { increased: null, decreased: null },
  Calm: { increased: 'special-defense', decreased: 'attack' },
  Gentle: { increased: 'special-defense', decreased: 'defense' },
  Sassy: { increased: 'special-defense', decreased: 'speed' },
  Careful: { increased: 'special-defense', decreased: 'special-attack' },
  Quirky: { increased: null, decreased: null }
};

export interface CalculatorPokemon {
  id: number;
  name: string;
  types: string[];
  level: number;
  nature: string;
  item: string;
  ability: string;
  status: string; // 'Healthy', 'Burned', 'Paralyzed', 'Asleep', 'Poisoned'
  ivs: Record<string, number>;
  evs: Record<string, number>;
  baseStats: Record<string, number>;
}

export interface CalculatorMove {
  name: string;
  type: string;
  power: number | null;
  damageClass: string; // 'physical', 'special', 'status'
}

export interface FieldState {
  weather: 'None' | 'Rain' | 'Sun' | 'Sandstorm' | 'Hail';
  terrain: 'None' | 'Electric' | 'Grassy' | 'Misty' | 'Psychic';
  reflect: boolean;
  lightScreen: boolean;
  critical: boolean;
}

export interface DamageResult {
  minDamage: number;
  maxDamage: number;
  minPercent: number;
  maxPercent: number;
  defHP: number;
  effectiveness: number;
  isStab: boolean;
  koChanceText: string;
  rolls: number[];
}

// Helper calculation formulas
export const calculateActualHP = (base: number, iv: number, ev: number, level: number): number => {
  if (base === 1) return 1; // Shedinja HP safety cap
  return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
};

export const calculateActualOtherStat = (
  base: number,
  iv: number,
  ev: number,
  level: number,
  natureModifier: number
): number => {
  return Math.floor((Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) * natureModifier);
};

export const getNatureModifier = (natureName: string, statName: string): number => {
  const effect = NATURE_EFFECTS[natureName];
  if (!effect) return 1.0;
  if (effect.increased === statName) return 1.1;
  if (effect.decreased === statName) return 0.9;
  return 1.0;
};

// Calculates single type chart effectiveness
const getSingleEffectiveness = (atkType: string, defType: string): number => {
  const chart = TYPE_CHART[defType.toLowerCase()];
  if (!chart) return 1.0;
  const mult = chart[atkType.toLowerCase()];
  return mult !== undefined ? mult : 1.0;
};

// Calculates final dual effectiveness
export const getFinalEffectiveness = (atkType: string, defTypes: string[]): number => {
  let finalMult = 1.0;
  for (const t of defTypes) {
    finalMult *= getSingleEffectiveness(atkType, t);
  }
  return finalMult;
};

// Main mathematical formula engine
export function calculateDamage(
  attacker: CalculatorPokemon,
  defender: CalculatorPokemon,
  move: CalculatorMove,
  fieldState: FieldState
): DamageResult {
  const movePower = move.power || 0;
  
  const defHP = calculateActualHP(
    defender.baseStats['hp'] || 50,
    defender.ivs['hp'] !== undefined ? defender.ivs['hp'] : 31,
    defender.evs['hp'] || 0,
    defender.level
  );

  // Status/Self-dealing or zero power moves check
  if (move.damageClass === 'status' || movePower === 0) {
    return {
      minDamage: 0,
      maxDamage: 0,
      minPercent: 0,
      maxPercent: 0,
      defHP,
      effectiveness: 1,
      isStab: false,
      koChanceText: 'No damage dealt (Status move)',
      rolls: Array(16).fill(0)
    };
  }

  // Choose Attack & Defense parameters
  const isPhysical = move.damageClass === 'physical';
  const atkStatName = isPhysical ? 'attack' : 'special-attack';
  const defStatName = isPhysical ? 'defense' : 'special-defense';

  const rawAtk = calculateActualOtherStat(
    attacker.baseStats[atkStatName] || 50,
    attacker.ivs[atkStatName] !== undefined ? attacker.ivs[atkStatName] : 31,
    attacker.evs[atkStatName] || 0,
    attacker.level,
    getNatureModifier(attacker.nature, atkStatName)
  );

  const rawDef = calculateActualOtherStat(
    defender.baseStats[defStatName] || 50,
    defender.ivs[defStatName] !== undefined ? defender.ivs[defStatName] : 31,
    defender.evs[defStatName] || 0,
    defender.level,
    getNatureModifier(defender.nature, defStatName)
  );

  // Apply attacker Item bonuses
  let finalAtk = rawAtk;
  if (isPhysical) {
    if (attacker.item === 'Choice Band') finalAtk = Math.floor(finalAtk * 1.5);
    if (attacker.item === 'Light Ball' && attacker.name.toLowerCase().includes('pikachu')) finalAtk = Math.floor(finalAtk * 2.0);
    if (attacker.item === 'Thick Club' && (attacker.name.toLowerCase().includes('cubone') || attacker.name.toLowerCase().includes('marowak'))) finalAtk = Math.floor(finalAtk * 2.0);
  } else {
    if (attacker.item === 'Choice Specs') finalAtk = Math.floor(finalAtk * 1.5);
    if (attacker.item === 'Light Ball' && attacker.name.toLowerCase().includes('pikachu')) finalAtk = Math.floor(finalAtk * 2.0);
  }

  // Apply defender Item bonuses
  let finalDef = rawDef;
  if (defender.item === 'Eviolite') {
    finalDef = Math.floor(finalDef * 1.5);
  }
  if (!isPhysical && defender.item === 'Assault Vest') {
    finalDef = Math.floor(finalDef * 1.5);
  }

  // Core level base calculation
  const levelCalc = Math.floor((2 * attacker.level) / 5) + 2;

  // Standard damage core (excluding modifiers)
  const baseDamage = Math.floor(
    Math.floor((levelCalc * movePower * finalAtk) / finalDef) / 50
  ) + 2;

  // Apply Weather conditions
  let weatherMod = 1.0;
  if (fieldState.weather === 'Rain') {
    if (move.type.toLowerCase() === 'water') weatherMod = 1.5;
    if (move.type.toLowerCase() === 'fire') weatherMod = 0.5;
  } else if (fieldState.weather === 'Sun') {
    if (move.type.toLowerCase() === 'fire') weatherMod = 1.5;
    if (move.type.toLowerCase() === 'water') weatherMod = 0.5;
  }

  // Critical hit multiplier
  const critMod = fieldState.critical ? 1.5 : 1.0;

  // Same Type Attack Bonus (STAB)
  const isStab = attacker.types.map(t => t.toLowerCase()).includes(move.type.toLowerCase());
  const stabMod = isStab ? 1.5 : 1.0;

  // Type effectiveness multiplier
  const typeMod = getFinalEffectiveness(move.type, defender.types);

  // Status burn reduction (physical moves only)
  const burnMod = (attacker.status === 'Burned' && isPhysical) ? 0.5 : 1.0;

  // Screen shields (Reflect for physical, Light Screen for special - ignored on Critical)
  let screenMod = 1.0;
  if (!fieldState.critical) {
    if (isPhysical && fieldState.reflect) screenMod = 0.5;
    if (!isPhysical && fieldState.lightScreen) screenMod = 0.5;
  }

  // Competitive attacker item modifiers
  let itemMod = 1.0;
  if (attacker.item === 'Life Orb') itemMod = 1.3;
  if (attacker.item === 'Expert Belt' && typeMod > 1.0) itemMod = 1.2;

  // Combine static modifiers
  const staticModifier = weatherMod * critMod * stabMod * typeMod * burnMod * screenMod * itemMod;

  // Standard Pokemon mechanics utilizes 16 distinct random rolls from 85% to 100%
  const rolls: number[] = [];
  let ohkoRolls = 0;

  for (let r = 85; r <= 100; r++) {
    const rollDamage = Math.floor(baseDamage * staticModifier * (r / 100));
    rolls.push(rollDamage);
    if (rollDamage >= defHP) {
      ohkoRolls++;
    }
  }

  const minDamage = rolls[0];
  const maxDamage = rolls[rolls.length - 1];

  const minPercent = parseFloat(((minDamage / defHP) * 100).toFixed(1));
  const maxPercent = parseFloat(((maxDamage / defHP) * 100).toFixed(1));

  // Determine standard competitive text chances
  let koChanceText = '';
  if (minPercent >= 100) {
    koChanceText = 'guaranteed OHKO';
  } else if (maxPercent < 100) {
    if (minPercent >= 50) {
      koChanceText = 'guaranteed 2HKO';
    } else if (maxPercent >= 50) {
      const rollsTo2HKO = rolls.filter(dmg => dmg * 2 >= defHP).length;
      const chanceTo2HKO = parseFloat(((rollsTo2HKO / 16) * 100).toFixed(1));
      koChanceText = `${chanceTo2HKO}% chance to 2HKO`;
    } else if (minPercent >= 33.3) {
      koChanceText = 'guaranteed 3HKO';
    } else {
      koChanceText = 'possible multi-turn KO';
    }
  } else {
    // Some rolls kill, some don't (OHKO percentage chance)
    const ohkoChance = parseFloat(((ohkoRolls / 16) * 100).toFixed(1));
    koChanceText = `${ohkoChance}% chance to OHKO`;
  }

  return {
    minDamage,
    maxDamage,
    minPercent,
    maxPercent,
    defHP,
    effectiveness: typeMod,
    isStab,
    koChanceText,
    rolls
  };
}
