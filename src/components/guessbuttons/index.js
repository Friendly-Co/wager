import React from "react";
import "./style.css";

function GuessButtons(props) {
    return(
        <div>

        <div className="guessButton" onClick={() => {
            // insert onclick functions here 
        }}>
            <button id="runBttn">Run</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here 
            props.buttonTest();
        }}>
            <button id="passBttn">Pass</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here 
            props.buttonTest();
        }}>
            <button id="kickBttn">Kick</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here 
            props.buttonTest();

        }}>
            <button id="turnoverBttn">Turnover</button>
        </div>
        <div className="guessButton" onClick={() => {
            // insert onclick functions here
            props.buttonTest();

        }}>
            <button id="leaderboardBttn">Turnover</button>
        </div>
        </div>
    );
}

export default GuessButtons;