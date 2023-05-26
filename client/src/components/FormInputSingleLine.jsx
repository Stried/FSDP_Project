import { Box, Button, TextField, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import "./../App.css";
import * as Constants from "./CSS Constants/Constants";

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
        type="text"
        required
        label={props.name}
        name={props.name}
        inputProps={{ style: { color: "white" } }}
      />
    </ThemeProvider>
  );
}

export default FormInputSingleLine
