import React, { Component } from 'react';
import Employee from "./employee";


class Main extends Component {
    
  handleDelete = (emp)=>{
    console.log("Delete Button Clicked");
    const type = 'Delete'
    this.props.openModal(type, emp);
  }

  handleEdit = (emp)=>{
    console.log("Edit Button Clicked");
    const type = 'Edit'
    console.log(emp)
    this.props.openModal(type, emp);
  }

  handleSearch = () =>{
    console.log("Search Button Clicked")
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 sticky-top">
          <a className="navbar-brand">
            Security System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                onClick = {this.handleSearch}
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>

        <main role="main" className="container">
          <div className="d-flex align-items-center p-3 my-3 border rounded box-shadow bg-dark text-white">
            <div className="row lh-100 w-100">
              <div className="col-lg text-left">
                <h4 className="mb-0 font-weight-bold">Employees</h4>
              </div>
              <div className="col-sm text-right">
                <button onClick = {()=>this.props.openModal('New')} className="btn btn-light">New</button>
              </div>
            </div>
          </div>
          <div className="jumbotron bg-white border rounded p-0">
            <Employee 
              showModal = {this.props.showModal}
              handleDelete = {this.handleDelete}
              handleEdit = {this.handleEdit}
            />

          </div>
        </main>
      </div>
    );
  }
}
 
export default Main;