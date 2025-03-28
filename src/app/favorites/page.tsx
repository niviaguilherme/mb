"use client";

import React, { useState, useEffect } from "react";
import { useTitleContext } from "@/contexts/TitleContext";
import TitleCard from "../../components/TitleCard";
import { Button, Typography, Box, Container, Alert, Chip } from "@mui/material";
import Link from "next/link";

export default function FavoritesPage() {
  const { titles, debugFavorites, getFavorites } = useTitleContext();
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
        <Button variant="contained" color="primary" component={Link} href="/">
          Voltar para o Catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Meus Favoritos
      </Typography>

      {/* Exibe os IDs dos favoritos para diagnóstico */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          IDs favoritos:
        </Typography>
        {favoriteIds.length > 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {favoriteIds.map((id) => (
              <Chip key={id} label={id} size="small" />
            ))}
          </Box>
        ) : (
          <Typography variant="body2">Nenhum ID favorito encontrado</Typography>
        )}
      </Box>

      {favoriteTitles.length === 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Você ainda não adicionou nenhum título aos favoritos.
          </Typography>
          <Button variant="contained" color="primary" component={Link} href="/">
            Explorar Catálogo
          </Button>
        </Box>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
          {favoriteTitles.map((title) => (
            <Box key={title.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" align="center" gutterBottom>
                ID: {title.id}
              </Typography>
              <TitleCard title={title} />
            </Box>
          ))}
        </div>
      )}
    </Container>
  );
}
