import { Box, Button, InputLabel, MenuItem } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import * as React from "react";
("use client");

import http from "./../../../http";
import { ToastContainer, toast } from "react-toastify";
import FormInputSingleLine from "./../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomSelectCars from "./CustomSelectCars";

const App = () => {
  
  const options = [
    { value: "serangoon", label: "serangoon" },
    { value: "hougang", label: "hougang" },
    { value: "sengkang", label: "sengkang" },
    { value: "test", label: "test" },
  ];

  const handleGoBack = () => {
    window.history.back();
  };


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      carPlateNo: "",
      address: "",
    },
    validationSchema: yup.object().shape({
      carPlateNo: yup
        .string()
        .trim()
        .min(3, "Name must be Minimum 3 Characters.")
        .max(100, "Name must be Maximum 100 Characters")
        .required("Name is required."),
      address: yup
        .string()
        .trim()
        .min(3, "address must be Minimum 3 Characters.")
        .max(100, "address must be Maximum 100 Characters")
        .required("Address is required"),
    }),
    onSubmit: async (data) => {
      const formData = {
        carPlateNo: (data.carPlateNo = data.carPlateNo.trim()),
        address: (data.address = data.address.trim()),
      };

      await http
        .post("/trials/createTrialCar", formData)
        .then((res) => {
          console.log(res.status);
          navigate("/Trials/trialAdmin/TrialsCarAdminPage");
        })
        .catch(function (err) {
          console.log(err);
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  return (
    <div className="relative min-h-screen">


        <Box
          component={"form"}
          sx={{}}
          onSubmit={formik.handleSubmit}
          className="mx-7 ml-16"
        >
          <label >Car Plate No</label>
          <FormInputSingleLine
            name="Car Plate No"
            valueName="carPlateNo"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.carPlateNo}
            error={
              formik.touched.carPlateNo && Boolean(formik.errors.carPlateNo)
            }
            helperText={formik.touched.carPlateNo && formik.errors.carPlateNo}
          />
<br></br>
<br></br>
          <label >Address</label>
          <CustomSelectCars
            value={formik.values.address}
            onChange={(value) => formik.setFieldValue("address", value.value)}
            classnames={"input"}
            options={options}
          />

          {formik.errors.address ? (
            <div classnames="error">{formik.errors.address}</div>
          ) : null}
          <br></br>
          <Button
            variant="contained"
            type="submit"
            className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
          >
            Create
          </Button>
        </Box>

        <Button href="/Trials/trialAdmin/TrialsCarAdminPage" className=" mt-64 dark:bg-gray-800 text-white hover:bg-green-600 hover:text-white"
        style={{left:"93%"}}
        
        >
            Back
        </Button>

      <ToastContainer />
      
    </div>
  );
};

export default App;
