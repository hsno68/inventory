export function getHomepage(req, res) {
  res.render("layout", { title: "Inventory", page: "pages/homepage", css: "/homepage.css" });
}

export function getNewClass(req, res) {
  res.render("layout", { title: "New Class", page: "pages/classes-form", css: "/classForm.css" });
}
