import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './posts.schema';
import * as userSchema from '../user/user.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: NodePgDatabase<typeof schema & typeof userSchema>,
  ) {}

  async getPosts() {
    return await this.drizzle.query.posts.findMany({});
  }

  async createPost(post: Omit<typeof schema.posts.$inferInsert, 'id'>) {
    const postData = {
      ...post,
      id: randomUUID(),
    };
    return await this.drizzle.insert(schema.posts).values(postData);
  }
}
