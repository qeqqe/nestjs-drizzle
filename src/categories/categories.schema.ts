import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { posts } from 'src/posts/posts.schema';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
});

export const postToCategories = pgTable(
  'posts_to_categories',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id),
    categoriesId: uuid('category_id')
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.categoriesId, t.postId] }),
  }),
);

// ! MANY(Posts) to MANY(Categories)

export const postToCategoriesRelation = relations(
  postToCategories,
  ({ one }) => ({
    post: one(posts, {
      fields: [postToCategories.postId],
      references: [posts.id],
    }),
    category: one(categories, {
      fields: [postToCategories.categoriesId],
      references: [categories.id],
    }),
  }),
);

export const categoriesRelation = relations(categories, ({ many }) => ({
  postToCategories: many(postToCategories),
}));
