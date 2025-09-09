

import RANK from '../entities/rank.js'
import HAND from '../entities/hand.js'



import { sort } from 'fast-sort';

export function calculateHand(decks) {
  //Check straight flush & royal flush
  if (decks.length != 5) {
    log.error("Not 5");
    return;
  }
  if (checkStraight(decks) && checkFlush(decks)) {

    var deckRanks = decks.map((item) => {
      return item.getRank().value
    })

    deckRanks = sort(deckRanks).asc();

    console.log("sorted deck:" + deckRanks)

    console.log(deckRanks[0])
    console.log(RANK.TEN.value)

    if (deckRanks[0] === RANK.TEN.value) {
      return HAND.ROYAL_FLUSH;
    } else {
      return HAND.STRAIGHT_FLUSH;
    }
  }

  //Check flush 
  if (checkFlush(decks)) {
    return HAND.FLUSH;
  }

  //check straight 
  if (checkStraight(decks)) {
    return HAND.STRAIGHT;
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
function checkFlush(decks) {
  //  console.log("Decks for flush: " + decks)
  var deckSuits = decks.map((item) => {
    console.log(item.getSuit())
    return item.getSuit().key
  })

  var checkForSuit = deckSuits[0]

  //console.log("CheckForSuit: " + checkForSuit)
  //console.log("DeckSuitsForFlush: " + deckSuits)
  var isFlush = deckSuits.every((item) => { return item === checkForSuit })

  //  console.log(checkForSuit === deckSuits[0])

  return isFlush;
}

function checkStraight(decks) {

  console.log("Decks: " + decks)

  var deckRanks = decks.map((item) => {
    console.log("Item: " + item.rank)
    return item.getRank().value
  })

  deckRanks = sort(deckRanks).asc();

  console.log("DeckRanks: " + deckRanks)
  for (let i = 0; i < deckRanks.length - 1; i++) {
    if (deckRanks[i + 1] - deckRanks[i] != 1) {
      return false;
    }
  }
  return true;
}

function checkThreeOfAKind(decks) {
  var countMap = new Map();

  countPairs(countMap, decks)

  var threeOfAKind = 0

  countMap.forEach((value, key) => {
    if (value == 3) {
      threeOfAKind += 1;
    }
  })

  return threeOfAKind == 1 ? true : false;
}

function countPairs(countMap, decks) {
  decks.forEach(card => {
    if (!countMap.get(card.rank)) {
      countMap.set(card.rank, 1);
    } else {
      var count = countMap.get(card.rank);
      countMap.set(card.rank, count + 1)
    }
  })
}

function checkPairs(decks) {
  var countMap = new Map()

  countPairs(countMap, decks)

  var pairs = 0;

  countMap.forEach((value, key) => {
    if (value == 2) {
      pairs += 1;
    }
  })

  console.log("countMap:", countMap)

  return pairs;
}

export function checkHighCard(decks) {
  decks.reduce((max, current) => {
    current.rank.value > max.rank.value ? current : max;
  });
}


