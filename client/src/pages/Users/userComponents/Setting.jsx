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

    const [ userInfo, setUserInfo ] = useState({
        id: ""
    })

    useEffect(() => {
        http.get("/user/viewAccount/changeDetails")
            .then((res) => {
                console.log(res.data);
                setUserInfo(res.data);
                console.log(userInfo.id)
            })
            .catch(function (error) {
                console.log(error.response.data.message);
            });
    }, []);

    const deleteUser = () => {
        http.delete(`/user/deleteUser/${userInfo.id}`).then(() => {
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
            <button onClick={ () => deleteUser()} className="px-3 py-2 bg-red-500 rounded font-medium">
                Delete
            </button>
        </div>
    )

}

export default Setting;