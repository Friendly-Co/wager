import React from "react";
import "./style.css";

function Score(props) {
  return (
    <div>
      <div id="scoreBox">
        {/* Possible change, esp if componentDidMount loadScores function doesn't fire if props.score.length, render props.score, else, socket or something is down, so pull the score from the database */}
        <h3 className="scoreName" id="scorepage">
          User:<strong> {props.user} </strong> Score:
          <strong>{props.score}</strong>
        </h3>
      </div>
    </div>
  );
}

export default Score;
