const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  // gameInfo: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  playerName: {
    type: String,
    required: [true, "must provide a player name"],
    unique: true,
    maxlength: 32
  },
  currScore: { type: Number, default: 50 },
  date: { type: Date, default: Date.now },
  currentGuess: { type: String, default: " " }
  // currentGuess: { type: Number, default: 5}

  // players: [
  //   {
  //     name: { type: String, required: true, unique: true },
  //     currScore: { type: Number, default: 0 }
  //   }
  // ]
});

const House = mongoose.model("House", gameSchema);

module.exports = House;
