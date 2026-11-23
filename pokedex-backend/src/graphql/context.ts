import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import { prisma } from '../db/prisma.js';
import { isAdminIdentity } from '../services/auth.service.js';

export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface GraphQLContext {
  user: AuthenticatedUser | null;
}

interface ContextArgs {
  req: Request;
}

export async function buildContext({ req }: ContextArgs): Promise<GraphQLContext> {
  const header = req.headers.authorization ?? '';
  if (!header.startsWith('Bearer ')) return { user: null };

  const token = header.slice('Bearer '.length).trim();
  if (!token) return { user: null };

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (
      typeof payload === 'string' ||
      payload === null ||
      !Number.isInteger(payload.userId)
    ) {
      return { user: null };
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as number },
      select: { id: true, username: true, email: true }
    });

    if (!user) return { user: null };

    return {
      user: { ...user, isAdmin: isAdminIdentity(user) }
    };
  } catch {
    // Expired, forged or malformed tokens are treated as anonymous.
    return { user: null };
  }
}

export function requireUser(context: GraphQLContext): AuthenticatedUser {
  if (!context?.user) {
    throw new Error('Bạn cần đăng nhập để thực hiện thao tác này.');
  }
  return context.user;
}

export function requireAdmin(context: GraphQLContext): AuthenticatedUser {
  const user = requireUser(context);
  if (!user.isAdmin) {
    throw new Error('Bạn không có quyền thực hiện thao tác này.');
  }
  return user;
}
