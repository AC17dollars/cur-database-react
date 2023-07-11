import mysql from "mysql2";

const { SQL_HOST, SQL_PORT, SQL_USER, SQL_PASSWORD, SQL_DATABASE } =
  process.env;
const pl = mysql.createPool({
  host: SQL_HOST,
  port: parseInt(SQL_PORT!),
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false,
  },
});

const pool = pl.promise();

export default pool;
