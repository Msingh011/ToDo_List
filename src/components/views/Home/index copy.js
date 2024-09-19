import React, { useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";

export default function Home() {
  const [error, setError] = useState({});
  //Form validation
  const [formState, setFormState] = useState({
    taskTitle: "",
    taskDesc: "",
    taskDate: "",
    taskTime: "",
    taskPriority: "",
    taskMedia: "",
  });

  console.log("formState", formState);
  console.log("error", error);
  const handleSubmit = (e) => {
    e.preventDefault();
    const createTaskModal = {
      taskTitle: formState?.taskTitle,
      taskDesc: formState?.taskDesc,
      taskDate: formState?.taskDate,
      taskTime: formState?.taskTime,
      taskPriority: formState?.taskPriority,
      taskMedia: formState?.taskMedia,
    };
    console.log("createTaskModal", createTaskModal);
    localStorage.setItem("CreateTaskModal", createTaskModal);
    if (
      formState?.taskTitle &&
      formState?.taskDesc &&
      formState?.taskDate &&
      formState?.taskTime &&
      formState?.taskPriority &&
      formState?.taskMedia
    ) {
      const createTask = JSON.parse(localStorage.getItem("CreateTaskModal"));
      setFormState(createTask);
      setError({});
    } else {
      setError({
        ...error,
        taskTitle: formState?.taskTitle ? "" : "Title is Mandatory",
        taskDesc: formState?.taskDesc ? "" : "Descripction is Mandatory",
        taskDate: formState?.taskDate ? "" : "Date is Mandatory",
      });
    }
  };

  return (
    <div className="taskcreate p-4">
      <div className="row">
        <div className="col-sm-4">
          <h5>To Do</h5>

          <button
            className="addbutton"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <FiPlusCircle className="mr-2" /> Add task
          </button>

          {/** Modal**/}
          <div
            className="modal fade show d-block"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Task Modal
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body p-3">
                  <form>
                    <div className="col-sm-12 p-0 mb-3">
                      <label>Title</label>
                      <input
                        type="text"
                        className={error?.taskTitle ? "invalid form-control" :"form-control"}
                        value={formState?.taskTitle}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            taskTitle: e.target?.value,
                          });
                          setError({
                            ...error,
                            taskTitle: e.target?.value
                              ? ""
                              : "Title is Mandatory",
                          });
                        }}
                      />
                      <small className="text-danger">{error?.taskTitle}</small>
                    </div>
                    <div className="col-sm-12 p-0 mb-3">
                      <label>Description</label>
                      <textarea className={error?.taskDesc ? "invalid form-control" : "form-control"} 
                      value={formState?.taskDesc}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          taskDesc: e.target?.value
                        })
                        setError({
                          ...error,
                          taskDesc: e.target?.value ? ""  :"Description is Mandatory"
                        })
                      }}/>
                        <small className="text-danger">{error?.taskDesc}</small>
                    </div>
                    <div className="col-sm-12 p-0 mb-3">
                      <label htmlFor="exampleFormControlFile1">
                        Task Priority
                      </label>
                      <select className="form-control">
                        <option>Low</option>
                        <option>Med</option>
                        <option>High</option>
                      </select>
                    </div>

                    <div className="col-sm-12 p-0 mb-3">
                      <label className="d-block ">Task End Date</label>
                      <input type="date" className={error?.taskDate ? "invalid form-control" : "form-control"}
                      value={formState?.taskDate} 
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          taskDate : e.target?.value
                        })
                        setError({
                          ...error,
                          taskDate : e.target?.value ? "" : "Date is Mandatory"
                        })
                      }}/>
                      <small className="text-danger">{error?.taskDesc}</small>
                    </div>

                    <div className="col-sm-12 p-0 mb-3">
                      <label htmlFor="exampleFormControlFile1">
                        Upload Document
                      </label>
                      <input
                        type="file"
                        className="form-control-file form-control"
                        id="exampleFormControlFile1"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/** Modal**/}

          {/**Card Start*/}
          <div className="todo">
            <div className="risk mb-3  d-flex justify-content-between">
              <span>High</span>
              <RxLapTimer />
            </div>
            <div className="todocards mb-3">
              <p className="m-0">Title here....</p>
              <p className="m-0">descripction here....</p>
            </div>
            <div className="assign-area  d-flex justify-content-between">
              <img src="https://c8.alamy.com/comp/2RCTH5W/img-logo-img-letter-img-letter-logo-design-initials-img-logo-linked-with-circle-and-uppercase-monogram-logo-img-typography-for-technology-busines-2RCTH5W.jpg" />
              <p className="m-0">Task End Date : 15-8-2024</p>
            </div>
          </div>
          {/**Card Start*/}
        </div>

        {/*****DOING******/}
        {/* <div className="col-sm-4">
          <h5>Doing</h5>
          <button
            className="addbutton"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <FiPlusCircle className="mr-2" /> Add task
          </button>

      
          <div
            className="modal fade show"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Task Modal
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body p-3">
                  <form>
                    <div className="col-sm-12 p-0 mb-3">
                      <label>Title</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-sm-12 p-0 mb-3">
                      <label>Descripction</label>
                      <textarea className="form-control" />
                    </div>
                    <div className="col-sm-12 p-0 mb-3">
                      <label htmlFor="exampleFormControlFile1">
                        Task Priority
                      </label>
                      <select className="form-control">
                        <option>Low</option>
                        <option>Med</option>
                        <option>High</option>
                      </select>
                    </div>

                    <div className="col-sm-12 p-0 mb-3">
                      <label className="d-block ">Task End Date</label>
                      <input type="date" className="form-control" />
                    </div>

                    <div className="col-sm-12 p-0 mb-3">
                      <label htmlFor="exampleFormControlFile1">
                        Upload Document
                      </label>
                      <input
                        type="file"
                        className="form-control-file form-control"
                        id="exampleFormControlFile1"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
     
          <div className="todo">
            <div className="risk mb-3  d-flex justify-content-between">
              <span>High</span>
              <RxLapTimer />
            </div>
            <div className="todocards mb-3">
              <p className="m-0">Title here....</p>
              <p className="m-0">descripction here....</p>
            </div>
            <div className="assign-area  d-flex justify-content-between">
              <img src="https://c8.alamy.com/comp/2RCTH5W/img-logo-img-letter-img-letter-logo-design-initials-img-logo-linked-with-circle-and-uppercase-monogram-logo-img-typography-for-technology-busines-2RCTH5W.jpg" />
              <p className="m-0">Task End Date : 15-8-2024</p>
            </div>
          </div>
  
        </div> */}
      </div>
    </div>
  );
}
