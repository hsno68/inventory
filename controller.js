import * as db from "./db/queries.js";

//Homepage

export function getHomepage(req, res) {
  res.render("layout", { title: "Inventory", page: "pages/homepage", css: "/homepage.css" });
}

//Classes

//GET new class form
export function getNewClass(req, res) {
  res.render("layout", { title: "New Class", page: "pages/classes-form", css: "/form.css" });
}

//Read all classes
export async function getClasses(req, res) {
  const classes = await db.getAllClasses();
  res.render("layout", {
    title: "Classes",
    page: "pages/classes.ejs",
    css: "/form.css",
    classes: classes,
  });
}

//Read a single class
export async function getClass(req, res) {
  const { className } = req.params;
  res.render("layout", {
    title: className,
    page: "pages/single-class",
    css: "/form.css",
    className: className,
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
  const { className: oldClass } = req.params;
  const { className: newClass } = req.body;
  await db.updateClass(oldClass, newClass);
  res.redirect("/classes");
}

//Delete a class
export async function deleteClass(req, res) {
  const { className } = req.params;
  await db.deleteClass(className);
  res.redirect("/classes");
}

//Stats

//GET new stat form
export function getNewStat(req, res) {
  res.render("layout", { title: "New Stat", page: "pages/stats-form", css: "/form.css" });
}

//Read all stats
export async function getStats(req, res) {
  const stats = await db.getAllStats();
  res.render("layout", {
    title: "Stats",
    page: "pages/stats.ejs",
    css: "/form.css",
    stats: stats,
  });
}

//Read a single stat
export async function getStat(req, res) {
  const { statName } = req.params;
  res.render("layout", {
    title: statName,
    page: "pages/single-stat",
    css: "/form.css",
    statName: statName,
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
  const { statName } = req.params;
  const oldStat = decodeURIComponent(statName);
  const { statName: newStat } = req.body;
  await db.updateStat(oldStat, newStat);
  res.redirect("/stats");
}

//Delete a stat
export async function deleteStat(req, res) {
  const { statName } = req.params;
  const stat = decodeURIComponent(statName);
  await db.deleteStat(stat);
  res.redirect("/stats");
}

//Items

//GET new item form
export async function getNewItem(req, res) {
  const classes = await db.getAllClasses();
  res.render("layout", {
    title: "New Item",
    page: "pages/items-form",
    css: "/form.css",
    classes: classes,
  });
}

//Read all items
export async function getItems(req, res) {
  const items = await db.getAllItems();
  res.render("layout", {
    title: "Items",
    page: "pages/items.ejs",
    css: null,
    items: items,
  });
}

//Create an item
export async function createItem(req, res) {
  console.log("created");
  const { itemName, itemCost, className, stats } = req.body;
  const validStats = stats.filter((stats) => stats.name);
  res.redirect("/items/new");
}
