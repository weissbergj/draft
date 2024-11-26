const { app, BrowserWindow } = require('electron');
const path = require('path');

// Enable auto-reload for Electron during development
require('electron-reload')(path.join(__dirname, '../../public'), {
  electron: path.join(__dirname, '../../node_modules/.bin/electron'),
});

let mainWindow;

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    const serverURL = 'http://localhost:8080/editor/index.html';

    // Retry mechanism to ensure Webpack Dev Server is ready
    const waitForDevServer = async () => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          require('http')
            .get(serverURL, () => {
              clearInterval(interval);
              resolve();
            })
            .on('error', () => {
              console.log('Waiting for Webpack Dev Server...');
            });
        }, 500); // Retry every 500ms
      });
    };

    await waitForDevServer(); // Wait until Webpack Dev Server is ready
    mainWindow.loadURL(serverURL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../public/editor/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
