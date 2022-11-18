import { ErrorMessage, FastField, Form, Formik } from "formik";
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import swal from "sweetalert";
import ShowError from "./ShowError";
import "./RegisterForm.css";
import "./CommonStyles.css";
import { useDispatch, useSelector } from "react-redux";


const initialValues = {
    phone : "" ,
    password : "" ,
    c_password : ""
}

const validationSchema = Yup.object({
    phone : Yup.string().required("Fill the Phone number field!").matches(/^[0-9]{11}$/ , "The phone number must a 11 digit number!") ,
    password : Yup.string().required("Fill the password field!")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/ , "The password must contain at least an uppercase character and a number, and must be longer than 8 characters!") ,
    c_password : Yup.string().required("Fill the confirm password field!")
    .oneOf([Yup.ref("password")] , "The password confirmation does not match!")
})


const RegisterForm = () => {
    const {isToken} = useSelector((state) => state);
    const dispatch = useDispatch();

    const onSubmit = (values , submitProps) => {
        axios.post("https://authservice.azhadev.ir/api/auth/register" , values)
        .then(response => {
            if(response.status===200) {
                swal({
                    title : "Done!" ,
                    icon : "success" ,
                    text : "Your registration was successful."
                })
                localStorage.setItem("token" , response.data.token);
                dispatch({type : "get-token"});
                submitProps.resetForm();
            }
            else if(response.status===202) {
                if(response.data.phone) {
                    swal({
                        title : "Error!" ,
                        icon : "error" , 
                        text : "The phone number is duplicated."
                    })
                }
            }
            else {
                swal({
                    title : "Error!" ,
                    icon : "error" ,
                    text : "Something went wrong."
                })
            }
            submitProps.setSubmitting(false);
        });
    }

    const handleLogout = () => {
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
                localStorage.removeItem("token");
                dispatch({type : "no-data"});
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
        <div className="main-container blue-linear">
            <Formik
            initialValues={initialValues}
            onSubmit={(values , submitProps , dispatch) => onSubmit(values , submitProps , dispatch)}
            validationSchema={validationSchema}
            validateOnMount
            >
            {(formik) => {
                return (
                    <Form className="register-form w-50 bg-light rounded-3 p-2">
                        {isToken ? (
                            <div className=" warning-div">
                                <div className="w-100 fs-3 text-center">
                                    You are already in your account.
                                </div>
                                <button type="button" className="btn btn-danger btn-lg mt-3"
                                onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-12 text-center mt-3 mb-5">
                                    <i class="fa-solid fa-user-plus fa-3x"></i>
                                </div>
                                <div className="col-12 col-md-10 col-xl-8 mx-auto my-2">
                                    <div class="input-group">
                                            <button type="button" class="btn btn-dark">
                                                    +98
                                            </button>
                                            <FastField type="phone" className="form-control" name="phone" id="phone"
                                            placeholder="Phone number" />
                                    </div>
                                    <ErrorMessage name="phone" component={ShowError} />
                                </div>
                                <div className="col-12 col-md-10 col-xl-8 mx-auto my-2">
                                    <FastField type="password" className="form-control" name="password" id="password"
                                    placeholder="Password" />
                                    <ErrorMessage name="password" component={ShowError} />
                                </div>
                                <div className="col-12 col-md-10 col-xl-8 mx-auto my-2">
                                    <FastField type="password" className="form-control" name="c_password" id="c_password"
                                    placeholder="Confirm Password" />
                                    <ErrorMessage name="c_password" component={ShowError} />
                                </div>
                                <div className="col-12 text-center mt-5 mb-3">
                                    <button type="submit" className="btn btn-info btn-lg px-4"
                                    disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} >
                                        {formik.isSubmitting ? (
                                            <div class="spinner-border text-dark">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        ) : "Submit"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </Form>
                )
            }}
            </Formik>
        </div>
    );
}

export default RegisterForm;