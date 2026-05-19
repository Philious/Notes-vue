import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

export default defineConfig({
    resolve: {
    alias: {"@": path.resolve(__dirname, "./src")},
  },
  css: {
    preprocessorOptions: {
      scss: {
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
