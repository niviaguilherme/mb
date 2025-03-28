"use client";

import { Inter } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { TitleProvider } from "@/contexts/TitleContext";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>
          Catálogo de Streaming - Assista seus filmes e séries favoritos
        </title>
        <meta
          name="description"
          content="Descubra e acompanhe seus filmes e séries favoritos no nosso catálogo de streaming"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TitleProvider>
            <Navigation />
            <main>{children}</main>
          </TitleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
