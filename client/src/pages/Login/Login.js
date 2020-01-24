import React, { Component } from "react";
import API from "../../utils/API";
import AdminAPI from "../../utils/AdminAPI";
import { FormBtn, Input } from "../../components/Form";
import Logo from "../../components/Logo";
import InstructionsModal from "../../components/instructionsModal";

let count = 1;

class Login extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    message: "",
    adminLoginBoolean: false,
    adminEmail: "",
    adminName: "",
    emailButton: false,
    //all games pulled from the database (array of objects):
    games: [],
    // ex: Bears v. Packers, entered by admin:
    gameInfo: "",
    // Unique id of game from dropdown selection:
    gameId: "",
    introModal: false,
    page: 1,
    nextOrClose: "Next"
  };

  componentDidMount() {
    this.setState({ introModal: true });
    // this.loadScores();
    // console.log(this.state.games);
  }

  loadScores = () => {
    console.log("button clicked");
    API.getScores().then(res => {
      this.setState({ games: res.data });
      console.log(this.state.games);
    });
  };

  //handles form input change for all admin game dropdown
  handleDropdownInputChange = event => {
    this.setState({
      ...this.state,
      gameInfo: event.target.value,
      gameId: event.target.name
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

  setGameInfo = (name, id) => {
    console.log("dropdown clicked");
    this.setState({ gameInfo: name });
    //If there is an id, this was selected by a player
    if (id) {
      this.setState({ gameId: id });
      console.log(this.state.gameInfo);
      console.log(this.state.gameId);
    }
    // else {
    //   const toFind = {};
    //   API.getScores().then(res => {});
    // }
  };

  // change = event => {
  //   this.setState({ gameId: event.target.value });
  // };

  //search the database for any matching usernames.
  //If matching, alert the user to change their name
  handleSave = event => {
    event.preventDefault();
    //verify unique username
    if (this.state.username && this.state.gameId) {
      API.getScores()
        .then(res => {
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            //needs to be just for his game though...
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
          //handle save
          var toSave = {
            playerName: this.state.username,
            _id: this.state.gameId
          };
          API.saveScore(toSave).then(
            this.setState({
              message: alert(
                "Your username has been saved! Click OK to redirect to your game page."
              )
            })
          );
          window.location =
            "/game/" + this.state.gameId + "/user/" + this.state.username;
        })
        .catch(err => console.log(err));
    }
  };

  //======================Admin Function ====================================

  handleAdminSave = event => {
    event.preventDefault();

    //need to add:
    //if this.state.gameInfo this is a new game to save. Accept all fields and save

    // if this.state.gameId && !this.state.gameInfo, this is a previously created game. Go to the page after checking admin credentials.

    //verify unique username
    if (this.state.adminName && this.state.adminEmail && this.state.gameInfo) {
      console.log("this.state.adminName: ");
      console.log(this.state.adminName);
      AdminAPI.getAllAdmin()
        .then(res => {
          console.log(res.data);
          //if there is an admin already in the system, they were logged out
          // make sure their email and name match the database
          //then log them back in
          if (res.data.length) {
            for (let i = 0; i < res.data.length; i++) {
              // if (
              //   this.state.adminName !== res.data[0].adminName &&
              //   this.state.adminEmail !== res.data[0].adminEmail
              // ) {
              //   this.setState({
              //     message: alert(
              //       "This username and email do not match our database. Please try again"
              //     )
              //   });
              //   //email username option...add button to email
              //   return false;
              // }

              //consider saving the admin info in a separate collection, querying the collection, then adding that info (gameInfo and _id) to the corresponding game
              if (
                this.state.adminEmail === res.data[i].adminEmail &&
                //but the id may not be present if they choose their own- use caution with this.state.gameId in the admin side
                this.state.gameId === res.data[i]._id &&
                this.state.adminName !== res.data[i].adminName
              ) {
                this.setState({
                  message: alert(
                    'This username does not match our database for this game. Please try again. If you would like an email reminder of your username, click "Email Login Info"'
                  )
                });
                //email username option...add button to email
                this.setState({ emailButton: true });
                return false;
              }
              if (
                this.state.adminName === res.data[i].adminName &&
                this.state.gameId === res.data[i]._id &&
                this.state.adminEmail !== res.data[i].adminEmail
              ) {
                this.setState({
                  message: alert(
                    "This email does not match the admin name in our database for this game. Please try again"
                  )
                });
                //change email option?
                return false;
              }

              // if already in the database and their input matches, load the admin page
              //either save a new game instance or log back in to see the old game stats
              else if (
                this.state.adminName === res.data[i].adminName &&
                this.state.adminEmail === res.data[i].adminEmail &&
                this.state.gameId === res.data[i]._id
              ) {
                window.location =
                  "/admingame/" +
                  res.data._id +
                  "/admin/" +
                  this.state.adminName;
              }
              //if a new game is being created (there wouldn't be a game id!!)
              // else if (
              //   // this.state.adminName === res.data[i].adminName &&
              //   // this.state.adminEmail === res.data[i].adminEmail &&
              //   this.state.gameId !== res.data[i]._id
              // ) {
              //   var toSave = {
              //     adminName: this.state.adminName,
              //     adminEmail: this.state.adminEmail,
              //     gameInfo: this.state.gameInfo
              //   };
              //   AdminAPI.saveAdmin(toSave).then(res => {
              //     console.log(
              //       "this is the response we got back after saving your login: "
              //     );
              //     console.log(res.data);
              //     this.setState({
              //       message: alert("Your username and email have been saved")
              //     });

              //     window.location =
              //       "/admingame/" +
              //       res.data._id +
              //       "/admin/" +
              //       this.state.adminName;
              //   });
            }
          }
          // if no games are in the database, save info and log in
          // if (!res.data.length) {
          console.log("circumventing the if statements because there is no id");
          console.log("this.state.adminName");
          console.log(this.state.adminName);
          console.log("this.state.adminEmail");
          console.log(this.state.adminEmail);
          console.log("this.state.gameInfo");
          console.log(this.state.gameInfo);
          console.log("this.state.gameId");
          console.log(this.state.gameId);
          var toSave = {
            adminName: this.state.adminName,
            adminEmail: this.state.adminEmail,
            gameInfo: this.state.gameInfo
          };
          AdminAPI.saveAdmin(toSave).then(res => {
            console.log(
              "this is the response we got back after saving your login: "
            );
            console.log(res.data);
            this.setState({
              message: alert(
                `A new ${this.state.gameInfo} game has been created with the username ${this.state.adminName} and associated email ${this.state.adminEmail}.`
              )
            });

            window.location =
              "/admingame/" + res.data._id + "/admin/" + this.state.adminName;
          });
          // }
          // }
        })
        .catch(err => console.log(err));
    }
  };

  //need tp verify that this.state.gameId does not have a bug- ex: selecting from dropdown, then typing a new
  emailUsername = event => {
    event.preventDefault();
    // AdminAPI.getAllAdmin().then(res => {
    const toUse = this.state.gameId;
    AdminAPI.getAdminInfo(toUse).then(res => {
      console.log(res.data);
      const toSend = {
        adminName: res.data[0].adminName,
        adminEmail: res.data[0].adminEmail
      };
      AdminAPI.sendEmail(toSend).then(res => console.log(res));
    });
  };

  //boolean to control rendering for login as admin and login as user
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
                onClick={this.loadScores}
              >
                {/* {this.state.gameName || "Select Your Session"} */}
                {this.state.gameInfo || "Select Your Game"}
              </a>

              <div
                class="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                // name={this.state.gameName}
                name={this.state.gameInfo}
                value={this.state.gameId}
                // onChange={this.handleChange}
              >
                {this.state.games.map(game => (
                  <a
                    className="dropdown-item"
                    key={game._id}
                    // name={game.gameInfo}
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
            <FormBtn
              disabled={!this.state.username || !this.state.gameId}
              onClick={this.handleSave}
            >
              Submit
            </FormBtn>
            <button onClick={this.toggleLogin}>Login as Admin</button>
          </form>
        ) : (
          <form className="form-inline">
            {/* <Input
              value={this.state.gameInfo}
              onChange={this.handleInputChange}
              name="gameInfo"
              placeholder="Create New Ex: Cat v. Dog"
            ></Input> */}

            {/* <div className="dropdown show">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.loadScores}
              >
                {this.state.gameInfo || "Select a Game"}
              </a> */}

            {/* <div
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
            </div> */}

            <input
              type="text"
              list="games"
              value={this.state.gameInfo}
              // onChange={this.handleInputChange}
              onChange={this.handleDropdownInputChange}
              // name="gameInfo"
              name={this.state.gameId}
              placeholder="Type or Select a Game"
              onClick={this.loadScores}
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
                  name={game.gameInfo}
                  value={game._id}
                  // onClick={() => {
                  // onSelect={() => {
                  // bug-sending the game-_id in the argument does not work, because of the manual input option to create a name
                  //   this.setGameInfo(game.gameInfo, game._id);
                  // }}
                >
                  {game.gameInfo}
                </option>
              ))}
            </datalist>
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
                <button
                  onClick={() => {
                    this.emailUsername(
                      this.state.gameId,
                      this.state.adminEmail
                    );
                  }}
                >
                  Email Login Info
                </button>
              </p>
            ) : (
              <p></p>
            )}
            <FormBtn
              disabled={
                !this.state.adminName ||
                !this.state.adminEmail ||
                !this.state.gameInfo
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
