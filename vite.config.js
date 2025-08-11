import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // path 모듈 import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // src 경로를 '@'로 설정
    },
  },
})