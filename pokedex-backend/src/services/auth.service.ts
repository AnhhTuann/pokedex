import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import { getJwtSecret, isAdminRole } from '../lib/security.js';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  username: string;
  password: string;
}

interface PublicUser {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

const USER_FIELDS = {
  id: true,
  username: true,
  email: true,
  role: true,
} as const;

const toPublicUser = (user: {
  id: number;
  username: string;
  email: string;
  role: unknown;
}): PublicUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  isAdmin: isAdminRole(user.role),
});

function signToken(userId: number): string {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
}

export const authService = {
  async register({ username, email, password }: RegisterInput) {
    const cleanUsername = typeof username === 'string' ? username.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
      throw new Error('Username must be between 3 and 30 characters');
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
      throw new Error('Username contains invalid characters');
    }
    if (cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      throw new Error('A valid email is required');
    }
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
      throw new Error('Password must be between 8 and 128 characters');
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: cleanEmail }, { username: cleanUsername }] },
      select: { id: true },
    });
    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username: cleanUsername, email: cleanEmail, passwordHash },
      select: USER_FIELDS,
    });

    return { token: signToken(user.id), user: toPublicUser(user) };
  },

  async login({ username, password }: LoginInput) {
    const cleanUsername = typeof username === 'string' ? username.trim() : '';
    if (!cleanUsername || typeof password !== 'string') {
      throw new Error('Invalid username or password');
    }

    const user = await prisma.user.findUnique({
      where: { username: cleanUsername },
      select: { id: true, username: true, email: true, passwordHash: true, role: true },
    });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid username or password');
    }

    return { token: signToken(user.id), user: toPublicUser(user) };
  },

  async me(userId: number): Promise<PublicUser | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: USER_FIELDS,
    });
    return user ? toPublicUser(user) : null;
  },
};
