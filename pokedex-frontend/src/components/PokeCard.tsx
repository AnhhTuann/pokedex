import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Card } from "./common/Card";
import { PokemonListItem } from "../types";
import { useMyPokedex } from "../lib/MyPokedexContext";
import { useTeamStore } from "../lib/teamStore";
import { formatSpeciesId, cn } from "../lib/utils";

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
      className="h-full"
    >
      <Card
        glass
        padding="none"
        onClick={onClick}
        className={cn(
          "relative h-full overflow-visible cursor-pointer group flex flex-col items-center p-4 pt-6 transition-all",
          isSelectedForCompare ? "ring-4 ring-blue-500 shadow-lg" : "",
          isMega ? "border-pink-500/50 shadow-pink-500/20" : "",
          isCompareMode && !isSelectedForCompare ? "opacity-55 hover:opacity-100" : "",
          // Light/dark adaptive card base
          "bg-white/80 dark:bg-[#111827]/80"
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
            "absolute top-3 right-3 z-10 p-1.5 rounded-full backdrop-blur-md transition-colors",
            isFav 
              ? "text-red-500 bg-red-500/10 hover:bg-red-500/20" 
              : "text-gray-400 bg-black/10 dark:bg-gray-800/50 hover:text-red-400 hover:bg-black/20 dark:hover:bg-gray-800"
          )}
          title={isFav ? "Remove from My Pokédex" : "Add to My Pokédex"}
        >
          <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Pokemon Image */}
        <div 
          className="relative w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
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
            className="w-24 h-24 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
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
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-pink-500 to-purple-600 text-white text-[0.6rem] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,127,0.6)] border border-white/30 z-10">
              Mega
            </div>
          )}
        </div>

        {/* Info */}
        <div className="w-full text-center mt-auto">
          <p className="text-xs font-bold text-gray-500 tracking-widest uppercase">
            {pokemon.regionalNumber !== undefined && pokemon.regionalNumber !== null
              ? pokemon.regionalNumber.toString().padStart(3, "0")
              : formatSpeciesId(pokemon.speciesId || pokemon.id)}
          </p>
          <h3 className="text-lg font-extrabold capitalize my-1 text-gray-900 dark:text-white tracking-tight">
            {displayName}
          </h3>
          {pokemon.category && (
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
              {pokemon.category}
            </p>
          )}

          {/* Types */}
          <div className="flex justify-center gap-1.5 flex-wrap mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="text-[0.65rem] font-bold text-white uppercase tracking-wider px-2 py-0.5 rounded"
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
