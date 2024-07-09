import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

class Header extends Component {
  render() {
    return (
      <>
        <header className="header-container">
          <div className="header-content">
            <img src={require("../images.png")} alt="Logo" className="logo" />
            <h1 className="site-title">E-Commerce Website</h1>
            <nav className="nav-container">
              <Link className="nav-link" to="/home">Home</Link>
              <Link className="nav-link" to="/cart">Cart</Link>
              <Link className="nav-link" to="/address">Address</Link>
              <Link className="nav-link" to="/orderHistory">Your Orders</Link>
            </nav>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
