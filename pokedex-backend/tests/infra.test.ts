import test from 'node:test';
import assert from 'node:assert/strict';
import { BoundedCache } from '../src/lib/boundedCache.js';
import { MAX_PAGE_SIZE, clampLimit, clampOffset } from '../src/lib/pagination.js';
import { createRateLimiter } from '../src/lib/rateLimit.js';

test('BoundedCache evicts least recently used entries', () => {
  const cache = new BoundedCache<string, number>(2);
  cache.set('a', 1);
  cache.set('b', 2);
  assert.equal(cache.get('a'), 1);
  cache.set('c', 3);
  assert.equal(cache.get('b'), undefined);
  assert.equal(cache.get('a'), 1);
  assert.equal(cache.get('c'), 3);
});

test('pagination clamps attacker-controlled limits and offsets', () => {
  assert.equal(clampLimit(undefined, 20, MAX_PAGE_SIZE), 20);
  assert.equal(clampLimit(-5, 20, MAX_PAGE_SIZE), 0);
  assert.equal(clampLimit(1_000_000, 20, MAX_PAGE_SIZE), MAX_PAGE_SIZE);
  assert.equal(clampLimit(50, 20, MAX_PAGE_SIZE), 50);
  assert.equal(clampOffset(-10), 0);
  assert.equal(clampOffset(undefined), 0);
  assert.equal(clampOffset(40), 40);
});

test('rate limiter blocks attempts beyond the configured maximum', () => {
  const limiter = createRateLimiter({ windowMs: 60_000, max: 2 });
  limiter('1.2.3.4');
  limiter('1.2.3.4');
  limiter('5.6.7.8');
  assert.throws(() => limiter('1.2.3.4'), /Too many requests/);
});

test('fetchWithTimeout always supplies an abort signal', async () => {
  const { fetchWithTimeout } = await import('../src/lib/pokeApi.js');
  const originalFetch = globalThis.fetch;
  let signal: AbortSignal | undefined;
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    signal = init?.signal as AbortSignal | undefined;
    return new Response('{}', { status: 200 });
  }) as typeof fetch;
  try {
    await fetchWithTimeout('https://pokeapi.co/api/v2/pokemon/25');
    assert.ok(signal instanceof AbortSignal);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
