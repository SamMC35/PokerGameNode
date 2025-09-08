class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }
}

export default Card;

