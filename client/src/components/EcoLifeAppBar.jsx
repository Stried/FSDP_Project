// Libraries Import
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import "./../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages Import
import Ecolife from "../pages/Ecolife";
import UserCreateAccount from "../pages/UserCreateAccount";
import UserEnterAccount from "../pages/UserEnterAccount";

function EcoLifeAppBar() {
  return (
    <Router>
      <nav className="flex dark:bg-black bg-green-500 dark:text-white text-black overflow-x-hidden">
        <div className="p-3 w-fit">
          <Link to={"/"}>
            <h1
              className="w-fit | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    italic font-semibold text-4xl | mx-4 my-2"
            >
              Ecolife
              
            </h1>
          </Link>
        </div>
        <div name="otherLinks" className="flex mt-3 mx-4 py-1">
          <Link to="">
            <h1
              className="w-fit | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-2xl | mx-5 my-2"
            >
              Store
            </h1>
          </Link>

          <Link to="">
            <h1
              className="w-fit | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-2xl | mx-5 my-2"
            >
              Location
            </h1>
          </Link>

          <Link to="">
            <h1
              className="w-fit | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-2xl | mx-5 my-2"
            >
              Trial Runs
            </h1>
          </Link>
        </div>
        <div name="loginButton" className="right-0 absolute my-3 mx-2">
          <Link to="/login">
            <h1
              className="w-fit | hover:text-white dark:hover:text-green-500 | border-white dark:border-green-500 border-solid border-2 rounded
              hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mt-3 px-2 py-1 | float-right"
            >
              Log In
            </h1>
          </Link>
        </div>
      </nav>

      <Container>
        <Routes>
          <Route path={"/"}/>
          <Route path={"/createAccount"} element={<UserCreateAccount />} />
          <Route path={"/login"} element={<UserEnterAccount />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default EcoLifeAppBar;
