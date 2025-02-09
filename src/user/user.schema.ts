import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';
import { posts } from 'src/posts/posts.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const userRelation = relations(users, ({ many, one }) => ({
  post: many(posts),
  profile: one(profile, {
    fields: [users.id],
    references: [profile.userId],
  }),
}));

export const profile = pgTable('profile', {
  id: uuid('id').notNull().primaryKey(),
  age: integer('age'),
  bio: text('bio'),
  userId: uuid('user_id').references(() => users.id),
});

// ! One (user) to One (profile)
export const profileRelation = relations(profile, ({ one }) => ({
  user: one(users, {
    fields: [profile.userId],
    references: [users.id],
  }),
}));
