async function startGame(event){
  console.log("Let's a go!!!!!!!");
  event.preventDefault();

  try{
    const currentUrl = "http://" + window.location.hostname + ":" + window.location.port
    const response = await fetch(currentUrl + "/startGame", {
      method: "GET" 
    })


    if(response.ok){
      window.location.href = "/table.html"
    }
  } catch(err){
    console.error("Error in pushing: " + err.message)
  }
}

async function fetchData() {
  const currentUrl = "http://" + window.location.hostname + ":" + window.location.port
  const response = await fetch(currentUrl + '/getPlayers')

  if (response.ok) {
    const data = await response.json();

    const tableBody = document.querySelector('#data-table tbody')

    // Keep old player list (to detect new ones)
    const existingNames = Array.from(tableBody.querySelectorAll("td"))
      .map(td => td.textContent.trim());

    // Clear table
    tableBody.innerHTML = ''

    data.forEach(element => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          ${element.name}
        </td>
      `

      // Animate if it's new
      if (!existingNames.includes(element.name)) {
        row.classList.add(
          "transition", "transform", "duration-500", "ease-out",
          "opacity-0", "translate-y-2"
        )
        // trigger animation in next frame
        requestAnimationFrame(() => {
          row.classList.remove("opacity-0", "translate-y-2")
        })
      }

      tableBody.appendChild(row)
    })
  } else {
    console.error("Failed to fetch data", response.status)
  }
}

window.onload = function () {
  setInterval(fetchData, 100) // fetch every 100ms
}


