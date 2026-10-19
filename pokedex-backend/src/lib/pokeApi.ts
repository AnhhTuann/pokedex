const POKEAPI_TIMEOUT_MS = 8000;

export async function fetchPokeApi<T = any>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(POKEAPI_TIMEOUT_MS) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error(`PokéAPI request failed: ${url}`, err);
    return null;
  }
}

export function idFromResourceUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export function parseGeneration(genName: string | undefined): number | null {
  const match = genName?.match(/generation-([ivx]+)/i);
  if (!match) return null;
  const map: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9 };
  return map[match[1].toLowerCase()] || null;
}

export function cleanText(text: string | undefined | null): string | null {
  if (!text) return null;
  return text.replace(/[\n\f\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, { signal: AbortSignal.timeout(POKEAPI_TIMEOUT_MS) });
}
