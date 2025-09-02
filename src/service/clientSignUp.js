import sqlite3 from "sqlite3";
sqlite3.verbose();

import { sha256 } from "crypto-hash";

import Client from "../entities/client.js";

let db;


let insertStmt;
let searchByNameStmt;
let getAllStmt;


async function init() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('./mem.sqlite', (err) => {
      if (err) return reject(err);
      console.log("Connected to Database");

      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          password BLOB NOT NULL
        )
      `, (err) => {
        if (err) return reject(err);

        insertStmt = db.prepare(`
          INSERT INTO users (name, password)
          VALUES(?, ?)
        `);

        searchByNameStmt = db.prepare(`
          SELECT * FROM users WHERE name = ?
        `);

        getAllStmt = db.prepare(`
          SELECT * from users
        `);

        resolve(db);
      });
    });
  });
}


export function login(client) {
  //Add login and name to database
  console.log(client)

  //var password = sha256(client.password)

  //console.log(client.password)

  insertStmt.run(client.name, client.password, function (err) {
    console.log("Inserted: " + this.lastID);
  });

}

export function getClients() {
  var clients = []
  getAllStmt.run((err, row) => {
    if (err) throw err;

    clients.push(row)
  })

  return clients;
}

function retrieveClientByName(name) {
  searchByNameStmt.get(name, (err, row) => {
    if (err) throw err;

    console.log("Retrieved: ", row)
  })
}

async function hashPassword(text) {
  return await sha256(text);
}

db = await init();



