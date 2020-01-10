import React from "react";
import "./style.css";

function GuessButtons(props) {
    return(
        <div>

        <div className="guessButton" onClick={() => {
            props.guessUpdate("RUN");
        }}>
            <button value="RUN" id="runBttn">Run</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here 
            props.guessUpdate("PASS");
        }}>
            <button value="PASS" id="passBttn">Pass</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here 
            props.guessUpdate("KICK");
        }}>
            <button value="KICK" id="kickBttn">Kick</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here
            props.guessUpdate("TURNOVER");

        }}>
            <button value="TURNOVER" id="turnoverBttn">Turnover</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here
            

        }}>
            <button id="leaderboardBttn">Leaderboard</button>
        </div>
        </div>
    );
}

export default GuessButtons;