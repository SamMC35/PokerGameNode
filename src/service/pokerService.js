
var pot;

var tableCards = []

var lastBet;

export function resetTable() {
  pot = 0
  tableCards = []
  lastBet = 0
}

export function getTableInfo() {
  return {
    "pot": pot,
    "tableCards": tableCards,
    "lastBet": lastBet
  }
}

export function addPot(input) {
  pot += input.value

  if (input.value > lastBet) {
    lastBet = input.value
  }
}


