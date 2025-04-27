import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import vuetifyPlugin from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vueDevTools(), vuetifyPlugin({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Enable top-level await and other modern features
      target: 'es2020',
    },
    include: ['vuetify'],
    exclude: [],
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'web3-onboard': ['@web3-onboard/core', '@web3-onboard/injected-wallets'],
          ethers: ['ethers'],
        },
      },
    },
  },
});
