import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetifyPlugin from 'vite-plugin-vuetify';

export default defineConfig({
  base: './',
  plugins: [vue(), vuetifyPlugin({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'web3-onboard': ['@web3-onboard/core', '@web3-onboard/injected-wallets'],
          ethers: ['ethers'],
          vuetify: ['vuetify'],
        },
      },
    },
  },
  // Add this to handle module imports properly
  optimizeDeps: {
    include: ['vuetify'],
    exclude: [],
  },
});
