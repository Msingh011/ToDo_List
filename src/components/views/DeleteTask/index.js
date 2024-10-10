import React, { useState } from "react";

export default function DeleteTask(props) {
  const { task, setDeleted } = props;

  const sectionLocalStorage =
    JSON.parse(localStorage.getItem("sections")) || [];

    const [newSection, setNewSection] = useState(sectionLocalStorage);

  const handleDelete = (e) => {
    console.log("e", e)
    const deleteData = [...sectionLocalStorage];
    console.log("deleteData" , deleteData)
    deleteData.splice(e, 1);
    localStorage.setItem("sections", JSON.stringify(deleteData));
    setNewSection(deleteData);
    console.log("delete",deleteData)


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
                  <div className="align-items-center ant-modal-confirm-body d-flex">
                    <div className="alert-icon pr-5">
                      <i className="flaticon-warning icon-3x text-warning"></i>
                    </div>
                    <span className="ant-modal-confirm-title">
                      Are you sure you want to delete this Task{" "}
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
                      onClick={(e) => handleDelete(e)}>
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
