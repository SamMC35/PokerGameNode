import { Player, PLAYER_STATE } from '../entities/player.js'

import { addToNotificationQueue } from './notificationService.js'

import arrayShuffle from 'array-shuffle'

import INPUTTYPE from '../entities/input.js'
import HAND from '../entities/hand.js'
import { generateCombinations, returnOneCard } from './deckService.js'
import { calculateHand } from './handService.js'
import { addPot, fetchLastBet, getTableInfo } from './pokerService.js'

var players = []

var currentPlayers = []

var checkForRaise = []

let currentPlayer

let dealerIndex;

var id = 0
var playerSize = 0


var dealerBet = 5;

export function addPlayer(client) {
  var player = new Player(id++, client.name, 1500)
  players.push(player)

  playerSize++;

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
  setDealer()
  currentPlayer.wallet = currentPlayer.wallet - dealerBet;
  currentPlayer.bet = dealerBet;
  addPot(dealerBet);
  dealerIndex++
}



function setDealer() {
  //Set current player
  currentPlayer = currentPlayers[0];
  dealerIndex = 0
}

function changeDealer(){
  players.push(players.shift())
}

function switchPlayer(){
  // currentPlayers.push(currentPlayers.shift())
  dealerIndex++;
  if(dealerIndex >= playerSize ){
    dealerIndex = 0
  }
  currentPlayer = currentPlayers[dealerIndex]
}

export function getCurrentPlayer() {
  return currentPlayer
}

export function getPlayerById(id) {
  return players.find((player) => player.id == id)
}

export function processPlayer(input){

  console.log("Input: ", input)

  var player = getPlayerById(input.id)

  if(player.id != currentPlayer.id){
    console.error("Not current player")
    return;
  }

  if(processInput(input)){
    switchPlayer()
  }
}

function processInput(input) {
  var player = getPlayerById(input.id)

  var inputProcessed = true;

  var lastBet = fetchLastBet()

  // console.log(lastBet)
  // console.log(player.bet)
  // console.log(player.wallet)

  switch (input.inputType) {
    case INPUTTYPE.CALLING:
      player.state = PLAYER_STATE.CALLED
      var bet = lastBet - player.bet
      // console.log("Bet to be made: " + bet)
      player.wallet = player.wallet - bet;
      player.bet = lastBet
      addPot(bet)
      addToNotificationQueue(player.name + " has called $" + input.value)
      break;
    case INPUTTYPE.FOLDING:
      player.state = PLAYER_STATE.FOLDED
      addToNotificationQueue(player.name + " has folded")
      break;
    case INPUTTYPE.RAISING:
      break;
    case INPUTTYPE.CHECKING:
      player.state = PLAYER_STATE.CALLED
      addToNotificationQueue(player.name + " has checked")
      break;
    default:
      console.error("invalid input INPUT TYPE: " + input.inputType)
      return false;
  }

  console.log("Input processed")
  return true;
}


export function getWinner(communityCards) {

  console.log("Checking for winner")

  var allComCardCombos = generateCombinations(communityCards)

  var pot = getTableInfo().pot

  var playing = players.filter(player => player.state != PLAYER_STATE.FOLDED)

  playing.forEach((player) => {
    var highestHand = HAND.HIGH_CARD
    var cards = [...player.getCards()]

    for (const comCards of allComCardCombos) {
      var cardSet = [...cards]
      cardSet = cardSet.concat(comCards)

      var currentHand = calculateHand(cardSet)

      // console.log(player.name + ": " + cardSet + " gets " + currentHand)

      if (currentHand.value > highestHand.value) {
        highestHand = currentHand
      }
    }

    player.setHand(highestHand)
  })

  const maxHandValue = Math.max(...playing.map(player => player.hand.value))

  var winners = playing.filter((player) => {
    return player.hand.value === maxHandValue
  })

  console.log("Pot: ", pot)

  winners.forEach((winner) => {winner.wallet = winner.wallet + Math.floor(pot/winners.length)})

  console.log("Winners:" + JSON.stringify(winners))

  return winners;
}

export function resetStates(){
  players.filter(player => player.state !== PLAYER_STATE.FOLDED).forEach(player => player.state = PLAYER_STATE.WAITING)
}

export function canSwitchState() {
  return players.some(player =>
  player.state !== PLAYER_STATE.FOLDED &&
  player.state !== PLAYER_STATE.WAITING
);

}

export function ifSolePlayerExist() {
  return players.filter(player => player.state != PLAYER_STATE.FOLDED).length == 1 ? true : false;
}
