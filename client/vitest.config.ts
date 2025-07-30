import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig({
  test: {
    alias: { ...( viteConfig.resolve?.alias ?? {})},
  },
})
