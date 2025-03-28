"use client";

import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import Link from "next/link";

export default function Navigation() {
  const pathname = usePathname();
  const isFavoritesPage = pathname === "/favorites";

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Catálogo de Streaming1
        </Typography>
        <Box>
          <Tooltip title="Favoritos">
            <IconButton
              component={Link}
              href="/favorites"
              color={isFavoritesPage ? "secondary" : "inherit"}
            >
              <Favorite />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
