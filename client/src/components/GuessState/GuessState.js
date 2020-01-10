import React from "react";
import "./style.css";

function GuessState(props) {
    return(
        <div>
            <h1>{props.guess}</h1>
            <div id="underline"></div>
        </div>
    );
}

export default GuessState;