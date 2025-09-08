import express from 'express'
import SUIT from './entities/suit.js'
import RANK from './entities/rank.js'
import path from "path"
import { fileURLToPath } from 'url'

import { addPlayer, returnPlayerList, getPlayerByName, getPlayerById } from './service/playerService.js'

import { resetTable, isTableInitiated } from './service/pokerService.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use(express.static("static"))
app.use(express.json())

app.get("/test", (req, res) => {
  res.send("Hello From Node: " + SUIT.CLUBS + "  " + RANK.KING.key);
})

app.post("/addPlayers", (req, res) => {

  var reqJson = req.body;

  console.log('Data:', JSON.stringify(reqJson))
  addPlayer(reqJson)
  res.json({ message: "Data received" })
})

app.get("/getPlayers", (req, res) => {
  res.json(returnPlayerList())
})

app.get("/getPlayerByName", (req, res) => {
  var playerName = req.body.name

  res.json(getPlayerByName(playerName))
})

//Get has game started 
app.get("/hasGameStarted", (req, res) => {
  res.json(isTableInitiated())
})

//Initiate table 
app.get("/startGame", (req, res) => {
  resetTable();

})

app.get("/getPlayer/:id", (req, res) => {
  const userId = req.params.id

  res.json(getPlayerById(userId))
})

app.listen(8080, () => {
  console.log("listening");
})
