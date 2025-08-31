import Player from '../entities/player.js'

import { addToNotificationQueue } from './notificationService.js'

import arrayShuffle from 'array-shuffle'

import INPUTTYPE from '../entities/input.js'

var players = []

var currentPlayers = []

var checkForRaise = []

let currentPlayer

export function addPlayer(client) {
  var player = new Player(client.name, 1500)
  players.push(player)
}

export function returnPlayerList() {
  return players;
}

export function getPlayerByName(name) {
  return players.find((player) => player.name == name)
}

export function resetPlayers() {
  currentPlayers = []
}

function setDealer() {
  //Set current player

  players = arrayShuffle(players)
  currentPlayer = players[0];
}

export function getCurrentPlayer() {
  return currentPlayer
}

export function processInput(input) {

  var player = getPlayerByName(input.name)

  switch (input.inputType) {
    case "called":
      currentPlayers.push(player)
      addToNotificationQueue(input.name + " has called $" + input.value)
      break
    case "folded":
      addToNotificationQueue(input.name + " has folded")
      break;
    default:
      console.error("invalid input INPUT TYPE: " + input.inputType)
  }
}
