import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import User from "./User";

function UserList() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteUser = (e, userId) => {
    e.preventDefault();
    UserService.deleteUser(userId)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userId)
        );
        setFilteredUsers((prevUsers) =>
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

  const handleSearch = () => {
    const searchQueryLowercase = searchQuery.toLowerCase().trim();
    const filteredResults = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQueryLowercase) ||
        user.lastName.toLowerCase().includes(searchQueryLowercase) ||
        (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(searchQueryLowercase)
    );
    setFilteredUsers(filteredResults);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/addUser")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          Add User
        </button>
        <div className="flex border border-slate-600 rounded">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="rounded-l px-4 py-2 border-r-0 border-gray-400 focus:outline-none focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            {/* Table header code */}
          </thead>
          {!loading && filteredUsers.length > 0 ? (
            <tbody className="bg-white">
              {filteredUsers.map((user) => (
                <User
                  user={user}
                  deleteUser={deleteUser}
                  editUser={editUser}
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
