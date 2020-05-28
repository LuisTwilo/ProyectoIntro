import React, { Component } from "react";
import axios from 'axios';

class NewForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    idType: "",
    idNumber: "",
    file: null
  };

  handleSubmit = async e =>{
    e.preventDefault();
    let {firstName, lastName, idType, idNumber, file} = this.state;
    console.log(file)
    let empInfo = {
      firstName: firstName,
      lastName: lastName,
      idType: idType,
      idNumber: idNumber,
    }

    const dataFiles = new FormData();
    for (let i in file){
      dataFiles.append('file', file[i]);
    }
    
    const res = await axios({
      method: "post",
      url: "http://192.168.1.4:4000/employee/new",
      data: empInfo  
    });
    let userId = res.data.insertId;
    console.log(userId)
    const resfold = await axios({
      method : "post",
      url : "http://192.168.1.4:4000/employee/new/folder",
      data :{
        userId
      } 
    })

    const resPic = axios.post('http://192.168.1.4:4000/employee/new/pics',dataFiles,{});
    console.log(resPic)
    console.log("Submitted");
    this.props.closeModal();
  }

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

  handleFileChange = (e) =>{
    console.log(e.target.files)
    this.setState({file : e.target.files})
  }

  render() {
    let { firstName, lastName, idType, idNumber } = this.state;
    return (
      <form onSubmit = {this.handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              onChange={this.handleChange}
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
              type="text"
              onChange={this.handleChange}
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
              id="idType"
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
              id="idNumber"
              name="idNumber"
              placeholder="123456789"
              value={idNumber}
              required
            />
          </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="pictures">Pictures</label>
              <input
                type="file"
                accept = "image/png, image/jpeg, image/jpg"
                multiple
                title="click to upload the user pictures"
                name="pictures"
                className="form-control-file tooltip-test"
                id="pictures"
                onChange = {this.handleFileChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <button
                className="btn bg-dark text-white text-right"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
      </form>
    );
  }
}

export default NewForm;
