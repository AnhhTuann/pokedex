export const TYPE_LIST = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy'
];

export type TypeChart = Record<string, Record<string, number>>;

/** Defense rows: TYPE_CHART[defender][attacker]. Modern (Gen 6+) chart. */
export const TYPE_CHART: TypeChart = {
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

const cloneChart = (chart: TypeChart): TypeChart =>
  Object.fromEntries(Object.entries(chart).map(([defender, row]) => [defender, { ...row }]));

function withoutTypes(chart: TypeChart, removed: string[]): TypeChart {
  const result = cloneChart(chart);
  for (const type of removed) {
    delete result[type];
    for (const row of Object.values(result)) delete row[type];
  }
  return result;
}

/** Gen 2-5: no Fairy; Steel still resists Ghost and Dark. */
export const GEN2_TO_5_TYPE_CHART: TypeChart = (() => {
  const chart = withoutTypes(TYPE_CHART, ['fairy']);
  chart.steel.ghost = 0.5;
  chart.steel.dark = 0.5;
  return chart;
})();

/** Gen 1: no Dark/Steel/Fairy, Ghost immune to Psychic, Bug/Poison mutual 2x, Ice neutral vs Fire. */
export const GEN1_TYPE_CHART: TypeChart = (() => {
  const chart = withoutTypes(GEN2_TO_5_TYPE_CHART, ['dark', 'steel']);
  chart.psychic.ghost = 0;
  chart.poison.bug = 2;
  chart.bug.poison = 2;
  delete chart.fire.ice;
  return chart;
})();

/** Defaults to modern rules so existing callers keep their current behavior. */
export function getTypeChart(generation = 6): TypeChart {
  if (generation <= 1) return GEN1_TYPE_CHART;
  if (generation <= 5) return GEN2_TO_5_TYPE_CHART;
  return TYPE_CHART;
}

export function getTypesForGeneration(generation = 6): string[] {
  if (generation <= 1) return TYPE_LIST.slice(0, 15);
  if (generation <= 5) return TYPE_LIST.slice(0, 17);
  return TYPE_LIST;
}

export function getTypeMultiplier(attackType: string, defenderType: string, generation = 6): number {
  return getTypeChart(generation)[defenderType.toLowerCase()]?.[attackType.toLowerCase()] ?? 1;
}

export function defensiveMatchups(
  types: string[],
  generation = 6,
): { type: string; multiplier: number }[] {
  const defending = Array.from(new Set(types.map((t) => t.toLowerCase())));
  const chart = getTypeChart(generation);
  const attackTypes = getTypesForGeneration(generation);
  return attackTypes.map((attackType) => ({
    type: attackType,
    multiplier: defending.reduce((acc, def) => acc * (chart[def]?.[attackType] ?? 1), 1),
  })).filter((m) => m.multiplier !== 1);
}
