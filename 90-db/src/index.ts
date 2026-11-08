import { drizzle } from 'drizzle-orm/node-postgres';
import { dbCredentials } from './config.ts';

export const db = drizzle({ connection: dbCredentials });
