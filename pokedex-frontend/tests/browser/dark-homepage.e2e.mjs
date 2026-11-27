import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const origin = process.env.PHASE9C_ORIGIN || 'http://127.0.0.1:5299';
const baseline = process.env.PHASE11_BASELINE_ORIGIN;
const output = new URL('../../../docs/ui-redesign/phase11-dark-homepage/', import.meta.url);
const screenshots = new URL('screenshots/', output);
await mkdir(screenshots, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PHASE9C_CHROME || '/usr/bin/google-chrome-stable',
  args: ['--no-sandbox'],
});
const report = { viewports: [], catalog: null, comparisons: [], interactions: [] };

const card = (page, name) => page.getByRole('button', { name: 'View ' + name, exact: true });
const visibleCards = page => page.locator('main [id^="pokemon-card-"]');
const search = page => page.getByRole('textbox', { name: 'Search Pokémon by name or National Dex number' });
const image = (page, name) => page.getByRole('img', { name, exact: true });
const shot = async (page, name) => {
  await page.evaluate(() => document.fonts.ready);
  return page.screenshot({ path: new URL(name + '.png', screenshots).pathname, animations: 'disabled' });
};

async function ready(page) {
  await page.getByText('1351 Pokémon', { exact: true }).waitFor();
  await page.waitForFunction(() => ['bulbasaur', 'charmander', 'squirtle'].every(name =>
    document.querySelector('img[alt="' + name + '"]')?.naturalWidth));
}
async function bounds(page) {
  return page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    main: document.querySelector('main').scrollWidth,
    mainWidth: document.querySelector('main').clientWidth,
  }));
}
// Chrome's implicit favicon request predates Phase 11 and is not surfaced as
// a page response. All explicit request failures are still asserted below.
function unexpectedConsole(messages) {
  return messages.filter(message => !message.startsWith('You have Reduced Motion enabled') &&
    message !== 'Failed to load resource: the server responded with a status of 404 (Not Found)');
}

function watch(page, result) {
  result.console = [];
  result.pageErrors = [];
  result.failed = [];
  page.on('pageerror', err => result.pageErrors.push(err.message));
  page.on('console', msg => { if (['error', 'warning'].includes(msg.type())) result.console.push(msg.text()); });
  page.on('requestfailed', req => {
    if (req.failure()?.errorText !== 'net::ERR_ABORTED') result.failed.push([req.url(), req.failure()?.errorText]);
  });
  page.on('response', res => { if (res.status() >= 400) result.failed.push([res.url(), res.status()]); });
}

