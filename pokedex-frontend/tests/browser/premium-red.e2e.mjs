import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const screenshots = process.env.POKEDEX_BROWSER_SCREENSHOTS
  ? new URL(process.env.POKEDEX_BROWSER_SCREENSHOTS)
  : new URL('../../../docs/ui-redesign/screenshots/', import.meta.url);
await mkdir(screenshots, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PHASE9C_CHROME || '/usr/bin/google-chrome-stable',
  args: ['--no-sandbox'],
});
const origin = process.env.PHASE9C_ORIGIN || 'http://127.0.0.1:5199';

async function shot(page, name) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, screenshots)), animations: 'disabled' });
}

async function fits(page, locator = page.locator('main')) {
  const box = await locator.boundingBox();
  assert.ok(box && box.x >= -1 && box.x + box.width <= page.viewportSize().width + 1, 'Bounds fit viewport');
  assert.ok(await locator.evaluate(node => node.scrollWidth <= node.clientWidth + 2), 'No internal horizontal overflow');
}

try {
  for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 768, 1024], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto(origin);
    await page.getByText('1351 Pokémon', { exact: true }).waitFor();
    const bulbasaur = page.getByRole('button', { name: 'View bulbasaur', exact: true });
    const charmander = page.getByRole('button', { name: 'View charmander', exact: true });
    const cardBackground = locator => locator.evaluate(node => getComputedStyle(node.querySelector('img').parentElement).backgroundImage);
    await page.waitForFunction(() => ['bulbasaur', 'charmander'].every(name =>
      document.querySelector(`img[alt="${name}"]`)?.naturalWidth > 0));
    assert.notEqual(await cardBackground(bulbasaur), await cardBackground(charmander));
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await fits(page);
    await shot(page, `pokedex-${name}-dark`);
    await page.getByRole('button', { name: 'Light mode' }).click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    await shot(page, `pokedex-${name}-light`);

    if (name === 'desktop') {
      await page.getByRole('button', { name: 'Toggle Sidebar' }).click();
      await page.getByRole('button', { name: 'Toggle Sidebar', expanded: false }).waitFor();
      await page.getByRole('button', { name: 'Toggle Sidebar' }).click();
    } else {
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await page.getByRole('navigation').getByRole('button', { name: 'Type Dex' }).waitFor();
      await page.keyboard.press('Escape');
    }

    const pickerButton = page.locator('#game-version-selector-btn');
    await pickerButton.click();
    const picker = page.getByRole('dialog', { name: 'Game version selector' });
    await picker.waitFor();
    assert.equal(await picker.locator('button[class*="gameButton_"]').count(), 38);
    await fits(page, picker);
    await shot(page, `game-selector-${name}`);
    await picker.getByRole('button', { name: /^red$/i }).click();
    assert.match(await pickerButton.getAttribute('aria-label'), /: Red$/);
    assert.match(await pickerButton.innerText(), /RED.*BLUE/s);
    await page.getByRole('button', { name: 'National Dex', exact: true }).waitFor();
    await page.getByLabel('Game evidence', { exact: true }).selectOption('UNKNOWN');
    await page.getByLabel('Game evidence', { exact: true }).selectOption('');
    await pickerButton.click();
    await picker.getByRole('button', { name: /all versions/i }).click();

    const search = page.getByPlaceholder('Search by name or #...');
    await page.locator('#open-game-btn').click();
    const minigame = page.getByRole('dialog', { name: "Who's That Pokémon?" });
    await minigame.getByRole('img', { name: 'Pokémon silhouette', exact: true }).waitFor();
    await minigame.getByRole('button', { name: 'Give Up' }).click();
    await minigame.getByText(/It was:/).waitFor();
    await minigame.getByRole('button', { name: 'Play Again' }).click();
    await minigame.getByPlaceholder('Enter Pokémon name…').waitFor();
    await page.keyboard.press('Escape');

    await search.fill('#001');
    await bulbasaur.waitFor();
    await page.getByRole('button', { name: 'Filter by Type', exact: true }).click();
    await page.getByText('Grass', { exact: true }).first().click();
    await page.getByRole('button', { name: 'Filter by Generation', exact: true }).click();
    await page.getByText('Gen 1 · Kanto', { exact: true }).click();
    await page.getByLabel('Form', { exact: true }).selectOption('DEFAULT');
    await page.getByRole('button', { name: 'Add bulbasaur to favorites' }).click();
    await page.getByRole('button', { name: /favorites \(1\)/i }).click();
    await bulbasaur.waitFor();
    await search.fill('no-such-species');
    await page.getByText('No Pokémon found.', { exact: true }).waitFor();
    await search.fill('bulbasaur');

    await page.getByLabel('Shiny mode', { exact: true }).evaluate(input => input.click());
    await page.getByRole('img', { name: 'bulbasaur', exact: true }).waitFor();
    assert.match(await page.getByRole('img', { name: 'bulbasaur', exact: true }).getAttribute('src'), /shiny/i);
    await page.getByLabel('Shiny mode', { exact: true }).evaluate(input => input.click());

    await bulbasaur.click();
    const detail = page.getByRole('dialog', { name: 'Pokémon details' });
    await detail.getByRole('heading', { name: 'Base Stats' }).waitFor();
    assert.deepEqual(await detail.locator('[class*="statLabel_"]').allTextContents(), ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE']);
    await detail.getByRole('heading', { name: 'Evolution Chain' }).waitFor();
    await detail.getByRole('button', { name: 'ivysaur', exact: true }).first().waitFor();
    await detail.getByRole('button', { name: 'Read Entry' }).waitFor();
    await detail.getByRole('button', { name: 'Play Pokémon cry' }).waitFor();
    await detail.getByRole('heading', { name: 'Forms & Megas' }).waitFor();
    await fits(page, detail.locator('div[class*="dialog_"]').first());
    await shot(page, `pokemon-detail-${name}`);
    await detail.locator('summary').first().click();
    await detail.getByText(/data\/api\/v2\/evolution-chain/).first().waitFor();
    await detail.getByRole('button', { name: 'Add to Team' }).click();
    await detail.getByRole('button', { name: 'Remove from Team' }).waitFor();
    await page.keyboard.press('Escape');
    await detail.waitFor({ state: 'hidden' });

    await page.getByRole('button', { name: 'All', exact: true }).click();
    await search.fill('');
    await page.getByRole('button', { name: 'Compare', exact: true }).click();
    await page.getByRole('button', { name: 'Compare bulbasaur', exact: true }).click();
    await page.getByRole('button', { name: 'Compare ivysaur', exact: true }).click();
    const compare = page.getByRole('dialog', { name: 'Head-to-head comparison' });
    await compare.locator('svg.recharts-surface[role="application"]').waitFor();
    await compare.getByLabel('Winning stat').first().waitFor();
    await fits(page, compare);
    await shot(page, `compare-${name}`);
    await compare.getByRole('button', { name: 'Close comparison' }).click();

    for (const [route, label] of [['types', 'Type Dex'], ['moves', 'Move Dex'], ['tracker', 'Catch Tracker'], ['teambuilder', 'Team Builder']]) {
      if (name !== 'desktop') await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await page.getByRole('navigation').getByRole('button', { name: label, exact: true }).click();
      await page.getByRole('banner').getByRole('heading', { name: label, exact: true }).waitFor();
      if (route === 'types') {
        await page.getByLabel('Primary Type', { exact: true }).selectOption('normal');
        await page.getByLabel('Secondary Type', { exact: true }).selectOption('flying');
        await page.getByText('Immune to', { exact: true }).waitFor();
      } else if (route === 'moves') {
        const field = page.getByPlaceholder('Search moves...');
        await field.fill('tackle');
        await field.clear();
        // The repo's read-only fixture has no resolver for the Prisma-backed Move Dex.
        await page.getByText(/unable to load moves/i).waitFor();
      } else if (route === 'tracker') {
        await page.getByText(/Showing 40 of 1351 Pokémon/).waitFor();
      } else {
        await page.getByText('Add Pokémon #6', { exact: true }).waitFor();
        await page.getByText('bulbasaur', { exact: true }).waitFor();
        await page.getByRole('button', { name: 'Add Pokémon #2', exact: true }).click();
        const teamPicker = page.getByRole('dialog', { name: 'Select Pokémon' });
        await teamPicker.getByLabel('Search Pokémon for team').fill('charmander');
        await teamPicker.getByRole('button', { name: /charmander/ }).click();
        await page.getByRole('button', { name: 'Remove charmander from team' }).click();
        await page.getByRole('button', { name: 'Add Pokémon #2', exact: true }).waitFor();
      }
      await fits(page);
      await shot(page, `${route}-${name}`);
    }
    if (name === 'desktop') {
      for (const route of ['abilities', 'items', 'locations', 'natures', 'calculator', 'walkthrough', 'login', 'register', 'dashboard', 'admin/walkthrough']) {
        await page.goto(`${origin}/${route}`);
        await page.locator('main').waitFor();
        if (route === 'dashboard' || route === 'admin/walkthrough') await page.waitForURL('**/login');
        await fits(page);
      }
    }
    assert.deepEqual(errors, [], name);
    console.log(`PASS ${name} ${width}×${height}`);
    await page.close();
  }
} finally {
  await browser.close();
}
