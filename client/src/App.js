import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminGame from "./pages/AdminGame";
import Login from "./pages/Login";
import User from "./pages/User/User";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={} /> */}
          <Route exact path="/admingame" component={AdminGame} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
