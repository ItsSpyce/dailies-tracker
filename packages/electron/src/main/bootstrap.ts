import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import { setupDb } from './db';
import { setupLogger } from './logger';
import { appStorage } from './consts';
import 'reflect-metadata';
import './services/commission-service';
import './services/claims-service';
import './services/reward-service';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

if (!fs.existsSync(appStorage)) {
  fs.mkdirSync(appStorage);
}

const closeLogger = setupLogger({ redirectToFile: true, includeEvents: 'all' });

const createWindow = async () => {
  try {
    await setupDb();
  } catch (err) {
    console.error('Failed to setup database', err);
    app.quit();
    return;
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
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
    closeLogger().then(app.quit);
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
