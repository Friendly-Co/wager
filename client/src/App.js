import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLeaderboard from "./pages/AdminLeaderboard";
import Login from "./pages/Login";
import User from "./pages/User/User";
import "./App.css";

function App() {
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

export default App;
