import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 myNav">
            <a className="navbar-brand me-4"><i className="fa-solid fa-user-tie fa-2x"></i></a>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#hidden-nav">
                    <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse"  id="hidden-nav">
                    <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-center">
                                    <NavLink to="/register" className={({isActive}) => {
                                        return isActive ? "navbar-no-link fs-5 active-link" : "navbar-no-link fs-5"
                                    }}
                                    >
                                        Register
                                    </NavLink>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-center">
                                    <NavLink to="/login" className={({isActive}) => {
                                        return isActive ? "navbar-no-link fs-5 active-link" : "navbar-no-link fs-5"
                                    }}
                                    >
                                        Login
                                    </NavLink>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-center">
                                    <NavLink to="/user" className={({isActive}) => {
                                        return isActive ? "navbar-no-link fs-5 active-link" : "navbar-no-link fs-5"
                                    }}
                                    >
                                        User Info
                                    </NavLink>
                                </a>
                            </li>
                    </ul>
            </div>
        </nav>
    );
}

export default Navbar;