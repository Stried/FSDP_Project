import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, TextField } from "@mui/material";
import React from "react";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const CssTextField = styled(TextField)({
    "& .MuiInputLabel-root": {
        color: "lightgray",
    },
    "& label.Mui-focused": {
        color: "lightgray",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "lightgray",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "lightgray",
            borderWidth: "2px",
            color: "lightgray",
        },
        "&:hover fieldset": {
            borderColor: "lightgray",
        },
        "&.Mui-focused fieldset": {
            borderColor: "lightgray",
        },
        "&input": {
            color: "lightgray",
        },
    },
});
