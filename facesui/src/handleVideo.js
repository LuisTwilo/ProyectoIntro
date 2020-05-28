export default function startVideo() {
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  if (video) {
    let constraints = { audio: false, video: { width: 720, height: 560 } };
    let imageCapture;
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        video.srcObject = mediaStream;
        let mediaStreamTrack = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(mediaStreamTrack);

        setTimeout(() => {
          imageCapture
            .grabFrame()
            .then(imageBitmap => {
              let ctx = canvas.getContext("2d");
              ctx.drawImage(imageBitmap, 0, 0);
            })
            .catch(function(error) {
              console.log("grabFrame() error: ", error);
            });
        }, 2000);
      })
      .catch(err => {
        console.error(err);
      });     
  }
}
