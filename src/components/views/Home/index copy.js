import React, { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { message } from "antd";
import moment from "moment";

export default function Home() {
  // Create New Section Code Start
  const sectionLocalStorage = JSON.parse(localStorage.getItem("sections")) || [];
  const [newSection, setNewSection] = useState(sectionLocalStorage);
  const [newSectionError, setNewSectionError] = useState({});
  const [taskFormState, setTaskFormState] = useState({

    
  });
  const [taskError, setTaskError] = useState({});
  
  const [formState, setFormState] = useState({
    sectionTitle: "",
  });

  // Handle Section Creation
  const sectionHandle = (e) => {
    e.preventDefault();
    if (formState?.sectionTitle) {
      const addNewSection = {
        sectionId: newSection.length + 1,
        sectionTitle: formState?.sectionTitle,
        tasks: [], // Initialized empty tasks array for each section
      };
      const updateSection = [...newSection, addNewSection];
      localStorage.setItem("sections", JSON.stringify(updateSection));
      setNewSection(updateSection);
      setFormState({
        sectionTitle: "",
      });
      setNewSectionError({});
    } else {
      setNewSectionError({
        sectionTitle: formState?.sectionTitle ? "" : "Title is Mandatory",
      });
    }
  };

  // Handle Task Creation
  const handleTask = (e, sectionId) => {
    e.preventDefault();
    const allSections = [...newSection];

    // ** Validation for Task Form **
    const isValidTaskForm =
      taskFormState?.taskTitle &&
      taskFormState?.taskDesc &&
      taskFormState?.taskDate &&
      taskFormState?.taskPriority;

    if (!isValidTaskForm) {
      setTaskError({
        taskTitle: taskFormState?.taskTitle ? "" : "Title is Mandatory",
        taskDesc: taskFormState?.taskDesc ? "" : "Description is Mandatory",
        taskDate: taskFormState?.taskDate ? "" : "Date is Mandatory",
        taskPriority: taskFormState?.taskPriority ? "" : "Priority is Mandatory",
      });
      return; // ** Exit if validation fails **
    }

    // Add task to the specific section based on sectionId
    allSections.forEach((item) => {
      if (sectionId === item?.sectionId) {
        const newTask = {
          taskTitle: taskFormState?.taskTitle,
          taskDesc: taskFormState?.taskDesc,
          taskDate: taskFormState?.taskDate,
          taskPriority: taskFormState?.taskPriority,
        };
        item.tasks.push(newTask); // ** Add new task to the correct section **
      }
    });

    // Update localStorage and state
    localStorage.setItem("sections", JSON.stringify(allSections));
    setNewSection(allSections);
    setTaskFormState({
      taskTitle: "",
      taskDesc: "",
      taskDate: "",
      taskPriority: "",
    });
    setTaskError({});
  };

  return (
    <div className="taskcreate p-4">
      <div className="row">
        <div className="col-sm-4">
          <button
            className="addbutton"
            data-toggle="modal"
            data-target="#newsection"
          >
            Add New Section
          </button>
        </div>

        <div
          className="modal fade"
          id="newsection"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="newsection"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Section</h5>
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
                    <label>
                      Section Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={
                        newSectionError?.sectionTitle
                          ? "invalid form-control"
                          : "form-control"
                      }
                      value={formState?.sectionTitle}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          sectionTitle: e.target.value,
                        });
                      }}
                    />
                    <small className="text-danger">
                      {newSectionError?.sectionTitle}
                    </small>
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
                      data-dismiss={formState?.sectionTitle ? "modal" : ""}
                      onClick={sectionHandle}
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {newSection?.map((data, index) => {
          const { sectionId, tasks } = data;
          return (
            <>
              <div className="col-sm-4" key={index}>
                <h5>{data?.sectionTitle}</h5>
                <button
                  className="addbutton"
                  data-toggle="modal"
                  data-target={`#exampleModal${sectionId}`}
                >
                  <FiPlusCircle className="mr-2" /> Add task
                </button>

                {/* Display Task in Card View */}
                <div className="task-list mt-3">
                  {tasks?.length > 0 ? (
                    tasks.map((task, index) => (
                      <div className="todo mb-3" key={index}>
                        <div className="risk mb-3 d-flex justify-content-between">
                          <span
                            className={`bu ${task?.taskPriority?.toLowerCase()}-btn`}
                          >
                            {task?.taskPriority}
                          </span>
                          <RxLapTimer />
                        </div>
                        <div className="todocards mb-3">
                          <p className="m-0">{task?.taskTitle}</p>
                          <p className="m-0">{task?.taskDesc}</p>
                        </div>
                        <div className="assign-area  d-flex justify-content-between">
                          <img src="https://c8.alamy.com/comp/2RCTH5W/img-logo-img-letter-img-letter-logo-design-initials-img-logo-linked-with-circle-and-uppercase-monogram-logo-img-typography-for-technology-busines-2RCTH5W.jpg" />
                          <p className="m-0">
                            Task End Date :{" "}
                            {task?.taskDate
                              ? moment(task.taskDate).format("MM-DD-YYYY")
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No tasks yet</p>
                  )}
                </div>
              </div>

              {/** Add Task Modal **/}
              <div
                className="modal fade"
                id={`exampleModal${sectionId}`}
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
                            className={
                              taskError?.taskTitle
                                ? "invalid form-control"
                                : "form-control"
                            }
                            value={taskFormState?.taskTitle}
                            onChange={(e) => {
                              setTaskFormState({
                                ...taskFormState,
                                taskTitle: e.target?.value,
                              });
                              setTaskError({
                                ...taskError,
                                taskTitle: e.target?.value
                                  ? ""
                                  : "Title is Mandatory",
                              });
                            }}
                          />
                          <small className="text-danger">
                            {taskError?.taskTitle}
                          </small>
                        </div>

                        <div className="col-sm-12 p-0 mb-3">
                          <label>Description</label>
                          <textarea
                            type="text"
                            className={
                              taskError?.taskDesc
                                ? "invalid form-control"
                                : "form-control"
                            }
                            value={taskFormState?.taskDesc}
                            onChange={(e) => {
                              setTaskFormState({
                                ...taskFormState,
                                taskDesc: e.target?.value,
                              });
                              setTaskError({
                                ...taskError,
                                taskDesc: e.target?.value
                                  ? ""
                                  : "Description is Mandatory",
                              });
                            }}
                          />
                          <small className="text-danger">
                            {taskError?.taskDesc}
                          </small>
                        </div>

                        <div className="col-sm-12 p-0 mb-3">
                          <label>Date</label>
                          <input
                            type="date"
                            className={
                              taskError?.taskDate
                                ? "invalid form-control"
                                : "form-control"
                            }
                            value={taskFormState?.taskDate}
                            onChange={(e) => {
                              setTaskFormState({
                                ...taskFormState,
                                taskDate: e.target?.value,
                              });
                              setTaskError({
                                ...taskError,
                                taskDate: e.target?.value
                                  ? ""
                                  : "Date is Mandatory",
                              });
                            }}
                          />
                          <small className="text-danger">
                            {taskError?.taskDate}
                          </small>
                        </div>

                        <div className="col-sm-12 p-0 mb-3">
                          <label>Priority</label>
                          <select
                            className={
                              taskError?.taskPriority
                                ? "invalid form-control"
                                : "form-control"
                            }
                            value={taskFormState?.taskPriority}
                            onChange={(e) => {
                              setTaskFormState({
                                ...taskFormState,
                                taskPriority: e.target?.value,
                              });
                              setTaskError({
                                ...taskError,
                                taskPriority: e.target?.value
                                  ? ""
                                  : "Priority is Mandatory",
                              });
                            }}
                          >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                          <small className="text-danger">
                            {taskError?.taskPriority}
                          </small>
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
                              taskFormState?.taskTitle &&
                              taskFormState?.taskDesc &&
                              taskFormState?.taskDate &&
                              taskFormState?.taskPriority
                                ? "modal"
                                : ""
                            }
                            onClick={(e) => handleTask(e, sectionId)}
                          >
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
