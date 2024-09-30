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
  const [taskError, setTaskError] = useState({});
  const [taskFormState, setTaskFormState] = useState({
    taskTitle: "",
    taskDesc: "",
    taskDate: "",
    taskPriority: "",
    taskMedia: [],
  });

  //begin::Create New Section Code End
  const [formState, setFormState] = useState({
    sectionTitle: "",
  });
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Converts file to Base64 format
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
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
  //end::Create New Section Code End

  //begin::Handle for Create New Add Task End
  const handleTask = (e, sectionId) => {
    e.preventDefault();
    const allSections = [...newSection];
    allSections &&
      allSections.map(async (item) => {
        if (sectionId === item?.sectionId) {
          if (
            taskFormState?.taskTitle &&
            taskFormState?.taskDesc &&
            taskFormState?.taskDate &&
            taskFormState?.taskPriority &&
            taskFormState?.taskMedia.length > 0
          ) {
            console.log("Task Media:", taskFormState?.taskMedia);
            // Add a unique task ID using Date.now()
            const newTask = {
              taskId: Date.now(), // Generate a unique ID for each task
              taskTitle: taskFormState?.taskTitle,
              taskDesc: taskFormState?.taskDesc,
              taskDate: taskFormState?.taskDate,
              taskPriority: taskFormState?.taskPriority,
              taskMedia: await Promise.all(
                Array.from(taskFormState?.taskMedia).map(
                  async (file) => await fileToBase64(file)
                )
              ),
            };
            const updateTask = [...(item.tasks || []), newTask]; // Get existing tasks for this section or an empty array
            item.tasks = updateTask;

            localStorage.setItem("sections", JSON.stringify(allSections));
            setNewSection(allSections);
            setTaskError({});
            setTaskFormState({
              taskTitle: "",
              taskDesc: "",
              taskDate: "",
              taskPriority: "",
              taskMedia: [],
            });
          } else {
            setTaskError({
              taskTitle: taskFormState?.taskTitle ? "" : "Title is Mandatory",
              taskDesc: taskFormState?.taskDesc
                ? ""
                : "Description is Mandatory",
              taskDate: taskFormState?.taskDate ? "" : "Date is Mandatory",
              taskMedia:
                taskFormState?.taskMedia.length > 0
                  ? ""
                  : "Atleas one Media is Mandatory",
            });
          }
        }
      });
  };

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
            const { sectionId, tasks, taskId } = data;
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
                        <>
                          <div
                            className="todo mb-3"
                            key={index}
                            data-toggle="modal"
                            data-target={`#fullCardDetails${task?.taskId}`}
                          >
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
                              {task?.taskMedia?.map((imageSrc, idx) => {
                                console.log("imageSrc", task?.taskMedia);
                                return (
                                  <img
                                    key={idx}
                                    src={imageSrc}
                                    alt={`task-media-${idx}`}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      marginRight: "10px",
                                    }}
                                  />
                                );
                              })}
                              <p className="m-0">
                                Task End Date :{" "}
                                {task?.taskDate
                                  ? moment(task.taskDate).format("MM-DD-YYYY")
                                  : "N/A"}
                              </p>
                            </div>
                          </div>

                          {/* Edit card view Start*/}
                          <div
                            className="modal fade"
                            id={`fullCardDetails${task?.taskId}`}
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="fullCardDetails"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-xl"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Card Details</h5>
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
Des
                                    </div>
                                  </form>

                                  <p className="m-0">{task?.taskDesc}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Edit card view End*/}
                        </>
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
                              value={taskFormState?.taskPriority}
                              onChange={(e) => {
                                setTaskFormState({
                                  ...taskFormState,
                                  taskPriority: e.target?.value,
                                });
                              }}
                            >
                              <option value="">Select Priority</option>
                              <option>Low</option>
                              <option>Med</option>
                              <option>High</option>
                            </select>
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
                            <label className="d-block">Upload Doc</label>
                            <input
                              type="file"
                              accept=".png, .jpg, .jpeg, .pdf, .docx, .doc"
                              multiple
                              className={
                                taskError?.taskMedia
                                  ? "invalid form-control"
                                  : "form-control"
                              }
                              onChange={(e) => {
                                setTaskFormState({
                                  ...taskFormState,
                                  taskMedia: e.target?.files,
                                });
                                setTaskError({
                                  ...taskError,
                                  taskMedia: "",
                                });
                              }}
                            />
                            <small className="text-danger">
                              {taskError?.taskMedia}
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
                              type="submit"
                              className="btn btn-primary"
                              data-dismiss={
                                taskFormState?.taskTitle &&
                                taskFormState?.taskDate &&
                                taskFormState?.taskDesc &&
                                taskFormState?.taskPriority &&
                                taskFormState?.taskMedia.length > 0
                                  ? "modal"
                                  : ""
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
