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
import FormInputSingleLine from "./../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateAdmin() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            emailAccount: ""
        },
        validationSchema: yup.object().shape({
            emailAccount: yup
                .string()
                .email("Please enter a valid email address.")
                .required("Email is required."),
        }),
        onSubmit: async (data) => {
            await http
                .post("/user/createAdmin", data)
                .then((res) => {
                    console.log(res.status);
                    navigate("/user/adminPanel");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        }
    })

    return (
        <div>
            <ToastContainer />
            <Box component={"form"} onSubmit={formik.handleSubmit}>
                <FormInputSingleLine
                    name="Email Address"
                    valueName="emailAccount"
                    type="text"
                    onChange={ formik.handleChange }
                    value={ formik.values.emailAccount }
                    error={
                        formik.touched.emailAccount && Boolean(formik.errors.emailAccount)
                    }
                    helperText={
                        formik.touched.emailAccount && formik.errors.emailAccount
                    }
                />

                <Box className="w-fit py-1">
                    <Button
                        variant="contained"
                        type="submit"
                        className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
                    >
                        Create Admin
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default CreateAdmin;