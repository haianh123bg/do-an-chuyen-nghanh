import { useEffect, useRef } from 'react';

const PDFViewer = ({ base64Data }: any) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && base64Data) {
      // Prepare the data with 'data:application/pdf;base64,' prefix
      const pdfData = `data:application/pdf;base64,${base64Data}`;
      iframeRef.current.src = pdfData;
    }
  }, [base64Data]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        ref={iframeRef}
        title="PDF Viewer"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default PDFViewer;
