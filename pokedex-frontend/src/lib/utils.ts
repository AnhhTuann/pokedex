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
