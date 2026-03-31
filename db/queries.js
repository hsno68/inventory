import pool from "./pool.js";

// **Classes

//Read all classes
export async function getAllClasses() {
  const { rows } = await pool.query("SELECT * FROM classes ORDER BY id");
  return rows;
}

//Create a class
export async function insertClass(className) {
  await pool.query("INSERT INTO classes (class_name) VALUES ($1)", [className]);
}

//Update a class
export async function updateClass(oldClass, newClass) {
  if (oldClass === newClass) {
    return;
  }

  const { rows } = await pool.query("SELECT * FROM classes WHERE class_name = $1", [newClass]);

  if (rows.length > 0) {
    throw new Error("Class already exists");
  }

  await pool.query("UPDATE classes SET class_name = $1 WHERE class_name = $2", [
    newClass,
    oldClass,
  ]);
}

//Delete a class
export async function deleteClass(className) {
  await pool.query("DELETE FROM classes WHERE class_name = $1", [className]);
}

// **Stats

//Read all stats
export async function getAllStats() {
  const { rows } = await pool.query("SELECT * FROM stats ORDER BY id");
  return rows;
}

//Create a stat
export async function insertStat(statName) {
  await pool.query("INSERT INTO stats (stat_name) VALUES ($1)", [statName]);
}

//Update a stat
export async function updateStat(oldStat, newStat) {
  if (oldStat === newStat) {
    return;
  }

  const { rows } = await pool.query("SELECT * FROM stats WHERE stat_name = $1", [newStat]);

  if (rows.length > 0) {
    throw new Error("Stat already exists");
  }

  await pool.query("UPDATE stats SET stat_name = $1 WHERE stat_name = $2", [newStat, oldStat]);
}

//Delete a stat
export async function deleteStat(statName) {
  await pool.query("DELETE FROM stats WHERE stat_name = $1", [statName]);
}

// **Items

//Read all items
export async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

//Create an item
export async function insertItem(itemName) {}
