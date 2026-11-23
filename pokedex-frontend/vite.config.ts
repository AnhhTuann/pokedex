import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {resolveBackendUrl} from './viteBackendUrl';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const backendUrl = resolveBackendUrl({ ...env, ...process.env });
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Keep editor/chart libraries out of the initial shell; they are only
          // needed by AdminWalkthrough and the compare modal respectively.
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (
              id.includes('@tiptap') ||
              id.includes('prosemirror') ||
              id.includes('dompurify') ||
              id.includes('html2canvas')
            ) return 'editor';
            if (id.includes('recharts') || id.includes('/d3-')) return 'charts';
            if (id.includes('@apollo/client') || id.includes('/graphql/')) return 'graphql';
            if (id.includes('/motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
              return 'motion';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: false,
      proxy: {
        '/graphql': {
          target: backendUrl,
          changeOrigin: true,
        },
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
        '/images': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
