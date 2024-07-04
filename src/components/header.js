import React, { Component } from "react";
import { Link } from "react-router-dom";
import useLogout from "./logout";
import "../css/header.css";

class Header extends Component {
  render() {
    return (
      <>
        <div className="header-container">
          <div className="header-content container">
            <img src={require("../images.png")} alt="Logo" className="logo" />{" "}
            {/* Update the src path to your logo image */}
            <h1 className="site-title">E-Commerce Website</h1>
          </div>
        </div>
        <div className="nav-container container">
          <Link className="nav-link" to="/home">
            Home
          </Link>
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
          <Link className="nav-link" to="/address">
            Address
          </Link>
          <Link className="nav-link" to="/orderHistory">
            Your Orders
          </Link>
          <button className="nav-link" onClick={useLogout}>
            Logout
          </button>
        </div>
      </>
    );
  }
}

export default Header;
