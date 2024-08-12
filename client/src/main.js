const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { updateElectronApp } = require('update-electron-app')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// if (process.env.NODE_ENV === "production" ) {
//   function handleSquirrelEvent() {
//     if (process.argv.length === 1) {
//       return false;
//     }
//     const ChildProcess = require('child_process');
//     const appFolder = path.resolve(process.execPath, '..');
//     const rootAtomFolder = path.resolve(appFolder, '..');
//     const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
//     const exeName = path.basename(process.execPath);
//     const spawn = function(command, args) {
//       let spawnedProcess, error;
//       try {
//         spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
//       } catch (error) {}
//       return spawnedProcess;
//     };
//     const spawnUpdate = function(args) {
//       return spawn(updateDotExe, args);
//     };
//     const squirrelEvent = process.argv[1];
//     switch (squirrelEvent) {
//       case '--squirrel-install':
//       case '--squirrel-updated':
//         spawnUpdate(['--createShortcut', exeName]);
//         setTimeout(app.quit, 1000);
//         return true;
//       case '--squirrel-uninstall':
//         spawnUpdate(['--removeShortcut', exeName]);
//         setTimeout(app.quit, 1000);
//         return true;
//       case '--squirrel-obsolete':
//         app.quit();
//         return true;
//     }
//   };
//   if (handleSquirrelEvent()) {
//     return;
//   }
// }

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname + "../assets/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
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
