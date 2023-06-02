import React from "react";
import { useState, useEffect } from "react";
import "./../../App.css";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import FormInputMultiLine from "./../../components/FormInputMultiLine";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";

import ViewAccount from "./userComponents/ViewAccount"
import ChangeAccountDetails from "./userComponents/ChangeAccountDetails"

function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [isRendered, setIsRendered] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      // Todo: Get user data from server
      http.get("/user/auth").then((res) => {
        setUser(res.data.user);
      });
    } else {
      navigate("/user/login");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  const viewAccount = () => {
    if (window.location.pathname === "/user/viewAccount") {
      return <ViewAccount />
    }
  }

  const changeAccountDetails = () => {
    if (window.location.pathname === "/user/viewAccount") {
      return <ChangeAccountDetails />
    }
  }

  return (
    <div className="w-screen">
      {user && (
        <div className="flex">
          <div className="w-1/4" id="sideBarMenu">
            <div className="text-zinc-400" id="userAccountOptions">
              <h2 className="text-green-500 text-3xl font-medium">
                User Account
              </h2>
              <ul className="text-xl pl-5 border-l-2 border-solid border-white">
                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="/user/viewAccount" onClick={() => setIsRendered("")}>
                    Account Details
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="/user/viewAccount" onClick={() => setIsRendered("changeAccountDetails")}>
                    Change Details
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Payment Methods
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Membership Status
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-zinc-400 mt-5" id="ecolifeInformation">
              <h2 className="text-green-500 text-3xl font-medium">
                Vehicle Information
              </h2>
              <ul className="text-xl pl-5 border-l-2 border-solid border-white">
                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Registered Vehicle
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Purchased Vehicles
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Sold Vehicles
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Sales Status
                  </Link>
                </li>
                <li className="pt-4 hover:text-green-500 hover:transition-ease-in-out duration-300">
                  <Link to="">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-3/4 mx-5 h-full" id="displayComponents">
            {isRendered === "" && (viewAccount())}
            {isRendered === "changeAccountDetails" && (changeAccountDetails())}
          </div>
          
        </div>
      )}
    </div>
  );
}

export default UserDetailsPage;
