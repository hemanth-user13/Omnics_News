import React from "react";
import { Link } from "react-router-dom";

function Header({ username }) {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ color: "rgb(41, 144, 240)" }}
          >
            Omnics News
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/headlines">
                Recent Post
              </Link>
              <Link className="nav-link" to="/pagination">
                Pagination
              </Link>
              <Link className="nav-link" to="/postaldata">
                Postal Data
              </Link>
              <Link className="nav-link" to="/testing">
                Covid Data
              </Link>

              <Link className="nav-link" to="./task1">
                Task-1
              </Link>
              {/* <Link className="nav-link" to="./Login">
                Login
              </Link> */}
              <span className="navbar-text ml-auto" style={{ color: "white" }}>
                Hi, {username}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
