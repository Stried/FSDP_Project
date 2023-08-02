import React, { useContext } from "react";
import "./../../../App.css";
import FormInputSingleLine from "./../../../components/FormInputSingleLine";
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
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";

function UserForgetPasswordReset() {
    // https://herewecode.io/blog/react-get-url-params/#:~:text=The%20best%20way%20to%20get,to%20fetch%20the%20query%20parameters.
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("token");

    const [showPassword, setShowPassword] = React.useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: "",
            otpUser: "",
        },
        validationSchema: yup.object().shape({
            password: yup.string().min(8).max(30).required(),
        }),
        onSubmit: async (data) => {
            http.put(`/user/resetPassword?token=${token}`, data)
                .then((res) => {
                    console.log(res.status);
                    navigate("/user/login");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    return (
        <div className="mx-10 py-3">
            <div className="text-4xl text-white font-medium">
                Reset Your Password.
            </div>
            <p className="text-white">
                Please provide the new password and provided OTP to change your
                password.
            </p>

            <Box
                component={"form"}
                onSubmit={formik.handleSubmit}
                className="w-1/2"
            >
                <FormInputSingleLine
                    name="New Password"
                    valueName="password"
                    type={showPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
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
    );
}

export default UserForgetPasswordReset;
