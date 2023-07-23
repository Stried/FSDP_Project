import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    Box,
    Button,
    Checkbox,
    Switch,
    Select,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    FormControlLabel,
} from "@mui/material";
import FormInputSingleLine from "./../../components/FormInputSingleLine";

function LocationsCreate() {
    const [formData, setFormData] = useState({
        locationName: "",
        streetName: "",
        postalCode: "",
        LatAxis: "",
        LongAxis: "",
        region: "",
        fastCharge: false,
        noOfChargers: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData({ ...formData, [name]: checked });
    };

    const formik = useFormik({
        initialValues: formData,
        validationSchema: yup.object().shape({
            latAxis: yup.number().required("Please specify the Latitude."),
            longAxis: yup.number().required("Please specify the Longitude."),
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
          console.log("peepee poopoo", data)
            try {
                await http.post("/locations/createLocation", data);
                navigate("/locations/LocationsMain");
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
                    <form
                        onSubmit={formik.handleSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="locationNameInput"
                                className="text-white"
                            >
                                Location Name
                            </label>
                            <input
                                type="text"
                                id="locationNameInput"
                                name="locationName"
                                placeholder="Hougang Mall"
                                required
                                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                                value={formik.values.locationName}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.locationName &&
                                formik.errors.locationName && (
                                    <div className="text-red-500">
                                        {formik.errors.locationName}
                                    </div>
                                )}
                        </div>
                        <div>
                            <label
                                htmlFor="streetNameInput"
                                className="text-white"
                            >
                                Street Name
                            </label>
                            <input
                                type="text"
                                id="streetNameInput"
                                name="streetName"
                                placeholder="90 Hougang Ave 10"
                                required
                                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                                value={formik.values.streetName}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.streetName &&
                                formik.errors.streetName && (
                                    <div className="text-red-500">
                                        {formik.errors.streetName}
                                    </div>
                                )}
                        </div>
                        <div>
                            <label
                                htmlFor="postalCodeInput"
                                className="text-white"
                            >
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCodeInput"
                                name="postalCode"
                                placeholder="538766"
                                required
                                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                                value={formik.values.postalCode}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.postalCode &&
                                formik.errors.postalCode && (
                                    <div className="text-red-500">
                                        {formik.errors.postalCode}
                                    </div>
                                )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="latAxisInput"
                                    className="text-white"
                                >
                                    Latitude
                                </label>
                                <input
                                    type="text"
                                    id="latAxisInput"
                                    name="LatAxis"
                                    placeholder="1.373554718211368"
                                    required
                                    className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                                    value={formik.values.LatAxis}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.LatAxis &&
                                    formik.errors.LatAxis && (
                                        <div className="text-red-500">
                                            {formik.errors.LatAxis}
                                        </div>
                                    )}
                            </div>
                            <div>
                                <label
                                    htmlFor="lngAxisInput"
                                    className="text-white"
                                >
                                    Longitude
                                </label>
                                <input
                                    type="text"
                                    id="lngAxisInput"
                                    name="LongAxis"
                                    placeholder="103.89370104229617"
                                    required
                                    className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                                    value={formik.values.LongAxis}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.LongAxis &&
                                    formik.errors.LongAxis && (
                                        <div className="text-red-500">
                                            {formik.errors.LongAxis}
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="regionInput"
                                className="text-white"
                            >
                                Region
                            </label>
                            <select
                                id="regionInput"
                                name="region"
                                required
                                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                                value={formik.values.region}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select region</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </select>
                            {formik.touched.region && formik.errors.region && (
                                <div className="text-red-500">
                                    {formik.errors.region}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center pl-1">
                            <input
                                type="checkbox"
                                id="fastChargeToggle"
                                name="fastCharge"
                                checked={formData.fastCharge}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-3 w-3 text-blue-600"
                            />
                            <label
                                htmlFor="fastChargeToggle"
                                className="text-white pl-3"
                            >
                                FastCharge Capable?
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Box>
    );
}

export default LocationsCreate;
