import React, { Component } from "react";
import "./App.css";
import Card from "./components/card";
import axios from "axios";

class App extends Component {
  state = {
    flagComing: false,
    flagRec: false,
    name: "",
    lastArrival: "",
  };

  handleReturn = async (res) => {
    const { flagRec, flagComing, data } = res.data;
    console.log(flagRec, flagComing, data);
    if (!this.state.flagRec) {
      if (!flagRec || !data) {
        this.setState({ flagComing: false, flagRec: false });
      } else {
        let name = data.firstName + " " + data.lastName;
        let lastArrival = data.lastArrival;
        this.setState({ flagRec, name, lastArrival });
        const res = await axios({
          method: "post",
          url: "http://192.168.1.1:5000/open_door",
          data: {
            flagRec: true,
          },
        });
        console.log(res.data);
        this.setState({ flagComing: false, flagRec: false });
      }
    }
  };

  handleComing = (flagComing, flagRec) => {
    if (!flagComing && !flagRec) {
      flagComing = true;
      this.setState({ flagComing });
    }
  };

  handleRestart = (flagComing, flagRec) => {
    if (flagComing && flagRec) {
      flagComing = false;
      flagRec = false;
      this.setState({ flagComing, flagRec });
    } else {
      flagComing = false;
      this.setState({ flagComing });
    }
  };
  render() {
    console.log("flag", this.state.flagComing);
    return (
      <div className="App">
        <div className="row">
          <div className="col">
            <button
              onClick={() =>
                this.handleComing(this.state.flagComing, this.state.flagRec)
              }
              className="btn btn-success m-2"
            >
              person coming
            </button>
          </div>
          <div className="col"></div>
          <div className="col">
            <button
              onClick={() =>
                this.handleRestart(this.state.flagComing, this.state.flagRec)
              }
              className="btn btn-success m-2"
            >
              restart
            </button>
          </div>
        </div>

        <div className="row w-100">
          <div className="col m-0">
            <Card
              video={true}
              flagComing={this.state.flagComing}
              flagRec={this.state.flagRec}
              handleComing = {this.handleComing}
            />
          </div>
          <div className="col">
            <Card
              video={false}
              name={this.state.name}
              lastArrival={this.state.lastArrival}
              handleReturn={this.handleReturn}
              flagComing={this.state.flagComing}
              flagRec={this.state.flagRec}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
