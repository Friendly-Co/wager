import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLeaderboard from "./pages/AdminLeaderboard";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={} /> */}
          <Route exact path="/adminleaderboard" component={AdminLeaderboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
