const configuredGraphqlUrl = import.meta.env.VITE_GRAPHQL_API_URL?.trim();
const configuredAssetBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

// In development Vite proxies /graphql and /images to the local backend.
// In production a relative URL only works when the host proxies those paths;
// otherwise VITE_GRAPHQL_API_URL must be set to the backend's public URL.
export const GRAPHQL_ENDPOINT =
  configuredGraphqlUrl ||
  (import.meta.env.DEV ? 'http://localhost:3000/graphql' : '/graphql');

const derivedAssetBaseUrl = (() => {
  if (configuredAssetBaseUrl) return configuredAssetBaseUrl.replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(GRAPHQL_ENDPOINT)) return '';
  try {
    return new URL(GRAPHQL_ENDPOINT).origin;
  } catch {
    return '';
  }
})();

export const API_BASE_URL = derivedAssetBaseUrl;

export function assetUrl(path?: string | null): string {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${suffix}`;
}
