"use client";

import React, { useState, useEffect } from "react";
import { useTitleContext } from "@/contexts/TitleContext";
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import TitleGrid from "@/components/TitleGrid";

// Função auxiliar para verificar se estamos no navegador
const isBrowser = () => typeof window !== "undefined";

export default function FavoritesPage() {
  const router = useRouter();
  const { titles, debugFavorites, getFavorites, removeFromFavorites } =
    useTitleContext();
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
        if (isBrowser()) {
          debugFavorites();
          // Atualiza a lista local de IDs favoritos
          setFavoriteIds(getFavorites());
        }
        setIsLoading(false);
      }, 1000); // Aumentando para garantir que o carregamento seja completo
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
      setError("Erro ao carregar favoritos. Por favor, tente novamente.");
      setIsLoading(false);
    }
  }, [debugFavorites, getFavorites]);

  // Sincroniza os IDs de favoritos com o contexto
  useEffect(() => {
    if (isMounted) {
      try {
        setFavoriteIds(getFavorites());
      } catch (err) {
        console.error("Erro ao sincronizar favoritos:", err);
        setError("Não foi possível sincronizar seus favoritos.");
      }
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
    try {
      removeFromFavorites(id);
      setFavoriteIds((prev) => prev.filter((favId) => favId !== id));
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
      setError(
        "Não foi possível remover este item dos favoritos. Tente novamente."
      );
    }
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
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Carregando seus favoritos...
          </Typography>
        </Box>
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

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
          isFavorite={() => true} // Na página de favoritos, todos são favoritos
          onToggleFavorite={handleToggleFavorite}
          showRemoveButton={true}
        />
      )}
    </Container>
  );
}
