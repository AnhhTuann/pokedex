import React, { createContext, useContext, useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useAuthStore } from "./authStore";

interface MyPokedexContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  loading: boolean;
}

const GET_MY_FAVORITES = gql`
  query GetMyFavorites {
    myFavorites
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($pokemonId: Int!) {
    toggleFavorite(pokemonId: $pokemonId)
  }
`;

const ANON_FAVORITES_KEY = 'pokedex:anonymous-favorites';

const readAnonymousFavorites = (): number[] => {
  try {
    const raw = localStorage.getItem(ANON_FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
};

const saveAnonymousFavorites = (ids: number[]): void => {
  try {
    localStorage.setItem(ANON_FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // Storage may be unavailable (private mode); favourites stay in memory.
  }
};

const MyPokedexContext = createContext<MyPokedexContextType | undefined>(undefined);

export function MyPokedexProvider({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const [favorites, setFavorites] = useState<number[]>(() =>
    token ? [] : readAnonymousFavorites()
  );

  const { data, loading } = useQuery(GET_MY_FAVORITES, {
    skip: !token,
    fetchPolicy: 'cache-and-network',
  });

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE);

  useEffect(() => {
    if (!token) {
      setFavorites(readAnonymousFavorites());
      return;
    }
    if (Array.isArray(data?.myFavorites)) {
      setFavorites(data.myFavorites);
    }
  }, [token, data]);

  const toggleFavorite = async (id: number) => {
    const nextFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    setFavorites(nextFavorites);

    if (!token) {
      saveAnonymousFavorites(nextFavorites);
      return;
    }

    try {
      await toggleFavoriteMutation({ variables: { pokemonId: id } });
    } catch (error) {
      console.error("Failed to toggle favorite in database", error);
      setFavorites(favorites);
    }
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <MyPokedexContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </MyPokedexContext.Provider>
  );
}

export function useMyPokedex() {
  const context = useContext(MyPokedexContext);
  if (!context) throw new Error("useMyPokedex must be used within MyPokedexProvider");
  return context;
}
