import React from "react";
import "./style.css";

function GuessState(props) {

    var userGuess = () => {
        if (props.guess === "PASS" || "KICK" || "RUN" || "TURNOVER") {
            return (props.guess)
        } else {
            return ("* * *");
        }
    };

    return(
        <div>
            <h1 className='guessWindow'> * {userGuess()} *</h1>
            <div id="underline"></div>
        </div>
    );
}

export default GuessState;