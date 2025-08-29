import Card from '../entities/card.js'
import SUIT from '../entities/suit.js'
import RANK from '../entities/rank.js'
import HAND from '../entities/hand.js'

export function calculateHand(decks) {
  //Check royal flush 

  //Check one pair 
  var pairs = checkPairs(decks) 
  if(pairs == 2){
    return HAND.TWO_PAIR;
  } else if(pairs == 1){
    return HAND.ONE_PAIR;
  }

  return HAND.HIGH_CARD;
}

function checkThreeOfAKind(decks){

}

function checkPairs(decks) {
  var countMap = {}
  decks.forEach(card => {
    if (!countMap[card.rank]) {
      countMap.set(card.rank, 1);
    } else {
      count = countMap[card.rank];
      countMap.set(card.rank, count + 1)
    }
  })

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

