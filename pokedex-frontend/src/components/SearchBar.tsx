import React from 'react';
import { Search } from 'lucide-react';
import { InputField } from './common/InputField';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  typeValue: string;
  onTypeChange: (v: string) => void;
  genValue?: number | null;
  onGenChange?: (v: number | null) => void;
}

const POKEMON_TYPES = [
  'Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison',
  'Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'
];

const GENERATIONS = [
  { value: 'all', label: 'All Gens' },
  { value: 1, label: 'Gen 1 · Kanto' },
  { value: 2, label: 'Gen 2 · Johto' },
  { value: 3, label: 'Gen 3 · Hoenn' },
  { value: 4, label: 'Gen 4 · Sinnoh' },
  { value: 5, label: 'Gen 5 · Unova' },
  { value: 6, label: 'Gen 6 · Kalos' },
  { value: 7, label: 'Gen 7 · Alola' },
  { value: 8, label: 'Gen 8 · Galar' },
  { value: 9, label: 'Gen 9 · Paldea' },
];

export default function SearchBar({ value, onChange, typeValue, onTypeChange, genValue, onGenChange }: SearchBarProps) {
  const handleGenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onGenChange?.(val === 'all' ? null : Number(val));
  };

  const selectClasses = "flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100";

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
      <div className="w-full sm:flex-2 sm:min-w-[160px]">
        <InputField
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search by name or #..."
          icon={<Search className="w-5 h-5" />}
        />
      </div>

      <div className="flex flex-row gap-3 w-full sm:flex-3">
        <div className="w-full flex-1 min-w-0">
          <select
            value={typeValue}
            onChange={e => onTypeChange(e.target.value)}
            className={selectClasses}
            aria-label="Filter by Type"
          >
            <option value="">All Types</option>
            {POKEMON_TYPES.map(t => (
              <option key={t} value={t.toLowerCase()}>{t}</option>
            ))}
          </select>
        </div>

        <div className="w-full flex-1 min-w-0">
          <select
            value={genValue ?? 'all'}
            onChange={handleGenChange}
            className={selectClasses}
            aria-label="Filter by Generation"
          >
            {GENERATIONS.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
