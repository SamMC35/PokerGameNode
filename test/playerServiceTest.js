import { addPlayer, getPlayerByName, ifSolePlayerExist } from "../src/service/playerService.js";
import Client from "../src/entities/client.js";
import { PLAYER_STATE } from "../src/entities/player.js";

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
  const playerNames = ["Sam", "Mas"]

  for (let i = 0; i < playerNames.length; i++) {
    addPlayer(new Client(i, playerNames[i]))
  }


}

testSolePlayer()
