import React from "react";
import "./List.css";

export function List({ children }) {
  return (
    <div className="container">
      <div className="list-group">{children}</div>
    </div>
  );
}
