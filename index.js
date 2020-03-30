'use strict';

const path = require('path');
const electron = require('electron');
const PDFJS = require('pdfjs-dist');

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

  const createPDF = (data) => {
    // check if data is Uint8array | url
    // if its a url make request and read content-type from headers
    // if its a Uint8Array or pdf document type create a pdf
    PDFJS.getDocument(data);

    // TODO: if its a image type open hidden browser window and printToPDF
    // TODO: if its html open hidden browser window and get outerHTML of the webcontents
  }

  return {
    open
  };
}();
