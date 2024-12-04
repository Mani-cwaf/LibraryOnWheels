const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('code', {
  requestBooks: () => ipcRenderer.invoke('books'),
  readPDF: (bookname) => ipcRenderer.invoke('read', bookname)
  // we can also expose variables, not just functions
})