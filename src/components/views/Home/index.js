import React, { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { message } from "antd";
import moment from "moment";
import EditModal from "../../Modals/UpdateModal";
import AddTaskModal from "../../Modals/AddTaskModal";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EyeFilled } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteTask from "../DeleteTask";

export default function Home() {
  //Create New Section Code Start
  const sectionLocalStorage =
    JSON.parse(localStorage.getItem("sections")) || [];
  const [newSection, setNewSection] = useState(sectionLocalStorage);
  const [newSectionError, setNewSectionError] = useState({});
  //begin::Create New Section Code End
  const [deleted, setDeleted] = useState (false);

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
  //end::Create New Section Code End

  const [isExtand, setIsExtand] = useState(false);
  const [currentTaskID, setCurrentTaskID] = useState("");

  // Callback to get filtered data from AddTaskModal
  const handleFilteredData = (data) => {
    setNewSection(data);
  };

  return (
    <div className="taskcreate p-4">
      <ul className="sections ul">
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
            if(data){
              const { sectionId, tasks, taskId } = data;

              return (
                <>
                  <li className="card-list" key={index}>
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
                        tasks.map((task, index, taskId) => {
                          const toggleReadMore = (taskId) => {
                            if (currentTaskID === taskId) {
                              setIsExtand(!isExtand);
                            }
                            setCurrentTaskID(taskId);
                          };
                          const contentLimit = 50;
                          const taskDesc = task?.taskDesc || "";
                          const readMore = taskDesc.length > contentLimit;

                          const content =
                            currentTaskID === task?.taskId && isExtand
                              ? taskDesc
                              : taskDesc.substring(0, contentLimit) +
                                (readMore ? "..." : "");
                          return (
                            <>
                              <div
                                className={`todo mb-3 ${
                                  task?.taskDate &&
                                  task?.taskDate.split("T")[0] <
                                    new Date().toISOString().split("T")[0]
                                    ? "border-danger"
                                    : ""
                                }`}
                                key={index}
                              >
                                {task?.taskId} 
                                  <RiDeleteBin6Line  className="bg-danger cursor-pointer d-block mb-2 ml-auto rounded text-white delete-icon"
                                   data-toggle="modal"
                                   data-target={`#deletemodal${task?.taskId}`}
                                   />
                                  <DeleteTask 
                                  deleted= {deleted}
                                  task={task}
                                  setDeleted={setDeleted}
                                  />
                                <div className="risk mb-3 d-flex justify-content-between">
                                  <span
                                    className={`bu ${task?.taskPriority?.toLowerCase()}-btn`}
                                  >
                                    {task?.taskPriority}
                                  </span>
                                  <RxLapTimer />
                                </div>
                                <div className="todocards">
                                  <p className="m-0">{task?.taskTitle}</p>

                                  <div className="border-bottom border-top my-3 py-2">
                                    <div
                                      className="text-capitalize"
                                      dangerouslySetInnerHTML={{
                                        __html: content,
                                      }}
                                    />

                                    {readMore && (
                                      <span
                                        className="readmore"
                                        onClick={() =>
                                          toggleReadMore(task?.taskId)
                                        }
                                      >
                                        {currentTaskID === task?.taskId &&
                                        isExtand
                                          ? "Read less"
                                          : "Read more"}
                                      </span>
                                    )}
                                  </div>
                                </div>
                          
                                  <div className="d-flex justify-content-between">
                                    <EyeFilled
                                      className="cursor-pointer"
                                      data-toggle="modal"
                                      data-target={`#fullCardDetails${task?.taskId}`}
                                    />
                                    <p className="m-0">
                                      Task End Date :{" "}
                                      {task?.taskDate
                                        ? moment(task.taskDate).format(
                                            "MM-DD-YYYY"
                                          )
                                        : "N/A"}
                                    </p>
                                  </div>
                              
                              </div>

                              {/* Edit card view Start*/}
                              <EditModal
                                task={task}
                                sectionId={sectionId}
                                onFilteredData={handleFilteredData}
                              />
                              {/* Edit card view End*/}
                            </>
                          );
                        })
                      ) : (
                        <p>No tasks yet</p>
                      )}
                    </div>
                  </li>

                  {/**Add Task Modal**/}
                  <AddTaskModal
                    sectionId={sectionId}
                    onFilteredData={handleFilteredData}
                  />
                  {/** Add Task Modal**/}
                </>
              );
            }
          })}

        <li className="card-list">
          <h5>Create Section</h5>
          <button
            className="addbutton"
            data-toggle="modal"
            data-target="#newsection"
          >
            <FiPlusCircle className="mr-2" /> Create New Section
          </button>
        </li>
      </ul>
    </div>
  );
}
