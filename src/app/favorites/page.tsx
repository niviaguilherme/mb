"use client";

import React, { useState, useEffect } from "react";
import { useTitleContext } from "@/contexts/TitleContext";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Alert,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { Favorite, ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const handleRemoveFavorite = (id: string) => {
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
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Explorar Catálogo
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favoriteTitles.map((title) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={title.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box sx={{ p: 1, textAlign: "center" }}>
                  <Typography variant="caption">ID: {title.id}</Typography>
                </Box>
                <Link
                  href={`/title/${title.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={title.image}
                    alt={title.name}
                    sx={{ objectFit: "cover" }}
                  />
                </Link>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h6" component="h2">
                      {title.name}
                    </Typography>
                    <Tooltip title="Remover dos favoritos">
                      <IconButton
                        onClick={() => handleRemoveFavorite(title.id)}
                        color="secondary"
                      >
                        <Favorite />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {title.genre.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {title.year} • {title.rating}/5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
