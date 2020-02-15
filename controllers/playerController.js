const House = require("../models/House");
const Players = require("../models/Players");
const mongoose = require("mongoose");

// Defining methods for the playerController
module.exports = {
  // Find and return all scores and player info
  findAll: function(req, res) {
    console.log("findAll function in playerController.js");
    Players.find(req.query)
      .sort({ currScore: -1 })
      .then(dbModel => {
        // console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // Find a player by their _id
  findById: function(req, res) {
    console.log("findById function in playerController.js");
    console.log(req.params);
    Players.findById(req.params.playerId)
      .sort({ currScore: -1 })
      .then(dbModel => {
        // console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // Find players by gameId
  findByName: function(req, res) {
    console.log("findByName function in playerController.js");
    console.log(req.params);
    Players.find(req.params)
      .sort({ currScore: -1 })
      .then(dbModel => {
        // console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // Create a new user in the database
  create: function(req, res) {
    console.log("create function in playerController.js");
    console.log(req.body);
    //save login/ username
    if (
      !req.body.currentGuess &&
      !(req.body.length > 1) &&
      !req.body.currScore
    ) {
      console.log("This is a new user!");
      console.log(req.body);
      Players.create(req.body)
        .then(dbModel => {
          console.log(dbModel);
          res.json(dbModel);
        })
        .catch(err => res.status(422).json(err));
    } else if (req.body.currScore) {
      console.log("this is a late user; Let's fix your score to the average");
      console.log(req.body);
      Players.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { currScore: req.body.currScore, newPlayer: false } }
      )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },
  // Change kickedOut to true
  updateOne: function(req, res) {
    console.log("oh dang, this person is getting kicked out!");
    console.log(req.body);
    Players.findOneAndUpdate(
      { _id: req.body._id, gameId: req.body.gameId },
      { $set: { kickedOut: true } }
    )
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })

      .catch(err => res.status(422).json(err));
  },
  // Update player guesses
  update: function(req, res) {
    console.log("update function in playerController.js- nice guess, user!");
    console.log(req.body);
    Players.findOneAndUpdate(
      { _id: req.body.playerId },
      { $set: { currentGuess: req.body.currentGuess, newPlayer: false } }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    console.log("guess saved!");
  },
  removeAll: function(req, res) {
    console.log("removeAll function in playerController.js");
    House.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
};
