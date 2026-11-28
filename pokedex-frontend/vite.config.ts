import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: false,
      proxy: {
        '/graphql': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
        '/images': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
});
