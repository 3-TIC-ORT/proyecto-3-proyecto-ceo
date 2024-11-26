import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const PdfViewer = ({ fileUrl }) => {
    const defaultLayout = defaultLayoutPlugin();

    console.log(fileUrl);

    return (
        <div style={{ height: '85%', width: '90%' }}>
            <Viewer fileUrl={fileUrl} plugins={[defaultLayout]} />
        </div>
    );
};
export default PdfViewer;
