import moment from "moment";
import React, { useState } from "react";

export default function TaskList() {
  const savedSections = JSON.parse(localStorage.getItem("sections")) || [];
  const allTasks = savedSections.flatMap((section) => section.tasks);

  return (
    <>
      <div className="p-4">
        <div className="table-responsive">
          <table className="table table-striped table-hover border">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Task Title</th>
                <th>Task Tags</th>
                <th>Task Priority</th>
                <th>Task Status</th>
                <th>Task End Date</th>
              </tr>
            </thead>
            <tbody>
              {allTasks?.length > 0 ? (
                allTasks?.map((task, taskIndex) => {
                  return (
                    <tr key={taskIndex}>
                      <td>{taskIndex + 1}</td>
                      <td>{task.taskTitle}</td>
                      <td>{task.tasktag || "No Tags"}</td>
                      <td>
                        <span className={`priority-button ${task?.taskPriority.toLowerCase()}-priority`}>{task.taskPriority}</span>
                      </td>
                      <td><span className={`priority-button ${task?.taskStatus.toLowerCase()}-status`}>{task.taskStatus || "N/A"}</span></td>
                      <td>
                        {task.taskDate
                          ? moment.utc(task.taskDate).format("DD-MM-YYYY")
                          : ""}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center font-bold">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
