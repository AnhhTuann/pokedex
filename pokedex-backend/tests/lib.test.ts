import { describe, expect, it } from 'vitest';
import { defensiveMatchups } from '../src/lib/typeMatchups.js';
import { clampLimit, clampOffset, MAX_PAGE_SIZE } from '../src/lib/pagination.js';
import { BoundedCache } from '../src/lib/boundedCache.js';
import { idFromResourceUrl, parseGeneration } from '../src/lib/pokeApi.js';

const multiplier = (types: string[], attack: string) =>
  defensiveMatchups(types).find((m) => m.type === attack)?.multiplier ?? 1;

describe('defensiveMatchups', () => {
  it('computes single-type weaknesses and resistances', () => {
    expect(multiplier(['fire'], 'water')).toBe(2);
    expect(multiplier(['fire'], 'grass')).toBe(0.5);
    expect(multiplier(['normal'], 'ghost')).toBe(0);
  });

  it('combines dual types', () => {
    expect(multiplier(['grass', 'poison'], 'psychic')).toBe(2);
    expect(multiplier(['grass', 'poison'], 'grass')).toBe(0.25);
    expect(multiplier(['bug', 'steel'], 'fire')).toBe(4);
    expect(multiplier(['water', 'ground'], 'electric')).toBe(0);
  });

  it('omits neutral matchups', () => {
    expect(defensiveMatchups(['normal']).every((m) => m.multiplier !== 1)).toBe(true);
  });
});

describe('pagination', () => {
  it('clamps limits', () => {
    expect(clampLimit(undefined, 20, MAX_PAGE_SIZE)).toBe(20);
    expect(clampLimit(-5, 20, MAX_PAGE_SIZE)).toBe(0);
    expect(clampLimit(1_000_000, 20, MAX_PAGE_SIZE)).toBe(MAX_PAGE_SIZE);
    expect(clampLimit(10, 20, MAX_PAGE_SIZE)).toBe(10);
  });

  it('clamps offsets', () => {
    expect(clampOffset(-1)).toBe(0);
    expect(clampOffset(undefined)).toBe(0);
    expect(clampOffset(40)).toBe(40);
  });
});

describe('BoundedCache', () => {
  it('evicts least recently used entries', () => {
    const cache = new BoundedCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a');
    cache.set('c', 3);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBe(3);
  });
});

describe('pokeApi helpers', () => {
  it('parses resource ids and generations', () => {
    expect(idFromResourceUrl('https://pokeapi.co/api/v2/pokemon-species/25/')).toBe(25);
    expect(parseGeneration('generation-iv')).toBe(4);
    expect(parseGeneration(undefined)).toBeNull();
  });
});
