import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./../../../App.css";
import http from "../../../http";
import FormInputSingleLine from "./../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserForgetPasswordEmail() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            emailAccount: ""
        },
        validationSchema: yup.object().shape({
            emailAccount: yup.string().email().required(),
        }),
        onSubmit: async (data) => {
            http.post("/user/forgetPassword", data)
                .then((res) => {
                    console.log(res.status);
                    toast.success("Email Sent Successfully!");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`)
            })
        }
    })
    return (
        <div className="mx-10 py-3">
            <div className="text-4xl text-white font-medium">
                Forgot Your Password?
            </div>
            <p className="text-white">
                Enter your account's email address and we will send an email for a password reset
            </p>
            <Box component={ "form" } onSubmit={ formik.handleSubmit } className="w-1/2" >
                <FormInputSingleLine
                    name="Email Account"
                    valueName="emailAccount"
                    type={ "text" }
                    onChange={ formik.handleChange }
                    value={ formik.values.emailAccount }
                    error={ formik.touched.emailAccount && Boolean(formik.errors.emailAccount) }
                    helperText={ formik.touched.emailAccount && formik.errors.emailAccount }
                />
                <ToastContainer />

                <Button
                    variant="contained"
                    type="submit"
                    className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
                >
                    Send Email
                </Button>
            </Box>
        </div>
    )
}

export default UserForgetPasswordEmail;