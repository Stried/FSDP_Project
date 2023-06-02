import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import "./../../../App.css";
import http from "../../../http";
import FormInputSingleLine from "./../../../components/FormInputSingleLine";

import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangeAccountDetails() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            // Todo: Get user data from server
            http.get("/user/auth").then((res) => {
                setUser(res.data.user);
            });
        } else {
            navigate("/user/login");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    let userInfo = user

    const formik = useFormik({
        initialValues: {
            fullName: "",
            userName: "",
            phoneNo: "",
            emailAccount: "",
            password: ""
        },
        validationSchema: yup.object().shape({
            fullName: yup
                .string()
                .trim()
                .min(3, "Name must be Minimum 3 Characters.")
                .max(100, "Name must be Maximum 100 Characters")
                .required("Name is required."),
            userName: yup
                .string()
                .trim()
                .min(3, "Name must be Minimum 3 Characters.")
                .max(50, "Name must be Maximum 50 Characters")
                .required("Name is required."),
            phoneNo: yup
                .number()
                .typeError("Phone number must be a Singapore Number.")
                .integer("Phone number must be a Singapore Number.")
                .min(80000000, "Phone Number must be a Singapore Number.")
                .max(99999999, "Phone Number must be a Singapore Number.")
                .required("Phone Number is required."),
            emailAccount: yup
                .string()
                .email("Please enter a valid email address.")
                .required("Email is required."),
            password: yup
                .string()
                .min(8, "Passwords must be at least 8 characters.")
                .max(30, "Passwords must be at most 30 characters.")
                .required(),
        }),
        onSubmit: (data) => {
            data.fullName = data.fullName.trim();
            data.userName = data.userName.trim();
            data.phoneNo = data.phoneNo.trim();
            data.emailAccount = data.emailAccount.trim();
            data.password = data.password.trim();

            http
                .put("/user/viewAccount/changeDetails", data)
                .then((res) => {
                    console.log(res.data);
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    return (
        <div className="text-white">
            {user && (
                <div>
                    <h1 className="text-3xl font-medium">
                        Change User Details
                    </h1> 
                    <Box component={"form"} onSubmit={formik.handleSubmit} className="w-2/3">
                        <FormInputSingleLine
                            name="Email Address"
                            valueName="emailAccount"
                            type="text"
                            defaultValue={user.emailAccount}
                            onChange={formik.handleChange}
                            value={formik.values.emailAccount}
                            error={
                                formik.touched.emailAccount && Boolean(formik.errors.emailAccount)
                            }
                            helperText={
                                formik.touched.emailAccount && formik.errors.emailAccount
                            }
                        />
                    </Box>
                </div>
            )}

        </div>
    )
}

export default ChangeAccountDetails