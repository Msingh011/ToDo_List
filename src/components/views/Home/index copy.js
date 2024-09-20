import React, { useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";

export default function Home() {
  const [error, setError] = useState({});
  const [tasks, setTasks] = useState([]); // To store tasks

  // Form validation
  const [formState, setFormState] = useState({
    taskTitle: "",
    taskDesc: "",
    taskDate: "",
    taskPriority: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formState?.taskTitle &&
      formState?.taskDesc &&
      formState?.taskDate &&
      formState?.taskPriority
    ) {
      const newTask = {
        taskTitle: formState?.taskTitle,
        taskDesc: formState?.taskDesc,
        taskDate: formState?.taskDate,
        taskPriority: formState?.taskPriority,
      };

      // Save the task in localStorage
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...existingTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Update state
      setTasks(updatedTasks);

      // Clear form after submission
      setFormState({
        taskTitle: "",
        taskDesc: "",
        taskDate: "",
        taskPriority: "",
      });
      setError({});
    } else {
      setError({
        taskTitle: formState?.taskTitle ? "" : "Title is Mandatory",
        taskDesc: formState?.taskDesc ? "" : "Description is Mandatory",
        taskDate: formState?.taskDate ? "" : "Date is Mandatory",
        taskPriority: formState?.taskPriority ? "" : "Priority is Mandatory",
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
                  <form onSubmit={handleSubmit}>
                    <div className="col-sm-12 p-0 mb-3">
                      <label>Title</label>
                      <input
                        type="text"
                        className={
                          error?.taskTitle
                            ? "invalid form-control"
                            : "form-control"
                        }
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
                      <textarea
                        className={
                          error?.taskDesc
                            ? "invalid form-control"
                            : "form-control"
                        }
                        value={formState?.taskDesc}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            taskDesc: e.target?.value,
                          });
                          setError({
                            ...error,
                            taskDesc: e.target?.value
                              ? ""
                              : "Description is Mandatory",
                          });
                        }}
                      />
                      <small className="text-danger">{error?.taskDesc}</small>
                    </div>
                    <div className="col-sm-12 p-0 mb-3">
                      <label htmlFor="exampleFormControlFile1">
                        Task Priority
                      </label>
                      <select
                        className="form-control"
                        value={formState?.taskPriority}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            taskPriority: e.target?.value,
                          });
                          setError({
                            ...error,
                            taskPriority: e.target?.value
                              ? ""
                              : "Priority is Mandatory",
                          });
                        }}
                      >
                        <option value="">Select Priority</option>
                        <option>Low</option>
                        <option>Med</option>
                        <option>High</option>
                      </select>
                      <small className="text-danger">
                        {error?.taskPriority}
                      </small>
                    </div>

                    <div className="col-sm-12 p-0 mb-3">
                      <label className="d-block ">Task End Date</label>
                      <input
                        type="date"
                        className={
                          error?.taskDate
                            ? "invalid form-control"
                            : "form-control"
                        }
                        value={formState?.taskDate}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            taskDate: e.target?.value,
                          });
                          setError({
                            ...error,
                            taskDate: e.target?.value
                              ? ""
                              : "Date is Mandatory",
                          });
                        }}
                      />
                      <small className="text-danger">{error?.taskDate}</small>
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
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/** Modal**/}

          {/** Display task cards */}
          {tasks.map((task, index) => (
            <div key={index} className="todo">
              <div className="risk mb-3  d-flex justify-content-between">
                <span>{task.taskPriority}</span>
                <RxLapTimer />
              </div>
              <div className="todocards mb-3">
                <p className="m-0">{task.taskTitle}</p>
                <p className="m-0">{task.taskDesc}</p>
              </div>
              <div className="assign-area d-flex justify-content-between">
                <p className="m-0">Task End Date: {task.taskDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
