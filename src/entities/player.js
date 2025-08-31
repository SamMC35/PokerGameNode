import Enum from "enum";

const PLAYER_STATE = new Enum({
  'LOGGED_IN': "loggedIn",
  'WAITING': "waiting",
  'CALLED': "calling",
  'FOLDED': "folding",
  'RAISED': "raised",
  'WAIT_FOR_RAISE': "waitingForRaise"
});


class Player {
  constructor(name, wallet) {
    this.name = name;
    this.wallet = wallet;
    this.cards = [];
    this.state = PLAYER_STATE.LOGGED_IN
  }
}

export default Player;
