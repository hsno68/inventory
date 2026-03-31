import pool from "./pool.js";

// **Classes

//Read all classes
export async function getAllClasses() {
  const { rows } = await pool.query("SELECT * FROM classes ORDER BY id");
  return rows;
}

//Read a single class
export async function getClass(id) {
  const { rows } = await pool.query("SELECT class_name FROM classes WHERE id = $1", [id]);
  return rows[0];
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

//Read a single stat
export async function getStat(id) {
  const { rows } = await pool.query("SELECT stat_name FROM stats WHERE id = $1", [id]);
  return rows[0];
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
export async function insertItem({ itemName, itemCost, itemClass, stats }) {
  const { rows } = await pool.query(
    "INSERT INTO items (item_name, item_cost) VALUES ($1, $2) RETURNING id",
    [itemName, itemCost]
  );

  const { id: item_id } = rows[0];
}
