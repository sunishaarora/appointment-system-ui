import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import ApptService from "../services/ApptService";

const UserDashboard = ({ userId }) => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    //const { userID } = useParams();

    console.log(userId);

    useEffect(() => {
        console.log("userId:", userId);
        const fetchUserAppointments = async () => {
            try {
                const response = await ApptService.getAllAppts();
                const filteredAppointments = response.data.filter(
                    (appointment) => appointment.userId === Number(userId)
                );
                setAppointments(filteredAppointments);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserAppointments();
    }, [userId]);

    const deleteAppointment = async (id) => {
        try {
            await ApptService.deleteAppt(id);
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };


    const renderAppointments = () => {
        if (loading) {
            return <tr><td colSpan="7">Loading...</td></tr>;
        }

        if (appointments.length === 0) {
            return <tr><td colSpan="7">No appointments found.</td></tr>;
        }

        return appointments.map((appointment) => {
            const startTime = moment(appointment.startTime).format("MMMM Do YYYY, h:mm a");
            const endTime = moment(appointment.endTime).format("MMMM Do YYYY, h:mm a");

            return (
                <tr key={appointment.id}>
                    <td className="py-4 px-6">{appointment.id}</td>
                    <td className="py-4 px-6">{appointment.apptName}</td>
                    <td className="py-4 px-6">{startTime}</td>
                    <td className="py-4 px-6">{endTime}</td>
                    <td className="py-4 px-6">
                        <Link to={`/updateAppt/${appointment.id}`} className="text-indigo-600 hover:text-indigo-800 hover:underline pr-4">Edit</Link>
                        <button onClick={() => deleteAppointment(appointment.id)} className="text-indigo-600 hover:text-indigo-800 hover:underline">Delete</button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-8 text-center">User Dashboard</h1>
            <div className="flex justify-end mb-4">
                <Link
                    to={`/updateUserDetails/${userId}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Update User Details
                </Link>
            </div>
            <div className="bg-white p-8 shadow">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>

            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Appt ID</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Appointment Name</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Start Time</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">End Time</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {renderAppointments()}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default UserDashboard;
