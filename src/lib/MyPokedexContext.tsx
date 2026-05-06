import React, { createContext, useContext, useState, useEffect } from "react";

interface MyPokedexContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const MyPokedexContext = createContext<MyPokedexContextType | undefined>(undefined);

export function MyPokedexProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem("my_pokedex");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("my_pokedex", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <MyPokedexContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </MyPokedexContext.Provider>
  );
}

export function useMyPokedex() {
  const context = useContext(MyPokedexContext);
  if (!context) throw new Error("useMyPokedex must be used within MyPokedexProvider");
  return context;
}
