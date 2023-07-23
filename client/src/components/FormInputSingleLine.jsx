import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import "./../App.css";
import * as Constants from "./CSS Constants/Constants";


const CssTextField = Constants.CssTextField;
const DarkTheme = Constants.DarkTheme;

function FormInputSingleLine(props) {
  return (
      <ThemeProvider theme={DarkTheme}>
          <CssTextField
              fullWidth
              margin="normal"
              autoComplete="off"
              type={props.type}
              label={props.name}
              name={props.valueName}
              inputProps={{ style: { color: "grey" } }}
              InputProps={{
                  endAdornment: props.endAdornment,
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
