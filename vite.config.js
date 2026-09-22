import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        webDevelopment: path.resolve(__dirname, 'web-development.html'),
        hosting: path.resolve(__dirname, 'hosting.html'),
      },
      output: { manualChunks: { three: ['three'] } },
    },
  },
});
