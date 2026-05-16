import 'dotenv/config';
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
// @ts-ignore
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { prisma } from './db/prisma.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

const downloadSessions = new Map<string, { filename: string; mimeType: string; data: Buffer }>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  console.log("Apollo Server started with Refactored Architecture");

  app.use(express.json({ limit: '50mb' }));
  app.use(cors());

  app.get('/api/ping', (req: Request, res: Response) => res.send('pong from Prisma backend!'));

  app.post('/api/download-session', (req: Request, res: Response) => {
    const { filename, mimeType, content, isBase64 } = req.body;
    if (!filename || !mimeType || content === undefined) {
      return res.status(400).send('Missing required fields');
    }

    try {
      let data: Buffer;
      if (isBase64) {
        data = Buffer.from(content, 'base64');
      } else {
        data = Buffer.from(content, 'utf-8');
      }

      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      downloadSessions.set(token, { filename, mimeType, data });

      setTimeout(() => {
        downloadSessions.delete(token);
      }, 60000);

      res.json({ token });
    } catch (err) {
      console.error('Error generating download session:', err);
      res.status(500).send('Server error');
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

    res.setHeader('Content-Type', session.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${session.filename}"`);
    res.send(session.data);

    downloadSessions.delete(token);
  });

  app.use('/graphql', expressMiddleware(apolloServer));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
