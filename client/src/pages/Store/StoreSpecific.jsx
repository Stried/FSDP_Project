import {
    Box, Button, TextField, Typography, InputAdornment, IconButton, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./../../App.css";
import http from "../../http";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import FormInputMultiLine from "./../../components/FormInputSingleLine";
import { Field, useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckBox } from "@mui/icons-material";

function StoreSpecific() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [store, setStore] = useState({
        carPlateNo: "",
        carDescription: "",
        carPrice: "",
        carBrand: "",
        carModel: "",
        carEngine: "",
        carSpeed: "",
        carFuelType: "",
        carFuelConsume: "",
        carProductionDate: "",
        carBodyType: "",
        carColor: "",
        carSeats: "",
        carLength: "",
        carWidth: "",
        carHeight: "",
        isModified: false,
        carMods: "None"
    });

    useEffect(() => {
        http.get(`/store/${id}`).then((res) => {
            setStore(res.data);
        });
    }, []);
}