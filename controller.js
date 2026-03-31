import {
  getAllClasses,
  insertClassName,
  updateClassName,
  deleteClassName,
  getAllStats,
  insertStatName,
  getAllItems,
} from "./db/queries.js";

//Homepage

export function getHomepage(req, res) {
  res.render("layout", { title: "Inventory", page: "pages/homepage", css: "/homepage.css" });
}

//Classes

export function getNewClass(req, res) {
  res.render("layout", { title: "New Class", page: "pages/classes-form", css: "/form.css" });
}

export async function getClasses(req, res) {
  const classes = await getAllClasses();
  res.render("layout", {
    title: "Classes",
    page: "pages/classes.ejs",
    css: "/form.css",
    classes: classes,
  });
}

export async function getClass(req, res) {
  const { className } = req.params;
  res.render("layout", {
    title: className,
    page: "pages/single-class",
    css: "/form.css",
    className: className,
  });
}

export async function createNewClass(req, res) {
  const { className } = req.body;
  await insertClassName(className);
  res.redirect("/classes");
}

export async function updateClass(req, res) {
  const { className: oldClass } = req.params;
  const { className: newClass } = req.body;
  await updateClassName(oldClass, newClass);
  res.redirect("/classes");
}

export async function deleteClass(req, res) {
  const { className } = req.params;
  await deleteClassName(className);
  res.redirect("/classes");
}

//Stats

export function getNewStat(req, res) {
  res.render("layout", { title: "New Stat", page: "pages/stats-form", css: "/form.css" });
}

export async function getStats(req, res) {
  const stats = await getAllStats();
  res.render("layout", {
    title: "Stats",
    page: "pages/stats.ejs",
    css: null,
    stats: stats,
  });
}

export async function createNewStat(req, res) {
  const { statName } = req.body;
  await insertStatName(statName);
  res.redirect("/stats");
}

//Items

export async function getItems(req, res) {
  const items = await getAllItems();
  res.render("layout", {
    title: "Items",
    page: "pages/items.ejs",
    css: null,
    items: items,
  });
}

export async function getNewItem(req, res) {
  const classes = await getAllClasses();
  res.render("layout", {
    title: "New Item",
    page: "pages/items-form",
    css: "/form.css",
    classes: classes,
  });
}

export async function createNewItem(req, res) {
  console.log("created");
  const { itemName, itemCost, className, stats } = req.body;
  const validStats = stats.filter((stats) => stats.name);
  res.redirect("/items/new");
}
