import React from "react";
import DeleteForm from "./DeleteForm";
import NewForm from "./newForm";
import EditForm from "./editForm";

const Modal = (props) => {
  if (!props.showModal) return null;

  let type;
  let modtitle;
  switch (props.modalType) {
    case "Delete":
      type = (
        <DeleteForm
          empInfo={props.empInfo}
          closeModal={() => props.closeModal()}
        />
      );
      modtitle = "Delete Employee";
      break;

    case "New":
      type = <NewForm closeModal={() => props.closeModal()} />;
      modtitle = "New Employee";
      break;

    case "Edit":
      type = (
        <EditForm
          empInfo={props.empInfo}
          closeModal={() => props.closeModal()}
        />
      );
      modtitle = "Edit Employee";
      break;

    default:
      type = <p>Uknown Type</p>;
      break;
  }

  return (
    <div
      className="modal d-block bg-gradient-dark"
      id="myModal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {modtitle}
            </h5>
            <button
              onClick={() => props.closeModal()}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{type}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
