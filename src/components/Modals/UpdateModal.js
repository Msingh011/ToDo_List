import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill";

export default function EditModal(props) {
  const { task, onFilteredData, sectionId } = props;

  const sectionLocalStorage =
    JSON.parse(localStorage.getItem("sections")) || [];
  const [newSection, setNewSection] = useState(sectionLocalStorage);
  const [newSectionError, setNewSectionError] = useState({});
  const [taskError, setTaskError] = useState({});
  const [content, setContent] = useState("");
  const [taskFormState, setTaskFormState] = useState({
    taskTitle: task?.taskTitle,
    taskDesc: task?.taskDesc,
    taskDate: task?.taskDate,
    taskPriority: task?.taskPriority,
    taskStatus: task?.taskStatus,
    // taskMedia: [],
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

    const allSections = [...newSection];

    const updatedSections =
      allSections &&
      allSections.map((item) => {
        console.log("item", item);
        if (sectionId === item?.sectionId) {
          item.tasks &&
            item.tasks.map((subItems) => {
              if (subItems.taskId === task.taskId) {
                subItems.taskTitle = taskFormState?.taskTitle ||  subItems.taskTitle;
                subItems.taskPriority = taskFormState?.taskPriority || subItems.taskPriority;
                subItems.taskStatus = taskFormState?.taskStatus || subItems.taskStatus;
                subItems.taskDate = taskFormState?.taskDate || subItems.taskDate;
                subItems.taskDesc = taskFormState?.taskDesc || subItems.taskDesc;
              }
            });
        }
        return item;
      });
    console.log("updatedSections", updatedSections);

    localStorage.setItem("sections", JSON.stringify(updatedSections));
    // Call the callback function to pass filtered data
    if (onFilteredData) {
      onFilteredData(updatedSections);
    }
  };

  return (
    <>
      {/* Edit card view Start*/}
      <div
        className="modal fade"
        id={`fullCardDetails${task?.taskId}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fullCardDetails"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Task Details {task?.taskId}</h5>
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
              <form method="POST">
                <div className="row">
                  <div className="col-sm-6  mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      defaultValue={taskFormState?.taskTitle}
                      className={
                        taskError?.taskTitle
                          ? "invalid form-control"
                          : "form-control text-capitalize"
                      }
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
                      value={taskFormState.taskPriority}
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
                    <label htmlFor="exampleFormControlFile1">
                      Task Status
                    </label>
                    <select
                      className="form-control"
                      value={taskFormState.taskStatus}
                      onChange={(e) => {
                        setTaskFormState({
                          ...taskFormState,
                          taskStatus: e.target?.value,
                        });
                      }}
                    >
                      <option value="N/A">N/A</option>
                      <option>Pending</option>
                      <option>Progress</option>
                      <option>Done</option>
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
                      defaultValue={taskFormState?.taskDate}
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

                  {/* <div className="col-sm-6  mb-3">
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
                  </div> */}

                  {task?.taskMedia?.map((imageSrc, idx) => {
                    // console.log("imageSrc", task?.taskMedia);
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
                  <div className="col-sm-12 mb-3">
                    <label>Description</label>

                    <ReactQuill
                      placeholder="Type here"
                      defaultValue={taskFormState.taskDesc}
                      onChange={(value) =>
                        setTaskFormState({
                          ...taskFormState,
                          taskDesc: value,
                        })
                      }
                    />

                    <small className="text-danger">{taskError?.taskDesc}</small>
                  </div>
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
                      taskFormState?.taskPriority &&
                      taskFormState?.taskDate &&
                      taskFormState?.taskDesc
                        ? // taskFormState?.taskMedia.length > 0
                          "modal"
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
      {/* Edit card view End*/}
    </>
  );
}
