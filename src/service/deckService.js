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


export function generateCombinations(cardList) {
  const finalList = [];
  gatherAllCombos(cardList, [], finalList, 0);
  return finalList;
}

function gatherAllCombos(cardList, dummyList, finalList, start) {
  if (dummyList.length === 3) {
    finalList.push([...dummyList]);
    return;
  }

  for (let i = start; i < cardList.length; i++) {
    dummyList.push(cardList[i]);
    gatherAllCombos(cardList, dummyList, finalList, i + 1, 3);
    dummyList.pop();
  }
}


