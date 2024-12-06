const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('code', {
  getList: () => ipcRenderer.invoke('list'),
  requestBooks: () => ipcRenderer.invoke('books'),
  readPDF: (bookname) => ipcRenderer.invoke('read', bookname)
  // we can also expose variables, not just functions
})