const deleteForm = document.querySelectorAll(".delete-form");

function confirmDelete(event) {
  if (!confirm("Are you sure you want to delete this class?")) {
    event.preventDefault();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  deleteForm.forEach((form) => {
    form.addEventListener("submit", confirmDelete);
  });
});
