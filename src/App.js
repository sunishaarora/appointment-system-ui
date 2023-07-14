import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<UserList />} />
          <Route path="/" element={<UserList />}></Route>
          <Route path="/userList" element={<UserList />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/editUser/:firstName/:lastName" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;