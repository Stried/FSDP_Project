import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import "./../App.css";
import * as Constants from "./CSS Constants/Constants";

const CssTextField = Constants.CssTextField;

function FormInputSingleLine(props) {
  return (
    <CssTextField
      className="border-green-400 border-5"
      fullWidth
      margin="normal"
      autoComplete="off"
      type="text"
      required
      label={props.name}
      name={props.name}
      inputProps={{ style: { color: "green" } }}
    />
  );
}

export default FormInputSingleLine
