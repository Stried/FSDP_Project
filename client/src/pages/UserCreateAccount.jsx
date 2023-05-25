import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import "./../App.css";
import FormInputSingleLine from "./../components/FormInputSingleLine"
import FormInputMultiLine from "./../components/FormInputMultiLine";

function UserCreateAccount() {
  return (
    <Box>
      <div className="bg-stone-300 w-1/2 p-3 my-2 rounded-lg">
        <Box component={"form"} sx={{}}>
          <FormInputSingleLine name="Full Name" />
          <FormInputSingleLine name="Username" />
          <FormInputSingleLine name="Phone Number" />
          <FormInputSingleLine name="Email Address" />
          <FormInputSingleLine name="Password" />

          <Box className="flex">
            <Box className="w-1/4 py-1">
              <Button
                variant="contained"
                type="submit"
                className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
              >
                Sign Up
              </Button>
            </Box>

            <Box className="w-1/4 py-1">
              <Button
                variant="contained"
                type="reset"
                className="bg-red-400 text-black hover:bg-red-600 hover:text-white"
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default UserCreateAccount;
