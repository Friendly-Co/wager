import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../DeleteBtn";
import { List, ListItem } from "../List";
// import io from "socket.io-client";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      user: "",
      currentGuess: props.currentGuess,
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

  // Loads all books  and sets them to this.state.scores
  // loadScores = () => {
  // API.getScores()
  //   .then(res =>
  //     this.setState({
  //       scores: res.data
  //     })
  //   )
  //   .catch(err => console.log(err));
  //   this.setState({
  //     scoreSeed: [
  //       {
  //         playerName: "Annabelle",
  //         currScore: 35,
  //         currentGuess: "Run"
  //       },
  //       {
  //         playerName: "Jose",
  //         currScore: 70,
  //         currentGuess: "Run"
  //       },
  //       {
  //         playerName: "Elli",
  //         currScore: 30,
  //         currentGuess: "Run"
  //       },
  //       {
  //         playerName: "Roland",
  //         currScore: 75,
  //         currentGuess: "Pass"
  //       },
  //       {
  //         playerName: "Denisha",
  //         currScore: 41,
  //         currentGuess: "Run"
  //       },
  //       {
  //         playerName: "John",
  //         currScore: 31,
  //         currentGuess: "Run"
  //       },
  //       {
  //         playerName: "Maria",
  //         currScore: 15,
  //         currentGuess: "Turnover"
  //       },
  //       {
  //         playerName: "Luz",
  //         currScore: 50,
  //         currentGuess: "Turnover"
  //       }
  //     ]
  //   });
  // };

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

  render(props) {
    return (
      <div>
        <h1>Player Scores</h1>
        <DeleteBtn onClick={() => props.deleteAllPlayers()}>
          Delete All
        </DeleteBtn>
        <div className="container">
          {/* {this.state.scoreSeed.length ? ( */}
          {this.props.scoreSeed.length ? (
            <List>
              {(this.props.scoreSeed || []).map(score => {
                // {
                /* {props.scoreSeed.map(score => { */
                // }
                return (
                  // <ListItem key={score._id}>
                  <ListItem key={score.playerName}>
                    {/* <DeleteBtn onClick={() => this.deletePlayer(score._id)}> */}
                    {/* <DeleteBtn onClick={() => this.deletePlayer(scoreSeed)}>
                      Delete Player
                    </DeleteBtn> */}
                    <strong>
                      <h3>{score.player}</h3>
                      <p>Current Score: {score.currScore}</p>
                      <p>Current Guess: {score.currentGuess}</p>
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
