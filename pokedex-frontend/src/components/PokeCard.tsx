import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { PokemonListItem } from '../types';
import { useMyPokedex } from '../lib/MyPokedexContext';

const typeStyles: Record<string, { bg: string, border: string, badge: string, circle: string }> = {
  normal: { bg: 'bg-slate-50', border: 'border-slate-400', badge: 'bg-slate-400', circle: 'bg-slate-200' },
  fire: { bg: 'bg-orange-50', border: 'border-orange-400', badge: 'bg-orange-400', circle: 'bg-orange-200' },
  water: { bg: 'bg-blue-50', border: 'border-blue-400', badge: 'bg-blue-400', circle: 'bg-blue-200' },
  electric: { bg: 'bg-yellow-50', border: 'border-yellow-400', badge: 'bg-yellow-400', circle: 'bg-yellow-200' },
  grass: { bg: 'bg-emerald-50', border: 'border-emerald-400', badge: 'bg-emerald-400', circle: 'bg-emerald-200' },
  ice: { bg: 'bg-cyan-50', border: 'border-cyan-400', badge: 'bg-cyan-400', circle: 'bg-cyan-200' },
  fighting: { bg: 'bg-red-50', border: 'border-red-400', badge: 'bg-red-400', circle: 'bg-red-200' },
  poison: { bg: 'bg-purple-50', border: 'border-purple-400', badge: 'bg-purple-400', circle: 'bg-purple-200' },
  ground: { bg: 'bg-amber-50', border: 'border-amber-400', badge: 'bg-amber-400', circle: 'bg-amber-200' },
  flying: { bg: 'bg-indigo-50', border: 'border-indigo-400', badge: 'bg-indigo-400', circle: 'bg-indigo-200' },
  psychic: { bg: 'bg-pink-50', border: 'border-pink-400', badge: 'bg-pink-400', circle: 'bg-pink-200' },
  bug: { bg: 'bg-lime-50', border: 'border-lime-400', badge: 'bg-lime-400', circle: 'bg-lime-200' },
  rock: { bg: 'bg-stone-50', border: 'border-stone-400', badge: 'bg-stone-400', circle: 'bg-stone-200' },
  ghost: { bg: 'bg-violet-50', border: 'border-violet-400', badge: 'bg-violet-400', circle: 'bg-violet-200' },
  dragon: { bg: 'bg-blue-100', border: 'border-blue-600', badge: 'bg-blue-600', circle: 'bg-blue-300' },
  dark: { bg: 'bg-zinc-100', border: 'border-zinc-700', badge: 'bg-zinc-700', circle: 'bg-zinc-300' },
  steel: { bg: 'bg-slate-100', border: 'border-slate-500', badge: 'bg-slate-500', circle: 'bg-slate-300' },
  fairy: { bg: 'bg-rose-50', border: 'border-rose-400', badge: 'bg-rose-400', circle: 'bg-rose-200' },
};

interface PokeCardProps {
  pokemon: PokemonListItem;
  onClick: () => void;
  index: number;
  key?: number | string;
  isCompareMode?: boolean;
  isSelectedForCompare?: boolean;
}

export default function PokeCard({ pokemon, onClick, index, isCompareMode, isSelectedForCompare }: PokeCardProps) {
  const primaryType = pokemon.types[0] || 'normal';
  const styles = typeStyles[primaryType] || typeStyles.normal;
  const { isFavorite, toggleFavorite } = useMyPokedex();
  const isFav = isFavorite(pokemon.id);

  return (
    <motion.div
      layoutId={`pokemon-card-${pokemon.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`group cursor-pointer relative ${isCompareMode ? (isSelectedForCompare ? 'ring-4 ring-indigo-500 rounded-3xl scale-105 transition-all' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all') : ''}`}
      id={`pokemon-card-${pokemon.id}`}
    >
      <div className={`${styles.bg} rounded-3xl p-6 border-b-8 ${styles.border} flex flex-col items-center transition-all duration-300 shadow-sm hover:shadow-md h-full relative`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon.id);
          }}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
        </button>
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 shadow-inner relative overflow-hidden">
          <div className={`w-24 h-24 rounded-full ${styles.circle} absolute opacity-50`} />
          <motion.img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-24 h-24 object-contain relative z-10"
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight mb-2">
          {pokemon.name}
        </h3>
        
        <div className="flex gap-2 mb-4">
          {pokemon.types.map(type => (
            <span
              key={type}
              className={`px-3 py-1 ${typeStyles[type]?.badge || 'bg-slate-400'} text-white text-[10px] font-bold rounded-full uppercase tracking-widest`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">
          ARCHIVE REF: #{pokemon.id.toString().padStart(4, '0')}
        </div>
      </div>
    </motion.div>
  );
}
