async function getPlayerData(){
    const playerString = await localStorage.getItem('playerJson')

    const currentUrl = "http://" + window.location.hostname + ":" + window.location.port

    const playerJson = JSON.parse(playerString)

    console.log(playerJson)

    try{
        const response = await fetch(currentUrl + "/getPlayer/" + playerJson.id)

        if(response.ok){
            const json = await response.json()
            const playerWalletDiv = document.getElementById("playerWallet")
            const playerNameDiv = document.getElementById("playerName")

            playerNameDiv.textContent = "Name: " + json.name
            playerWalletDiv.textContent = "Wallet: " + json.wallet

            console.log("JSON: " + json)
        }
    } catch(err){
        console.error("Error: " + err)
    }
}

async function processInput(input){
    const resultJsonString = await localStorage.getItem('playerJson')

    console.log(JSON.stringify(resultJsonString))

    const currentUrl = "http://" + window.location.hostname + ":" + window.location.port

    const playerJson = JSON.parse(resultJsonString)

    console.log(JSON.stringify(playerJson))

    try{
        const payload = JSON.stringify({id: playerJson.id, inputType: input})

        console.log("Payload: " + payload)

        var response = await fetch(currentUrl + "/processInput", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload
        })
        
        if(response.ok){
            console.log("Processed Input")
        }
    }catch(err){
        console.error("Error: " + err)
    }
}

window.onload = function() {
    setInterval(getPlayerData, 200)
}