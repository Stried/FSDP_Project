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
import { useParams } from "react-router-dom";
import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import FormInputSingleLine from "../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";


const App = () => {
    const { model } = useParams();
    const formik = useFormik({
        initialValues: {
            dateOfTrial:"",
            trialReport:"",
            modelName:model,
            faultResolve:true,
        },
        validationSchema: yup.object().shape({
            dateOfTrial: yup
                .date()
                .required("Date of trial is required"),
        }),
        onSubmit: async (data) => {
            const formData = {
                dateOfTrial: (data.dateOfTrial = data.dateOfTrial).trim(),
            };

            await http
                .post(`trials/createTrialReceipt/${model}`, formData)
                .then((res) => {
                  console.log("The trial car is " + model);
                    // navigate("/TrialsCarAdminPage");
                    window.location.reload()
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`)
                });
        }
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

          {formik.errors.modelName ? (
            <div classnames="error">{formik.errors.modelName}</div>
          ) : null}
          <br></br>
          <Button
            variant="contained"
            type="submit"
            className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
          >
            Book
          </Button>
        </Box>
            <ToastContainer />
        </div>
    );
};

export default App;
