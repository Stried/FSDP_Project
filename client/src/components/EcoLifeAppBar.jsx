// Libraries Import
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages Import
import Ecolife from "../pages/Ecolife";
import UserCreateAccount from "../pages/UserCreateAccount";
import UserEnterAccount from "../pages/UserEnterAccount";
import { Button } from "@mui/base";

function EcoLifeAppBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      // Todo: Get user data from server
      setUser({ name: "Stried" });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <Router>
      <nav className="navbar w-full flex  py-6 dark:bg-gradient-to-b from-black to-zinc-900 bg-green-500 dark:text-white text-black overflow-x-hidden">
        <div className="p-3 w-fit">
          <Link to={"/"}>
            <h1
              className="w-fit | dark:bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text |
              hover:ease-in-out duration-300 | italic font-semibold text-4xl | mx-4 my-2"
            >
              Ecolife
            </h1>
          </Link>
        </div>
        <div name="otherLinks" className="flex mt-3 mx-4 py-1">
          <Link to="">
            <h1
              className="w-max | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mx-5 my-2"
            >
              Store
            </h1>
          </Link>

          <Link to="">
            <h1
              className="w-max | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mx-5 my-2"
            >
              Location
            </h1>
          </Link>

          <Link to="">
            <h1
              className="w-max | hover:text-white dark:hover:text-green-500 | hover:ease-in-out duration-300
                    font-medium text-xl | mx-5 my-2"
            >
              Trial Runs
            </h1>
          </Link>
        </div>
        <div name="loginButton" className="w-full place-content-end my-2 mx-2">
          {user && (
            <>
              <Link to="/">
                <h1
                  className="w-max | text-transparent bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text |
                  hover:text-white hover:bg-gradient-to-r from-green-400 to-emerald-600 hover:bg-clip-border rounded-lg
                    hover:ease-in-out duration-300 | font-medium italic text-2xl | mx-4 px-2 py-1 | float-right"
                >
                  {user.name}
                </h1>
              </Link>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
          {!user && (
            <>
              <Link to="/user/login">
                <h1
                  className="w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded
              hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mt-3 px-2 py-1 | float-right"
                >
                  Log In
                </h1>
              </Link>
            </>
          )}
        </div>
      </nav>

      <Container>
        <Routes>
          <Route path={"/"} />
          <Route path={"/user/createAccount"} element={<UserCreateAccount />} />
          <Route path={"/user/login"} element={<UserEnterAccount />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default EcoLifeAppBar;
