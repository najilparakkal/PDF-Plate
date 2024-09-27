import React, { useState } from 'react';
import PdfExtract from './PdfExtract';
import { useAppSelector } from '../helpers/CostumHook';
import './Sroll.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/UserSlice';
import { useDispatch } from 'react-redux';

const PdfShowing = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isCreateNewClicked, setIsCreateNewClicked] = useState(false);
    const [_uploadSuccess, setUploadSuccess] = useState(false);
    const navigate = useNavigate()
    const { userName, email } = useAppSelector((state) => state.user);
    const dispatch = useDispatch()
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setUploadSuccess(false);
        } else {
            alert('Please upload a valid PDF file');
        }
    };

    const handleCreateNewClick = () => {
        if (selectedFile) {
            setIsCreateNewClicked(true);
        } else {
            alert('Please upload a PDF first!');
        }
    };

    const handleUploadSuccess = () => {
        setUploadSuccess(true);
        setIsCreateNewClicked(false);
    };

     const handLogout = () => {
          dispatch(logout()); 
          navigate("/"); 
      };
    return (
        <div className="w-full h-full flex flex-col gap-10 md:gap-40 md:flex-row font-serif">
            <div className="max-w-md p-5 w-full md:w-1/2 rounded-2xl h-full shadow-lg flex flex-col items-center justify-start">
                <div className="flex flex-col p-3 rounded-lg h-auto w-full shadow-lg gap-4">
                    <h2 className="font-bold text-white text-2xl">PDF Plate</h2>
                    <p className="text-xl font-medium text-black">
                        Hello <span className="font-bold">{userName}</span>
                    </p>
                    <p className="text-md font-medium text-gray-800">{email}</p>
                    <button
                        type="button"
                        className="px-1 mt-5 py-2 text-base w-full md:w-1/2 text-white bg-red-700 border rounded-lg hover:bg-red-800"
                        onClick={handLogout}
                    >
                        Logout
                    </button>

                    <div className="md:flex-row flex flex-col mt-5 w-full space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={onFileChange}
                            className="p-2  rounded-lg w-full md:w-2/3 shadow-md text-center"
                        />
                        <button
                            onClick={handleCreateNewClick}
                            className="bg-blue-500 p-2 rounded-lg shadow-md text-white w-full md:w-1/3 hover:bg-black hover:text-white transition-colors"
                        >
                            Create new
                        </button>
                    </div>
                </div>

                <div className="md:flex-row flex flex-col mt-5 w-full h-full rounded-lg shadow-lg space-y-4 md:space-y-0">
                    {selectedFile ? (
                        <iframe
                            src={URL.createObjectURL(selectedFile) + "#toolbar=0"}
                            width="100%"
                            height="100%"
                            className="border rounded shadow-md scrollbar-hide"
                            title="PDF Preview"
                            style={{ minHeight: '200px' }}
                        />
                    ) : (
                        <div className="h-[220px] w-full flex items-center justify-center">
                            <h1 className="font-bold">Upload a PDF</h1>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full   md:flex-grow rounded-2xl shadow-lg h-auto flex flex-col items-center justify-center">
                {isCreateNewClicked && selectedFile ? (
                    <PdfExtract selectedFile={selectedFile} onUploadSuccess={handleUploadSuccess} />
                ) : (
                    <img
                        src="/profiles/664f2487049fe084594083.webp"
                        alt="Placeholder"
                        className="w-80 rounded-xl object-contain"
                    />
                )}
            </div>
        </div>
    );
};

export default PdfShowing;
