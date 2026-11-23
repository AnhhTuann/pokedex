export const MAX_PAGE_SIZE = 100;
export const MAX_POKEMON_PAGE_SIZE = 2000;

export function clampLimit(limit: unknown, fallback: number, max: number): number {
  const n = typeof limit === 'number' && Number.isFinite(limit) ? Math.floor(limit) : fallback;
  return Math.min(Math.max(n, 0), max);
}

export function clampOffset(offset: unknown): number {
  const n = typeof offset === 'number' && Number.isFinite(offset) ? Math.floor(offset) : 0;
  return Math.max(n, 0);
}
