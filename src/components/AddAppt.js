import React, {useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import AppointmentService from "../services/ApptService";
import UserService from "../services/UserService";
import Select from "react-select";

const AddAppt = () => {
    const [users, setUsers] = useState([]);
    const startDatetimeRef = useRef(null);
    const endDatetimeRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState({});
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startDatetime, setStartDatetime] = useState(null);
    const [endDatetime, setEndDatetime] = useState(null);
    const [userIdError, setUserIdError] = useState("");
    const [startTimeError, setStartTimeError] = useState("");
    const [endTimeError, setEndTimeError]= useState("");
    const [appointment, setAppointment] = useState({
        userId: "",
        apptName: "",
        apptType: "",
        description: "",
        startTime: null,
        endTime: null,
        metaData: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setAppointment({ ...appointment, [e.target.name]: value });
    };

    const handleStartDateChange = (date) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            startTime: date,
        }));
        setStartTimeError("");
        setEndTimeError("");
    };

    const handleEndDateChange = (date) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            endTime: date,
        }));
        setStartTimeError("");
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
        const user = users.find((user) => user.userId === appointment.userId);
        setSelectedUser(user);
    }, [users, appointment.userId]);

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

    const validateForm = () => {
        let isValid = true;

        if (!appointment.userId) {
            setUserIdError("User is required.");
            isValid = false;
        } else {
            setUserIdError("");
        }

        if (!appointment.startTime) {
            setStartTimeError("Start time is required.");
            isValid = false;
        } else {
            setStartTimeError("");
        }

        if (!appointment.endTime) {
            setEndTimeError("End time is required.");
            isValid = false;
        } else {
            setEndTimeError("");
        }

        return isValid;
    };

    const saveAppointment = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formattedStartDate = moment(appointment.startTime).toDate();
        const formattedEndDate = moment(appointment.endTime).toDate();

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

        AppointmentService.saveAppointment(updatedAppointment)
            .then((response) => {
                console.log(response);
                navigate("/apptList");
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const clearDate = (ref, setter) => {
        if (ref.current) {
            ref.current.setState({ inputValue: "" });
        }
        setter(null);
    };

    const reset = (e) => {
        e.preventDefault();
        clearDate(startDatetimeRef, setStartDatetime);
        clearDate(endDatetimeRef, setEndDatetime);
        setAppointment({
            userId: "",
            apptName: "",
            apptType: "",
            description: "",
            startTime: null,
            endTime: null,
            metaData: "",
        });
        setUserIdError("");
        setStartTimeError("");
        setEndTimeError("");
    };



    return (
        <div className="flex max-w-2xl mx-auto shadow border-b">
            <div className="px-8 py-8">
                <div className="font-thin text-2xl tracking-wider">
                    <h1>Add New Appointment</h1>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
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
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: userIdError ? "1px solid #e53e3e" : "1px solid #ccc",
                                borderRadius: "4px",
                            }),
                        }}
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Appointment Name
                    </label>
                    <input
                        type="text"
                        name="apptName"
                        value={appointment.apptName}
                        onChange={handleChange}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Appointment Type
                    </label>
                    <input
                        type="text"
                        name="apptType"
                        value={appointment.apptType}
                        onChange={handleChange}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={appointment.description}
                        onChange={handleChange}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Start Time {startTimeError && <span className="text-red-500 text-sm ml-2">{startTimeError}</span>}
                    </label>
                    <Datetime
                        value={appointment.startTime}
                        onChange={handleStartDateChange}
                        inputProps={{ }}
                        className={`h-10 w-96 border mt-2 px-2 py-2 ${startTimeError ? 'border-red-500' : ''}`}
                        ref={startDatetimeRef}
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        End Time {endTimeError && <span className="text-red-500 text-sm ml-2">{endTimeError}</span>}
                    </label>
                    <Datetime
                        value={appointment.endTime}
                        onChange={handleEndDateChange}
                        inputProps={{ }}
                        className={`h-10 w-96 border mt-2 px-2 py-2 ${endTimeError ? 'border-red-500' : ''}`}
                        ref={endDatetimeRef}
                    />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Meta Data
                    </label>
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
                        onClick={saveAppointment}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                    >
                        Save
                    </button>
                    <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAppt;
