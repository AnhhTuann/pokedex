import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
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

const MyPokedexContext = createContext<MyPokedexContextType | undefined>(undefined);

export function MyPokedexProvider({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);

  const { data, loading } = useQuery(GET_MY_FAVORITES, {
    skip: !token,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setFavorites(token && data ? data.myFavorites : []);
  }, [token, data]);

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE);

  const flip = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]));

  const toggleFavorite = async (id: number) => {
    if (!token) {
      navigate("/login");
      return;
    }
    flip(id);
    try {
      await toggleFavoriteMutation({ variables: { pokemonId: id } });
    } catch (error) {
      console.error("Failed to toggle favorite in database", error);
      flip(id);
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
