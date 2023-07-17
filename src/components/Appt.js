import React from "react";
import { useNavigate } from "react-router-dom";

const Appointment = ({ appointment, deleteAppointment }) => {
    const navigate = useNavigate();

    const editAppointment = (e, apptId) => {
        e.preventDefault();
        navigate(`/editAppointment/${apptId}`);
    };

    return (
        <tr>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{appointment.apptName}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{appointment.apptType}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{appointment.description}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{appointment.startTime}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{appointment.endTime}</div>
            </td>
            <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                <a
                    onClick={(e) => editAppointment(e, appointment.id)}
                    className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer"
                >
                    Edit
                </a>
                <a
                    onClick={(e) => deleteAppointment(e, appointment.id)}
                    className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
                >
                    Delete
                </a>
            </td>
        </tr>
    );
};

export default Appointment;
