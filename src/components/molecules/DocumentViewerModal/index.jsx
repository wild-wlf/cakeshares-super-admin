import React, { useState } from 'react';
import Image from 'next/image';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Loader from '../Loader';

const DocumentViewerModal = ({ documentToPreview }) => {
  const [loading, setLoading] = useState(true);
  const fileExtension = documentToPreview.split('?')[0].split('.').pop().toLowerCase();

  function onImageLoad() {
    setLoading(false);
  }

  return (
    <div className="modal">
      <div className="modal-content">
        {documentToPreview && (
          <div className="document-viewer">
            {fileExtension === 'pdf' ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div>
                  <Viewer fileUrl={documentToPreview} />
                </div>
              </Worker>
            ) : (
              <div>
                <Image src={documentToPreview} width={800} height={800} alt="Document" onLoad={onImageLoad} />
                {loading && <Loader />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewerModal;
