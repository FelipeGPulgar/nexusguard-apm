import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: connectionString?.includes('supabase') || connectionString?.includes('neon')
    ? { rejectUnauthorized: false }
    : false,
});

pool.on('connect', () => {
  console.log('🛢️ PostgreSQL Database connected successfully!');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL Database connection error:', err);
});
