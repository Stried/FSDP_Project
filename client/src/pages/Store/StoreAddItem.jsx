import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./../../App.css";
import http from "../../http";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StoreAddItem() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            carPlateNo: "",
            carDescription: "",
            carPrice: "",
            carBrand: "",
            carModel: "",
            carEngine: "",
            carSpeed: "",
            carFuelType: "",
            carFuelType: "",
            carFuelConsume: "",
            carProductionDate: "",
            carBodyType: "",
            carColor: "",
            carSeats: "",
            carLength: "",
            carWidth: "",
            carHeight: "",
            isModified: "",
            carMods: ""
        },
        validationSchema: yup.object().shape({
            carPlateNo: yup.string().trim().max(8).required(),
            carDescription: yup.string().trim().required(),
            carPrice: yup.number().integer().required(),
            carBrand: yup.string().trim().required(),
            carModel: yup.string().trim().required(),
            carEngine: yup.string().trim().required(),
            carSpeed: yup.number().integer().required(),
            carFuelType: yup.string().required(),
            carFuelConsume: yup.number().integer().required(),
            carProductionDate: yup.date().required(),
            carBodyType: yup.string().trim().required(),
            carColor: yup.string().trim().required(),
            carSeats: yup.number().integer().min(1).required(),
            carLength: yup.number().integer().required(),
            carWidth: yup.number().integer().required(),
            carHeight: yup.number().integer().required(),
            isModified: yup.boolean().required(),
            carMods: yup.string(),
        }),
        onSubmit: async (data) => {
            const formData = {
                carPlateNo: data.carPlateNo.trim(),
                carDescription: data.carDescription.trim(),
                carPrice: data.carPrice,
                carBrand: data.carBrand.trim(),
                carModel: data.carModel.trim(),
                carEngine: data.carEngine.trim(),
                carSpeed: data.carSpeed,
                carFuelType: data.carFuelType.trim(),
                carFuelConsume: data.carFuelConsume,
                carProductionDate: data.carProductionDate,
                carBodyType: data.carBodyType.trim(),
                carColor: data.carColor.trim(),
                carSeats: data.carSeats,
                carLength: data.carLength,
                carWidth: data.carWidth,
                carHeight: data.carHeight,
                isModified: data.isModified,
                carMods: data.carMods.trim()
            }
            
            await http
                .post("/store/StoreAddItem", formData)
                .then(() => {
                    console.log(res.status);
                    navigate("/store/StoreAddItem");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`)
                });
        }
    });

    return (
        <Box>
            <ToastContainer />
            <div className="text-white">
                <h1 className="text-green-500 text-3xl pl-10 font-medium">
                    Sell a Vehicle
                </h1>
            </div>
        </Box>
    )
}

export default StoreAddItem;