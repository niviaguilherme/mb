"use client";

import React, { useState, useEffect } from "react";
import { useTitleContext } from "@/contexts/TitleContext";
import { Container, Typography, Box, Button, Alert } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import TitleGrid from "@/components/TitleGrid";

export default function FavoritesPage() {
  const router = useRouter();
  const {
    titles,
    debugFavorites,
    getFavorites,
    removeFromFavorites,
    isFavorite,
  } = useTitleContext();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Efeito para marcar que o componente foi montado (apenas no cliente)
  useEffect(() => {
    setIsMounted(true);

    try {
      // Depurar os favoritos no console para investigação
      setTimeout(() => {
        debugFavorites();
        // Atualiza a lista local de IDs favoritos
        setFavoriteIds(getFavorites());
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
      setError("Erro ao carregar favoritos. Por favor, tente novamente.");
      setIsLoading(false);
    }
  }, [debugFavorites, getFavorites]);

  // Sincroniza os IDs de favoritos com o contexto
  useEffect(() => {
    if (isMounted) {
      setFavoriteIds(getFavorites());
    }
  }, [isMounted, getFavorites]);

  // Filtra explicitamente por ID em vez de usar a função isFavorite
  const favoriteTitles = titles.filter((title) =>
    favoriteIds.includes(title.id)
  );

  console.log("IDs favoritos na página:", favoriteIds);
  console.log("Títulos favoritos encontrados:", favoriteTitles);

  // Manipulador para remover dos favoritos
  const handleToggleFavorite = (id: string) => {
    removeFromFavorites(id);
    setFavoriteIds((prev) => prev.filter((favId) => favId !== id));
  };

  const handleGoBack = () => {
    router.push("/");
  };

  // Exibir um estado de carregamento até que o componente seja montado
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meus Favoritos
        </Typography>
        <Typography variant="body1">Carregando...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meus Favoritos
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Voltar para o Catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Meus Favoritos
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
        >
          Voltar para o Catálogo
        </Button>
      </Box>

      {favoriteTitles.length === 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Você ainda não adicionou nenhum título aos favoritos.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Explorar Catálogo
          </Button>
        </Box>
      ) : (
        <TitleGrid
          titles={favoriteTitles}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          showRemoveButton={true}
        />
      )}
    </Container>
  );
}
