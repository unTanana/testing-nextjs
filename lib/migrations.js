const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_DATABASE,
});

pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY,
      username text,
      password text,
      description text
  );
  
  CREATE UNIQUE INDEX IF NOT EXISTS users_pkey ON users(id uuid_ops);
  `
  )
  .then((res) => {
    console.log(res);
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
