import Card from '../entities/card.js'
import SUIT from '../entities/suit.js'
import RANK from '../entities/rank.js'
import HAND from '../entities/hand.js'

import { sort } from 'fast-sort';

export function calculateHand(decks) {
  //Check royal flush 

  //check straight 
  if (checkStraight(decks)) {

  }
  //Check three of a kind 
  if (checkThreeOfAKind(decks)) {
    return HAND.THREE_OF_A_KIND;
  }

  //Check pair 
  var pairs = checkPairs(decks)
  if (pairs == 2) {
    return HAND.TWO_PAIR;
  } else if (pairs == 1) {
    return HAND.ONE_PAIR;
  }

  return HAND.HIGH_CARD;
}

function checkStraight(decks) {

}

function checkThreeOfAKind(decks) {
  var countMap = {}

  countPairs(countMap, decks)

  var threeOfAKind = 0

  countMap.forEach((entry) => {
    if (entry.value == 3) {
      threeOfAKind += 1;
    }
  })

  return threeOfAKind == 1 ? true : false;
}

function countPairs(countMap, decks) {
  decks.forEach(card => {
    if (!countMap[card.rank]) {
      countMap.set(card.rank, 1);
    } else {
      count = countMap[card.rank];
      countMap.set(card.rank, count + 1)
    }
  })
}

function checkPairs(decks) {
  var countMap = {}

  countPairs(countMap, decks)

  var pairs = 0;

  countMap.forEach((entry) => {
    if (entry.value == 2) {
      pairs += 1;
    }
  })

  return pairs;
}

export function checkHighCard(decks) {
  decks.reduce((max, current) => {
    current.rank.value > max.rank.value ? current : max;
  });
}

