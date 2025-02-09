import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/**/*.schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
