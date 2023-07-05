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

function TrialsCarAdminUpdate() {
    const navigate = useNavigate();

    let { carPlateNo } = useParams();
    console.log("The ID is: " + carPlateNo); // the id is not the issue as well, seems to be printed repeatedly when i type something into the text box

    const [ selectedTrialCar, setSelectedTrialCar ] = useState({
        id: "",
        address: "",
        carPlateNo: "",
        name: "",
        carBrand: ""
    });

    useEffect(() => {
        http.get(`/trials/viewTrialCar/${carPlateNo}`)
            .then((res) => {
                console.log(res.data)
                setSelectedTrialCar(res.data); // not working
                console.log("The trial car is " + selectedTrialCar.id);
                window.location.reload;
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    // the issue is up to here
    const formik = useFormik({
        initialValues: selectedTrialCar, // why isnt this showing, nope
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            address: yup.string().trim().max(100).required("Address cannot be empty"),

        }),
        onSubmit: (data) => {
            const formData = {
                address: data.address.trim(),
                carPlateNo: data.carPlateNo, // not the trim, the data isnt being called from the url
            }
            console.log(formData) // it can update, cant fetch data yep but update works

            http
                .put(`trials/updateTrialCar/changeDetails/${id}`, formData)
                .then((res) => {
                    console.log(res.status);
                    navigate("/Trial/TrialsCarAdminPage");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`)
                });
        }
    });

    return (
        <Box component={ "div" } className="pl-7">
            <Box>
                <div className="text-white">
                    <h1 className="text-green-500 text-3xl pb-3 font-medium italic">
                        Update values for Trial Car
                    </h1>
                </div>
            </Box>
            <Box component={ "form" } onSubmit={ formik.handleSubmit }>
                <div className="pr-7">

                    <br />

                    <div className="w-1/4 inline-flex">
                        <FormInputSingleLine
                            valueName="address"
                            name="Address"
                            type="text"
                            initialValues = {selectedTrialCar.address}
                            value={ formik.values.address }
                            onChange={ formik.handleChange }
                            error={ formik.touched.address && Boolean(formik.errors.address) }
                            helperText={ formik.touched.address && formik.errors.address }
                        />
                    </div>

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
    )
}

export default TrialsCarAdminUpdate;