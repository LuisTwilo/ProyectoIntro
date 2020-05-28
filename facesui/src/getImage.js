export default function getImage(can) {
  let promise = new Promise((resolve, reject) => {
    if (can) {
      setTimeout(() => {
        let canvas = document.getElementById("canvas");
        let dataUrl;
        let ctx;
        if (canvas) {
          dataUrl = canvas.toDataURL();
          ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          resolve(dataUrl);
        }
      }, 3500);
    }
  });
  return promise;
}
