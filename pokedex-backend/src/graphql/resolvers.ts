import { prisma } from '../db/prisma.js';
import { pokemonService } from '../services/pokemon.service.js';
import { moveService } from '../services/move.service.js';
import { abilityService } from '../services/ability.service.js';
import { itemService } from '../services/item.service.js';
import { locationService } from '../services/location.service.js';
import { updaterService } from '../services/updater.service.js';
import { authService } from '../services/auth.service.js';

export const resolvers = {
  Query: {
    ping: () => "pong from Prisma backend!",

    me: async (_: any, __: any, context: any) => {
      if (!context.user) return null;
      return authService.me(context.user.userId);
    },

    getLocations: async (_: any, { version }: { version: string }) => locationService.getLocations(version),

    getLocationEncounters: async (_: any, { locationName, version }: { locationName: string; version: string }) => 
      locationService.getLocationEncounters(locationName, version),

    getAllMoves: async (_: any, args: any) => moveService.getAllMoves(args),

    getAllAbilities: async (_: any, args: any) => abilityService.getAllAbilities(args),

    getAllItems: async (_: any, args: any) => itemService.getAllItems(args),
    
    pokemonList: async (_: any, args: any) => pokemonService.pokemonList(args),
    
    pokemon: async (_: any, { id }: { id: number }) => pokemonService.pokemonDetail(id),

    myFavorites: async (_: any, __: any, context: any) => {
      const userId = context.user ? context.user.userId : 1;
      const favorites = await prisma.userPokemon.findMany({
        where: { userId },
        select: { pokemonId: true }
      });
      return favorites.map((f: any) => f.pokemonId);
    },

    myTeam: async (_: any, __: any, context: any) => {
      const userId = context.user ? context.user.userId : 1;
      const team = await prisma.team.findUnique({
        where: { userId },
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
    },

    getWalkthrough: async (_: any, { id }: { id: number }) => {
      return await prisma.walkthrough.findUnique({
        where: { id }
      });
    },

    checkUpdates: async () => updaterService.checkUpdates()
  },

  Mutation: {
    register: async (_: any, args: any) => authService.register(args),
    
    login: async (_: any, args: any) => authService.login(args),

    toggleFavorite: async (_: any, { pokemonId }: { pokemonId: number }, context: any) => {
      const userId = context.user ? context.user.userId : 1;
      const existing = await prisma.userPokemon.findUnique({
        where: { userId_pokemonId: { userId, pokemonId } }
      });

      if (existing) {
        await prisma.userPokemon.delete({
          where: { userId_pokemonId: { userId, pokemonId } }
        });
        return false;
      } else {
        await prisma.userPokemon.create({
          data: { userId, pokemonId }
        });
        return true;
      }
    },

    saveTeam: async (_: any, { pokemonIds }: { pokemonIds: number[] }, context: any) => {
      const userId = context.user ? context.user.userId : 1;
      if (pokemonIds.length > 6) throw new Error("Team cannot have more than 6 members");

      let team = await prisma.team.findUnique({ where: { userId } });
      if (!team) {
        team = await prisma.team.create({ data: { userId } });
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

    upsertWalkthrough: async (_: any, { id, gameVersion, chapterTitle, description, coverImage, content, order, language }: any) => {
      const data = {
        gameVersion: gameVersion.toLowerCase(),
        chapterTitle,
        description,
        coverImage,
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
    },

    syncNewData: async () => updaterService.syncNewData()
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
