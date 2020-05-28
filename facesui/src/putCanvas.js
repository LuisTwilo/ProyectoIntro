export default function putCanvas(imageCapture){
    let canvas = document.getElementById("canvas");
    let promise = new Promise((resolve, reject)=>{
        setTimeout(async()=>{
            let imageBitMap = await imageCapture.grabFrame();
            let ctx = canvas.getContext("2d");
            ctx.drawImage(imageBitMap, 0, 0)
        }, 2000)
        resolve(true);
    })
    return promise;
}