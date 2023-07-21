import React from "react";
import { useState, useEffect } from "react";
import "./../../App.css";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import FormInputMultiLine from "./../../components/FormInputMultiLine";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Accordion, Avatar, Badge, Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";

function ViewOtherUser() {
    const { username } = useParams();
    console.log(username)

    const [ otherUser, setOtherUser ] = useState(null);

    useEffect(() => {
        http.get(`/user/${username}`)
            .then((res) => {
                setOtherUser(res.data);
                console.log(res.data);
                console.log(otherUser);
                console.log("Successfully loaded user info");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    return (
        <div className="">
            {otherUser && (
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
                                {otherUser.userName}'s Account
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div id="userAccountDetails">
                            <p className="text-3xl font-medium">
                                {otherUser.fullName}'s Account Details
                                <span className="flex space-x-3">
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
                                <div className="text-white mb-3 text-center basis-1/8 mr-10">
                                    {otherUser &&
                                        otherUser.imageFile !== "No image" && ( // Had to be non-nullable
                                            <Avatar
                                                className=""
                                                img={`${
                                                    import.meta.env
                                                        .VITE_FILE_BASE_URL
                                                }${otherUser.imageFile}`}
                                                alt="Profile Picture"
                                                rounded
                                                bordered
                                                color={"success"}
                                                size="xl"
                                            ></Avatar>
                                        )}
                                </div>
                                <div className="basis-1/4 ml-6">
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
                                                    {otherUser.fullName}
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
                                                    {otherUser.userName}
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
                                            {otherUser.emailAccount}
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
                                            {otherUser.phoneNo}
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
                                                The user currently has no cars
                                                for sale.
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                        <Accordion.Panel>
                                            <Accordion.Title>
                                                Trialed Cars
                                            </Accordion.Title>
                                            <Accordion.Content>
                                                The user currently has trialed
                                                no cars.
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewOtherUser;