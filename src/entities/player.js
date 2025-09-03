import Enum from "enum";

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
  }

  switchState(state) {
    this.state = state;
  }
}

export { Player, PLAYER_STATE };
