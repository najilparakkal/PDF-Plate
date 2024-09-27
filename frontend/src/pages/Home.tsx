import React from 'react';
import PdfShowing from './PdfShowing';

const Home: React.FC = () => {
    return (
        <div
            className="min-h-screen p-5 md:p-10 w-full flex "
            style={{
                backgroundImage: `url("/profiles/blue-background-with-white-line-that-says-blue-it_98870-2625.avif")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="h-full w-full flex flex-col md:flex-row rounded-2xl  backdrop-blur-lg">
                <div className="flex-grow w-full h-full rounded-2xl p-5">
                    <PdfShowing />
                </div>
            </div>
        </div>
    );
};

export default Home;
