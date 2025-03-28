"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import titlesData from "../data/titles.json";

interface Title {
  id: string;
  name: string;
  image: string;
  genre: string[];
  year: number;
  rating: number;
}

interface TitleContextType {
  titles: Title[];
  isFavorite: (id: string) => boolean;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export function TitleProvider({ children }: { children: ReactNode }) {
  const [titles] = useState<Title[]>(titlesData.titles);

  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = (id: string) => favorites.includes(id);

  const addToFavorites = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((favoriteId) => favoriteId !== id));
  };

  return (
    <TitleContext.Provider
      value={{ titles, isFavorite, addToFavorites, removeFromFavorites }}
    >
      {children}
    </TitleContext.Provider>
  );
}

export function useTitleContext() {
  const context = useContext(TitleContext);
  if (context === undefined) {
    throw new Error(
      "useTitleContext deve ser usado dentro de um TitleProvider"
    );
  }
  return context;
}
