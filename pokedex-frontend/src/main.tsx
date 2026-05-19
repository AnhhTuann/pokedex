import {
  StrictMode,
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MyPokedexProvider } from "./lib/MyPokedexContext";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

// ─── Apollo Client ────────────────────────────────────────
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
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

// ─── Root ──────────────────────────────────────────────────
function Root() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  // Sync mode with HTML class for local SCSS themes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.setAttribute("data-theme", mode);
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
