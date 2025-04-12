const form = document.getElementById("data-form");
const table = document.getElementById("data-table").getElementsByTagName("tbody")[0];
const search = document.getElementById("search");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = form.name.value;
  const age = form.age.value;
  const city = form.city.value;
  const email = form.email.value;

  if (!name || !age || !city || !email) return;

  const row = table.insertRow();
  row.innerHTML = `
    <td>${name}</td>
    <td>${age}</td>
    <td>${city}</td>
    <td>${email}</td>
    <td><button onclick="deleteRow(this)">Törlés</button></td>
  `;

  form.reset();
});

function deleteRow(btn) {
  table.deleteRow(btn.parentNode.parentNode.rowIndex - 1);
}

function sortTable(n) {
  let switching = true, dir = "asc", switchcount = 0;
  while (switching) {
    switching = false;
    let rows = table.rows;
    for (let i = 0; i < rows.length - 1; i++) {
      let x = rows[i].getElementsByTagName("TD")[n];
      let y = rows[i + 1].getElementsByTagName("TD")[n];
      let shouldSwitch = dir === "asc" ? x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()
                                       : x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase();
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
        break;
      }
    }
    if (switchcount === 0 && dir === "asc") {
      dir = "desc";
      switching = true;
    }
  }
}

search.addEventListener("keyup", () => {
  const term = search.value.toLowerCase();
  const rows = table.getElementsByTagName("tr");
  for (let row of rows) {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(term) ? "" : "none";
  }
});
