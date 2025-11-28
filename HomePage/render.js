// render.js

var video;
let p5Video;

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  background(240);
  
  // Initialize video capture after p5 is ready
  video = document.querySelector('#screenVideo');

  navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      frameRate: 30
    }
  }).then(stream => {
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
      setTimeout(() => {
        initVideoElement();
      }, 500);
    }
  }).catch(e => console.log(e));
}
let capture;

function initVideoElement(){
  p5Video = new p5.Element(video);
  
  console.log(p5Video);

  // console.log(p5Video);
  console.log("ok video ready");
}

function draw(){
  background(0); 
  
  if (video && video.readyState === 4 && video.videoWidth > 0) {
    drawingContext.drawImage(video, 0, 0, width, height);
  } 
}


