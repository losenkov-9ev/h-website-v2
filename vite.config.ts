import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: 8097,
  },

  plugins: [react(), svgr({ include: '**/*.svg' })],
});
