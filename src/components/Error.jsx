import React from 'react';
import "./Error.css";
import "./CommonStyles.css";
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const myNavigate = useNavigate();

    return (
        <div className="main-container green-linear">
            <div className="error-box w-75 text-center bg-light rounded-5 border border-5 border-dark p-4 fs-2">
                <div className='mb-3'>
                    <i class="fa-solid fa-xmark fa-4x"></i>
                </div>
                <div className="mb-4">
                    ERROR! <br />
                    This page not found!
                </div>
                <div className="my-2">
                    <button type="button" className="btn btn-success btn-lg fs-4 px-4"
                    onClick={() => myNavigate("/user")}>
                        User Info
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Error;
