import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const port = Number(process.env.CLIENT_PORT ?? 80)

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@tests': path.resolve(__dirname, './src/tests'),
      '@types': path.resolve(__dirname, './src/types'),
      '@usecases': path.resolve(__dirname, './src/usecases'),
    },
  },
})
