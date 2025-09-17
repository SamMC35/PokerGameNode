import Enum from "enum";
import HAND from "./hand.js";

const PLAYER_STATE = new Enum({
  'WAITING': "waiting",
  'CALLED': "calling",
  'FOLDED': "folding",
  'RAISED': "raised",
  'WAIT_FOR_RAISE': "waitingForRaise"
});


class Player {
  constructor(id, name, wallet) {
    this.id = id
    this.name = name;
    this.wallet = wallet;
    this.cards = [];
    this.state = PLAYER_STATE.WAITING
    this.hand = HAND.HIGH_CARD;
    this.bet = 0;
    this.isCurrentPlayer = false;
  }

  switchState(state) {
    this.state = state;
  }

  getName(){
    return this.name
  }

  setHand(hand) {
    this.hand = hand
  }

  setCards(cards) {
    this.cards = cards
  }

  getCards(){
    return this.cards;
  }

  toString() {
    console.log("Player name: " + this.name)
  }
}

export { Player, PLAYER_STATE };
