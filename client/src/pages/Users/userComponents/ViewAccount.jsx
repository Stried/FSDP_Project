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

function ViewAccount() {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    const [ user, setUser ] = useState({
        fullName: "",
        userName: "",
        emailAccount: "",
        phoneNo: "",
        id: "",
        imageFile: ""
    })

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    try {
        useEffect(() => {
            if (userInfo) {
                localStorage.setItem("userImageFile", `${user.imageFile}`);
                user.imageFile = localStorage.getItem("userImageFile");
            }
        }, [ user ]);
    } catch (err) {
        console.log(err);
        user.imageFile = localStorage.getItem("userImageFile");
    }

    useEffect(() => {   
        http.get("/user/viewAccount")
            .then((res) => {
                setUser(res.data);
                console.log("User Info successfully logged.")
            })
            .catch(function (err) {
                console.log(err);
            })
    }, [])

    return (
        <div className="text-white">
            <div className="mx-5 ">
                
                    <div id="userAccountDetails">
                        <p className="text-3xl font-medium">
                            { user.fullName }'s Account Details
                        </p>
                        <div className="my-3">
                            <div className="text-white mb-3">
                                { user && user.imageFile !== "No image" && ( // Had to be non-nullable
                                    <AspectRatio className="w-2/5 border-green-500 border-2 border-solid rounded float-right mr-10">
                                        <Box component="img"
                                            src={ `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}` }
                                            alt="Profile Picture">
                                        </Box>
                                    </AspectRatio>
                                ) }
                            </div>
                            <div id="nameSection" className="flex space-x-10">
                                <div id="fullName" className="my-3">
                                    <h1 className="text-green-400 font-medium text-2xl">
                                        Full Name
                                    </h1>
                                    <p className="text-2xl font-medium italic">
                                        { user.fullName }
                                    </p>
                                </div>
                                <div id="userName" className="my-3">
                                    <h1 className="text-green-400 font-medium text-2xl">
                                        Username
                                    </h1>
                                    <p className="text-2xl font-medium italic">
                                        { user.userName }
                                    </p>
                                </div>
                            </div>

                            <div id="emailAccount" className="my-3">
                                <h1 className="text-green-400 font-medium text-2xl">
                                    Email Account
                                </h1>
                                <p className="text-2xl font-medium italic">
                                    { user.emailAccount }
                                </p>
                            </div>
                            <div id="phoneNo" className="my-3">
                                <h1 className="text-green-400 font-medium text-2xl">
                                    Phone Number
                                </h1>
                                <p className="text-2xl font-medium italic">
                                    { user.phoneNo }
                                </p>
                            </div>
                        </div>
                        <Button className="bg-red-500 text-white rounded px-2 py-1 mt-4 mb-10 text-xl 
                        font-medium border-transparent border-2 border-solid hover:border-red-500 
                        hover:border-2 hover:border-solid hover:transition-ease-in-out duration-300" onClick={ logout }>Logout</Button>
                    </div>
                
            </div>
        </div>
    )
}

export default ViewAccount