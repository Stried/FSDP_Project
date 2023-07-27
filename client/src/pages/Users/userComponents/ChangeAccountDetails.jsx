import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';
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
    const [ user, setUser ] = useState(null);
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

    const [ userInfo, setUserInfo ] = useState({
        fullName: "",
        userName: "",
        emailAccount: "",
        phoneNo: ""
    })
    const [ imageFile, setImageFile ] = React.useState(null)

    useEffect(() => {
        http.get("/user/viewAccount/changeDetails")
            .then((res) => {
                console.log(res.data);
                setUserInfo(res.data);
            })
            .catch(function (error) {
                console.log(error.response.data.message);
            });
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location = "/";
        window.location.reload;
    };

    const onFileChange = (e) => {
        let file = e.target.files[ 0 ];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB');
                return;
            }
            let formData = new FormData();
            formData.append('file', file);
            http.post("/file/upload", formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            .then((res) => {
                console.log(res.data);
                setImageFile(res.data.filename);
            })
            .catch(function (error) {
                console.log(error.response);
            })
        }
    }

    const formik = useFormik({
        initialValues: userInfo,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            fullName: yup
                .string()
                .trim()
                .min(3, "Name must be Minimum 3 Characters.")
                .max(100, "Name must be Maximum 100 Characters")
                .nullable(),
            userName: yup
                .string()
                .trim()
                .min(3, "Name must be Minimum 3 Characters.")
                .max(50, "Name must be Maximum 50 Characters")
                .nullable(),
            phoneNo: yup
                .number()
                .typeError("Phone number must be a Singapore Number.")
                .integer("Phone number must be a Singapore Number.")
                .min(80000000, "Phone Number must be a Singapore Number.")
                .max(99999999, "Phone Number must be a Singapore Number.")
                .nullable(),
            emailAccount: yup
                .string()
                .email("Please enter a valid email address.")
                .nullable(),
        }),
        onSubmit: (data) => {
            data.fullName = data.fullName.trim();
            if (Object.is(data.fullName, null)) {
                data.fullName = user.fullName;
            }
            data.userName = data.userName.trim();
            if (Object.is(data.userName, null)) {
                data.userName = user.userName;
            }
            data.phoneNo = data.phoneNo;
            if (Object.is(data.phoneNo, null)) {
                data.phoneNo = user.phoneNo;
            }
            data.emailAccount = data.emailAccount.trim();
            if (Object.is(data.emailAccount, null)) {
                data.emailAccount = user.emailAccount;
            }
            if (imageFile) {
                data.imageFile = imageFile;
            }

            http
                .put("/user/viewAccount/changeDetails", data)
                .then((res) => {
                    navigate("/")
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    return (
        <div className="text-slate-300">
            {user && (
                <div className=" bg-slate-900 w-fit border-slate-300 border-2 border-solid py-5 px-6 rounded-lg">
                    <h1 className="text-3xl font-medium">
                        Change User Details
                    </h1>
                    <Box
                        component={"form"}
                        onSubmit={formik.handleSubmit}
                        className="w-2/3"
                    >
                        <FormInputSingleLine
                            name="Full Name"
                            valueName="fullName"
                            type="text"
                            onChange={formik.handleChange}
                            initialValues={user.fullName}
                            value={formik.values.fullName}
                            error={
                                formik.touched.fullName &&
                                Boolean(formik.errors.fullName)
                            }
                            helperText={
                                formik.touched.fullName &&
                                formik.errors.fullName
                            }
                        />
                        <FormInputSingleLine
                            name="Username"
                            valueName="userName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            error={
                                formik.touched.userName &&
                                Boolean(formik.errors.userName)
                            }
                            helperText={
                                formik.touched.userName &&
                                formik.errors.userName
                            }
                        />
                        <FormInputSingleLine
                            name="Phone Number"
                            valueName="phoneNo"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.phoneNo}
                            error={
                                formik.touched.phoneNo &&
                                Boolean(formik.errors.phoneNo)
                            }
                            helperText={
                                formik.touched.phoneNo && formik.errors.phoneNo
                            }
                        />

                        <div className="my-3">
                            <Button
                                component="label"
                                className="bg-green-500 text-slate-300 px-2 py-1 rounded text-xl border-transparent border-2 border-solid hover:border-green-500 hover:border-2 hover:border-solid font-medium hover:transition-ease-in-out duration-300"
                            >
                                Add/Change Profile Image
                                <input
                                    hidden
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={onFileChange}
                                />
                            </Button>
                        </div>
                        {imageFile && (
                            <AspectRatio sx={{ mt: 2 }}>
                                <Box
                                    component="img"
                                    alt="tutorial"
                                    src={`${
                                        import.meta.env.VITE_FILE_BASE_URL
                                    }${imageFile}`}
                                ></Box>
                            </AspectRatio>
                        )}

                        <Box className="w-1/4 py-1 mt-3">
                            <Button
                                variant="contained"
                                type="submit"
                                className="bg-sky-400 text-black hover:bg-sky-600 hover:text-white"
                            >
                                Change Details
                            </Button>
                        </Box>
                    </Box>
                    <ToastContainer />
                </div>
            )}
        </div>
    );
}

export default ChangeAccountDetails