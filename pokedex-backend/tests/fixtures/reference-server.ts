import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { referencePokemonFields, referenceQueries } from '../../src/catalog/graphql.js';
import { typeDefs } from '../../src/graphql/typeDefs.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: { ...referenceQueries, me: () => null },
    ReferencePokemon: referencePokemonFields,
  },
});
await server.start();
const app = express();
app.use('/images', express.static('public/images'));
app.use('/graphql', express.json({ limit: '64kb' }), expressMiddleware(server));
const listener = app.listen(Number(process.env.PHASE9C_PORT || 3199), '127.0.0.1', () => console.log('Reference fixture listening'));
process.once('SIGTERM', () => listener.close(() => { void server.stop(); }));
