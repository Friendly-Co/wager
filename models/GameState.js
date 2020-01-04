const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameStateSchema = new Schema({
  locked: {
    type: Boolean,
    default: false
  },
  gameOver: {
    type: Boolean,
    default: false
  },
  timeOut: {
    type: Boolean,
    default: false
  }
});

const GameState = mongoose.model("GameState", GameStateSchema);

module.exports = GameState;
