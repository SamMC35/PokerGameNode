import { Player, PLAYER_STATE } from '../entities/player.js'

import { addToNotificationQueue } from './notificationService.js'

import arrayShuffle from 'array-shuffle'

import INPUTTYPE from '../entities/input.js'
import HAND from '../entities/hand.js'
import { generateCombinations, returnOneCard } from './deckService.js'
import { calculateHand } from './handService.js'

var players = []

var currentPlayers = []

var checkForRaise = []

let currentPlayer

let dealerIndex;

var id = 0

export function addPlayer(client) {
  var player = new Player(id++, client.name, 1500)
  players.push(player)

  return id;
}

export function distributeCards() {

  console.log("Players while distributing: " + players)

  players.forEach((player) => {
    var tempCards = []

    for (let i = 0; i < 2; i++) {
      tempCards.push(returnOneCard());
    }

    console.log("Adding Cards: " + tempCards)

    player.setCards(tempCards)
  })
}

export function returnPlayerList() {
  // console.log("Players: " + players)
  return players;
}

export function getPlayerByName(name) {
  return players.find((player) => player.name == name)
}

export function shufflePlayers() {
  players = arrayShuffle(players)
}

export function resetPlayers() {
  currentPlayers = players
}

function setDealer() {
  //Set current player
  currentPlayer = currentPlayers[++dealerIndex];
}

export function getCurrentPlayer() {
  return currentPlayer
}

export function getPlayerById(id) {
  return players.find((player) => player.id == id)
}

export function processInput(input) {

  var player = getPlayerById(input.id)

  switch (input.inputType) {
    case "called":
      player.state = PLAYER_STATE.CALLED
      addToNotificationQueue(player.name + " has called $" + input.value)
      break
    case "folded":
      player.state = PLAYER_STATE.FOLDED
      currentPlayers.splice(currentPlayer, 1)
      addToNotificationQueue(player.name + " has folded")
      break;
    case "raised":
      break;
    default:
      console.error("invalid input INPUT TYPE: " + input.inputType)
  }
}


export function getWinner(communityCards) {

  var allComCardCombos = generateCombinations(communityCards)

  var playing = players.filter(player => player.state != PLAYER_STATE.FOLDED)

  playing.forEach((player) => {
    var highestHand = HAND.HIGH_CARD
    var cards = [...player.getCards()]

    for (const comCards of allComCardCombos) {
      var cardSet = [...cards]
      cardSet = cardSet.concat(comCards)

      var currentHand = calculateHand(cardSet)

      console.log(player.name + ": " + cardSet + " gets " + currentHand)

      if (currentHand.value > highestHand.value) {
        highestHand = currentHand
      }
    }

    player.setHand(highestHand)
  })

  const maxHandValue = Math.max(...playing.map(player => player.hand.value))

  return playing.filter((player) => {
    return player.hand.value === maxHandValue
  })
}



export function canSwitchState() {
  return players.filter(player => player.state != PLAYER_STATE.FOLDED)
    .matchAll(player => player.state != PLAYER_STATE.WAITING)
}

export function ifSolePlayerExist() {
  return players.filter(player => player.state != PLAYER_STATE.FOLDED).length == 1 ? true : false;
}
