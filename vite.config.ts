import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    port: 8097,
    proxy: {
      '/api': {
        target: 'https://sitelabfortest.biz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/apiv2/catalog/get'),
      },
    },
  },

  plugins: [react(), svgr({ include: '**/*.svg' })],
});
