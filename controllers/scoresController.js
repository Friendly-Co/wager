const db = require("../models/House");

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
    //save guesses
    if (req.body.currentGuess) {
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
      console.log("this has an answer in here!");
      var answer = req.body.pop();
      answer = answer.answer.toUpperCase();
      console.log("answer: ");
      console.log(answer); //Run
      console.log("req.body: ");
      console.log(req.body); //[ { playerName: 'Dexter', currentGuess: 'PASS' } ]
      const rightAnswers = req.body.filter(index =>
        index.currentGuess.includes(answer)
      );

      console.log("rightAnswers: ");
      console.log(rightAnswers);
      var toAdd = 0;
      switch (answer) {
        case "RUN" || "PASS":
          toAdd = 2;
          break;
        case "KICK":
          toAdd = 1;
          break;
        case "TURNOVER":
          toAdd = 10;
          break;
        default:
          toAdd = 0;
      }
      console.log("toAdd: ");
      console.log(toAdd);
      db.updateMany(
        { currentGuess: answer },
        { $inc: { currScore: +toAdd } },
        { multi: true }
      )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      db.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },
  update: function(req, res) {
    console.log("update function in scoresController.js");
    console.log(req.body);
    db.findOneAndUpdate({ playerName: req.params.playerName }, req.body) //route for updating all?
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // update: function(req, res) {
  //   console.log("update function in scoresController.js");
  //   console.log(req.body);
  //   db.findOneAndUpdate({ _id: req.params.id }, req.body) //route for updating all?
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
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
