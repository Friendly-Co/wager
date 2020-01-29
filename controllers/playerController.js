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
  // Find a player by username
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
  // Create a new user in the database, and update their currentGuess
  create: function(req, res) {
    console.log("create function in playerController.js");
    console.log(req.body);
    //save login/ username
    if (
      !req.body.currentGuess &&
      !(req.body.length > 1) &&
      !req.body.currScore
    ) {
      console.log("no guess... this is a new user!");
      console.log(req.body);
      Players.create(req.body)
        .then(dbModel => {
          console.log(dbModel);
          res.json(dbModel);
        })
        .catch(err => res.status(422).json(err));
      //create guesses
    } else if (req.body.currentGuess) {
      console.log("nice guess, user!");
      console.log(req.body);
      Players.findOneAndUpdate(
        { _id: req.body.playerId },
        { $set: { currentGuess: req.body.currentGuess, newPlayer: false } }
      )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      console.log("guess saved!");
      //store update beginning score to average for late users
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
  // calculate all scores
  update: function(req, res) {
    console.log("update function in scoresController.js");
    console.log(req.body);
    var answer = req.body[0].answer;
    answer = answer.toUpperCase();
    var gameId = req.body[1].gameId;
    console.log(req.body);
    //should be according to the user's guess, not the answer!
    var toAddOrSubtract = 0;

    switch (answer) {
      case "RUN":
        toAddOrSubtract = 3;
        break;
      case "PASS":
        toAddOrSubtract = 3;
        break;
      case "KICK":
        toAddOrSubtract = 1;
        break;
      case "TURNOVER":
        toAddOrSubtract = 10;
        break;
      default:
        toAddOrSubtract = 0;
    }

    //Subtract 1 from scores when unanswered
    Players.updateMany(
      { currentGuess: " ", gameId: gameId },
      { $inc: { currScore: -1 }, $set: { currentGuess: " " } },
      { multi: true }
    )
      .then(() => {
        // increase scores of correct guesses
        return Players.updateMany(
          { currentGuess: answer, gameId: gameId },
          {
            $inc: { currScore: +toAddOrSubtract },
            $set: { currentGuess: " " }
          },
          { multi: true }
        );
      })
      .then(() => {
        // if a player answered the question, but incorrectly - will be much more complex if subtracting by player's answer...
        return Players.updateMany(
          { currentGuess: { $nin: [answer, " "] }, gameId: gameId },
          {
            $inc: { currScore: -toAddOrSubtract },
            $set: { currentGuess: " " }
          },
          { multi: true }
        );
      })
      .then(() => {
        return Players.find({ gameId: gameId }).then(dbModel => {
          console.log(dbModel);
          res.json(dbModel);
        });
      })
      .catch(err => res.status(422).json(err));
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
