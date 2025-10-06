import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    ui(),
  ],
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:3000',
      },
    },
  },
})
