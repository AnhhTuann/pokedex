export interface PokemonPage<T> {
  results: T[];
  totalCount: number;
}

export async function collectPokemonPages<T extends { id: number }>(
  fetchPage: (offset: number) => Promise<PokemonPage<T>>,
): Promise<T[]> {
  const results: T[] = [];
  const seen = new Set<number>();
  let total: number | undefined;

  do {
    const page = await fetchPage(results.length);
    total ??= page.totalCount;
    if (!Number.isSafeInteger(total) || total < 0 || page.totalCount !== total ||
        results.length + page.results.length > total ||
        (page.results.length === 0 && results.length < total)) {
      throw new Error('Pokémon list changed or returned an incomplete page. Retry the request.');
    }
    for (const row of page.results) {
      if (seen.has(row.id)) {
        throw new Error('Pokémon list returned a duplicate form. Retry the request.');
      }
      seen.add(row.id);
      results.push(row);
    }
  } while (results.length < total);

  return results;
}
