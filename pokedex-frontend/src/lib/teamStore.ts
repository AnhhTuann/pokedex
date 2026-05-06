import { create } from 'zustand';

export interface TeamMember {
  id: number;
  name: string;
  image: string;
  types: string[];
  moves: any[];
}

interface TeamState {
  team: TeamMember[];
  isShinyMode: boolean;
  selectedVersion: string;
  addMember: (pokemon: Omit<TeamMember, 'moves'>) => void;
  removeMember: (id: number) => void;
  reorderTeam: (startIndex: number, endIndex: number) => void;
  setMoves: (pokemonId: number, moves: any[]) => void;
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
      team: [...state.team, { ...pokemon, moves: [] }]
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
    team: state.team.map(p => p.id === pokemonId ? { ...p, moves } : p)
  })),
  toggleShinyMode: () => set((state) => ({ isShinyMode: !state.isShinyMode })),
  setSelectedVersion: (version) => set({ selectedVersion: version })
}));
