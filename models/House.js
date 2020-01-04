const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameInfo: {
    type: String,
    required: true,
    unique: true
  },
  players: [
    {
      name: { type: String, required: true, unique: true },
      currScore: { type: Number, default: 0 }
    }
  ]
});

const House = mongoose.model("House", gameSchema);

module.exports = House;
