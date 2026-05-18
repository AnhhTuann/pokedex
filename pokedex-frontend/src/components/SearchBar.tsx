import React from "react";
import { Search } from "lucide-react";
import { InputField } from "./common/InputField";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  typeValue: string;
  onTypeChange: (v: string) => void;
  genValue?: number | null;
  onGenChange?: (v: number | null) => void;
}

const POKEMON_TYPES = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
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
  value,
  onChange,
  typeValue,
  onTypeChange,
  genValue,
  onGenChange,
}: SearchBarProps) {
  const handleGenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onGenChange?.(val === "all" ? null : Number(val));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <InputField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or #..."
          icon={<Search size={18} />}
        />
      </div>

      <div className={styles.dropdownGroup}>
        <div className={styles.dropdownWrapper}>
          <select
            value={typeValue}
            onChange={(e) => onTypeChange(e.target.value)}
            className={styles.select}
            aria-label="Filter by Type"
          >
            <option value="">All Types</option>
            {POKEMON_TYPES.map((t) => (
              <option key={t} value={t.toLowerCase()}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.dropdownWrapper}>
          <select
            value={genValue ?? "all"}
            onChange={handleGenChange}
            className={styles.select}
            aria-label="Filter by Generation"
          >
            {GENERATIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
