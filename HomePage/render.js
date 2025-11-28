// render.js
const video = document.querySelector('video')
// let p5Instance = null

window.onload = () => {
  navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      // width: 1000,
      // height: 800,
      frameRate: 30
    }
  }).then(stream => {
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()

      //lance p5 UNE FOIS quand la vidéo est prête
      // if (!p5Instance) {
      //   startP5()
      // }
    }
  }).catch(e => console.log(e))
}

// sketch p5 
// function startP5 () {
//   p5Instance = new p5((p) => {

//     p.setup = () => {
//       p.createCanvas(1000, 800)
//     }

//     p.draw = () => {
//       if (!video || video.readyState < 2) return

//       // dessine la vidéo capturée dans le canvas p5
//       p.image(video, 0, 0, p.width, p.height)

//       // exemple : texte qui suit la souris
//       p.fill(255, 0, 0)
//       p.textSize(32)
//       p.text('hello', p.mouseX, p.mouseY)

     
//     }

//   }, 'p5-container') 
// }
