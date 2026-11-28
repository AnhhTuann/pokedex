import { clsx, type ClassValue } from 'clsx';
import type { CSSProperties } from 'react';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Formats a species ID into a 4-digit string prefixed with '#'
 * e.g., 6 -> "#0006", 25 -> "#0025"
 */
export function formatSpeciesId(speciesId?: number | null): string {
  if (speciesId === undefined || speciesId === null) return "";
  return `#${speciesId.toString().padStart(4, "0")}`;
}

export type TypeToken = {
  accent: string;
  ink: string;
  softDark: string;
  softLight: string;
  borderDark: string;
  borderLight: string;
};

export const TYPE_TOKENS: Record<string, TypeToken> = {
  normal:   { accent: '#C7C5BC', ink: '#41414A', softDark: '#2A2C32', softLight: '#F0EFEB', borderDark: '#4A4D55', borderLight: '#D8D6CF' },
  fire:     { accent: '#F4A183', ink: '#783B2B', softDark: '#3A2822', softLight: '#FCEEE8', borderDark: '#6A4538', borderLight: '#F0C4B3' },
  water:    { accent: '#90C5EE', ink: '#244D72', softDark: '#1F2D3A', softLight: '#EAF4FC', borderDark: '#3D5A73', borderLight: '#BDD9EF' },
  electric: { accent: '#F5DC85', ink: '#665016', softDark: '#35301C', softLight: '#FDF8E3', borderDark: '#6B6030', borderLight: '#E8D48A' },
  grass:    { accent: '#9BCFA0', ink: '#194A35', softDark: '#1E3026', softLight: '#EAF6EC', borderDark: '#3A5C44', borderLight: '#B8DBC0' },
  ice:      { accent: '#ADE3E7', ink: '#24576B', softDark: '#1E3236', softLight: '#E8F8FA', borderDark: '#3A636B', borderLight: '#BCE3E8' },
  fighting: { accent: '#D88A87', ink: '#71352C', softDark: '#352322', softLight: '#FBEAEA', borderDark: '#654340', borderLight: '#E4B8B5' },
  poison:   { accent: '#C3A1E1', ink: '#49336D', softDark: '#2D2638', softLight: '#F3EDF9', borderDark: '#574A6B', borderLight: '#D4C0E8' },
  ground:   { accent: '#D8B98B', ink: '#65482C', softDark: '#332C20', softLight: '#F8F1E4', borderDark: '#63563A', borderLight: '#E0CCA8' },
  flying:   { accent: '#B8B8EF', ink: '#31557A', softDark: '#26283A', softLight: '#EEEEFC', borderDark: '#4D5070', borderLight: '#CACAEE' },
  psychic:  { accent: '#EBA6C8', ink: '#74344F', softDark: '#36242D', softLight: '#FCEEF4', borderDark: '#684658', borderLight: '#EEC0D6' },
  bug:      { accent: '#C1D38B', ink: '#435A24', softDark: '#29301E', softLight: '#F3F8E6', borderDark: '#526038', borderLight: '#D0DEA6' },
  rock:     { accent: '#CBB98D', ink: '#4F4B43', softDark: '#302D26', softLight: '#F5F2E8', borderDark: '#5E5848', borderLight: '#DDD0B0' },
  ghost:    { accent: '#AFA1D7', ink: '#4B3B68', softDark: '#292536', softLight: '#F0EDF8', borderDark: '#524A68', borderLight: '#C9C0E2' },
  dragon:   { accent: '#9DA9E8', ink: '#43346F', softDark: '#25283A', softLight: '#EDF0FC', borderDark: '#4A5070', borderLight: '#BCC4EC' },
  dark:     { accent: '#99909F', ink: '#39364C', softDark: '#28262E', softLight: '#F0EFF3', borderDark: '#504C5A', borderLight: '#C4C0CC' },
  steel:    { accent: '#B9C9D3', ink: '#394B60', softDark: '#252C32', softLight: '#EFF4F7', borderDark: '#4A5964', borderLight: '#CCD8E0' },
  fairy:    { accent: '#F0B9D8', ink: '#713B58', softDark: '#362530', softLight: '#FCEEF6', borderDark: '#68485C', borderLight: '#EEC8DE' },
};

// Backward-compatible flat color map (accent/fill)
export const TYPE_COLORS: Record<string, string> = Object.fromEntries(
  Object.entries(TYPE_TOKENS).map(([k, v]) => [k, v.accent])
);

export function getTypeBadgeColor(type: string): string {
  return TYPE_TOKENS[type.toLowerCase()]?.accent || '#C7C5BC';
}

export function getTypeForeground(type: string): string {
  return TYPE_TOKENS[type.toLowerCase()]?.ink || '#41414A';
}

export function getTypeBadgeStyle(type: string, isDark = false): CSSProperties {
  const t = TYPE_TOKENS[type.toLowerCase()] || TYPE_TOKENS.normal;
  return {
    backgroundColor: t.accent,
    color: t.ink,
    border: `1px solid ${isDark ? t.borderDark : t.borderLight}`,
  };
}

export function getTypeSoftStyle(type: string, isDark = false): CSSProperties {
  const t = TYPE_TOKENS[type.toLowerCase()] || TYPE_TOKENS.normal;
  return {
    backgroundColor: isDark ? t.softDark : t.softLight,
    color: isDark ? t.accent : t.ink,
    border: `1px solid ${isDark ? t.borderDark : t.borderLight}`,
  };
}

export const STAT_COLORS = [
  '#4F8FD6', // HP
  '#D85C6A', // ATK
  '#D97706', // DEF
  '#8B7CF6', // SP.ATK
  '#3FA97A', // SP.DEF
  '#E08A5D', // SPEED
];

/**
 * Capitalizes a dash-separated slug (e.g. "leaf-green" -> "Leaf Green")
 */
export function capitalizeSlug(slug: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
