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
        sx={{input: {color: "black"}}}
      fullWidth
      multiline minRows={props.multiline}
      margin="normal"
      autoComplete="off"
      type="text"
      required
      label={props.name}
      name={props.valueName}
      focused
    />
  );
}

export default FormInputMultiLine;
