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
      user: "",
      // currentGuess: props.currentGuess,
      scoreSeed: props.scoreSeed
    };

    // this.socket = io("localhost:3001");

    // this.socket.on("RECIEVE_MESSAGE", function(data) {
    //   addUserInfo(data);
    //   console.log(data);
    // });

    // const addUserInfo = data => {
    //   console.log(data);
    //   this.setState({ currentGuess: this.state.scoreSeed.currentGuess, data });
    //   console.log(this.state.currentGuess);
    // };

    // this.sendUserInfo = ev => {
    //   ev.preventDefault();
    //   this.socket.emit("SEND_MESSAGE", {
    //     user: this.state.scoreSeed.user,
    //     currentGuess: this.state.scoreSeed.currentGuess
    //   });
    //   this.setState({ currentGuess: "" });
    //   this.setState({});
    //   // console.log({ currentGuess });
    // };
  }

  // When the component mounts, load all scores and save them to this.state.scores
  // componentDidMount() {
  // this.loadScores();
  // }

  // Deletes a score from the database with a given id, then reloads scores from the db
  // deletePlayer = id => {
  // API.deletePlayer(id)
  //   .then(res => this.loadScores())
  //   .catch(err => console.log(err));

  // };
  // deletePlayer = id => {
  // API.deletePlayer(id)
  //   .then(res => this.loadScores())
  //   .catch(err => console.log(err));
  // for (let i = 0; i < scoreSeed.length; i ++) {
  // }
  // };
  // Deletes all scores from the database, then reloads scores from the db

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
