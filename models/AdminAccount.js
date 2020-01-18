const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminAccountSchema = new Schema({
  adminName: {
    type: String,
    required: [true, "must provide a username"],
    unique: true,
    maxlength: 32
  },
  adminEmail: {
    type: String,
    required: [true, "must provide an email"],
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  date: { type: Date, default: Date.now }
});

const AdminAccount = mongoose.model("AdminAccount", AdminAccountSchema);

module.exports = AdminAccount;
