import { addPlayer, distributeCards, getPlayerByName, getWinner, ifSolePlayerExist, returnPlayerList } from "../src/service/playerService.js";
import Client from "../src/entities/client.js";
import { PLAYER_STATE } from "../src/entities/player.js";
import { initDeck, returnOneCard, shuffleDeck } from "../src/service/deckService.js";

function testSolePlayer() {
  for (let i = 0; i < 1; i++) {
    addPlayer(new Client("Blade", 'defef'))
  }

  console.log("Testing sole playr")
  console.log(ifSolePlayerExist())

  addPlayer("Seth", "dfeef")
  console.log(ifSolePlayerExist())

  var player = getPlayerByName("Seth")
  player.switchState(PLAYER_STATE.FOLDED)
  console.log(ifSolePlayerExist())

}

function testWinner() {
  initDeck()
  shuffleDeck()
  const playerNames = ["Sam", "Mas"]

  for (let i = 0; i < 2; i++) {
    addPlayer(new Client(i, playerNames[i]))
  }

  distributeCards();

  console.log("Players: " + returnPlayerList())

  var comCards = []

  for (let i = 0; i < 3; i++) {
    comCards.push(returnOneCard())
  }

  var winner = getWinner(comCards)

  console.log(JSON.stringify(winner))

}

// testSolePlayer()
testWinner()
