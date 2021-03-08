const fs = require("fs");
const express = require("express");
const app = express();


const { v4: uuidV4 } = require("uuid");

app.get("/notes", (req, res) => {
  let collection = JSON.parse(fs.readFileSync("./db/db.json", "UTF-8"));
  res.json(collection);
});

app.post("/notes", (req, res) => {
  const newNote = req.body;
  console.log(JSON.stringify(newNote));

  newNote.id = uuidV4();

  let collection = JSON.parse(fs.readFileSync("./db/db.json", "UTF-8"));

  collection.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(collection));
  console.log("Note successfully added to file!");

  res.json(collection);
});

module.exports = app;