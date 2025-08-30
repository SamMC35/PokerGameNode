import Player from '../entities/player.js'

var players = []


export function addPlayer(client) {
  var player = new Player(client.name, 1500)
  players.push(player)
}

export function returnPlayerList() {
  return players;
}

export function getPlayerByName(name) {
  return players.find((player) => player.name == name)
}
