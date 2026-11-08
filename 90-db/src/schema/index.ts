import { varchar, timestamp } from 'drizzle-orm/pg-core';

export const ULID = (id: string) => varchar(id, { length: 36 }).notNull()

export const timestampsColumns = {
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
}
