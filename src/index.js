const express = require('express')
const suit = require('./entities/suit')
const rank = require('./entities/rank')
const app = express()


app.get("/", (req, res) => {
  res.send("Hello From Node: " + suit.SUIT.CLUBS  + "  " + rank.RANK.KING.key);
})

app.listen(8080, () => {
  console.log("listening");
})
