import { Container, AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ecolife from "./pages/Ecolife";
import UserCreateAccount from "./pages/Users/UserCreateAccount";
import { useState, useEffect } from "react";
import http from './http'
import './App.css'

import EcoLifeAppBar from "./components/EcoLifeAppBar";

import * as Constants from "./../src/components/CSS Constants/Constants";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      // Todo: Get user data from server
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  return (
    <div id="root" className="w-full h-screen overflow-x-hidden | bg-gray-300 dark:bg-zinc-900">
      <div>
        <EcoLifeAppBar />
      </div>
    </div>
  );
}

export default App
