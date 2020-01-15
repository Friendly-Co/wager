const db = require("../models/House");
// const async = require("async");

// Defining methods for the scoresController
module.exports = {
  findAll: function(req, res) {
    console.log("findAll function in scoresController.js");
    db.find(req.query)
      .sort({ currScore: -1 })
      .then(dbModel => {
        // console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("findById function in scoresController.js");
    db.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByName: function(req, res) {
    console.log(req.params.playerName);
    console.log("findByName function in scoresController.js");
    db.find({ playerName: req.params.playerName })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("create function in scoresController.js");
    console.log(req.body);
    //save login/ username
    if (!req.body.currentGuess && !(req.body.length > 1)) {
      //edge case- if only one person votes!!
      console.log("no guess... this is a new user!");
      db.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      //save guesses
    } else if (req.body.currentGuess) {
      console.log("nice guess, user!");
      db.findOneAndUpdate(
        { playerName: req.body.playerName },
        { currentGuess: req.body.currentGuess }
      )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      console.log("guess saved!");
    }
    // calculate scores and save
    else if (Object.keys(req.body[req.body.length - 1]).includes("answer")) {
      console.log("Admin page: this has an answer in here!");
      var answer = req.body.pop();
      answer = answer.answer.toUpperCase();
      console.log(req.body); //[ { playerName: 'Dexter', currentGuess: 'PASS' } ]
      // const rightAnswers = req.body.filter(index =>
      //   index.currentGuess.includes(answer)
      // );
      // const wrongAnswers = req.body.filter(
      //   index => index.currentGuess !== answer
      // );

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

      //Subtract 1 from scores when unanswered -this one will only work once I update the DOM with scores
      db.updateMany(
        { currentGuess: " " },
        { $inc: { currScore: -1 }, $set: { currentGuess: " " } },
        { multi: true }
      )

        .then(() => {
          // increase scores of correct guesses
          return db.updateMany(
            { currentGuess: answer },
            {
              $inc: { currScore: +toAddOrSubtract },
              $set: { currentGuess: " " }
            },
            { multi: true }
          );
        })
        .then(() => {
          // if a player answered the question, but incorrectly - will be much more complex if subtracting by player's answer...
          return db.updateMany(
            { currentGuess: { $nin: [answer, " "] } },
            {
              $inc: { currScore: -toAddOrSubtract },
              $set: { currentGuess: " " }
            },
            { multi: true }
          );
        })
        //breaks the db call??
        .then(() => {
          return db
            .find({})

            .then(dbModel => {
              console.log(dbModel);
              res.json(dbModel);
            });
        })
        // .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },
  update: function(req, res) {
    console.log("update function in scoresController.js");
    console.log(req.body);
    db.findOneAndUpdate({ playerName: req.params.playerName }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("remove function in scoresController.js");
    console.log(req.params.id);
    db.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeAll: function(req, res) {
    console.log("removeAll function in scoresController.js");
    db.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
};
