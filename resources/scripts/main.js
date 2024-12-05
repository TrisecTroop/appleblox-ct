const Neutralino = require("neutralinojs");
const exec = require("child_process").exec;

// Initialize Neutralino and set tray menu
Neutralino.init();

Neutralino.os.setTrayIcon("/resources/icon.png");

Neutralino.os.setTrayMenu([
    {
        text: "Close Roblox Instances",
        id: "closeRoblox",
        click: function() {
            closeRobloxInstances();
        }
    },
    {
        text: "Quit App",
        id: "quit",
        click: function() {
            Neutralino.app.exit();
        }
    }
]);

// Function to close all Roblox processes
function closeRobloxInstances() {
    if (process.platform === "darwin") {
        // macOS: Use ps and kill to find and terminate Roblox processes
        exec("ps aux | grep Roblox | awk '{print $2}' | xargs kill -9", (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log("Roblox instances closed successfully.");
        });
    } else if (process.platform === "win32") {
        // Windows: Use taskkill to close Roblox processes
        exec("taskkill /F /IM RobloxPlayerBeta.exe", (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log("Roblox instances closed successfully.");
        });
    } else {
        console.log("Unsupported platform for closing Roblox.");
    }
}

Neutralino.events.on("windowClose", () => {
    // Prevent the window from closing, so it minimizes to tray instead
    Neutralino.window.hide();
    return false; // Prevent default behavior
});
