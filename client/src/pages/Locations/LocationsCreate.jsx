import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
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
import React, { useEffect } from "react";
import "./../../App.css";
import http from "../../http";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  ToggleSwitch,
} from "flowbite-react";
("use client");

function LocationsCreate() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      LatAxis: "",
      LongAxis: "",
      locationName: "",
      streetName: "",
      postalCode: "",
      region: "",
      fastCharge: "",
      noOfChargers: "",
    },
    validationSchema: yup.object().shape({
      LatAxis: yup.number().required("Please specify the Latitute."),
      LongAxis: yup.number().required("Please specify the Longitude."),
      locationName: yup
        .string()
        .trim()
        .required("Please provide a location name."),
      streetName: yup.string().trim().required("Please provide a street name."),
      postalCode: yup
        .number()
        .positive()
        .integer()
        .required("Please input a valid Postal Code."),
      region: yup
        .string()
        .trim()
        .oneOf(["N", "S", "E", "W"])
        .required("Please specify a valid region."),
      fastCharge: yup
        .boolean()
        .required("Please specify if the charger is capable of FastCharge."),
      noOfChargers: yup
        .number()
        .positive()
        .integer()
        .required("Please specify the number of chargers in the location."),
    }),
    onSubmit: async (data) => {
      const formData = {
        LatAxis: data.LatAxis,
        LongAxis: data.LongAxis,
        locationName: (data.locationName = data.locationName.trim()),
        streetName: (data.streetName = data.streetName.trim()),
        postalCode: data.postalCode,
        region: (data.region = data.region.trim()),
        fastCharge: data.fastCharge,
        noOfChargers: data.noOfChargers,
      };

      await http
        .post("/locations/createLocation", formData)
        .then(() => {
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
    <Box className="mx-10">
      <ToastContainer />
      <div className="text-white">
        <h1 className="text-green-500 text-3xl font-medium">
          Add a charger location
        </h1>
        <form className="flex max-w-md flex-col gap-4">
          <div className="mb-4">
            <Label htmlFor="locationNameInput" value="Location Name" />
            <TextInput
              id="locationNameInput"
              placeholder="Hougang Mall"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="streetNameInput" value="Street Name" />
            <TextInput
              id="streetNameInput"
              placeholder="90 Hougang Ave 10"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="postalCodeInput" value="Postal Code" />
            <TextInput id="postalCodeInput" placeholder="538766" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latAxisInput" value="Latitude" />
              <TextInput
                id="latAxisInput"
                placeholder="1.373554718211368"
                required
              />
            </div>
            <div>
              <Label htmlFor="lngAxisInput" value="Longitude" />
              <TextInput
                id="lngAxisInput"
                placeholder="103.89370104229617"
                required
              />
            </div>
          </div>
          <div className="max-w-md">
            <Label htmlFor="regionInput" value="Region" />
            <Select id="regionInput" required>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </Select>
          </div>
          <div className="max-w-md">
            <Checkbox id="fastChargeToggle"
                      className="mr-3 mt-3" />
            <Label htmlFor="fastChargeToggle" className="inline-flex content-center">FastCharge Capable?</Label>
          </div>
          <div className="mb-4">
            <Label htmlFor="chargerNumberInput" value="Number of Chargers" />
            <TextInput id="chargerNumberInput" placeholder="4" required />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Box>
  );
}

export default LocationsCreate;
