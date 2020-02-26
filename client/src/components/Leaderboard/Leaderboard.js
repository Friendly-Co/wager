import React, { Component } from "react";
import PlayerAPI from "../../utils/PlayerAPI";
import DeleteBtn from "../DeleteBtn";
import { List, ListItem } from "../List";
// import HouseAPI from "../../utils/HouseAPI";

// import Table from 'react-bootstrap/Table';
// import { get } from "mongoose";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbScores: [],
      scoreSeed: [],
      gameId: props.gameId
    };
  }

  componentDidMount() {
    this.setState({ gameId: this.props.gameId });
    this.getFromDb();
  }

  getFromDb = () => {
    PlayerAPI.getPlayers(this.state.gameId)
      .then(res => {
        res.data.filter(x => x.currScore >= 0 && x.kickedOut === false);
        console.log("here is the response");
        console.log(res.data);
        this.setState({ dbScores: res.data });
      })
      .catch(err => console.log(err));
  };

  render(props) {
    //If no scoreSeed props are coming from the Admin page, render from the database
    // This is a fallback for bugs related to user and admin page reloading, or the very beginning of the game
    var renderFrom = this.props.scoreSeed;
    // var renderFrom = this.state.dbScores;
    var dbScoresLength = Object.keys(this.state.dbScores).length;
    var scoreSeedLength = this.props.scoreSeed.filter(
      x => x.gameId === this.state.gameId
    ).length;

    // // //If scoreSeed is longer than dbScores, pull from the database to update state, but still render from the scoreSeed to show updated guesses
    if (dbScoresLength < scoreSeedLength) {
      this.getFromDb();
    }

    if (this.props.scoreSeed.length < dbScoresLength) {
      renderFrom = this.state.dbScores;
      console.log("rendering from dbScores");
      console.log("==== dbScore: ");
      console.log(this.state.dbScores);
      console.log("==== scoreseed: ");
      console.log(this.props.scoreSeed);
    } else {
      renderFrom = this.props.scoreSeed;
      console.log("rendering from scoreSeed");
    }

    renderFrom = renderFrom
      .filter(x => x.gameId === this.state.gameId && x.kickedOut === false)
      .sort((a, b) => a - b);

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
                    <ListItem key={score._id}>
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
          {/* <DeleteBtn onClick={() => this.props.deleteAllPlayers()}> */}
          <DeleteBtn onClick={() => this.props.endGame()}>END GAME</DeleteBtn>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
