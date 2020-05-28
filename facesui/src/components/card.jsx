import React, { Component } from "react";
import startVideo from "../handleVideo2.js";
import putCanvas from "../putCanvas.js";
import getImage from "../getImage.js";
import axios from "axios";

class card extends Component {
  async componentDidUpdate(prevProps) {
    if (!prevProps.video && !this.props.flagRec) {
      let vid = await startVideo();
      let can = await putCanvas(vid);
      let img = await getImage(can);
      let imgSplit = img.split(",");
      let imgFinal = imgSplit[1];
      let obj = JSON.stringify(imgFinal);

      const res = await axios({
        method: "post",
        url: "http://192.168.1.4:5000/receive_data",
        data: {
          image: obj,
        },
      });
      this.props.handleReturn(res);
    }
  }


  handleRender() {
    let ren;
    if (!this.props.video && !this.props.flagComing && !this.props.flagRec) {
      ren = (
        <div className="justify-content-center text-center text-white">
          <h1 className="display-4">Welcome,</h1>
          <p className="lead text-center">Press the button to start!</p>
        </div>
      );
    } else {
      if (!this.props.video && this.props.flagComing && !this.props.flagRec) {
        ren = (
          <div className="justify-content-center text-center text-white">
            <h1 className="display-4">Welcome,</h1>
            <p className="lead text-center">Please Look At The Camera</p>
          </div>
        );
      } else {
        if (!this.props.video && this.props.flagComing && this.props.flagRec) {
          ren = (
            <div className="justify-content-center text-center text-white">
              <h1 className="display-4">Welcome,</h1>
              <p className="lead text-center">{this.props.name}</p>
              <p className="lead text-center">
                Last Arrival: {this.props.lastArrival}{" "}
              </p>
            </div>
          );
        } else {
          if (this.props.video && !this.props.flagComing) {
            ren = (
              <div>
                <img
                  id="img"
                  src="/face.jpeg"
                  alt="imagen"
                  width="720"
                  height="560"
                />
                <canvas id="canvas" width="720" height="560"></canvas>
              </div>
            );
          } else {
            ren = (
              <div>
                <video
                  id="video"
                  width="720"
                  height="560"
                  autoPlay
                  muted
                ></video>
                <canvas id="canvas" width="720" height="560"></canvas>
              </div>
            );
          }
        }
      }
    }
    return ren;
  }

  render() {
    return <div>{this.handleRender()} </div>;
  }
}

export default card;
