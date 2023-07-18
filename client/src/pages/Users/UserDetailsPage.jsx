import React from "react";
import { useState, useEffect } from "react";
import "./../../App.css";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import FormInputMultiLine from "./../../components/FormInputMultiLine";
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
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";

import ViewAccount from "./userComponents/ViewAccount"
import ChangeAccountDetails from "./userComponents/ChangeAccountDetails"
import Setting from "./userComponents/Setting";

function UserDetailsPage() {
    const [ user, setUser ] = useState(null);
    const [ isRendered, setIsRendered ] = useState("");
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

    const viewAccount = () => {
        if (window.location.pathname === "/user/viewAccount") {
            return <ViewAccount />
        }
    }

    const changeAccountDetails = () => {
        if (window.location.pathname === "/user/viewAccount") {
            return <ChangeAccountDetails />
        }
    }

    return (
        <div className="w-screen ml-10">
            {user && (
                <div className="flex">
                    <div
                        className="w-1/4"
                        id="sideBarMenu"
                    >
                        <div
                            className="dark:text-zinc-400 text-neutral-600"
                            id="userAccountOptions"
                        >
                            <h2 className="dark:text-green-500 text-sky-500 text-3xl font-medium">
                                User Account
                            </h2>
                            <ul className="text-xl border-white">
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link
                                        to="/user/viewAccount"
                                        onClick={() => setIsRendered("")}
                                    >
                                        Account Details
                                    </Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link
                                        to="/user/viewAccount"
                                        onClick={() =>
                                            setIsRendered(
                                                "changeAccountDetails"
                                            )
                                        }
                                    >
                                        Change Details
                                    </Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link to="">Payment Methods</Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link to="">Membership Status</Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link
                                        to=""
                                        onClick={() => setIsRendered("setting")}
                                    >
                                        Settings
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="dark:text-zinc-400 text-neutral-600 mt-5"
                            id="ecolifeInformation"
                        >
                            <h2 className="dark:text-green-500 text-sky-500 text-3xl font-medium">
                                Vehicle Information
                            </h2>
                            <ul className="text-xl border-white">
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link to="">Registered Vehicle</Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link to="">Purchased Vehicles</Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link to="">Sold Vehicles</Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link to="">Sales Status</Link>
                                </li>
                                <li className="pt-3 dark:hover:text-green-500 hover:text-sky-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid dark:border-zinc-400 border-neutral-600 dark:hover:border-green-500 hover:border-sky-500">
                                    <Link to="">Settings</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="w-3/4 mx-5 h-full"
                        id="displayComponents"
                    >
                        {isRendered === "" && viewAccount()}
                        {isRendered === "changeAccountDetails" &&
                            changeAccountDetails()}
                        {isRendered === "setting" && <Setting />}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetailsPage;
