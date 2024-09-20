import React from "react";

export default function TopHeader() {
  return (
    <>
      <div className="header">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <p className="m-0">ToDo Dashboard</p>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </nav>
      </div>
    </>
  );
}
