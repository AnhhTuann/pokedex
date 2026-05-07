export const TYPE_LIST = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy'
];

export const TYPE_CHART: Record<string, Record<string, number>> = {
  normal: { fighting: 2, ghost: 0 },
  fire: { fire: 0.5, water: 2, grass: 0.5, ice: 0.5, ground: 2, rock: 2, bug: 0.5, steel: 0.5, fairy: 0.5 },
  water: { fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, steel: 0.5 },
  electric: { electric: 0.5, ground: 2, flying: 0.5, steel: 0.5 },
  grass: { fire: 2, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, poison: 2, ground: 0.5, flying: 2, bug: 2 },
  ice: { fire: 2, fighting: 2, rock: 2, steel: 2, ice: 0.5 },
  fighting: { flying: 2, psychic: 2, bug: 0.5, rock: 0.5, dark: 0.5, fairy: 2 },
  poison: { grass: 0.5, fighting: 0.5, poison: 0.5, ground: 2, psychic: 2, bug: 0.5, fairy: 0.5 },
  ground: { water: 2, grass: 2, ice: 2, poison: 0.5, rock: 0.5, electric: 0 },
  flying: { electric: 2, grass: 0.5, ice: 2, fighting: 0.5, ground: 0, bug: 0.5, rock: 2 },
  psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2 },
  bug: { fire: 2, grass: 0.5, fighting: 0.5, ground: 0.5, flying: 2, rock: 2 },
  rock: { normal: 0.5, fire: 0.5, water: 2, grass: 2, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, steel: 2 },
  ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
  dragon: { fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, dragon: 2, fairy: 2 },
  dark: { fighting: 2, psychic: 0, bug: 2, ghost: 0.5, dark: 0.5, fairy: 2 },
  steel: { normal: 0.5, fire: 2, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5 },
  fairy: { fighting: 0.5, poison: 2, bug: 0.5, dragon: 0, dark: 0.5, steel: 2 }
};

export interface MatchupResult {
  x4: string[];
  x2: string[];
  x1: string[];
  x05: string[];
  x025: string[];
  x0: string[];
}

export interface OffenseMatchupResult {
  x2: string[];
  x1: string[];
  x05: string[];
  x0: string[];
}

/**
 * Calculates defensive multipliers when defending with standard single or dual type
 */
export function calculateDamageTaken(primary: string, secondary: string | null): MatchupResult {
  const result: MatchupResult = {
    x4: [],
    x2: [],
    x1: [],
    x05: [],
    x025: [],
    x0: []
  };

  const pLower = primary.toLowerCase();
  const sLower = secondary ? secondary.toLowerCase() : null;

  for (const attackType of TYPE_LIST) {
    const mult1 = TYPE_CHART[pLower]?.[attackType] !== undefined ? TYPE_CHART[pLower][attackType] : 1;
    let mult2 = 1;
    if (sLower && sLower !== 'none' && sLower !== pLower) {
      mult2 = TYPE_CHART[sLower]?.[attackType] !== undefined ? TYPE_CHART[sLower][attackType] : 1;
    }
    const finalMult = mult1 * mult2;

    if (finalMult === 4) result.x4.push(attackType);
    else if (finalMult === 2) result.x2.push(attackType);
    else if (finalMult === 1) result.x1.push(attackType);
    else if (finalMult === 0.5) result.x05.push(attackType);
    else if (finalMult === 0.25) result.x025.push(attackType);
    else if (finalMult === 0) result.x0.push(attackType);
  }

  return result;
}

/**
 * Calculates offensive multipliers when attacking with a single type
 */
export function calculateDamageDealt(attacker: string): OffenseMatchupResult {
  const result: OffenseMatchupResult = {
    x2: [],
    x1: [],
    x05: [],
    x0: []
  };

  const aLower = attacker.toLowerCase();

  for (const defendingType of TYPE_LIST) {
    const mult = TYPE_CHART[defendingType]?.[aLower] !== undefined ? TYPE_CHART[defendingType][aLower] : 1;

    if (mult === 2) result.x2.push(defendingType);
    else if (mult === 1) result.x1.push(defendingType);
    else if (mult === 0.5) result.x05.push(defendingType);
    else if (mult === 0) result.x0.push(defendingType);
  }

  return result;
}
