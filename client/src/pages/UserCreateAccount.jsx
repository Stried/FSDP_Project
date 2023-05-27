import { Box, Button, TextField, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect } from "react";
import "./../App.css";
import http from "../http";
import FormInputSingleLine from "./../components/FormInputSingleLine";
import FormInputMultiLine from "./../components/FormInputMultiLine";
import { useFormik } from "formik";
import * as yup from "yup";

function UserCreateAccount() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      phoneNo: "",
      emailAccount: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      fullName: yup
        .string()
        .trim()
        .min(3, "Name must be Minimum 3 Characters.")
        .max(100, "Name must be Maximum 100 Characters")
        .required("Name is required."),
      userName: yup
        .string()
        .trim()
        .min(3, "Name must be Minimum 3 Characters.")
        .max(50, "Name must be Maximum 50 Characters")
        .required("Name is required."),
      phoneNo: yup
        .number()
        .typeError("Phone number must be a Singapore Number.")
        .integer("Phone number must be a Singapore Number.")
        .min(80000000, "Phone Number must be a Singapore Number.")
        .max(99999999, "Phone Number must be a Singapore Number.")
        .required("Phone Number is required."),
      emailAccount: yup
        .string()
        .email("Please enter a valid email address.")
        .required("Email is required."),
      password: yup
        .string()
        .min(8, "Passwords must be at least 8 characters.")
        .max(30, "Passwords must be at most 30 characters.")
        .required(),
    }),
    onSubmit: (data) => {
      data.fullName = data.fullName.trim();
      data.userName = data.userName.trim();
      data.phoneNo = data.phoneNo.trim();
      data.emailAccount = data.emailAccount.trim();
      data.password = data.password.trim();
    },
  });

  return (
    <Box component={"div"} className=" py-5 h-screen">
      <div className="bg-transparent w-1/2 py-3 rounded-lg ">
        <Box>
          <Typography variant="h4" className="text-black dark:text-white">
            Sign Up For{" "}
            <span className="text-green-400 italic font-medium">Ecolife</span>
          </Typography>
        </Box>

        <Box component={"form"} sx={{}} onSubmit={formik.handleSubmit}>
          <FormInputSingleLine
            name="Full Name"
            valueName="fullName"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <FormInputSingleLine
            name="Username"
            valueName="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <FormInputSingleLine
            name="Phone Number"
            valueName="phoneNo"
            onChange={formik.handleChange}
            value={formik.values.phoneNo}
            error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
            helperText={formik.touched.phoneNo && formik.errors.phoneNo}
          />
          <FormInputSingleLine
            name="Email Address"
            valueName="emailAccount"
            onChange={formik.handleChange}
            value={formik.values.emailAccount}
            error={
              formik.touched.emailAccount && Boolean(formik.errors.emailAccount)
            }
            helperText={
              formik.touched.emailAccount && formik.errors.emailAccount
            }
          />
          <FormInputSingleLine
            name="Password"
            valueName="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Typography className="opacity-60 mb-4 text-black dark:text-white">
            Already have an account?{" "}
            <span className="text-blue-400">
              <Link to="/user/login">Log In</Link>
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
