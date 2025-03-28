"use client";

import { useState, useEffect } from "react";
import { useTitleContext } from "@/contexts/TitleContext";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Button,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Link from "next/link";

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Catálogo de Streaming
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar títulos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            debugFavorites();
            alert("Favoritos diagnosticados! Veja o console para detalhes.");
          }}
          sx={{ mb: 2 }}
        >
          Diagnosticar Favoritos
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredTitles.map((title) => (
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
                  <Tooltip
                    title={
                      isMounted && favoritesState[title.id]
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <IconButton
                      onClick={() => handleFavoriteToggle(title.id)}
                      color="secondary"
                    >
                      {isMounted &&
                        (favoritesState[title.id] ? (
                          <Favorite />
                        ) : (
                          <FavoriteBorder />
                        ))}
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
    </Container>
  );
}
