import {
    Box, Button
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./../../App.css";
import http from "../../http";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';

function StoreAddItem() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    const options = [
        { value: "Electric", label: "Electric" },
        { value: "Hybrid", label: "Hybrid" }
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '2px solid white' : '1px solid white',
            backgroundColor: "black/40",
            boxShadow: 'none',
            ':hover': {
                backgroundColor: 'black/40',
                border: state.isFocused ? '2px solid white' : '1px solid white',
                color: state.isSelected ? 'white' : 'black',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'white' : 'white', // Custom option background color
            color: state.isSelected ? 'black' : 'black', // Custom option text color

        }),
        singleValue: base => ({
            ...base,
            color: "#fff"
        }),
    }

    const typeHandleChange = (selectedOption) => {
        formik.setFieldValue("carFuelType", selectedOption.value);
    };

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB');
                return;
            }
            let formData = new FormData();
            formData.append('file', file);
            http.post('/file/storeUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    setImageFile(res.data.filename);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };

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
            carFuelConsume: "",
            carProductionDate: new Date(),
            carBodyType: "",
            carColor: "",
            carSeats: "",
            carLength: "",
            carWidth: "",
            carHeight: "",
            carMods: ""
        },
        validationSchema: yup.object().shape({
            carPlateNo: yup.string().trim().min(8, "Car Plate cannot be less than 8").max(8, "Car Plate cannot be more than 8").required("Car Plate cannot be empty"),
            carDescription: yup.string().trim().min(20, "Car Description cannot be less than 20 characters").required("Car Description cannot be empty"),
            carPrice: yup.number().integer().min(10000, "Price must be minimum of $10,000").required("Price cannot be empty"),
            carBrand: yup.string().trim().min(5, "Brand cannot be less than 5 characters").required("Brand cannot be empty"),
            carModel: yup.string().trim().min(5, "Model cannot be less than 5 characters").required("Model cannot be empty"),
            carEngine: yup.string().trim().min(5, "Engine cannot be less than 5 characters").required("Engine cannot be empty"),
            carSpeed: yup.number().integer().min(50, "Speed cannot be less than 50").required("Speed cannot be empty"),
            carFuelType: yup.string().required("Fuel Type cannot be empty"),
            carFuelConsume: yup.number().integer().min(1, "Fuel Consumption cannot be less than 0").required("Fuel Consumption cannot be empty"),
            carProductionDate: yup.date().min("1900-01-01", "Production Date cannot be before 1923").required("Production Date cannot be empty"),
            carBodyType: yup.string().trim().min(5, "Body Type cannot be less than 5 characters").required("Body Type cannot be empty"),
            carColor: yup.string().trim().min(2, "Color cannot be less than 2 characters").required("Color cannot be empty"),
            carSeats: yup.number().integer().min(1, "The minimum seat is 1").required("Seats cannot be empty"),
            carLength: yup.number().integer().min(1000, "The minimum car length is 1000mm").required("Length cannot be empty"),
            carWidth: yup.number().integer().min(1000, "The minimum car width is 1000mm").required("Width cannot be empty"),
            carHeight: yup.number().integer().min(1000, "The minimum car height is 1000mm").required("Height cannot be empty"),
            carMods: yup.string()
        }),
        onSubmit: (data) => {
            if (imageFile) {
                data.carImageFile = imageFile;
            } else {
                data.carImageFile = "image.jpeg"
            }
            data.carPlateNo.trim(),
                data.carDescription.trim(),
                data.carBrand.trim(),
                data.carModel.trim(),
                data.carEngine.trim(),
                data.carFuelType.trim(),
                data.carBodyType.trim(),
                data.carColor.trim()

            http.post("/store/createStoreItem", data)
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
        <Box component={"div"} className="pl-7 bg-zinc-800 rounded w-11/12 m-auto">
            <Box component={"form"} onSubmit={formik.handleSubmit} className="pb-5 mb-5">
                <div className="text-white text-center">
                    <h1 className="text-green-500 text-5xl py-3 font-semibold">
                        Sell a Vehicle
                    </h1>
                    <p>Enter the basic information of the car</p>
                </div>
                <div className="pr-7 relative">
                    <div className="w-1/2 inline-block">
                        <FormInputSingleLine
                            valueName="carPlateNo"
                            name="Plate Number"
                            type="text"
                            value={formik.values.carPlateNo}
                            onChange={formik.handleChange}
                            error={formik.touched.carPlateNo && Boolean(formik.errors.carPlateNo)}
                            helperText={formik.touched.carPlateNo && formik.errors.carPlateNo}
                        />
                    </div>
                    <div className="mt-3 float-right absolute top-0 right-44" >
                        <Button
                            variant="contained"
                            component="label"
                            className="bg-white text-black hover:bg-green-400 hover:text-white mt-3 flex">
                            Upload Image of the car
                            <input hidden accept="image/*" multiple type="file" onChange={onFileChange} />
                        </Button>
                    </div>
                    <div className="float-right absolute right-20 mb-5 top-16 right-36">
                        {
                            imageFile && (
                                <div className="w-auto border rounded content-center">
                                    <Box component="img" alt="store" className="w-80 h-44"
                                        src={`${import.meta.env.VITE_FILE_BASE_URL_STORE}${imageFile}`}>
                                    </Box>
                                </div>

                            )
                        }
                    </div>
                    <div className="w-1/2">
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
                    <div className="w-1/2">
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
                    <div className="text-white text-center text-2xl mt-5">
                        Car Dimension
                    </div>
                    <div className="w-1/3 inline-block pr-5">
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
                    <div className="w-1/3 inline-block px-5">
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
                    <div className="w-1/3 inline-block pl-5">
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
                    <div className="text-white text-center text-2xl mt-5">
                        Car Specifications
                    </div>
                    <div className="">
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
                    <div className="">
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
                    <div className="w-6/12 inline-block pr-5">
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
                    <div className="w-6/12 inline-block pl-5">
                        <FormInputSingleLine
                            valueName="carSpeed"
                            name="Speed (kw/h)"
                            type="number"
                            value={formik.values.carSpeed}
                            onChange={formik.handleChange}
                            error={formik.touched.carSpeed && Boolean(formik.errors.carSpeed)}
                            helperText={formik.touched.carSpeed && formik.errors.carSpeed}
                        />
                    </div>
                    <div className="w-6/12 inline-block mt-5 pr-5">
                        <Select
                            className="bg-black/40 text-black"
                            name="carFuelType"
                            onChange={typeHandleChange}
                            options={options}
                            value={options.find(option => option.value === formik.values.carFuelType)}
                            styles={customStyles}
                            placeholder="Fuel Type"
                            error={formik.touched.carFuelType && Boolean(formik.errors.carFuelType)}
                            helperText={formik.touched.carFuelType && formik.errors.carFuelType}
                        />
                    </div>
                    <div className="w-6/12 inline-block pl-5">
                        <FormInputSingleLine
                            valueName="carFuelConsume"
                            name="Fuel Consumption (kWh)"
                            type="number"
                            value={formik.values.carFuelConsume}
                            onChange={formik.handleChange}
                            error={formik.touched.carFuelConsume && Boolean(formik.errors.carFuelConsume)}
                            helperText={formik.touched.carFuelConsume && formik.errors.carFuelConsume}
                        />
                    </div>
                    <div className="w-1/2 inline-block pr-5">
                        <FormInputSingleLine
                            valueName="carProductionDate"
                            name="Production Date"
                            type="date"
                            placeholder=" "
                            value={formik.values.carProductionDate}
                            onChange={formik.handleChange}
                            error={formik.touched.carProductionDate && Boolean(formik.errors.carProductionDate)}
                            helperText={formik.touched.carProductionDate && formik.errors.carProductionDate}
                        />
                    </div>
                    <div className="w-1/2 inline-block pl-5">
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
                    <div className="w-1/2 inline-block pr-5">
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
                    <div className="w-1/2 inline-block pl-5">
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
                    <div className="">
                        <FormInputSingleLine
                            valueName="carMods"
                            name="Mods (Fill only if you have mods) "
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
                            Add
                        </Button>
                    </div>
                </div>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default StoreAddItem;