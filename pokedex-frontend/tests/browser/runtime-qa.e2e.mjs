import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const origin = process.env.PHASE9C_ORIGIN || 'http://127.0.0.1:5299';
const browser = await chromium.launch({ executablePath: process.env.PHASE9C_CHROME || '/usr/bin/google-chrome-stable', args: ['--no-sandbox'] });
const report = [];
const chapter = { id: 42, gameVersion: 'emerald', language: 'vi', chapterTitle: 'Fixture chapter', description: '', coverImage: '', order: 1, content: '<p>Existing content</p>' };
const account = { id: 1, username: 'fixture-user', email: 'fixture@example.invalid', isAdmin: false };
const move = {
  name: 'tackle', type: 'normal', power: null, accuracy: null, pp: null,
  generation: 1, description: null, effect: null, damageClass: null,
};

async function createPage(viewport, result) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  page.setDefaultTimeout(12000);
  result.pageErrors = [];
  result.console = [];
  result.network = [];
  page.on('pageerror', error => result.pageErrors.push(error.message));
  page.on('console', message => {
    if (['error', 'warning'].includes(message.type())) result.console.push(message.text());
  });
  page.on('requestfailed', request => result.network.push([new URL(request.url()).pathname, request.failure()?.errorText]));
  page.on('response', response => { if (response.status() >= 400) result.network.push([new URL(response.url()).pathname, response.status()]); });
  return page;
}

