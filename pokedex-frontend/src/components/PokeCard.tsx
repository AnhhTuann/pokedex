import React, { useState } from "react";
import { Heart, Check, ImageOff } from "lucide-react";
import { Card } from "./common/Card";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn, getTypeBadgeStyle, getTypeBadgeColor } from "../lib/utils";
import { useColorMode } from "../main";
import styles from "../styles/components/PokeCard.module.scss";

interface PokeCardProps {
  pokemon: PokemonListItem;
  onClick: () => void;
  index: number;
  isCompareMode?: boolean;
  isSelectedForCompare?: boolean;
}

export default function PokeCard({
  pokemon, onClick, isCompareMode, isSelectedForCompare,
}: PokeCardProps) {
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const isShinyMode = useTeamStore(state => state.isShinyMode);
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const isFav = isFavorite(pokemon.id);
  const primaryType = pokemon.types?.[0] || "normal";
  const accent = getTypeBadgeColor(primaryType);
  const imageUrl = isShinyMode && pokemon.shinyImage ? pokemon.shinyImage : pokemon.image;
  const [failedImage, setFailedImage] = useState<string>();
  const [failedFallback, setFailedFallback] = useState<string>();
  const displayedImage = failedImage === imageUrl ? pokemon.image : imageUrl;

  const isMega = !!pokemon.isMega || pokemon.name.toLowerCase().includes("-mega");
  const displayName = pokemon.isMega && pokemon.name.startsWith("Mega ")
    ? pokemon.name.replace("Mega ", "") + "-Mega"
    : pokemon.name;
  const dexNumber = pokemon.regionalNumber !== undefined && pokemon.regionalNumber !== null
    ? pokemon.regionalNumber.toString().padStart(3, "0")
    : formatSpeciesId(pokemon.speciesId || pokemon.id);

  return (
    <div className={styles.cardWrapper}>
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
            {displayedImage && displayedImage !== failedFallback ? (
              <img
                src={displayedImage}
                alt=""
                loading="lazy"
                decoding="async"
                width={112}
                height={112}
                className={styles.pokemonImage}
                onError={() => {
                  if (displayedImage === pokemon.image) setFailedFallback(displayedImage);
                  else setFailedImage(displayedImage);
                }}
              />
            ) : (
              <span className={styles.artworkFallback} role="img" aria-label="Artwork unavailable"><ImageOff size={24} /></span>
            )}
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
    </div>
  );
}
