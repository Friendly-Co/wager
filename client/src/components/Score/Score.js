import React from "react";
import "./style.css";

function Score(props) {
    return(
        <div>
            <div id="scoreBox"> 
            <h3>User:<strong> {props.user} </strong> Score: <strong>{props.score}</strong></h3>
            </div>
        </div>
    );
}

export default Score;