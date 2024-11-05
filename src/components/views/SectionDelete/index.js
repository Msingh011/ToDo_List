import React from "react";

export default function DeletSection(props) {
  const { data, tasks, sectionId, onFilteredData } = props;
  const sectionDeleteTask = () => {
    const updatedSections = data.filter(
      (section) => section.sectionId !== sectionId
    );
    localStorage.setItem("sections", JSON.stringify(updatedSections));
    if (onFilteredData) {
      onFilteredData(updatedSections);
    }
  };

  return (
    <div
      className="modal fade"
      id={`sectiondeletemodal${sectionId}`}
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
                  <div className="alert-icon pr-5">
                    <i className="flaticon-warning icon-3x text-warning"></i>
                  </div>
                  <span className="ant-modal-confirm-title">
                    Are you sure you want to delete this Section?.{" "}
                    {tasks?.length > 0 && <>Tasks Will Also Be Deleted</>}
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
                    onClick={() => sectionDeleteTask()}
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
  );
}
