import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
        <Search className="w-6 h-6" />
      </div>
      <input
        type="text"
        placeholder="SEARCH BY NAME OR TYPE..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 pl-14 pr-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:border-indigo-500 outline-none transition-colors text-lg font-medium placeholder:text-slate-400"
      />
    </div>
  );
}
