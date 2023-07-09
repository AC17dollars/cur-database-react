import pg from "pg";
const { PG_USER, PG_PASSWORD, PG_HOST, PG_DATABASE, PG_PORT } = process.env;

const pool = new pg.Pool({
  host: PG_HOST,
  port: parseInt(PG_PORT as string),
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  ssl: true,
  connectionTimeoutMillis: 0,
  allowExitOnIdle: true,
});

export default pool;
