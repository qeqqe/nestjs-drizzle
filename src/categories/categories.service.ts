import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as schema from './categories.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async getCategories() {
    return await this.drizzle.select().from(schema.categories);
  }

  async createCategory(name: string) {
    const categoryData = {
      id: randomUUID(),
      name,
    };
    return await this.drizzle.insert(schema.categories).values(categoryData);
  }

  async addToPost(postToCategory: typeof schema.postToCategories.$inferInsert) {
    return await this.drizzle
      .insert(schema.postToCategories)
      .values(postToCategory);
  }
}
