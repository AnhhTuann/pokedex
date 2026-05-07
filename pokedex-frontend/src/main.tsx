import { StrictMode, useState, useMemo, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MyPokedexProvider } from './lib/MyPokedexContext';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import App from './App.tsx';

// ─── Apollo Client ────────────────────────────────────────
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemonList: {
            keyArgs: ['search', 'type', 'gen', 'ids', 'region', 'game'],
            merge(existing, incoming, { args }) {
              const offset = args?.offset || 0;
              const merged = existing ? existing.results.slice(0) : [];
              for (let i = 0; i < incoming.results.length; ++i) {
                merged[offset + i] = incoming.results[i];
              }
              return { ...incoming, results: merged };
            },
          },
        },
      },
    },
  }),
});

// ─── Color Mode Context ────────────────────────────────────
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export function useColorMode() { return useContext(ColorModeContext); }

// ─── MUI Theme Factory ─────────────────────────────────────
function buildTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#6366f1' },
      secondary: { main: '#ec4899' },
      background: {
        default: mode === 'dark' ? '#0f0f1a' : '#f8fafc',
        paper:   mode === 'dark' ? '#1a1a2e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 900 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 24, transition: 'transform 0.2s, box-shadow 0.2s' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 700, fontSize: 10, letterSpacing: 1.5 },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 28 },
        },
      },
    },
  });
}

// ─── Root ──────────────────────────────────────────────────
function Root() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode(prev => prev === 'dark' ? 'light' : 'dark'),
  }), []);
  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <MyPokedexProvider>
            <App />
          </MyPokedexProvider>
        </ApolloProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
