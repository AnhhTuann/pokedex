import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';

export const MIN_JWT_SECRET_LENGTH = 32;

export interface AuthenticatedUser {
  userId: number;
}

export interface GraphQLContext {
  user?: AuthenticatedUser | null;
}

/** Requires an explicitly configured signing secret; no predictable fallback. */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret || secret.length < MIN_JWT_SECRET_LENGTH) {
    throw new Error(
      `JWT_SECRET must be configured with at least ${MIN_JWT_SECRET_LENGTH} characters`
    );
  }
  return secret;
}

/** Fail fast at startup rather than accepting a broken runtime configuration. */
export function assertServerConfig(): void {
  getJwtSecret();
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error('DATABASE_URL must be configured');
  }
}

/** Accepts only the `Bearer <token>` form, case-insensitively. */
export function readBearerToken(header?: string): string | null {
  if (!header) return null;
  const match = /^Bearer\s+(\S+)$/i.exec(header.trim());
  return match ? match[1] : null;
}

/** Validates both the signature and the shape of our own token claims. */
export function verifyAccessToken(token: string, secret: string): AuthenticatedUser | null {
  try {
    const payload = jwt.verify(token, secret, { algorithms: ['HS256'] });
    if (typeof payload === 'string') return null;
    const userId = payload.userId;
    if (!Number.isInteger(userId) || (userId as number) <= 0) return null;
    return { userId: userId as number };
  } catch {
    return null;
  }
}

export function requireUser(context?: GraphQLContext | null): number {
  const userId = context?.user?.userId;
  if (!Number.isInteger(userId) || (userId as number) <= 0) {
    throw new Error('Authentication required');
  }
  return userId as number;
}

export function isAdminRole(role: unknown): boolean {
  return role === 'ADMIN';
}

/**
 * Privilege is always read from the database. No frontend value, token claim or
 * default account can grant access. If the role migration has not been applied
 * this throws (fail closed) and the operator must apply the reviewed SQL.
 */
export async function requireAdmin(context?: GraphQLContext | null): Promise<number> {
  const userId = requireUser(context);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (!user || !isAdminRole(user.role)) {
    throw new Error('Admin access required');
  }
  return userId;
}

/** Defaults to the local Vite dev origin; production should set CORS_ORIGIN. */
export function getAllowedCorsOrigins(raw?: string): string[] {
  const configured = (raw ?? process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);
  return configured.length > 0 ? Array.from(new Set(configured)) : ['http://localhost:5173'];
}
