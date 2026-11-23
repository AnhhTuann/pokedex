import 'dotenv/config';
import crypto from 'node:crypto';
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
// @ts-ignore
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { prisma } from './db/prisma.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { buildContext } from './graphql/context.js';
import { ALLOWED_ORIGINS, IS_PRODUCTION, PORT } from './config/env.js';

interface DownloadSession {
  filename: string;
  mimeType: string;
  data: Buffer;
}

const downloadSessions = new Map<string, DownloadSession>();
const MAX_DOWNLOAD_SESSIONS = 100;
const DOWNLOAD_TTL_MS = 60_000;
const MAX_DOWNLOAD_BYTES = 2 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'application/json',
  'application/octet-stream',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/csv',
  'text/plain',
]);

const safeFilename = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const cleaned = value
    .split(/[\\/]/)
    .pop()
    ?.replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/^\.+/, '')
    .slice(0, 120);
  return cleaned || null;
};

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: !IS_PRODUCTION,
  });

  await apolloServer.start();
  console.log('Apollo Server started with Refactored Architecture');

  const corsOrigin = ALLOWED_ORIGINS.length
    ? (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin.toLowerCase())) {
          callback(null, true);
          return;
        }
        callback(new Error('Origin not allowed by CORS'));
      }
    : false;

  app.use(cors({ origin: corsOrigin }));
  app.use(express.json({ limit: '2mb' }));

  // Serve static images downloaded from PokeAPI
  app.use('/images', express.static('public/images'));

  app.get('/api/ping', (_req: Request, res: Response) =>
    res.send('pong from Prisma backend!')
  );

  app.post('/api/download-session', (req: Request, res: Response) => {
    const { filename, mimeType, content, isBase64 } = req.body ?? {};
    const safeName = safeFilename(filename);
    const safeMimeType = typeof mimeType === 'string' ? mimeType.toLowerCase() : '';

    if (
      !safeName ||
      !ALLOWED_MIME_TYPES.has(safeMimeType) ||
      typeof content !== 'string' ||
      content.length === 0
    ) {
      return res.status(400).send('Invalid download payload');
    }

    try {
      const data = isBase64
        ? Buffer.from(content, 'base64')
        : Buffer.from(content, 'utf-8');

      if (data.length === 0 || data.length > MAX_DOWNLOAD_BYTES) {
        return res.status(413).send('Download payload too large');
      }

      if (downloadSessions.size >= MAX_DOWNLOAD_SESSIONS) {
        return res.status(429).send('Too many active download sessions');
      }

      const token = crypto.randomBytes(24).toString('hex');
      downloadSessions.set(token, { filename: safeName, mimeType: safeMimeType, data });

      setTimeout(() => {
        downloadSessions.delete(token);
      }, DOWNLOAD_TTL_MS).unref();

      return res.json({ token });
    } catch (err) {
      console.error('Error generating download session:', err);
      return res.status(500).send('Server error');
    }
  });

  app.get('/api/download', (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).send('Missing download token');
    }

    const session = downloadSessions.get(token);
    if (!session) {
      return res.status(410).send('Download link expired or invalid');
    }

    downloadSessions.delete(token);
    res.setHeader('Content-Type', session.mimeType);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${session.filename}"`
    );
    return res.send(session.data);
  });

  app.use('/graphql', expressMiddleware(apolloServer, { context: buildContext }));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
