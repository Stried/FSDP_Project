import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import "./../App.css";
import * as Constants from "./CSS Constants/Constants";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

const CssTextField = Constants.CssTextField;
const DarkTheme = Constants.DarkTheme;

function FormInputSingleLine(props) {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssTextField
        className="border-green-400 border-5"
        fullWidth
        margin="normal"
        autoComplete="off"
        type={props.type}
        label={props.name}
        name={props.valueName}
        inputProps={{ style: { color: "white" } }}
        InputProps={{
          endAdornment: props.endAdornment
        }}
        onChange={props.onChange}
        value={props.value}
        error={props.error}
        helperText={props.helperText}
      />
    </ThemeProvider>
  );
}

export default FormInputSingleLine;
