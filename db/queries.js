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
  const { rows } = await pool.query(`
    SELECT 
      items.id AS item_id,
      items.item_name,
      items.item_cost,
      classes.id AS class_id,
      classes.class_name,
      stats.id AS stat_id,
      stats.stat_name,
      item_stats.stat_value
    FROM items
    LEFT JOIN item_classes ON items.id = item_classes.item_id
    LEFT JOIN classes ON item_classes.class_id = classes.id
    LEFT JOIN item_stats ON items.id = item_stats.item_id
    LEFT JOIN stats ON item_stats.stat_id = stats.id
    ORDER BY items.id;
  `);

  const itemsMap = {};

  for (const row of rows) {
    const itemId = row.item_id;

    if (!itemsMap[itemId]) {
      itemsMap[itemId] = {
        id: itemId,
        name: row.item_name,
        cost: row.item_cost,
        classes: [],
        stats: [],
      };
    }

    // Add class if exists and not already added
    if (row.class_id && !itemsMap[itemId].classes.some((cls) => cls.id === row.class_id)) {
      itemsMap[itemId].classes.push({
        id: row.class_id,
        name: row.class_name,
      });
    }

    // Add stat if exists
    if (row.stat_id && !itemsMap[itemId].stats.some((stat) => stat.id === row.stat_id)) {
      itemsMap[itemId].stats.push({
        id: row.stat_id,
        name: row.stat_name,
        value: Number(row.stat_value),
      });
    }
  }

  // Convert map to array
  return Object.values(itemsMap);
}

//Create an item
export async function insertItem({ itemName, itemCost, class_id, stats }) {
  const { rows } = await pool.query(
    "INSERT INTO items (item_name, item_cost) VALUES ($1, $2) RETURNING id",
    [itemName, itemCost]
  );

  const { id: item_id } = rows[0];

  await pool.query("INSERT INTO item_classes (item_id, class_id) VALUES ($1, $2)", [
    item_id,
    class_id,
  ]);

  for (const [stat_id, stat_value] of Object.entries(stats)) {
    await pool.query("INSERT INTO item_stats (item_id, stat_id, stat_value) VALUES ($1, $2, $3)", [
      item_id,
      stat_id,
      stat_value,
    ]);
  }
}
