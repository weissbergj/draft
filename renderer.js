console.log('renderer.js loaded');

const authButton = document.getElementById('authButton');
if (authButton) {
    console.log('Button found');
    authButton.addEventListener('click', async () => {
        console.log('Auth button clicked');
        try {
            const authUrl = await window.electronAPI.getAuthUrl();
            console.log('Generated Auth URL:', authUrl);

            // Request the main process to open the auth window
            const code = await window.electronAPI.openAuthWindow(authUrl);
            console.log('Authorization code received:', code);

            const message = await window.electronAPI.handleAuthCallback(code);
            console.log(message);

            // Open Google Drive in a new window
            window.electronAPI.openDriveWindow();
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    });
} else {
    console.error('Button not found in DOM!');
}