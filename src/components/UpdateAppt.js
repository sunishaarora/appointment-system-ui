import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import AppointmentService from "../services/ApptService";
import moment from "moment";
import UserService from "../services/UserService";
import Select from "react-select";

const UpdateAppt = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [userIdError, setUserIdError] = useState("");
    const [endTimeError, setEndTimeError]= useState("");
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState({
        id: appointmentId,
        userId: "",
        apptName: "",
        apptType: "",
        description: "",
        startTime: "",
        endTime: "",
        metaData: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value,
        }));
    };

    const handleStartDateChange = (date) => {
        setStartTime(date);
        setEndTimeError("");
    };

    const handleEndDateChange = (date) => {
        setEndTime(date);
        setEndTimeError("");
    };


    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption);
        const selectedUserId = selectedOption ? selectedOption.value : "";
        const user = users.find((user) => user.userId === selectedUserId);
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            userId: selectedUserId,
        }));
        setSelectedUser(user);
        setUserIdError("");
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AppointmentService.getAppt(appointmentId);
                setAppointment(response.data);
                const { startTime, endTime } = response.data;
                setStartTime(moment(startTime).toDate());
                setEndTime(moment(endTime).toDate());
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [appointmentId]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getUsers();
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const user = users.find((user) => user.userId === appointment.userId);
        setSelectedUser(user);
    }, [users, appointment.userId]);

    const validateForm = () => {
        if (!appointment.userId) {
            setUserIdError("User is required.");
            return false;
        }
        return true;
    };

    const updateAppt = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formattedStartDate = moment(startTime).toDate();
        const formattedEndDate = moment(endTime).toDate();

        if (moment(formattedEndDate).isBefore(formattedStartDate)) {
            setUserIdError("");
            setEndTimeError("End time cannot be before start time.");
            return;
        }

        setEndTimeError("");

        const updatedAppointment = {
            ...appointment,
            startTime: formattedStartDate,
            endTime: formattedEndDate,
        };

        AppointmentService.updateAppt(appointment.id,updatedAppointment)
            .then((response) => {
                console.log(response);
                navigate("/apptList");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex max-w-2xl mx-auto shadow border-b">
            <div className="px-8 py-8">
                <div className="font-thin text-2xl tracking-wider">
                    <h1>Update Appointment</h1>
                </div>
                <div className="items-center justify-center h-14 w-full my-4 relative">
                    <label className="block text-gray-600 text-sm font-normal">
                        User {userIdError && <span className="text-red-500 text-sm ml-2">{userIdError}</span>}
                    </label>
                    <Select
                        name="userId"
                        value={selectedUser ? { value: selectedUser.userId, label: `${selectedUser.firstName} ${selectedUser.lastName}` } : null}
                        onChange={handleUserChange}
                        options={users.map((user) => ({
                            value: user.userId,
                            label: `${user.firstName} ${user.lastName}`,
                        }))}
                        isSearchable
                        placeholder="Search and select user..."
                        className={`w-96 mt-2 ${userIdError ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">Appointment Name</label>
                    <input
                        type="text"
                        name="apptName"
                        value={appointment.apptName}
                        onChange={handleChange}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">Appointment Type</label>
                    <input
                        type="text"
                        name="apptType"
                        value={appointment.apptType}
                        onChange={handleChange}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={appointment.description}
                        onChange={handleChange}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">Start Time</label>
                    <Datetime
                        value={startTime}
                        onChange={handleStartDateChange}
                        inputProps={{ }}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        End Time {endTimeError && <span className="text-red-500 text-sm ml-2">{endTimeError}</span>}
                    </label>
                    <Datetime
                        value={endTime}
                        onChange={handleEndDateChange}
                        inputProps={{}}
                        className={`h-10 w-96 border mt-2 px-2 py-2 ${endTimeError ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">Meta Data</label>
                    <input
                        type="text"
                        name="metaData"
                        value={appointment.metaData}
                        onChange={handleChange}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>

                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                    <button
                        onClick={updateAppt}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => navigate("/apptList")}
                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAppt;
