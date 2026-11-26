import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";
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

type FilterOption = { value: string; label: string };

function FilterDropdown({ label, options, value, open, onToggle, onSelect }: {
  label: string;
  options: FilterOption[];
  value: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = React.useId();
  const selected = options.find(option => option.value === value) ?? options[0];

  const choose = (next: string) => {
    onSelect(next);
    triggerRef.current?.focus();
  };

  return (
    <div className={styles.dropdownWrapper} onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        event.stopPropagation();
        onToggle();
        triggerRef.current?.focus();
      }
    }}>
      <button ref={triggerRef} type="button" className={styles.customSelectTrigger}
        aria-label={`Filter by ${label}`} aria-expanded={open} aria-controls={open ? menuId : undefined}
        data-has-value={!!value} onClick={onToggle}>
        <span className={styles.triggerText}>{selected.label}</span>
        <ChevronDown size={16} className={cn(styles.arrowIcon, open && styles.rotated)} />
      </button>
      {value && <button type="button" className={styles.clearButton} onClick={() => choose('')}
        aria-label={`Clear ${label} Filter`}><X size={14} /></button>}
      {open && (
        <div className={styles.customDropdown} id={menuId} role="group" aria-label={`${label} options`}>
          {options.map(option => (
            <button type="button" key={option.value} onClick={() => choose(option.value)}
              aria-pressed={option.value === value}
              className={cn(styles.dropdownOption, option.value === value && styles.selectedOption)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const typeOptions = [{ value: '', label: 'All Types' },
  ...POKEMON_TYPES.map(label => ({ value: label.toLowerCase(), label }))];
const generationOptions = GENERATIONS.map(option => ({
  value: option.value === 'all' ? '' : String(option.value), label: option.label,
}));

export default function SearchBar({
  value, onChange, typeValue, onTypeChange, genValue, onGenChange,
}: SearchBarProps) {
  const [openFilter, setOpenFilter] = useState<'type' | 'generation' | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!filtersRef.current?.contains(event.target as Node)) setOpenFilter(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <InputField value={value} onChange={event => onChange(event.target.value)}
          placeholder="Search by name or #..." aria-label="Search Pokémon by name or National Dex number"
          icon={<Search size={18} />} />
      </div>
      <div className={styles.dropdownGroup} ref={filtersRef}>
        <FilterDropdown label="Type" value={typeValue} options={typeOptions} open={openFilter === 'type'}
          onToggle={() => setOpenFilter(current => current === 'type' ? null : 'type')}
          onSelect={next => { onTypeChange(next); setOpenFilter(null); }} />
        <FilterDropdown label="Generation" value={genValue == null ? '' : String(genValue)}
          options={generationOptions} open={openFilter === 'generation'}
          onToggle={() => setOpenFilter(current => current === 'generation' ? null : 'generation')}
          onSelect={next => { onGenChange?.(next ? Number(next) : null); setOpenFilter(null); }} />
      </div>
    </div>
  );
}
