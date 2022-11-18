import React from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import ShowError from "./ShowError";
import axios from "axios";
import "./LoginForm.css";
import "./CommonStyles.css";


const initialValues = {
    phone : "" ,
    password : "" ,
    remember : ["0"]
}

const onSubmit = (values , submitProps) => {
    const validValues = values.remember.length > 1 ? {...values , remember : values.remember[1]} : {...values , remember : values.remember[0]};
    axios.post("https://authservice.azhadev.ir/api/auth/login" , validValues)
    .then(response => {
        if(response.status===200) {
            swal({
                title : "Done!" ,
                icon : "success" ,
                text : "Your login was successful."
            })
            localStorage.setItem("token" , response.data.token);
            submitProps.resetForm();
        }
        else {
            swal({
                title : "Error!" ,
                icon : "error" ,
                text : "The information is not correct!"
            })
        }
        submitProps.setSubmitting(false);
    });
}

const validationSchema = Yup.object({
    phone : Yup.string().required("Fill the Phone number field!").matches(/^[0-9]{11}$/ , "The phone number must a 11 digit number!") ,
    password : Yup.string().required("Fill the password field!")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/ , "The password must contain at least an uppercase character and a number, and must be longer than 8 characters!")
})


const LoginForm = (props) => {
    const {setUserData} = props;

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
                localStorage.removeItem("token");
                setUserData(null);
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
                        <Form className="login-form w-50 bg-light rounded-3 p-2">
                            {localStorage.getItem("token") ? (
                                <div className="warning-div">
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
                                        <i className="fa-solid fa-user fa-3x"></i> 
                                    </div>
                                    <div className="col-12 col-md-10 col-xl-8 mx-auto my-2">
                                        <div className="input-group">
                                            <button type="button" className="btn btn-dark">
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
                                    <div className="col-12 col-md-10 col-xl-8 mx-auto mt-3 mb-2">
                                        <FastField name="remember" id="remember">
                                            {({field}) => {
                                                return (
                                                    <>
                                                        <input type="checkbox" {...field} value="1"
                                                        checked={field.value.includes("1")} />
                                                        <label htmlFor="remember" className="ms-2">Remember Me</label>
                                                    </>
                                                )
                                            }}
                                        </FastField>
                                        
                                    </div>
                                    <div className="col-12 text-center mt-5 mb-3">
                                        <button type="submit" className="btn btn-info btn-lg px-4"
                                        disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} >
                                            {formik.isSubmitting ? (
                                                <div className="spinner-border text-dark">
                                                    <span className="visually-hidden">Loading...</span>
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

export default LoginForm;