import Card from '../entities/card.js'

import SUIT from '../entities/suit.js'
import RANK from '../entities/rank.js'


import arrayShuffle from 'array-shuffle'

var deck = [];    //To hold the deck

var deckInit = false;

export function initDeck() {

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

export function shuffleDeck() {
  if (deckInit) {
    for (let i = 0; i < 100; i++) {
      deck = arrayShuffle(deck)
    }
  }
}

export function returnOneCard() {
  return deck.pop()
}




