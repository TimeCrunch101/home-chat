const { app, BrowserWindow, Tray, Menu, nativeImage, Notification, ipcMain } = require('electron');
const path = require('node:path');
const { updateElectronApp } = require('update-electron-app')

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow = null
let closeApp = null
let tray = null
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./public/icon.ico",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
  
  mainWindow.on("close", (event) => {
    if (!closeApp) {
      event.preventDefault()
      mainWindow.hide()
    } else {
      app.quit()
    }
  })
};

const handleQuit = () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

const notify = (title, body) => {
  new Notification({
    title: title,
    body: body
  }).show()
}

app.whenReady().then(() => {

  createWindow();

  ipcMain.handle("notify", (event, title, body) => {
    if (!mainWindow.isFocused()) {
      notify(title, body)
    }
  })
  
  const icon = nativeImage.createFromPath(path.join(__dirname,"icon.png"))
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Quit',
      click: () => {
        closeApp = true
        handleQuit()
      }
    },
    { 
      label: 'Show Window',
      click: () => {
        mainWindow.show()
      }
    },
  ])
  tray.setToolTip('Home Chat')
  tray.setTitle('Home Chat')
  tray.setContextMenu(contextMenu)
  tray.addListener("click", () => mainWindow.show())
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

updateElectronApp()
