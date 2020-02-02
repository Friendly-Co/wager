import React from "react";
import "./Form.css";

export function FormBtn(props) {
  return (
    <button
      {...props}
      type="submit"
      className="btn-1 squishy guessButton"
    ><span>
      {props.children}
      </span>
    </button>
  );
}
