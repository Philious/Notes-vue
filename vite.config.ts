import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

import path from 'path';
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
          @use '@/assets/styles/_scss_variables' as *;
          @use '@/assets/styles/_mixins.scss' as *;
        `
      }
    }
  },
  plugins: [
    vue(),
  ],
})
