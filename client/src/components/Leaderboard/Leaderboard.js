import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../DeleteBtn";
import { List, ListItem } from "../List";
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
        console.log(res);
        this.setState({ dbScores: res.data });
        console.log(this.state.dbScores);
      })
      .catch(err => console.log(err));
    // }
  };

  render(props) {
    var renderFrom = this.state.dbScores;
    if (this.props.scoreSeed.length) {
      renderFrom = this.props.scoreSeed;
    } else {
      // if there is are no current scores in props, pull ONCE from the database and rendeer those
      // this.getFromDb(); //bug:  this will constatntly load in the beginning of the game.

      renderFrom = this.state.dbScores;
    }
    return (
      <div>
        <h1>Player Scores</h1>
        <DeleteBtn onClick={() => this.props.deleteAllPlayers()}>
          Delete All
        </DeleteBtn>
        <div className="container">
          {/* need to fix: if the length is zero OR there is no current score in props, render from the database */}
          {this.props.scoreSeed.length ? (
            <List>
              {renderFrom.map(score => {
                return (
                  <ListItem key={score.playerName}>
                    <strong>
                      <h3>{score.playerName}</h3>
                      <p>Current Score: {score.currScore}</p>
                      <p>Current Guess: {score.currentGuess}</p>
                    </strong>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Players to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
