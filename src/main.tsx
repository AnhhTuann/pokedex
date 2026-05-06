import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MyPokedexProvider } from './lib/MyPokedexContext';
import { ThemeProvider } from './lib/ThemeContext';
import App from './App.tsx';
import './index.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemonList: {
            keyArgs: ["search", "type", "ids"],
            merge(existing, incoming, { args }) {
              const offset = args?.offset || 0;
              const merged = existing ? existing.results.slice(0) : [];
              for (let i = 0; i < incoming.results.length; ++i) {
                merged[offset + i] = incoming.results[i];
              }
              return {
                ...incoming,
                results: merged,
              };
            },
          },
        },
      },
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <MyPokedexProvider>
          <App />
        </MyPokedexProvider>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
);
