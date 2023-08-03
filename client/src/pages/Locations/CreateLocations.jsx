import React, { useContext, useState } from "react";
import "./../../App.css";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import FormInputMultiLine from "./../../components/FormInputMultiLine";
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
    FormGroup,
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
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";

function CreateLocations() {
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        formik.setFieldValue("fastCharge", checked);
    };

    const [value, setValue] = useState("North");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // values: locationName, streetName, postalCode, coordinates, region, fastCharge, noOfChargers
    const formik = useFormik({
        initialValues: {
            locationName: "",
            streetName: "",
            postalCode: 0,
            coordinates: "",
            description: "",
            region: "",
            fastCharge: false,
            noOfChargers: 0,
        },
        validationSchema: yup.object().shape({
            locationName: yup
                .string()
                .trim()
                .required("Please provide a location name!"),
            streetName: yup
                .string()
                .trim()
                .required("Please provide a street name!"),
            postalCode: yup
                .number()
                .integer()
                .positive("Postal code cannot be negative.")
                .required("Postal Code is required."),
            region: yup.string().trim().oneOf(["N", "S", "E", "W"], "Please enter N, S, E, W").required(),
            fastCharge: yup.boolean().oneOf([true, false], "True or False only").required(),
            noOfChargers: yup.number().integer().positive("Number of charger must be more than 0").required(),
            coordinates: yup.string().trim().required(),
            description: yup.string().trim().required()
        }),
        onSubmit: async (data) => {
            data.locationName = data.locationName.trim();
            data.streetName = data.streetName.trim();

            await http
                .post("/locations/createLocation", data)
                .then((res) => {
                    console.log(res.status);
                    navigate("/locations/LocationsMain");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    return (
        <div className="">
            <div className="text-white text-4xl font-medium">
                <h1>Add A Charger</h1>
            </div>
            <div className="w-1/2">
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    {/* // values: locationName, streetName, postalCode, LatAxis, LongAxis, region, fastCharge, noOfChargers */}
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
                        name="Coordinates"
                        valueName="coordinates"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.coordinates}
                        error={
                            formik.touched.coordinates &&
                            Boolean(formik.errors.coordinates)
                        }
                        helperText={
                            formik.touched.coordinates && formik.errors.coordinates
                        }
                    />
                    <FormInputSingleLine
                        name="Region"
                        valueName="region"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.region}
                        error={
                            formik.touched.region &&
                            Boolean(formik.errors.region)
                        }
                        helperText={
                            formik.touched.region && formik.errors.region
                        }
                    />
                    <FormInputSingleLine
                        name="FastCharge"
                        valueName="fastCharge"
                        type="boolean"
                        onChange={formik.handleChange}
                        value={formik.values.fastCharge}
                        error={
                            formik.touched.fastCharge &&
                            Boolean(formik.errors.fastCharge)
                        }
                        helperText={
                            formik.touched.fastCharge &&
                            formik.errors.fastCharge
                        }
                    />
                    <FormInputSingleLine
                        name="Number Of Chargers"
                        valueName="noOfChargers"
                        type="number"
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
                    <FormInputSingleLine
                        name="Description"
                        valueName="description"
                        type="textarea"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
                    >
                        Add Location
                    </Button>
                </Box>
            </div>
        </div>
    );
}

export default CreateLocations;
