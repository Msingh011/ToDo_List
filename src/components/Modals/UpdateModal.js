import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill";

export default function EditModal(props) {

  const {task,onFilteredData,sectionId} = props;

  console.log("Task:", task);
  console.log("Filtered Data:", onFilteredData);
  console.log("Section ID:", sectionId);


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
              taskFormState?.taskPriority &&
              taskFormState?.taskMedia.length > 0
            ) {
              //console.log("Task Media:", taskFormState?.taskMedia);
              console.log("Task taskDesc:", taskFormState?.taskDesc);
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
              console.log("fsdfs", JSON.stringify(allSections));
  
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
            
              <h5 className="modal-title">Task Details</h5>
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
                      defaultValue={task?.taskTitle}
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
                      value={task?.taskPriority}
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
                      defaultValue={task?.taskDate}
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
                  <div className="col-sm-12 mb-3">
                    <label>Description</label>
                    <ReactQuill
                      placeholder="Type here"
                      defaultValue={task?.taskDesc}
                    
                    />
                    <div
                                    className="text-capitalize"
                                    dangerouslySetInnerHTML={{
                                      __html: task?.taskDesc,
                                    }}
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
      {/* Edit card view End*/}
    </>
  );
}