try {
  for (const [width, height] of [[1920, 1080], [1440, 900], [768, 1024], [390, 844]]) {
    const viewport = { width, height };
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce', hasTouch: width <= 390 });
    const result = { width, height };
    report.viewports.push(result);
    watch(page, result);
    await page.goto(origin);
    await ready(page);
    await page.getByRole('heading', { name: 'Discover Pokémon' }).waitFor();
    result.bounds = await bounds(page);
    assert.equal(result.bounds.viewport, result.bounds.document);
    assert.equal(result.bounds.main, result.bounds.mainWidth);
    result.cards = await visibleCards(page).count();
    const sample = await visibleCards(page).evaluateAll(cards => cards.slice(0, 12).map(card => {
      const article = card.querySelector('article');
      const id = card.querySelector('[title="National Dex number"]').getBoundingClientRect();
      const heart = card.querySelector('button[aria-label*="favorites"]').getBoundingClientRect();
      return { id: card.id, background: getComputedStyle(article).backgroundImage, x: card.getBoundingClientRect().x,
        animation: getComputedStyle(article).animationName, gapToFavorite: heart.left - id.right };
    }));
    assert.equal(result.cards, 24);
    assert.ok(sample.every(row => row.gapToFavorite >= 0 && row.animation === 'none'));
    result.columns = new Set(sample.map(row => row.x)).size;
    assert.equal(result.columns, width >= 1600 ? 5 : width >= 1200 ? 4 : width > 600 ? 3 : 2);
    const backgrounds = await Promise.all(['bulbasaur', 'charmander', 'squirtle'].map(name =>
      card(page, name).evaluate(button => getComputedStyle(button.closest('article')).backgroundImage)));
    assert.equal(new Set(backgrounds).size, 3);
    result.loadedImages = await page.locator('main img').evaluateAll(images => ({
      loaded: images.filter(img => img.complete && img.naturalWidth > 0).length,
      broken: images.filter(img => img.complete && !img.naturalWidth).map(img => img.getAttribute('src')),
    }));
    assert.deepEqual(result.loadedImages.broken, []);
    await shot(page, 'homepage-' + width);
    if (width <= 768) {
      const menu = page.getByRole('button', { name: 'Menu', exact: true });
      await menu.click();
      await page.getByRole('navigation').getByRole('button', { name: 'Type Dex' }).waitFor();
      if (width === 390) await shot(page, 'mobile-drawer');
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      await page.getByRole('navigation').waitFor({ state: 'hidden' });
      assert.equal(await menu.evaluate(button => document.activeElement === button), true);
    } else if (width === 1440) {
      const toggle = page.getByRole('button', { name: 'Toggle Sidebar' });
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      await page.getByRole('navigation').getByRole('button', { name: 'Pokédex', exact: true }).waitFor();
      await shot(page, 'sidebar-collapsed');
    }
    assert.deepEqual(result.pageErrors, []);
    assert.deepEqual(result.failed, []);
    assert.deepEqual(unexpectedConsole(result.console), []);
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const activity = {};
  report.activity = activity;
  watch(page, activity);
  await page.goto(origin);
  await ready(page);
  const grass = card(page, 'bulbasaur');
  const article = grass.locator('..');
  await grass.hover();
  await page.waitForFunction(() => {
    const article = document.querySelector('#pokemon-card-1 article');
    return new DOMMatrixReadOnly(getComputedStyle(article).transform).m42 === -4;
  });
  await shot(page, 'card-hover');
  const beforeShiny = await image(page, 'bulbasaur').getAttribute('src');
  const geometry = await article.boundingBox();
  await page.waitForFunction(() => document.querySelector('#pokemon-card-1 article')
    .style.getPropertyValue('--primary-color').startsWith('hsl('));
  const accentBefore = await article.evaluate(node => node.style.getPropertyValue('--primary-color'));
  await page.getByLabel('Shiny mode', { exact: true }).evaluate(input => input.click());
  await page.waitForFunction(({ src, color }) => {
    const img = document.querySelector('#pokemon-card-1 img');
    return img?.getAttribute('src') !== src && img?.naturalWidth > 0 &&
      img.closest('article').style.getPropertyValue('--primary-color').startsWith('hsl(') &&
      img.closest('article').style.getPropertyValue('--primary-color') !== color;
  }, { src: beforeShiny, color: accentBefore });
  assert.equal((await article.boundingBox()).height, geometry.height);
  assert.match(await image(page, 'bulbasaur').getAttribute('src'), /\/shiny\//);
  await page.getByLabel('Shiny mode', { exact: true }).evaluate(input => input.click());
  report.interactions.push('hover 4px, normal/shiny URL and extracted accent');

  await page.getByRole('button', { name: 'Add bulbasaur to favorites' }).click();
  assert.equal(await page.getByRole('button', { name: 'Remove bulbasaur from favorites' }).getAttribute('aria-pressed'), 'true');
  await shot(page, 'favorite');
  await page.getByRole('button', { name: 'Favorites (1)' }).click();
  await page.getByText('1 Pokémon', { exact: true }).waitFor();
  assert.equal(await visibleCards(page).count(), 1);
  await page.getByRole('button', { name: 'All Pokémon', exact: true }).click();
  await ready(page);
  await page.getByRole('button', { name: 'Compare', exact: true }).click();
  await page.getByRole('button', { name: 'Compare bulbasaur', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Compare bulbasaur', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Compare charmander', exact: true }).click();
  const comparison = page.getByRole('dialog', { name: 'Head-to-head comparison' });
  await comparison.getByText('bulbasaur', { exact: true }).first().waitFor();
  await comparison.getByText('charmander', { exact: true }).first().waitFor();
  const radar = comparison.locator('svg.recharts-surface[role="application"]');
  await radar.waitFor();
  assert.ok((await radar.boundingBox()).width > 0);
  await comparison.getByRole('button', { name: 'Close comparison' }).click();
  await grass.click();
  const detail = page.getByRole('dialog', { name: 'Pokémon details' });
  await detail.getByRole('heading', { name: 'Evolution Chain' }).waitFor();
  await page.keyboard.press('Escape');
  await detail.waitFor({ state: 'hidden' });
  report.interactions.push('favorites, correct compare selection, detail navigation');

  const firstIds = await visibleCards(page).evaluateAll(cards => cards.map(card => card.id));
  const load = page.getByRole('button', { name: 'Load More' });
  const next = page.waitForResponse(res => res.url().endsWith('/graphql') &&
    res.request().postDataJSON()?.variables?.filters?.offset === 24);
  await load.click();
  assert.equal((await next).ok(), true);
  await card(page, 'arbok').waitFor();
  const nextIds = await visibleCards(page).evaluateAll(cards => cards.map(card => card.id));
  assert.equal(nextIds.length, 48);
  assert.equal(new Set(nextIds).size, 48);
  assert.deepEqual(nextIds.slice(0, 24), firstIds);
  report.interactions.push('Load More offset 24, original ordering retained, 48 unique cards');

  await search(page).fill('#001');
  await page.getByRole('button', { name: 'Filter by Type', exact: true }).click();
  await page.getByRole('group', { name: 'Type options' }).getByRole('button', { name: 'Grass', exact: true }).click();
  await page.getByRole('button', { name: 'Filter by Generation', exact: true }).click();
  await page.getByRole('button', { name: 'Gen 1 · Kanto', exact: true }).click();
  await page.getByLabel('Form', { exact: true }).selectOption('DEFAULT');
  await page.getByText(/1 Pokémon matching "#001" · Gen 1/).waitFor();
  await grass.waitFor();
  await shot(page, 'filters-applied');
  await page.getByRole('button', { name: 'Clear Type Filter' }).click();
  await page.getByRole('button', { name: 'Clear Generation Filter' }).click();
  await page.getByLabel('Form', { exact: true }).selectOption('');
  await page.getByLabel('Region', { exact: true }).selectOption('unova');
  await page.getByLabel('Exact Dex', { exact: true }).selectOption('original-unova');
  await search(page).fill('victini');
  await card(page, 'victini').getByText('000', { exact: true }).waitFor();
  await page.getByLabel('Region', { exact: true }).selectOption('');
  await page.getByLabel('Exact Dex', { exact: true }).selectOption('');
  for (const [category, name, label] of [['MEGA', 'venusaur-mega', 'Mega'], ['GIGANTAMAX', 'pikachu-gmax', 'Gigantamax']]) {
    await page.getByLabel('Form', { exact: true }).selectOption(category);
    await search(page).fill(name);
    await card(page, name).getByText(label, { exact: true }).first().waitFor();
    assert.match(await image(page, name).getAttribute('src'), new RegExp(name + '\\.webp'));
  }
  report.interactions.push('search, type, generation, broad region, exact dex #000, default/mega/gigantamax form and artwork');

  await page.locator('#game-version-selector-btn').click();
  const picker = page.getByRole('dialog', { name: 'Game version selector' });
  assert.equal(await picker.locator('button[class*="gameButton_"]').count(), 38);
  await picker.getByRole('button', { name: /^red$/i }).click();
  assert.match(await page.locator('#game-version-selector-btn').getAttribute('aria-label'), /: Red$/);
  await page.getByRole('button', { name: 'National Dex', exact: true }).waitFor();
  await page.getByLabel('Game evidence', { exact: true }).selectOption('UNKNOWN');
  report.interactions.push('38 games, individual Red scope, National Dex/evidence controls');

  const ids = [];
  const categories = new Set();
  const query = 'query($filters: ReferencePokemonFilters) { referencePokemonList(filters: $filters) { totalCount results { id speciesId category } } }';
  for (let offset = 0; offset < 1351; offset += 24) {
    const response = await page.request.post(origin + '/graphql', { data: { query, variables: { filters: { offset, limit: 24 } } } });
    const payload = await response.json();
    assert.equal(payload.errors, undefined);
    const { totalCount, results } = payload.data.referencePokemonList;
    assert.equal(totalCount, 1351);
    for (const row of results) {
      ids.push(row.id);
      categories.add(row.category);
    }
  }
  assert.equal(ids.length, 1351);
  assert.equal(new Set(ids).size, 1351);
  assert.deepEqual(ids.slice(0, 48).map(id => 'pokemon-card-' + id), nextIds);
  report.catalog = { pageSize: 24, pages: Math.ceil(1351 / 24), ids, categories: [...categories].sort() };
  assert.deepEqual(activity.pageErrors, []);
  assert.deepEqual(activity.failed, []);
  const chartWarning = message => message.startsWith('The width(-1) and height(-1) of chart');
  assert.deepEqual(unexpectedConsole(activity.console).filter(message => !chartWarning(message)), []);
  await page.close();

  if (baseline) {
    const basePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const baselineCompare = {};
    report.baselineCompare = baselineCompare;
    watch(basePage, baselineCompare);
    await basePage.goto(baseline);
    await ready(basePage);
    await basePage.getByRole('button', { name: 'Compare', exact: true }).click();
    await basePage.getByRole('button', { name: 'Compare bulbasaur', exact: true }).click();
    await basePage.getByRole('button', { name: 'Compare charmander', exact: true }).click();
    await basePage.getByRole('dialog', { name: 'Head-to-head comparison' })
      .locator('svg.recharts-surface[role="application"]').waitFor();
    if (activity.console.some(chartWarning)) assert.ok(baselineCompare.console.some(chartWarning));
    await basePage.close();
    for (const [label, path] of [['homepage-dark', '/'], ['homepage-light', '/'], ['type-dex-dark', '/types'],
      ['team-builder-dark', '/teambuilder'], ['catch-tracker-dark', '/tracker'], ['damage-calc-dark', '/calculator']]) {
      const comparison = { label, path };
      report.comparisons.push(comparison);
      for (const [prefix, base] of [['before', baseline], ['after', origin]]) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
        await page.goto(base + path);
        if (path === '/') await ready(page);
        else if (path === '/tracker') await page.getByText(/Showing 40 of 1351 Pokémon/).waitFor();
        else if (path === '/teambuilder') await page.getByText('Add Pokémon #6', { exact: true }).waitFor();
        else await page.locator('main h1, main h2').first().waitFor();
        if (label === 'homepage-light') await page.getByRole('button', { name: 'Light mode' }).click();
        await page.mouse.move(0, 899);
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all(Array.from(document.images).filter(img => img.getBoundingClientRect().top < innerHeight).map(img => img.decode().catch(() => {})));
        });
        await shot(page, prefix + '-' + label);
        await page.close();
      }
    }
  }
  console.log('PASS Phase 11 dark homepage, four viewports and 1351 unique catalog forms');
} catch (error) {
  report.error = String(error);
  throw error;
} finally {
  await writeFile(new URL('browser-results.json', output), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
