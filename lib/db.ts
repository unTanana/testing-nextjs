import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'docker',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

export default pool;
