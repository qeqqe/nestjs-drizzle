import { relations } from 'drizzle-orm';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { posts } from 'src/posts/posts.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const userRelation = relations(users, ({ many }) => ({
  post: many(posts),
}));
