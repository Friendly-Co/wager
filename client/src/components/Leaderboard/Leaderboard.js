import React, { Component } from "react";
import PlayerAPI from "../../utils/PlayerAPI";
import HouseAPI from "../../utils/HouseAPI";
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
      scoreSeed: props.scoreSeed,
      gameId: props.gameId
    };
  }

  componentDidMount() {
    this.setState({ gameId: this.props.gameId });
    console.log("component Mounting. Hereis this.state.scoreseed");
    console.log(this.state.scoreSeed);
    console.log(this.state.gameId);
    // this.getFromDb();
  }

  getFromDb = () => {
    // console.log("this.props.scoreSeed: ");
    // console.log(this.props.scoreSeed);
    // console.log("this.props.scoreSeed,length: ");
    // console.log(this.props.scoreSeed.length);
    // if (!this.props.scoreSeed.length) {
    console.log("here is the game id");
    console.log(this.state.gameId);
    HouseAPI.getGameInfo(this.state.gameId)
      // PlayerAPI.getPlayers()
      .then(res => {
        console.log(res.data);
        // this.setState({ dbScores: res.data.players });
      })
      .catch(err => console.log(err));
    // }
  };

  render(props) {
    //If no scoreSeed props are coming from the Admin page, render from the database
    // This is a fallback for bugs related to user and admin page reloading, or the very beginning of the game
    // var renderFrom = this.state.dbScores;
    // var dbScoresLength = Object.keys(this.state.dbScores).length;
    // console.log("Here is the length of dbScores");
    // console.log(dbScoresLength);
    // console.log("Here is the scoreSeed");
    // console.log(this.props.scoreSeed);
    // // //If scoreSeed is longer than dbScores, pull from the database to update state, but still render from the scoreSeed to show updated guesses
    // if (dbScoresLength < this.props.scoreSeed.length) {
    //   console.log(
    //     "scoreSeed is longer than dbScores- Checking database for updates"
    //   );
    //   this.getFromDb();
    // }
    // if (this.props.scoreSeed.length >= dbScoresLength) {
    //   console.log("rendering from scoreSeed. This should be the default");
    //   renderFrom = this.props.scoreSeed;
    //   console.log("here's what I have in dbScores though: ");
    //   console.log(this.state.dbScores);
    // } else {
    //   //   // If the dbScores state is longer than this.props.scoreSeed, something is wrong - display from the database
    //   console.log(
    //     "Something may be wrong. I have more players in the database than in the scoreSeed props. Did we gain a player who hasn't guessed?? Did we loose a player somehow?? Rendering from this.props.dbScores. FYI current guesses will always be one round behind until the scoreSeed is back."
    //   );
    //   renderFrom = this.state.dbScores;
    // }
    return (
      <div>
        <h1>Player Scores</h1>
        <div className="container">
          {/* {this.props.scoreSeed.length || this.state.dbScores ? ( */}
          {/* {this.props.scoreSeed.length || this.state.dbScores ? ( */}
          <List>
            {/* {renderFrom.map(score => { */}
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
          {/* ) : ( */}
          {/* <h3>No Players to Display</h3> */}
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
