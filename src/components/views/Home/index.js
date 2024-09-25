import React, { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { message } from "antd";
import moment from "moment";

export default function Home() {
  //Create New Section Code Start
  const sectionLocalStorage =
    JSON.parse(localStorage.getItem("sections")) || [];

  const [newSection, setNewSection] = useState(sectionLocalStorage);

  const [newSectionError, setNewSectionError] = useState({});

  const [taskFormState, setTaskFormState] = useState({
    taskTitle: "",
    taskDesc: "",
    taskDate: "",
    taskPriority: "",
  });
  const [taskError, setTaskError] = useState({});

  console.log("sections", newSection);

  //AddTask Const

  const [formState, setFormState] = useState({
    sectionTitle: "",
  });

  const sectionHandle = (e) => {
    e.preventDefault();
    if (formState?.sectionTitle) {
      const addNewSection = {
        sectionId: newSection.length + 1,
        sectionTitle: formState?.sectionTitle,
        tasks: [],
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

  //Create New Section Code End

  const [addTask, setAddTask] = useState([]);

  //Create New task Code Start

  const handleTask = (e, sectionId) => {
    e.preventDefault();
    const allSections = [...newSection];

    allSections &&
      allSections.map((item, index) => {
        console.log(sectionId, " === ", item?.sectionId);
        if (sectionId === item?.sectionId) {
          const newTask = {
            taskTitle: taskFormState?.taskTitle,
            taskDesc: taskFormState?.taskDesc,
            taskDate: taskFormState?.taskDate,
            taskPriority: taskFormState?.taskPriority,
            //taskMedia : [],
          };
          const updateTask = [...addTask, newTask];
          setAddTask(updateTask);
          item.tasks = updateTask;
          setTaskFormState({
            taskTitle: "",
            taskDesc: "",
            taskDate: "",
            taskPriority: "",
          });
          localStorage.setItem("sections", JSON.stringify(allSections));
          setNewSection(allSections);
          console.log("addtask", newSection);
          setTaskError({});
        } else {
          setTaskError({
            taskTitle: taskFormState?.taskTitle ? "" : "Title is Mandatory",
            taskDesc: taskFormState?.taskDesc ? "" : "Description is Mandatory",
            taskDate: taskFormState?.taskDate ? "" : "Date is Mandatory",
            taskPriority: taskFormState?.taskPriority
              ? ""
              : "Priority is Mandatory",
          });
        }
      });
  };

  // // Set state of pictures
  // const [pictures, setPictures] = useState([
  //   {
  //     data: [],
  //     url: "",
  //   },
  // ]);

  // // Function to display pictures
  // const handleImageUpload = (e) => {
  //   const tempArr = [];
  //   [...e.target.files].forEach((file) => {
  //     tempArr.push({
  //       data: file,
  //       url: URL.createObjectURL(file),
  //     });
  //   });
  //   setPictures(tempArr);
  // };

  //Create New task Code End

  return (
    <div className="taskcreate p-4">
      <div className="row">
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

        {newSection &&
          newSection?.map((data, index) => {
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
                {/**Add Task Modal**/}
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
                            <label htmlFor="exampleFormControlFile1">
                              Task Priority
                            </label>
                            <select
                              className="form-control"
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
                              <option>Low</option>
                              <option>Med</option>
                              <option>High</option>
                            </select>
                            <small className="text-danger">
                              {taskError?.taskPriority}
                            </small>
                          </div>

                          <div className="col-sm-12 p-0 mb-3">
                            <label className="d-block ">Task End Date</label>
                            <input
                              type="date"
                              className={
                                taskError?.taskDate
                                  ? "invalid form-control"
                                  : "form-control"
                              }
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
                            <small className="text-danger">{taskError?.taskDate}</small>
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
                              data-dismiss={
                                taskFormState?.taskTitle &&
                                taskFormState?.taskDate &&
                                taskFormState?.taskDesc &&
                                taskFormState?.taskPriority ? "modal" : ""
                              }
                              onClick={(e) => {
                                handleTask(e, sectionId);
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/** Add Task Modal**/}
              </>
            );
          })}

        <div className="col-sm-4">
          <h5>Create Section</h5>
          <button
            className="addbutton"
            data-toggle="modal"
            data-target="#newsection"
          >
            <FiPlusCircle className="mr-2" /> Create New Section
          </button>
        </div>
      </div>
    </div>
  );
}
