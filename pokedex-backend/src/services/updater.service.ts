import { prisma } from '../db/prisma.js';
import { downloadAndOptimizeImage } from './image.service.js';

interface UpdateStatus {
  type: string;
  localCount: number;
  apiCount: number;
  hasUpdate: boolean;
}

export const updaterService = {
  async checkUpdates(): Promise<UpdateStatus[]> {
    const statuses: UpdateStatus[] = [];

    // 1. Check Pokemon
    const localPokemonCount = await prisma.pokemon.count();
    const pokeRes = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1');
    const pokeData = await pokeRes.json();
    statuses.push({
      type: 'pokemon',
      localCount: localPokemonCount,
      apiCount: pokeData.count,
      hasUpdate: pokeData.count > localPokemonCount
    });

    // 2. Check Items
    const localItemCount = await prisma.item.count();
    const itemRes = await fetch('https://pokeapi.co/api/v2/item?limit=1');
    const itemData = await itemRes.json();
    statuses.push({
      type: 'item',
      localCount: localItemCount,
      apiCount: itemData.count,
      hasUpdate: itemData.count > localItemCount
    });

    // 3. Check Abilities
    const localAbilityCount = await prisma.ability.count();
    const abilityRes = await fetch('https://pokeapi.co/api/v2/ability?limit=1');
    const abilityData = await abilityRes.json();
    statuses.push({
      type: 'ability',
      localCount: localAbilityCount,
      apiCount: abilityData.count,
      hasUpdate: abilityData.count > localAbilityCount
    });

    return statuses;
  },

  async syncNewData(): Promise<boolean> {
    console.log("Starting data synchronization...");
    const statuses = await this.checkUpdates();

    for (const status of statuses) {
      if (status.hasUpdate) {
        console.log(`Syncing ${status.type}... (${status.localCount} -> ${status.apiCount})`);
        
        if (status.type === 'pokemon') {
          for (let id = status.localCount + 1; id <= status.apiCount; id++) {
            await this.syncPokemon(id);
          }
        } else if (status.type === 'item') {
          for (let id = status.localCount + 1; id <= status.apiCount; id++) {
            await this.syncItem(id);
          }
        } else if (status.type === 'ability') {
          for (let id = status.localCount + 1; id <= status.apiCount; id++) {
            await this.syncAbility(id);
          }
        }
      }
    }
    console.log("Synchronization complete.");
    return true;
  },

  async syncPokemon(id: number) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) return;
      const data = await res.json();

      let localImageUrl = null;
      let localShinyUrl = null;

      if (data.sprites?.other?.['official-artwork']?.front_default) {
        localImageUrl = await downloadAndOptimizeImage(
          data.sprites.other['official-artwork'].front_default, 
          `pokemon/normal/${data.name}.webp`
        );
      }

      if (data.sprites?.other?.['official-artwork']?.front_shiny) {
        localShinyUrl = await downloadAndOptimizeImage(
          data.sprites.other['official-artwork'].front_shiny, 
          `pokemon/shiny/${data.name}.webp`
        );
      }

      // Simplified insertion for new pokemons to demonstrate sync
      // (in production, we would fetch species data, moves, types, etc.)
      await prisma.pokemon.upsert({
        where: { pokedexNumber: id },
        update: {
          imageUrl: localImageUrl,
          shinyImageUrl: localShinyUrl
        },
        create: {
          pokedexNumber: id,
          name: data.name,
          hp: data.stats.find((s:any) => s.stat.name === 'hp')?.base_stat || 0,
          attack: data.stats.find((s:any) => s.stat.name === 'attack')?.base_stat || 0,
          defense: data.stats.find((s:any) => s.stat.name === 'defense')?.base_stat || 0,
          specialAttack: data.stats.find((s:any) => s.stat.name === 'special-attack')?.base_stat || 0,
          specialDefense: data.stats.find((s:any) => s.stat.name === 'special-defense')?.base_stat || 0,
          speed: data.stats.find((s:any) => s.stat.name === 'speed')?.base_stat || 0,
          imageUrl: localImageUrl,
          shinyImageUrl: localShinyUrl,
        }
      });
    } catch (e) {
      console.error(`Failed to sync pokemon ${id}`, e);
    }
  },

  async syncItem(id: number) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/item/${id}`);
      if (!res.ok) return;
      const data = await res.json();

      let localSpriteUrl = null;
      if (data.sprites?.default) {
        localSpriteUrl = await downloadAndOptimizeImage(
          data.sprites.default, 
          `items/${data.name}.webp`
        );
      }

      await prisma.item.upsert({
        where: { name: data.name },
        update: { spriteUrl: localSpriteUrl },
        create: {
          name: data.name,
          cost: data.cost,
          spriteUrl: localSpriteUrl
        }
      });
    } catch (e) {
      console.error(`Failed to sync item ${id}`, e);
    }
  },

  async syncAbility(id: number) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
      if (!res.ok) return;
      const data = await res.json();

      await prisma.ability.upsert({
        where: { name: data.name },
        update: {},
        create: {
          name: data.name
        }
      });
    } catch (e) {
      console.error(`Failed to sync ability ${id}`, e);
    }
  }
};
