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
    const [isOpen, setIsOpen] = useState(false);
    const [trialCarList, setTrialCarList] = useState([]);
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

    const formik = useFormik({
        initialValues: {
            carPlateNo: "",
            address: "",
        },
        validationSchema: yup.object().shape({
            carPlateNo: yup
                .string()
                .trim()
                .min(3, "Name must be Minimum 3 Characters.")
                .max(100, "Name must be Maximum 100 Characters")
                .required("Name is required."),
            address: yup
                .string()
                .trim()
                .min(3, "address must be Minimum 3 Characters.")
                .max(100, "address must be Maximum 100 Characters")
                .required("Address is required"),
        }),
        onSubmit: async (data) => {
            const formData = {
                carPlateNo: (data.carPlateNo = data.carPlateNo.trim()),
                address: (data.address = data.address.trim()),
            };

            await http
                .post("/trials/createTrialCar", formData)
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
            
                <h1 className="text-center text-5xl text-green-400">Trial Car Records</h1>
                <br></br>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-green-400 dark:bg-green-500 dark:text-black">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Car plate No.
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Car Model
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
                                        Car Brand
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
                                        Car Address
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {trialCarList.map((trialCar, i) => {
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {trialCar.carPlateNo}
                                        </th>

                                        <td class="px-6 py-4">
                                            {trialCar.name}
                                        </td>
                                        <td class="px-6 py-4">
                                            {trialCar.carBrand}
                                        </td>
                                        <td class="px-6 py-4">
                                            {trialCar.address}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/Trials/trialAdmin/TrialsCarDetailedPage/${trialCar.carPlateNo}`}
                                                className="bg-green-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white "
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/Trials/trialAdmin/TrialsCarAdminUpdate/${trialCar.carPlateNo}`}
                                                className="bg-green-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white "
                                            >
                                                Update Address
                                            </Link>
                                        </td>
                                        <td class="pl-0 pr-4 py-4 text-right">
                                            <a
                                                onClick={() =>
                                                    deleteTrialCar(
                                                        `${trialCar.carPlateNo}`
                                                    )
                                                }
                                                href="#"
                                                className="bg-red-400 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white "
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            <ToastContainer />
        </div>
    );
};

export default App;
