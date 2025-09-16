import express from 'express'
import SUIT from './entities/suit.js'
import RANK from './entities/rank.js'
import path from "path"
import { fileURLToPath } from 'url'

import { addPlayer, returnPlayerList, getPlayerByName, getPlayerById, resetPlayers, processPlayer } from './service/playerService.js'

import { resetTable, isTableInitiated, getTableInfo, processTable } from './service/pokerService.js'

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
  var idValue = addPlayer(reqJson)
  console.log("IdVal: " + idValue)
  res.json({ message: "Data received", id: idValue })
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
  var isInit = isTableInitiated()
  res.json(isInit)
})

app.get("/getTable", (req, res) => {
  res.json(getTableInfo())
})

//Initiate table 
app.get("/startGame", (req, res) => {
  resetTable();
  resetPlayers();
   res.status(200).send('OK');
})

//Process Player Input
app.post("/processInput", (req, res) => {
  processPlayer(req.body.json)
})

//Process table
app.post("/processTable", (req, res) => {
  processTable()
})


app.get("/getPlayer/:id", (req, res) => {
  const userId = req.params.id

  res.json(getPlayerById(userId))
})

app.listen(8081, () => {
  console.log("listening");
})

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});
