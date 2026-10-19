import { prisma } from '../db/prisma.js';
import { MAX_PAGE_SIZE, clampLimit, clampOffset } from '../lib/pagination.js';

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
      take: clampLimit(limit, 20, MAX_PAGE_SIZE),
      skip: clampOffset(offset)
    });

    return {
      results,
      totalCount
    };
  }
};
