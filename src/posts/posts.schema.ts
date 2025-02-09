import { relations } from 'drizzle-orm';
import { boolean, timestamp, pgTable, text, uuid } from 'drizzle-orm/pg-core';
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

export const postRelation = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
