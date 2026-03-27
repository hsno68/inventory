import pool from "./pool.js";

export async function getAllClasses() {
  const { rows } = await pool.query("SELECT * FROM classes");
  return rows;
}

export async function getAllStats() {
  const { rows } = await pool.query("SELECT * FROM stats");
  return rows;
}

export async function insertClassName(className) {
  await pool.query("INSERT INTO classes (class_name) VALUES ($1)", [className]);
}

export async function insertStatName(statName) {
  await pool.query("INSERT INTO stats (stat_name) VALUES ($1)", [statName]);
}
