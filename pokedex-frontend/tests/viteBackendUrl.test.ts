import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveBackendUrl } from '../viteBackendUrl.ts';

test('dev proxy falls back to localhost when no backend URL is configured', () => {
  assert.equal(resolveBackendUrl({}), 'http://localhost:3000');
  assert.equal(resolveBackendUrl({ VITE_BACKEND_URL: '   ' }), 'http://localhost:3000');
});

test('dev proxy reads VITE_BACKEND_URL from Vite-loaded env', () => {
  assert.equal(
    resolveBackendUrl({ VITE_BACKEND_URL: '  http://127.0.0.1:4000  ' }),
    'http://127.0.0.1:4000',
  );
});
