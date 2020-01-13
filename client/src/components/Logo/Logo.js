import React from "react";
import "./style.css";
import photo from "../../img/FWlogo@2x.png";

function Logo() {
    return(
        <div>
            <img src={photo} alt="Logo"></img>
        </div>
    );
}

export default Logo;