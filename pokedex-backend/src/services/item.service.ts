import { prisma } from '../db/prisma.js';

export const itemService = {
  getAllItems: async ({ search = '', limit = 20, offset = 0 }: any) => {
    const where: any = {};
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const totalCount = await prisma.item.count({ where });
    const results = await prisma.item.findMany({
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
