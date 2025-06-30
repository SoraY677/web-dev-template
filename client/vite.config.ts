import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
})
