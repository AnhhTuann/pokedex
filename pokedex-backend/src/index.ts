import { config } from './lib/config.js';
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
// @ts-ignore
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { prisma } from './db/prisma.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { GraphQLContext, verifyToken } from './lib/auth.js';

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);

  const apolloServer = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: !config.isProduction,
  });

  await apolloServer.start();

  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json({ limit: '2mb' }));

  app.use('/images', express.static('public/images', { maxAge: '30d', immutable: true }));

  app.get('/api/ping', (_req: Request, res: Response) => {
    res.send('pong from Prisma backend!');
  });

  app.use('/graphql', expressMiddleware(apolloServer, {
    context: async ({ req }: { req: Request }): Promise<GraphQLContext> => ({
      user: verifyToken(req.headers.authorization),
      ip: req.ip || 'unknown',
    }),
  }));

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`🚀 Backend Server running on http://localhost:${config.port}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${config.port}/graphql`);
  });
}

startServer().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
