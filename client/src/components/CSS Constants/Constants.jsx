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
        color: "gray",
    },
    "& label.Mui-focused": {
        color: "gray",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "gray",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "gray",
            borderWidth: "2px",
            color: "gray",
        },
        "&:hover fieldset": {
            borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
            borderColor: "gray",
        },
        "&input": {
            color: "gray",
        },
    },
});
