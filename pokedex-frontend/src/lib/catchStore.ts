import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CatchState {
  caughtPokemonIds: number[];
  shinyPokemonIds: number[];
  toggleCaught: (id: number) => void;
  toggleShiny: (id: number) => void;
  markAllCaught: (ids: number[]) => void;
  resetAll: () => void;
}

export const useCatchStore = create<CatchState>()(
  persist(
    (set) => ({
      caughtPokemonIds: [],
      shinyPokemonIds: [],
      toggleCaught: (id) => set((state) => {
        const exists = state.caughtPokemonIds.includes(id);
        return {
          caughtPokemonIds: exists
            ? state.caughtPokemonIds.filter((pId) => pId !== id)
            : [...state.caughtPokemonIds, id],
        };
      }),
      toggleShiny: (id) => set((state) => {
        const isShiny = state.shinyPokemonIds.includes(id);
        const nextShiny = isShiny
          ? state.shinyPokemonIds.filter((pId) => pId !== id)
          : [...state.shinyPokemonIds, id];

        // If marked as shiny, automatically mark as caught
        const nextCaught = !isShiny && !state.caughtPokemonIds.includes(id)
          ? [...state.caughtPokemonIds, id]
          : state.caughtPokemonIds;

        return {
          shinyPokemonIds: nextShiny,
          caughtPokemonIds: nextCaught,
        };
      }),
      markAllCaught: (ids) => set((state) => {
        const newCaught = Array.from(new Set([...state.caughtPokemonIds, ...ids]));
        return { caughtPokemonIds: newCaught };
      }),
      resetAll: () => set({ caughtPokemonIds: [], shinyPokemonIds: [] }),
    }),
    {
      name: 'pokedex-catch-tracker',
    }
  )
);
