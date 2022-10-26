import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
      <div className="navigation">
        <nav className="">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Colladit
            </NavLink>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/session">
                    New Session
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
  );
}

export default Navigation;