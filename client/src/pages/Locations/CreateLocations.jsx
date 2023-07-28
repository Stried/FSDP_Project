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

    // values: locationName, streetName, postalCode, LatAxis, LongAxis, region, fastCharge, noOfChargers
    const formik = useFormik({
        initialValues: {
            locationName: "",
            streetName: "",
            postalCode: 0,
            LatAxis: "",
            LongAxis: "",
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
            region: yup.string().trim().oneOf(["N", "S", "E", "W"]).required(),
            fastCharge: yup.boolean().required(),
            noOfChargers: yup.number().integer().positive().required(),
            LatAxis: yup.number().required(),
            LongAxis: yup.number().required(),
        }),
        onSubmit: async (data) => {
            data.locationName = data.locationName.trim();
            data.streetName = data.streetName.trim();

            await http
                .post("/locations/createLocations", data)
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
