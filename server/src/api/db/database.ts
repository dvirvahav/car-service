import knex, { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();
export const db: Knex<any, unknown[]> = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});
