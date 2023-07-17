import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ user, deleteUser }) => {
  const navigate = useNavigate();

  const editUser = (e, firstName, lastName) => {
    e.preventDefault();
    //navigate(`/editUser/${firstName}/${lastName}`);
    navigate("/editUser/", {state: user});
  };

  return (
    <tr>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.emailAddresses}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.phoneNumbers}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.gender}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.age}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <a
          onClick={(e) => editUser(e, user.firstName, user.lastName)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer"
        >
          Edit
        </a>
        <a
          onClick={(e) => deleteUser(e, user.userId)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default User;
