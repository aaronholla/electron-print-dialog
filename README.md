# electron-print-dialog

> A library to add a print dialog to your [Electron](https://electronjs.org) app

## Install

```
$ npm install --save electron-print-dialog
```

## Usage

```js
const printDialog = require('electron-print-dialog');
let window;

app.on('ready', function() {
  // Create the parent window
  window = new BrowserWindow({});

  // Attach print listeners to the window
  printDialog.attach(window);
});

// manually open the print dialog
// useful if you have a api request that returns a link to a document and you would like to print it.
printDialog.open(window, {
  data:
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
});
```

## API

### `printDialog.attach(window)` *Not Implemented

Add print listeners to the given `BrowserWindow` to override the default print behavior.

### `printDialog.open(window, options)`

Open the print dialog for the given window and print listeners to the given `BrowserWindow`.

- `window` [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md) (**required**)- The window to use as the parent window for the print dialog.

- `options` Object (optional)

  - `data` (Uint8Array | String)(optional) - PDF data or a url to print. Supports urls to html, pdf, or png. If not provided the windows webContents will be used instead.

### `printDialog.createPDF(data) => filePath`

Create a pdf in the temporary directory from data. Returns the path to the new file that was created.

- `data` (Uint8Array | String)(**required**) - PDF data or a url to print. Supports urls to html, pdf, or png. If not provided the windows webContents will be used instead.
- `type` (String) - a string that says what type the data is.

### `printDialog.clearAllTemp()` *Not Implemented

Deletes any temp pdf files that have been created.