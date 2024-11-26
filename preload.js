const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getAuthUrl: () => ipcRenderer.invoke('get-auth-url'),
    handleAuthCallback: (code) => ipcRenderer.invoke('handle-auth-callback', code),
    openAuthWindow: (authUrl) => ipcRenderer.invoke('open-auth-window', authUrl),
    openDriveWindow: () => ipcRenderer.invoke('open-drive-window')
});