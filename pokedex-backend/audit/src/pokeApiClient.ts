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

export class PokeApiClient {
  private tail: Promise<unknown> = Promise.resolve();
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
    const run = this.tail.then(work, work);
    this.tail = run.catch(() => undefined);
    return run;
  }

  async get<T = any>(path: string): Promise<ApiResult<T>> {
    const cachePath = this.cachePath(path);
    if (existsSync(cachePath)) {
      try {
        return { ok: true, data: JSON.parse(readFileSync(cachePath, 'utf8')) as T, fromCache: true };
      } catch {
        /* corrupt cache: refetch */
      }
    }
    if (!this.opts.enabled) {
      return { ok: false, data: null, fromCache: false, error: 'API mode disabled' };
    }
    return this.limited(async () => {
      let lastError = '';
      for (let attempt = 0; attempt < this.opts.retries; attempt += 1) {
        try {
          const response = await fetch(`${this.opts.baseUrl}${path}`, {
            signal: AbortSignal.timeout(this.opts.timeoutMs),
            headers: { Accept: 'application/json' },
          });
          if (!response.ok) {
            lastError = `HTTP ${response.status}`;
            if (response.status >= 400 && response.status < 500) break;
          } else {
            const data = (await response.json()) as T;
            writeFileSync(cachePath, JSON.stringify(data));
            return { ok: true, data, fromCache: false } as ApiResult<T>;
          }
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);
        }
        if (attempt + 1 < this.opts.retries) {
          await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
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
    return {
      ok: items.length >= result.data.count,
      data: items,
      fromCache: result.fromCache,
      error: items.length >= result.data.count ? undefined : `partial list ${items.length}/${result.data.count}`,
    };
  }
}
