import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";

export const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "green",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "black",
        },
        "&:hover fieldset": {
            borderColor: "greenyellow",
        },
        "&.Mui-focused fieldset": {
            borderColor: "green",
        },
    },
});