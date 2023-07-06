import { Box, Button, InputLabel, MenuItem } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useState, useEffect, useContext } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import * as React from "react";
("use client");

import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import FormInputSingleLine from "../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";

const SideNav = ({ isOpen }) => {
    const [ accordionOpen, setAccordionOpen ] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };
    return (
        <div
            className={ `fixed left-0 top-0 h-full w-64 bg-gradient-to-r z-50 text-white  transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                }` }
        >
            <aside
                id="separator-sidebar"
                className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-emerald-600 ">
                    <ul className="space-y-2 font-medium text-lg">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">User Management</span>
                            </a>
                        </li>
                        <li>
                            <ul>
                                <button className=" w-full text-left" onClick={ toggleAccordion }>
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
                                        <span className="ml-3">Trial's</span>
                                        { !accordionOpen && (
                                            <div className="pl-20 font-bold ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="28"
                                                    fill="currentColor"
                                                    class="bi bi-chevron-compact-down"
                                                    viewBox="0 0 16 16"
                                                >
                                                    { " " }
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                                                    />{ " " }
                                                </svg>
                                            </div>
                                        ) }
                                        { accordionOpen && (
                                            <div className="pl-20 font-bold ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="28"
                                                    fill="currentColor"
                                                    class="bi bi-chevron-compact-up"
                                                    viewBox="0 0 16 16"
                                                >
                                                    { " " }
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
                                                    />{ " " }
                                                </svg>
                                            </div>
                                        ) }
                                    </a>
                                </button>
                            </ul>
                            { accordionOpen && (
                                <div>
                                                                        <a
                                        href="/Trials/trialAdmin/TrialsCarAdd"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        Add Trials
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        View Trials
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center pl-16 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200 "
                                    >
                                        View Receipts
                                    </a>
                                </div>
                            ) }
                        </li>
                        <li>
                            <a
                                href="#"
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
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Car Management
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:text-black dark:hover:bg-green-400 transition duration-200"
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
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Map's Management
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
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
                                    User Feedback
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
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
                                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
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
                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700 text-lg">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:hover:text-black dark:hover:bg-green-400 transition duration-200 dark:text-white group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                                <span className="ml-3">Inbox</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900  rounded-lg dark:hover:text-black dark:hover:bg-green-400 transition duration-200 dark:text-white group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                </svg>
                                <span className="ml-3">Documentation</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:hover:text-black dark:hover:bg-green-400 transition duration-200 dark:text-white group "
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
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3">Help</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

const App = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ trialCarList, setTrialCarList ] = useState([]);
    const getTrialCar = () => {
        http.get("/trials/viewTrialCar").then((res) => {
            setTrialCarList(res.data);
        });
    };
    const deleteTrialCar = (carPlateNo) => {
        http.delete(`/trials/${carPlateNo}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
    };
    useEffect(() => {
        getTrialCar();
    }, []);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const [ arrowClose, setArrowClose ] = useState(false);

    const toggleArrowSidebar = () => {
        setArrowClose(!arrowClose);
    };



    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            dateOfTrial:"",
            trialReport:"",
            modelName:"",
            faultResolve:true,
        },
        validationSchema: yup.object().shape({
            dateOfTrial: yup
                .date()
                .trim()
                .required("Date of trial is required"),
        }),
        onSubmit: async (data) => {
            const formData = {
                carPlateNo: (data.carPlateNo = data.carPlateNo.trim()),
                address: (data.address = data.address.trim()),
            };

            await http
                .post("/createTrialReceipt/${id}", formData)
                .then((res) => {
  
                    // navigate("/TrialsCarAdminPage");
                    window.location.reload()
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    return (
        <div className="relative min-h-screen">
            <div onClick={ toggleArrowSidebar }>
                <button
                    className={ `fixed z-50 p-3 py-5 ml-0 rounded-r-2xl bg-gradient-to-l from-green-400 to-emerald-600 text-grey transition-transform duration-300 ${isOpen ? "translate-x-64" : "translate-x-0"
                        }` }
                    onClick={ toggleNav }
                >
                    { !arrowClose && (
                        <div className="h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <path
                                    fill="white"
                                    d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                                    data-name="Right"
                                />
                            </svg>
                        </div>
                    ) }
                    { arrowClose && (
                        <div className="h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <path
                                    fill="white"
                                    d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
                                    data-name="Left"
                                />
                            </svg>
                        </div>
                    ) }
                </button>
            </div>
            <SideNav isOpen={ isOpen } />

            <div
                className={ `text-white transition duration-500 ${isOpen ? " opacity-25 " : " opacity-100 "
                    }` }
            >

                <h1 className="text-center text-5xl text-green-400">Create Trial Receipt</h1>
                <br></br>

                    
        <Box
          component={"form"}
          sx={{}}
          onSubmit={formik.handleSubmit}
          className="mx-7 ml-16"
        >
          <label >Date</label>
          <FormInputSingleLine
            name="Date of Trial"
            valueName="dateOfTrial"
            type="date"
            value={formik.values.dateOfTrial}
            onChange={formik.handleChange}
            error={formik.touched.dateOfTrial && Boolean(formik.errors.dateOfTrial)}
            helperText={formik.touched.dateOfTrial && formik.errors.dateOfTrial}
          />
<br></br>

          {formik.errors.address ? (
            <div classnames="error">{formik.errors.address}</div>
          ) : null}
          <br></br>
          <Button
            variant="contained"
            type="submit"
            className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
          >
            Create
          </Button>
        </Box>

            </div>
            <ToastContainer />
        </div>
    );
};

export default App;
