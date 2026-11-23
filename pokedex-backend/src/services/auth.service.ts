import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import {
  ADMIN_EMAILS,
  ADMIN_USERNAMES,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from '../config/env.js';

interface AuthInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  username: string;
  password: string;
}

interface PublicIdentity {
  id: number;
  username: string;
  email: string;
}

const normalizeIdentifier = (value: string): string => value.trim().toLowerCase();

export const isAdminIdentity = (user: PublicIdentity): boolean =>
  ADMIN_USERNAMES.has(normalizeIdentifier(user.username)) ||
  ADMIN_EMAILS.has(normalizeIdentifier(user.email));

const toPublicUser = (user: PublicIdentity) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  isAdmin: isAdminIdentity(user),
});

const signToken = (userId: number): string =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const validateRegistration = ({ username, email, password }: AuthInput): void => {
  if (!username || username.trim().length < 3 || username.trim().length > 30) {
    throw new Error('Username must be between 3 and 30 characters');
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(username.trim())) {
    throw new Error('Username contains invalid characters');
  }
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new Error('Invalid email address');
  }
  if (!password || password.length < 8 || password.length > 128) {
    throw new Error('Password must be between 8 and 128 characters');
  }
};

export const authService = {
  async register(input: AuthInput) {
    validateRegistration(input);

    const username = input.username.trim();
    const email = input.email.trim();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      },
      select: { id: true }
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
      data: { username, email, passwordHash },
      select: { id: true, username: true, email: true }
    });

    return {
      token: signToken(user.id),
      user: toPublicUser(user)
    };
  },

  async login({ username, password }: LoginInput) {
    if (!username || !password) {
      throw new Error('Invalid username or password');
    }

    const user = await prisma.user.findFirst({
      where: { username: username.trim() },
      select: { id: true, username: true, email: true, passwordHash: true }
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      throw new Error('Invalid username or password');
    }

    return {
      token: signToken(user.id),
      user: toPublicUser(user)
    };
  },

  async me(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true }
    });

    return user ? toPublicUser(user) : null;
  }
};
