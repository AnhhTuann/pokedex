import { prisma } from '../db/prisma.js';
import { pokemonService } from '../services/pokemon.service.js';
import { moveService } from '../services/move.service.js';
import { abilityService } from '../services/ability.service.js';
import { itemService } from '../services/item.service.js';
import { locationService } from '../services/location.service.js';
import { updaterService } from '../services/updater.service.js';
import { authService } from '../services/auth.service.js';
import {
  requireAdmin,
  requireUser,
  type GraphQLContext,
} from '../lib/security.js';

export const resolvers = {
  Query: {
    ping: () => "pong from Prisma backend!",

    me: async (_: any, __: any, context: GraphQLContext) => {
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

    myFavorites: async (_: any, __: any, context: GraphQLContext) => {
      const userId = requireUser(context);
      const favorites = await prisma.userPokemon.findMany({
        where: { userId },
        select: { pokemon: { select: { pokedexNumber: true } } }
      });
      return favorites
        .map((f) => f.pokemon.pokedexNumber)
        .filter((id): id is number => Number.isInteger(id));
    },

    myTeam: async (_: any, __: any, context: GraphQLContext) => {
      const userId = requireUser(context);
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

    toggleFavorite: async (_: any, { pokemonId }: { pokemonId: number }, context: GraphQLContext) => {
      const userId = requireUser(context);
      if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
        throw new Error('Invalid Pokémon identifier');
      }

      const pokemon = await prisma.pokemon.findUnique({
        where: { pokedexNumber: pokemonId },
        select: { id: true }
      });
      if (!pokemon) throw new Error('Unknown Pokémon');

      // Legacy rows used pokedexNumber as the FK to Pokemon.id. Accept both so
      // users can clean up old favourites without losing their current list.
      const whereCorrect = {
        userId_pokemonId: { userId, pokemonId: pokemon.id }
      };
      const existing =
        (await prisma.userPokemon.findUnique({ where: whereCorrect })) ??
        (pokemon.id !== pokemonId
          ? await prisma.userPokemon.findUnique({
              where: { userId_pokemonId: { userId, pokemonId } }
            })
          : null);

      if (existing) {
        await prisma.userPokemon.delete({
          where: {
            userId_pokemonId: {
              userId,
              pokemonId: existing.pokemonId
            }
          }
        });
        return false;
      }

      await prisma.userPokemon.create({
        data: { userId, pokemonId: pokemon.id }
      });
      return true;
    },

    saveTeam: async (_: any, { pokemonIds }: { pokemonIds: number[] }, context: GraphQLContext) => {
      const userId = requireUser(context);
      if (!Array.isArray(pokemonIds)) throw new Error('Invalid team');
      if (pokemonIds.length > 6) throw new Error("Team cannot have more than 6 members");
      if (pokemonIds.some((id) => !Number.isInteger(id) || id <= 0)) {
        throw new Error('Invalid Pokémon identifier');
      }

      const ids = [...new Set(pokemonIds)];
      const pokemons = await prisma.pokemon.findMany({
        where: { pokedexNumber: { in: ids } },
        select: { pokedexNumber: true }
      });
      if (pokemons.length !== ids.length) throw new Error('Unknown Pokémon in team');

      const team = await prisma.team.upsert({
        where: { userId },
        update: {},
        create: { userId }
      });

      const slots = ids.map((id, idx) => ({
        teamId: team.id,
        pokemonId: id,
        slotOrder: idx + 1
      }));

      await prisma.$transaction([
        prisma.teamSlot.deleteMany({ where: { teamId: team.id } }),
        ...(slots.length > 0
          ? [prisma.teamSlot.createMany({ data: slots })]
          : []),
      ]);

      return true;
    },

    upsertWalkthrough: async (_: any, { id, gameVersion, chapterTitle, description, coverImage, content, order, language }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      if (!gameVersion || !chapterTitle?.trim() || !content?.trim() || !Number.isInteger(order)) {
        throw new Error('Invalid walkthrough payload');
      }

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

    deleteWalkthrough: async (_: any, { id }: { id: number }, context: GraphQLContext) => {
      await requireAdmin(context);
      if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid walkthrough id');
      await prisma.walkthrough.delete({
        where: { id }
      });
      return true;
    },

    syncNewData: async (_: any, { dryRun = false }: { dryRun?: boolean }, context: GraphQLContext) => {
      await requireAdmin(context);
      return updaterService.syncNewData(dryRun);
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
