import { defineConfig } from 'drizzle-kit';
import { dbCredentials } from './src/config.ts';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './migration',
  dbCredentials,
});
