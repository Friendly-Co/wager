import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../DeleteBtn";
import { List, ListItem } from "../List";
import io from "socket.io-client";

class Leaderboard extends Component {
  // Setting our component's initial state
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      user: "",
      currentGuess: 5
    };

    var scoreSeed = [
      {
        playerName: "Annabelle",
        currScore: 35
      },
      {
        playerName: "Jose",
        currScore: 70,
        currentGuess: Run
      },
      {
        playerName: "Elli",
        currScore: 30,
        currentGuess: Run
      },
      {
        playerName: "Roland",
        currScore: 75,
        currentGuess: Pass
      },
      {
        playerName: "Denisha",
        currScore: 41,
        currentGuess: Run
      },
      {
        playerName: "John",
        currScore: 31,
        currentGuess: Run
      },
      {
        playerName: "Maria",
        currScore: 15,
        currentGuess: Turnover
      },
      {
        playerName: "Luz",
        currScore: 50,
        currentGuess: Turnover
      }
    ];

    this.socket = io("localhost:3001");

    this.socket.on("RECIEVE_MESSAGE", function(data) {
      addUserInfo(data);
    });

    const addUserInfo = data => {
      console.log(data);
      this.setState({ currentGuess: this.state.currentGuess, data });
      console.log(this.state.currentGuess);
    };

    this.sendUserInfo = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        user: this.state.user,
        currentGuess: this.state.currentGuess
      });
      this.setState({ currentGuess: "" });
      this.setState({});
    };
  }

  // When the component mounts, load all scores and save them to this.state.scores
  componentDidMount() {
    // this.loadScores();
  }

  // Loads all books  and sets them to this.state.scores
  loadScores = () => {
    // API.getScores()
    //   .then(res =>
    //     this.setState({
    //       scores: res.data
    //     })
    //   )
    //   .catch(err => console.log(err));
  };

  // Deletes a score from the database with a given id, then reloads scores from the db
  // deletePlayer = id => {
  // API.deletePlayer(id)
  //   .then(res => this.loadScores())
  //   .catch(err => console.log(err));

  // };
  deletePlayer = id => {
    // API.deletePlayer(id)
    //   .then(res => this.loadScores())
    //   .catch(err => console.log(err));
    // for (let i = 0; i < scoreSeed.length; i ++) {
    // }
  };
  // Deletes all scores from the database, then reloads scores from the db
  deleteAllPlayers = () => {
    API.deleteAllPlayers()
      .then(res => this.loadScores()) //Bug: deletes all, but does not reload
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Player Scores</h1>
        <DeleteBtn onClick={() => this.deleteAllPlayers()}>
          Delete All
        </DeleteBtn>
        <div className="container">
          {this.state.scores.length ? (
            <List>
              {this.state.scores.map(score => {
                return (
                  <ListItem key={score._id}>
                    {/* <DeleteBtn onClick={() => this.deletePlayer(score._id)}> */}
                    <DeleteBtn onClick={() => this.deletePlayer(scoreSeed)}>
                      Delete Player
                    </DeleteBtn>
                    <strong>
                      <h3>{scoreSeed.playerName}</h3>
                      <p>Current Score: {scoreSeed.currScore}</p>
                      <p>Current Guess: {scoreSeed.currentGuess}</p>
                      {/* <h3>{score.playerName}</h3>
                      <p>Current Score: {score.currScore}</p>
                      <p>Current Guess: {score.currentGuess}</p> */}
                    </strong>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Scores to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
