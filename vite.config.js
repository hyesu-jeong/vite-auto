import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index,html'),
        product: resolve(__dirname, 'src/pages/product/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
      },
    },
  },
});
