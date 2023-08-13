import {
    Box,
    Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./../../../App.css";
import http from "../../../http";
import FormInputSingleLine from "./../../../components/FormInputSingleLine";
import { Field, useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckBox } from "@mui/icons-material";
import CustomSelectCars from "./CustomSelectCars";



function TrialsCarAdminUpdate() {


    const navigate = useNavigate();

    let { carPlateNo } = useParams();

    const options = [
        { value: "Serangoon", label: "Serangoon" },
        { value: "115C Yishun Ring Road", label: "115C Yishun Ring Road" },
        { value: "51 Ang Mo Kio Ave 9", label: "51 Ang Mo Kio Ave 9" },
        { value: "815 Bukit Batok West Ave. 5", label: "815 Bukit Batok West Ave. 5" },
    ];


    const [selectedTrialCar, setSelectedTrialCar] = useState({
        id: "",
        address: "",
        carPlateNo: carPlateNo,
        name: "",
        carBrand: ""
    });

    useEffect(() => {
        http.get(`/trials/viewSpecificTrialCar/${carPlateNo}`)
            .then((res) => {
                console.log(res.data)
                setSelectedTrialCar(res.data);
                console.log("The trial car is " + carPlateNo);
                console.log("The address is: "+ res.data.address)
                window.location.reload;
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);



    const formik = useFormik({
        initialValues: selectedTrialCar,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            address: yup.string().trim().max(100).required("Address cannot be empty"),
        }),
        onSubmit: (data) => {
            const formData = {
                address: data.address.trim(),

            }
            http
                .put(`trials/updateTrialCar/changeDetails/${carPlateNo}`, formData)
                .then((res) => {
                    console.log(res.status);
                    navigate("/Trials/trialAdmin/TrialsCarAdminPage");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`)
                });
        }
    });

    return (
        <div className="relative min-h-screen">

                <Box component={"div"} className="pl-7">
                    <Box>
                        <div className="text-white">
                            <h1 className="text-green-500 text-3xl pb-3 font-medium italic">
                                Update values for Trial Car
                            </h1>
                        </div>
                    </Box>
                    <Box component={"form"} onSubmit={formik.handleSubmit}>
                        <div className="pr-7">

                            <br />

                            <label>Address</label>
                            <CustomSelectCars
                                value={formik.values.address}
                                onChange={(value) => formik.setFieldValue("address", value.value)}
                                classnames={"input"}
                                options={options}
                            />
                            <br></br>
                            <div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="bg-green-400 text-black hover:bg-green-600 hover:text-white"							>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Box>

        </div>
    )
}

export default TrialsCarAdminUpdate;