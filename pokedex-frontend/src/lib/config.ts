export const GRAPHQL_URL: string = import.meta.env.VITE_GRAPHQL_API_URL || '/graphql';

export const API_BASE_URL = GRAPHQL_URL.replace(/\/graphql\/?$/, '');

export function resolveAssetUrl(url: string | null | undefined): string | null | undefined {
  if (url && url.startsWith('/images/')) return `${API_BASE_URL}${url}`;
  return url;
}
