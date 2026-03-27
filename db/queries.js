import pool from "./pool.js";

export async function getAllClasses() {
  const { rows } = await pool.query("SELECT * FROM classes");
  return rows;
}

export async function insertClassname(className) {
  await pool.query("INSERT INTO classes (class_name) VALUES ($1)", [className]);
}
