import React from 'react';
import {NavLink} from 'react-router-dom';
import '../style/navigation.css';

function Navigation() {
  return (
      <div className="navigation">
        <NavLink className="navbar-title" to="/">Home</NavLink>
        <div className="nav-right">
          <NavLink to="/session">Editor</NavLink>
        </div>
      </div>
  );
}

export default Navigation;