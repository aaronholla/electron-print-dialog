import React from 'react';
import { Form, PDFPreview } from './components';
import classes from './PrintDialog.module.scss';

const PrintDialog = () => (
  <div className={classes.printDialog}>
    <Form />
    {/**
     * TODO: build out a preview method
     * Check electron version.
     * If it supports pdfium native pdf previews use embed if not use pdfjs in PDFPreview Component.
     * Electron pre 3.0.0 supports pdf viewing. not sure how far back it supports it.
     * This native previewing is not reenabled until 9.0.0-beta.3
     * 
     * PREVIEW IS DISABLED FOR NOW
     */}
    {/* <PDFPreview /> */}
    {/* <embed
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#toolbar=1"
      type="application/pdf"
      width="100%"
      height="100%"
    /> */}
  </div>
);

export default PrintDialog;
