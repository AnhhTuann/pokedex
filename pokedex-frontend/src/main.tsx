import {
  StrictMode,
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { MyPokedexProvider } from "./lib/MyPokedexContext";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

// ─── Apollo Client ────────────────────────────────────────
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL || "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemonList: {
            keyArgs: ["search", "type", "gen", "ids", "region", "game", "maxGen"],
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

export const ColorModeContext = createContext({ mode: "dark", toggleColorMode: () => {} });
export function useColorMode() {
  return useContext(ColorModeContext);
}

const THEME_STORAGE_KEY = "elite-pokedex-theme";

function getInitialMode(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore storage errors
  }
  return "dark";
}

// ─── Root ──────────────────────────────────────────────────
function Root() {
  const [mode, setMode] = useState<"light" | "dark">(getInitialMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.setAttribute("data-theme", mode);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // ignore storage errors
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ApolloProvider client={client}>
        <MyPokedexProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MyPokedexProvider>
      </ApolloProvider>
    </ColorModeContext.Provider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
