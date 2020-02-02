const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  },
  gameOver: { type: Boolean, required: true, default: false }
});

const House = mongoose.model("House", gameSchema);

module.exports = House;
