import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
    
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    let userInfo = () => {
        http.get("/user/auth").then((res) => {
            return res.data.user;
        });
    }
    
    const formik = useFormik({
        initialValues: {
            fullName: "",
            userName: "",
            phoneNo: "",
            emailAccount: "",
            password: ""
        },
        enableReinitialize: true,
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
                    logout()
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
                            name="Full Name"
                            valueName="fullName"
                            type="text"
                            onChange={formik.handleChange}
                            initialValues={user.fullName}
                            value={formik.values.fullName}
                            error={
                                formik.touched.fullName && Boolean(formik.errors.fullName)
                            }
                            helperText={
                                formik.touched.fullName && formik.errors.fullName
                            }
                        />
                        <FormInputSingleLine
                            name="Username"
                            valueName="userName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            error={
                                formik.touched.userName && Boolean(formik.errors.userName)
                            }
                            helperText={
                                formik.touched.userName && formik.errors.userName
                            }
                        />
                        <FormInputSingleLine
                            name="Email Address"
                            valueName="emailAccount"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.emailAccount}
                            error={
                                formik.touched.emailAccount && Boolean(formik.errors.emailAccount)
                            }
                            helperText={
                                formik.touched.emailAccount && formik.errors.emailAccount
                            }
                        />
                        <FormInputSingleLine
                            name="Phone Number"
                            valueName="phoneNo"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.phoneNo}
                            error={
                                formik.touched.phoneNo && Boolean(formik.errors.phoneNo)
                            }
                            helperText={
                                formik.touched.phoneNo && formik.errors.phoneNo
                            }
                        />
                        <FormInputSingleLine
                            name="Password"
                            valueName="password"
                            type={showPassword ? "text" : "password"}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Box className="w-1/4 py-1">
                            <Button
                                variant="contained"
                                type="submit"
                                className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
                            >
                                Update Details
                            </Button>
                        </Box>
                    </Box>
                </div>
            )}

        </div>
    )
}

export default ChangeAccountDetails