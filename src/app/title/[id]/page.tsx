"use client";

import { useParams } from "next/navigation";
import { useTitleContext } from "@/contexts/TitleContext";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Chip,
  Rating,
} from "@mui/material";

export default function TitleDetails() {
  const { id } = useParams();
  const { titles } = useTitleContext();

  const title = titles.find((t) => t.id === id);

  if (!title) {
    return (
      <Container>
        <Typography variant="h4">Título não encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={title.image}
              alt={title.name}
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title.name}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="text.secondary">
              {title.year}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Rating value={title.rating} precision={0.1} readOnly />
          </Box>
          <Box sx={{ mb: 2 }}>
            {title.genre.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                sx={{ mr: 1, mb: 1 }}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
