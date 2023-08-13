"use client";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom";
import http from "./../http";
import { Accordion, Dropdown } from "flowbite-react";


import UserContext from "../contexts/UserContext";

function AdminPanel(props) {
    const isAdmin = props.isAdmin;
    if (isAdmin) {
        return (
            <Link to="/user/adminPanel">
                <h1 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200">
                    Admin Panel
                </h1>
            </Link>
        );
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
        );
    }
}

const SideNav = ({ isOpen }) => {
    const { user } = useContext(UserContext);
    const Protected = ({ isAdminCheck, children }) => {
        if (!isAdminCheck) {
            return <Navigate to={"/404"} />;
        }

        return children;
    };

    const [isAdminCheck, setIsAdminCheck] = useState(null);

    const [locationsAccordionOpen, setLocationsAccordionOpen] = useState(false);
    const [trialsAccordionOpen, setTrialsAccordionOpen] = useState(false);

    const toggleLocationsAccordion = () => {
        setLocationsAccordionOpen(!locationsAccordionOpen);
    };

    const toggleTrialsAccordion = () => {
        setTrialsAccordionOpen(!trialsAccordionOpen);
    };

    return (
        <div
            className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-r z-50 text-white  transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <aside
                id="separator-sidebar"
                className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full overflow-y-auto bg-emerald-600 ">
                    <div className="py-7 px-4 w-full bg-gradient-to-t from-emerald-600 to-zinc-900">
                        <Link to={"/"}>
                            <h1 className="w-full ml-3 | text-white | font-semibold text-2xl">
                                Admin Panel
                            </h1>
                        </Link>
                    </div>
                    <ul className="space-y-2 px-3 py-4  font-medium text-lg">
                        <li id="">
                            <Link
                                to="/Store/StoreMain"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Store
                                </span>
                            </Link>
                        </li>
                        <li id="trials">
                            <ul>
                                <button
                                    className=" w-full text-left"
                                    onClick={toggleTrialsAccordion}
                                >
                                    <a
                                        href="#"
                                        className="flex font-medium items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="ml-3">Trials</span>
                                        {!trialsAccordionOpen && (
                                            <div className="pl-20 font-bold ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="28"
                                                    fill="currentColor"
                                                    class="bi bi-chevron-compact-down"
                                                    viewBox="0 0 16 16"
                                                >
                                                    {" "}
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                                                    />{" "}
                                                </svg>
                                            </div>
                                        )}
                                        {trialsAccordionOpen && (
                                            <div className="pl-20 font-bold ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="28"
                                                    fill="currentColor"
                                                    class="bi bi-chevron-compact-up"
                                                    viewBox="0 0 16 16"
                                                >
                                                    {" "}
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
                                                    />{" "}
                                                </svg>
                                            </div>
                                        )}
                                    </a>
                                </button>
                            </ul>
                            {trialsAccordionOpen && (
                                <div>
                                    <Link
                                        to="/Trials/trialAdmin/TrialsCarAdd"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        Add Trial Car
                                    </Link>
                                    <Link
                                        to="/Trials/trialAdmin/TrialsCarAdminPage"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        View Trial Cars
                                    </Link>
                                    <Link
                                        to="/Trials/trialAdmin/TrialsReceiptAdminPage"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        View Trial Receipts
                                    </Link>
                                    <Link
                                        to="/Trials/trialUsers/TrialsData"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        View Trial Statistics
                                    </Link>
                                </div>
                            )}
                        </li>
                        <li id="locations">
                            <ul>
                                <button
                                    className=" w-full text-left"
                                    onClick={toggleLocationsAccordion}
                                >
                                    <a
                                        href="#"
                                        className="flex font-medium items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                        </svg>
                                        <span className="ml-3">Locations</span>
                                        {!locationsAccordionOpen && (
                                            <div className="pl-11 font-bold ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="28"
                                                    fill="currentColor"
                                                    class="bi bi-chevron-compact-down"
                                                    viewBox="0 0 16 16"
                                                >
                                                    {" "}
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                                                    />{" "}
                                                </svg>
                                            </div>
                                        )}
                                        {locationsAccordionOpen && (
                                            <div className="pl-11 font-bold ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="28"
                                                    fill="currentColor"
                                                    class="bi bi-chevron-compact-up"
                                                    viewBox="0 0 16 16"
                                                >
                                                    {" "}
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
                                                    />{" "}
                                                </svg>
                                            </div>
                                        )}
                                    </a>
                                </button>
                            </ul>
                            {locationsAccordionOpen && (
                                <div>
                                    <a
                                        href="/locations/LocationsMain"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        View Chargers
                                    </a>
                                    <Link
                                        to="/locations/ViewLocationStatus"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        View Location Status
                                    </Link>
                                </div>
                            )}
                        </li>
                        <li id="createAdmin">
                            <Link
                                to="/admin/createAdmin"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                    <path
                                        fill-rule="evenodd"
                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap ">
                                    Create Admin
                                </span>
                            </Link>
                        </li>
                        <li id="viewAllUsers">
                            <Link
                                to={"/admin/viewAllUsers"}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    View Users
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

function EcoLifeSideBar() {
    const { user } = useContext(UserContext);

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    const [isOpen, setIsOpen] = useState(false);
    const [arrowClose, setArrowClose] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const toggleArrowSidebar = () => {
        setArrowClose(!arrowClose);
    };

    return (
        <div className="">
            {user && <div onLoad={() => setIsAdminCheck(user.adminNo)} />}
            <div
                onClick={toggleArrowSidebar}
                className=""
            >
                <button
                    className={`fixed z-40 p-3 py-5 ml-0 w-4 h-24 rounded-r-2xl bg-gradient-to-l from-green-400 to-emerald-600 text-grey transition-transform duration-300 ${isOpen
                        ? "translate-x-64 translate-y-20"
                        : "translate-x-0 translate-y-20"
                        }`}
                    onClick={toggleNav}
                >
                    {!arrowClose && (
                        <div className="h-20 w-7 ">
                            <div className="left-1 top-10 absolute ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                                </svg>
                            </div>
                        </div>
                    )}
                    {arrowClose && (
                        <div className="h-20 w-7">
                            <div className="left-1 top-10 absolute ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </button>
            </div>
            <SideNav isOpen={isOpen} />

            <div
                className={`text-white transition duration-500 ${isOpen ? " opacity-25 " : " opacity-100 "
                    }`}
            ></div>
        </div>
    );
}

export default EcoLifeSideBar;
