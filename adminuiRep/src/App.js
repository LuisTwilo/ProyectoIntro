import React, { Component } from "react";
import "./App.css";
import Modal from "./components/modal";
import Main from "./components/main";

class App extends Component {
  state = {
    showModal: false,
    modalType:'',
    empInfo:''
  };


  handleCloseModal = () => {
    if (this.state.showModal) {
      this.setState({ showModal: false });
    }
  };

  handleShowModal = (modalType,emp) => {
    if (!this.state.showModal) {
      this.setState({ showModal: true, modalType, empInfo : emp});
    }
  };

  render() {
    return (
      <div>
        <Main 
          showModal = {this.state.showModal}
          openModal={this.handleShowModal} 
        />
        <Modal
          showModal={this.state.showModal}
          closeModal={this.handleCloseModal}
          modalType = {this.state.modalType}
          empInfo = {this.state.empInfo}
        />
      </div>
    );
  }
}

export default App;
