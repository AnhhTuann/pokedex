import { create } from 'zustand';

export interface TeamMember {
  id: number;
  name: string;
  image: string;
  types: string[];
  selectedAbility?: string | null;
  selectedItem?: string | null;
  selectedNature?: string | null;
  allAbilities?: string[];
  allMoves?: any[];
  stats?: Array<{ name: string; value: number }>;
  moves: any[];
}

interface TeamState {
  team: TeamMember[];
  isShinyMode: boolean;
  selectedVersion: string;
  addMember: (pokemon: Omit<TeamMember, 'moves' | 'selectedAbility' | 'selectedItem' | 'selectedNature'>) => void;
  removeMember: (id: number) => void;
  reorderTeam: (startIndex: number, endIndex: number) => void;
  setMoves: (pokemonId: number, moves: any[]) => void;
  setAbility: (pokemonId: number, ability: string | null) => void;
  setItem: (pokemonId: number, item: string | null) => void;
  setNature: (pokemonId: number, nature: string | null) => void;
  updateMemberDetails: (pokemonId: number, details: Partial<TeamMember>) => void;
  setTeam: (team: TeamMember[]) => void;
  toggleShinyMode: () => void;
  setSelectedVersion: (version: string) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  team: [],
  isShinyMode: false,
  selectedVersion: "ALL",
  setTeam: (team) => set({ team }),
  addMember: (pokemon) => set((state) => {
    if (state.team.length >= 6) return state;
    if (state.team.find(p => p.id === pokemon.id)) return state;
    return {
      team: [...state.team, {
        ...pokemon,
        moves: [],
        selectedAbility: null,
        selectedItem: null,
        selectedNature: null
      }]
    };
  }),
  removeMember: (id) => set((state) => ({
    team: state.team.filter(p => p.id !== id)
  })),
  reorderTeam: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.team);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { team: result };
  }),
  setMoves: (pokemonId, moves) => set((state) => ({
    team: state.team.map(p => p.id === pokemonId ? { ...p, moves: moves.slice(0, 4) } : p)
  })),
  setAbility: (pokemonId, ability) => set((state) => ({
    team: state.team.map(p => p.id === pokemonId ? { ...p, selectedAbility: ability } : p)
  })),
  setItem: (pokemonId, item) => set((state) => ({
    team: state.team.map(p => p.id === pokemonId ? { ...p, selectedItem: item } : p)
  })),
  setNature: (pokemonId, nature) => set((state) => ({
    team: state.team.map(p => p.id === pokemonId ? { ...p, selectedNature: nature } : p)
  })),
  updateMemberDetails: (pokemonId, details) => set((state) => ({
    team: state.team.map(p => p.id === pokemonId ? { ...p, ...details } : p)
  })),
  toggleShinyMode: () => set((state) => ({ isShinyMode: !state.isShinyMode })),
  setSelectedVersion: (version) => set({ selectedVersion: version })
}));
