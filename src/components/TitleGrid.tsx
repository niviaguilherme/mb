import React from "react";
import Link from "next/link";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

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

interface TitleGridProps {
  titles: Title[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  showRemoveButton?: boolean;
}

export default function TitleGrid({
  titles,
  isFavorite,
  onToggleFavorite,
  showRemoveButton = false,
}: TitleGridProps) {
  return (
    <Grid container spacing={3}>
      {titles.map((title) => (
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
                    showRemoveButton
                      ? "Remover dos favoritos"
                      : isFavorite(title.id)
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  <IconButton
                    onClick={() => onToggleFavorite(title.id)}
                    color={isFavorite(title.id) ? "secondary" : "default"}
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
  );
}
