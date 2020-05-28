import React, { Component } from "react";
import axios from "axios";

class EditForm extends Component {
  state = {
    id : '',
    firstName: "",
    lastName: "",
    idType: "",
    idNumber: "",
  };

  componentDidMount() {
   // let { id, firstName, lastName, idType, idNumber } = this.props.empInfo;
    this.setState( this.props.empInfo);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "http://localhost:4000/employee/",
      data: this.state
    });
    console.log("Submitted");
    console.log(res);
    this.props.closeModal();

  };

  handleChange = (e) => {
    const employee = { ...this.state };
    employee[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      firstName: employee.firstName,
      lastName: employee.lastName,
      idType: employee.idType,
      idNumber: employee.idNumber,
    });
  };

  render() {
    let { firstName, lastName, idType, idNumber } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="FirstName">First Name</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="FirstName"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="LastName">Last Name</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="LastName"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="IdType">Id Type</label>
            <select
              onChange={this.handleChange}
              id="IdType"
              value={idType}
              name="idType"
              className="form-control"
            >
              <option id="None"></option>
              <option id="T.I">TI</option>
              <option id="C.C">CC</option>
              <option id="Passport">PS</option>
              <option id="C.E">CE</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="IdNumber">Id Number</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="IdNumber"
              name="idNumber"
              placeholder="123456789"
              value={idNumber}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <button className="btn bg-dark text-white text-right" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditForm;
