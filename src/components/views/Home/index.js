import React, { useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { message } from "antd";

export default function Home() {
  const saveLocalStorage = JSON.parse(localStorage.getItem("CreateTaskModal")) || [];
  const [error, setError] = useState({});

  const [addTask, setAddTask] = useState(saveLocalStorage);
console.log("Addtask", addTask)

  const [formState, setFormState] = useState({
    taskTitle: "",
    taskDesc: "",
    taskDate: "",
    taskTime: "",
    taskPriority: "",
    taskMedia: [],
  });

  console.log("formState", formState);
  console.log("error", error);

  const handleFileUpload = (index, event) => {
  const files = event.target.files;
  if (files.length && files.length > 1 ) {
    setError({});
    message.error("`Only one file can be uploaded. Allowed file type: .jpg, .png, max size: 10MB.`")
  } 



  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formState?.taskTitle &&
      formState?.taskDesc &&
      formState?.taskDate &&
      formState?.taskPriority &&
      formState?.taskMedia.length > 0
    ) {
      const addModalTask = {
        taskTitle: formState?.taskTitle,
        taskDesc: formState?.taskDesc,
        taskDate: formState?.taskDate,
        taskPriority: formState?.taskPriority,
        taskMedia: formState?.taskMedia,
      };
      const updatedTasks = [...saveLocalStorage, addModalTask];
      localStorage.setItem("CreateTaskModal", JSON.stringify(updatedTasks));
      setAddTask(updatedTasks);
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
        taskDesc: formState?.taskDesc ? "" : "Descripction is Mandatory",
        taskDate: formState?.taskDate ? "" : "Date is Mandatory",
        taskMedia: formState?.taskMedia.length > 0 ? "" : "At least one file is mandatory",
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
            className="modal fade"
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
                      <label>Title <span className="text-danger">*</span></label>
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
                      <label>Description <span className="text-danger">*</span></label>
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
                      <label className="d-block ">Task End Date <span className="text-danger">*</span></label>
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

                    <div className="col-sm-12 p-0 mb-3">
                      <label htmlFor="exampleFormControlFile1">
                        Upload Documents <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        multiple
                        className="form-control-file form-control"
                        id="exampleFormControlFile1"
                     />
                      <small className="text-danger">{error?.taskMedia}</small>
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
                        type="button"
                        className="btn btn-primary"
                        data-dismiss={
                          formState?.taskTitle &&
                          formState?.taskDesc &&
                          formState?.taskDate &&
                          formState?.taskPriority &&
                          formState?.taskMedia 
                            ? "modal"
                            : ""
                        }
                        onClick={handleSubmit}
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

          {/**Card Start*/}
          {addTask.map((task, index) => {
            return (
              <div className="todo mb-3" key={index}>
                <div className="risk mb-3 d-flex justify-content-between">
                  <span className={`bu ${task?.taskPriority.toLowerCase()}-btn`}>{task?.taskPriority}</span>
                  <RxLapTimer />
                </div>
                <div className="todocards mb-3">
                  <p className="m-0">{task?.taskTitle}</p>
                  <p className="m-0">{task?.taskDesc}</p>
                </div>
                <div className="assign-area  d-flex justify-content-between">
                  <img src="https://c8.alamy.com/comp/2RCTH5W/img-logo-img-letter-img-letter-logo-design-initials-img-logo-linked-with-circle-and-uppercase-monogram-logo-img-typography-for-technology-busines-2RCTH5W.jpg" />
                  <p className="m-0">Task End Date : {task?.taskDate}</p>
                </div>
              </div>
            );
          })}

          {/**Card Start*/}
        </div>
      </div>
    </div>
  );
}
