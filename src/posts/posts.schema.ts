import { relations } from 'drizzle-orm';
import { boolean, timestamp, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { postToCategories } from 'src/categories/categories.schema';
import { users } from 'src/user/user.schema';

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().notNull(),
  content: text('content').notNull(),
  published: boolean('published').notNull().default(false),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
});

// ! ONE (user) TO MANY (posts)
export const postRelation = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  postToCategories: many(postToCategories),
}));
