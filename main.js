const { app, BrowserWindow, ipcMain } = require('electron/main')
const { join } = require('node:path')
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, './preload.js')
    }
  })

  win.loadFile(join(__dirname, './index.html'))
  win.maximize();
}

app.whenReady().then(() => {
  var files = fs.readdirSync('./books');
  ipcMain.handle('books', () => files)
  ipcMain.handle('read', (event, filename) => {

    let pdfViewer = new BrowserWindow({
      webPreferences: {
        plugins: true
      }
    })
    pdfViewer.loadFile(join(__dirname, `/books/${filename}.pdf`))
    pdfViewer.maximize();
    return;

  })
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})