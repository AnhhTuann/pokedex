import { getReferenceCatalog } from './catalog/graphql.js';
import 'dotenv/config';
import path from 'node:path';
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
// @ts-ignore
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { prisma } from './db/prisma.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { DownloadSessionStore } from './lib/downloadSessions.js';
import {
  assertServerConfig,
  getAllowedCorsOrigins,
  getJwtSecret,
  readBearerToken,
  verifyAccessToken,
} from './lib/security.js';

const downloadSessions = new DownloadSessionStore();

async function startServer() {
  assertServerConfig();
  getReferenceCatalog();

  const app = express();
  app.disable('x-powered-by');
  const PORT = Number(process.env.PORT) || 3000;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
  });

  await apolloServer.start();
  console.log('Apollo Server started');

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
  app.use(express.json({ limit: '1mb' }));
  app.use(cors({ origin: getAllowedCorsOrigins(), credentials: false }));

  // Serve static images downloaded from PokeAPI
  app.use('/images', express.static(path.resolve(process.cwd(), 'public/images')));

  app.get('/api/ping', (_req: Request, res: Response) =>
    res.send('pong from Prisma backend!'),
  );

  app.post('/api/download-session', (req: Request, res: Response) => {
    try {
      const token = downloadSessions.create(req.body ?? {});
      res.json({ token });
    } catch (err) {
      res.status(400).send(err instanceof Error ? err.message : 'Invalid download session');
    }
  });

  app.get('/api/download', (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).send('Missing download token');
    }

    const session = downloadSessions.take(token);
    if (!session) {
      return res.status(410).send('Download link expired or invalid');
    }

    res.setHeader('Content-Type', session.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${session.filename}"`);
    res.send(session.data);
  });

  app.use('/graphql', expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      const token = readBearerToken(req.headers.authorization);
      const user = token ? verifyAccessToken(token, getJwtSecret()) : null;
      return { user, ip: req.ip };
    },
  }));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
