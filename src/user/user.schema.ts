import { jsonb, pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const profileInfo = pgTable('profileInfo', {
  id: uuid('id').primaryKey(),
  metadata: jsonb('metadata'),
  userId: uuid('userId')
    .references(() => users.id)
    .notNull(),
});
