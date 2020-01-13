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
    console.log("this.props.scoreSeed: ");
    console.log(this.props.scoreSeed);
    // if (!this.props.scoreSeed.length) {
    console.log("not this.props.scoreseed");
    // loadScores = () => {
    API.getScores()
      .then(res => {
        console.log(res);
        this.setState({ dbScores: res.data });
        console.log(this.state.dbScores);
      })
      .catch(err => console.log(err));
    // };
    // }
  };

  // whereToGrabData = () => {
  //   this.getFromDb();
  //   const getFromSocket = true;
  //   if (!this.props.scoreSeed.length) {
  //     getFromSocket = false;
  //   }
  // };

  render(props) {
    return (
      <div>
        <h1>Player Scores</h1>
        <DeleteBtn onClick={() => props.deleteAllPlayers()}>
          Delete All
        </DeleteBtn>
        <div className="container">
          {this.props.scoreSeed.length ? (
            <List>
              {this.props.scoreSeed.map(score => {
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
            <List>
              {/* bug: CONSTANTLY updates and calls database while scoreSeeds is empty */}
              {this.getFromDb()}
              {this.state.dbScores.map(score => {
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
          )}
        </div>
        {/* <h3>No Scores to Display</h3>  */}
        {/* can't do nested ternary opertor to show this- how to render? */}
      </div>
    );
  }
}

export default Leaderboard;
