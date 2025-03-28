"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import titlesData from "../data/titles.json";

interface Title {
  id: string;
  name: string;
  image: string;
  genre: string[];
  year: number;
  rating: number;
  synopsis: string;
  cast: string[];
}

interface TitleContextType {
  titles: Title[];
  isFavorite: (id: string) => boolean;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  getFavorites: () => string[];
  debugFavorites: () => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

// Função auxiliar para verificar se estamos no navegador
const isBrowser = () => typeof window !== "undefined";

export function TitleProvider({ children }: { children: ReactNode }) {
  const [titles] = useState<Title[]>(titlesData.titles);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Este useEffect será executado apenas no cliente
  useEffect(() => {
    // Marcar que estamos no cliente
    setIsClient(true);

    // Tenta recuperar favoritos do localStorage apenas se estivermos no navegador
    if (isBrowser()) {
      const storedFavorites = localStorage.getItem("favorites");
      console.log("Carregando favoritos do localStorage:", storedFavorites);

      if (storedFavorites) {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);
          console.log("Favoritos parseados:", parsedFavorites);

          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
          }
        } catch (error) {
          console.error("Erro ao carregar favoritos:", error);
        }
      }
    }
  }, []);

  // Persiste os favoritos no localStorage quando mudam (apenas do lado do cliente)
  useEffect(() => {
    if (isClient && isBrowser()) {
      console.log("Salvando favoritos no localStorage:", favorites);
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Erro ao salvar favoritos:", error);
      }
    }
  }, [favorites, isClient]);

  const isFavorite = (id: string) => {
    const result = favorites.includes(id);
    return result;
  };

  const addToFavorites = (id: string) => {
    // Verificar se já está nos favoritos para evitar duplicações
    console.log("Adicionando aos favoritos:", id);

    if (!favorites.includes(id)) {
      setFavorites((prev) => {
        const newFavorites = [...prev, id];
        console.log("Novos favoritos após adição:", newFavorites);
        return newFavorites;
      });
    }
  };

  const removeFromFavorites = (id: string) => {
    console.log("Removendo dos favoritos:", id);

    setFavorites((prev) => {
      const newFavorites = prev.filter((favoriteId) => favoriteId !== id);
      console.log("Novos favoritos após remoção:", newFavorites);
      return newFavorites;
    });
  };

  const getFavorites = () => {
    return favorites;
  };

  const debugFavorites = () => {
    console.log("Estado atual dos favoritos:", favorites);

    if (isBrowser()) {
      console.log(
        "Favoritos no localStorage:",
        localStorage.getItem("favorites")
      );
    } else {
      console.log("Executando no servidor, localStorage não disponível");
    }

    // Verifica se os títulos favoritos existem na lista de títulos
    const favoriteTitles = titles.filter((title) =>
      favorites.includes(title.id)
    );
    console.log("Títulos favoritos encontrados:", favoriteTitles);
  };

  return (
    <TitleContext.Provider
      value={{
        titles,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        getFavorites,
        debugFavorites,
      }}
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
