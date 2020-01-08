import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GuessButtons from "../../components/GuessButtons";

class User extends Component {
    state = {
    }

buttonTest = () => {
    console.log("This button clicked");
}

render() {
    return (
        <div>
            <GuessButtons
            buttonTest={this.buttonTest}
            />
        </div>
    )
}

}

export default User;