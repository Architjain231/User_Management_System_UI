import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse p-3 mx-5 " id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
             USER MANAGEMENT SYSTEM
            </a>
      
           
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
