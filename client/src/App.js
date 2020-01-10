import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLeaderboard from "./pages/AdminGame";
import Login from "./pages/Login";
import User from "./pages/User/User";
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
    })
  }

render(){
  return (
      <div>
        <Router>
          <Switch>
            {/* <Route exact path="/" component={} /> */}
            <Route exact path="/adminleaderboard" component={AdminLeaderboard} />
            <Route exact path="/user" component={User} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
