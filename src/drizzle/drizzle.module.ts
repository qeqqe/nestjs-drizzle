import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './drizzle.schema';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const DATABASE_URL = config.getOrThrow<string>('DATABSE_URL');
        const pool = new Pool({
          connectionString: DATABASE_URL,
          ssl: true,
        });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],

  exports: [DRIZZLE],
})
export class DrizzleModule {}
