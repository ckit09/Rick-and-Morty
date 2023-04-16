import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Rick and Morty</h1>
      <div className="contactWrapper">
          <h3 className="contactTitle">Home Page</h3>
      </div>
      <Link to="/contact">
        <div className="contactWrapper">
          <h3 className="contactTitle">Single Query Page</h3>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
