import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export interface PokeApiOptions {
  baseUrl: string;
  cacheDir: string;
  timeoutMs: number;
  retries: number;
  concurrency: number;
  enabled: boolean;
}

export interface ApiResult<T> {
  ok: boolean;
  data: T | null;
  fromCache: boolean;
  error?: string;
}

export const defaultPokeApiOptions: PokeApiOptions = {
  baseUrl: 'https://pokeapi.co/api/v2',
  cacheDir: 'audit/.cache/pokeapi',
  timeoutMs: 12_000,
  retries: 3,
  concurrency: 6,
  enabled: true,
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Runs work with a fixed maximum number of in-flight promises, preserving input order. */
export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  work: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  const limit = Math.max(1, Math.min(concurrency || 1, items.length || 1));
  let cursor = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await work(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

export class PokeApiClient {
  private active = 0;
  private readonly waiters: Array<() => void> = [];
  private readonly opts: PokeApiOptions;

  constructor(options: Partial<PokeApiOptions> = {}) {
    this.opts = { ...defaultPokeApiOptions, ...options };
    if (this.opts.enabled && !existsSync(this.opts.cacheDir)) {
      mkdirSync(this.opts.cacheDir, { recursive: true });
    }
  }

  private cachePath(path: string): string {
    const key = createHash('sha1').update(path).digest('hex');
    return join(this.opts.cacheDir, `${key}.json`);
  }

  private async limited<T>(work: () => Promise<T>): Promise<T> {
    const limit = Math.max(1, this.opts.concurrency);
    if (this.active >= limit) {
      await new Promise<void>((resolve) => this.waiters.push(resolve));
    }
    this.active += 1;
    try {
      return await work();
    } finally {
      this.active -= 1;
      this.waiters.shift()?.();
    }
  }

  private urlFor(path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${this.opts.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  async get<T = any>(path: string): Promise<ApiResult<T>> {
    const cachePath = this.cachePath(path);
    if (existsSync(cachePath)) {
      try {
        return { ok: true, data: JSON.parse(readFileSync(cachePath, 'utf8')) as T, fromCache: true };
      } catch {
        /* corrupt cache: refetch if API enabled */
      }
    }
    if (!this.opts.enabled) {
      return { ok: false, data: null, fromCache: false, error: 'API mode disabled; no cached response' };
    }
    return this.limited(async () => {
      let lastError = '';
      for (let attempt = 0; attempt < Math.max(1, this.opts.retries); attempt += 1) {
        try {
          const response = await fetch(this.urlFor(path), {
            signal: AbortSignal.timeout(this.opts.timeoutMs),
            headers: { Accept: 'application/json' },
          });
          if (response.ok) {
            const data = (await response.json()) as T;
            writeFileSync(cachePath, JSON.stringify(data));
            return { ok: true, data, fromCache: false } as ApiResult<T>;
          }
          lastError = `HTTP ${response.status}`;
          if (response.status === 429) {
            const retryAfter = Number(response.headers.get('retry-after'));
            await sleep(Number.isFinite(retryAfter) ? Math.min(retryAfter * 1000, 5000) : 1000);
            continue;
          }
          if (response.status >= 400 && response.status < 500) break;
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);
        }
        if (attempt + 1 < this.opts.retries) {
          await sleep(250 * 2 ** attempt);
        }
      }
      return { ok: false, data: null, fromCache: false, error: lastError };
    });
  }

  async listAll<T = any>(endpoint: string, limit = 2000): Promise<ApiResult<T[]>> {
    const result = await this.get<{ count: number; results: Array<{ name: string; url: string }> }>(
      `/${endpoint}?limit=${limit}`,
    );
    if (!result.ok || !result.data) {
      return { ok: false, data: null, fromCache: result.fromCache, error: result.error };
    }
    const items = result.data.results as T[];
    const complete = items.length >= result.data.count;
    return {
      ok: complete,
      data: items,
      fromCache: result.fromCache,
      error: complete ? undefined : `partial list ${items.length}/${result.data.count}`,
    };
  }
}
