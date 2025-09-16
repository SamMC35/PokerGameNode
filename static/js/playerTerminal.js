async function getPlayerData(){
    const playerString = await localStorage.getItem('playerJson')

    const currentUrl = "http://" + window.location.hostname + ":" + window.location.port

    const playerJson = JSON.parse(playerString)

    console.log(playerJson)

    try{
        const response = await fetch(currentUrl + "/getPlayerById/" + playerJson.id)

        if(!response.ok){
            const json = await response.json()
            const playerWalletDiv = document.getElementById("playerWallet")
            const playerNameDiv = document.getElementById("playerName")

            playerNameDiv.textContent = "Name: " + json.name
            playerWalletDiv.textContent = "Wallet: " + json.wallet
        }
    } catch(err){
        console.error("Error: " + err)
    }
}

window.onload = function() {
    setInterval(getPlayerData, 200)
}