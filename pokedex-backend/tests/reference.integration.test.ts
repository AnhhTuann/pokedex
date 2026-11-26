import assert from 'node:assert/strict';
import test from 'node:test';
import { ApolloServer } from '@apollo/server';
import { referencePokemonFields, referenceQueries } from '../src/catalog/graphql.js';
import { typeDefs } from '../src/graphql/typeDefs.js';

const server = new ApolloServer({
  typeDefs, resolvers: { Query: referenceQueries, ReferencePokemon: referencePokemonFields },
});
test.after(() => server.stop());

async function execute(query: string, variables?: Record<string, unknown>) {
  const response = await server.executeOperation({ query, variables });
  assert.equal(response.body.kind, 'single');
  assert.equal(response.body.singleResult.errors, undefined, JSON.stringify(response.body.singleResult.errors));
  return response.body.singleResult.data as Record<string, any>;
}
const list = async (filters: Record<string, unknown> = {}) => (await execute(`
  query($filters: ReferencePokemonFilters) {
    referencePokemonList(filters: $filters) {
      totalCount results { id speciesId regionalNumber generation category image shinyImage }
    }
  }`, { filters })).referencePokemonList;
const metadata = async () => (await execute(`{
  referenceCatalog {
    speciesCount formCount
    games { slug versionGroup referenceDexes legacyDexes }
    dexes { slug region entryCount }
  }
}`)).referenceCatalog;

test('the executable schema serves all 35 Dex references and 38 games', async () => {
  const catalog = await metadata();
  assert.deepEqual([catalog.speciesCount, catalog.formCount, catalog.dexes.length, catalog.games.length], [1025, 1351, 35, 38]);
  for (const dex of catalog.dexes) {
    const page = await list({ dex: dex.slug, category: 'DEFAULT', limit: 0 });
    assert.equal(page.totalCount, dex.entryCount, dex.slug);
  }
  for (const game of catalog.games) {
    assert.ok((await list({ game: game.slug })).totalCount > 0, game.slug);
    const data = await execute(`query($game: String!) {
      referencePokemon(id: 494, game: $game) { availability { facet state } }
    }`, { game: game.slug });
    assert.equal(data.referencePokemon.availability.length, 6);
    assert.ok(data.referencePokemon.availability.every((facet: any) => ['CONFIRMED', 'UNKNOWN'].includes(facet.state)));
  }
  for (let gen = 1; gen <= 9; gen++) {
    const page = await list({ gen });
    assert.ok(page.totalCount > 0);
    assert.ok(page.results.every((form: any) => form.generation === gen));
  }
});

test('reference numbers preserve Victini zero, ORAS scopes and both ZA Dexes', async () => {
  const zero = await list({ dex: 'original-unova', regionalNumber: 0, broadRegion: 'unova', nationalNumber: 494, search: '#000' });
  assert.equal(zero.results[0].regionalNumber, 0);
  assert.equal(zero.results[0].speciesId, 494);
  const catalog = await metadata();
  const oras = catalog.games.find((row: any) => row.slug === 'omega-ruby');
  assert.deepEqual(oras.referenceDexes, ['updated-hoenn']);
  assert.deepEqual(oras.legacyDexes, ['hoenn']);
  for (const [dex, count] of [['hoenn', 202], ['updated-hoenn', 211], ['lumiose-city', 232], ['hyperspace', 132]]) {
    assert.equal((await list({ dex, category: 'DEFAULT' })).totalCount, count);
  }
  assert.equal((await list({ dex: 'original-unova', category: 'DEFAULT' })).results[0].id, 494);
});

test('game evidence does not imply wild or form-level evidence', async () => {
  assert.equal((await list({ game: 'black', availability: 'REGIONAL_DEX_MEMBER', formId: 494 })).totalCount, 1);
  assert.equal((await list({ game: 'black', availability: 'WILD_CATCHABLE', formId: 494 })).totalCount, 0);
  assert.equal((await list({ game: 'x', formId: 10033, availabilityState: 'UNKNOWN' })).totalCount, 1);
  assert.equal((await list({ formId: 10033, category: 'MEGA', speciesId: 3 })).totalCount, 1);
  for (const category of ['DEFAULT', 'ALTERNATE', 'REGIONAL', 'MEGA', 'GIGANTAMAX', 'BATTLE', 'OTHER']) {
    assert.ok((await list({ category })).totalCount > 0);
  }
  assert.equal((await list({ category: 'COSMETIC' })).totalCount, 0);
});

test('form pagination returns every row exactly once; missing artwork remains absent', async () => {
  const seen = new Set<number>();
  for (let offset = 0; offset <= 1500; offset += 250) {
    const page = await list({ offset, limit: 250 });
    assert.equal(page.totalCount, 1351);
    assert.equal(page.results.length, Math.min(250, Math.max(0, 1351 - offset)));
    for (const form of page.results) {
      assert.ok(!seen.has(form.id));
      seen.add(form.id);
    }
  }
  assert.equal(seen.size, 1351);
  const form = (await list({ formId: 681 })).results[0];
  assert.equal(form.image, '');
});

test('learnsets preserve slots per version group and evolution conditions exclude the disputed edge', async () => {
  const query = `query($id: Int!, $versionGroup: String) {
    referencePokemon(id: $id, versionGroup: $versionGroup) {
      learnset { state reviewReason entries { moveId formId versionGroup method level source } }
      evolution { fromSpeciesId toSpeciesId trigger conditionsJson }
      abilitySlots { name hidden }
    }
  }`;
  for (const group of ['red-blue', 'yellow']) {
    const { referencePokemon: detail } = await execute(query, { id: 1, versionGroup: group });
    assert.equal(detail.learnset.state, 'CONFIRMED');
    assert.ok(detail.learnset.entries.every((row: any) =>
      row.formId === 1 && row.versionGroup === group && row.moveId > 0 && row.source.includes('/pokemon/1/')));
    if (group === 'red-blue') assert.ok(detail.evolution.some((edge: any) => JSON.parse(edge.conditionsJson).min_level === 16));
  }
  const missing = (await execute(query, { id: 1, versionGroup: 'legends-arceus' })).referencePokemon.learnset;
  assert.equal(missing.state, 'UNKNOWN');
  assert.equal(missing.reviewReason, 'CHECK_SCOPE_AND_GROUP_MAPPING');
  assert.deepEqual((await execute(query, { id: 490 })).referencePokemon.evolution, []);
  assert.ok((await execute(query, { id: 133 })).referencePokemon.evolution.some((edge: any) =>
    JSON.parse(edge.conditionsJson).item?.name === 'water-stone'));
});

test('invalid game, generation and unscoped evidence return BAD_USER_INPUT', async () => {
  for (const filter of ['game: "unknown-game"', 'gen: 10', 'availability: WILD_CATCHABLE', 'regionalNumber: 0']) {
    const { body } = await server.executeOperation({ query: `{ referencePokemonList(filters: { ${filter} }) { totalCount } }` });
    assert.equal(body.kind, 'single');
    assert.equal(body.singleResult.errors?.[0].extensions?.code, 'BAD_USER_INPUT');
  }
});
