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
import { Accordion, Avatar, Badge, Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

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
        <div className="dark:text-white text-neutral-600">
            <div className="mx-5 ">
                <Breadcrumb className="mb-5">
                    <Breadcrumb.Item
                        href="/"
                        icon={HiHome}
                    >
                        <p>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/user/viewAccount">
                        My Account
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div id="userAccountDetails">
                    <p className="text-3xl font-medium mb-10">
                        {user.fullName}'s Account Details
                        <span className="flex space-x-3 mt-2">
                            <Badge
                                color="success"
                                size={"sm"}
                                className="w-fit"
                            >
                                User
                            </Badge>
                            <Badge
                                color="indigo"
                                size={"sm"}
                                className="w-fit"
                            >
                                Admin
                            </Badge>
                        </span>
                    </p>
                    <div className="my-3 flex flex-row">
                        <div className="text-white mb-3 text-center basis-1/6 mr-10">
                            {user &&
                                user.imageFile !== "No image" && ( // Had to be non-nullable
                                    <Avatar
                                        className=""
                                        img={`${
                                            import.meta.env.VITE_FILE_BASE_URL
                                        }${user.imageFile}`}
                                        alt="Profile Picture"
                                        rounded
                                        bordered
                                        color={"success"}
                                        size="xl"
                                    ></Avatar>
                                )}
                            <Button
                                className="bg-sky-500 text-white rounded px-2 py-1 mt-4 mb-10 text-md 
                        font-medium border-transparent border-2 border-solid hover:border-blue-500 
                        hover:border-2 hover:border-solid hover:transition-ease-in-out duration-300"
                                onClick={() =>
                                    navigate("/user/viewAccount/settings")
                                }
                            >
                                Settings
                            </Button>
                        </div>
                        <div className="basis-1/3 ml-6">
                            <div className="mr-12">
                                <div
                                    id="nameSection"
                                    className="flex"
                                >
                                    <div
                                        id="fullName"
                                        className="mb-3"
                                    >
                                        <h1 className="dark:text-green-400 text-sky-500 font-medium text-2xl">
                                            Full Name
                                        </h1>
                                        <p className="text-2xl font-medium italic">
                                            {user.fullName}
                                        </p>
                                    </div>
                                    <div
                                        id="userName"
                                        className="mb-3 ml-5"
                                    >
                                        <h1 className="dark:text-green-400 text-sky-500 font-medium text-2xl">
                                            Username
                                        </h1>
                                        <p className="text-2xl font-medium italic">
                                            {user.userName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="emailAccount"
                                className="my-3"
                            >
                                <h1 className="dark:text-green-400 text-sky-500 font-medium text-2xl">
                                    Email Account
                                </h1>
                                <p className="text-2xl font-medium italic">
                                    {user.emailAccount}
                                </p>
                            </div>
                            <div
                                id="phoneNo"
                                className="my-3"
                            >
                                <h1 className="dark:text-green-400 text-sky-500 font-medium text-2xl">
                                    Phone Number
                                </h1>
                                <p className="text-2xl font-medium italic">
                                    {user.phoneNo}
                                </p>
                            </div>
                        </div>
                        <div className="basis-4/6">
                            <Accordion>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Car Sales Listings
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        The user currently has no cars for sale.
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Trialed Cars
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        The user currently has trialed no cars.
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewAccount