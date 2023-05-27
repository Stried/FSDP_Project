import { Container, AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ecolife from "./pages/Ecolife";
import UserCreateAccount from "./pages/UserCreateAccount";
import './App.css'

import EcoLifeAppBar from "./components/EcoLifeAppBar";

import * as Constants from "./../src/components/CSS Constants/Constants";

function App() {
  return (
    <div id="root" className="w-full h-screen overflow-x-hidden | bg-gray-300 dark:bg-zinc-900">
      <div>
        <EcoLifeAppBar />
      </div>

      <div></div>
    </div>
  );
}

export default App
