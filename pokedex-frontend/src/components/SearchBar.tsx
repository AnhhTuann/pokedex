import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import { InputField } from "./common/InputField";
import { cn } from "../lib/utils";
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
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isGenOpen, setIsGenOpen] = useState(false);
  
  const typeRef = useRef<HTMLDivElement>(null);
  const genRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false);
      }
      if (genRef.current && !genRef.current.contains(event.target as Node)) {
        setIsGenOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        {/* Custom Type Filter */}
        <div className={styles.dropdownWrapper} ref={typeRef}>
          <div className={styles.customSelectContainer}>
            <button
              type="button"
              className={cn(styles.customSelectTrigger, isTypeOpen && styles.active)}
              onClick={() => {
                setIsTypeOpen(!isTypeOpen);
                setIsGenOpen(false);
              }}
              aria-label="Filter by Type"
            >
              <span>
                {typeValue
                  ? typeValue.charAt(0).toUpperCase() + typeValue.slice(1)
                  : "All Types"}
              </span>
              <ChevronDown
                size={16}
                className={cn(styles.arrowIcon, isTypeOpen && styles.rotated)}
              />
            </button>
            
            {isTypeOpen && (
              <div className={styles.customDropdown}>
                <div
                  className={cn(
                    styles.dropdownOption,
                    !typeValue && styles.selectedOption
                  )}
                  onClick={() => {
                    onTypeChange("");
                    setIsTypeOpen(false);
                  }}
                >
                  All Types
                </div>
                {POKEMON_TYPES.map((t) => (
                  <div
                    key={t}
                    className={cn(
                      styles.dropdownOption,
                      typeValue === t.toLowerCase() && styles.selectedOption
                    )}
                    onClick={() => {
                      onTypeChange(t.toLowerCase());
                      setIsTypeOpen(false);
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom Gen Filter */}
        <div className={styles.dropdownWrapper} ref={genRef}>
          <div className={styles.customSelectContainer}>
            <button
              type="button"
              className={cn(styles.customSelectTrigger, isGenOpen && styles.active)}
              onClick={() => {
                setIsGenOpen(!isGenOpen);
                setIsTypeOpen(false);
              }}
              aria-label="Filter by Generation"
            >
              <span>
                {genValue !== null && genValue !== undefined
                  ? GENERATIONS.find((g) => g.value === genValue)?.label
                  : "All Gens"}
              </span>
              <ChevronDown
                size={16}
                className={cn(styles.arrowIcon, isGenOpen && styles.rotated)}
              />
            </button>
            
            {isGenOpen && (
              <div className={styles.customDropdown}>
                {GENERATIONS.map((g) => (
                  <div
                    key={g.value}
                    className={cn(
                      styles.dropdownOption,
                      ((genValue === g.value) || (genValue === null && g.value === "all")) && styles.selectedOption
                    )}
                    onClick={() => {
                      onGenChange?.(g.value === "all" ? null : Number(g.value));
                      setIsGenOpen(false);
                    }}
                  >
                    {g.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
