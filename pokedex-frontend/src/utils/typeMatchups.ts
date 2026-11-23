export const TYPE_LIST = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy'
];

/** Defense rows: TYPE_CHART[defender][attacker]. Modern (Gen 6+) chart. */
export const TYPE_CHART: Record<string, Record<string, number>> = {
  normal: { fighting: 2, ghost: 0 },
  fire: { fire: 0.5, water: 2, grass: 0.5, ice: 0.5, ground: 2, rock: 2, bug: 0.5, steel: 0.5, fairy: 0.5 },
  water: { fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, steel: 0.5 },
  electric: { electric: 0.5, ground: 2, flying: 0.5, steel: 0.5 },
  grass: { fire: 2, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, poison: 2, ground: 0.5, flying: 2, bug: 2 },
  ice: { fire: 2, ice: 0.5, fighting: 2, rock: 2, steel: 2 },
  fighting: { flying: 2, psychic: 2, bug: 0.5, rock: 0.5, dark: 0.5, fairy: 2 },
  poison: { grass: 0.5, fighting: 0.5, poison: 0.5, ground: 2, psychic: 2, bug: 0.5, fairy: 0.5 },
  ground: { water: 2, electric: 0, grass: 2, ice: 2, poison: 0.5, rock: 0.5 },
  flying: { electric: 2, grass: 0.5, ice: 2, fighting: 0.5, ground: 0, bug: 0.5, rock: 2 },
  psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2 },
  bug: { fire: 2, grass: 0.5, fighting: 0.5, ground: 0.5, flying: 2, rock: 2 },
  rock: { normal: 0.5, fire: 0.5, water: 2, grass: 2, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, steel: 2 },
  ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
  dragon: { fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, dragon: 2, fairy: 2 },
  dark: { fighting: 2, psychic: 0, bug: 2, ghost: 0.5, dark: 0.5, fairy: 2 },
  steel: { normal: 0.5, fire: 2, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5 },
  fairy: { fighting: 0.5, poison: 2, bug: 0.5, dragon: 0, dark: 0.5, steel: 2 },
};

export const MODERN_TYPE_CHART = TYPE_CHART;

type Chart = Record<string, Record<string, number>>;

const cloneChart = (chart: Chart): Chart =>
  Object.fromEntries(Object.entries(chart).map(([defender, row]) => [defender, { ...row }]));

function withoutTypes(chart: Chart, removed: string[]): Chart {
  const result = cloneChart(chart);
  for (const type of removed) {
    delete result[type];
    for (const row of Object.values(result)) delete row[type];
  }
  return result;
}

/** Gen 2-5: no Fairy; Steel still resists Ghost and Dark. */
export const GEN2_TO_5_TYPE_CHART: Chart = (() => {
  const chart = withoutTypes(TYPE_CHART, ['fairy']);
  chart.steel.ghost = 0.5;
  chart.steel.dark = 0.5;
  return chart;
})();

/** Gen 1: no Dark/Steel/Fairy, Ghost immune to Psychic, Bug/Poison mutual 2x, Ice neutral vs Fire. */
export const GEN1_TYPE_CHART: Chart = (() => {
  const chart = withoutTypes(GEN2_TO_5_TYPE_CHART, ['dark', 'steel']);
  chart.psychic.ghost = 0;
  chart.poison.bug = 2;
  chart.bug.poison = 2;
  delete chart.fire.ice;
  return chart;
})();

export function getTypeChart(generation = 6): Chart {
  if (generation <= 1) return GEN1_TYPE_CHART;
  if (generation <= 5) return GEN2_TO_5_TYPE_CHART;
  return TYPE_CHART;
}

export function getTypesForGeneration(generation = 6): string[] {
  if (generation <= 1) return TYPE_LIST.slice(0, 15);
  if (generation <= 5) return TYPE_LIST.slice(0, 17);
  return TYPE_LIST;
}

export function getTypeMultiplier(
  attackType: string,
  defenderType: string,
  generation = 6,
): number {
  const row = getTypeChart(generation)[defenderType.toLowerCase()];
  return row?.[attackType.toLowerCase()] ?? 1;
}

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

/** Defensive multipliers for single or dual typing; defaults to modern rules. */
export function calculateDamageTaken(
  primary: string,
  secondary: string | null,
  generation = 6,
): MatchupResult {
  const result: MatchupResult = {
    x4: [],
    x2: [],
    x1: [],
    x05: [],
    x025: [],
    x0: []
  };

  const chart = getTypeChart(generation);
  const pLower = primary.toLowerCase();
  const sLower = secondary ? secondary.toLowerCase() : null;

  for (const attackType of getTypesForGeneration(generation)) {
    const mult1 = chart[pLower]?.[attackType] ?? 1;
    let mult2 = 1;
    if (sLower && sLower !== 'none' && sLower !== pLower) {
      mult2 = chart[sLower]?.[attackType] ?? 1;
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

/** Offensive multipliers against all types available in that generation. */
export function calculateDamageDealt(
  attacker: string,
  generation = 6,
): OffenseMatchupResult {
  const result: OffenseMatchupResult = {
    x2: [],
    x1: [],
    x05: [],
    x0: []
  };

  const chart = getTypeChart(generation);
  const aLower = attacker.toLowerCase();

  for (const defendingType of getTypesForGeneration(generation)) {
    const mult = chart[defendingType]?.[aLower] ?? 1;

    if (mult === 2) result.x2.push(defendingType);
    else if (mult === 1) result.x1.push(defendingType);
    else if (mult === 0.5) result.x05.push(defendingType);
    else if (mult === 0) result.x0.push(defendingType);
  }

  return result;
}
