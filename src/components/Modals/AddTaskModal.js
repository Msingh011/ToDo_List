import React, { useState, useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddTaskModal({ sectionId, onFilteredData }) {
  const sectionLocalStorage =
    JSON.parse(localStorage.getItem("sections")) || [];
  const [newSection, setNewSection] = useState(sectionLocalStorage);
  const [taskError, setTaskError] = useState({});
  const [content, setContent] = useState("");
  const [taskFormState, setTaskFormState] = useState({
    taskTitle: "",
    taskDesc: "",
    taskDate: "",
    taskPriority: "Low",
    taskMedia: [],
  });

  // Ref to handle the file input
  const fileInputRef = useRef(null);

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Converts file to Base64 format
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  //Handle for Create New Add Task End
  const handleTask = (e, sectionId) => {
    e.preventDefault();
    setContent("");
    const allSections = [...newSection];
    allSections &&
      allSections.map(async (item) => {
        if (sectionId === item?.sectionId) {
          if (
            taskFormState?.taskTitle &&
            taskFormState?.taskDesc &&
            taskFormState?.taskDate &&
            taskFormState?.taskMedia.length > 0
          ) {
            //console.log("Task Media:", taskFormState?.taskMedia);
            console.log("Task taskDesc:", taskFormState?.taskDesc);
          
            const newTask = {
              taskId: Date.now(),
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
            const updateTask = [...(item.tasks || []), newTask];
            item.tasks = updateTask;

            localStorage.setItem("sections", JSON.stringify(allSections));

            // Call the callback function to pass filtered data
            if (onFilteredData) {
              onFilteredData(allSections);
            }
            console.log("all", allSections);

            setTaskError({});
            setTaskFormState({
              taskTitle: "",
              taskDesc: "",
              taskDate: "",
              taskPriority: "",
              taskMedia: [],
            });
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            }
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
                  : "At least one Media is Mandatory",
            });
          }
        }
      });
  };

  //Editor

  const handleEditorChange = (value) => {
    setTaskFormState({
      ...taskFormState,
      taskDesc: value,
    });
    setTaskError({
      ...taskError,
      taskDesc: value ? "" : "Description is Mandatory",
    });
    setContent(value);
    console.log("content", content);
  };

  return (
    <>
      <div
        className="modal fade"
        id={`exampleModal${sectionId}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-center" role="document">
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
                <div className="row">
                  <div className="col-sm-6  mb-3">
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

                  <div className="col-sm-6  mb-3">
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

                  <div className="col-sm-6  mb-3">
                    <label className="d-block ">Task End Date</label>
                    <input
                      type="date"
                      className={
                        taskError?.taskDate
                          ? "invalid form-control"
                          : "form-control"
                      }
                      min={new Date().toISOString().split("T")[0]} // Disable past
                      value={taskFormState?.taskDate}
                      onChange={(e) => {
                        setTaskFormState({
                          ...taskFormState,
                          taskDate: e.target?.value,
                        });
                        setTaskError({
                          ...taskError,
                          taskDate: e.target?.value ? "" : "Date is Mandatory",
                        });
                      }}
                    />
                    <small className="text-danger">{taskError?.taskDate}</small>
                  </div>

                  <div className="col-sm-6  mb-3">
                    <label className="d-block">Upload Doc</label>
                    <input
                      type="file"
                      ref={fileInputRef}
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

                  <div className="col-sm-12 mb-3">
                    <label>Description</label>
                    <ReactQuill                 
                      value={content}
                      onChange={handleEditorChange}
                    />
                    <small className="text-danger">{taskError?.taskDesc}</small>
                  </div>
                  {/* <div className="col-sm-12" dangerouslySetInnerHTML={{ __html: content }} /> */}
                </div>
                <div className="modal-footer col-sm-12">
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
    </>
  );
}
