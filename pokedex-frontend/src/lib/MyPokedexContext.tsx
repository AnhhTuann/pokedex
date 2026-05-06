import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

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
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Fetch favorites from Database
  const { data, loading } = useQuery(GET_MY_FAVORITES, {
    onCompleted: (data) => {
      setFavorites(data.myFavorites);
    }
  });

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE);

  const toggleFavorite = async (id: number) => {
    // Optimistic UI update
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );

    try {
      // Sync with database
      await toggleFavoriteMutation({ variables: { pokemonId: id } });
    } catch (error) {
      console.error("Failed to toggle favorite in database", error);
      // Revert if error
      setFavorites(prev => 
        prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
      );
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
