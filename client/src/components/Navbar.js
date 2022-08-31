import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <nav class="navbar">
      <div class="logo">MUO</div>
      <ul class="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label for="checkbox_toggle" class="hamburger">&#9776;</label>
        <div class="menu">
          <li type="none"><NavLink to="/">Home</NavLink></li>
          <li type="none"><NavLink to="/login">login</NavLink></li>
          <li type="none"><NavLink to="/signup">Register</NavLink></li>
          <li type="none"><NavLink to="/admin">Admin</NavLink></li>
        </div>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;
