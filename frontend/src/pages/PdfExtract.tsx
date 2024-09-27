import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import './Sroll.css';
import toast, { Toaster } from 'react-hot-toast';
import { uploadPdf } from '../api/Service';
import { useAppSelector } from '../helpers/CostumHook';
import { useNavigate } from 'react-router-dom';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

interface PdfExtractProps {
    selectedFile: File | null;
    onUploadSuccess: () => void;
}

const PdfExtract: React.FC<PdfExtractProps> = ({ selectedFile, onUploadSuccess }) => {
    const [pages, setPages] = useState<string[]>([]);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const { email } = useAppSelector((state) => state.user);
    const navigate = useNavigate()
    useEffect(() => {
        if (selectedFile) {
            const loadPdf = async () => {
                const fileReader = new FileReader();
                fileReader.onload = async function () {
                    const typedarray = new Uint8Array(this.result as ArrayBuffer);
                    const pdfDoc = await pdfjsLib.getDocument(typedarray).promise;
                    const numPages = pdfDoc.numPages;
                    const loadedPages: string[] = [];

                    for (let i = 1; i <= numPages; i++) {
                        const page = await pdfDoc.getPage(i);
                        const viewport = page.getViewport({ scale: 0.5 });
                        const canvas = document.createElement('canvas');
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        const context = canvas.getContext('2d');

                        if (context) {
                            await page.render({ canvasContext: context, viewport }).promise;
                            loadedPages.push(canvas.toDataURL('image/png'));
                        }
                    }

                    setPages(loadedPages);
                };
                fileReader.readAsArrayBuffer(selectedFile);
            };
            loadPdf();
        }
    }, [selectedFile]);

    const handleCheckboxChange = (pageIndex: number) => {
        setSelectedPages((prev) =>
            prev.includes(pageIndex) ? prev.filter((p) => p !== pageIndex) : [...prev, pageIndex]
        );
    };

    const handleExtractPages = async () => {
        if (!selectedFile) return;
        if (selectedPages.length === 0) {
            alert('Please select at least one page.');
            return;
        }

        const pdfDoc = await PDFDocument.load(await selectedFile.arrayBuffer());
        const newPdfDoc = await PDFDocument.create();

        for (const pageIndex of selectedPages) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
            newPdfDoc.addPage(copiedPage);
        }

        const pdfBytes = await newPdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async function () {
            const base64data = reader.result;

            // Call uploadPdf and handle the result
            const uploadSuccess = await toast.promise(
                uploadPdf(base64data+"", email+""),
                {
                    loading: 'Uploading PDF...',
                    success: () => 'PDF uploaded successfully!',
                    error: 'Failed to upload PDF.',
                }
            );

            if (uploadSuccess) {
                // If upload was successful, download the PDF
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'extracted_pages.pdf';
                link.click();
                onUploadSuccess();
            } else {
                navigate('/');
            }
        };
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full p-4 grid grid-cols-1 md:grid-cols-3 gap-4 h-[90%] overflow-y-auto scrollbar-hide">
                {pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="relative w-full h-64 border bg-white flex flex-col items-center justify-center">
                        <img src={page} alt={`Page ${pageIndex + 1}`} className="w-full h-full object-contain" />
                        <input
                            type="checkbox"
                            checked={selectedPages.includes(pageIndex)}
                            onChange={() => handleCheckboxChange(pageIndex)}
                            className="absolute top-1 right-1 w-4 h-4"
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleExtractPages}
                className="bg-blue-500 hover:bg-blac k hover:text-white transition-all text-white p-3   rounded-lg"
            >
                Extract Selected Pages
            </button>
        </div>
    );
};

export default PdfExtract;
