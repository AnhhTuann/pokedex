import { PokemonArtwork } from './PokemonArtwork';
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn, TYPE_COLORS } from "../lib/utils";
import { useColorMode } from "../main";
import { extractDominantColor, getExtractedColors, addOpacityToColor } from "../lib/colorExtractor";
import styles from "../styles/components/PokeCard.module.scss";

interface PokeCardProps {
  pokemon: PokemonListItem;
  discoveryIndex?: number;
  onClick: () => void;
  isCompareMode?: boolean;
  isSelectedForCompare?: boolean;
}

export default function PokeCard({
  pokemon,
  discoveryIndex,
  onClick,
  isCompareMode,
  isSelectedForCompare,
}: PokeCardProps) {
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const { isShinyMode } = useTeamStore();
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const discovery = discoveryIndex !== undefined;

  const isFav = isFavorite(pokemon.id);
  const primaryType = pokemon.types?.[0] || "normal";

  const [extraction, setExtraction] = useState<{ url: string; type: string; rgb: Awaited<ReturnType<typeof extractDominantColor>> }>();

  const imageUrl = (isShinyMode ? pokemon.shinyImage : pokemon.image) ?? '';

  useEffect(() => {
    let active = true;
    extractDominantColor(imageUrl, primaryType).then((rgb) => {
      if (active) {
        setExtraction({ url: imageUrl, type: primaryType, rgb });
      }
    });
    return () => {
      active = false;
    };
  }, [imageUrl, primaryType]);

  const { primaryColor, pastelBgColor } = getExtractedColors(
    extraction?.url === imageUrl && extraction.type === primaryType ? extraction.rgb : null,
    primaryType,
    isDark
  );

  const isMega =
    pokemon.category === "MEGA" ||
    !!pokemon.isMega ||
    pokemon.name.toLowerCase().endsWith("-mega") ||
    pokemon.name.toLowerCase().includes("-mega-") ||
    pokemon.name.toLowerCase().startsWith("mega ") ||
    pokemon.name.toLowerCase().endsWith(" mega");

  const formBadge = isMega ? "Mega" : pokemon.category === "GIGANTAMAX" ? "Gigantamax" : null;

  const displayName =
    pokemon.isMega && pokemon.name.startsWith("Mega ")
      ? pokemon.name.replace("Mega ", "") + "-Mega"
      : pokemon.name;

  return (
    <div id={`pokemon-card-${pokemon.id}`} className={styles.cardWrapper}>
      <article
        className={cn(styles.pokeCard, discovery && styles.discoveryCard, isSelectedForCompare && styles.selectedCompare,
          isCompareMode && !isSelectedForCompare && styles.faded)}
        style={{
          "--primary-color": primaryColor,
          ...(discoveryIndex !== undefined && {
            "--primary-type": TYPE_COLORS[primaryType.toLowerCase()] || "#9ca3af",
            "--secondary-type": TYPE_COLORS[(pokemon.types[1] || primaryType).toLowerCase()] || "#9ca3af",
            "--card-delay": `${Math.min(discoveryIndex % 24, 7) * 24}ms`,
          }),
          "--card-bg": `linear-gradient(155deg, ${pastelBgColor}, ${addOpacityToColor(pastelBgColor, isDark ? 0.48 : 0.33)}), var(--bg-paper)`,
        } as React.CSSProperties}
      >
        <button type="button" onClick={() => toggleFavorite(pokemon.id)}
          className={cn(styles.favoriteBtn, isFav && styles.isFavorite)}
          aria-label={isFav ? `Remove ${displayName} from favorites` : `Add ${displayName} to favorites`}
          aria-pressed={isFav}>
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>
        <button type="button" className={styles.openCard} onClick={onClick}
          aria-label={isCompareMode ? `Compare ${displayName}` : `View ${displayName}`}
          aria-pressed={isCompareMode ? !!isSelectedForCompare : undefined}>
          <span className={styles.idText}>
            {pokemon.regionalNumber != null && <span title="Regional Dex number">
              {String(pokemon.regionalNumber).padStart(3, "0")}
            </span>}
            <span title="National Dex number">{formatSpeciesId(pokemon.speciesId || pokemon.id)}</span>
          </span>

          {/* Pokemon Image */}
          <span className={styles.imageContainer}>
            <PokemonArtwork src={imageUrl} name={pokemon.name} shiny={isShinyMode}
              loading="lazy" className={styles.pokemonImage} />
            {(discovery ? formBadge : isMega && "Mega") && <span className={styles.megaBadge}>{discovery ? formBadge : "Mega"}</span>}
          </span>

          {/* Info */}
          <span className={styles.info}>
            <span className={styles.nameText}>{displayName.replaceAll("-", " ")}</span>
            {pokemon.category && <span className={styles.categoryText}>{pokemon.category.toLowerCase()}</span>}

            {/* Types */}
            <span className={styles.typeGroup}>
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={styles.typeBadge}
                  style={{
                    "--type-color": TYPE_COLORS[type.toLowerCase()] || "#9ca3af",
                  } as React.CSSProperties}
                >
                  {type}
                </span>
              ))}
            </span>
          </span>
        </button>
      </article>
    </div>
  );
}
