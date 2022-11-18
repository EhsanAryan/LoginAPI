import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./User.css";
import "./CommonStyles.css";
import swal from "sweetalert";


 const User = (props) => {
    const {userData , setUserData} = props;

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            return;
        }

        axios.get("https://authservice.azhadev.ir/api/auth/user" , {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {;
            if(response.status===200) {
                setUserData(response.data);
            }
            else {
                setUserData(null);
            }
        })
        .catch(err => {
            setUserData(null);
        })
    }, []);

    const handleLogout = () =>{
        axios.get("https://authservice.azhadev.ir/api/auth/logout" , {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            if(response.status===200) {
                swal({
                    title : "Done!" ,
                    icon : "success" , 
                    text : "You have successfully logged out."
                })
                setUserData(null);
                localStorage.removeItem("token");
            }
            else {
                swal({
                    title : "Error!" ,
                    icon : "error" ,
                    text : "Something went wrong! Try again."
                })
            }
        })
        .catch(err => {
            swal({
                title : "Error!" ,
                icon : "error" ,
                text : "Something went wrong! Try again."
            })
        })
    }


  return (
    <div className="main-container green-linear">
        <div className="show-info bg-light p-2 rounded-3 w-50">
            {userData ? (
                <div className="row">
                    <h1 className="col-12 my-3 text-center info-title">User Information</h1>
                    <div className="col-12 my-4">
                        <div className="text-center my-4 fs-5">
                            <div>
                                Phone :
                            </div>
                            <div className="info-span mt-1 btn btn-info btn-lg">
                                {userData.phone}
                            </div>
                        </div>
                        <div className="text-center my-4 fs-5">
                            <div>
                                ID :
                            </div>
                            <div className="info-span mt-1 btn btn-info btn-lg">
                                {userData.id}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4 mb-3 text-center">
                        <button type="button" className="btn btn-danger btn-lg"
                        onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <h1 className="col-12 mt-3 mb-5 text-center info-title">No User!</h1>
                    <div className="col-12 my-3 text-center fs-4">
                        Have you already created an account? <br />
                        <button type="button" className=" my-2 btn btn-info btn-lg">
                            <Link to="/login" className="no-link text-dark">
                                Login
                            </Link>
                        </button>
                    </div>
                    <div className="col-12 my-3 text-center fs-4">
                        You haven't registered yet? <br />
                        <button type="button" className=" my-2 btn btn-success btn-lg">
                            <Link to="/register" className="no-link text-light">
                                Register
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default User;
