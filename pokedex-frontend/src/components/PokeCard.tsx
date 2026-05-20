import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Card } from "./common/Card";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn, TYPE_COLORS } from "../lib/utils";
import { useColorMode } from "../main";
import { extractDominantColor, getExtractedColors, addOpacityToColor } from "../lib/colorExtractor";
import styles from "../styles/components/PokeCard.module.scss";

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
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  
  const isFav = isFavorite(pokemon.id);
  const primaryType = pokemon.types[0] || "normal";
  
  const [extractedRgb, setExtractedRgb] = useState<{ r: number; g: number; b: number } | null>(null);

  const imageUrl = isShinyMode && pokemon.shinyImage
    ? pokemon.shinyImage
    : pokemon.image;

  useEffect(() => {
    let active = true;
    extractDominantColor(imageUrl, primaryType).then((rgb) => {
      if (active) {
        setExtractedRgb(rgb);
      }
    });
    return () => {
      active = false;
    };
  }, [imageUrl]);

  const { primaryColor, primaryColorGlow, pastelBgColor } = getExtractedColors(
    extractedRgb,
    primaryType,
    isDark
  );

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
          isCompareMode && !isSelectedForCompare && styles.faded,
        )}
        style={
          {
            "--primary-color": primaryColor,
            "--primary-color-glow": primaryColorGlow,
            "--card-bg": isDark
              ? `linear-gradient(135deg, ${addOpacityToColor(pastelBgColor, 0.75)} 0%, ${addOpacityToColor(pastelBgColor, 0.45)} 100%)`
              : `linear-gradient(135deg, ${pastelBgColor} 0%, ${addOpacityToColor(pastelBgColor, 0.85)} 100%)`,
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
