import { getReferenceCatalog } from './catalog/graphql.js';
import 'dotenv/config';
import path from 'node:path';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
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

export async function startServer(port = Number(process.env.PORT) || 3000, host = '0.0.0.0') {
  assertServerConfig();
  getReferenceCatalog();

  const app = express();
  app.disable('x-powered-by');
  const httpServer = createServer(app);
  const downloadSessions = new DownloadSessionStore();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // Preserve the Apollo 4 HTTP status for GraphQL variable coercion errors.
    status400ForVariableCoercionErrors: false,
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

  try {
    await once(httpServer.listen(port, host), 'listening');
  } catch (error) {
    await apolloServer.stop();
    throw error;
  }
  return { httpServer, apolloServer };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer().then(({ httpServer }) => {
    console.log('Backend server listening', httpServer.address());
  }).catch(async error => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
}
