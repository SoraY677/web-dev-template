import { defineConfig  } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { getEnv } from '../common/src/env'

const domain = getEnv().DOMAIN
process.env.VITE_DOMAIN = domain ? `https://${domain}` : 'http://localhost'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  server: {
    host: true,
    port: Number(process.env.CLIENT_PORT ?? 80),
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@common': path.resolve(__dirname, './../common/src'),
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
