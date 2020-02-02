import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../DeleteBtn";
import { List, ListItem } from "../List";
// import Table from 'react-bootstrap/Table';
// import { get } from "mongoose";
// import io from "socket.io-client";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbScores: [],
      // user: "",
      // currentGuess: props.currentGuess,
      scoreSeed: props.scoreSeed
    };
  }

  componentDidMount() {
    this.getFromDb();
  }

  getFromDb = () => {
    // console.log("this.props.scoreSeed: ");
    // console.log(this.props.scoreSeed);
    // console.log("this.props.scoreSeed,length: ");
    // console.log(this.props.scoreSeed.length);
    // if (!this.props.scoreSeed.length) {
    API.getScores()
      .then(res => {
        this.setState({ dbScores: res.data });
      })
      .catch(err => console.log(err));
    // }
  };

  render(props) {
    //If no scoreSeed props are coming from the Admin page, render from the database
    // This is a fallback for bugs related to user and admin page reloading, or the very beginning of the game
    var renderFrom = this.state.dbScores;
    var dbScoresLength = Object.keys(this.state.dbScores).length;
    console.log("Here is the length of dbScores");
    console.log(dbScoresLength);
    console.log("Here is the length of scoreSeed");
    console.log(this.props.scoreSeed.length);
    //If scoreSeed is longer than dbScores, pull from the database to update state, but still render from the scoreSeed to show updated guesses
    if (dbScoresLength < this.props.scoreSeed.length) {
      console.log(
        "scoreSeed is longer than dbScores- Checking database for updates"
      );
      this.getFromDb();
    }
    if (this.props.scoreSeed.length >= dbScoresLength) {
      console.log("rendering from scoreSeed. This should be the default");
      renderFrom = this.props.scoreSeed;
      console.log("here's what I have in dbScores though: ");
      console.log(this.state.dbScores);
    } else {
      // If the dbScores state is longer than this.props.scoreSeed, something is wrong - display from the database
      console.log(
        "Something may be wrong. I have more players in the database than in the scoreSeed props. Did we gain a player who hasn't guessed?? Did we loose a player somehow?? Rendering from this.props.dbScores. FYI current guesses will always be one round behind until the scoreSeed is back."
      );
      renderFrom = this.state.dbScores;
    }
    return (
      <div>
        <h1>Player Scores</h1>
        <div className="container">
          {this.props.scoreSeed.length || this.state.dbScores ? (
            <List>
              <thead>
                <th>Player Name</th>
                <th>Score</th>
                <th>Current Guess</th>
              </thead>
              <tbody>
              {renderFrom.map(score => {
                return (
                  <ListItem key={score.currScore}>
                    
                      <td>{score.playerName}</td>
                      <td>Current Score: {score.currScore}</td>
                      <td>Current Guess: {score.currentGuess}</td>
                   
                  </ListItem>
                );
              })}
              </tbody>
            </List>
          ) : (
            <h3>No Players to Display</h3>
          )}
          <DeleteBtn onClick={() => this.props.deleteAllPlayers()}>
            END GAME/Clear Data
          </DeleteBtn>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
