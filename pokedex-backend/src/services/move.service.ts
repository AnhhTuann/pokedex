import { prisma } from '../db/prisma.js';

export const moveService = {
  getAllMoves: async ({ gen = null, type = '', damageClass = '', limit = 20, offset = 0, search = '' }: any) => {
    const where: any = {};
    if (gen !== null && gen !== undefined) {
      where.generation = gen;
    }
    if (type) {
      where.type = { equals: type.toLowerCase(), mode: 'insensitive' };
    }
    if (damageClass) {
      where.damageClass = { equals: damageClass.toLowerCase(), mode: 'insensitive' };
    }
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const totalCount = await prisma.move.count({ where });
    const results = await prisma.move.findMany({
      where,
      orderBy: { name: 'asc' },
      take: limit,
      skip: offset
    });

    return {
      results,
      totalCount
    };
  }
};
