const { exec } = require('child_process');

// Function to close all Roblox instances
function closeRobloxInstances() {
    exec("pkill -f 'Roblox'", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            Neutralino.os.showMessageBox('Error', 'Failed to close Roblox instances.');
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(`Closed Roblox instances: ${stdout}`);
        Neutralino.os.showMessageBox('Success', 'All Roblox instances have been closed.');
    });
}

// Handle Neutralino.js events
Neutralino.init();
Neutralino.events.on("ready", () => {
    Neutralino.os.setTray({
        icon: '/resources/icon.png', // Add your icon file
        menuItems: [
            { id: 'closeRoblox', text: 'Close Roblox Instances' },
            { id: 'quit', text: 'Quit App' }
        ]
    });
});

Neutralino.events.on("trayMenuItemClicked", (evt) => {
    if (evt.detail.id === 'closeRoblox') {
        closeRobloxInstances();
    } else if (evt.detail.id === 'quit') {
        Neutralino.app.exit();
    }
});
