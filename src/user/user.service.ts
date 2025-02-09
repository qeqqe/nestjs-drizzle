import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as userSchema from './user.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: NodePgDatabase<typeof userSchema>,
  ) {}

  async getUsers() {
    return this.drizzle.query.users.findMany();
  }
}
