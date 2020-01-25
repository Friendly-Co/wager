const House = require("../models/House");
const Players = require("../models/Players");

module.exports = {
  // Find all admin- included for once we expand and have unique admin accounts
  findAll: function(req, res) {
    console.log("findAll function in houseController.js");
    House.find(req.query)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // Find the admin by username
  findById: function(req, res) {
    console.log("findById function in houseController.js");
    console.log(req.params.Id);
    House.findOne({ _id: req.params.Id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Create a new admin in the database
  create: function(req, res) {
    console.log("create function in houseController.js");
    console.log(req.body);
    // const toSave = {
    //   gameInfo: req.body.gameInfo,
    //   adminName: req.body.adminName,
    //   adminEmail: req.body.adminEmail
    // };
    // House.create(toSave)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
    const newGame = new House({
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
    console.log("update function in houseController.js");
    House.findOneAndUpdate(
      { playerName: req.body.playerName },
      { currentGuess: req.body.currentGuess }
    )
      // .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //Clear the database of all accounts
  removeAll: function(req, res) {
    console.log("removeAll function in houseController.js");
    House.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
};
