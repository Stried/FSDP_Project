import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import "./../App.css";
import { root } from "postcss";
import styled from "@emotion/styled";
import * as Constants from "./CSS Constants/Constants";

const CssTextField = Constants.CssTextField;

function FormInputMultiLine(props) {
  return (
    <CssTextField
      fullWidth
      multiline
      margin="normal"
      autoComplete="off"
      type="text"
      required
      label={props.name}
      name={props.name}
      focused
    />
  );
}

export default FormInputMultiLine;
