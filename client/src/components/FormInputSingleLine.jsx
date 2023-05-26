import { Box, Button, TextField, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import "./../App.css";
import * as Constants from "./CSS Constants/Constants";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

const CssTextField = Constants.CssTextField;
const DarkTheme = Constants.DarkTheme;

function FormInputSingleLine(props) {
        const formik = useFormik({
        initialValues: {
          fullName: "",
          userName: "",
          phoneNo: "",
          emailAccount: "",
          password: "",
        },
        validationSchema: yup.object().shape({
          fullName: yup
            .string()
            .trim()
            .min(3, "Name must be Minimum 3 Characters.")
            .max(100, "Name must be Maximum 100 Characters")
            .required(),
          userName: yup
            .string()
            .trim()
            .min(3, "Name must be Minimum 3 Characters.")
            .max(50, "Name must be Maximum 50 Characters")
            .required(),
          phoneNo: yup
            .number()
            .min(80000000, "Phone Number must be a Singapore Number.")
            .max(99999999, "Phone Number must be a Singapore Number.")
            .required(),
          emailAccount: yup.string().email().required(),
          password: yup.string().min(8).max(16).required(),
        }),
        onSubmit: (data) => {
          data.fullName = data.fullName.trim();
          data.userName = data.userName.trim();
          data.phoneNo = data.phoneNo.trim();
          data.emailAccount = data.emailAccount.trim();
          data.password = data.password.trim();
        },
        });
  
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssTextField
        className="border-green-400 border-5"
        fullWidth
        margin="normal"
        autoComplete="off"
        type="text"
        required
        label={props.name}
        name={props.valueName}
        inputProps={{ style: { color: "white" } }}

        onChange={props.onChange}
        value={props.value}
        error={props.error}
        helperText={props.helperText}
      />
    </ThemeProvider>
  );
}

export default FormInputSingleLine
