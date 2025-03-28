"use client";

import { useState } from "react";
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
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  const { titles, isFavorite, addToFavorites, removeFromFavorites } =
    useTitleContext();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTitles = titles.filter((title) =>
    title.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                      isFavorite(title.id)
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <IconButton
                      onClick={() =>
                        isFavorite(title.id)
                          ? removeFromFavorites(title.id)
                          : addToFavorites(title.id)
                      }
                      color="secondary"
                    >
                      {isFavorite(title.id) ? <Favorite /> : <FavoriteBorder />}
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
