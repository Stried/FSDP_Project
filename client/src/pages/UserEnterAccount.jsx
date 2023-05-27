import React from "react";
import "./../App.css";
import FormInputSingleLine from "./../components/FormInputSingleLine";
import FormInputMultiLine from "./../components/FormInputMultiLine";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function UserEnterAccount() {
    return (
      <Box component={"div"} className="py-5 ">
        <div className="bg-transparent w-1/2 py-3 rounded-lg ">
          <Box>
            <Typography
              variant="h4"
              className="text-green-600 dark:text-green-400"
            >
              Welcome Back!
            </Typography>
          </Box>

          <Box component={"form"}>
            <FormInputSingleLine name="Email Address" />
            <FormInputSingleLine name="Password" />

            <div className="text-black dark:text-white">
              <input
                type="checkbox"
                id="rememberMe"
                className=""
              />
              <label for="rememberMe" className="mx-1 py-auto">Remember Me</label>
            </div>

            <Typography className="opacity-60 mb-4 text-black dark:text-white">
              Do not have an account?{" "}
              <span className="text-blue-400">
                <Link to="/user/createAccount">Sign Up</Link>
              </span>
            </Typography>

            <Box className="flex">
              <Box className="w-1/4 py-1">
                <Button
                  variant="contained"
                  type="submit"
                  className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
                >
                  Log In
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

export default UserEnterAccount;