import React from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import FormInputSingleLine from "./../components/FormInputSingleLine";
import FormInputMultiLine from "./../components/FormInputMultiLine";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";

function UserDetailsPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    if (localStorage.getItem("accessToken")) {
        // Todo: Get user data from server
        http.get("/user/auth").then((res) => {
        setUser(res.data.user);
        });
    }
    }, []);

    const logout = () => {
    localStorage.clear();
    window.location = "/";
    };

    return (
        <div className="w-screen">
            <div className="w-1/4">
                <div id="accountOptions">

                </div>
            </div>
        </div>
    )
}

export default UserDetailsPage