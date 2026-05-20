document.addEventListener("submit", async (e) => {
  const form = e.target;

  if (!form.classList.contains("delete-form")) {
    return;
  }

  e.preventDefault();

  if (!confirm("Are you sure you want to delete this?")) {
    return;
  }

  const password = prompt("Admin password:");
  if (!password) {
    return;
  }

  const res = await fetch(form.action, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data?.error || "Deletion failed.");
    return;
  }

  window.location.reload();
});
