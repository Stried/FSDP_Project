import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Checkbox,
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

function StoreUpdateItem() {
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

    const formik = useFormik({
        initialValues: store,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            carPlateNo: yup.string().trim().max(8).required("Car Plate cannot be empty"),
            carDescription: yup.string().trim().required("Car Description cannot be empty"),
            carPrice: yup.number().integer().min(10000).required("Price cannot be empty"),
            carBrand: yup.string().trim().required("Brand cannot be empty"),
            carModel: yup.string().trim().required("Model cannot be empty"),
            carEngine: yup.string().trim().required("Engine cannot be empty"),
            carSpeed: yup.number().integer().required("Speed cannot be empty"),
            carFuelType: yup.string().required("Fuel Type cannot be empty"),
            carFuelConsume: yup.number().integer().required("Fuel Consumption cannot be empty"),
            carProductionDate: yup.date().required("Production Date cannot be empty"),
            carBodyType: yup.string().trim().required("Body Type cannot be empty"),
            carColor: yup.string().trim().required("Color cannot be empty"),
            carSeats: yup.number().integer().min(1).required("Seats cannot be empty"),
            carLength: yup.number().integer().required("Length cannot be empty"),
            carWidth: yup.number().integer().required("Width cannot be empty"),
            carHeight: yup.number().integer().required("Height cannot be empty"),
            isModified: yup.boolean(),
            carMods: yup.string(),
        }),
        onSubmit: (data) => {
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

            http
                .put("/store/" + formData.carPlateNo, formData)
                .then((res) => {
                    console.log(res.status);
                    navigate("/store/StoreMain");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`)
                });
        }
    });

    return (
        <Box component={"div"} className="pl-7">
            <Box>
                <div className="text-white">
                    <h1 className="text-green-500 text-3xl pb-3 font-medium italic">
                        Update a Vehicle
                    </h1>
                </div>
            </Box>
            <Box component={"form"} onSubmit={formik.handleSubmit}>
                <div className="pr-7">
                    <div className="w-5/6 inline-flex">
                        <FormInputSingleLine
                            valueName="carDescription"
                            name="Description"
                            type="text"
                            value={formik.values.carDescription}
                            onChange={formik.handleChange}
                            error={formik.touched.carDescription && Boolean(formik.errors.carDescription)}
                            helperText={formik.touched.carDescription && formik.errors.carDescription}
                        />
                    </div>
                    <br />
                    <div className="w-1/5 inline-flex pr-5 appearance-none">
                        <FormInputSingleLine
                            valueName="carPrice"
                            name="Price ($)"
                            type="number"
                            value={formik.values.carPrice}
                            onChange={formik.handleChange}
                            error={formik.touched.carPrice && Boolean(formik.errors.carPrice)}
                            helperText={formik.touched.carPrice && formik.errors.carPrice}
                        />
                    </div>
                    <div className="w-1/3 inline-flex pr-5">
                        <FormInputSingleLine
                            valueName="carBrand"
                            name="Brand"
                            type="text"
                            value={formik.values.carBrand}
                            onChange={formik.handleChange}
                            error={formik.touched.carBrand && Boolean(formik.errors.carBrand)}
                            helperText={formik.touched.carBrand && formik.errors.carBrand}
                        />
                    </div>
                    <div className="w-1/3 inline-flex">
                        <FormInputSingleLine
                            valueName="carModel"
                            name="Model"
                            type="text"
                            value={formik.values.carModel}
                            onChange={formik.handleChange}
                            error={formik.touched.carModel && Boolean(formik.errors.carModel)}
                            helperText={formik.touched.carModel && formik.errors.carModel}
                        />
                    </div>

                    <div className="w-1/4 inline-flex">
                        <FormInputSingleLine
                            valueName="carEngine"
                            name="Engine"
                            type="text"
                            value={formik.values.carEngine}
                            onChange={formik.handleChange}
                            error={formik.touched.carEngine && Boolean(formik.errors.carEngine)}
                            helperText={formik.touched.carEngine && formik.errors.carEngine}
                        />
                    </div>
                    <div className="w-1/6 inline-flex pl-5">
                        <FormInputSingleLine
                            valueName="carSpeed"
                            name="Speed"
                            type="number"
                            value={formik.values.carSpeed}
                            onChange={formik.handleChange}
                            error={formik.touched.carSpeed && Boolean(formik.errors.carSpeed)}
                            helperText={formik.touched.carSpeed && formik.errors.carSpeed}
                        />
                    </div>
                    <br />
                    <div className="w-1/4 inline-flex pr-5">
                        <FormInputSingleLine
                            valueName="carFuelType"
                            name="Fuel Type"
                            type="text"
                            value={formik.values.carFuelType}
                            onChange={formik.handleChange}
                            error={formik.touched.carFuelType && Boolean(formik.errors.carFuelType)}
                            helperText={formik.touched.carFuelType && formik.errors.carFuelType}
                        />
                    </div>
                    <div className="w-1/4 inline-flex">
                        <FormInputSingleLine
                            valueName="carFuelConsume"
                            name="Fuel Consumption"
                            type="number"
                            value={formik.values.carFuelConsume}
                            onChange={formik.handleChange}
                            error={formik.touched.carFuelConsume && Boolean(formik.errors.carFuelConsume)}
                            helperText={formik.touched.carFuelConsume && formik.errors.carFuelConsume}
                        />
                    </div>
                    <div className="w-1/5 pr-5">
                        <FormInputSingleLine
                            valueName="carProductionDate"
                            name="Production Date"
                            type="date"
                            value={formik.values.carProductionDate}
                            onChange={formik.handleChange}
                            error={formik.touched.carProductionDate && Boolean(formik.errors.carProductionDate)}
                            helperText={formik.touched.carProductionDate && formik.errors.carProductionDate}
                        />
                    </div>
                    <div className="w-1/5 pr-5 inline-flex">
                        <FormInputSingleLine
                            valueName="carBodyType"
                            name="Body Type"
                            type="text"
                            value={formik.values.carBodyType}
                            onChange={formik.handleChange}
                            error={formik.touched.carBodyType && Boolean(formik.errors.carBodyType)}
                            helperText={formik.touched.carBodyType && formik.errors.carBodyType}
                        />
                    </div>
                    <div className="w-1/6 pr-5 inline-flex">
                        <FormInputSingleLine
                            valueName="carColor"
                            name="Color"
                            type="text"
                            value={formik.values.carColor}
                            onChange={formik.handleChange}
                            error={formik.touched.carColor && Boolean(formik.errors.carColor)}
                            helperText={formik.touched.carColor && formik.errors.carColor}
                        />
                    </div>
                    <div className="w-1/6 inline-flex">
                        <FormInputSingleLine
                            valueName="carSeats"
                            name="Seats"
                            type="number"
                            value={formik.values.carSeats}
                            onChange={formik.handleChange}
                            error={formik.touched.carSeats && Boolean(formik.errors.carSeats)}
                            helperText={formik.touched.carSeats && formik.errors.carSeats}
                        />
                    </div>
                    <br />
                    <div className="w-1/6 inline-flex pr-5">
                        <FormInputSingleLine
                            valueName="carLength"
                            name="Length (mm)"
                            type="number"
                            value={formik.values.carLength}
                            onChange={formik.handleChange}
                            error={formik.touched.carLength && Boolean(formik.errors.carLength)}
                            helperText={formik.touched.carLength && formik.errors.carLength}
                        />
                    </div>
                    <div className="w-1/6 inline-flex pr-5">
                        <FormInputSingleLine
                            valueName="carWidth"
                            name="Width (mm)"
                            type="number"
                            value={formik.values.carWidth}
                            onChange={formik.handleChange}
                            error={formik.touched.carWidth && Boolean(formik.errors.carWidth)}
                            helperText={formik.touched.carWidth && formik.errors.carWidth}
                        />
                    </div>
                    <div className="w-1/6 inline-flex pr-5">
                        <FormInputSingleLine
                            valueName="carHeight"
                            name="Height (mm)"
                            type="number"
                            value={formik.values.carHeight}
                            onChange={formik.handleChange}
                            error={formik.touched.carHeight && Boolean(formik.errors.carHeight)}
                            helperText={formik.touched.carHeight && formik.errors.carHeight}
                        />
                    </div>
                    <div className="w-1/6 text-white pr-5">
                        <Checkbox
                            value="Modified"
                            name="isModified"
                            type="checkbox"
                            onChange={formik.handleChange}
                        />
                        <span className="text-xl my-auto p-auto">Modified</span>
                    </div>
                    <div className="w-1/2 pr-5">
                        <FormInputSingleLine
                            valueName="carMods"
                            name="Mods"
                            type="text"
                            value={formik.values.carMods}
                            onChange={formik.handleChange}
                            error={formik.touched.carMods && Boolean(formik.errors.carMods)}
                            helperText={formik.touched.carMods && formik.errors.carMods}
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

export default StoreUpdateItem;