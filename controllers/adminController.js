const db = require("../models/House");

module.exports = {
  // Find all admin- included for once we expand and have unique admin accounts
  findAll: function(req, res) {
    console.log("findAll function in adminController.js");
    db.find(req.query)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // Find the admin by username
  findByName: function(req, res) {
    console.log(req.params.adminName);
    console.log("findByName function in adminController.js");
    db.find({ adminName: req.params.adminName })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Create a new admin in the database
  create: function(req, res) {
    console.log("create function in adminController.js");
    console.log(req.body);
    // const toSave = {
    //   gameInfo: req.body.gameInfo,
    //   adminName: req.body.adminName,
    //   adminEmail: req.body.adminEmail
    // };
    // db.create(toSave)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
    const newGame = new db({
      gameInfo: req.body.gameInfo,
      adminName: req.body.adminName,
      adminEmail: req.body.adminEmail,
      players: []
    });

    // newGame.save().then(function() {
    //   console.log("done!");
    // });
    newGame
      .save()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //admin can update their email info
  update: function(req, res) {
    console.log("update function in adminController.js");
    db.findOneAndUpdate(
      { playerName: req.body.playerName },
      { currentGuess: req.body.currentGuess }
    )
      // .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //Clear the database of all accounts
  removeAll: function(req, res) {
    console.log("removeAll function in scoresController.js");
    db.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
};
