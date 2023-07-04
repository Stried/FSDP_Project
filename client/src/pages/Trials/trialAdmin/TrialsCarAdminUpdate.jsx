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

    let { id } = useParams();
    console.log("The ID is: " + id); // the id is not the issue as well, seems to be printed repeatedly when i type something into the text box

    // The issue is within line 24 to 41
    const [ trialCar, setTrialCar ] = useState({
        carPlateNo: "",
        address: ""
    }); // its still using this instead of the updated one

    useEffect(() => { // the use effect is not starting when the function is called, thus no data is being passed
        http.get(`trials/viewTrialCar/${id}`) // funny thing is, seems liek it is getting smth tho
            .then((res) => { 
                // issue is here i think
                console.log("Hello PLease Appear"); // is called up to this point
                setTrialCar(res.data); // this is the issue
                console.log("Hello PLease Appear 2"); // is also called
                console.log(res.data); // data is also being passed=
            })
            .catch(function (err) {
                console.log(err); // catch is to not crash in case of error
            })
    }, []); // the useEffect is supposed to fetch data from the db and put it as the initial value

    // the issue is up to here
    const formik = useFormik({
        initialValues: trialCar, // why isnt this showing, nope
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
                            name="address"
                            type="text"
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