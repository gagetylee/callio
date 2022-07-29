import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  NODE_ENV,
  DB_URL,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  LOG_DIR,
  LOG_FORMAT,
  JWT_SECRET
} = process.env;
