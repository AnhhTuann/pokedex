import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Card } from "./common/Card";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn } from "../lib/utils";
import styles from "../styles/components/PokeCard.module.scss";

const TYPE_COLORS: Record<string, string> = {
  normal: "#9ca3af", fire: "#f97316", water: "#3b82f6", electric: "#eab308",
  grass: "#22c55e", ice: "#06b6d4", fighting: "#ef4444", poison: "#a855f7",
  ground: "#d97706", flying: "#818cf8", psychic: "#ec4899", bug: "#84cc16",
  rock: "#78716c", ghost: "#7c3aed", dragon: "#1d4ed8", dark: "#374151",
  steel: "#6b7280", fairy: "#f472b6",
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
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const { isShinyMode } = useTeamStore();
  const isFav = isFavorite(pokemon.id);
  const primaryColor = TYPE_COLORS[pokemon.types[0].toLowerCase()] || "#9ca3af";

  const isMega = !!pokemon.isMega || 
    pokemon.name.toLowerCase().endsWith("-mega") ||
    pokemon.name.toLowerCase().includes("-mega-") ||
    pokemon.name.toLowerCase().startsWith("mega ") ||
    pokemon.name.toLowerCase().endsWith(" mega");
    
  const displayName = pokemon.isMega && pokemon.name.startsWith("Mega ")
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
          isCompareMode && !isSelectedForCompare && styles.faded
        )}
        style={{
          background: `linear-gradient(145deg, ${primaryColor}20 0%, ${primaryColor}05 60%, transparent 100%)`,
          borderColor: isSelectedForCompare ? undefined : `${primaryColor}40`
        }}
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon.id);
          }}
          className={cn(
            styles.favoriteBtn,
            isFav ? styles.isFavorite : styles.isNotFavorite
          )}
          title={isFav ? "Remove from My Pokédex" : "Add to My Pokédex"}
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Pokemon Image */}
        <div 
          className={styles.imageContainer}
          style={{
            backgroundColor: `${primaryColor}25`,
            boxShadow: isMega ? `0 0 20px ${primaryColor}70` : undefined,
            border: isMega ? `2px dashed ${primaryColor}90` : undefined,
          }}
        >
          <img
            src={isShinyMode && pokemon.shinyImage ? pokemon.shinyImage : pokemon.image}
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
          {isMega && (
            <div className={styles.megaBadge}>
              Mega
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.idText}>
            {pokemon.regionalNumber !== undefined && pokemon.regionalNumber !== null
              ? pokemon.regionalNumber.toString().padStart(3, "0")
              : formatSpeciesId(pokemon.speciesId || pokemon.id)}
          </p>
          <h3 className={styles.nameText}>
            {displayName}
          </h3>
          {pokemon.category && (
            <p className={styles.categoryText}>
              {pokemon.category}
            </p>
          )}

          {/* Types */}
          <div className={styles.typeGroup}>
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={styles.typeBadge}
                style={{ backgroundColor: TYPE_COLORS[type.toLowerCase()] || "#9ca3af" }}
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
