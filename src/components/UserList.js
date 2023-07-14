import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import User from "./User";

function UserList() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteUser = (e, userId) => {
    e.preventDefault();
    UserService.deleteUser(userId)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editUser = (e, firstName, lastName) => {
    e.preventDefault();
    navigate(`/editUser/${firstName}/${lastName}`);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          onClick={() => navigate("/addUser")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          Add User
        </button>
      </div>
      <div className="h-12"></div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Email Addresses
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Phone Numbers
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Gender
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Age
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && users.length > 0 ? (
            <tbody className="bg-white">
              {users.map((user) => (
                <User
                  user={user}
                  deleteUser={deleteUser}
                  editUser={editUser} // Add the editUser prop
                  key={user.userId}
                />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="7">No users found.</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default UserList;
