import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './user.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.drizzle.query.users.findMany({
      with: {
        post: true,
      },
    });
  }

  async createUser(user: Omit<typeof schema.users.$inferInsert, 'id'>) {
    const userData = {
      ...user,
      id: randomUUID(),
    };
    return this.drizzle.insert(schema.users).values(userData);
  }
}
