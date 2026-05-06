import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  typeValue: string;
  onTypeChange: (value: string) => void;
}

const POKEMON_TYPES = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 
  'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

export default function SearchBar({ value, onChange, typeValue, onTypeChange }: SearchBarProps) {
  return (
    <div className="flex gap-4">
      <div className="relative group flex-1">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
          <Search className="w-6 h-6" />
        </div>
        <input
          type="text"
          placeholder="SEARCH BY NAME OR ID..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 pl-14 pr-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:border-indigo-500 outline-none transition-colors text-lg font-medium placeholder:text-slate-400"
        />
      </div>
      
      <select 
        value={typeValue}
        onChange={(e) => onTypeChange(e.target.value)}
        className="h-14 px-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:border-indigo-500 outline-none text-lg font-medium uppercase text-slate-600 cursor-pointer min-w-[200px]"
      >
        <option value="">A L L  T Y P E S</option>
        {POKEMON_TYPES.map(t => (
          <option key={t} value={t.toLowerCase()}>{t}</option>
        ))}
      </select>
    </div>
  );
}
