import React from "react";
import "./style.css";
import photo from "../../friendlybanner.png";

function Logo() {
    return(
        <div>
            <img src={photo} alt="Logo"></img>
        </div>
    );
}

export default Logo;