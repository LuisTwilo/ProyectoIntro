export default function startVideo() {
    let video = document.getElementById("video");
    //let canvas = document.getElementById("canvas");
    let imageCapture;
    let promise = new Promise(async(resolve, reject)=>{
        if(video){
            let constraints = { audio: false, video: { facingMode: "user", width: 720, height: 560 } };
            let stream;
           try{
                stream = await navigator.mediaDevices.getUserMedia(constraints)
                video.srcObject = stream;
                let mediaStreamTrack = stream.getVideoTracks()[0];
                imageCapture = new ImageCapture(mediaStreamTrack);
                resolve(imageCapture);
            }  
            catch(err){
               reject(err);
            }
        }
    }) 
    return promise    
}