try {
  for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 768, 1024], ['mobile', 390, 844]]) {
    const result = { name };
    report.push(result);
    const page = await createPage({ width, height }, result);
    await page.addInitScript(() => {
      const createObjectURL = URL.createObjectURL.bind(URL);
      URL.createObjectURL = blob => {
        if (blob.type === 'application/json') blob.text().then(text => { window.exportedTeam = text; });
        return createObjectURL(blob);
      };
    });
    const moveRequests = [];
    let failPage = true;
    let cmsWrites = 0;
    const builderIds = [];
    let rejectLogin = true;
    await page.route('**/graphql', async route => {
      const { operationName, variables } = route.request().postDataJSON();
      const auth = route.request().headers().authorization;
      const respond = data => route.fulfill({ json: { data } });
      const refuse = message => route.fulfill({ json: { errors: [{ message }] } });
      if (operationName === 'GetAllMoves') {
        moveRequests.push(variables);
        if (variables.offset && failPage) { failPage = false; return refuse('Fixture pagination failure'); }
        const filtered = variables.search || variables.gen || variables.type || variables.damageClass;
        return respond({ getAllMoves: { results: variables.offset
          ? [{ ...move, name: 'growl', damageClass: 'status' }]
          : filtered ? [{ ...move, damageClass: 'physical' }] : [move], totalCount: filtered ? 1 : 2 } });
      }
      if (operationName === 'GetPokemonBuilderDetails') {
        builderIds.push(variables.id);
        return respond({ pokemon: { id: variables.id, name: 'venusaur-mega', types: ['grass', 'poison'], image: '',
          abilities: ['thick-fat'], stats: [], moves: [{ ...move, damageClass: 'physical' }] } });
      }
      if (operationName === 'Me') return respond({ me: auth === 'Bearer fixture-admin' ? { ...account, isAdmin: true } : auth === 'Bearer fixture-user' ? account : null });
      if (operationName === 'Login') {
        if (rejectLogin) { rejectLogin = false; return refuse('Invalid username or password'); }
        return respond({ login: { token: 'fixture-user', user: account } });
      }
      if (operationName === 'Register') return refuse('Username or email is already in use');
      if (operationName === 'GetDashboardData') return respond({ myTeam: [], myFavorites: [] });
      if (operationName === 'GetMyFavorites') return respond({ myFavorites: [] });
      if (operationName === 'GetWalkthroughs') return respond({ getWalkthroughs: [chapter] });
      if (operationName === 'UpsertWalkthrough') {
        cmsWrites++;
        assert.equal(auth, 'Bearer fixture-admin');
        assert.equal(variables.id, chapter.id);
        return refuse('Fixture save rejected');
      }
      return route.continue();
    });

    await page.goto(origin + '/moves');
    await page.getByRole('heading', { name: 'Tackle', exact: true }).click();
    await page.getByText('Unknown', { exact: true }).last().waitFor();
    await page.locator('button[class*="drawerClose"], button[class*="closeBtn"]').first().click();
    const more = page.getByRole('button', { name: 'Load More Moves' });
    const retry = page.getByText('Unable to load more moves. Try again.');
    if (!await retry.isVisible()) await more.evaluate(button => button.click());
    await retry.waitFor();
    await more.evaluate(button => button.click());
    await page.getByRole('heading', { name: 'Growl', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Filter by Generation' }).click();
    await page.getByText(/^Gen 1\b/).first().click();
    await page.getByRole('button', { name: 'Filter by Type' }).click();
    await page.getByText('Fire', { exact: true }).first().click();
    await page.getByRole('button', { name: 'Filter by Category' }).click();
    await page.getByText('Physical', { exact: true }).first().click();
    await page.getByPlaceholder('Search moves...').fill('tack');
    await page.waitForResponse(r => r.url().endsWith('/graphql') && r.request().postDataJSON()?.variables?.search === 'tack');
    assert.ok(moveRequests.some(v => v.gen === 1 && v.type === 'fire' && v.damageClass === 'physical' && v.search === 'tack'));
    result.moveDex = 'PASSED_MOCK';

    await page.goto(origin + '/teambuilder');
    await page.getByRole('button', { name: 'Add Pokémon #6' }).waitFor();
    assert.equal(await page.getByRole('button', { name: /Add Pokémon #/ }).count(), 6);
    const selectPokemon = async (slot, search, match) => {
      await page.getByRole('button', { name: 'Add Pokémon #' + slot }).click();
      const picker = page.getByRole('dialog', { name: 'Select Pokémon' });
      await picker.getByLabel('Search Pokémon for team').fill(search);
      await picker.getByRole('button', { name: match }).first().click();
    };
    await selectPokemon(1, 'venusaur-mega', /venusaur-mega/);
    await page.getByLabel('Ability for venusaur-mega').selectOption('thick-fat');
    assert.ok(builderIds.includes(10033));
    await page.getByLabel('Move 1 for venusaur-mega').selectOption('tackle');
    await page.getByLabel('Held item for venusaur-mega').selectOption('Life Orb');
    await page.getByLabel('Nature for venusaur-mega').selectOption('Modest');
    await selectPokemon(2, 'charmander', /charmander/);
    await page.getByRole('button', { name: 'Remove charmander from team' }).click();
    await selectPokemon(2, 'ivysaur', /ivysaur/);
    assert.equal(await page.getByLabel('Move 1 for venusaur-mega').inputValue(), 'tackle');
    const upload = page.locator('input[type=file]');
    const importJson = value => upload.setInputFiles({ name: 'team.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(value)) });
    await importJson([null]);
    await page.getByText('Invalid or duplicate Pokémon in the team file.').waitFor();
    assert.equal(await page.getByLabel('Ability for venusaur-mega').inputValue(), 'thick-fat');
    await page.getByRole('button', { name: 'Export Team' }).click();
    const downloads = [];
    page.on('download', file => downloads.push(file.suggestedFilename()));
    await page.getByText('Save as JSON', { exact: true }).click();
    await page.waitForFunction(() => typeof window.exportedTeam === 'string');
    const exported = JSON.parse(await page.evaluate(() => window.exportedTeam));
    result.teamDownloadEvents = downloads;
    assert.equal(exported[0].id, 10033);
    assert.equal(exported[0].selectedItem, 'Life Orb');
    assert.equal(exported[0].moves[0].name, 'tackle');
    await page.reload();
    await page.getByRole('button', { name: 'Add Pokémon #1' }).waitFor();
    await importJson(exported);
    await page.getByText('Team imported!').waitFor();
    assert.equal(await page.getByLabel('Nature for venusaur-mega').inputValue(), 'Modest');
    result.team = 'PASSED_FIXTURE_AND_MOCK';

    await page.goto(origin + '/admin/walkthrough');
    await page.waitForURL('**/login');
    const login = page.locator('form');
    await login.locator('input[type=text]').fill('fixture-user');
    await login.locator('input[type=password]').fill('fixture-password');
    await login.getByRole('button', { name: 'Login' }).click();
    await page.getByText('Invalid username or password').waitFor();
    await login.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    await page.getByText('Welcome, fixture-user!').waitFor();
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL(origin + '/');
    assert.equal(await page.evaluate(() => localStorage.getItem('token')), null);
    const setSession = async (token, route) => {
      await page.evaluate(({ token, account }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ ...account, isAdmin: true }));
      }, { token, account });
      await page.goto(origin + route);
    };
    await setSession('fixture-expired', '/dashboard');
    await page.waitForURL('**/login');
    assert.equal(await page.evaluate(() => localStorage.getItem('token')), null);
    await setSession('fixture-user', '/admin/walkthrough');
    await page.waitForURL('**/login');
    assert.equal(cmsWrites, 0);
    await page.goto(origin + '/register');
    const register = page.locator('form');
    await register.locator('input[type=text]').fill('fixture-user');
    await register.locator('input[type=email]').fill('fixture@example.invalid');
    await register.locator('input[type=password]').fill('fixture-password');
    await register.getByRole('button', { name: 'Register' }).click();
    await page.getByText('Username or email is already in use').waitFor();
    result.auth = 'PASSED_MOCK';

    await setSession('fixture-admin', '/admin/walkthrough');
    await page.getByText('1: Fixture chapter').click();
    await page.locator('.tiptap').getByText('Existing content').waitFor();
    const title = page.getByPlaceholder('e.g. 1. Rustboro City & First Gym');
    await title.fill('');
    await page.getByRole('button', { name: 'Update', exact: true }).click();
    await page.getByText('Please enter a chapter title!').waitFor();
    assert.equal(cmsWrites, 0);
    await title.fill('Unsaved draft');
    await page.getByRole('button', { name: 'Update', exact: true }).click();
    await page.getByText(/Fixture save rejected/).waitFor();
    assert.equal(await title.inputValue(), 'Unsaved draft');
    await page.getByText('1: Fixture chapter').waitFor();
    assert.equal(cmsWrites, 1);
    result.cms = 'PASSED_MOCK_REJECTED_SAVE';
    assert.deepEqual(result.pageErrors, []);
    await page.close();
    console.log('PASS', name);
  }
} finally {
  if (process.env.PHASE10_RESULTS) await writeFile(process.env.PHASE10_RESULTS, JSON.stringify(report, null, 2));
  await browser.close();
}
