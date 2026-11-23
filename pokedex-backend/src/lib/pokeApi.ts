const POKEAPI_TIMEOUT_MS = 8000;

/** External catalog lookups must never hold a GraphQL request open indefinitely. */
export function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, { signal: AbortSignal.timeout(POKEAPI_TIMEOUT_MS) });
}
