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
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Find a player by username
  findByName: function(req, res) {
    console.log("findByName function in playerController.js");
    console.log(req.params);
    // House.find({ playerName: req.params.playerName })
    Players.find(req.params)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // Create a new user in the database, and update their currentGuess
  create: function(req, res) {
    console.log("create function in playerController.js");
    console.log(req.body);
    //save login/ username
    if (!req.body.currentGuess && !(req.body.length > 1)) {
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
        { currentGuess: req.body.currentGuess }
      )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      console.log("guess saved!");
    }
  },
  update: function(req, res) {
    console.log("update function in playerController.js");
    console.log(req.body);
    var answer = req.body[0].answer;
    answer = answer.toUpperCase();
    console.log("answer is: ");
    console.log(answer);
    var gameId = req.body[1]._id;
    console.log("game id is:");
    console.log(gameId);
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

    // db.findOne({ _id: req.body._id })
    //   .then(function(player) {
    //     player.players.updateMany(
    //       { currentGuess: " " },
    //       { $inc: { currScore: -1 }, $set: { currentGuess: " " } },
    //       { multi: true }
    //     );
    //     player.save();
    //   })

    //Subtract 1 from scores when unanswered
    // db.updateMany(
    //   { $and: [{ _id: gameId }, { "players.currentGuess": " " }] },
    //   {
    //     $inc: { "players.currScore": -1 },
    //     $set: { "players.currentGuess": " " }
    //   },
    //   { multi: true }
    // )

    House.findOne({ _id: gameId })
      .then(function(player) {
        console.log("player before for loop");
        console.log(player.players);
        for (let i = 0; i < player.players.length; i++) {
          if (player.players[i].currentGuess == " ") {
            player.players[i].currScore -= 1;
          } else if (player.players[i].currentGuess != answer) {
            player.players[i].currScore -= toAddOrSubtract;
            player.players[i].currentGuess = " ";
          } else if (player.players[i].currentGuess == answer) {
            player.players[i].currScore += toAddOrSubtract;
            player.players[i].currentGuess = " ";
          }
        }
        console.log("player after for loop");
        console.log(player.players);
        // player.save();
        // db.update(
        var toSave = player.players;
        House.update(
          { _id: gameId },
          // gameId,
          // { $set: { "players.$": toSave } }
          { $set: { players: toSave } },
          { new: true }
          // ,
          // { upsert: true }
          // { multi: true }
        );
      })

      // db.updateMany(
      //   { currentGuess: " " },
      //   { $inc: { currScore: -1 }, $set: { currentGuess: " " } },
      //   { multi: true }
      // )
      // .then(() => {
      //   // increase scores of correct guesses
      //   return db.updateMany(
      //     { currentGuess: answer },
      //     {
      //       $inc: { currScore: +toAddOrSubtract },
      //       $set: { currentGuess: " " }
      //     },
      //     { multi: true }
      //   );
      // })
      // .then(() => {
      // if a player answered the question, but incorrectly - will be much more complex if subtracting by player's answer...
      //   return db.updateMany(
      //     { currentGuess: { $nin: [answer, " "] } },
      //     {
      //       $inc: { currScore: -toAddOrSubtract },
      //       $set: { currentGuess: " " }
      //     },
      //     { multi: true }
      //   );
      // })
      .then(() => {
        return House.findOne({ _id: gameId }).then(dbModel => {
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
