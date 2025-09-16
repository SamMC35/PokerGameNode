import TableState from "../entities/tableState.js";

import { ifSolePlayerExist, canSwitchState, resetStates } from "./playerService.js";

import { generateCombinations } from "./deckService.js";
import { addToNotificationQueue } from "./notificationService.js";
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
  // process table
  // stateWiseProcess()
  checkTableState()
}



function switchTableState() {
  var hasSwitched = true
  switch (tableState) {
    case TableState.PRE_FLOP:
      tableState = TableState.FLOP;
      break;
    case TableState.FLOP:
      tableState = TableState.TURN
      break;
    case TableState.TURN:
      tableState = TableState.RIVER
      break
    case TableState.RIVER:
      tableState = TableState.SHOWDOWN;
      break
    case TableState.SHOWDOWN:
      tableState = TableState.PRE_FLOP;
      break;
    default:
      hasSwitched = false
      console.error("Invalid tableState:" + tableState);
      break;
  }

  if(hasSwitched){
    addToNotificationQueue("Table state has changed to: " + tableState)
    resetStates()
    console.log("Table state has changed to: " + tableState)
  }
}

function moveToShowdown(){
  tableState = TableState.SHOWDOWN
}


function checkTableState() {
  //Check if only one player exists

  if (canSwitchState()) {
    switchTableState();
  }

  if (ifSolePlayerExist()) {
    moveToShowdown();
  }

}
