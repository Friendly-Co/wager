const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  gameId: {
    type: String,
    required: [true, "must provide a gameId"]
  },
  playerName: {
    type: String,
    required: [true, "must provide a player name"],
    maxlength: 32
  },
  currScore: { type: Number, default: 50 },
  currentGuess: { type: String, default: " " },

  // playerEmail: {
  //   type: String,
  //   // required: [true, "must provide an email"],
  //   match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  // },
  date: { type: Date, default: Date.now }
});

const Players = mongoose.model("Players", playerSchema);

module.exports = Players;
