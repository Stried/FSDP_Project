// Libraries Import
'use client'
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import http from "./../http";
import { Dropdown } from "flowbite-react";

// Pages Import
import Ecolife from "../pages/Ecolife";
import PageNotFound from "../pages/PageNotFound";
import UserCreateAccount from "../pages/Users/UserCreateAccount";
import UserEnterAccount from "../pages/Users/UserEnterAccount";
import UserDetailsPage from "../pages/Users/UserDetailsPage";
import AdminPanelMain from "../pages/Users/AdminPanelMain";

import TrialsAdminPage from "../pages/Trials/trialAdmin/TrialsAdminPage";

import LocationsMain from "../pages/Locations/LocationsMain";
import LocationsCreate from "../pages/Locations/LocationsCreate";

import StoreMain from "../pages/Store/StoreMain";
import StoreAddItem from "../pages/Store/StoreAddItem";

import UserContext from "../contexts/UserContext";

function AdminPanel(props) {
    const isAdmin = props.isAdmin;
    if (isAdmin) {
        return (
            <Link to="/user/adminPanel">
                <h1
                    className="w-max | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                      font-medium text-xl | mx-5 my-2"
                >
                    Admin Panel
                </h1>
            </Link>
        )
    }
}

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

    return (
        <Router>
            <nav className="navbar w-full flex  py-6 text-white overflow-x-hidden">
                <div className="p-3 w-fit">
                    <Link to={ "/" }>
                        <h1
                            className="w-fit | bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text |
            hover:ease-in-out duration-300 | italic font-semibold text-4xl | mx-4 my-2"
                        >
                            Ecolife
                        </h1>
                    </Link>
                </div>
                <div name="otherLinks" className="flex mt-3 mx-4 py-1">
                    <Link to="/Store/StoreMain">
                        <h1
                            className="w-max | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mx-5 my-2"
                        >
                            Store
                        </h1>
                    </Link>

                    <div className="text-xl font-medium my-2 mx-5 hover:text-green-500 hover:transition-ease-in-out duration-300">
                        <Dropdown inline label="Location" size="lg">
                            <Dropdown.Item>
                                <Link to="/locations/LocationsMain">
                                    <p className="">View Locations</p>
                                </Link>
                            </Dropdown.Item>
                            { user && (
                                <LocationsAdmin isAdmin={ user.adminNo } />
                            )}
                        </Dropdown>
                    </div>

                    <Link to="/Trials/trialAdmin/TrialsAdminPage">
                        <h1
                            className="w-max | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mx-5 my-2"
                        >
                            Trial Runs
                        </h1>
                    </Link>
                    
                    { user && (
                        <div>
                            <AdminPanel isAdmin={ user.adminNo } />
                        </div>
                    ) }
                    

                </div>

                
                <div name="loginButton" className="w-full place-content-end my-2 mx-2">
                    { user && (
                        <>
                            <Link to="/user/viewAccount">
                                <h1
                                    className="w-max | text-transparent bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text |
                hover:text-white hover:bg-gradient-to-r from-green-400 to-emerald-600 hover:bg-clip-border rounded-lg
                    hover:ease-in-out duration-300 | font-medium italic text-2xl | mx-4 px-2 py-1 | float-right"
                                >
                                    { user.userName }
                                </h1>
                            </Link>

                        </>
                    ) }
                    { !user && (
                        <>
                            <Link to="/user/login">
                                <h1
                                    className="w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded
            hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mt-1 px-2 py-1 | float-right"
                                >
                                    Log In
                                </h1>
                            </Link>
                        </>
                    ) }
                </div>
            </nav>

            <div>
                <Routes>
                    <Route path={ "/" } />
                    <Route path={ "/user/createAccount" } element={ <UserCreateAccount /> } />
                    <Route path={ "/user/login" } element={ <UserEnterAccount /> } />
                    <Route path={ "/user/viewAccount" } element={ <UserDetailsPage /> } />
                    <Route path={ "/user/adminPanel" } element={ <AdminPanelMain /> } />
                    <Route path={ "/locations/LocationsMain" } element={ <LocationsMain /> } />
                    <Route path={ "/locations/createLocation" } element={ <LocationsCreate /> } />
                    <Route path={ "/Store/StoreMain" } element= { <StoreMain /> } />
                    <Route path={"/Store/StoreAddItem" } element= { <StoreAddItem /> } />
                    <Route path={ "/Trials/trialAdmin/TrialsAdminPage" } element={ <TrialsAdminPage /> } />
                    <Route path={ "*" } element={ <PageNotFound /> } />
                </Routes>
            </div>
        </Router>
    );
}

export default EcoLifeAppBar;
