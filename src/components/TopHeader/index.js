import React from "react";

export default function TopHeader() {
  return (
    <>
      <div className="header">
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand">Hello</a>
            <form class="d-flex">
              <input
                class="form-control me-2"
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
