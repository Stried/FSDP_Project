import React, { useState, useEffect, useContext } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import "./../../../App.css";
import http from "../../../http";

import {
    Box, Button, TextField,
    Typography, InputAdornment, IconButton
} from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';
import { Formik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../../../contexts/UserContext";

function Setting() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteUser = (userID) => {
        http.delete(`/user/deleteUser/${userID}`).then(() => {
            navigate("/")
            localStorage.clear();
            window.location.reload();
        }).catch(function (err) {
            console.log(err)
        })
    }

    return (
        <div>
            {/* Modal to be implemented */}
            <button onClick={ () => deleteUser(`${user.id}`)} className="px-3 py-2 bg-red-500 rounded font-medium">
                Delete
            </button>
        </div>
    )

}

export default Setting;