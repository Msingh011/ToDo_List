import React, { useState } from "react";

export default function DeleteTask(props) {
  const { task, data, sectionId, onFilteredData } = props;

  // const handleDeleteTask = () => {
  //   const updatedSections = data && data.map((section) => {
  //     if (section.sectionId === sectionId) {
  //       console.log(section.tasks.length)
  //       //count tasks length and if it is 1
  //        if(section.tasks.length===1){
  //         const confirmDeleteSection = window.confirm(
  //           "This is the only task in the section. Do you want to delete the entire section?"
  //         );

  //       }
  //      section.tasks = section.tasks.filter((t) => t.taskId !== task?.taskId);
  //      if(confirmDeleteSection){
  //       return null;
  //      }
  //     }
  //     return section;
  //   });
  //   localStorage.setItem("sections", JSON.stringify(updatedSections));

  //   // Call the callback function to pass filtered data
  //   if (onFilteredData) {
  //     onFilteredData(updatedSections);
  //   }
  // };

  const handleDeleteTask = () => {
    const updatedSections =
      data &&
      data
        .map((section) => {
          if (section.sectionId === sectionId) {
            console.log(section.tasks.length);
            // Check if tasks length is 1
            // if (section.tasks.length === 1) {
            //   const confirmDeleteSection = window.confirm(
            //     "This is the only task in the section. Do you want to delete the entire section?"
            //   );
            //   if (confirmDeleteSection) {
            //     return null;
            //   }
            // }
            section.tasks = section.tasks.filter(
              (t) => t.taskId !== task?.taskId
            );
          }
          return section;
        })
        .filter((section) => section !== null);

    localStorage.setItem("sections", JSON.stringify(updatedSections));
    if (onFilteredData) {
      onFilteredData(updatedSections);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={`deletemodal${task?.taskId}`}
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="staticBackdrop"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content ant-modal ant-modal-confirm ant-modal-confirm-confirm">
            <div className="ant-modal-content">
              <div className="ant-modal-body">
                <div className="ant-modal-confirm-body-wrapper">
                  <div className="align-items-center ant-modal-confirm-body">
                    <span className="ant-modal-confirm-title">
                      Are you sure you want to delete this Task
                      <strong> {task?.taskTitle} </strong>?
                    </span>
                  </div>
                  <div className="ant-modal-confirm-btns">
                    <button
                      type="button"
                      className="ant-btn ant-btn-default"
                      data-dismiss="modal"
                    >
                      <span>No</span>
                    </button>
                    <button
                      type="button"
                      className="ant-btn ant-btn-default ant-btn-dangerous"
                      data-dismiss="modal"
                      onClick={() => handleDeleteTask()}
                    >
                      <span>Yes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
