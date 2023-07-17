import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import UpdateUser from "./components/UpdateUser";
import ListAppt from "./components/ListAppt";
import UpdateAppt from "./components/UpdateAppt";
import AddAppt from "./components/AddAppt";
import Homepage from "./components/Homepage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Homepage" element={<Homepage />} />
                <Route path="/userList" element={<UserList />} />
                <Route path="/addUser" element={<AddUser />} />
                <Route path="/editUser" element={<UpdateUser />} />
                <Route path="/apptList" element={<ListAppt />} />
                <Route path="/addAppt" element={<AddAppt />} />
                <Route path="/updateAppt/:appointmentId" element={<UpdateAppt />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
