import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { motion } from "motion/react";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";

// Type → palette color mapping
const TYPE_COLORS: Record<string, string> = {
  normal: "#9ca3af",
  fire: "#f97316",
  water: "#3b82f6",
  electric: "#eab308",
  grass: "#22c55e",
  ice: "#06b6d4",
  fighting: "#ef4444",
  poison: "#a855f7",
  ground: "#d97706",
  flying: "#818cf8",
  psychic: "#ec4899",
  bug: "#84cc16",
  rock: "#78716c",
  ghost: "#7c3aed",
  dragon: "#1d4ed8",
  dark: "#374151",
  steel: "#6b7280",
  fairy: "#f472b6",
};

interface PokeCardProps {
  pokemon: PokemonListItem;
  onClick: () => void;
  index: number;
  isCompareMode?: boolean;
  isSelectedForCompare?: boolean;
}

export default function PokeCard({
  pokemon,
  onClick,
  index,
  isCompareMode,
  isSelectedForCompare,
}: PokeCardProps) {
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const { isShinyMode } = useTeamStore();
  const isFav = isFavorite(pokemon.id);
  const primaryColor = TYPE_COLORS[pokemon.types[0]] || "#9ca3af";

  return (
    <motion.div
      layoutId={`pokemon-card-${pokemon.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      id={`pokemon-card-${pokemon.id}`}
      style={{ height: "100%" }}
    >
      <Card
        elevation={isSelectedForCompare ? 12 : 2}
        sx={{
          height: "100%",
          border: isSelectedForCompare
            ? `3px solid ${theme.palette.primary.main}`
            : `1px solid ${alpha(primaryColor, 0.25)}`,
          opacity: isCompareMode && !isSelectedForCompare ? 0.55 : 1,
          background: `linear-gradient(160deg, ${alpha(primaryColor, theme.palette.mode === "dark" ? 0.12 : 0.06)} 0%, ${theme.palette.background.paper} 60%)`,
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Favorite button */}
        <Tooltip title={isFav ? "Remove from My Pokédex" : "Add to My Pokédex"}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(pokemon.id);
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              color: isFav ? "secondary.main" : "text.disabled",
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(8px)",
              "&:hover": {
                color: "secondary.main",
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
              },
            }}
          >
            {isFav ? (
              <Favorite fontSize="small" />
            ) : (
              <FavoriteBorderOutlined fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        <CardActionArea
          onClick={onClick}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            pt: 3,
          }}
        >
          {/* Pokémon Image */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: alpha(
                primaryColor,
                theme.palette.mode === "dark" ? 0.15 : 0.1,
              ),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={isShinyMode && pokemon.shinyImage ? pokemon.shinyImage : pokemon.image}
              alt={pokemon.name}
              loading="lazy"
              sx={{
                width: 90,
                height: 90,
                objectFit: "contain",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))",
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                transform: isShinyMode ? "scale(1.05)" : "scale(1)",
              }}
            />
          </Box>

          <CardContent sx={{ p: 0, width: "100%", textAlign: "center" }}>
            {/* Dex number */}
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              #{pokemon.regionalNumber !== undefined && pokemon.regionalNumber !== null
                ? pokemon.regionalNumber.toString().padStart(3, "0")
                : pokemon.id.toString().padStart(4, "0")}
            </Typography>

            {/* Name */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                textTransform: "capitalize",
                my: 0.5,
                color: "text.primary",
                letterSpacing: -0.5,
              }}
            >
              {pokemon.name}
            </Typography>

            {/* Category */}
            {pokemon.category && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontStyle: "italic",
                  mb: 1,
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {pokemon.category}
              </Typography>
            )}

            {/* Types */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 0.75,
                flexWrap: "wrap",
              }}
            >
              {pokemon.types.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  size="small"
                  sx={{
                    bgcolor: alpha(TYPE_COLORS[type] || "#9ca3af", 0.85),
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    height: 20,
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
