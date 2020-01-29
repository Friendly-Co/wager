import React, { Component } from "react";
import PlayerAPI from "../../utils/PlayerAPI";
import HouseAPI from "../../utils/HouseAPI";
import { FormBtn, Input } from "../../components/Form";
import Logo from "../../components/Logo";
import InstructionsModal from "../../components/instructionsModal";

let count = 1;

class Login extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    playerEmail: "",
    message: "",
    adminLoginBoolean: false,
    adminEmail: "",
    adminName: "",
    emailButton: false,
    //all games pulled from the database (array of objects), used for rendering dropdowns:
    games: [],
    // ex: Bears v. Packers, entered by admin:
    newGame: "",
    gameInfo: "",
    // Unique id of game from dropdown selection:
    gameId: "",
    introModal: false,
    page: 1,
    nextOrClose: "Next"
  };

  componentDidMount() {
    this.setState({ introModal: true });
    // this.loadGames();
    // console.log(this.state.games);
  }

  loadGames = () => {
    console.log("button clicked");
    // PlayerAPI.getPlayers().then(res => {
    HouseAPI.getAllGames().then(res => {
      this.setState({ games: res.data });
      console.log(this.state.games);
    });
  };

  // This ONCE handled form input change for all admin game dropdown, until I changed it, now it is unused
  //bug: If this function is removed, at times you are unable to type in the form input areas...????!!!!
  handleDropdownInputChange = event => {
    this.setState({
      ...this.state,
      gameInfo: event.target.value,
      gameId: event.target.id
    });
    console.log("this.state.gameInfo: ");
    console.log(this.state.gameInfo);
    console.log("this.state.gameId: ");
    console.log(this.state.gameId);
  };

  //handles form input change for all fields
  handleInputChange = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  };

  // to add to dropdown: if there are no games set up, send out a message, and redirect to the admin page to create a game
  setGameInfo = (name, id) => {
    console.log("dropdown clicked");
    this.setState({ gameInfo: name });
    //If there is an id, this was selected by a player
    if (id) {
      this.setState({ gameId: id });
      console.log(this.state.gameInfo);
      console.log(this.state.gameId);
    }
  };

  //================================= Player Login Function ====================================

  //Consider adding: if username and email match... turn on ability to grab all data associated with this player at the end of the game
  // Add: if a player is loggin back in to a game, if kickedOut = true, don't let them keep playing.

  //search the database for any matching usernames.
  //If matching, alert the user to change their name
  handlePlayerSave = event => {
    event.preventDefault();
    //verify unique username
    if (this.state.username && this.state.gameId && this.state.playerEmail) {
      PlayerAPI.getPlayers(this.state.gameId)
        .then(res => {
          console.log(res.data);
          if (res.data.length) {
            for (let i = 0; i < res.data.length; i++) {
              // if player already exists and was kicked out
              if (
                this.state.username === res.data[i].playerName &&
                this.state.gameId === res.data[i].gameId &&
                res.data[i].kickedOut === true
              ) {
                this.setState({
                  message: alert(
                    "This username has dropped below zero points in this game.  Create a new player to continue playing this game. Better luck next time!"
                  )
                });
                return false;
              }
              // if there is data, make sure the username is unique
              if (this.state.username === res.data[i].playerName) {
                this.setState({
                  message: alert(
                    "This username has been taken. Please enter a unique name."
                  )
                });
                //player name must be unique for leaderboard use and awards from admin
                //clear field
                return false;
              }
            }
          }
          //if player already exists, and kickedOut = false, log in
          if (
            this.state.username &&
            this.state.gameId &&
            this.state.playerEmail
          ) {
            //handle save
            var toSave = {
              playerName: this.state.username,
              gameId: this.state.gameId,
              playerEmail: this.state.playerEmail
            };

            PlayerAPI.savePlayer(toSave).then(res => {
              console.log(res.data);
              this.setState({
                message: alert(
                  "Your username has been saved! Click OK to redirect to your game page."
                )
              });
              window.location =
                "/game/" +
                this.state.gameId +
                "/user/" +
                this.state.username +
                "/userid/" +
                res.data._id;
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  //================================ Admin Login Function ====================================
  // consider saving the admin info in a separate collection, querying the collection, then adding that info (gameInfo and _id) to the corresponding game

  handleAdminSave = event => {
    event.preventDefault();

    // This is a new game to save. Accept all fields and save
    if (this.state.newGame) {
      this.setState(state => {
        state.gameInfo = "";
        state.gameId = "";
      });
      console.log("circumventing the if statements because there is no id");
      var toSave = {
        adminName: this.state.adminName,
        adminEmail: this.state.adminEmail,
        gameInfo: this.state.newGame
      };
      HouseAPI.saveGame(toSave).then(res => {
        this.setState({
          message: alert(
            `A new ${this.state.newGame} game has been created with the username ${this.state.adminName} and associated email ${this.state.adminEmail}.`
          )
        });

        window.location =
          "/admingame/" + res.data._id + "/admin/" + this.state.adminName;
      });
    }

    // This is a previously created game. Go to the page after checking admin credentials.
    else if (
      this.state.adminName &&
      this.state.adminEmail &&
      this.state.gameInfo
    ) {
      console.log("we are retrieving a previously created game.");
      const toFind = this.state.gameId;

      HouseAPI.getGameInfo(toFind)
        .then(res => {
          console.log(res.data);
          // If there is an admin already in the system, they were logged out
          // Make sure their email and name match the database then log them back in
          if (res.data) {
            if (
              this.state.adminName !== res.data.adminName &&
              this.state.adminEmail !== res.data.adminEmail
            ) {
              this.setState({
                message: alert(
                  "This username and email do not match our database. Please try again"
                )
              });
              return false;
            } else if (
              this.state.adminEmail === res.data.adminEmail &&
              this.state.gameId === res.data._id &&
              this.state.adminName !== res.data.adminName
            ) {
              this.setState({
                message: alert(
                  'This username does not match our database for this game. Please try again. If you would like an email reminder of your username, click "Email Login Info"'
                )
              });
              //email username option...add button to email
              this.setState({ emailButton: true });
              return false;
            } else if (
              this.state.adminName === res.data.adminName &&
              this.state.gameId === res.data._id &&
              this.state.adminEmail !== res.data.adminEmail
            ) {
              this.setState({
                message: alert(
                  "This email does not match the admin name in our database for this game. Please try again"
                )
              });
              return false;
            }

            // if already in the database and their input matches, load the admin page
            else if (
              this.state.adminName === res.data.adminName &&
              this.state.adminEmail === res.data.adminEmail &&
              this.state.gameId === res.data._id
            ) {
              this.setState({
                message: alert("Welcome Back!")
              });
              window.location =
                "/admingame/" +
                this.state.gameId +
                "/admin/" +
                this.state.adminName;
            }
          }
        })
        .catch(err => console.log(err));
    }
  };

  emailUsername = event => {
    event.preventDefault();
    const toFind = this.state.gameId;
    HouseAPI.getGameInfo(toFind).then(res => {
      console.log(res.data);
      const toSend = {
        adminName: res.data.adminName,
        adminEmail: res.data.adminEmail
      };
      HouseAPI.sendEmail(toSend).then(res => console.log(res));
    });
    return;
  };

  // ============================== Modal Controls and Conditional Rendering ======================================
  toggleLogin = event => {
    this.setState(prevState => ({
      adminLoginBoolean: !prevState.adminLoginBoolean
    }));
  };

  toggleIntro = () => {
    if (this.state.introModal) {
      this.setState({ introModal: false });
    } else {
      this.setState({ introModal: true });
    }
  };

  introNextorClose = () => {
    count++;
    this.setState({ page: count });
    if (count < 5) {
      this.setState({ introModal: true });
    } else if (count === 5) {
      this.setState({ nextOrClose: "Close" });
    } else {
      this.toggleIntro();
    }
  };

  render() {
    return (
      <div className="container">
        <Logo />
        {!this.state.adminLoginBoolean ? (
          //  ============================================ Player Rendering =============================================
          <form className="form-inline">
            <div className="dropdown show">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.loadGames}
              >
                {this.state.gameInfo || "Select Your Game"}
              </a>

              <div
                class="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                name={this.state.gameInfo}
                value={this.state.gameId}
              >
                {this.state.games.map(game => (
                  <a
                    className="dropdown-item"
                    key={game._id}
                    value={game._id}
                    onClick={() => {
                      this.setGameInfo(game.gameInfo, game._id);
                    }}
                  >
                    {game.gameInfo}
                  </a>
                ))}
              </div>
            </div>

            <Input
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              placeholder="Username (required)"
            ></Input>

            <Input
              value={this.state.playerEmail}
              onChange={this.handleInputChange}
              name="playerEmail"
              placeholder="Email (required)"
            ></Input>

            <FormBtn
              disabled={!this.state.username || !this.state.gameId}
              onClick={this.handlePlayerSave}
            >
              Submit
            </FormBtn>
            <button onClick={this.toggleLogin}>Login as Admin</button>
          </form>
        ) : (
          //  ============================================ Admin Rendering =============================================
          // create new game
          <form className="form-inline">
            <Input
              value={this.state.newGame}
              onChange={this.handleInputChange}
              name="newGame"
              placeholder="Create New Ex: Cat v. Dog"
            ></Input>

            {/* select existing game */}
            <div className="dropdown show">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.loadGames}
              >
                {this.state.gameInfo || "Select Existing Game"}
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                name={this.state.gameInfo}
                value={this.state.gameId}
              >
                {/* maybe create an option to make your own game in the dropdown? */}
                <a
                  className="dropdown-item"
                  key={"no answer"}
                  onClick={() => {
                    this.setGameInfo("", "");
                  }}
                >
                  {"Select Existing Game"}
                </a>
                {this.state.games.map(game => (
                  <a
                    className="dropdown-item"
                    key={game._id}
                    value={game._id}
                    onClick={() => {
                      this.setGameInfo(game.gameInfo, game._id);
                    }}
                  >
                    {game.gameInfo}
                  </a>
                ))}
              </div>
            </div>
            {/* 
            <input
              type="text"
              list="games"
              value={this.state.gameInfo}
              id={this.state.gameId}
              // onChange={this.handleInputChange}
              onChange={this.handleDropdownInputChange}
              // name="gameInfo"
              name={this.state.gameId}
              placeholder="Type or Select a Game"
              onClick={this.loadGames}
            />
            <datalist
              id="games"
              // onChange={this.change}
              // value={this.state.gameId}
            >
              {this.state.games.map(game => (
                <option
                  class="dropdown-item"
                  key={game._id}
                  id={game._id}
                  value={game.gameInfo}
                  name={game._id}
                  // onClick={() => {
                  // onSelect={() => {
                  // bug-sending the game-_id in the argument does not work, because of the manual input option to create a name
                  // this.setGameId(game._id);
                  // }}
                >
                  {game.gameInfo}
                </option>
              ))}
            </datalist> */}
            <Input
              value={this.state.adminName}
              onChange={this.handleInputChange}
              name="adminName"
              placeholder="Username (required)"
            ></Input>
            <Input
              value={this.state.adminEmail}
              onChange={this.handleInputChange}
              name="adminEmail"
              placeholder="Email (required)"
            ></Input>
            {this.state.emailButton ? (
              <p>
                Forgot your username?{" "}
                <button onClick={this.emailUsername}>Email Login Info</button>
              </p>
            ) : (
              <p></p>
            )}
            <FormBtn
              disabled={
                !this.state.adminName ||
                !this.state.adminEmail ||
                (!this.state.gameInfo && !this.state.newGame)
              }
              onClick={this.handleAdminSave}
            >
              Submit
            </FormBtn>
            <button onClick={this.toggleLogin}>Login as Player</button>
          </form>
        )}
        <InstructionsModal
          show={this.state.introModal}
          page={this.state.page}
          nextOrClose={this.state.nextOrClose}
          onHide={this.introNextorClose}
        />
      </div>
    );
  }
}

export default Login;
