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
        this.setState({ dbScores: res.data });
      })
      .catch(err => console.log(err));
  };

  render(props) {
    //If no scoreSeed props are coming from the Admin page, render from the database
    // This is a fallback for bugs related to user and admin page reloading, or the very beginning of the game
    var renderFrom = this.state.dbScores;
    var dbScoresLength = Object.keys(this.state.dbScores).length;

    // // //If scoreSeed is longer than dbScores, pull from the database to update state, but still render from the scoreSeed to show updated guesses
    if (
      dbScoresLength <
      this.props.scoreSeed.filter(x => x.gameId === this.state.gameId).length
    ) {
      this.getFromDb();
    }
    if (this.props.scoreSeed.length > dbScoresLength) {
      renderFrom = this.props.scoreSeed;
    } else {
      renderFrom = this.state.dbScores;
    }
    renderFrom = renderFrom.filter(x => x.gameId === this.state.gameId);
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
                    <strong>
                      <h3>{score.playerName}</h3>
                      <p>Current Score: {score.currScore}</p>
                      <p>Current Guess: {score.currentGuess}</p>
                    </strong>

                    //merge conflict:
//                       <td>{score.playerName}</td>
//                       <td>Current Score: {score.currScore}</td>
//                       <td>Current Guess: {score.currentGuess}</td>
                   
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
