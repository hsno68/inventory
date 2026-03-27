import { getAllClasses, getAllStats, insertClassName, insertStatName } from "./db/queries.js";

export function getHomepage(req, res) {
  res.render("layout", { title: "Inventory", page: "pages/homepage", css: "/homepage.css" });
}

export function getNewClass(req, res) {
  res.render("layout", { title: "New Class", page: "pages/classes-form", css: "/form.css" });
}

export async function getClasses(req, res) {
  const classes = await getAllClasses();
  res.render("layout", {
    title: "Classes",
    page: "pages/classes.ejs",
    css: null,
    classes: classes,
  });
}

export async function createNewClass(req, res) {
  const { className } = req.body;
  await insertClassName(className);
  res.redirect("/classes");
}

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
