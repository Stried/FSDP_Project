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

import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import FormInputSingleLine from "../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";


const App = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ trialCarList, setTrialCarList ] = useState([]);
    const getTrialCar = () => {
        http.get("/trials/viewTrialCar").then((res) => {
            setTrialCarList(res.data);
        });
    };

    useEffect(() => {
        getTrialCar();
    }, []);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };




    const formik = useFormik({
        initialValues: {
            dateOfTrial:"",
            trialReport:"",
            modelName:"",
            faultResolve:true,
        },
        validationSchema: yup.object().shape({
            dateOfTrial: yup
                .date()
                .required("Date of trial is required"),
        }),
        onSubmit: async (data) => {
            const formData = {
                carPlateNo: (data.carPlateNo = data.carPlateNo.trim()),
                address: (data.address = data.address.trim()),
            };

            await http
                .post("/createTrialReceipt/${id}", formData)
                .then((res) => {
  
                    // navigate("/TrialsCarAdminPage");
                    window.location.reload()
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    return (
        <div className="relative min-h-screen">


                <h1 className="text-center text-5xl text-green-400">Create Trial Receipt</h1>
                <br></br>

                    
        <Box
          component={"form"}
          onSubmit={formik.handleSubmit}
          className="mx-7 ml-16"
        >
          <label >Date</label>
          <FormInputSingleLine
            name="Date of Trial"
            valueName="dateOfTrial"
            type="date"
            value={formik.values.dateOfTrial}
            onChange={formik.handleChange}
            error={formik.touched.dateOfTrial && Boolean(formik.errors.dateOfTrial)}
            helperText={formik.touched.dateOfTrial && formik.errors.dateOfTrial}
          />
<br></br>

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
            <ToastContainer />
        </div>
    );
};

export default App;
