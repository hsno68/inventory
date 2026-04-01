import * as db from "./db/queries.js";

//Homepage

export function getHomepage(req, res) {
  res.render("layout", { title: "Inventory", page: "pages/homepage", css: "/homepage.css" });
}

//Classes

//GET new class form
export function getNewClass(req, res) {
  res.render("layout", {
    title: "New Class",
    page: "pages/classes/classes-form",
    css: "/form.css",
  });
}

//Read all classes
export async function getClasses(req, res) {
  const classes = await db.getAllClasses();
  res.render("layout", {
    title: "Classes",
    page: "pages/classes/classes.ejs",
    css: "/form.css",
    classes: classes,
  });
}

//Read a single class
export async function getClass(req, res) {
  const { id } = req.params;
  const championClass = await db.getClass(id);
  const { class_name } = championClass;

  res.render("layout", {
    title: class_name,
    page: "pages/classes/single-class",
    css: "/form.css",
    id: id,
    class_name: class_name,
  });
}

//Create a class
export async function createClass(req, res) {
  const { className } = req.body;
  await db.insertClass(className);
  res.redirect("/classes");
}

//Update a class
export async function updateClass(req, res) {
  const { id } = req.params;
  const championClass = await db.getClass(id);
  const { class_name: oldClass } = championClass;
  const { className: newClass } = req.body;

  await db.updateClass(oldClass, newClass);
  res.redirect("/classes");
}

//Delete a class
export async function deleteClass(req, res) {
  const { id } = req.params;
  const championClass = await db.getClass(id);
  const { class_name } = championClass;

  await db.deleteClass(class_name);
  res.redirect("/classes");
}

//Stats

//GET new stat form
export function getNewStat(req, res) {
  res.render("layout", { title: "New Stat", page: "pages/stats/stats-form", css: "/form.css" });
}

//Read all stats
export async function getStats(req, res) {
  const stats = await db.getAllStats();
  res.render("layout", {
    title: "Stats",
    page: "pages/stats/stats.ejs",
    css: "/form.css",
    stats: stats,
  });
}

//Read a single stat
export async function getStat(req, res) {
  const { id } = req.params;
  const stat = await db.getStat(id);
  const { stat_name } = stat;

  res.render("layout", {
    title: stat_name,
    page: "pages/stats/single-stat",
    css: "/form.css",
    id: id,
    stat_name: stat_name,
  });
}

//Create a stat
export async function createStat(req, res) {
  const { statName } = req.body;
  await db.insertStat(statName);
  res.redirect("/stats");
}

//Update a stat
export async function updateStat(req, res) {
  const { id } = req.params;
  const stat = await db.getStat(id);
  const { stat_name: oldStat } = stat;
  const { statName: newStat } = req.body;

  await db.updateStat(oldStat, newStat);
  res.redirect("/stats");
}

//Delete a stat
export async function deleteStat(req, res) {
  const { id } = req.params;
  const stat = await db.getStat(id);
  const { stat_name } = stat;

  await db.deleteStat(stat_name);
  res.redirect("/stats");
}

//Items

//GET new item form
export async function getNewItem(req, res) {
  const classes = await db.getAllClasses();
  const stats = await db.getAllStats();
  res.render("layout", {
    title: "New Item",
    page: "pages/items/items-form",
    css: "/form.css",
    classes: classes,
    stats: stats,
  });
}

//Read all items
export async function getItems(req, res) {
  const items = await db.getAllItems();
  res.render("layout", {
    title: "Items",
    page: "pages/items/items.ejs",
    css: "/form.css",
    items: items,
  });
}

export async function getItem(req, res) {
  const { id } = req.params;
  const item = await db.getItem(id);
  const classes = await db.getAllClasses();
  const stats = await db.getAllStats();
  res.render("layout", {
    title: item.name,
    page: "pages/items/single-item",
    css: "/form.css",
    item: item,
    classes: classes,
    stats: stats,
  });
}

//Create an item
export async function createItem(req, res) {
  const { itemName, itemCost, itemClass, stats } = req.body;

  const validStats = stats.filter((stat) => stat.id);

  const aggregateStats = {};

  validStats.forEach(({ id, value }) => {
    aggregateStats[id] = (aggregateStats[id] || 0) + Number(value) || 0;
  });

  await db.insertItem({ itemName, itemCost, class_id: itemClass, stats: aggregateStats });

  res.redirect("/items");
}
