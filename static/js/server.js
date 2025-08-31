async function fetchData() {
  const response = await fetch('http://localhost:8080/getPlayers')

  if (response.ok) {
    data = await response.json();

    var tableData = document.querySelector('#data-table tbody')

    tableData.innerHTML = ''

    data.forEach(element => {
      var row = document.createElement('tr')

      row.innerHTML = `
        <tr>${element.name}</tr>
      `;

      tableData.append(row)
    })
  }
}

window.onload = function () {
  setInterval(fetchData, 100)
}
