import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import PokemonDex from './pages/PokemonDex';
import LocationDex from './pages/LocationDex';
import TypeDex from './pages/TypeDex';
import MoveDex from './pages/MoveDex';
import AbilityDex from './pages/AbilityDex';
import ItemDex from './pages/ItemDex';
import NatureDex from './pages/NatureDex';
import TeamBuilder from './pages/TeamBuilder';
import CatchTracker from './pages/CatchTracker';
import DamageCalculator from './pages/DamageCalculator';
import Walkthrough from './pages/Walkthrough';
import AdminWalkthrough from './pages/AdminWalkthrough';

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
  'lets-go-pikachu': '#facc15',
  'lets-go-eevee': '#b45309',
  sword: '#06b6d4',
  shield: '#e11d48',
  'brilliant-diamond': '#06b6d4',
  'shining-pearl': '#ec4899',
  'legends-arceus': '#fbbf24',
  scarlet: '#be123c',
  violet: '#6d28d9',
  'legends-za': '#22c55e',
};

export type GameVersionRow = {
  type: 'pair' | 'single';
  games: { name: string; label: string }[];
};

export interface GenerationGroup {
  gen: string;
  rows: GameVersionRow[];
}

export const GENERATION_VERSIONS: GenerationGroup[] = [
  {
    gen: "Generation I",
    rows: [
      { type: 'pair', games: [{ name: "red", label: "Red" }, { name: "blue", label: "Blue" }] },
      { type: 'single', games: [{ name: "yellow", label: "Yellow" }] }
    ]
  },
  {
    gen: "Generation II",
    rows: [
      { type: 'pair', games: [{ name: "gold", label: "Gold" }, { name: "silver", label: "Silver" }] },
      { type: 'single', games: [{ name: "crystal", label: "Crystal" }] }
    ]
  },
  {
    gen: "Generation III",
    rows: [
      { type: 'pair', games: [{ name: "ruby", label: "Ruby" }, { name: "sapphire", label: "Sapphire" }] },
      { type: 'single', games: [{ name: "emerald", label: "Emerald" }] },
      { type: 'pair', games: [{ name: "firered", label: "FireRed" }, { name: "leafgreen", label: "LeafGreen" }] }
    ]
  },
  {
    gen: "Generation IV",
    rows: [
      { type: 'pair', games: [{ name: "diamond", label: "Diamond" }, { name: "pearl", label: "Pearl" }] },
      { type: 'single', games: [{ name: "platinum", label: "Platinum" }] },
      { type: 'pair', games: [{ name: "heartgold", label: "HeartGold" }, { name: "soulsilver", label: "SoulSilver" }] }
    ]
  },
  {
    gen: "Generation V",
    rows: [
      { type: 'pair', games: [{ name: "black", label: "Black" }, { name: "white", label: "White" }] },
      { type: 'pair', games: [{ name: "black-2", label: "Black 2" }, { name: "white-2", label: "White 2" }] }
    ]
  },
  {
    gen: "Generation VI",
    rows: [
      { type: 'pair', games: [{ name: "x", label: "X" }, { name: "y", label: "Y" }] },
      { type: 'pair', games: [{ name: "omega-ruby", label: "Omega Ruby" }, { name: "alpha-sapphire", label: "Alpha Sapphire" }] }
    ]
  },
  {
    gen: "Generation VII",
    rows: [
      { type: 'pair', games: [{ name: "sun", label: "Sun" }, { name: "moon", label: "Moon" }] },
      { type: 'pair', games: [{ name: "ultra-sun", label: "Ultra Sun" }, { name: "ultra-moon", label: "Ultra Moon" }] },
      { type: 'pair', games: [{ name: "lets-go-pikachu", label: "Let's Go Pikachu" }, { name: "lets-go-eevee", label: "Let's Go Eevee" }] }
    ]
  },
  {
    gen: "Generation VIII",
    rows: [
      { type: 'pair', games: [{ name: "sword", label: "Sword" }, { name: "shield", label: "Shield" }] },
      { type: 'pair', games: [{ name: "brilliant-diamond", label: "Brilliant Diamond" }, { name: "shining-pearl", label: "Shining Pearl" }] },
      { type: 'single', games: [{ name: "legends-arceus", label: "Legends: Arceus" }] }
    ]
  },
  {
    gen: "Generation IX",
    rows: [
      { type: 'pair', games: [{ name: "scarlet", label: "Scarlet" }, { name: "violet", label: "Violet" }] },
      { type: 'single', games: [{ name: "legends-za", label: "Legends: Z-A" }] }
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
  'lets-go-pikachu': 'letsgo-kanto',
  'lets-go-eevee': 'letsgo-kanto',
  sword: 'galar',
  shield: 'galar',
  'brilliant-diamond': 'original-sinnoh',
  'shining-pearl': 'original-sinnoh',
  'legends-arceus': 'hisui',
  scarlet: 'paldea',
  violet: 'paldea',
  'legends-za': 'kalos-central',
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
