// Table data to be used.
import tableData from "./data.js";

// Global variables.
const rowsPerPage = 15;
let totalPages = 0;
let currentPageNumber = 1;

/**
 * Filters the provided data by values in the input fields with id
 * 'filter-name' and 'filter-email'.
 *
 * @param {Object[]} data - The table data to be filtered.
 * @returns {Object[]} The filtered data variable.
 */
function filterTable(data) {
  const filterName = document.getElementById("filter-name").value;
  const filterEmail = document.getElementById("filter-email").value;
  
  return data
    .filter(x => x.name.indexOf(filterName) !== -1)
    .filter(x => x.email.indexOf(filterEmail) !== -1);
}

/**
 * Splices the passed data based on the given pageNumber and rowsPerPage.
 *
 * @param {Object[]} data - The table data to splice.
 * @param {number} pageNumber - The page to be shown in the table.
 * @returns {Object[]} The data variable spliced to show data on a given page.
 */
function pageTable(data, pageNumber) {
  return data.splice((pageNumber - 1) * rowsPerPage, rowsPerPage);
}

/**
 * Sets the totalPages variable based on the passed data and rowsPerPage.
 *
 * @param {Object[]} data - The table data to calculate the total pages needed
 * for the quantity of rows.
 */
function updateTotalPages(data) {
  totalPages = Math.ceil(data.length / rowsPerPage);
  document.getElementById("page-number-max").innerHTML = totalPages;
}

/**
 * Updates the tbody with id 'data-table-body', based on filters and
 * currentPageNumber.
 */
function updateTable() {
  let data = filterTable(tableData);
  document.getElementById("total-rows").innerHTML = data.length;
  updateTotalPages(data);
  data = pageTable(data, currentPageNumber);

  const tableBody = document.getElementById("data-table-body");

  const newTableBody = document.createElement("tbody");
  var entries = Object.entries(data);
  for (let i = 0; i < entries.length; i++) {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${entries[i][1].id}</td>
      <td>${entries[i][1].name}</td>
      <td>${entries[i][1].email}</td>
    `;
    newTableBody.appendChild(row);
  }

  tableBody.innerHTML = newTableBody.innerHTML;
  document.getElementById("rows-shown").innerHTML = data.length;
}

/**
 * Sets the currentPageNumber to the passed newPageNumber provided the
 * newPageNumber is within the the allowed range.
 * 
 * @param {number} newPageNumber - The page number to set currentPageNumber to.
 */
function setPageNumber(newPageNumber) {
  if (newPageNumber >= 1 && newPageNumber <= totalPages) {
    currentPageNumber = newPageNumber;
    document.getElementById("page-number").innerHTML = currentPageNumber;
    updateTable();
  }
}

/**
 * Increments the page number by 1.
 */
function increasePageNumber() {
  setPageNumber(currentPageNumber + 1);
}

/**
 * Decrements the page number by 1.
 */
function decreasePageNumber() {
  setPageNumber(currentPageNumber - 1);
}

// Event listeners.
document
  .getElementById("pagination-arrow-left")
  .addEventListener("click", decreasePageNumber, false);

document
  .getElementById("pagination-arrow-right")
  .addEventListener("click", increasePageNumber, false);

document
  .getElementById("filter-name")
  .addEventListener("input", updateTable, false);

document
  .getElementById("filter-email")
  .addEventListener("input", updateTable, false);

// Update table on page load.
updateTable(tableData);