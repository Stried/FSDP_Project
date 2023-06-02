import React, { useState, useEffect } from "react";
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

import { Button } from "@mui/base";

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

    const formik = useFormik({
        initialValues: {
            fullName: user.fullName,
            userName: user.userName,
            phoneNo: user.phoneNo,
            emailAccount: user.emailAccount,
            password: user.password
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
                .post("/user/createAccount", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/user/login");
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        },
    })
}