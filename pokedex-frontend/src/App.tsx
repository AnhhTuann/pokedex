import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import PokemonDex from './components/PokemonDex';
import LocationDex from './components/LocationDex';
import TypeDex from './components/TypeDex';
import MoveDex from './components/MoveDex';
import AbilityDex from './components/AbilityDex';
import ItemDex from './components/ItemDex';
import NatureDex from './components/NatureDex';
import TeamBuilder from './components/TeamBuilder';
import CatchTracker from './components/CatchTracker';
import DamageCalculator from './components/DamageCalculator';
import Walkthrough from './components/Walkthrough';
import AdminWalkthrough from './components/AdminWalkthrough';

export const VERSION_COLORS: Record<string, string> = {
  ALL: '#6b7280',
  red: '#ef4444',
  blue: '#3b82f6',
  yellow: '#eab308',
  gold: '#fbbf24',
  silver: '#9ca3af',
  crystal: '#06b6d4',
  ruby: '#dc2626',
  sapphire: '#2563eb',
  emerald: '#10b981',
  firered: '#ea580c',
  leafgreen: '#16a34a',
  diamond: '#a5f3fc',
  pearl: '#f472b6',
  platinum: '#4b5563',
  heartgold: '#d97706',
  soulsilver: '#64748b',
  black: '#1f2937',
  white: '#9ca3af',
  'black-2': '#111827',
  'white-2': '#e5e7eb',
  x: '#2563eb',
  y: '#dc2626',
  'omega-ruby': '#ea580c',
  'alpha-sapphire': '#1e40af',
  sun: '#f59e0b',
  moon: '#4338ca',
  'ultra-sun': '#d97706',
  'ultra-moon': '#312e81',
  sword: '#06b6d4',
  shield: '#e11d48',
  scarlet: '#be123c',
  violet: '#6d28d9',
};

export const GENERATION_VERSIONS = [
  {
    gen: "Generation I",
    games: [
      { name: "red", label: "Red" },
      { name: "blue", label: "Blue" },
      { name: "yellow", label: "Yellow" }
    ]
  },
  {
    gen: "Generation II",
    games: [
      { name: "gold", label: "Gold" },
      { name: "silver", label: "Silver" },
      { name: "crystal", label: "Crystal" }
    ]
  },
  {
    gen: "Generation III",
    games: [
      { name: "ruby", label: "Ruby" },
      { name: "sapphire", label: "Sapphire" },
      { name: "emerald", label: "Emerald" },
      { name: "firered", label: "FireRed" },
      { name: "leafgreen", label: "LeafGreen" }
    ]
  },
  {
    gen: "Generation IV",
    games: [
      { name: "diamond", label: "Diamond" },
      { name: "pearl", label: "Pearl" },
      { name: "platinum", label: "Platinum" },
      { name: "heartgold", label: "HeartGold" },
      { name: "soulsilver", label: "SoulSilver" }
    ]
  },
  {
    gen: "Generation V",
    games: [
      { name: "black", label: "Black" },
      { name: "white", label: "White" },
      { name: "black-2", label: "Black 2" },
      { name: "white-2", label: "White 2" }
    ]
  },
  {
    gen: "Generation VI",
    games: [
      { name: "x", label: "X" },
      { name: "y", label: "Y" },
      { name: "omega-ruby", label: "Omega Ruby" },
      { name: "alpha-sapphire", label: "Alpha Sapphire" }
    ]
  },
  {
    gen: "Generation VII",
    games: [
      { name: "sun", label: "Sun" },
      { name: "moon", label: "Moon" },
      { name: "ultra-sun", label: "Ultra Sun" },
      { name: "ultra-moon", label: "Ultra Moon" }
    ]
  },
  {
    gen: "Generation VIII",
    games: [
      { name: "sword", label: "Sword" },
      { name: "shield", label: "Shield" }
    ]
  },
  {
    gen: "Generation IX",
    games: [
      { name: "scarlet", label: "Scarlet" },
      { name: "violet", label: "Violet" }
    ]
  }
];

export const GAME_TO_REGIONAL_DEX: Record<string, string> = {
  red: 'kanto',
  blue: 'kanto',
  yellow: 'kanto',
  gold: 'original-johto',
  silver: 'original-johto',
  crystal: 'original-johto',
  ruby: 'hoenn',
  sapphire: 'hoenn',
  emerald: 'hoenn',
  firered: 'kanto',
  leafgreen: 'kanto',
  diamond: 'original-sinnoh',
  pearl: 'original-sinnoh',
  platinum: 'extended-sinnoh',
  heartgold: 'updated-johto',
  soulsilver: 'updated-johto',
  black: 'original-unova',
  white: 'original-unova',
  'black-2': 'updated-unova',
  'white-2': 'updated-unova',
  x: 'kalos-central',
  y: 'kalos-central',
  'omega-ruby': 'hoenn',
  'alpha-sapphire': 'hoenn',
  sun: 'original-alola',
  moon: 'original-alola',
  'ultra-sun': 'updated-alola',
  'ultra-moon': 'updated-alola',
  sword: 'galar',
  shield: 'galar',
  scarlet: 'paldea',
  violet: 'paldea',
};

export function getRegionAndGame(versionName: string) {
  const game = versionName.toLowerCase();
  if (game === 'all') {
    return { region: 'ALL', game: 'ALL' };
  }
  const region = GAME_TO_REGIONAL_DEX[game] || game;
  return { region, game };
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<PokemonDex />} />
        <Route path="/moves" element={<MoveDex />} />
        <Route path="/abilities" element={<AbilityDex />} />
        <Route path="/items" element={<ItemDex />} />
        <Route path="/locations" element={<LocationDex />} />
        <Route path="/types" element={<TypeDex />} />
        <Route path="/natures" element={<NatureDex />} />
        <Route path="/teambuilder" element={<TeamBuilder />} />
        <Route path="/tracker" element={<CatchTracker />} />
        <Route path="/calculator" element={<DamageCalculator />} />
        <Route path="/walkthrough" element={<Walkthrough />} />
        <Route path="/admin/walkthrough" element={<AdminWalkthrough />} />
      </Route>
    </Routes>
  );
}
