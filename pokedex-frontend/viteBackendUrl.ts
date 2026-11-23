const DEFAULT_BACKEND_URL = 'http://localhost:3000';

/** Resolves the dev proxy target from Vite-loaded .env values or the shell. */
export function resolveBackendUrl(
  env: Record<string, string | undefined>,
): string {
  return env.VITE_BACKEND_URL?.trim() || DEFAULT_BACKEND_URL;
}
