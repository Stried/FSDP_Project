// Libraries Import
'use client'
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import http from "./../http";
import { Dropdown } from "flowbite-react";
import { BiSolidLeaf } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import UserContext from "../contexts/UserContext";

function LocationsAdmin(props) {
    const isAdmin = props.isAdmin;
    if (isAdmin) {
        return (
            <Dropdown.Item>
                <Link to="/locations/createLocation">
                    <p className="">Add A Location</p>
                </Link>
            </Dropdown.Item>
        )
    }
}

function EcoLifeAppBar() {
    const { user } = useContext(UserContext);

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    const Protected = ({ isAdminCheck, children }) => {
        if (!isAdminCheck) {
            return <Navigate to={"/404"} />
        }

        return children
    }

    const [ isAdminCheck, setIsAdminCheck ] = useState(null);

    return (
        <nav className="navbar w-full flex  py-6 dark:text-white text-zinc-900 overflow-x-hidden">
            <div className="p-3 w-fit">
                <Link to={"/"}>
                    <h1
                        className="w-fit | bg-gradient-to-r dark:from-green-400 dark:to-emerald-600 from-sky-400 to-blue-500 text-transparent bg-clip-text |
            hover:ease-in-out duration-300 | italic font-semibold text-4xl | mx-4 my-2 flex"
                    >
                        <BiSolidLeaf className="text-green-400" />{" "}
                        <span className="my-auto">Ecolife</span>
                    </h1>
                </Link>
            </div>
            <div
                name="otherLinks"
                className="flex mt-3 mx-4 py-1"
            >
                <Link to="/Store/StoreMain">
                    <h1
                        className="w-max | hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mx-5 my-2"
                    >
                        Store
                    </h1>
                </Link>

                <div className="text-xl font-medium my-2 mx-5 hover:text-green-500 hover:transition-ease-in-out duration-300">
                    <Dropdown
                        inline
                        label="Location"
                        size="lg"
                    >
                        <Dropdown.Item>
                            <Link to="/locations/LocationsMain">
                                <p className="">View Locations</p>
                            </Link>
                        </Dropdown.Item>
                        {user && <LocationsAdmin isAdmin={user.adminNo} />}
                    </Dropdown>
                </div>

                <Link to="/Trials/trialUsers/TrialsCarUserPage">
                    <h1
                        className="w-max | hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mx-5 my-2"
                    >
                        Trial Runs
                    </h1>
                </Link>
            </div>

            {user && (
                <div className="my-auto">
                    <Link
                        to={"/user/chat"}
                        className="flex my-auto float-right"
                    >
                        <BsChatDots className="my-auto" />{" "}
                        <span
                            className="w-max | hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mr-5 ml-2 my-2"
                        >
                            Chat
                        </span>
                    </Link>
                </div>
            )}

            <div
                name="loginButton"
                className="w-full place-content-end my-auto mx-2"
            >
                {user && (
                    <>
                        <Link to="/user/viewAccount">
                            <h1 className="w-max | font-medium italic text-xl | mx-4 px-2 py-1 | float-right | dark:text-green-500 text-sky-500">
                                {user.emailAccount}
                            </h1>
                        </Link>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/user/login">
                            <h1 className="w-max font-semibold text-xl | mx-4 mt-1 px-2 py-1 | float-right | dark:text-green-500 text-sky-500 | border-2 border-solid dark:border-green-500 border-sky-500 rounded">
                                Log In
                            </h1>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default EcoLifeAppBar;
