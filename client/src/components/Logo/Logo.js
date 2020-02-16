import React from "react";
import "./style.css";
import photo from "../../img/80sStyle.png";

function Logo() {
    return(
        <div className="alignimg">
            <img src={photo} alt="Logo"></img>
        </div>
    );
}

export default Logo;