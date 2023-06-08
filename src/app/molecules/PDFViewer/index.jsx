import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default (props) => {
  const { pdf } = props;
  const [numPages, setNumPages] = useState(null);
  const [pdfFile, setPDFFile] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (pdf) {
      setPDFFile(pdf);
    }
  }, [pdf]);

  return (
    <div>
      {/* <iframe frameborder="0" height="600px" width="100%" src={`${pdfFile}`}></iframe> */}
      {/* <object width="100%" height="600px" data={`${pdfFile}#toolbar=0&navpanes=0&view=FitH`} type="application/pdf"></object> */}
      {/* <object width="100%" height="600px" type="application/pdf" trusted="yes" application="yes" title="Assembly" data={`${pdfFile}?#toolbar=0&navpanes=0`}></object> */}
      <Document
        className="pdf-view"
        file={{
          url: `https://cors.limkokwing.net/${pdfFile}`,
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page scale={5} key={`page_${index + 1}`} pageNumber={index + 1} width={500} devicePixelRatio={72} />
        ))}
      </Document>
    </div>
  );
};
