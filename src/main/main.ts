import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: BrowserWindow;

const isDev = process.env.ENV === "development";

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 680,
    center: true,
    kiosk: !isDev,
    resizable: true,
    fullscreen: false,
    fullscreenable: true,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (isDev) {
    console.log("여기로 들어오다..");
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "./index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  mainWindow.setResizable(true);

  // Emitted when the window is closed.
  mainWindow.on("closed", () => (mainWindow = undefined!));
  mainWindow.focus();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
