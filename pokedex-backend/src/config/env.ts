const parseList = (value: string | undefined): string[] =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const configuredJwtSecret = process.env.JWT_SECRET?.trim() ?? '';

if (!configuredJwtSecret) {
  throw new Error(
    'JWT_SECRET is required. Set a strong random value (at least 32 characters) in the backend environment.'
  );
}

if (configuredJwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long.');
}

export const JWT_SECRET = configuredJwtSecret;
export const JWT_EXPIRES_IN = '7d';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const ADMIN_USERNAMES = new Set(parseList(process.env.ADMIN_USERNAMES));
export const ADMIN_EMAILS = new Set(parseList(process.env.ADMIN_EMAILS));

export const ALLOWED_ORIGINS = parseList(
  process.env.CORS_ORIGIN ??
    'http://localhost:5173,http://127.0.0.1:5173'
);

export const PORT = Number.parseInt(process.env.PORT ?? '3000', 10) || 3000;
