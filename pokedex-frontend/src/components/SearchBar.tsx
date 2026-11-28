import React, { useRef } from "react";
import { Search, X } from "lucide-react";
import { InputField } from "./common/InputField";
import styles from "../styles/components/SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  typeValue: string;
  onTypeChange: (v: string) => void;
  genValue?: number | null;
  onGenChange?: (v: number | null) => void;
}

const POKEMON_TYPES = [
  "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison",
  "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy",
];

const GENERATIONS = [
  { value: "all", label: "All Gens" },
  { value: 1, label: "Gen 1 · Kanto" },
  { value: 2, label: "Gen 2 · Johto" },
  { value: 3, label: "Gen 3 · Hoenn" },
  { value: 4, label: "Gen 4 · Sinnoh" },
  { value: 5, label: "Gen 5 · Unova" },
  { value: 6, label: "Gen 6 · Kalos" },
  { value: 7, label: "Gen 7 · Alola" },
  { value: 8, label: "Gen 8 · Galar" },
  { value: 9, label: "Gen 9 · Paldea" },
];

export default function SearchBar({
  value, onChange, typeValue, onTypeChange, genValue, onGenChange,
}: SearchBarProps) {
  const searchRef = useRef<HTMLInputElement>(null);


  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <InputField
          ref={searchRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or Pokédex number..."
          aria-label="Search Pokémon by name or number"
          icon={<Search size={18} />}
        />
        {value && (
          <button
            type="button"
            className={styles.searchClearBtn}
            onClick={() => { onChange(""); searchRef.current?.focus(); }}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className={styles.dropdownGroup}>
        <select className={styles.filterSelect} aria-label="Filter by type" value={typeValue} onChange={event => onTypeChange(event.target.value)}>
          <option value="">All types</option>
          {POKEMON_TYPES.map(type => <option key={type} value={type.toLowerCase()}>{type}</option>)}
        </select>

        <select className={styles.filterSelect} aria-label="Filter by generation" value={genValue ?? 'all'} onChange={event => onGenChange?.(event.target.value === 'all' ? null : Number(event.target.value))}>
          {GENERATIONS.map(generation => <option key={generation.value} value={generation.value}>{generation.label}</option>)}
        </select>
      </div>
    </div>
  );
}
