const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const Players = new Schema({
//   playerName: {
//     type: String,
//     // required: [true, "must provide a player name"],
//     unique: true,
//     maxlength: 32
//   },
//   currScore: { type: Number, default: 50 },
//   currentGuess: { type: String, default: " " }
// });

const gameSchema = new Schema({
  gameInfo: {
    type: String,
    required: true,
    unique: true
  },
  date: { type: Date, default: Date.now },
  adminName: {
    type: String,
    required: [true, "must provide a username"],
    // unique: true,
    maxlength: 32
  },
  adminEmail: {
    type: String,
    required: [true, "must provide an email"],
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  }
  // players: [Players]

  // playerName: {
  //   type: String,
  //   required: [true, "must provide a player name"],
  //   unique: true,
  //   maxlength: 32
  // },
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
