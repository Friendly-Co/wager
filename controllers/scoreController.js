const Players = require("../models/Players");
const mongoose = require("mongoose");

module.exports = {
  // calculate all scores
  update: function(req, res) {
    console.log("update function in playerController.js");
    console.log(req.body);
    var answer = req.body[0].answer;
    answer = answer.toUpperCase();
    const gameId = req.body[1].gameId;
    console.log(req.body);

    var toAddOrSubtract = 0;
    let otherGuess = "";

    // players win and loose points depending on their guess
    switch (answer) {
      case "RUN":
        toAddOrSubtract = 3;
        otherGuess = "PASS";
        runOrPass();
        break;
      case "PASS":
        toAddOrSubtract = 3;
        otherGuess = "RUN";
        runOrPass();
        break;
      case "KICK":
        kick();
        break;
      case "TURNOVER":
        turnover();
        break;
      default:
        toAddOrSubtract = 0;
    }

    // if the answer is turnover, find all with TURNOVER as currentGuess, and add 10
    // reset all currentGuesses to  " "
    function turnover() {
      Players.updateMany(
        { currentGuess: answer, gameId: gameId },
        {
          $inc: { currScore: +10 },
          $set: { currentGuess: " " }
        },
        { multi: true }
      )
        .then(() => {
          return Players.updateMany(
            { gameId: gameId },
            {
              // $inc: { currScore: -toAddOrSubtract },
              $set: { currentGuess: " " }
            },
            { multi: true }
          );
        })
        //   .then(() => {
        //     return Players.updateMany(
        //       { currentGuess: "KICK", gameId: gameId },
        //       {
        //         $inc: { currScore: -1 },
        //         $set: { currentGuess: " " }
        //       },
        //       { multi: true }
        //     );
        //   })
        .then(() => {
          return Players.find({ gameId: gameId }).then(dbModel => {
            console.log(dbModel);
            res.json(dbModel);
          });
        })
        .catch(err => res.status(422).json(err));
    }

    // if the answer is kick, find all with KICK as currentGuess, and add 1
    //... find all with currentGuess RUN or PASS, and subtract 3
    function kick() {
      Players.updateMany(
        { currentGuess: answer, gameId: gameId },
        {
          $inc: { currScore: +1 },
          $set: { currentGuess: " " }
        },
        { multi: true }
      )
        .then(() => {
          return Players.updateMany(
            { currentGuess: "RUN", gameId: gameId },
            {
              $inc: { currScore: -3 },
              $set: { currentGuess: " " }
            },
            { multi: true }
          );
        })
        .then(() => {
          return Players.updateMany(
            { currentGuess: "PASS", gameId: gameId },
            {
              $inc: { currScore: -3 },
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
    }

    //Subtract 1 from scores when unanswered
    // Players.updateMany(
    //   { currentGuess: " ", gameId: gameId },
    //   { $inc: { currScore: -1 }, $set: { currentGuess: " " } },
    //   { multi: true }
    // )
    //   .then(() => {
    //     // increase scores of correct guesses
    //     return

    // if the answer is run (answer), find all with RUN as currentGuess, and add 3
    //... find all with currentGuess PASS (other = PASS), and subtract 3 ....find all with currentGuess KICK, and subtract 1
    // if the answer is PASS, fund all with PASS as the currentGuess, and add 3
    //... find all with currentGuess RUN (other = RUN), and subtract 3 ....find all with currentGuess KICK, and subtract 1
    function runOrPass() {
      Players.updateMany(
        { currentGuess: answer, gameId: gameId },
        {
          $inc: { currScore: +toAddOrSubtract },
          $set: { currentGuess: " " }
        },
        { multi: true }
      )
        .then(() => {
          return Players.updateMany(
            { currentGuess: otherGuess, gameId: gameId },
            {
              $inc: { currScore: -toAddOrSubtract },
              $set: { currentGuess: " " }
            },
            { multi: true }
          );
        })
        .then(() => {
          return Players.updateMany(
            { currentGuess: "KICK", gameId: gameId },
            {
              $inc: { currScore: -1 },
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
    }
  }
};
