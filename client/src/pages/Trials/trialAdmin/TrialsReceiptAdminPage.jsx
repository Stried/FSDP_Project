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

import http from "./../../../http";
import { ToastContainer, toast } from "react-toastify";
import FormInputSingleLine from "./../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";


const App = () => {
    const [ trialReceiptList, setTrialReceiptList ] = useState([]);
    const getTrialReceipt = () => {
        http.get("/trials/viewAllTrialReceipt").then((res) => {
            setTrialReceiptList(res.data);
        });
    };
    const deleteTrialReceipt = (trialReceiptId) => {
        http.delete(`/trials/trialreceipt/${trialReceiptId}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        })
        .catch(function (err) {
            console.log(err)
            toast.error(`${err.response.data.message}`);
        });
    };
    useEffect(() => {
        getTrialReceipt();
    }, []);

    return (
        <div className="relative min-h-screen">

                <h1 className="text-center text-5xl text-green-400">Trial Receipt Records</h1>
                <br></br>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 ml-16">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-green-400 dark:bg-green-500 dark:text-black">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Receipt ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Date of Trial
                                        <a href="#">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-3 h-3 ml-1"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 320 512"
                                            >
                                                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                            </svg>
                                        </a>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Fault
                                        <a href="#">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-3 h-3 ml-1"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 320 512"
                                            >
                                                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                            </svg>
                                        </a>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                                    <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { trialReceiptList.map((trialReceipt, i) => {
                                const isReportEmpty = trialReceipt.trialReport.toLowerCase() === "empty";
                                const isFaultResolved = Boolean(trialReceipt.faultResolve); // Assuming the `fault` attribute is a boolean
                                console.log(isFaultResolved)
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            { trialReceipt.modelName }
                                        </th>
                                        <td class="px-6 py-4">{ trialReceipt.dateOfTrial }</td>
                                        <td class="px-6 py-4">{isFaultResolved ? "resolved" : "unresolved"}</td>
                                        <td class="pr-0 py-4 text-right">
                                        <Link
                                    to={`/Trials/trialAdmin/TrialsReceiptReportPage/${trialReceipt.trialReceiptId}`}
                                    className={`bg-green-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white `}
                                            >
                                                {isReportEmpty ? "Write Report" : "Read Report"}
                                            </Link>
                                        </td>
                                        <td class="pl-0 pr-4 py-4 text-right">
                                            <a
                                                onClick={ () => deleteTrialReceipt(`${trialReceipt.trialReceiptId}`) }
                                                href="#"
                                                className="bg-red-400 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white "
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>
                </div>
            <ToastContainer />
        </div>
    );
};

export default App;
