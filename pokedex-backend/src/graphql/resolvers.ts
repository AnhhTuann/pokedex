import { GraphQLError } from 'graphql';
import { prisma } from '../db/prisma.js';
import { pokemonService } from '../services/pokemon.service.js';
import { moveService } from '../services/move.service.js';
import { abilityService } from '../services/ability.service.js';
import { itemService } from '../services/item.service.js';
import { locationService } from '../services/location.service.js';
import { updaterService } from '../services/updater.service.js';
import { authService } from '../services/auth.service.js';
import { GraphQLContext, requireAdmin, requireUser } from '../lib/auth.js';
import { createRateLimiter } from '../lib/rateLimit.js';
import { fetchPokeApi } from '../lib/pokeApi.js';

const MAX_TEAM_SIZE = 6;
const loginLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 20 });
const registerLimiter = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 10 });

function badInput(message: string): never {
  throw new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } });
}

export const resolvers = {
  Query: {
    ping: () => "pong from Prisma backend!",

    me: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.user) return null;
      return authService.me(context.user.userId);
    },

    getLocations: async (_: unknown, { version }: { version: string }) => locationService.getLocations(version),

    getLocationEncounters: async (_: unknown, { locationName, version }: { locationName: string; version: string }) =>
      locationService.getLocationEncounters(locationName, version),

    getAllMoves: async (_: unknown, args: any) => moveService.getAllMoves(args),

    getAllAbilities: async (_: unknown, args: any) => abilityService.getAllAbilities(args),

    getAllItems: async (_: unknown, args: any) => itemService.getAllItems(args),

    pokemonList: async (_: unknown, args: any) => pokemonService.pokemonList(args),

    pokemon: async (_: unknown, { id }: { id: number }) => pokemonService.pokemonDetail(id),

    myFavorites: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.user) return [];
      const favorites = await prisma.userPokemon.findMany({
        where: { userId: context.user.userId },
        select: { pokemon: { select: { pokedexNumber: true } } }
      });
      return favorites.map((f) => f.pokemon.pokedexNumber);
    },

    myTeam: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.user) return [];
      const team = await prisma.team.findUnique({
        where: { userId: context.user.userId },
        include: {
          slots: {
            orderBy: { slotOrder: 'asc' },
            include: { pokemon: { include: { types: true } } }
          }
        }
      });

      if (!team) return [];

      return team.slots.map((s) => ({
        id: s.pokemon.pokedexNumber,
        name: s.pokemon.name,
        types: s.pokemon.types.map((t) => t.name),
        image: s.pokemon.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${s.pokemon.pokedexNumber}.png`
      }));
    },

    getWalkthroughs: async (_: unknown, { gameVersion, language }: { gameVersion: string; language: string }) => {
      return await prisma.walkthrough.findMany({
        where: {
          gameVersion: { equals: gameVersion.toLowerCase(), mode: 'insensitive' },
          language: language ? { equals: language.toLowerCase(), mode: 'insensitive' } : undefined
        },
        orderBy: { order: 'asc' }
      });
    },

    getWalkthrough: async (_: unknown, { id }: { id: number }) => {
      return await prisma.walkthrough.findUnique({
        where: { id }
      });
    },

    checkUpdates: async (_: unknown, __: unknown, context: GraphQLContext) => {
      requireAdmin(context);
      return updaterService.checkUpdates();
    }
  },

  Mutation: {
    register: async (_: unknown, args: { username: string; email: string; password: string }, context: GraphQLContext) => {
      registerLimiter(context.ip);
      return authService.register(args);
    },

    login: async (_: unknown, args: { username: string; password: string }, context: GraphQLContext) => {
      loginLimiter(context.ip);
      return authService.login(args);
    },

    toggleFavorite: async (_: unknown, { pokemonId }: { pokemonId: number }, context: GraphQLContext) => {
      const { userId } = requireUser(context);
      const pokemon = await prisma.pokemon.findUnique({
        where: { pokedexNumber: pokemonId },
        select: { id: true }
      });
      if (!pokemon) badInput(`Pokémon #${pokemonId} not found`);

      const key = { userId_pokemonId: { userId, pokemonId: pokemon.id } };
      const existing = await prisma.userPokemon.findUnique({ where: key });

      if (existing) {
        await prisma.userPokemon.delete({ where: key });
        return false;
      }
      await prisma.userPokemon.create({ data: { userId, pokemonId: pokemon.id } });
      return true;
    },

    saveTeam: async (_: unknown, { pokemonIds }: { pokemonIds: number[] }, context: GraphQLContext) => {
      const { userId } = requireUser(context);
      if (pokemonIds.length > MAX_TEAM_SIZE) badInput(`Team cannot have more than ${MAX_TEAM_SIZE} members`);

      const uniqueIds = Array.from(new Set(pokemonIds));
      const found = await prisma.pokemon.count({ where: { pokedexNumber: { in: uniqueIds } } });
      if (found !== uniqueIds.length) badInput('Team contains unknown Pokémon');

      await prisma.$transaction(async (tx) => {
        const team = await tx.team.upsert({ where: { userId }, update: {}, create: { userId } });
        await tx.teamSlot.deleteMany({ where: { teamId: team.id } });
        if (pokemonIds.length > 0) {
          await tx.teamSlot.createMany({
            data: pokemonIds.map((id, idx) => ({ teamId: team.id, pokemonId: id, slotOrder: idx + 1 }))
          });
        }
      });

      return true;
    },

    upsertWalkthrough: async (_: unknown, { id, gameVersion, chapterTitle, description, coverImage, content, order, language }: any, context: GraphQLContext) => {
      requireAdmin(context);
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
        return await prisma.walkthrough.update({ where: { id }, data });
      }
      return await prisma.walkthrough.create({ data });
    },

    deleteWalkthrough: async (_: unknown, { id }: { id: number }, context: GraphQLContext) => {
      requireAdmin(context);
      await prisma.walkthrough.delete({ where: { id } });
      return true;
    },

    syncNewData: async (_: unknown, __: unknown, context: GraphQLContext) => {
      requireAdmin(context);
      return updaterService.syncNewData();
    }
  },

  PokemonDetail: {
    locations: async (parent: { id: number }, { version }: { version?: string }) => {
      const pId = parent.id;

      let encounters: { locationName: string; versionName: string }[] = await prisma.encounter.findMany({
        where: { pokemonId: pId },
        select: { locationName: true, versionName: true }
      });

      if (encounters.length === 0) {
        const data = await fetchPokeApi<any[]>(`https://pokeapi.co/api/v2/pokemon/${pId}/encounters`);
        encounters = (data || []).flatMap((item) =>
          item.version_details.map((vd: any) => ({
            locationName: item.location_area.name,
            versionName: vd.version.name
          }))
        );
      }

      if (!version || version === 'ALL') {
        return Array.from(new Set(encounters.map((e) => e.locationName)));
      }

      return encounters
        .filter((e) => e.versionName.toLowerCase() === version.toLowerCase())
        .map((e) => e.locationName);
    }
  }
};
