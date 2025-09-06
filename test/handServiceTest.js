import { calculateHand } from "../src/service/handService.js";

import Card from "../src/entities/card.js"

import SUIT from "../src/entities/suit.js"
import RANK from "../src/entities/rank.js"


function checkForHighCard() {
  var decks = [
    new Card(SUIT.CLUBS, RANK.ACE),
    new Card(SUIT.SPADES, RANK.TWO),
    new Card(SUIT.HEARTS, RANK.THREE),
    new Card(SUIT.SPADES, RANK.QUEEN),
    new Card(SUIT.DIAMONDS, RANK.KING),
  ]

  console.log(calculateHand(decks))
}

function checkForOnePair() {
  var decks = [
    new Card(SUIT.CLUBS, RANK.ACE),
    new Card(SUIT.SPADES, RANK.ACE),
    new Card(SUIT.HEARTS, RANK.THREE),
    new Card(SUIT.SPADES, RANK.QUEEN),
    new Card(SUIT.DIAMONDS, RANK.KING),
  ]

  console.log(calculateHand(decks))

}

function checkForTwoPair() {

  var decks = [
    new Card(SUIT.CLUBS, RANK.ACE),
    new Card(SUIT.SPADES, RANK.ACE),
    new Card(SUIT.HEARTS, RANK.THREE),
    new Card(SUIT.SPADES, RANK.THREE),
    new Card(SUIT.DIAMONDS, RANK.KING),
  ]

  console.log(calculateHand(decks))

}

function checkForThreeCard() {

  var decks = [
    new Card(SUIT.CLUBS, RANK.ACE),
    new Card(SUIT.SPADES, RANK.ACE),
    new Card(SUIT.HEARTS, RANK.ACE),
    new Card(SUIT.SPADES, RANK.QUEEN),
    new Card(SUIT.DIAMONDS, RANK.KING),
  ]

  console.log(calculateHand(decks))

}

function checkForStraight() {
  console.log("Checking for straight")
  var decks = [
    new Card(SUIT.CLUBS, RANK.FOUR),
    new Card(SUIT.SPADES, RANK.FIVE),
    new Card(SUIT.HEARTS, RANK.SIX),
    new Card(SUIT.SPADES, RANK.SEVEN),
    new Card(SUIT.DIAMONDS, RANK.EIGHT),
  ]

  console.log(calculateHand(decks))

}

function checkForFlush() {

  console.log("Checking for flush")

  var decks = [
    new Card(SUIT.CLUBS, RANK.ACE),
    new Card(SUIT.CLUBS, RANK.ACE),
    new Card(SUIT.CLUBS, RANK.THREE),
    new Card(SUIT.CLUBS, RANK.QUEEN),
    new Card(SUIT.CLUBS, RANK.KING),
  ]

  console.log(calculateHand(decks))

}

function test() {
  checkForHighCard()
  checkForOnePair()
  checkForTwoPair()
  checkForThreeCard()
  checkForStraight()
  checkForFlush()
}

test()
