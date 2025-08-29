import Card from '../entities/card.js'

import SUIT from '../entities/suit.js'
import RANK from '../entities/rank.js'

import random from 'random'

import arrayShuffle from 'array-shuffle'

var deck = [];    //To hold the deck

var deckInit = false;

function initDeck() {

  //Initialises the deck
  //

  console.log(SUIT.enums)

  const suits = SUIT.enums;
  const ranks = RANK.enums;

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(new Card(suit.key, rank.key))
    }
  }
  deckInit = true;
  //console.log(deck)
}

function shuffleDeck() {
  if (deckInit) {
    for (let i = 0; i < 100; i++) {
      deck = arrayShuffle(deck)
    }
  }
}

function returnOneCard() {
  return deck.pop()
}



initDeck();

console.log("Initial deck: " + JSON.stringify(deck));

console.log("Length: " + deck.length)

shuffleDeck();

console.log(deck)

