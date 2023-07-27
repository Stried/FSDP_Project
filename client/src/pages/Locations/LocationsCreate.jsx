import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import http from "../../http";
import * as yup from "yup";
import { Box, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { Input } from "postcss";
import { useNavigate } from "react-router-dom";
import FormInputSingleLine from "../../components/FormInputSingleLine";

function LocationsCreate() {
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        formik.setFieldValue('fastCharge', checked);
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
                .oneOf(["North", "South", "East", "West"])
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
        onSubmit: async (data) => {
            console.log(data);
            try {
                await http
                    .post("/locations/LocationsCreate", data)
                    .then((res) => {
                        console.log(res.status);
                        navigate("/locations/LocationsMain");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
                toast.error(`${error.response.data.message}`);
            }
        },
    });

    return (
        <Box>
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
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
                            <FormInputSingleLine
                                name="Postal Code"
                                valueName="postalCode"
                                type="text"
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
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <FormInputSingleLine
                                    name="Latitude"
                                    valueName="LatAxis"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.LatAxis}
                                    error={
                                        formik.touched.phoneNo &&
                                        Boolean(formik.errors.LatAxis)
                                    }
                                    helperText={
                                        formik.touched.LatAxis &&
                                        formik.errors.LatAxis
                                    }
                                />
                            </div>
                            <div>
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
                                        formik.touched.LongAxis &&
                                        formik.errors.LongAxis
                                    }
                                />
                            </div>
                        </div>
                        <div>
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
                                        value="North"
                                        control={<Radio />}
                                        label="North"
                                    />
                                    <FormControlLabel
                                        value="South"
                                        control={<Radio />}
                                        label="South"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="flex items-center pl-1">
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
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-400 cursor-pointer text-white py-2 px-4 rounded-lg"
                        >
                            Submit
                        </button>
                    </Box>
                </div>
            </div>
        </Box>
    );
}

export default LocationsCreate;
