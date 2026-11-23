import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { config } from './config.js';

export interface AuthUser {
  userId: number;
  role: string;
}

export interface GraphQLContext {
  user: AuthUser | null;
  ip: string;
}

export function signToken(user: { id: number; role: string }): string {
  return jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as jwt.SignOptions);
}

export function verifyToken(authorization: string | undefined): AuthUser | null {
  if (!authorization?.startsWith('Bearer ')) return null;
  try {
    const payload = jwt.verify(authorization.slice('Bearer '.length), config.jwtSecret) as jwt.JwtPayload;
    if (typeof payload.userId !== 'number') return null;
    return { userId: payload.userId, role: typeof payload.role === 'string' ? payload.role : 'user' };
  } catch {
    return null;
  }
}

export function requireUser(context: GraphQLContext): AuthUser {
  if (!context.user) {
    throw new GraphQLError('You must be logged in.', { extensions: { code: 'UNAUTHENTICATED' } });
  }
  return context.user;
}

export function requireAdmin(context: GraphQLContext): AuthUser {
  const user = requireUser(context);
  if (user.role !== 'admin') {
    throw new GraphQLError('Admin permission required.', { extensions: { code: 'FORBIDDEN' } });
  }
  return user;
}
