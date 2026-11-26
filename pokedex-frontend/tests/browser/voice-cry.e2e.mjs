import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const origin = process.env.PHASE9C_ORIGIN || 'http://127.0.0.1:5299';
const browser = await chromium.launch({ executablePath: process.env.PHASE9C_CHROME || '/usr/bin/google-chrome-stable', args: ['--no-sandbox'] });
const results = {};

async function openBulbasaur(page) {
  await page.goto(origin);
  await page.getByRole('button', { name: 'View bulbasaur', exact: true }).click();
  const detail = page.getByRole('dialog', { name: 'Pokémon details' });
  await detail.getByRole('button', { name: 'Read Entry' }).waitFor();
  return detail;
}

try {
  const native = await browser.newPage();
  await native.addInitScript(() => {
    window.mediaEvidence = { speech: [], cry: [] };
    const originalSpeak = speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.speak = utterance => {
      for (const event of ['start', 'pause', 'resume', 'end', 'error']) utterance.addEventListener(event, e => {
        window.mediaEvidence.speech.push({ event, error: e.error, lang: utterance.lang, voice: utterance.voice?.name });
      });
      originalSpeak(utterance);
    };
    const NativeAudio = window.Audio;
    window.Audio = class extends NativeAudio {
      constructor(url) {
        super(url);
        window.mediaEvidence.cry.push({ event: 'created', url });
        for (const event of ['loadeddata', 'playing', 'ended', 'error']) this.addEventListener(event, () => {
          window.mediaEvidence.cry.push({ event, volume: this.volume, code: this.error?.code });
        });
      }
    };
  });
  native.on('requestfailed', request => {
    if (request.resourceType() === 'media') (results.nativeNetwork ??= []).push([request.url(), request.failure()?.errorText]);
  });
  const nativeDetail = await openBulbasaur(native);
  results.voices = await native.evaluate(() => speechSynthesis.getVoices().map(voice => ({ name: voice.name, language: voice.lang })));
  await nativeDetail.getByRole('button', { name: 'Read Entry' }).click();
  await nativeDetail.getByRole('button', { name: 'Play Pokémon cry' }).click();
  await native.waitForFunction(() => window.mediaEvidence.cry.some(row => ['ended', 'error'].includes(row.event)), null, { timeout: 7000 }).catch(() => {});
  results.native = await native.evaluate(() => window.mediaEvidence);
  await native.close();

  const mock = await browser.newPage({ reducedMotion: 'reduce' });
  await mock.addInitScript(() => {
    window.mockAudio = { calls: [], failCry: false, utterance: null, audio: null };
    const state = window.mockAudio;
    window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
    Object.defineProperty(window, 'speechSynthesis', { value: {
      getVoices: () => [{ name: 'Fixture French', lang: 'fr-FR' }, { name: 'Fixture English', lang: 'en-GB' }],
      speak: utterance => { state.utterance = utterance; state.calls.push(['speak', utterance.lang]); utterance.onstart?.(); },
      pause: () => state.calls.push(['pause']),
      resume: () => state.calls.push(['resume']),
      cancel: () => state.calls.push(['cancel']),
    } });
    class MockAudio {
      constructor(url) { state.audio = this; this.url = url; }
      play() { state.calls.push(['play', this.volume, this.url]); return state.failCry ? Promise.reject(new Error('fixture playback failure')) : Promise.resolve(); }
      pause() { state.calls.push(['audio pause']); }
      removeAttribute(name) { state.calls.push(['remove attribute', name]); }
      load() { state.calls.push(['audio load']); }
    }
    window.Audio = MockAudio;
  });
  const detail = await openBulbasaur(mock);
  const read = detail.getByRole('button', { name: 'Read Entry' });
  const cry = detail.getByRole('button', { name: 'Play Pokémon cry' });
  await read.click();
  await detail.getByRole('button', { name: 'Pause', exact: true }).click();
  await detail.getByRole('button', { name: 'Resume', exact: true }).click();
  await detail.getByRole('button', { name: 'Stop reading' }).click();
  await read.click();
  await mock.evaluate(() => window.mockAudio.utterance.onend());
  await read.waitFor();
  await read.click();
  await mock.evaluate(() => window.mockAudio.utterance.onerror());
  await detail.getByText('Unable to read this entry aloud.').waitFor();
  await cry.click();
  assert.equal(await cry.isDisabled(), true);
  await mock.evaluate(() => window.mockAudio.audio.onended());
  await cry.waitFor();
  await mock.waitForFunction(() => !document.querySelector('button[aria-label="Play Pokémon cry"]').disabled);
  await mock.evaluate(() => { window.mockAudio.failCry = true; });
  await cry.click();
  await detail.getByText('Unable to play this Pokémon’s cry.').waitFor();
  await mock.evaluate(() => { window.mockAudio.failCry = false; });
  await cry.click();
  await read.click();
  await detail.getByRole('button', { name: 'ivysaur', exact: true }).first().click();
  await detail.getByRole('heading', { name: 'ivysaur', exact: true }).waitFor();
  assert.equal((await mock.evaluate(() => window.mockAudio.calls)).at(-1)[0], 'audio load');
  await detail.getByRole('button', { name: 'Play Pokémon cry' }).click();
  await detail.getByRole('button', { name: 'Read Entry' }).click();
  await mock.keyboard.press('Escape');
  await detail.waitFor({ state: 'hidden' });
  results.mockCalls = await mock.evaluate(() => window.mockAudio.calls);
  assert.deepEqual(results.mockCalls.slice(0, 4), [['speak', 'en-GB'], ['pause'], ['resume'], ['cancel']]);
  assert.ok(results.mockCalls.some(call => call[0] === 'play' && call[1] === 0.5 && call[2].includes('/1.ogg')));
  assert.ok(results.mockCalls.filter(call => call[0] === 'audio pause').length >= 3);
  assert.equal(results.mockCalls.at(-1)[0], 'audio load');
  const missing = await browser.newPage();
  await missing.route('**/graphql', async route => {
    if (route.request().postDataJSON()?.operationName !== 'BrowseReferenceDetail') return route.continue();
    const response = await route.fetch();
    const json = await response.json();
    json.data.referencePokemon.cry = null;
    return route.fulfill({ response, json });
  });
  const missingDetail = await openBulbasaur(missing);
  assert.equal(await missingDetail.getByRole('button', { name: 'Play Pokémon cry' }).count(), 0);
  await missing.close();
  results.missingCry = 'PASSED_MOCK';
  results.mock = 'PASSED';
} finally {
  if (process.env.PHASE10_RESULTS) await writeFile(process.env.PHASE10_RESULTS, JSON.stringify(results, null, 2));
  await browser.close();
}
