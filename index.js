'use strict';

const electron = require('electron');
const PDFJS = require('pdfjs-dist');

module.exports = function () {
  const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserView;
  const ipc = electron.ipcMain || electron.remote.ipcRenderer;
  let printWindow;

  ipc.on('closePrintDialog', () => {
    console.log('Closing Print Window...');
    printWindow.close();
    printWindow = null;
  });

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
    // TODO: instead of putting here run a check at top of file to know if we are in main or renderer
    const path = require('path');
    printWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    printWindow.on('closed', () => (printWindow = null));

    // use data to create a pdf file in the temp dir
    // send url to the window when the dom is ready

    // TODO: move this to react app and use electron.remote
    // const printers = printWindow.webContents.getPrinters();
  };

  const createPDF = (data, type) => {
    /**
     * TODO: This should be automatic in the future it should infer the type based on the data passed in
     * TODO: check if data is Uint8array | url
     * TODO: if its a url make request and read content-type from headers
     * TODO: if its a Uint8Array or pdf document type create a pdf
     * TODO: if its a image type open hidden browser window and printToPDF
     * TODO: if its html open hidden browser window and get outerHTML of the webcontents
     */
    switch (type.toLowerCase()) {
      case 'uint8array':
      case 'pdfurl':
        PDFJS.getDocument(data);
        break;
      default:
        console.error('Unable to create a PDF, you did not pass in a type.')
        break;
    }
  }

  return {
    ...(process && process.type !== 'renderer' && { open }),
    createPDF
  };
}();
