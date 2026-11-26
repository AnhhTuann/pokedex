import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: process.env.PHASE9C_CHROME || '/usr/bin/google-chrome-stable',
  args: ['--no-sandbox'],
});
const origin = process.env.PHASE9C_ORIGIN || 'http://127.0.0.1:5199';

try {
  for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 768, 1024], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.goto(origin);
    await page.getByText('1351 Pokémon', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Load More' }).click();
    await page.locator('img[alt="arbok"]').waitFor();
    await page.getByLabel('Region', { exact: true }).selectOption('unova');
    await page.getByLabel('Exact Dex', { exact: true }).selectOption('original-unova');
    await page.getByPlaceholder('Search by name or #...').fill('victini');
    await page.getByText('000', { exact: true }).waitFor();
    await page.getByLabel('Region', { exact: true }).selectOption('');
    await page.getByLabel('Exact Dex', { exact: true }).selectOption('lumiose-city');
    await page.getByPlaceholder('Search by name or #...').fill('chikorita');
    await page.getByText('001', { exact: true }).waitFor();
    const version = page.locator('#game-version-selector-btn');
    if (await version.isVisible()) {
      await version.click();
      await page.getByRole('button', { name: /^legends: z-a$/i }).click();
      const hyperspace = page.waitForResponse(response => response.url().endsWith('/graphql') &&
        response.request().method() === 'POST' &&
        response.request().postDataJSON()?.variables?.filters?.dex === 'hyperspace');
      await page.getByRole('button', { name: 'Hyperspace Dex' }).click();
      assert.equal((await (await hyperspace).json()).errors, undefined);
      await page.getByRole('button', { name: 'Lumiose City Dex' }).click();
      await page.getByText('001', { exact: true }).waitFor();
      await page.locator('img[alt="chikorita"]').click();
      await page.getByRole('heading', { name: 'Game evidence' }).waitFor();
      // A navigation resets the game and filters for the remaining scenarios.
      await page.goto(origin);
    }
    await page.getByLabel('Exact Dex', { exact: true }).selectOption('hyperspace');
    await page.getByLabel('Exact Dex', { exact: true }).selectOption('');
    await page.getByPlaceholder('Search by name or #...').fill('aegislash');
    await page.getByRole('img', { name: 'aegislash-shield — Normal artwork unavailable' }).waitFor();
    const shiny = page.locator('#global-shiny-toggle input');
    if (await shiny.isVisible()) {
      await page.locator('#global-shiny-toggle').click();
      await page.getByRole('img', { name: 'aegislash-shield — Shiny artwork unavailable' }).waitFor();
    }
    await page.goto(origin + '/tracker');
    await page.getByText(/Showing 40 of 1351 Pokémon/).waitFor();
    await page.getByPlaceholder('Search by name or number...').fill('bulbasaur');
    await page.getByText(/Showing 1 of 1 Pokémon/).waitFor();
    await page.getByRole('button', { name: 'Mark Current As Caught' }).click();
    await page.getByRole('button', { name: 'Yes, Mark All' }).click();
    await page.getByText(/Caught: 1 \/ 1351/).waitFor();
    await page.reload();
    await page.getByText(/Caught: 1 \/ 1351/).waitFor();
    assert.deepEqual(pageErrors, [], name);
    console.log(`PASS ${name} ${width}x${height}`);
    await page.close();
  }
} finally {
  await browser.close();
}
