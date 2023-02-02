import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          padding: "0.5",
          backgroundColor: "MediumSeaGreen",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{
              marginTop: "1rem",
              marginLeft: "1rem",
              color: "white",
              fontFamily: "Georgia",
            }}
          >
            MOVIES
          </h1>
        </Link>
        <Link to="/favourites" style={{ textDecoration: "none" }}>
          <h1
            style={{
              marginLeft: "5rem",
              marginTop: "1rem",
              color: "white",
              fontFamily: "Times New Roman",
            }}
          >
            FAVOURITE
          </h1>
        </Link>
      </div>
    );
  }
}
