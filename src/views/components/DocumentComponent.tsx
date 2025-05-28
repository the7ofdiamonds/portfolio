import React from 'react'

import { DocumentURL } from '@/model/DocumentURL';

interface DocumentComponentProps {
    documentURL: DocumentURL;
}

export const DocumentComponent: React.FC<DocumentComponentProps> = ({ documentURL }) => {
    if (!documentURL?.url) return null;

    return (
        <main>
            <iframe
                id="pdf_viewer"
                src={`${documentURL.url}#view=fit`}
                title="PDF Viewer"
                allowFullScreen
                style={{
                    border: 0,
                    margin: 0,
                    padding: 0,
                    display: "block",
                    width: '100%',
                    height: '100%'
                }}
            />
        </main>
    );
};