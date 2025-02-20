import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow: BrowserWindow
let secondWindow: BrowserWindow

const createWindow = () => {

  const { height, width } = screen.getPrimaryDisplay().workAreaSize
  const secWinHight = Math.floor(height / 3)
  const mainWinHight = Math.floor(height / 3) * 2
  const xPos = 0
  const yPos = height - secWinHight
  const yPosMain = 0
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: mainWinHight-8,
    x: xPos+4,
    title:"POS1",
    y: yPosMain+4,
    width:width-8,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    
  });
  secondWindow = new BrowserWindow({
    title:"POS2",
    height: secWinHight-8,
    width:width-8,
    x: xPos+4,
    y: yPos+4,
    movable:true,
    backgroundColor: "yellow",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });
  mainWindow.loadFile("./mainWindow.html")
  secondWindow.loadFile("./mainWindow.html")

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/main`);
    secondWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/sec`);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on("change-bgcolor-main", (_e, color) => {
  if (mainWindow) {
    mainWindow.setBackgroundColor(color)
  }
})

ipcMain.on("change-bgcolor-sec", (_e, color) => {
  if (secondWindow) {
    secondWindow.setBackgroundColor(color)
  }
})
ipcMain.on("change-size-main", (_e, size) => {
  if (mainWindow) {
    mainWindow.setSize(mainWindow.getSize()[0], mainWindow.getSize()[1]*size)
    // secondWindow.setSize(secondWindow.getSize())
  }
})
ipcMain.on("change-size-sec", (_e, size) => {
  if (secondWindow) {
    console.log(secondWindow.getSize(), size)
    secondWindow.setSize(secondWindow.getSize()[0], secondWindow.getSize()[1]*size)
    // secondWindow.setBackgroundColor(color)
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
