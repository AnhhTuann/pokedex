import { prisma } from '../db/prisma.js';
import { pokemonService } from '../services/pokemon.service.js';
import { moveService } from '../services/move.service.js';
import { abilityService } from '../services/ability.service.js';
import { itemService } from '../services/item.service.js';
import { locationService } from '../services/location.service.js';

export const resolvers = {
  Query: {
    ping: () => "pong from Prisma backend!",

    getLocations: async (_: any, { version }: { version: string }) => locationService.getLocations(version),

    getLocationEncounters: async (_: any, { locationName, version }: { locationName: string; version: string }) => 
      locationService.getLocationEncounters(locationName, version),

    getAllMoves: async (_: any, args: any) => moveService.getAllMoves(args),

    getAllAbilities: async (_: any, args: any) => abilityService.getAllAbilities(args),

    getAllItems: async (_: any, args: any) => itemService.getAllItems(args),
    
    pokemonList: async (_: any, args: any) => pokemonService.pokemonList(args),
    
    pokemon: async (_: any, { id }: { id: number }) => pokemonService.pokemonDetail(id),

    myFavorites: async () => {
      const favorites = await prisma.userPokemon.findMany({
        where: { userId: 1 },
        select: { pokemonId: true }
      });
      return favorites.map((f: any) => f.pokemonId);
    },

    myTeam: async () => {
      const team = await prisma.team.findUnique({
        where: { userId: 1 },
        include: {
          slots: {
            orderBy: { slotOrder: 'asc' },
            include: { pokemon: { include: { types: true } } }
          }
        }
      });

      if (!team) return [];

      return team.slots.map((s: any) => ({
        id: s.pokemon.pokedexNumber,
        name: s.pokemon.name,
        types: s.pokemon.types.map((t: any) => t.name),
        image: s.pokemon.imageUrl
      }));
    },

    getWalkthroughs: async (_: any, { gameVersion, language }: { gameVersion: string; language: string }) => {
      return await prisma.walkthrough.findMany({
        where: { 
          gameVersion: { equals: gameVersion.toLowerCase(), mode: 'insensitive' },
          language: language ? { equals: language.toLowerCase(), mode: 'insensitive' } : undefined
        },
        orderBy: { order: 'asc' }
      });
    }
  },

  Mutation: {
    toggleFavorite: async (_: any, { pokemonId }: { pokemonId: number }) => {
      const existing = await prisma.userPokemon.findUnique({
        where: { userId_pokemonId: { userId: 1, pokemonId } }
      });

      if (existing) {
        await prisma.userPokemon.delete({
          where: { userId_pokemonId: { userId: 1, pokemonId } }
        });
        return false;
      } else {
        await prisma.userPokemon.create({
          data: { userId: 1, pokemonId }
        });
        return true;
      }
    },

    saveTeam: async (_: any, { pokemonIds }: { pokemonIds: number[] }) => {
      if (pokemonIds.length > 6) throw new Error("Team cannot have more than 6 members");

      let team = await prisma.team.findUnique({ where: { userId: 1 } });
      if (!team) {
        team = await prisma.team.create({ data: { userId: 1 } });
      }

      await prisma.teamSlot.deleteMany({ where: { teamId: team.id } });

      const slots = pokemonIds.map((id, idx) => ({
        teamId: team!.id,
        pokemonId: id,
        slotOrder: idx + 1
      }));

      if (slots.length > 0) {
        await prisma.teamSlot.createMany({ data: slots });
      }

      return true;
    },

    upsertWalkthrough: async (_: any, { id, gameVersion, chapterTitle, content, order, language }: any) => {
      const data = {
        gameVersion: gameVersion.toLowerCase(),
        chapterTitle,
        content,
        order,
        language: language ? language.toLowerCase() : 'vi'
      };

      if (id) {
        return await prisma.walkthrough.update({
          where: { id },
          data
        });
      } else {
        return await prisma.walkthrough.create({
          data
        });
      }
    },

    deleteWalkthrough: async (_: any, { id }: { id: number }) => {
      await prisma.walkthrough.delete({
        where: { id }
      });
      return true;
    }
  },

  PokemonDetail: {
    locations: async (parent: any, { version }: { version?: string }) => {
      const pId = parent.id;
      
      let encounters: any[] = await prisma.encounter.findMany({
        where: { pokemonId: pId }
      });
      
      if (encounters.length === 0) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pId}/encounters`);
          if (res.ok) {
            const data = await res.json();
            const fetchedList = [];
            for (const item of data) {
              const locName = item.location_area.name;
              for (const vd of item.version_details) {
                const verName = vd.version.name;
                fetchedList.push({
                  pokemonId: pId,
                  locationName: locName,
                  versionName: verName
                });
              }
            }
            encounters = fetchedList;
          }
        } catch (err) {
          console.error("Error fetching fallback encounters:", err);
        }
      }
      
      if (!version || version === 'ALL') {
        const uniqueNames = Array.from(new Set(encounters.map((e: any) => e.locationName)));
        return uniqueNames;
      }
      
      const filtered = encounters.filter((e: any) => e.versionName.toLowerCase() === version.toLowerCase());
      return filtered.map((e: any) => e.locationName);
    }
  }
};
