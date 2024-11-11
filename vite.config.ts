import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: {},
    watch: {
      usePolling: true
    },
    proxy: {}, // Add proxy if needed
    strictPort: true,
    middlewareMode: false
  },
  preview: {
    port: 5173,
    strictPort: true,
  }
});