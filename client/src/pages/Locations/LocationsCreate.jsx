// GET OUT OF HERE DEMONS

import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    FormGroup
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./../../App.css";
import http from "../../http";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LocationsCreate() {
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        formik.setFieldValue("fastCharge", checked);
    };

    const [value, setValue] = useState("North");

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const formik = useFormik({
        initialValues: {
            locationName: "",
            streetName: "",
            postalCode: "",
            LatAxis: "",
            LongAxis: "",
            region: "",
            fastCharge: false,
            noOfChargers: "",
        },
        validationSchema: yup.object().shape({
            LatAxis: yup.number().required("Please specify the Latitude."),
            LongAxis: yup.number().required("Please specify the Longitude."),
            locationName: yup
                .string()
                .trim()
                .required("Please provide a location name."),
            streetName: yup
                .string()
                .trim()
                .required("Please provide a street name."),
            postalCode: yup
                .number()
                .positive("Negative Postal Code?")
                .integer()
                .required("Please input a valid Postal Code."),
            region: yup
                .string()
                .trim()
                .oneOf(["N", "S", "E", "W"])
                .required("Please specify a valid region."),
            fastCharge: yup
                .boolean()
                .required(
                    "Please specify if the charger is capable of FastCharge."
                ),
            noOfChargers: yup
                .number()
                .positive("Number of chargers cannot be negative.")
                .integer()
                .required(
                    "Please specify the number of chargers in the location."
                ),
        }),
        onSubmit: (data) => {
            const formData = {
                locationName: data.locationName = data.locationName.trim(),
                streetName: data.streetName = data.streetName.trim(),
                postalCode: data.postalCode,
                LatAxis: data.LatAxis,
                LongAxis: data.LongAxis,
                region: data.region,
                fastCharge: data.fastCharge,
                noOfChargers: data.noOfChargers,
            };
            
            http.post("/locations/createLocation", formData)
                .then((res) => {
                    console.log(res.status);
                    navigate("/locations/LocationsMain");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        }
    });

    return (
        <div className="bg-gray-900 py-10">
            <div className="max-w-md mx-auto px-4">
                <h1 className="text-green-400 text-3xl font-medium mb-4">
                    Add a charger location
                </h1>
                <Box
                    component={"form"}
                    onSubmit={formik.handleSubmit}
                    className="space-y-4"
                >
                    <FormInputSingleLine
                        name="Location Name"
                        valueName="locationName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.locationName}
                        error={
                            formik.touched.locationName &&
                            Boolean(formik.errors.locationName)
                        }
                        helperText={
                            formik.touched.locationName &&
                            formik.errors.locationName
                        }
                    />
                    <FormInputSingleLine
                        name="Street Name"
                        valueName="streetName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.streetName}
                        error={
                            formik.touched.streetName &&
                            Boolean(formik.errors.streetName)
                        }
                        helperText={
                            formik.touched.streetName &&
                            formik.errors.streetName
                        }
                    />
                    <FormInputSingleLine
                        name="Postal Code"
                        valueName="postalCode"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.postalCode}
                        error={
                            formik.touched.postalCode &&
                            Boolean(formik.errors.postalCode)
                        }
                        helperText={
                            formik.touched.postalCode &&
                            formik.errors.postalCode
                        }
                    />
                    <FormInputSingleLine
                        name="Latitude"
                        valueName="LatAxis"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.LatAxis}
                        error={
                            formik.touched.LatAxis &&
                            Boolean(formik.errors.LatAxis)
                        }
                        helperText={
                            formik.touched.LatAxis && formik.errors.LatAxis
                        }
                    />
                    <FormInputSingleLine
                        name="Longtitude"
                        valueName="LongAxis"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.LongAxis}
                        error={
                            formik.touched.LongAxis &&
                            Boolean(formik.errors.LongAxis)
                        }
                        helperText={
                            formik.touched.LongAxis && formik.errors.LongAxis
                        }
                    />
                    <FormControl className="text-white">
                        <FormLabel
                            id="demo-controlled-radio-buttons-group"
                            className="text-white"
                        >
                            Region
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="N"
                                control={<Radio />}
                                label="North"
                            />
                            <FormControlLabel
                                value="S"
                                control={<Radio />}
                                label="South"
                            />
                            <FormControlLabel
                                value="E"
                                control={<Radio />}
                                label="East"
                            />
                            <FormControlLabel
                                value="W"
                                control={<Radio />}
                                label="West"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel
                            required
                            control={<Checkbox defaultChecked />}
                            label="FastCharge Capable"
                            sx={{
                                color: "white",
                                "&.Mui-checked": {
                                    color: "white",
                                },
                            }}
                        />
                    </FormGroup>
                    <FormInputSingleLine
                        name="Number Of Chargers"
                        valueName="noOfChargers"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.noOfChargers}
                        error={
                            formik.touched.noOfChargers &&
                            Boolean(formik.errors.noOfChargers)
                        }
                        helperText={
                            formik.touched.noOfChargers &&
                            formik.errors.noOfChargers
                        }
                    />

                    <Box className="w-fit py-1">
                        <Button
                            variant="contained"
                            type="submit"
                            className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </div>

            <ToastContainer />
        </div>
    );
}

export default LocationsCreate;