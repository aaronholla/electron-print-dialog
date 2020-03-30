'use strict';

const path = require('path');
const electron = require('electron');

module.exports = function () {
  const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserView;
  let printWindow;

  const open = (window, { data }) => {
    // TODO: check window is valid
    // TODO: check data is a String or Uint8Array

    console.log('Opening Print Dialog...');

    printWindow = new BrowserWindow({
      width: 900,
      height: 600,
      modal: true,
      frame: false,
      resizable: false,
      parent: window,
      webPreferences: { plugins: true, nodeIntegration: true }
    });
    printWindow.removeMenu();
    printWindow.webContents.openDevTools();
    printWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    printWindow.on('closed', () => (printWindow = null));

    // use data to create a pdf file in the temp dir
    // send url to the window when the dom is ready

    // TODO: move this to react app and use electron.remote
    // const printers = printWindow.webContents.getPrinters();
  };

  return {
    open
  };
}();
