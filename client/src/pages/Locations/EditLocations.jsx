import React, { useState, useEffect } from "react";
import "./../../App.css";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import {
    Box,
    Button,
    Checkbox
} from "@mui/material";

import {
    useParams,
    useNavigate,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { Modal } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import Select from 'react-select';

function EditLocations() {
    const [LocationInfo, setLocationInfo] = useState({
        locationName: "",
        streetName: "",
        postalCode: "",
        coordinates: "",
        region: "",
        fastCharge: "",
        noOfChargers: "",
        description: ""
    })

    useEffect(() => {
        http.get(`/locations/editLocation/${id}`)
            .then((res) => {
                const locationData = res.data;
                setLocationInfo({
                    locationName: locationData.locationName,
                    streetName: locationData.streetName,
                    postalCode: locationData.postalCode,
                    coordinates: locationData.LatAxis + ", " + locationData.LongAxis,
                    region: locationData.region,
                    fastCharge: locationData.fastCharge,
                    noOfChargers: locationData.noOfChargers,
                    description: locationData.description
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error fetching location data.");
            });
    }, []);

    const deleteLocation = () => {
        http.delete(`/locations/deleteLocation/${id}`).then(() => {
            navigate("/locations/locationsMain")
        }).catch(function (err) {
            console.log(err)
        })
    }

    const navigate = useNavigate();
    const { id } = useParams();
    const [openModal, setOpenModal] = useState("");

    const options = [
        { value: "N", label: "North" },
        { value: "S", label: "South" },
        { value: "E", label: "East" },
        { value: "W", label: "West" },
    ];
    const defaultOption = options[0];

    const handleRegionChange = (selectedOption) => {
        formik.setFieldValue("region", selectedOption.value);
    };

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
        initialValues: LocationInfo,
        enableReinitialize: true,
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
                .put(`/locations/updateLocation/${id}`, data)
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
        <div className="w-1/2">
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
            >
                {/* // values: locationName, streetName, postalCode, LatAxis, LongAxis, region, fastCharge, noOfChargers, description */}
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
                        formik.touched.coordinates &&
                        formik.errors.coordinates
                    }
                />
                <Select
                    className="mt-4 bg-gray-400"
                    name="region"
                    options={options}
                    value={options.find(option => option.value === formik.values.region)}
                    onChange={handleRegionChange}
                    placeholder="Select a region"
                />
                <div className="flex mt-4">
                    <Checkbox
                        className="text-white -ml-3"
                        value="fastCharge"
                        name="fastCharge"
                        type="checkbox"
                        onChange={formik.handleChange}
                    />
                    <span className="text-xl text-white flex content-center mt-2">
                        Fast Charge
                    </span>
                </div>
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
                <ToastContainer />
                <div>
                    <Button
                        variant="contained"
                        type="submit"
                        className="bg-cyan-600 text-black hover:bg-green-600 hover:text-white mt-4"
                    >
                        Update Location Details
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenModal("deleteModal");
                        }}
                        className="px-3 mt-4 ml-4 bg-red-500 text-black hover:bg-red-600 hover:text-slate-300 rounded font-medium"
                    >
                        Delete
                    </Button>
                    <Modal
                        dismissible
                        show={openModal === "deleteModal"}
                        onClose={() => setOpenModal(undefined)}
                    >
                        <Modal.Header>Location Deletion</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    This action will permanently remove this location and all it's information. <br></br>Are you sure?
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                onClick={() => deleteLocation()}
                                className="px-3 py-2 bg-red-500 hover:bg-red-600 hover:text-white rounded font-medium"
                            >
                                I understand
                            </button>
                            <button
                                onClick={() => setOpenModal(undefined)}
                                className="px-3 py-2 bg-sky-500 hover:bg-sky-600 hover:text-white rounded font-medium"
                            >
                                No, Stop!
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Box>

        </div>
    )
}

export default EditLocations;