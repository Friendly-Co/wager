const mongoose = require("mongoose");
const db = require("../models");

// This file empties the House collection and inserts the scores below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactbettingscores"
);

const scoreSeed = [
  {
    playerName: "Annabelle",
    currScore: 35,
    date: new Date(Date.now())
  },
  {
    playerName: "Jose",
    currScore: 70,
    date: new Date(Date.now())
  },
  {
    playerName: "Elli",
    currScore: 30,
    date: new Date(Date.now())
  },
  {
    playerName: "Roland",
    currScore: 75,
    date: new Date(Date.now())
  },
  {
    playerName: "Denisha",
    currScore: 41,
    date: new Date(Date.now())
  },
  {
    playerName: "John",
    currScore: 31,
    date: new Date(Date.now())
  },
  {
    playerName: "Maria",
    currScore: 15,
    date: new Date(Date.now())
  },
  {
    playerName: "Luz",
    currScore: 50,
    date: new Date(Date.now())
  }
];

db.House.remove({})
  .then(() => db.House.collection.insertMany(scoreSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
