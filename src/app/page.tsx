"use client";

import { useState, useEffect } from "react";
import { useTitleContext } from "@/contexts/TitleContext";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import TitleGrid from "@/components/TitleGrid";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const {
    titles,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    debugFavorites,
  } = useTitleContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesState, setFavoritesState] = useState<Record<string, boolean>>(
    {}
  );

  // Efeito para marcar que o componente foi montado (apenas no cliente)
  useEffect(() => {
    setIsMounted(true);
    // Pequeno atraso para garantir que o localStorage foi carregado
    const timer = setTimeout(() => {
      debugFavorites();
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [debugFavorites]);

  // Sincronize os estados de favoritos ao montar e quando mudam
  useEffect(() => {
    if (isMounted) {
      const newState: Record<string, boolean> = {};
      const favoriteIds = getFavorites();

      console.log("Atualizando estado local com favoritos:", favoriteIds);

      titles.forEach((title) => {
        newState[title.id] = favoriteIds.includes(title.id);
      });

      setFavoritesState(newState);
    }
  }, [isMounted, getFavorites, titles]);

  const handleFavoriteToggle = (id: string) => {
    console.log("Alternando favorito para ID:", id);
    console.log(
      "Estado atual:",
      favoritesState[id] ? "Favorito" : "Não favorito"
    );

    // Atualiza o estado local primeiro para UI responsiva
    setFavoritesState((prev) => {
      const newValue = !prev[id];
      console.log("Novo estado será:", newValue ? "Favorito" : "Não favorito");

      return {
        ...prev,
        [id]: newValue,
      };
    });

    // Atualiza o contexto
    if (favoritesState[id]) {
      console.log("Chamando removeFromFavorites para ID:", id);
      removeFromFavorites(id);
    } else {
      console.log("Chamando addToFavorites para ID:", id);
      addToFavorites(id);
    }

    // Depurar após a alteração
    setTimeout(() => {
      debugFavorites();
    }, 100);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredTitles = titles.filter((title) =>
    title.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // Função que verifica se um título é favorito (para o componente TitleGrid)
  const checkIsFavorite = (id: string) => {
    return favoritesState[id] || false;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Catálogo de Streaming
        </Typography>
        <SearchBar titles={titles} onSearch={handleSearch} />
      </Box>

      <TitleGrid
        titles={filteredTitles}
        isFavorite={checkIsFavorite}
        onToggleFavorite={handleFavoriteToggle}
        showRemoveButton={false}
      />
    </Container>
  );
}
