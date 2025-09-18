import { addPlayer, distributeCards, getWinner, processPlayer, resetPlayers, returnPlayerList, getCurrentPlayers } from "../src/service/playerService.js";

import Client from "../src/entities/client.js";
import { getTableInfo, resetTable, processTable } from "../src/service/pokerService.js";
import TableState from "../src/entities/tableState.js";
import INPUTTYPE from "../src/entities/input.js";
import { initDeck, returnOneCard, shuffleDeck } from "../src/service/deckService.js";
// import { getCurrentPlayer } from "../../../../../var/home/bazzite/PokerGameNode/PokerGameNode/src/service/playerService.js";

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
            processPlayer({id: player.id, inputType: "calling"})
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

function foldTest(){
    //Add players

    addPlayer(new Client("jwkewk", "Sam"))
    addPlayer(new Client("edfe", "Arko"))
    addPlayer(new Client("ewdferfer", "Bittu"))

    //Init deck
    initDeck()
    shuffleDeck()
    
    // Initiate the table

    resetTable()
    resetPlayers()
    distributeCards()

    var players = returnPlayerList()

    console.log("Players: " + JSON.stringify(players))

    players.forEach((player) => {
        console.log("Player Name: " + player.name)
        if(player.name === "Arko"){
            processPlayer({id: player.id, inputType: "folding"})
        } else {
            processPlayer({id: player.id, inputType: "calling"})
        }
    })

    // console.log("Players after calling: " + JSON.stringify(returnPlayerList()))

    console.log("Current Players: " + JSON.stringify(getCurrentPlayers()))

    processTable()

    var table = getTableInfo()

    console.log("Table info: " + JSON.stringify(table))

    var tableCardsForWinner = []

    for(let i = 0 ; i < 5; i++){
        tableCardsForWinner.push(returnOneCard())
    }

    table.tableCards = tableCardsForWinner

    getWinner(table.tableCards)
}


foldTest()