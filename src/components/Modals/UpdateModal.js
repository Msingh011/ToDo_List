import React from 'react'

export default function EditModal ({task}) {
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
                            <div
                              className="modal-dialog modal-xl"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Card Details</h5>
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
                                    {/* <div className="col-sm-12 p-0 mb-3">
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
                                    </div> */}

                                    <div className="col-sm-12 p-0 mb-3">
                                      Des
                                    </div>
                                  </form>

                                  <p className="m-0">{task?.taskDesc}</p> 
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Edit card view End*/}
        </>
    )
}