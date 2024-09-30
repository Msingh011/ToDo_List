import React, { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { message } from "antd";
import moment from "moment";
import EditModal from "../../Modals/UpdateModal";
import AddTaskModal from "../../Modals/AddTaskModal";

export default function Home() {
  //Create New Section Code Start
  const sectionLocalStorage =
    JSON.parse(localStorage.getItem("sections")) || [];
  const [newSection, setNewSection] = useState(sectionLocalStorage);
  const [newSectionError, setNewSectionError] = useState({});
  //begin::Create New Section Code End
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
            const { sectionId, tasks, taskId } = data;
            return (
              <>
                <li key={index}>
                  <h5>{data?.sectionTitle}</h5>
                  <button
                    className="addbutton"
                    data-toggle="modal"
                    data-target={`#exampleModal${sectionId}`}
                  >
                    <FiPlusCircle className="mr-2" /> Add task
                  </button>

                  {/* Display Task in Card View */}
                  <div className="task-list mt-3"  draggable="true">
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
                  <EditModal task={task}/>
                          {/* Edit card view End*/}
                        </>
                      ))
                    ) : (
                      <p>No tasks yet</p>
                    )}
                  </div>
                </li>

                {/**Add Task Modal**/}

           <AddTaskModal sectionId={sectionId} onFilteredData={handleFilteredData} />

                {/** Add Task Modal**/}

              </>
            );
          })}

        <li className="">
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
