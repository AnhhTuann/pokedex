import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
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
  red: '#E3350D',
  blue: '#1B53BA',
  yellow: '#F5C518',
  gold: '#D4AF37',       // Genuine metallic gold
  silver: '#A9B0B3',     // Elegant sleek metallic silver
  crystal: '#4FC1E9',
  ruby: '#C0392B',       // Authentic gemstone ruby
  sapphire: '#0F52BA',   // Royal gemstone sapphire
  emerald: '#00A86B',    // Brilliant gemstone emerald
  firered: '#FF4500',
  leafgreen: '#32CD32',
  diamond: '#5DADE2',
  pearl: '#FF8FA3',      // Lustrous pearl pink
  platinum: '#8A9597',
  heartgold: '#B8860B',
  soulsilver: '#708090',
  black: '#1F2937',
  white: '#E5E7EB',
  'black-2': '#111827',
  'white-2': '#F3F4F6',
  x: '#0066CC',
  y: '#CC0000',
  'omega-ruby': '#ea580c',
  'alpha-sapphire': '#1e40af',
  sun: '#f59e0b',
  moon: '#4338ca',
  'ultra-sun': '#d97706',
  'ultra-moon': '#312e81',
  'lets-go-pikachu': '#facc15',
  'lets-go-eevee': '#b45309',
  sword: '#00A2E8',
  shield: '#e11d48',
  'brilliant-diamond': '#00A2E8',
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

export function getGameGeneration(versionName: string): number {
  const nameLower = versionName.toLowerCase();
  if (nameLower === 'all') return 9;
  
  const genMap: Record<string, number> = {
    red: 1, blue: 1, yellow: 1,
    gold: 2, silver: 2, crystal: 2,
    ruby: 3, sapphire: 3, emerald: 3, firered: 3, leafgreen: 3,
    diamond: 4, pearl: 4, platinum: 4, heartgold: 4, soulsilver: 4,
    black: 5, white: 5, 'black-2': 5, 'white-2': 5,
    x: 6, y: 6, 'omega-ruby': 6, 'alpha-sapphire': 6,
    sun: 7, moon: 7, 'ultra-sun': 7, 'ultra-moon': 7, 'lets-go-pikachu': 7, 'lets-go-eevee': 7,
    sword: 8, shield: 8, 'brilliant-diamond': 8, 'shining-pearl': 8, 'legends-arceus': 8,
    scarlet: 9, violet: 9, 'legends-za': 9
  };
  
  return genMap[nameLower] || 9;
}

export function getRegionAndGame(versionName: string) {
  const game = versionName.toLowerCase();
  if (game === 'all') {
    return { region: 'ALL', game: 'ALL' };
  }
  const region = GAME_TO_REGIONAL_DEX[game] || game;
  return { region, game };
}

function hexToRgb(hex: string): string {
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const num = parseInt(c, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

export function getVersionDisplayName(versionName: string): string {
  const nameLower = versionName.toLowerCase();
  if (nameLower === 'all') return 'ALL VERSIONS';
  
  for (const g of GENERATION_VERSIONS) {
    for (const row of g.rows) {
      if (row.type === 'pair') {
        const hasGame = row.games.some(g => g.name.toLowerCase() === nameLower);
        if (hasGame) {
          return row.games.map(g => g.label).join(' / ');
        }
      } else {
        const game = row.games.find(g => g.name.toLowerCase() === nameLower);
        if (game) return game.label;
      }
    }
  }
  return versionName;
}

export function getVersionColorStyle(versionName: string) {
  const nameLower = versionName.toLowerCase();
  if (nameLower === 'all') {
    return {
      bg: '#4b5563',
      text: '#ffffff',
      shadow: 'rgba(75, 85, 99, 0.3)',
      isGradient: false
    };
  }
  
  for (const g of GENERATION_VERSIONS) {
    for (const row of g.rows) {
      if (row.type === 'pair') {
        const hasGame = row.games.some(g => g.name.toLowerCase() === nameLower);
        if (hasGame) {
          const c1 = VERSION_COLORS[row.games[0].name] || '#6366f1';
          const c2 = VERSION_COLORS[row.games[1].name] || '#6366f1';
          return {
            bg: `linear-gradient(90deg, ${c1} 50%, ${c2} 50%)`,
            text: '#ffffff',
            shadow: `rgba(${hexToRgb(c1)}, 0.3)`,
            isGradient: true,
            c1,
            c2
          };
        }
      } else {
        const game = row.games.find(g => g.name.toLowerCase() === nameLower);
        if (game) {
          const c = VERSION_COLORS[game.name] || '#6366f1';
          
          let contrastColor = '#ffffff';
          const cLower = c.toLowerCase();
          if (cLower === '#eab308' || cLower === '#fbbf24' || cLower === '#a5f3fc' || cLower === '#e5e7eb' || cLower === '#ffffff') {
            contrastColor = '#0f172a';
          }
          
          return {
            bg: c,
            text: contrastColor,
            shadow: `rgba(${hexToRgb(c)}, 0.4)`,
            isGradient: false
          };
        }
      }
    }
  }
  
  const c = VERSION_COLORS[versionName] || '#6366f1';
  return {
    bg: c,
    text: '#ffffff',
    shadow: `rgba(${hexToRgb(c)}, 0.4)`,
    isGradient: false
  };
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
    style={{ width: '100%', height: '100%' }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageWrapper><PokemonDex /></PageWrapper>} />
          <Route path="/moves" element={<PageWrapper><MoveDex /></PageWrapper>} />
          <Route path="/abilities" element={<PageWrapper><AbilityDex /></PageWrapper>} />
          <Route path="/items" element={<PageWrapper><ItemDex /></PageWrapper>} />
          <Route path="/locations" element={<PageWrapper><LocationDex /></PageWrapper>} />
          <Route path="/types" element={<PageWrapper><TypeDex /></PageWrapper>} />
          <Route path="/natures" element={<PageWrapper><NatureDex /></PageWrapper>} />
          <Route path="/teambuilder" element={<PageWrapper><TeamBuilder /></PageWrapper>} />
          <Route path="/tracker" element={<PageWrapper><CatchTracker /></PageWrapper>} />
          <Route path="/calculator" element={<PageWrapper><DamageCalculator /></PageWrapper>} />
          <Route path="/walkthrough" element={<PageWrapper><Walkthrough /></PageWrapper>} />
          <Route path="/admin/walkthrough" element={<PageWrapper><AdminWalkthrough /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
