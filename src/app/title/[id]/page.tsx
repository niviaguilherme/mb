"use client";

import { useParams, useRouter } from "next/navigation";
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
  Divider,
  Avatar,
  Paper,
  Button,
} from "@mui/material";
import { Person, ArrowBack } from "@mui/icons-material";

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

export default function TitleDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { titles } = useTitleContext();

  const title = titles.find((t) => t.id === id) as Title | undefined;

  const handleGoBack = () => {
    router.back();
  };

  if (!title) {
    return (
      <Container>
        <Typography variant="h4">Título não encontrado</Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
          >
            Voltar
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
      </Box>

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
          <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <Rating value={title.rating} precision={0.1} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {title.rating}/5
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
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

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h5" gutterBottom>
            Sinopse
          </Typography>
          <Paper
            elevation={0}
            sx={{ p: 2, mb: 3, bgcolor: "background.paper", borderRadius: 2 }}
          >
            <Typography variant="body1" paragraph>
              {title.synopsis}
            </Typography>
          </Paper>

          <Typography variant="h5" gutterBottom>
            Elenco
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {title.cast.map((actor: string) => (
              <Grid item xs={12} sm={6} md={4} key={actor}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2,
                  }}
                >
                  <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                    <Person />
                  </Avatar>
                  <Typography variant="body2">{actor}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
