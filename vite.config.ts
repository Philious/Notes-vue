import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path';

// https://vitejs.dev/config/
// https://vueschool.io/articles/vuejs-tutorials/how-to-package-and-distribute-a-vue-js-3-plugin-on-npm/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
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
    //basicSsl(),
  ],
})
