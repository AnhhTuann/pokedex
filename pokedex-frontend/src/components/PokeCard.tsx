import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Check } from "lucide-react";
import { Card } from "./common/Card";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn, getTypeBadgeStyle, getTypeBadgeColor } from "../lib/utils";
import { useColorMode } from "../main";
import { extractDominantColor } from "../lib/colorExtractor";
import styles from "../styles/components/PokeCard.module.scss";

interface PokeCardProps {
  pokemon: PokemonListItem;
  onClick: () => void;
  index: number;
  isCompareMode?: boolean;
  isSelectedForCompare?: boolean;
}

export default function PokeCard({
  pokemon, onClick, index, isCompareMode, isSelectedForCompare,
}: PokeCardProps) {
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const { isShinyMode } = useTeamStore();
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const isFav = isFavorite(pokemon.id);
  const primaryType = pokemon.types?.[0] || "normal";
  const [accent, setAccent] = useState<string>(getTypeBadgeColor(primaryType));
  const imageUrl = isShinyMode && pokemon.shinyImage ? pokemon.shinyImage : pokemon.image;

  useEffect(() => {
    let active = true;
    extractDominantColor(imageUrl, primaryType).then((rgb) => {
      if (!active) return;
      setAccent(rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : getTypeBadgeColor(primaryType));
    });
    return () => { active = false; };
  }, [imageUrl, primaryType]);

  const isMega = !!pokemon.isMega || pokemon.name.toLowerCase().includes("-mega");
  const displayName = pokemon.isMega && pokemon.name.startsWith("Mega ")
    ? pokemon.name.replace("Mega ", "") + "-Mega"
    : pokemon.name;
  const dexNumber = pokemon.regionalNumber !== undefined && pokemon.regionalNumber !== null
    ? pokemon.regionalNumber.toString().padStart(3, "0")
    : formatSpeciesId(pokemon.speciesId || pokemon.id);

  return (
    <motion.div
      layoutId={`pokemon-card-${pokemon.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.18) }}
      className={styles.cardWrapper}
    >
      <Card
        padding="none"
        className={cn(styles.pokeCard, isSelectedForCompare && styles.selectedCompare, isCompareMode && !isSelectedForCompare && styles.faded)}
        style={{ "--type-accent": accent } as React.CSSProperties}
      >
        <div className={styles.topRow}>
          <span className={styles.idText}>{dexNumber}</span>
          <div className={styles.topActions}>
            {isCompareMode && (
              <span className={cn(styles.compareIndicator, isSelectedForCompare && styles.compareIndicatorActive)} aria-hidden="true">
                {isSelectedForCompare && <Check size={12} strokeWidth={3} />}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleFavorite(pokemon.id); }}
              className={cn(styles.favoriteBtn, isFav ? styles.isFavorite : styles.isNotFavorite)}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              aria-label={isFav ? `Remove ${displayName} from favorites` : `Add ${displayName} to favorites`}
              aria-pressed={isFav}
            >
              <Heart size={14} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <button
          type="button"
          className={styles.cardMainBtn}
          onClick={onClick}
          aria-label={`${displayName}, Pokémon ${dexNumber}${isSelectedForCompare ? ', selected for comparison' : ''}`}
        >
          <div className={styles.imageContainer}>
            <div className={styles.pokeballMotif} aria-hidden="true" />
            <img
              src={imageUrl}
              alt={pokemon.name}
              loading="lazy"
              width={112}
              height={112}
              className={styles.pokemonImage}
              onError={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.style.opacity = '0'; }}
            />
            {isMega && <div className={styles.megaBadge}>Mega</div>}
          </div>

          <div className={styles.info}>
            <h3 className={styles.nameText} title={displayName}>{displayName}</h3>
            {pokemon.category && <p className={styles.categoryText}>{pokemon.category}</p>}
            <div className={styles.typeGroup}>
              {pokemon.types.map((type) => (
                <span key={type} className={styles.typeBadge} style={getTypeBadgeStyle(type, isDark)}>{type}</span>
              ))}
            </div>
          </div>
        </button>
      </Card>
    </motion.div>
  );
}
