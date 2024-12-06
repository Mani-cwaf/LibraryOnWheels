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
  var files = fs.readdirSync('./public/books');
  ipcMain.handle('list', () => {
    let grades = [];
    files.forEach(file => {
      grades.push(file.split(/\s+/)[0]);
    });
    let gradeOptions = [];
    grades.forEach(grade => {
        if (!gradeOptions.includes(grade)) {
            gradeOptions.push(grade);
        }
        grades = gradeOptions.sort((a,b) => b - a);
    });

    const subject = {
      grade: 0,
      subjectName: ""
    }
    let subjects = []
    grades.forEach(grade => {
      sub = [];
      files.forEach(file => {
        if (file.split(/\s+/)[0] == grade) {
          let newSubject = Object.create(subject);
          newSubject.grade = file.split(/\s+/)[0];
          newSubject.subjectName = file.split(/\s+/)[1];
          sub.push(newSubject);
        }
      });
      sub.sort();
      subjects.push(sub);
    });

    return [grades, subjects];
  })
  ipcMain.handle('books', () => files)
  ipcMain.handle('read', (event, filename) => {

    let pdfViewer = new BrowserWindow({
      webPreferences: {
        plugins: true
      }
    })
    pdfViewer.loadFile(join(__dirname, `/public/books/${filename}.pdf`))
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