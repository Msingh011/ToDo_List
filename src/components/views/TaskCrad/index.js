import React from "react";
import EditModal from "../../Modals/UpdateModal";
import { RxLapTimer } from "react-icons/rx";
import moment from "moment";

export default function TaskCard({ tasks }) {
  return (
    <>
      <div className="task-list mt-3" draggable="true">
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
              <EditModal task={task} />
              {/* Edit card view End*/}
            </>
          ))
        ) : (
          <p>No tasks yet</p>
        )}
      </div>
    </>
  );
}
