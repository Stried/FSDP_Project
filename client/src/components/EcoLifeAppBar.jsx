// Libraries Import
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import "./../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages Import
import Ecolife from "../pages/Ecolife";
import UserCreateAccount from "../pages/UserCreateAccount";

function EcoLifeAppBar() {
  return (
    <Router>
      <nav className="w-screen bg-black dark:bg-green-500 text-white dark:text-black">
        <div className="p-3 w-fit">
          <Link to={"/"}>
            <h1
              className="w-fit | hover:dark:text-white hover:text-green-500 | hover:ease-in-out duration-300
                    italic font-semibold text-4xl | mx-4 my-2"
            >
              Ecolife
            </h1>
          </Link>
        </div>
        <div name="otherLinks">
            
        </div>
      </nav>

      {/* <Container>
        <Routes>
          <Route path={"/"} element={<Ecolife />} />
          <Route path={"/createAccount"} element={<UserCreateAccount />} />
        </Routes>
      </Container> */}
    </Router>
  );
}

export default EcoLifeAppBar;
