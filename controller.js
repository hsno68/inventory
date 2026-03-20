export function getHomepage(req, res) {
  res.render("layout", { title: "Inventory", page: "pages/homepage" });
}
