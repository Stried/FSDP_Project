import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./../../../App.css";
import http from "../../../http";
import FormInputSingleLine from "../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserChangePassword() {
    const [ showPassword, setShowPassword ] = React.useState(false);
    const [ showCurrentPassword, setShowCurrentPassword ] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: ""
        },
        validationSchema: yup.object().shape({
            currentPassword: yup.string().min(8, "Password must be a minimum of 8 Characters.").max(30, "Password must be a maximum of 30 characters.").required(),
            password: yup.string().min(8, "Password must be a minimum of 8 Characters.").max(30, "Password must be a maximum of 30 characters.").required(),
        }),
        onSubmit: async (data) => {
            await http
                .put("/user/updatePassword", data)
                .then((res) => {
                    console.log(res.status);
                    navigate("/")
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        }
    });

    return (
        <div className="mx-10 w-1/2">
            <div className="text-white font-medium text-4xl">
                Update Password
            </div>
            <Box component={ "form" } onSubmit={ formik.handleSubmit } >
                <FormInputSingleLine
                    name="Current Password"
                    valueName="currentPassword"
                    type={ showPassword ? "text" : "password" }
                    onChange={ formik.handleChange }
                    value={ formik.values.currentPassword }
                    error={ formik.touched.currentPassword && Boolean(formik.errors.currentPassword) }
                    helperText={ formik.touched.currentPassword && formik.errors.currentPassword }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={ handleClickShowPassword }
                                onMouseDown={ handleMouseDownPassword }
                                edge="end"
                            >
                                { showPassword ? <VisibilityOff /> : <Visibility /> }
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormInputSingleLine
                    name="Updated Password"
                    valueName="password"
                    type={ showPassword ? "text" : "password" }
                    onChange={ formik.handleChange }
                    value={ formik.values.password }
                    error={ formik.touched.password && Boolean(formik.errors.password) }
                    helperText={ formik.touched.password && formik.errors.password }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={ handleClickShowPassword }
                                onMouseDown={ handleMouseDownPassword }
                                edge="end"
                            >
                                { showPassword ? <VisibilityOff /> : <Visibility /> }
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <ToastContainer />

                <Button
                    variant="contained"
                    type="submit"
                    className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
                >
                    Update Password
                </Button>
            </Box>
        </div>
    )
}

export default UserChangePassword;