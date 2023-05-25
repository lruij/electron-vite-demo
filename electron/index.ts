import { app, BrowserWindow,ipcMain } from 'electron'


const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  // console.log(process.env);
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }

  win.webContents.openDevTools();

  ipcMain.on('message', (_, str) => {
    console.log('electron 接受到 vue 文件的信息：',str);
  })

  setTimeout(() => {
    win.webContents.send('load', { message: '加载完成'})
  }, 3000)

}


app.whenReady().then(createWindow)
