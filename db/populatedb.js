import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const SQL = `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item_name VARCHAR(100) UNIQUE NOT NULL,
    item_cost INTEGER NOT NULL CHECK (item_cost >= 0)
  );

  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    stat_name VARCHAR(100) UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    class_name VARCHAR(100) UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS item_stats (
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    stat_id INTEGER NOT NULL REFERENCES stats(id) ON DELETE CASCADE,
    stat_value NUMERIC NOT NULL,
    PRIMARY KEY (item_id, stat_id)
  );

  CREATE TABLE IF NOT EXISTS item_classes (
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    PRIMARY KEY (item_id, class_id)
  );
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
