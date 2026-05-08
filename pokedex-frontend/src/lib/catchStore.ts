import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CatchState {
  caughtPokemonIds: number[];
  toggleCaught: (id: number) => void;
  markAllCaught: (ids: number[]) => void;
  resetAll: () => void;
}

export const useCatchStore = create<CatchState>()(
  persist(
    (set) => ({
      caughtPokemonIds: [],
      toggleCaught: (id) => set((state) => {
        const exists = state.caughtPokemonIds.includes(id);
        return {
          caughtPokemonIds: exists
            ? state.caughtPokemonIds.filter((pId) => pId !== id)
            : [...state.caughtPokemonIds, id],
        };
      }),
      markAllCaught: (ids) => set((state) => {
        const newCaught = Array.from(new Set([...state.caughtPokemonIds, ...ids]));
        return { caughtPokemonIds: newCaught };
      }),
      resetAll: () => set({ caughtPokemonIds: [] }),
    }),
    {
      name: 'pokedex-catch-tracker',
    }
  )
);
