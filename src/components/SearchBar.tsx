import { useState, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  Box,
  InputAdornment,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Title } from "@/types";
import { useRouter } from "next/navigation";
import HighlightMatch from "./HighlightMatch";

interface SearchBarProps {
  titles: Title[];
  onSearch: (query: string) => void;
}

export default function SearchBar({ titles, onSearch }: SearchBarProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Title[]>([]);
  const [loading, setLoading] = useState(false);

  // Definir a animação em um estilo global
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const query = inputValue.toLowerCase();
      const filteredTitles = titles
        .filter((title) => title.name.toLowerCase().includes(query))
        .slice(0, 5); // Limita a 5 sugestões para melhor UX

      setSuggestions(filteredTitles);
      setLoading(false);
    }, 300); // Um pequeno delay para melhor UX

    return () => clearTimeout(timer);
  }, [inputValue, titles]);

  const handleInputChange = (_: React.SyntheticEvent, newValue: string) => {
    setInputValue(newValue);
    onSearch(newValue);
  };

  const handleOptionSelected = (
    _: React.SyntheticEvent,
    option: string | Title | null
  ) => {
    if (option && typeof option !== "string" && option.id) {
      // Navega para a página de detalhes do título
      router.push(`/title/${option.id}`);
    }
  };

  return (
    <Autocomplete
      freeSolo
      fullWidth
      options={suggestions}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOptionSelected}
      filterOptions={(x) => x} // Não filtra as opções, usamos nosso próprio filtro no useEffect
      noOptionsText="Nenhum título encontrado"
      loadingText="Buscando títulos..."
      loading={loading}
      sx={{
        "& .MuiAutocomplete-popper": {
          animation: "fadeIn 0.3s ease-in-out",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Buscar títulos..."
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        // Criando um ID único para o componente li
        const optionId = `option-${option.id}`;

        return (
          <Box
            component="li"
            {...props}
            key={optionId}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Avatar
              key={`avatar-${option.id}`}
              src={option.image}
              alt={option.name}
              variant="rounded"
              sx={{ width: 50, height: 50 }}
            />
            <Box key={`content-${option.id}`}>
              <Typography
                key={`title-${option.id}`}
                variant="body1"
                fontWeight="medium"
              >
                <HighlightMatch text={option.name} query={inputValue} />
              </Typography>
              <Typography
                key={`subtitle-${option.id}`}
                variant="body2"
                color="text.secondary"
              >
                {option.year} • {option.genre.slice(0, 2).join(", ")}
              </Typography>
            </Box>
          </Box>
        );
      }}
    />
  );
}
