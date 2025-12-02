// main.js
const { app, BrowserWindow, desktopCapturer, session } = require('electron')
const fs = require('fs')
const path = require('path')

app.whenReady().then(() => {
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: 'loopback' })
    })
    
  }, { useSystemPicker: true })

  createWindow();
})


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    frame: false,          // si tu veux un overlay propre
    // transparent: true,     // pour laisser voir le bureau
    alwaysOnTop: true,     // reste au-dessus (optionnel)
    focusable: false       // la fenêtre ne prend jamais le focus (Windows/Linux)
  });
  
  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadFile('./HomePage/index.html')

  // >>> ICI : rendre la fenêtre non cliquable <<<
  // mainWindow.setIgnoreMouseEvents(true);
  mainWindow.setIgnoreMouseEvents(true, { forward: true }) // overlay non cliquable
  mainWindow.setContentProtection(true)                    // exclu des captures

    
const downloadDir = path.join(__dirname, "screenshots");

    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir)

    session.defaultSession.on('will-download', (event, item, webContents) => {
      
      // Chemin complet du fichier
      const filePath = path.join(downloadDir, item.getFilename())
      
      // On désactive le popup
      item.setSavePath(filePath)

      console.log('Download started:', item.getFilename())

      item.once('done', (event, state) => {
        if (state === 'completed') {
          console.log('Download finished:', filePath)
        } else {
          console.warn('Download failed: ', state)
        }
      })
    })
s
}
