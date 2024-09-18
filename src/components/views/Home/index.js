import React from "react";
import TopHeader from "../../TopHeader";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";

export default function Home() {
  return (
    <div className="taskcreate p-4">
      <div className="row">
        <div className="col-sm-4">
          <h5>To Do</h5>

          <button className="addbutton">
            <FiPlusCircle className="mr-2"/> Add task{" "}
          </button>
          {/**Card Start*/}
          <div className="todo">
            <div className="risk mb-3">
              <span>High</span>
            </div>
            <div className="todocards d-flex justify-content-between mb-3">
              <RxLapTimer fontSize={15} />
              <p className="m-0">descripction here....</p>
            </div>
            <div className="assign-area  d-flex justify-content-between">
              <img src="https://c8.alamy.com/comp/2RCTH5W/img-logo-img-letter-img-letter-logo-design-initials-img-logo-linked-with-circle-and-uppercase-monogram-logo-img-typography-for-technology-busines-2RCTH5W.jpg" />
              <p className="m-0">Last Date : 15-8-2024</p>
            </div>
          </div>
          {/**Card Start*/}
        </div>
      </div>
    </div>
  );
}
