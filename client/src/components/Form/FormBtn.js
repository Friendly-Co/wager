import React from "react";
import "./Form.css";

export function FormBtn(props) {
  return (
    <button
      {...props}
      type="submit"
      className="btn btn-success search-button mb-2"
    >
      {props.children}
    </button>
  );
}
