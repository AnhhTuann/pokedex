import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export interface CheckpointRecord {
  id: number;
  name: string;
  generation: number;
  varieties: string[];
  hasEvolutionChain: boolean;
  evolutionConditions: string[];
  flavorTextLanguages: string[];
  localNormalImages: string[];
  localShinyImages: string[];
  missingNormalImages: string[];
  missingShinyImages: string[];
  height: number;
  weight: number;
  baseExperience: number | null;
  stats: Record<string, number>;
  types: string[];
  abilities: Array<{ name: string; isHidden: boolean }>;
  varietyForms: Array<{
    name: string;
    apiId: number;
    stats: Record<string, number>;
    types: string[];
    gameIndexGames: string[];
    learnsetVersionGroups: string[];
  }>;
  /** Default-form game indices from /pokemon/{id}. */
  gameIndexGames: string[];
  /** Union of game indices across every variety, used for form availability. */
  formGameIndexGames: string[];
  encounterVersions: string[];
  learnsetVersionGroups: string[];
  learnsetMoveSlots: number;
  learnsetByVersionGroup: Record<string, {
    total: number;
    levelUp: number;
    machine: number;
    tutor: number;
    egg: number;
  }>;
  errors: string[];
}

export interface CheckpointState {
  version: 1;
  key: string;
  updatedAt: string;
  completedIds: number[];
  records: Record<string, CheckpointRecord>;
  failed: Record<string, string>;
}

const empty = (key: string): CheckpointState => ({
  version: 1,
  key,
  updatedAt: new Date().toISOString(),
  completedIds: [],
  records: {},
  failed: {},
});

export const catalogKey = (ids: number[]): string =>
  createHash('sha256')
    .update([...ids].sort((a, b) => a - b).join(','))
    .digest('hex')
    .slice(0, 16);

export function checkpointPath(cacheDir: string, key: string): string {
  return join(cacheDir, 'checkpoints', `${key}.json`);
}

export function loadCheckpoint(path: string, key: string, resume: boolean): CheckpointState {
  if (!resume || !existsSync(path)) return empty(key);
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf8')) as CheckpointState;
    if (parsed.version !== 1 || parsed.key !== key) return empty(key);
    const records = Object.fromEntries(
      Object.entries(parsed.records ?? {}).filter(([, record]) =>
        Array.isArray((record as CheckpointRecord).gameIndexGames) &&
        Array.isArray((record as CheckpointRecord).formGameIndexGames) &&
        typeof (record as CheckpointRecord).learnsetMoveSlots === 'number' &&
        Boolean((record as CheckpointRecord).learnsetByVersionGroup),
      ),
    ) as Record<string, CheckpointRecord>;
    return {
      ...empty(key),
      ...parsed,
      completedIds: [...new Set(parsed.completedIds ?? [])]
        .filter((id) => Boolean(records[String(id)]))
        .sort((a, b) => a - b),
      records,
      failed: parsed.failed ?? {},
    };
  } catch {
    return empty(key);
  }
}

export function saveCheckpoint(path: string, state: CheckpointState): void {
  mkdirSync(dirname(path), { recursive: true });
  const next = { ...state, updatedAt: new Date().toISOString() };
  const temp = `${path}.tmp`;
  writeFileSync(temp, `${JSON.stringify(next, null, 2)}\n`);
  renameSync(temp, path);
}
