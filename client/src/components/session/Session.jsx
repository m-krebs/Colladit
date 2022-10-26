import React from "react";
import { Outlet } from "react-router-dom";

function Session() {
  return (
      <div className="home">
        <div className="container">
          <h1 className="text-center mt-5">Thank You for using Colladit</h1>
          <Outlet />
        </div>
      </div>
  );
}

export default Session;