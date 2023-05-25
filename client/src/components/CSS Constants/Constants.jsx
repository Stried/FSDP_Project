import styled from "@emotion/styled";
import { AppBar, TextField } from "@mui/material";
import React from "react";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#028A0F",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#028A0F",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
        borderColor: "black",
        borderWidth: "2px",
        
    },
    "&:hover fieldset": {
      borderColor: "#028A0F",
    },
    "&.Mui-focused fieldset": {
        borderColor: "#028A0F",
      },
    input: {
        color: "black",
    }
  },
});
