import React, { Component } from "react";
import axios from "axios";
import Pagination from "./pagination";
import { paginate } from "../utils/Paginate";

class Employee extends Component {
  state = {
    employees: [],
    pageSize: 5,
    currentPage: 1,
  };

  async componentDidMount() {
    const employees = await axios({
      method: "get",
      url: "http://192.168.1.4:4000/employee/",
    });
    console.log(employees);
    let data = employees.data;

    data.map((e) => {
      if (e.lastArrival) {
        let date = new Date(e.lastArrival);
        const dateTimeFormat = new Intl.DateTimeFormat("en", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(date);
        e.lastArrival = dateTimeFormat;
      }
    });
    this.setState({ employees: employees.data });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.showModal !== this.props.showModal) {
      const employees = await axios({
        method: "get",
        url: "http://192.168.1.4:4000/employee/",
      });
      console.log(employees);
      let data = employees.data;
      data.map((e) => {
        if (e.lastArrival) {
          let date = new Date(e.lastArrival);
          const dateTimeFormat = new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }).format(date);

          e.lastArrival = dateTimeFormat;
        }
      });
      this.setState({ employees: employees.data });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    let employees = paginate(
      this.state.employees,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="table-responsive-sm ">
        <table className="table table-hover">
          <thead className="thead-dark rounded ">
            <tr>
              <th scope="col"></th>
              <th scope="col text-white">Id Type</th>
              <th scope="col text-white">Id Number</th>
              <th scope="col text-white">First Name</th>
              <th scope="col text-white">Last Name</th>
              <th scope="col text-white">Last Arrival</th>
              <th scope="col text-white"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <th scope="row"></th>
                <td>{emp.idType}</td>
                <td>{emp.idNumber}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.lastArrival}</td>
                <td className="p-0">
                  <button
                    id="myBtn"
                    onClick={() => this.props.handleEdit(emp)}
                    className="btn btn-light m-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.props.handleDelete(emp)}
                    className="btn btn-dark text-white"
                    data-toggle="modal"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          counter={this.state.employees.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        />
      </div>
    );
  }
}

export default Employee;
