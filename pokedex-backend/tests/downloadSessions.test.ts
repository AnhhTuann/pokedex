import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DownloadSessionStore,
  decodeDownloadContent,
  sanitizeDownloadFilename,
  validateMimeType,
} from '../src/lib/downloadSessions.js';

test('sanitizeDownloadFilename strips directories and dangerous characters', () => {
  assert.equal(sanitizeDownloadFilename('team.json'), 'team.json');
  assert.equal(sanitizeDownloadFilename('../../etc/passwd'), 'passwd');
  assert.equal(sanitizeDownloadFilename('bad"name.txt'), 'bad_name.txt');
  assert.throws(() => sanitizeDownloadFilename(42));
  assert.throws(() => sanitizeDownloadFilename('..'));
});

test('validateMimeType blocks active and unknown content types', () => {
  assert.equal(validateMimeType('application/json'), 'application/json');
  assert.equal(validateMimeType('image/WEBP'), 'image/webp');
  assert.throws(() => validateMimeType('text/html'));
  assert.throws(() => validateMimeType('image/svg+xml'));
});

test('decodeDownloadContent enforces a size limit', () => {
  assert.equal(decodeDownloadContent('hello').toString(), 'hello');
  assert.equal(decodeDownloadContent('aGk=', true).toString(), 'hi');
  assert.throws(() => decodeDownloadContent(''));
  assert.throws(() => decodeDownloadContent('x'.repeat(3 * 1024 * 1024)));
});

test('download tokens are single-use, expiring and bounded', () => {
  let now = 1_000;
  const store = new DownloadSessionStore(50, 2, () => now, () => 'fixed-token');

  const token = store.create({
    filename: 'team.json',
    mimeType: 'application/json',
    content: '{}',
  });
  assert.equal(token, 'fixed-token');
  assert.equal(store.size, 1);
  assert.equal(store.take(token)?.data.toString(), '{}');
  assert.equal(store.take(token), null);
  assert.equal(store.size, 0);

  store.create({ filename: 'a.txt', mimeType: 'text/plain', content: 'a' });
  now += 51;
  assert.equal(store.take('fixed-token'), null);
  assert.equal(store.size, 0);
});
