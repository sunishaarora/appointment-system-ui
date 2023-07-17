import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleUserButtonClick = () => {
    navigate('/UserList');
  };

  const handleApptsButtonClick = () => {
    navigate('/ListAppt');
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-16">
      <div className="space-x-4">
        <button
          onClick={handleUserButtonClick}
          className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-3 px-8 w-48"
        >
          Users
        </button>
        <button
          onClick={handleApptsButtonClick}
          className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-3 px-8 w-48"
        >
          Appointments
        </button>
      </div>
    </div>
  );
};

export default Homepage;
