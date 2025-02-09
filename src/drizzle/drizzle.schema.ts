import { jsonb, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const profileInfo = pgTable('profileInfo', {
  id: uuid('id').primaryKey(),
  metadata: jsonb('metadata'),
  userId: uuid('userId')
    .references(() => users.id)
    .notNull(),
});
