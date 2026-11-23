import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { prisma } from '../db/prisma.js';
import { signToken } from '../lib/auth.js';

const USERNAME_RE = /^[a-zA-Z0-9_]{3,30}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

function badInput(message: string): never {
  throw new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } });
}

export function validateRegistration({ username, email, password }: { username: string; email: string; password: string }) {
  if (!USERNAME_RE.test(username)) badInput('Username must be 3-30 characters: letters, numbers or underscore.');
  if (email.length > 254 || !EMAIL_RE.test(email)) badInput('Invalid email address.');
  if (password.length < MIN_PASSWORD_LENGTH) badInput(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  if (password.length > MAX_PASSWORD_LENGTH) badInput(`Password must be at most ${MAX_PASSWORD_LENGTH} characters.`);
}

const toPublicUser = (user: { id: number; username: string; email: string; role: string }) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
});

export const authService = {
  async register(input: { username: string; email: string; password: string }) {
    const username = input.username.trim();
    const email = input.email.trim().toLowerCase();
    validateRegistration({ username, email, password: input.password });

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) badInput('User with this email or username already exists');

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({ data: { username, email, passwordHash } });

    return { token: signToken(user), user: toPublicUser(user) };
  },

  async login({ username, password }: { username: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { username: username.trim() } });
    const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!user || !valid) {
      throw new GraphQLError('Invalid username or password', { extensions: { code: 'UNAUTHENTICATED' } });
    }
    return { token: signToken(user), user: toPublicUser(user) };
  },

  async me(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user ? toPublicUser(user) : null;
  },
};
