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
  "& label.Mui-focused": {
    color: "#028A0F",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#028A0F",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
        borderColor: "white",
        borderWidth: "2px",
        color: "black",
    },
    "&:hover fieldset": {
      borderColor: "#028A0F",
    },
    "&.Mui-focused fieldset": {
        borderColor: "#028A0F",
      },
    input: {
        color: "white",
    }
  },
});
