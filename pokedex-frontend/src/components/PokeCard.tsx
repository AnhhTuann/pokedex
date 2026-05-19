import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Card } from "./common/Card";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn, TYPE_COLORS } from "../lib/utils";
import { useColorMode } from "../main";
import styles from "../styles/components/PokeCard.module.scss";

interface PokeCardProps {
  pokemon: PokemonListItem;
  onClick: () => void;
  index: number;
  isCompareMode?: boolean;
  isSelectedForCompare?: boolean;
}

function getBackgroundColor(type: string): string {
  const typeLower = type.toLowerCase();
  switch (typeLower) {
    case "grass":
      return "#1a472a";
    case "fire":
      return "#3d1f15";
    case "water":
      return "#0f2d3d";
    case "bug":
      return "#1a2a0f";
    case "normal":
      return "#1a1a1f";
    case "poison":
      return "#261a2d";
    case "electric":
      return "#2d2810";
    case "ground":
      return "#2d1f0f";
    case "fairy":
      return "#2d151f";
    case "fighting":
      return "#2d151a";
    case "psychic":
      return "#2d1a28";
    case "rock":
      return "#1f1f1a";
    case "steel":
      return "#1a1d1f";
    case "ice":
      return "#0f2028";
    case "ghost":
      return "#1a162d";
    case "dragon":
      return "#151a2d";
    case "dark":
      return "#0f0f15";
    case "flying":
      return "#151a2d";
    default:
      return "#14141a";
  }
}

function getPastelBackgroundColor(type: string): string {
  const typeLower = type.toLowerCase();
  switch (typeLower) {
    case "grass": return "#c3deb0";
    case "fire": return "#f2ad7c";
    case "water": return "#6cbce5";
    case "bug": return "#d2e59b";
    case "normal": return "#e2e2df";
    case "poison": return "#dbb5e7";
    case "electric": return "#fdf0a6";
    case "ground": return "#ecd0a1";
    case "fairy": return "#f6c4d7";
    case "fighting": return "#dfa1a1";
    case "psychic": return "#f8b8cc";
    case "rock": return "#dcd3bd";
    case "steel": return "#cfd8dc";
    case "ice": return "#b2ebf2";
    case "ghost": return "#c2b7e0";
    case "dragon": return "#9fa8da";
    case "dark": return "#bcaaa4";
    case "flying": return "#c5cae9";
    default: return "#f5f5f7";
  }
}

export default function PokeCard({
  pokemon,
  onClick,
  index,
  isCompareMode,
  isSelectedForCompare,
}: PokeCardProps) {
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const { isShinyMode } = useTeamStore();
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  
  const isFav = isFavorite(pokemon.id);
  const primaryColor = TYPE_COLORS[pokemon.types[0].toLowerCase()] || "#9ca3af";
  const primaryType = pokemon.types[0] || "normal";
  
  const pastelBgColor = getPastelBackgroundColor(primaryType);

  const isMega =
    !!pokemon.isMega ||
    pokemon.name.toLowerCase().endsWith("-mega") ||
    pokemon.name.toLowerCase().includes("-mega-") ||
    pokemon.name.toLowerCase().startsWith("mega ") ||
    pokemon.name.toLowerCase().endsWith(" mega");

  const displayName =
    pokemon.isMega && pokemon.name.startsWith("Mega ")
      ? pokemon.name.replace("Mega ", "") + "-Mega"
      : pokemon.name;

  return (
    <motion.div
      layoutId={`pokemon-card-${pokemon.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      id={`pokemon-card-${pokemon.id}`}
      className={styles.cardWrapper}
    >
      <Card
        glass
        padding="none"
        onClick={onClick}
        className={cn(
          styles.pokeCard,
          isSelectedForCompare && styles.selectedCompare,
          isMega && styles.megaCard,
          isCompareMode && !isSelectedForCompare && styles.faded,
        )}
        style={
          {
            "--primary-color": primaryColor,
            "--primary-color-glow": `${primaryColor}40`,
            "--card-bg": isDark
              ? undefined
              : `linear-gradient(135deg, ${pastelBgColor} 0%, ${pastelBgColor}dd 100%)`,
            borderColor: !isDark ? "rgba(0, 0, 0, 0.04)" : undefined,
          } as React.CSSProperties
        }
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon.id);
          }}
          className={cn(
            styles.favoriteBtn,
            isFav ? styles.isFavorite : styles.isNotFavorite,
          )}
          title={isFav ? "Remove from My Pokédex" : "Add to My Pokédex"}
          style={
            !isDark && !isFav
              ? {
                  color: "#5c6c94",
                  backgroundColor: "rgba(255, 255, 255, 0.45)",
                  borderColor: "rgba(0, 0, 0, 0.06)",
                }
              : undefined
          }
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Pokemon Image */}
        <div
          className={styles.imageContainer}
          style={{
            backgroundColor: isDark ? `${primaryColor}15` : "rgba(255, 255, 255, 0.45)",
            boxShadow: isMega
              ? `0 0 20px ${primaryColor}70, inset 0 2px 8px rgba(0, 0, 0, 0.3)`
              : !isDark
                ? "inset 0 2px 4px rgba(0, 0, 0, 0.03)"
                : undefined,
            border: isMega 
              ? `2px dashed ${primaryColor}70` 
              : !isDark 
                ? "2px solid rgba(255, 255, 255, 0.6)" 
                : undefined,
          }}
        >
          <img
            src={
              isShinyMode && pokemon.shinyImage
                ? pokemon.shinyImage
                : pokemon.image
            }
            alt={pokemon.name}
            loading="lazy"
            className={styles.pokemonImage}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.currentTarget;
              const baseId = pokemon.speciesId || pokemon.id;
              target.onerror = null;
              target.src = isShinyMode
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${baseId}.png`
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${baseId}.png`;
            }}
          />
          {isMega && <div className={styles.megaBadge}>Mega</div>}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.idText} style={!isDark ? { color: "#5c6c94" } : undefined}>
            {pokemon.regionalNumber !== undefined &&
            pokemon.regionalNumber !== null
              ? pokemon.regionalNumber.toString().padStart(3, "0")
              : formatSpeciesId(pokemon.speciesId || pokemon.id)}
          </p>
          <h3 className={styles.nameText} style={!isDark ? { color: "#141926" } : undefined}>{displayName}</h3>
          {pokemon.category && (
            <p className={styles.categoryText} style={!isDark ? { color: "#3e4a68" } : undefined}>{pokemon.category}</p>
          )}

          {/* Types */}
          <div className={styles.typeGroup}>
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={styles.typeBadge}
                style={{
                  backgroundColor: TYPE_COLORS[type.toLowerCase()] || "#9ca3af",
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
