async function getTableData(){
    const currentUrl = "http://" + window.location.hostname + ":" + window.location.port

    console.log(currentUrl)
    const response = await fetch(currentUrl + "/getTable", {
        method: "GET"
    })

    if(response.ok){
        const result = await response.json()

        const potDiv = document.getElementById("tablePot")
        potDiv.textContent = "Pot:" + result.pot

        const stateDiv = document.getElementById("tableState")
        stateDiv.textContent = "Table State:" + result.tableState
    }
}

window.onload = getTableData