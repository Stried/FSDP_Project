import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./../../App.css";
import http from "../../http";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';

function StoreUpdateItem() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [imageFile, setImageFile] = useState(null);

    const options = [
        { value: "Electric", label: "Electric" },
        { value: "Hybrid", label: "Hybrid" }
    ];

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
        carMods: "None",
        carImageFile: ""
    });

    useEffect(() => {
        http.get(`/store/viewStoreItem/${id}`).then((res) => {
            setStore(res.data);
            let file = res.data.carImageFile
            setImageFile(file);
        });
    }, []);



    const formik = useFormik({
        initialValues: store,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            carPlateNo: yup.string().trim().min(8, "Car Plate cannot be less than 8").max(8, "Car Plate cannot be more than 8").required("Car Plate cannot be empty"),
            carDescription: yup.string().trim().required("Car Description cannot be empty"),
            carPrice: yup.number().integer().min(10000, "Car Price must be minimum of $10,000").required("Price cannot be empty"),
            carBrand: yup.string().trim().required("Brand cannot be empty"),
            carModel: yup.string().trim().required("Model cannot be empty"),
            carEngine: yup.string().trim().required("Engine cannot be empty"),
            carSpeed: yup.number().integer().min(1, "Speed cannot be less than 0").required("Speed cannot be empty"),
            carFuelType: yup.string().required("Fuel Type cannot be empty"),
            carFuelConsume: yup.number().integer().required("Fuel Consumption cannot be empty"),
            carProductionDate: yup.date().min("1900-01-01", "Production Date cannot be before 1923").required("Production Date cannot be empty"),
            carBodyType: yup.string().trim().required("Body Type cannot be empty"),
            carColor: yup.string().trim().required("Color cannot be empty"),
            carSeats: yup.number().integer().min(1, "The minimum seat is 1").required("Seats cannot be empty"),
            carLength: yup.number().integer().required("Length cannot be empty"),
            carWidth: yup.number().integer().required("Width cannot be empty"),
            carHeight: yup.number().integer().required("Height cannot be empty"),
            carMods: yup.string()
        }),
        onSubmit: (data) => {
            if (imageFile) {
                data.carImageFile = imageFile;
            } else {
                data.carImageFile = "defaultCar.png"
            }
            data.carPlateNo.trim(),
                data.carDescription.trim(),
                data.carBrand.trim(),
                data.carModel.trim(),
                data.carEngine.trim(),
                data.carFuelType.trim(),
                data.carBodyType.trim(),
                data.carColor.trim(),
                data.carMods.trim()

            http
                .put(`/store/updateStoreItem/${id}`, data)
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

    const deleteStoreItem = () => {
        http.delete(`/store/deleteStoreItem/${id}`)
            .then((res) => {
                console.log(res.data);
                window.scrollTo({ top: 0, behavior: 'auto' });
                navigate("/store/StoreMain");
            });
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

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

    return (
        <Box component={"div"} className="pl-7 bg-zinc-800 rounded w-11/12 m-auto">
            <Box component={"form"} onSubmit={formik.handleSubmit} className="pb-5 mb-5">
                <div className="text-white text-center">
                    <h1 className="text-green-500 text-5xl py-3 font-semibold">
                        Update Vehicle
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
                    <div className="mt-3 float-right absolute top-0 right-48" >
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
                            styles={customStyles}
                            value={options.find(option => option.value === formik.values.carFuelType)}
                            placeholder="Fuel Type"
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
                            className="bg-green-400 text-black hover:bg-green-600 hover:text-white mr-3"
                            onClick={handleClick}
                        >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleOpen}
                            className="bg-red-400 text-black hover:bg-red-600 hover:text-white">
                            Delete
                        </Button>
                    </div>
                </div>
            </Box>
            <Dialog open={open} onClose={handleClose} className="text-white">
                <DialogTitle>
                    Delete Store
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this store item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" className="text-black hover:text-white"
                        onClick={deleteStoreItem}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Box>
    )
}

export default StoreUpdateItem;
