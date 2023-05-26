import { Box, Button, TextField, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import "./../App.css";
import FormInputSingleLine from "./../components/FormInputSingleLine"
import FormInputMultiLine from "./../components/FormInputMultiLine";

function UserCreateAccount() {
  return (
    <Box component={"div"} className="my-4 py-5 ">
      <div className="bg-transparent w-1/2 py-3 my-5 rounded-lg ">
        <Box>
          <Typography variant="h4" className="text-black dark:text-white">
            Sign Up For{" "}
            <span className="text-green-400 italic font-medium">Ecolife</span>
          </Typography>
        </Box>

        <Box component={"form"} sx={{}}>
          <FormInputSingleLine name="Full Name" />
          <FormInputSingleLine name="Username" />
          <FormInputSingleLine name="Phone Number" />
          <FormInputSingleLine name="Email Address" />
          <FormInputSingleLine name="Password" />

          <Typography className="opacity-60 mb-4 text-black dark:text-white">
            Already have an account?{" "}
            <span className="text-blue-400">
              <Link to="/login">Log In</Link>
            </span>
          </Typography>

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
