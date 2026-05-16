import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a species ID into a 4-digit string prefixed with '#'
 * e.g., 6 -> "#0006", 25 -> "#0025"
 */
export function formatSpeciesId(speciesId?: number | null): string {
  if (speciesId === undefined || speciesId === null) return "";
  return `#${speciesId.toString().padStart(4, "0")}`;
}

export const TYPE_COLORS: Record<string, string> = {
  normal: '#9ca3af',
  fire: '#ef4444',
  water: '#3b82f6',
  electric: '#eab308',
  grass: '#22c55e',
  ice: '#06b6d4',
  fighting: '#f97316',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#818cf8',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#78716c',
  ghost: '#7c3aed',
  dragon: '#6366f1',
  dark: '#374151',
  steel: '#64748b',
  fairy: '#f472b6',
};

export const STAT_COLORS = [
  '#6366f1', // HP
  '#ef4444', // ATK
  '#3b82f6', // DEF
  '#a855f7', // SP.ATK
  '#22c55e', // SP.DEF
  '#f59e0b', // SPEED
];
