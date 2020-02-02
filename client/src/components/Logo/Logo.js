import React from "react";
import "./style.css";
import photo from "../../img/NewFWlogo02.png";

function Logo() {
    return(
        <div className="alignimg">
            <img src={photo} alt="Logo"></img>
        </div>
    );
}

export default Logo;