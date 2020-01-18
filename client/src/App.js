import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminGame from "./pages/AdminGame";
import Login from "./pages/Login";
import User from "./pages/User/User";
// import Chat from "./components/Chat";
import "./App.css";
import { connect } from "./api/api.js";

class App extends Component {
  constructor(props) {
    super(props);
    // call our connect function and define
    // an anonymous callback function that
    // simply console.log's the received
    // message
    connect(message => {
      console.log(message);
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/admingame/admin/:adminName"
              component={AdminGame}
            />
            <Route exact path="/user/:username" component={User} />
          </Switch>
        </Router>
        {/* <div>
          <Chat/>
        </div> */}
      </div>
    );
  }
}

export default App;
