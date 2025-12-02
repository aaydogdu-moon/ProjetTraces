// render.js

var video;
let p5Video;

let trailLayer;

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  background(240);
  
  // >>> créer le layer où on garde les traces <<<
  trailLayer = createGraphics(windowWidth, windowHeight);
  trailLayer.clear(); // transparent au début
  
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
  console.log("ok video ready");
}

// ------------------------------------------------------------------------------ 
// Sketch

let mouseSize = 30;    
let sampleRadius = 2;


let lastX = null;
let lastY = null;

function draw(){
  // 1) dessiner la vidéo
  if (video && video.readyState === 4 && video.videoWidth > 0) {
    drawingContext.drawImage(video, 0, 0, width, height + 40);
  } 

  // 2) dessiner la couche de traces par dessus
  image(trailLayer, 0, 0);

  // // 3) si la souris est hors du canvas, on reset la mémoire
  // if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) {
  //   lastX = null;
  //   lastY = null;
  //   return;
  // }

  // // 4) si c est la première position connue, juste un tampon
  // if (lastX === null || lastY === null) {
  //   applySmearAt(mouseX, mouseY);
  //   lastX = mouseX;
  //   lastY = mouseY;
  //   return;
  // }

  applySmearAt(mouseX, mouseY);

  // 5) on interpole entre l ancienne position et la nouvelle
  // let d = dist(mouseX, mouseY, lastX, lastY);
  // let steps = max(1, int(d / 3)); // plus petit = plus lisse mais plus lourd

  // for (let i = 0; i <= steps; i++) {
  //   let t = i / steps;
  //   let x = lerp(lastX, mouseX, t);
  //   let y = lerp(lastY, mouseY, t);
  //   applySmearAt(x, y);
  // }

  // // 6) on met à jour la dernière position
  // lastX = mouseX;
  // lastY = mouseY;
}

function applySmearAt(cx, cy) { 
  // petite marge de sécurité sur les bords
  if (cx < 2 || cy < 2 || cx >= width - 2 || cy >= height - 2) {
    return;
  }

  trailLayer.loadPixels();

  for (let y = 0; y < mouseSize; y++) {
    for (let x = 0; x < mouseSize; x++) {

      // on centre autour de la position donnée
      let positionX = Math.floor(cx + (x - mouseSize / 2));
      let positionY = Math.floor(cy + (y - mouseSize / 2));

      // vérifie qu'on reste dans le canvas
      if (positionX >= 0 && positionX < width && positionY >= 0 && positionY < height) {

        // on prend un pixel voisin aléatoire autour de la position courante
        let sampleX = Math.floor(positionX + random(-sampleRadius, sampleRadius + 1));
        let sampleY = Math.floor(positionY + random(-sampleRadius, sampleRadius + 1));

        // on contraint pour rester dans le canvas
        sampleX = constrain(sampleX, 0, width - 1);
        sampleY = constrain(sampleY, 0, height - 1);

        // couleur du pixel voisin sur la vidéo (canvas principal)
        let neighborColor = get(sampleX, sampleY);

        // on colle cette couleur au pixel courant dans trailLayer
        trailLayer.set(positionX, positionY, neighborColor);
      }
    }
  }

  trailLayer.updatePixels();
}

function keyPressed() {
  if (key === 's') {
    saveFrames('frame', 'png', 1, 5);
  }
}