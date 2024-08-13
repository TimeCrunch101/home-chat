const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('node:path');
const { updateElectronApp } = require('update-electron-app')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


const createWindow = () => {
  const mainWindow = new BrowserWindow({
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
    // mainWindow.close()
  })
};

const handleQuit = () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

let tray
app.whenReady().then(() => {

  createWindow();

  const icon = nativeImage.createFromPath(path.join(__dirname,"icon.png"))

  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Quit',
      click: () => {handleQuit()}
    },
    { 
      label: 'Show Window',
      click: () => {createWindow()}
    },
  ])

  tray.setToolTip('Home Chat')
  tray.setTitle('Home Chat')
  tray.setContextMenu(contextMenu)
  tray.addListener("click", () => createWindow())

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

updateElectronApp()
