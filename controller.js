import { getAllClasses, insertClassname } from "./db/queries.js";

export function getHomepage(req, res) {
  res.render("layout", { title: "Inventory", page: "pages/homepage", css: "/homepage.css" });
}

export function getNewClass(req, res) {
  res.render("layout", { title: "New Class", page: "pages/classes-form", css: "/classForm.css" });
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
  await insertClassname(className);
  res.redirect("/classes");
}
