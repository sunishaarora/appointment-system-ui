import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId: userId,
    firstName: "",
    lastName: "",
    emailAddresses: "",
    phoneNumbers: "",
    gender: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  const updateUser = (e) => {
    e.preventDefault();
    UserService.updateUser(user.userId, user) // Pass the userId and user object
      .then((response) => {
        navigate("/userList");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update User</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email Addresses
          </label>
          <input
            type="email"
            name="emailAddresses"
            value={user.emailAddresses}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Phone Numbers
          </label>
          <input
            type="text"
            name="phoneNumbers"
            value={user.phoneNumbers}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">Age</label>
          <input
            type="text"
            name="age"
            value={user.age}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateUser}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/userList")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
