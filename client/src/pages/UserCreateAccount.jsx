import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import "./../App.css";
import FormInputSingleLine from "./../components/FormInputSingleLine"
import FormInputMultiLine from "./../components/FormInputMultiLine";

function UserCreateAccount() {
  return (
    <Box>
      <div className="bg-gray-400 w-1/2 bg-opacity-60 px-3 my-2 rounded-lg">
        <Box component={"form"} sx={{}}>
          <FormInputSingleLine name="Full Name" />
          <FormInputSingleLine name="Username" />
        </Box>
      </div>
    </Box>
  );
}

export default UserCreateAccount;
