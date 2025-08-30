import sqlite3 from "sqlite3";
sqlite3.verbose();

import { sha256 } from "crypto-hash";

import Client from "../entities/client.js";

let db;


let insertStmt;
let searchByNameStmt;


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

        resolve(db);
      });
    });
  });
}


function login(client) {
  //Add login and name to database
  console.log(client)

  var password = sha256(client.password)

  console.log(password)

  insertStmt.run(client.name, client.password, function (err) {
    console.log("Inserted: " + this.lastID);
  });

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


login(new Client('Sam', 'eft4tfr4t4'));
retrieveClientByName('Sam')
