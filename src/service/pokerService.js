import TableState from "../entities/tableState";

var pot;

var tableCards = []

var lastBet;

var tableInitiated = false;

var tableState;

export function resetTable() {
  pot = 0
  tableCards = []
  lastBet = 0
  tableState = TableState.PRE_FLOP
  tableInitiated = true;
}

export function getTableInfo() {
  return {
    "pot": pot,
    "tableCards": tableCards,
    "lastBet": lastBet,
    "tableState": tableState
  }
}

export function addPot(input) {
  pot += input.value

  if (input.value > lastBet) {
    lastBet = input.value
  }
}

export function isTableInitiated() {
  return { tableInitiated: tableInitiated };
}

export function processTable() {
  // process players

}
