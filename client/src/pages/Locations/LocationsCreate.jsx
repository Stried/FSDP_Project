import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Checkbox, Switch, Select, FormControl, FormGroup, InputLabel, MenuItem, FormControlLabel} from "@mui/material";
import FormInputSingleLine from "./../../components/FormInputSingleLine";


function LocationsCreate() {
  const [formData, setFormData] = useState({
    LatAxis: "",
    LongAxis: "",
    locationName: "",
    streetName: "",
    postalCode: "",
    region: "",
    fastCharge: false,
    noOfChargers: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSwitchChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fastCharge: value,
    }));
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
      streetName: yup.string().trim().required("Please provide a street name."),
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
        .required("Please specify if the charger is capable of FastCharge."),
      noOfChargers: yup
        .number()
        .positive("Number of chargers cannot be negative.")
        .integer()
        .required("Please specify the number of chargers in the location."),
    }),
    onSubmit: async (data) => {
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
    <box>
      <div className="bg-gray-900 py-10">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-green-400 text-3xl font-medium mb-4">
            Add a charger location
          </h1>
          <box component={"form"} onSubmit={formik.handleSubmit}>
          <div>
              <FormInputSingleLine
                name="Location Name"
                placeholder="Hougang Mall"
                type="text"
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formik.values.locationName}
                onChange={formik.handleChange}
                helperText={formik.touched.locationName && formik.errors.locationName}
              />
            </div>
            <div>
              <FormInputSingleLine
                name="Street Name"
                placeholder="90 Hougang Ave 10"
                type="text"
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formik.values.streetName}
                onChange={formik.handleChange}
                helperText={formik.touched.streetName && formik.errors.streetName}
              />
            </div>
            <div>
              <FormInputSingleLine
                name="Postal Code"
                placeholder="538766"
                type="text"
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                helperText={formik.touched.postalCode && formik.errors.postalCode}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormInputSingleLine
                name="Latitude"
                placeholder="1.373554718211368"
                type="text"
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formik.values.LatAxis}
                onChange={formik.LatAxis}
                helperText={formik.touched.LatAxis && formik.errors.latAxis}
              />
            </div>
            <div>
              <FormInputSingleLine
                name="Longtitude"
                placeholder="538766"
                type="text"
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formik.values.LongAxis}
                onChange={formik.handleChange}
                helperText={formik.touched.LongAxis && formik.errors.longAxis}
              />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id = "regionSelectLabel">Region</InputLabel>
                <select
                labelId="regionSelectLabel"
                id="regionSelect"
                name="Region"
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formik.values.region}
                onChange={formik.handleChange}
                helperText={formik.touched.region && formik.errors.region}
                >
                  <MenuItem value={"North"}>North</MenuItem>
                  <MenuItem value={"East"}>East</MenuItem>
                  <MenuItem value={"South"}>South</MenuItem>
                  <MenuItem value={"West"}>West</MenuItem>
                </select>
              </FormControl>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel control = {<Switch/>} label="FastCharge Capable?"/>
              </FormGroup>
            </div>
          </box>
          

          {/* <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="locationNameInput" className="text-white">
                Location Name
              </label>
              <input
                type="text"
                id="locationNameInput"
                name="locationName"
                placeholder="Hougang Mall"
                required
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formData.locationName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="streetNameInput" className="text-white">
                Street Name
              </label>
              <input
                type="text"
                id="streetNameInput"
                name="streetName"
                placeholder="90 Hougang Ave 10"
                required
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formData.streetName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="postalCodeInput" className="text-white">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCodeInput"
                name="postalCode"
                placeholder="538766"
                required
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="latAxisInput" className="text-white">
                  Latitude
                </label>
                <input
                  type="text"
                  id="latAxisInput"
                  name="LatAxis"
                  placeholder="1.373554718211368"
                  required
                  className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                  value={formData.LatAxis}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lngAxisInput" className="text-white">
                  Longitude
                </label>
                <input
                  type="text"
                  id="lngAxisInput"
                  name="LongAxis"
                  placeholder="103.89370104229617"
                  required
                  className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                  value={formData.LongAxis}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="regionInput" className="text-white">
                Region
              </label>
              <select
                id="regionInput"
                name="region"
                required
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formData.region}
                onChange={handleChange}
              >
                <option value="">Select region</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
            <div className="flex items-center">
              <Switch
                id="fastChargeToggle"
                name="fastCharge"
                checked={formData.fastCharge}
                onChange={handleSwitchChange}
                onColor="#3182ce"
                offColor="#9ca3af"
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                width={50}
              />
              <label htmlFor="fastChargeToggle" className="text-white pl-1">
                FastCharge Capable?
              </label>
            </div>
            <div>
              <label htmlFor="chargerNumberInput" className="text-white">
                Number of Chargers
              </label>
              <input
                type="number"
                id="chargerNumberInput"
                name="noOfChargers"
                placeholder="4"
                required
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formData.noOfChargers}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form> */}
        </div>
      </div>
    </box>
  );
}

export default LocationsCreate;
