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



function TrialsReceiptUpdate() {
    
    const navigate = useNavigate();

    let { id } = useParams();

    const [selectedTrialReceipt, setSelectedTrialReceipt] = useState({
        trialReceiptId: "",
        dateOfTrial: "",
        trialReport: "",
        modelName: "",
        faultResolve: true
    });

    useEffect(() => {
        http.get(`/trials/viewSpecificTrialReceipt/${id}`)
            .then((res) => {
                console.log(res.data)
            
                setSelectedTrialReceipt(res.data);
                window.location.reload;
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);



    const formik = useFormik({
        initialValues: selectedTrialReceipt,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            trialReport: yup.string().trim().max(1000).required("Trial Report cannot be empty"),

        }),
        onSubmit: (data) => {
            const formData = {
                trialReport: data.trialReport.trim(),
            }
            http
                .put(`trials/viewAllTrialReceipt/changeDetails/${id}`, formData)
                .then((res) => {
                    console.log(res.status);
                    navigate("/Trials/trialAdmin/TrialsReceiptAdminPage");
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
                                Update values for Trial Receipt
                            </h1>
                        </div>
                    </Box>
                    <Box component={"form"} onSubmit={formik.handleSubmit}>
                        <div className="pr-7">

                            <br />

                            <label>Trial Report</label>
                            <FormInputSingleLine
                                name="Trial Report"
                                value={formik.values.trialReport}
                                valueName="trialReport"
                                onChange={formik.handleChange}
                                type="text"
                                error={
                                    formik.touched.trialReport && Boolean(formik.errors.trialReport)
                                  }
                                  helperText={formik.touched.trialReport && formik.errors.trialReport}
                            />
                            <br></br>
                            <div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="bg-green-400 text-black hover:bg-green-600 hover:text-white"							>
                                    Upload Report
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Box>

        </div>
    )
}

export default TrialsReceiptUpdate;