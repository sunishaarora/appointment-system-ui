import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../imgs/background.jpg';

const Homepage = () => {
    const navigate = useNavigate();

    const handleUserButtonClick = () => {
        navigate('/UserList');
    };

    const handleApptsButtonClick = () => {
        navigate('/ApptList');
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="text-5xl text-white font-bold mb-8">
                Welcome to the Appointment Management System!
            </h1>
            <div className="space-x-4">
                <button
                    onClick={handleUserButtonClick}
                    className="rounded text-white font-semibold bg-gray-800 py-4 px-12 w-72 border-white"
                    style={{ border: '2px solid', borderColor: 'white' }}
                >
                    Users
                </button>
                <button
                    onClick={handleApptsButtonClick}
                    className="rounded text-white font-semibold bg-gray-800 py-4 px-12 w-72 border-white"
                    style={{ border: '2px solid', borderColor: 'white' }}
                >
                    Appointments
                </button>
            </div>
        </div>
    );
};

export default Homepage;
