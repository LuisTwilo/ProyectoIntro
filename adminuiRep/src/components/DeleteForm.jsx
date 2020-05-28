import React, { Component } from "react";
import axios from "axios";

class DeleteForm extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.props.empInfo);
    const resp = await axios({
      method: "delete",
      url: "http://localhost:4000/employee/",
      data: this.props.empInfo,
    });
    console.log("Submitted");
    console.log(resp);
    this.props.closeModal();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <p>Do you want to delete this employee?</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-10 text-right">
            <button
              onClick={() => this.props.closeModal()}
              className="btn btn-light"
            >
              Cancel
            </button>
          </div>
          <div className="form-group col-md-2">
            <button className="btn bg-dark text-white">Delete</button>
          </div>
        </div>
      </form>
    );
  }
}

export default DeleteForm;
