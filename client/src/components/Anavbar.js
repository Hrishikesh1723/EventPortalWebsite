import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

const Anavbar = () => {
  return (
    <>
    <nav class="navbar">
      <div class="logo">MUO</div>
      <ul class="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label for="checkbox_toggle" class="hamburger">&#9776;</label>
        <div class="menu">
          <li type="none"><NavLink to="/adminhome">Home</NavLink></li>
          <li type="none"><NavLink to="/aevents">Events</NavLink></li>
          <li type="none"><NavLink to="/addevent">AddEvent</NavLink></li>
          <li type="none"><NavLink to="/addadmin">New Admin</NavLink></li>
          <li type="none"><NavLink to="/logout">logout</NavLink></li>
        </div>
      </ul>
    </nav>
    </>
  )
}

export default Anavbar