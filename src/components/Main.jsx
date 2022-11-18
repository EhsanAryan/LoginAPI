import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./Main.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import User from "./User";
import Error from "./Error";

const Main = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user" element={<User />} />
            <Route path="/" element={<User />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default Main;