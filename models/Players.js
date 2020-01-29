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
    unique: [true, "must be a unique username"],
    maxlength: 32
  },
  currScore: { type: Number, default: 50 },
  currentGuess: { type: String, default: " " },

  playerEmail: {
    type: String,
    required: [true, "must provide an email"],
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  kickedOut: { type: Boolean, default: false },
  newPlayer: { type: Boolean, default: true },
  date: { type: Date, default: Date.now }
});

const Players = mongoose.model("Players", playerSchema);

module.exports = Players;
