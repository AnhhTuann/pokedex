import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Card } from "./common/Card";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn, TYPE_COLORS } from "../lib/utils";
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

export default function PokeCard({
  pokemon,
  onClick,
  index,
  isCompareMode,
  isSelectedForCompare,
}: PokeCardProps) {
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const { isShinyMode } = useTeamStore();
  const isFav = isFavorite(pokemon.id);
  const primaryColor = TYPE_COLORS[pokemon.types[0].toLowerCase()] || "#9ca3af";
  const primaryType = pokemon.types[0] || "normal";
  const cardBgColor = getBackgroundColor(primaryType);

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
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Pokemon Image */}
        <div
          className={styles.imageContainer}
          style={{
            backgroundColor: `${primaryColor}15`,
            boxShadow: isMega
              ? `0 0 20px ${primaryColor}70, inset 0 2px 8px rgba(0, 0, 0, 0.3)`
              : undefined,
            border: isMega ? `2px dashed ${primaryColor}70` : undefined,
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
          <p className={styles.idText}>
            {pokemon.regionalNumber !== undefined &&
            pokemon.regionalNumber !== null
              ? pokemon.regionalNumber.toString().padStart(3, "0")
              : formatSpeciesId(pokemon.speciesId || pokemon.id)}
          </p>
          <h3 className={styles.nameText}>{displayName}</h3>
          {pokemon.category && (
            <p className={styles.categoryText}>{pokemon.category}</p>
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
