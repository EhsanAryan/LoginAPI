import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./Main.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import User from "./User";
import Error from "./Error";

const Main = () => {
    const [userData , setUserData] = useState(null);

    return (
        <Routes>
            <Route path="/register" element={<RegisterForm userData={userData} setUserData={setUserData} />} />
            <Route path="/login" element={<LoginForm userData={userData} setUserData={setUserData} />} />
            <Route path="/user" element={<User userData={userData} setUserData={setUserData} />} />
            <Route path="/" element={<User userData={userData} setUserData={setUserData} />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default Main;