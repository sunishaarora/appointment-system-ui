import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApptService from "../services/ApptService";
import UserService from "../services/UserService";
import moment from "moment";

const ListAppt = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [appts, setAppts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("Appointment Name");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApptService.getAllAppts();
                setAppts(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const deleteAppt = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");

        if (confirmDelete) {
            ApptService.deleteAppt(id)
                .then(() => {
                    setAppts((prevAppts) => prevAppts.filter((appt) => appt.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    const fetchUserName = async (userId) => {
        try {
            const response = await UserService.getUsers();
            const users = response.data;
            const user = users.find((user) => user.userId === userId);

            if (user) {
                return `${user.firstName} ${user.lastName}`;
            } else {
                return "Unknown User";
            }
        } catch (error) {
            console.log(error);
            return "Unknown User";
        }
    };


    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchOption = (event) => {
        setSearchOption(event.target.value);
    };

    const searchAppts = async () => {
        setLoading(true);

        try {
            let filteredAppts = [];

            switch (searchOption) {
                case "Appointment Name":
                    filteredAppts = appts.filter((appt) => {
                        const apptName = appt.apptName ? appt.apptName.toLowerCase() : "";
                        return apptName.includes(searchTerm.toLowerCase());
                    });
                    break;
                case "Appointment ID":
                    filteredAppts = appts.filter((appt) => appt.id === Number(searchTerm));
                    break;
                case "User ID":
                    filteredAppts = appts.filter((appt) => appt.userId === Number(searchTerm));
                    break;
                case "User's Name":
                    filteredAppts = await Promise.all(
                        appts.map(async (appt) => {
                            const userName = await fetchUserName(appt.userId);
                            return userName.toLowerCase().includes(searchTerm.toLowerCase()) ? appt : null;
                        })
                    );
                    filteredAppts = filteredAppts.filter((appt) => appt !== null);
                    break;
                default:
                    break;
            }

            setAppts(filteredAppts);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);

    };


    const resetSearch = async () => {
        setSearchTerm("");
        //setSearchOption("Appointment Name");
        setLoading(true);

        try {
            const response = await ApptService.getAllAppts();
            setAppts(response.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const renderApptRows = () => {
        return appts.map((appointment) => {
            const startTime = moment(appointment.startTime).format("MMMM Do YYYY, h:mm a");
            const endTime = moment(appointment.endTime).format("MMMM Do YYYY, h:mm a");

            return (
                <tr key={appointment.id}>
                    <td className="py-4 px-6">{appointment.id}</td>
                    <td className="py-4 px-6">{appointment.userId}</td>
                    <td className="py-4 px-6">
                        <PromiseComponent promise={fetchUserName(appointment.userId)} />
                    </td>
                    <td className="py-4 px-6">{appointment.apptName}</td>
                    <td className="py-4 px-6">{startTime}</td>
                    <td className="py-4 px-6">{endTime}</td>
                    <td className="py-4 px-6">
                        <Link
                            to={`/updateAppt/${appointment.id}`}
                            className="text-indigo-600 hover:text-indigo-800 hover:underline pr-4"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => deleteAppt(appointment.id)}
                            className="text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    };

    const PromiseComponent = ({ promise }) => {
        const [resolvedValue, setResolvedValue] = useState(null);

        useEffect(() => {
            promise.then((value) => {
                setResolvedValue(value);
            });
        }, [promise]);

        return <span>{resolvedValue}</span>;
    };

    return (
        <div className="container mx-auto my-8">
            <div className="h-12">
                <Link
                    to="/addAppt"
                    className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
                >
                    Add Appointment
                </Link>
            </div>
            <div className="h-12"></div>
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <label htmlFor="search" className="mr-2 font-medium text-gray-500">
                        Search:
                    </label>
                    <select
                        id="searchOption"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={searchOption}
                        onChange={handleSearchOption}
                    >
                        <option value="Appointment Name">Appointment Name</option>
                        <option value="Appointment ID">Appointment ID</option>
                        <option value="User ID">User ID</option>
                        <option value="User's Name">User's Name</option>
                    </select>
                    <input
                        id="search"
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={searchTerm}
                        onChange={handleSearchTerm}
                    />
                    <button
                        className="rounded bg-gray-500 text-white px-4 py-1 ml-2"
                        onClick={searchAppts}
                    >
                        Search
                    </button>
                    <button
                        className="rounded bg-gray-500 text-white px-4 py-1 ml-2"
                        onClick={resetSearch}
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            Appt ID
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            User ID
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            User Name
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            Appointment Name
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            Start Time
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            End Time
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {loading ? (
                        <tr>
                            <td colSpan="7">Loading...</td>
                        </tr>
                    ) : appts.length > 0 ? (
                        renderApptRows()
                    ) : (
                        <tr>
                            <td colSpan="7">No appointments found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListAppt;
