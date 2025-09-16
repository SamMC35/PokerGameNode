import { addPlayer, distributeCards, getWinner, processPlayer, resetPlayers, returnPlayerList } from "../src/service/playerService.js";

import Client from "../src/entities/client.js";
import { getTableInfo, resetTable, processTable } from "../src/service/pokerService.js";
import TableState from "../src/entities/tableState.js";
import INPUTTYPE from "../src/entities/input.js";
import { initDeck, returnOneCard, shuffleDeck } from "../src/service/deckService.js";

function noRaiseTest() {
    //Add players

    addPlayer(new Client("Sam", "jwkewk"))
    addPlayer(new Client("Arko", "edfe"))
    addPlayer(new Client("Bittu", "ewdferfer"))

    //Init deck
    initDeck()
    shuffleDeck()
    
    // Initiate the table

    resetTable()
    resetPlayers()
    distributeCards()

    var players = returnPlayerList()
    var table = getTableInfo()
    console.log("Players: " + JSON.stringify(players))

    do{
        processTable()
        table = getTableInfo()

       
        players.forEach((player) => {
            console.log("Player: " + JSON.stringify(player))
            processPlayer({id: player.id, inputType: INPUTTYPE.CALLING})
        })
    } while(table.tableState != TableState.FLOP);

    var tableCardsForWinner = []

    for(let i = 0 ; i < 5; i++){
        tableCardsForWinner.push(returnOneCard())
    }

    table.tableCards = tableCardsForWinner

    console.log("Table Cards: " + table.tableCards)

    getWinner(table.tableCards)
    
   
}

noRaiseTest()