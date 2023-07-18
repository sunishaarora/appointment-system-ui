import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleUserButtonClick = () => {
    navigate('/UserList');
  };

  const handleApptsButtonClick = () => {
    navigate('/ApptList');
  };

  return (
      <div className="flex flex-col items-center justify-start h-screen pt-16">
        <h1 className="text-4xl text-center font-bold mb-8">Welcome to the Appointment Management System!</h1>
        <div className="space-x-4">
          <button
              onClick={handleUserButtonClick}
              className="rounded text-white font-semibold bg-black hover:bg-gray-900 py-4 px-12 w-72"
          >
            Users
          </button>
          <button
              onClick={handleApptsButtonClick}
              className="rounded text-white font-semibold bg-black hover:bg-gray-900 py-4 px-12 w-72"
          >
            Appointments
          </button>
        </div>
      </div>
  );
};

export default Homepage;
