// render.js

var video;

window.onload = () => {
  video = document.querySelector('#screenVideo')
  navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      frameRate: 30
    }
  }).then(stream => {
    video.srcObject = stream
    console.log(stream)
    video.onloadedmetadata = () => {
      video.play()
      p5Video = new p5.Element(video);
    }
  }).catch(e => console.log(e))
}


function setup(){
  createCanvas(document.body.offsetWidth, document.body.offsetHeight);
  background(240);
}

let p5Video;

function draw(){
  // background(0); 
  // rect(50,50,50,50);
  // console.log(video.readyState)

  // if (video && video.readyState >= 2) {
  //   if(!p5Video) p5Video = new p5.Element(video);
  //   image(p5Video, 0, 0, width, height);
  //   // dessine la capture d'écran dans le canvas p5
  // }

  
  if (p5Video) {
    image(p5Video, 0, 0, width, height);
  }
  text("je suis un texte", mouseX, mouseY);
}

